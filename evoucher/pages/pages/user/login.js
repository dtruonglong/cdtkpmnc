
import { Button, Form, Input } from 'antd';
import { fetchDataClientSite } from '@/tools/axios';

import { LayoutLogin } from "@/components/layout/layout-login";
import { useRouter } from 'next/router';


export default function Login() {

    const router = useRouter();

    const onFinish = (values) => {
    
        fetchDataClientSite.post("/user/login", values).then((resp) => {
            const { data } = resp
            const { role } = data
            if (data.error) {
                alert(data.error)
            } 
            else {
                if (role != 'customer') {
                    router.push({
                        pathname: "/pages/vouchers/list-vouchers",
                    });
                }
                else {
                    router.push({
                        pathname: "/pages/customer/voucher",
                    });
                }
            }
        }).catch(e => {
            alert('Wrong username or password')
        })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    function register() {
        router.push({
            pathname: "/pages/user/register",
        });
    }

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
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>

                    <Button type="primary" style={{ marginLeft: 20 }} onClick={register}>
                        Register
                    </Button>
                </Form.Item>


            </Form>
        </>
    )
}

Login.getLayout = function getLayout(page) {
    return (
        <LayoutLogin>
            <Login />
        </LayoutLogin>
    );
};
