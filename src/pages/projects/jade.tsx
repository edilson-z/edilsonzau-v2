import Footer from "../../components/footer";
import Nav from "../../components/nav";

export default function Jade() {
    return (
        <>
            <div className="shell" id="iv">
                <Nav />
            </div>
            <div className="project-shell">
                <h2>Jade Garden</h2>
                <img src='/jade-3.png' className="data-img" />

                <p>This is a lightweight, mobile-first e-commerce web application for Jade Garden, a premier Chinese
                    restaurant located within the Marigold Hotel. The solution digitises the in-dining experience by
                    using integrated, table-specific QR codes that instantly route guests to a localised digital menu
                    upon scanning, enabling them to browse the menu and place orders directly from their tables,
                    minimising operational friction, optimising waitstaff utilisation, and accelerating kitchen order
                    fulfilment.
                </p>

                <h3>Features</h3>
                <ul>
                    <li>
                        <p>E-commerce</p>
                    </li>
                    <li>
                        <p>Table-Specific QR Codes</p>
                    </li>
                    <li>
                        <p>Mobile-First Design</p>
                    </li>
                    <li>
                        <p>Direct Table Ordering</p>
                    </li>
                </ul>

                <h3>Demo</h3>
                <div className="jade-images">
                    <img src="/IMG_7952.webp" className="jade-img" />
                    <img src="/IMG_7953.webp" className="jade-img" />
                    <img src="/IMG_8129.webp" className="jade-img" />
                </div>


                <br />
                <br />
                <br />
                <br />
                <br />
                <Footer />
            </div>
        </>
    )
}