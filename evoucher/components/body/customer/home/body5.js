import styles from "./body5.module.css"
import { Row, Col } from "antd"

export function Body5() {

    return (
        <Row>
            <Col xl={12} xs={24}>
                <div className={styles.body51}>
                    <img className="image_responsive image" src="https://m.media-amazon.com/images/I/61u7d5AulxL._AC_UF894,1000_QL80_.jpg" />
                </div>
            </Col>

            <Col xl={12} xs={24} className={styles.body5}>

                <div className={styles.body52}>
                    <div style={{
                        fontSize: 15,
                        fontWeight: "lighter",
                        paddingLeft: "5rem",
                        paddingRight: "5rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexFlow: "column",
                        height: "100%"
                    }}>
                        <div style={{
                            fontSize: 40,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            A Bit about Us
                        </div>
                        <div style={{
                            paddingTop: 20,
                            fontSize: 15,
                            lineHeight: "1.875em"
                        }}>
                            long7vn@gmail.com <br/> 
                            227 Nguyen Van Cu, HCMC
                        </div>
                        <div style={{
                            marginTop: 80,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <a href="#" className={styles.body5_contactus}
                            >
                                Contact Us</a>
                        </div>

                    </div>
                </div>
            </Col>
        </Row>
    )
}