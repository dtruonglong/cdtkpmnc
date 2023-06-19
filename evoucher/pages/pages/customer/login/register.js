
import { Button, Checkbox, Form, Input } from 'antd';
import { LayoutLogin } from "@/components/layout/layout-login";
import { fetchDataClientSite } from '@/tools/axios';
import { useRouter } from 'next/router';
import { LayoutCustomer } from '@/components/layout/layout-customer';

export default function Register() {

    const router = useRouter()

    const onFinish = (values) => {
        values = { ...values, role: "customer" }

        fetchDataClientSite.post("/user/insert-user", values).then((resp) => {
            const { data } = resp
            alert('Register successfully')

            router.push({
                pathname: "/pages/customer/login",
            });
        })


    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    return (
        <>
            <Form
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

                <Form.Item
                    label="Phone number"
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
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

Register.getLayout = function getLayout(page) {
    return (
        <LayoutCustomer>
            <Register />
        </LayoutCustomer>
    );
};
