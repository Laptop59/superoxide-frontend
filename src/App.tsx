import './App.css'
import { Routes, Route } from "react-router-dom";

import AuthPage from './pages/auth';
import Toolbar from './components/toolbar';
import { useEffect, useState } from 'react';
import { me, type UserDetails } from './api';

function App() {
    const [user, setUser] = useState<UserDetails | undefined>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetch() {
            try {
                setUser(await me());
            } catch(e) {
                console.error("Could not fetch user details:", e);
            } finally {
                setLoading(false);
            }
        }

        fetch();
    }, []);

    return (
        <>
            <Toolbar
                user={user}
                signOutUser={() => alert("TODO")}
            />
            <div className='page'>
                {!loading && <FrontendRoutes setUser={setUser}/>}
            </div>
        </>
    )
}

type FrontendRoutesProps = {
    setUser: (user: UserDetails | undefined) => void
};

function FrontendRoutes({
    setUser
}: FrontendRoutesProps) {
    return (
        <Routes>
            <Route path="/auth" element={ <AuthPage setUser={setUser}/> }/>
        </Routes>
    );
}

export default App;