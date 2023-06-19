import LayoutPage from "@/components/layout";
import { useEffect, useState } from "react";
import { fetchDataClientSite } from "@/tools/axios";
import { Button, Space, Table, Tag, Form, Input } from 'antd';
import Cookies from "cookies";
import { LayoutCustomer } from "@/components/layout/layout-customer";

const onFinish = (values) => {
    console.log({ values });
    message.success('Cập nhật thành công!');
};

export default function Profile({ role }) {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log({ values })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        fetchDataClientSite.get("/customer/get-customer").then((resp) => {
            const { data } = resp

            console.log({ data: data?.result?.rows?.[0] })

            form.setFieldsValue(data?.result?.rows?.[0])
        })
    }, [])

    return (<Form
        form={form}

        name="basic"
        labelCol={{
            span: 8,
        }}
        wrapperCol={{
            span: 16,
        }}
        style={{
            maxWidth: 600,
        }}
        initialValues={{
            remember: true,
        }}

        disabled={false}

        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
        <Form.Item
            label="Username"
            name="username"
            rules={[
                {
                    required: true,
                    message: 'Please input your username!',
                },
            ]}
        >
            <Input disabled/>
        </Form.Item>

        <Form.Item
            label="Phone"
            name="phone"
            rules={[
                {
                    required: true,
                    message: 'Please input your phone!',
                },
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Address"
            name="address"
            rules={[
                {
                    required: true,
                    message: 'Please input your address!',
                },
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="Password"
            name="password"
            rules={[
                {
                    required: true,
                    message: 'Please input your password!',
                },
            ]}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item
            label="Full name"
            name="fullname"
            rules={[
                {
                    required: true,
                    message: 'Please input your full name!',
                },
            ]}
        >
            <Input />
        </Form.Item>

        <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '40px' }}>              
                 <Button type="primary" htmlType="submit">Cập nhật</Button>
            </div>
        </Form.Item>


    </Form>)
}

Profile.getLayout = function getLayout(page) {
    return (
        <LayoutCustomer fullname={page.props.fullname} role={page.props.role}>
            <Profile role={page.props.role} />
        </LayoutCustomer>
    );
};

export async function getServerSideProps({ req, res }) {

    const cookies = new Cookies(req, res)

    const token = cookies.get('token')
    const username = cookies.get('username')
    const fullname = cookies.get('fullname')
    const role = cookies.get('role')

    console.log({ role })

    if (!token) return {
        redirect: {
            permanent: true,
            destination: '/pages/customer/login'
        }
    }

    if (role != 'customer') return {
        redirect: {
            permanent: true,
            destination: '/pages/vouchers/list-vouchers'
        }
    }

    return { props: { token, username, fullname, role } }
}