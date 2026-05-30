import './App.css'
import { Routes, Route } from "react-router-dom";

import AuthPage from './pages/auth';
import Toolbox from './components/toolbox';

function App() {
    return (
        <>
            <Toolbox/>
            <div className='page'>
                <Routes>
                    <Route path="/auth" element={ <AuthPage /> }/>
                </Routes>
            </div>
        </>
    )
}

export default App;