import { useSelector } from "react-redux";

const Home = () => {
    const theme  = useSelector(state => state.ui.theme)
    const ui = useSelector(state => state.ui);
    const user = ui.userInfo;
    const stats = ui.stats;
    
    return(
        <main style={{
            padding: '40px',
            minHeight: '60px',
            background: theme === 'light' ? "#fff": '#333',
            color: theme === 'light' ? "#000": '#fff'
        }}>
            <h2>Главная страница</h2>
            <p>Добро пожаловать на сайт REDUX!</p>
            <div style={{
                marginTop: '30px',
                padding: '20px',
                border: '2px solid #646cff',
                borderRadius: '10px'
            }}>

                <h3>Данный Redux Store:</h3>
                <p><strong>Тема:</strong> {theme}</p>
                <p><strong>Имя:</strong> {user.name}</p>
                <p><strong>Возраст:</strong> {user.age}</p>
                <p><strong>Город:</strong> {user.city}</p>
                <p><strong>Посетителей:</strong> {stats.visitors}</p>
                <p><strong>Онлайн:</strong> {stats.online}</p>

            </div>
        </main>
    )
}

export default Home