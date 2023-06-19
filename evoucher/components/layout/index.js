import { FileOutlined, PieChartOutlined, UserOutlined, DesktopOutlined, TeamOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Button } from 'antd';
import { useEffect, useState } from 'react';
const { Header, Content, Footer, Sider } = Layout;
import Link from 'next/link';
import { useRouter } from 'next/router';
import { fetchDataClientSite } from '@/tools/axios';
import { allowAccess } from '@/tools/utils';

const LayoutPage = ({ children, fullname, role }) => {

    const router = useRouter()


    function logout() {
        fetchDataClientSite.post("/user/logout").then((resp) => {

            router.push({
                path: "/pages/user/login"
            })
        })
    }


    function getItem(allowRoles, label, key, icon, children) {
        if (allowAccess(role, allowRoles)) {
            return {
                key,
                icon,
                children,
                label,
            };
        }
        return null
    }

    const items = [
        
        getItem(['partner'], <Link href="/pages/vouchers/list-vouchers">View all vouchers</Link>, '0', <PieChartOutlined />),
        getItem(['admin'], <Link href="/pages/vouchers/list-vouchers">Statistical</Link>, '1', <PieChartOutlined />),
        getItem(['partner'], <Link href="/pages/vouchers/create-campaign">Create campaign</Link>, '2', <DesktopOutlined />),
        getItem(['partner'], <Link href="/pages/vouchers/waiting-vouchers"> All campaigns </Link>, '3', <TeamOutlined />),
        getItem(['admin',], <Link href="/pages/vouchers/accept-vouchers"> Accept campaigns </Link>, '4', <TeamOutlined />),
        getItem(['customer'], <Link href="/pages/games"> Voucher Hunting</Link>, '5', <FileOutlined />),
        getItem(['admin'], <Link href="/pages/user/list-users"> User List</Link>, '6', <FileOutlined />),
    ];

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div
                    style={{
                        height: 32,
                        margin: 16,
                        background: 'rgba(255, 255, 255, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                    }}
                    >
                        DASHBOARD
                    
                </div>
                
                <Menu theme="dark" mode="inline" items={items} />
            </Sider>
            <Layout className="site-layout">
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    Hello {fullname},
                    <Button onClick={logout}>Logout</Button>
                </Header>
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    
                    {children}
                    
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    {/* FOOTER */}
                </Footer>
            </Layout>
        </Layout>
    );
};
export default LayoutPage;