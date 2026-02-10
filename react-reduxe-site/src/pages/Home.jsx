import { useSelector } from "react-redux";
import { useEffect } from "react";
import InstrumentsList from "../features/instruments/InstrumentsList";
import "../styles/home.css";

const Home = () => {
    const theme  = useSelector(state => state.ui.theme)

    useEffect(()=> {
        document.body.className = theme
    }, [theme])
    
    return (
        <main className="Home container">
            <h1>Добро пожаловать на наш сайт музыкальных инструментов</h1>
            <p>Откройте для себя лучший выбор инструментов для вашей музыкальной карьеры</p>
            <InstrumentsList />
        </main>
    )
}
export default Home