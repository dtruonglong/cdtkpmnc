import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer: FooterAntd } = Layout;
import styles from "./layout.module.css"


export function Footer() {

    return <FooterAntd style={{
        textAlign: 'center',
    }}
    className={styles.footer}>
        {/* FOOTER */}
    </FooterAntd>
}