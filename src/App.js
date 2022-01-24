import './App.css';
import Welcome from './components/Welcome/Welcome';
import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import NotDefined from './components/NotDefined/NotDefined';

function App() {
    return (
        <div className='conatainer z-depth-3'>
            <HashRouter>
                <Routes>
                    <Route path='/' element={<Welcome />} />
                    <Route path='/homepage' element={<HomePage />} />
                    <Route path='*' element={<NotDefined />} />
                </Routes>
            </HashRouter>
        </div>
    );
}

export default App;
