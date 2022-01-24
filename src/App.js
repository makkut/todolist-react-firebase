import './App.css';
import Welcome from './components/Welcome/Welcome';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import NotDefined from './components/NotDefined/NotDefined';

function App() {
    return (
        <div className='conatainer z-depth-3'>
            <h1>fdsf</h1>
            <Router basename='/todolist-react-firebase'>
                <Routes>
                    <Route path='/' element={<Welcome />} />
                    <Route path='/homepage' element={<HomePage />} />
                    <Route path='*' element={<NotDefined />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
