import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import { Header } from './components/header';

const Main = lazy(() => import('./modules/main'));
const Notes = lazy(() => import('./modules/notes'));
const Hook = lazy(() => import('./modules/hook'));

const deprecatedMethod = () => {};

deprecatedMethod();

function App() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='notes' element={<Notes />} />
            <Route path='hook' element={<Hook />} />
            <Route path='*' element={<Main />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
}

export default App;
