import styles from "./body2.module.css"

import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css";
export function Body2() {

    return (
        <Carousel
            showThumbs={false}
            autoPlay={true}
            infiniteLoop={true}
        >

            <div >
                <img src="/body21.jpg" height={300} className="image" />
            </div>

            <div >
                <img src="/body22.jpg" height={300} className="image" />
            </div>

            <div>
                <img src="/body23.jpg" height={300} className="image"/>
            </div>
        </Carousel>

    )
}
