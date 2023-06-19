import LayoutPage from "@/components/layout";
import { useEffect, useRef, useState } from "react";
import { fetchDataClientSite } from "@/tools/axios";
import { Button, Space, Table, Tag } from 'antd';
import Cookies from "cookies";
import moment from "moment";
import { DemoGauge } from "@/components/chart/chart1";
import { Chart2 } from "@/components/chart/chart2";
import { Chart11 } from "@/components/chart/chart11";
import { getUsersInfo } from "@/tools/utils";
import { Chart31 } from "@/components/chart/chart3";

const groupBy = (arr, key) => {
    const initialValue = {};
    return arr.reduce((acc, cval) => {
        const myAttribute = cval[key];
        acc[myAttribute] = [...(acc[myAttribute] || []), cval]
        return acc;
    }, initialValue);
};

export default function ListVouchers({ role }) {

    const [dataSource, setDataSource] = useState([])
    const [totalRows, setTotalRows] = useState(0)

    const usedVouchers = useRef([])
    const unusedVouchers = useRef([])

    const acceptedVouchers = useRef([])
    const ignoredVouchers = useRef([])
    const waitingVouchers = useRef([])

    const groupByPartner = useRef([])

    const users = useRef({})

    const columns = [
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
            title: 'Customer',
            key: 'customer',
            dataIndex: 'customer',
            render: (text) => {
                if (text === null) {
                  return 'No customer';
                }
                return text;
              },
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
            title: 'Status',
            key: 'is_used',
            dataIndex: 'is_used',
            filters: [
                {
                    text: 'Unused',
                    value: '0',
                },
                {
                    text: 'Used',
                    value: '1',
                }
            ],
            onFilter: (value, record) => record.is_used == value,
            sorter: (a, b) => a.is_used - b.is_used,
            render: (text, record) =>
                <>{record.is_used == 0 ? "Unused" : "Used"}</>,
        },
        {
            title: 'Partner',
            key: 'partner',
            dataIndex: 'partner',
            render: (text, record) => <>{users.current[text]?.[0]?.fullname}</>,
        },
        {
            title: 'Discount',
            key: 'discount',
            dataIndex: 'discount',
        },
        {
            title: 'Use',
            key: 'use',
            dataIndex: 'use',
            hidden: role != 'customer',
            render: (text, record) =>
                <><Button disabled={record.is_used == 1} onClick={() => {
                    useVoucher(record.code, record.link_use_voucher)
                }}>Use</Button></>,
        }
    ].filter(item => !item.hidden);

    async function getUsers() {
        users.current = await getUsersInfo()
    }
    async function getAllCodes() {
        const { data, statusText } = await fetchDataClientSite.post("/voucher/list-vouchers", {
            "type": "all"
        })

        const { rows } = data.result

        setDataSource(data.result?.rows || [])
        setTotalRows(data.result?.rows?.length || 0)

        console.log({ rows })

        usedVouchers.current = rows.filter(value => value.is_used == 1 && value.is_accepted == 1)
        unusedVouchers.current = rows.filter(value => value.is_used == 0 && value.is_accepted == 1)

        acceptedVouchers.current = rows.filter(value => value.is_accepted == 1)
        waitingVouchers.current = rows.filter(value => value.is_accepted == 0)
        ignoredVouchers.current = rows.filter(value => value.is_accepted != 1 && value.is_accepted != 0)

        groupByPartner.current = groupBy(rows, 'partner')
    }
    useEffect(() => {
        getAllCodes()
        getUsers()
    }, [])

    function useVoucher(code, link_use_voucher) {
        fetchDataClientSite.post("/voucher/use-voucher", {
            code
        }).then((resp) => {
            alert("User voucher successfully")
            setDataSource(value => value.map((val, index) => val.code != code ? val : { ...val, is_used: 1 }))
            window.open(link_use_voucher)
        })
    }

    return (
        <>
            {role != 'admin' && <div>
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
            </div>}

            {role == 'admin' && <div>
                <DemoGauge usedVouchers={usedVouchers.current} unusedVouchers={unusedVouchers.current} />
                <div style={{ textAlign: "center" }}>
                    USED VOUCHER RATE (ACCEPTED VOUCHERS)
                </div>
                <hr />

                <Chart11 acceptedVouchers={acceptedVouchers.current}
                    ignoredVouchers={ignoredVouchers.current}
                    waitingVouchers={waitingVouchers.current} />
                <div style={{ textAlign: "center" }}>
                    ACCEPTED VOUCHER RATE
                </div>
                <hr />

                <Chart31 groupByPartner={groupByPartner.current} users={users.current} />
                <div style={{ textAlign: "center" }}>
                    <br />
                    VOUCHERS AND CAMPAIGNS
                </div>
            </div>}

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