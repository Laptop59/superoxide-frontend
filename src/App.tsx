import { useState } from 'react'
import './App.css'

import Welcome from './welcome';
import Toolbox from './toolbox';

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