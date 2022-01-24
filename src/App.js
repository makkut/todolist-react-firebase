import './App.css';
import Welcome from './components/Welcome/Welcome';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import NotDefined from './components/NotDefined/NotDefined';

function App() {
    return (
        <div className='conatainer z-depth-3'>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Routes>
                    <Route path='/' element={<Welcome />} />
                    <Route path='/homepage' element={<HomePage />} />
                    <Route path='*' element={<NotDefined />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
