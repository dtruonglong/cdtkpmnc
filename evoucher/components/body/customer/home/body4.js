import { useState } from "react"
import { Card } from "../card";
import { useRouter } from "next/router";
import { Row, Col } from "antd";

import { v4 as uuidv4 } from 'uuid';

export function Body4() {
    const router = useRouter()

    const [categories, setCategories] = useState([
        {
            category: "Shelf",
            image: "https://scontent.fsgn6-1.fna.fbcdn.net/v/t1.15752-9/350377338_804727974554404_8945940397861679970_n.png?_nc_cat=107&ccb=1-7&_nc_sid=ae9488&_nc_ohc=f7QUkyV-tYYAX9IAREH&_nc_ht=scontent.fsgn6-1.fna&oh=03_AdTAVVjiuudtwbsRNFFilUCLm4ui1sns3F-3sN-Jz2o1iA&oe=649FF477"
        },
        {
            category: "Shelf",
            image: "https://scontent.fsgn12-1.fna.fbcdn.net/v/t1.15752-9/350373841_777583020514309_1693766458491835021_n.png?_nc_cat=102&ccb=1-7&_nc_sid=ae9488&_nc_ohc=U-JKAdw_JxkAX94udaq&_nc_oc=AQlGwMR-7Uwmie0-PCtMcYIOv9LI1B6GpmvHSBAt_nGjqju74BD247iuO0x4mLt93Bs&_nc_ht=scontent.fsgn12-1.fna&oh=03_AdQifNrhw59jJRDdDxwW3QAFKXerEoCMs0zYC6-k-seNHg&oe=64A00E73"
        },
        {
            category: "Bed Cabinet",
            image: "https://scontent.fsgn6-2.fna.fbcdn.net/v/t1.15752-9/350285362_588951116677254_7908521601485148842_n.png?_nc_cat=108&ccb=1-7&_nc_sid=ae9488&_nc_ohc=8i5Os9YnnywAX-fZZkt&_nc_ht=scontent.fsgn6-2.fna&oh=03_AdTQsnNupYaKU0WtYfd0ch1uGZC3LWiDjcZp3Qx04F6x6A&oe=649FFD22"
        },
        {
            category: "Tea table",
            image: "https://scontent.fsgn12-1.fna.fbcdn.net/v/t1.15752-9/350892770_920006815733099_7644406946125916919_n.jpg?stp=dst-jpg_s2048x2048&_nc_cat=101&ccb=1-7&_nc_sid=ae9488&_nc_ohc=tkv8ceBsu5IAX_AkE9O&_nc_ht=scontent.fsgn12-1.fna&oh=03_AdTcD1WVfqWbPDKE-j0zQISlkffYS1Mq7IIjuLn-zs4B3A&oe=64A00EE9"
        }
    ])

    return (
        <Row >
            {
                categories.map((value) => <Col justify="center" align="middle" key={uuidv4()} xl={6} xs={24}>
                    <Card  category={value.category} image={value.image} />
                </Col>)
            }
        </Row>
   )
}