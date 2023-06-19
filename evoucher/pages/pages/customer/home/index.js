import LayoutPage from "@/components/layout";
import Cookies from "cookies";
import { LayoutCustomer } from "@/components/layout/layout-customer";
import { useEffect } from "react";
import { fetchDataClientSite } from "@/tools/axios";
import { useState } from "react";
import { Space, Table, Tag, Button, Image } from 'antd';
import getConfig from 'next/config';
import { useRouter } from "next/router";
import { Body2 } from "@/components/body/customer/home/body2";
import { Body1 } from "@/components/body/customer/home/body1";
import { Body5 } from "@/components/body/customer/home/body5";
import { Row, Col } from "antd";



export default function ListVouchers({ username }) {

    const router = useRouter()

    return (
        <>
            <Row>
                <Col span={24} className="margin_bottom_s1">
                    <Body1 />
                </Col>
                <Col span={24}  className="margin_bottom_s1">
                    <Body2 />
                </Col>
                <Col span={24}  className="margin_bottom_s1">
                    <Body5 />
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