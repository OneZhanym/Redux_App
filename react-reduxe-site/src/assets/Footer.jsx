import { useSelector } from "react-redux";
import "../styles/footer.css"

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <p>2026 мой сайт на REDUX</p>

            <div className="footer-linkcs">
                <a href="#">О нас</a>
                <span className="footer-divider">|</span>
                <a href="#">Контакты</a>
            </div>
            </div>
        </footer>
    )
}

export default Footer