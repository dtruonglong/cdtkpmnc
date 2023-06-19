import styles from "./layout.module.css"
import { BsCart2 } from 'react-icons/bs'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { Row, Col, Button } from "antd"
import { useRouter } from 'next/router';
import { fetchDataClientSite } from "@/tools/axios";
import { AiOutlineHome } from 'react-icons/ai';


export function Header({ fullname }) {


    const router = useRouter()

    function toLoginPage() {
        router.push({
            pathname: "/pages/customer/login"
        })
    }

    function logout() {

        fetchDataClientSite.post("/user/logout").then((resp) => {
            alert('log out?')
            router.push({
                path: "/pages/customer/login"
            })
        })
    }

    function toVoucherHunting() {
        router.push({
            pathname: "/pages/customer/games"
        })
    }

    function toProfile() {
        router.push({
            pathname: "/pages/customer/home/profile"
        })
    }

    function toVouchers() {
        router.push({
            pathname: "/pages/customer/voucher"
        })
    }

    function toHomePage() {
        router.push({
            pathname: "/pages/customer/home"
        })
    }

    function toGamePage_() {
        router.push({
            pathname: "/pages/customer/games"
        })
    }

    return (<Row align="middle" justify="center" className={styles.header}>

        <Col xs={24} xl={12}>
            <Row onClick={toHomePage} style={{ cursor: "pointer" }}>
                <Col xl={1} xs={0}>
                </Col>
                <Col xl={23} xs={24} className={styles.header_left}>
                <AiOutlineHome />
                </Col>
            </Row>
        </Col>

        <Col xs={24} xl={12} className={styles.header_right}>
            <Row align="middle" justify="center">
                <Col xl={16} xs={24} >
                    <Row align="middle" justify="center" >
                        <Col xl={7} xs={24} onClick={toVouchers} style={{ cursor: "pointer" }}>Voucher của tôi</Col>
                        <Col xl={10} xs={24} onClick={toVoucherHunting} style={{ cursor: "pointer" }}>Săn Voucher</Col>
                        <Col xl={7} xs={24}>{fullname && <Button onClick={logout} style={{ cursor: "pointer" }}>Logout</Button>}</Col>
                    </Row>
                </Col>

                <Col xl={8} xs={24}>
                    <Row align="middle" justify="center">

                        <Col span={8}><HiOutlineUserCircle size={25} onClick={toProfile} style={{ cursor: "pointer" }}/></Col>

                        {!fullname && <Col span={16} onClick={toLoginPage} style={{ cursor: "pointer" }}> Login</Col>}
                        {fullname && <Col span={16}>Xin chào, {fullname}</Col>}
                    </Row>
                </Col>

            </Row>
        </Col>
    </Row>
    )
}