import LayoutPage from "@/components/layout";
import { useEffect, useState } from "react";
import { fetchDataClientSite } from "@/tools/axios";
import { Button, Space, Table, Tag } from 'antd';
import Cookies from "cookies";



export default function ListVouchers({ role }) {

    const [dataSource, setDataSource] = useState([])
    const [totalRows, setTotalRows] = useState(0)

    const columns = [
        {
            title: 'User name',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Full name',
            dataIndex: 'fullname',
            key: 'fullname',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width:'15%'
        },
        ,
        {
            title: 'Action',
            key: 'action',
            width:'10%',
            dataIndex: 'action',
            render: (text, record) =>
                <>
                    {record.status == "active" && <Button onClick={() => setStatus({
                        username: record.username,
                        status: 'blocked'
                    })}>Block</Button>}
                    {record.status == "blocked" && <Button onClick={() => setStatus({
                        username: record.username,
                        status: 'active'
                    })}>Unblock</Button>}
                </>,
        }
    ];

    async function getAllUser() {
        const { data, statusText } = await fetchDataClientSite.post("/user/get-users")

        setDataSource(data.result?.rows || [])
        setTotalRows(data.result?.rows?.length || 0)
    }

    async function setStatus(dataUser) {

        const { username, status } = dataUser

        const { data, statusText } = await fetchDataClientSite.post("/user/update-user", dataUser)
        if (statusText == "OK") {
            setDataSource(dataSource => dataSource.map((value) => {

                if (value.username != username) {
                   
                    return value
                }
                else {
                    console.log({ value })
                    return {
                        ...value,
                        status: status
                    }
                }
            }))
        }
    }

    useEffect(() => {
        getAllUser()
    }, [])

    return (
        <>
            <Table columns={columns} dataSource={dataSource}
                pagination={true}
                footer={
                    (currentPageData) => {
                        return <span>Totals: {totalRows}</span>;
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
            <ListVouchers role={page.props.role} />
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