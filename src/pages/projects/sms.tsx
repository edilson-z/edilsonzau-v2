import Footer from "../../components/footer";

export default function Sms() {
    return (
        <div className="project-shell">
            <img src="/sms.png" className="data-img" />
            <h2>Agri SMS Chatbot</h2>
            <p>Namibia's agriculture sector is vital for food security and economic growth (60% rely on it for
                livelihood).
                Lack of data on critical aspects like crop yields, losses, and access to resources is a challenge.
                This hinders effective government support for Namibian farmers.
                Rural Namibian farmers struggle to access crucial information.
                This information gap limits their decision-making, affecting production and income.
                This project offers a possibility to fill this gap for rural agricultural data collection and
                information sharing by providing a low-cost, offline-capable SMS chatbot engine that bridges the
                communication
                gap between
                rural smallholder farmers and institutional stakeholders. The system replaces paper-based field
                reporting
                with an automated data pipeline, allowing users on basic feature phones to submit multi-category
                reports
                on crop yields, pest outbreaks, and market trends. On the backend, it runs a high-volume SMS gateway
                architecture, a longitudinal farmer database, and an administrative dashboard featuring actionable
                data visualizations to help stakeholders optimize geographical reach and allocate aid resources
                efficiently.
            </p>

            <h3>Features</h3>
            <ul>
                <li>
                    <p>Automated Data Collection</p>
                </li>
                <li>
                    <p>Information Sharing</p>
                </li>
                <li>
                    <p>Data Analytics and Dashboards</p>
                </li>
            </ul>

            <h3>Data Collection Feature</h3>
            <img src="/image7.webp" className="data-img" />
            <p>The data collection feature works by running an SMS survey directly on the farmers phone. The diagram
                shows the chatbot initiating a conversation with a farmer through their phone number.
                This message prompts the user to participate in the SMS survey for data collection.</p>

            <img src="/image9.webp" className="data-img" />
                <p>Once the client conscents to the survey a flusk session runs for data collection. The diagram
                    illustrates the
                    process of conducting an SMS-based survey with rural farmers, from the initial message to the
                    storage of responses and generation of follow-up questions.</p>

                <h3>Information Sharing Feature</h3>
                <img src="/image11.webp" className="data-img" />
                <p>The Information Sharing Component facilitates the distribution of targeted agricultural advice,
                    market prices, weather updates, and best farming practices through SMS messages.
                    The diagram shows the farmer sending a message to the chatbot and the chatbot processing it, storing
                    the data, and generating a response.
                </p>

                <h3>Data Analytics Feature</h3>
                <img src="/image25.webp" className="data-img" />
                <p>The Data Analytics Component processes the collected data to generate actionable insights about
                    farming patterns, common challenges and needs across rural areas. The diagram
                    illustrates the data analytics generation process. It begins with querying the database for the
                    latest data. Then, it proceeds with data preprocessing, where the collected SMS data is cleaned,
                    standardised, and transformed into a suitable format for analysis.</p>

                <h3>Data Dashboards Demo</h3>
                <img src="/image8.webp" className="data-img" />
                <img src="/image10.webp" className="data-img" />
                <br />
                <br />
                <br />
                <br />
                <br />
                <Footer />
        </div>
    )
}