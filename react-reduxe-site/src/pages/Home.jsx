import { useSelector } from "react-redux";
import { useEffect } from "react";
import "../styles/home.css";



const Home = () => {
    const theme  = useSelector(state => state.ui.theme)

    useEffect(()=> {
        document.body.className = theme
    }, [theme])
    return (
        <main className="Home container">
            <h1>Главная страница</h1>
            <p>Добро пожаловать</p>
        </main>
    )
}
export default Home