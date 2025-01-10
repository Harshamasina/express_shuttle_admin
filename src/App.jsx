import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';


const App = () => {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Footer />
            </BrowserRouter>
        </>
    )
};

export default App;