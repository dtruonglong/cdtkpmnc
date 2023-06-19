import LayoutPage from "@/components/layout";
import { fetchDataClientSite } from "@/tools/axios";
import { Button, Space, Table, Tag, Image } from 'antd';
import Cookies from "cookies";
import getConfig from 'next/config';
import moment from "moment";
import { checkCampaign, deleteCampagin as deleteCampaginFunction } from "@/tools/utils";
import { getUsersInfo } from "@/tools/utils";
import { useEffect, useRef, useState } from "react";


const { publicRuntimeConfig } = getConfig();
export default function ListVouchers() {

    const [dataSource, setDataSource] = useState([])
    const [totalRows, setTotalRows] = useState(0)

    const users = useRef({})

    const columns = [
        {
            title: 'Partner',
            key: 'partner',
            dataIndex: 'partner',
            render: (text, record) => <>{users.current[text]?.[0]?.fullname}</>,
        },
        {
            title: 'Create Time',
            dataIndex: 'create_time',
            key: 'create_time',
            render: (text, record) => <>{moment(text).format('DD/MM/YYYY')}</>,
        },
        {
            title: 'Expire Time',
            dataIndex: 'expire_time',
            key: 'expire_time',
            render: (text, record) => <>{moment(text).format('DD/MM/YYYY')}</>,
        },
        {
            title: 'The number',
            key: 'count',
            dataIndex: 'count',
        },
        {
            title: 'Description',
            key: 'description',
            dataIndex: 'description',
        },
        {
            title: 'Acception',
            key: 'is_accepted',
            dataIndex: 'is_accepted',
            filters: [
                {
                    text: 'Waiting',
                    value: '0',
                },
                {
                    text: 'Accepted',
                    value: '1',
                },
                {
                    text: 'Ignored',
                    value: '-1'
                }
            ],
            onFilter: (value, record) => record.is_accepted == value,
            sorter: (a, b) => a.is_accepted - b.is_accepted,
            render: (text, record) =>
                <>{record.is_accepted == 0 ? "Waiting" : record.is_accepted == 1 ? "Accepted" : "Ignored"}</>,
        },

        {
            title: 'Image',
            key: 'image',
            dataIndex: 'image',
            render: (text, record) => <Image
                width={200} src={publicRuntimeConfig.BACKEND_FILE + '/' + text} />,
        },
        {
            title: 'Action',
            key: 'action',
            dataIndex: 'action',
            render: (_, record) => {
                return (<>
                    <Button onClick={() => deleteCampagin({ id_group: record.id_group })}>Delete</Button>
                </>)
            },
        }
    ];

    async function deleteCampagin({ id_group }) {
        const existCustomer = await checkCampaign({ id_group })
        if (existCustomer) {
            if (window.confirm("Campaign exist customer, Sure to delete ?")) {
                await deleteCampaginFunction({ id_group })
                alert('Delete campaign successfully')
                await getAllCodes()
            }
        } else {
            await deleteCampaginFunction({ id_group })
            alert('Delete campaign successfully')
            await getAllCodes()
        }
    }
    async function getUsers() {
        users.current = await getUsersInfo()
    }

    async function getAllCodes() {
        const { data, statusText } = await fetchDataClientSite.post("/voucher/list-vouchers", {
            "type": "waiting_group"
        })
        setDataSource(data.result?.rows || [])
        setTotalRows(data.result?.rows?.length || 0)
    }

    useEffect(() => {
        getAllCodes()
        getUsers()
    }, [])

    return (
        <>
            <Table
                columns={columns}
                dataSource={dataSource}

                footer={
                    (currentPageData) => {
                        return <span>Total: {currentPageData.length}</span>;
                    }
                }

                onChange={(pagination, filters, sorter, extra) => {
                    setTotalRows(extra?.currentDataSource.length)
                }}
            />
        </>
    )
}

ListVouchers.getLayout = function getLayout(page) {
    return (
        <LayoutPage fullname={page.props.fullname} role={page.props.role}>
            <ListVouchers />
        </LayoutPage>
    );
};

export async function getServerSideProps({ req, res }) {

    const cookies = new Cookies(req, res)

    const token = cookies.get('token')
    const username = cookies.get('username')
    const fullname = cookies.get('fullname')
    const role = cookies.get('role')


    if (!token) return {
        redirect: {
            permanent: true,
            destination: '/pages/user/login'
        }
    }

    return { props: { token, username, fullname, role } }
}