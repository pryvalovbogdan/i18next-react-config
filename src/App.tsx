import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import './App.css';
import { Header } from './components/header';

const Main = lazy(() => import('./modules/main'));
const Notes = lazy(() => import('./modules/notes'));
const Hook = lazy(() => import('./modules/hook'));
const Login = lazy(() => import('./modules/login'));
const SignUp = lazy(() => import('./modules/signup'));

function App() {
  const token = localStorage.getItem('token');

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token]);

  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='notes' element={<Notes />} />
            <Route path='hook' element={<Hook />} />
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<SignUp />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}

export default App;
