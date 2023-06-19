import LayoutPage from "@/components/layout";
import { useEffect, useState, useRef } from "react";
import { fetchDataClientSite } from "@/tools/axios";
import { Button, Space, Table, Tag } from 'antd';
import Cookies from "cookies";
import { LayoutCustomer } from "@/components/layout/layout-customer";
import moment from "moment";

import { getUsersInfo, updateVoucherUser } from "@/tools/utils";


export default function ListVouchers({ role }) {

    const [dataSource, setDataSource] = useState([])
    const [totalRows, setTotalRows] = useState(0)
    const filterStore = useRef();
    const filterPartner = useRef();

    const users = useRef({})

    const columns = [
        {
            title: 'Ngày hết hạn',
            dataIndex: 'expire_time',
            key: 'expire_time',
            render: (text, record) => <>{moment(text).format('DD/MM/YYYY')}</>,
            sorter: (a, b) => moment(b.expire_time) - moment(a.expire_time),
        },
        {
            title: 'Trạng thái sử dụng',
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
            title: 'Loại cửa hàng',
            key: 'store_type',
            dataIndex: 'store_type',
            filters: filterStore.current,
            onFilter: (value, record) => record.store_type == value,
            sorter: (a, b) => a.store_type - b.store_type
        },

        {
            title: 'Cửa hàng',
            key: 'partner',
            dataIndex: 'partner',
            filters: filterPartner.current,
            onFilter: (value, record) => record.partner == value,
            render: (text, record) => <>{users.current[text]?.[0]?.fullname}</>,
        },
        /*
        {
            title: 'Cửa hàng',
            key: 'partner',
            dataIndex: 'partner',
            render: (text, record) => <>{users.current[text]?.[0]?.fullname}</>,
        },
        */
        {
            title: 'Discount (%)',
            key: 'discount',
            dataIndex: 'discount',
            sorter: (a, b) => b.discount - a.discount
        },
        {
            title: 'Mã voucher',
            key: 'code',
            dataIndex: 'code',
        },
        
        {
            title: 'Sử dụng',
            key: 'use',
            dataIndex: 'use',
            hidden: role != 'customer',
            render: (text, record) =>               
                 <>
                 <Button disabled={record.is_used == 1} onClick={() => {useVoucher(record.code, record.link_use_voucher)}}>Sử dụng</Button></>,
                
        },

        {
            title: 'Xóa',
            key: 'use',
            dataIndex: 'use',
            hidden: role != 'customer',
            render: (text, record) => (
                <Button onClick >Xóa</Button>
              )
            
        }
    ];



    async function getUsers() {
        users.current = await getUsersInfo()
    }

    async function getAllCodes() {
        const { data, statusText } = await fetchDataClientSite.post("/voucher/list-vouchers", {
            "type": "all"
        })

       
        let filters = []
        for (const iterator of data.result?.rows) {
            filters.push(iterator.store_type)
        }

        filters = [... new Set(filters)]

        filterStore.current = []
        for (const iterator of filters) {
            filterStore.current.push({
                text: iterator,
                value: iterator,
            })
        }

        console.log({ filter: filterStore.current })
        setDataSource(data.result?.rows || [])
        setTotalRows(data.result?.rows?.length || 0)

        
        ///filter partner
        filters = []
        for (const iterator of data.result?.rows) {
            filters.push(iterator.partner)
        }

        filters = [... new Set(filters)]

        filterPartner.current = []
        for (const iterator of filters) {
            filterPartner.current.push({
                text: iterator,
                value: iterator,
            })
        }

        console.log({ filter: filterPartner.current })
        setDataSource(data.result?.rows || [])
        setTotalRows(data.result?.rows?.length || 0)
       
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
        <LayoutCustomer fullname={page.props.fullname} role={page.props.role}>
            <ListVouchers role={page.props.role} />
        </LayoutCustomer>
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
            destination: '/pages/customer/login'
        }
    }

    if (role != 'customer') return {
        redirect: {
            permanent: true,
            destination: '/pages/user/login'
        }
    }

    //console.log({ fullname })

    return { props: { token, username, fullname, role } }
}