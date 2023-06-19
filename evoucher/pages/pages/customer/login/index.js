
import { Button, Form, Input } from 'antd';
import { fetchDataClientSite } from '@/tools/axios';
import { useRouter } from 'next/router';
import { LayoutCustomer } from '@/components/layout/layout-customer';

export default function Login() {

    const router = useRouter();
    
    const onFinish = (values) => {
        console.log('Success:', values);

        fetchDataClientSite.post("/user/login", values).then((resp) => {
            const { data } = resp
            const { role } = data

            console.log({data})
            if (data.error) {
                alert(data.error)
            } else {
                if (role != 'customer') { //neu khong phai customer
                    router.push({
                        //chuyen trang partner / admin (mac dinh ds voucher)
                        pathname: "/pages/vouchers/list-vouchers",                                           
                    });
                }
                else {
                    router.push({
                        //pathname: "/pages/customer/voucher",
                        pathname: "/pages/customer/games",  
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
            pathname: "/pages/customer/login/register",
        });
    }

    return (
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
            Login
            <br/>
            <br/>
            
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Nhập username!',
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
                        message: 'Nhập password!',
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
                    Đăng nhập
                </Button>

                <Button type="primary" style={{ marginLeft: 20 }} onClick={register}>
                    Đăng ký
                </Button>

            </Form.Item>

            <Form.Item style={{ marginTop: "385px" }}>
         
            </Form.Item>
                
        </Form>
    )
}

Login.getLayout = function getLayout(page) {
    return (
        <LayoutCustomer>
            <Login />
        </LayoutCustomer>
    );
};
