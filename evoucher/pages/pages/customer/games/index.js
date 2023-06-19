import LayoutPage from "@/components/layout";
import Cookies from "cookies";
import { LayoutCustomer } from "@/components/layout/layout-customer";
import { useEffect } from "react";
import { fetchDataClientSite } from "@/tools/axios";
import { useState } from "react";
import {Input, Space, Table, Tag, Button, Image, Row, Col } from 'antd';
import getConfig from 'next/config';
import { useRouter } from "next/router";
import { Body2 } from "@/components/body/customer/home/body2";
import { Body1 } from "@/components/body/customer/home/body1";
import { Body5 } from "@/components/body/customer/home/body5";
import { GameDetail } from "@/components/game/game-detail";
import { useRef } from "react";
import moment from 'moment'
import { getUsersInfo } from "@/tools/utils";


const { publicRuntimeConfig } = getConfig();


export default function ListVouchers({ username }) {

    const router = useRouter()
    const [dataSource, setDataSource] = useState([])
    const filterStore = useRef();
    const filterPartner = useRef();

    const users = useRef({})


    const columns = [
        {
            title: 'Thông tin từ cửa hàng',
            key: 'description',
            dataIndex: 'description',
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
            title: 'Voucher giảm tối đa (%)',
            key: 'discount',
            dataIndex: 'discount',
            sorter: (a, b) => b.discount - a.discount
        },
        */
       
        
        
        {
            title: 'Loại cửa hàng',
            key: 'store_type',
            dataIndex: 'store_type',
            filters: filterStore.current,
            onFilter: (value, record) => record.store_type == value
        },
        {
            title: 'Gần bạn (km)',
            key: 'distance',
            dataIndex: 'distance',
            sorter: (a, b) => b.distance - a.distance
        },
        {
            title: 'Ngày hết hạn',
            dataIndex: 'expire_time',
            key: 'expire_time',
            render: (text, record) => <>{moment(text).format('DD/MM/YYYY')}</>,
            sorter: (a, b) => moment(b.expire_time) - moment(a.expire_time),
        },
        {
            title: 'Giảm tối đa đến',
            key: 'image',
            dataIndex: 'image',
            render: (text, record) => <Image
                width={200} src={publicRuntimeConfig.BACKEND_FILE + '/' + text} />,
        },
       
        {
            title: 'Chi tiết',
            key: '',
            dataIndex: '',
            render: (_, record) =>
                <>
                    <GameDetail
                        image={record.image}
                        description={record.description}
                        username={username}
                        id_group={record.id_group}
                        partner={record.partner}
                    />
                </>,
        }
    ];


    const setCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(async (pos) => {
            const { latitude, longitude } = pos.coords

            const { data, statusText } = await fetchDataClientSite.post("/customer/get-campaign")

            const dataSource1 = data.result?.rows.map((value, index) => {
                return {
                    ...value,
                    distance: calcCrow(value.latitude, value.longitude, latitude, longitude)
                }
            }) || []

            let filters = []
            for (const iterator of dataSource1) {
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


            filters = []
            for (const iterator of dataSource1) {
                filters.push(iterator.partner)
            }
            filters = [... new Set(filters)]


            filterPartner.current = []
            for (const iterator of filters) {
                filterPartner.current.push({
                    text: users.current[iterator][0].fullname,
                    value: iterator,
                })
            }

            setDataSource(dataSource1)
        })
    }

    useEffect(() => {
        setCurrentLocation()
        getUsers()
    }, [])


    //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
    function calcCrow(lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var dLat = toRad(lat2 - lat1);
        var dLon = toRad(lon2 - lon1);
        var lat1 = toRad(lat1);
        var lat2 = toRad(lat2);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;

        return d.toFixed(1);
    }

    // Converts numeric degrees to radians
    function toRad(Value) {
        return Value * Math.PI / 180;
    }
    
    async function getUsers() {
        users.current = await getUsersInfo()
    }
    return (
        <>
            <Row>
                <Col span={24} className="margin_bottom_s1">
                    <Body1 />
                </Col>

                <Col span={24} className="margin_bottom_s1">
                    <Table columns={columns} dataSource={dataSource} />
                </Col>
            </Row>
        </>
    )

   
}

ListVouchers.getLayout = function getLayout(page) {

    return (
        <LayoutCustomer fullname={page.props.fullname} role={page.props.role}>
            <ListVouchers username={page.props.username} />
        </LayoutCustomer>
    );
};

export async function getServerSideProps({ req, res }) {

    const cookies = new Cookies(req, res)

    const token = cookies.get('token') || null;
    const username = cookies.get('username') || null;
    const fullname = cookies.get('fullname') || null;
    const role = cookies.get('role') || null;


    return { props: { token, username, fullname, role } }
}