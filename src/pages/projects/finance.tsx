import Footer from "../../components/footer";
import Nav from "../../components/nav";

export default function Finance() {
    return (
        <>
            <div className="shell" id="v">
                <Nav />
            </div>
            <div className="project-shell">
                <h2>Automated Personal Finance Tracker</h2>
                <img src='/finance-2.png' className="data-img" />

                <p>An AI-powered mobile app for tracking personal finances, allowing users to scan receipts for automated expense tracking and budgeting.
                    Currently in development.
                </p>

                <h3>Features</h3>
                <ul>
                    <li>
                        <p>Expense tracking</p>
                    </li>
                    <li>
                        <p>Receipt scanning</p>
                    </li>
                    <li>
                        <p>Automated spending categorisation</p>
                    </li>
                    <li>
                        <p>Spending records and analytics</p>
                    </li>
                    <li>
                        <p>Monthly budgeting</p>
                    </li>
                </ul>

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
