import { Header } from "./header";
import { Footer } from "./footer";
import styles from "./layout.module.css"

export function LayoutCustomer({ children, fullname, role }) {
    
   console.log({fullname})

    return (<div className={styles.body}>
        <Header fullname={fullname} />
        {children}
        <Footer />
    </div>)
}