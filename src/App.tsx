import './App.css'
import { Routes, Route } from "react-router-dom";

import AuthPage from './pages/auth';
import Toolbar from './components/toolbar';
import { me, signOutAccount, type UserDetails } from './api';
import MyTests from './pages/my-tests';
import { QueryClient, QueryClientProvider, useMutation, useQuery } from '@tanstack/react-query';
import EditTest from './pages/edit-test/';

function App() {
    const queryClient = new QueryClient();

    const user = useQuery({
        queryKey: ["me"],
        queryFn: me
    }, queryClient);

    const loading = user.isPending;

    const signOutMutation = useMutation({
        mutationFn: signOutAccount,
        onSuccess: async () => {
            queryClient.setQueryData<UserDetails>(
                ["me"],
                undefined
            );
        }
    }, queryClient);

    return (
        <QueryClientProvider client={queryClient}>
            <Toolbar
                user={user.data}
                signOutUser={signOutUser}
            />
            <div className='page'>
                {!loading && <FrontendRoutes />}
            </div>
        </QueryClientProvider>
    )

    async function signOutUser() {
        signOutMutation.mutate();
    }
}

function FrontendRoutes() {
    return (
        <Routes>
            <Route path="/auth" element={ <AuthPage /> } />
            <Route path="/my-tests" element={ <MyTests /> } />
            <Route path="/edit-test/:testId" element={ <EditTest /> } />
        </Routes>
    );
}

export default App;