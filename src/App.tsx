import { useState } from 'react'
import './App.css'

import Welcome from './components/welcome';
import Toolbox from './components/toolbox';

function App() {
    return (
        <>
            <Toolbox/>
            <div className='content'>
                <Welcome/>
            </div>
        </>
    )
}

export default App;