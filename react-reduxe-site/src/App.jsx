import { useSelector } from 'react-redux';
import AuthPage from './features/auth/AuthPage';
import Header from './assets/Header';
import Footer from './assets/Footer';
import Home from './pages/Home';
import TodoList from './app/TodoList';

function App() {
  const currentUser = useSelector(state => state.auth.currentUser);

  if (!currentUser) {
    return <AuthPage />;
  }

  return (
    <>
      <Header />
      <Home />
      <TodoList />
      <Footer />
    </>
  );
}

export default App;