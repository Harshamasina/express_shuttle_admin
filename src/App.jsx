import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import SessionTimeOut from './Components/SessionTimeOut';

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <SessionTimeOut />
                <Footer />
            </BrowserRouter>
        </>
    )
};

export default App;