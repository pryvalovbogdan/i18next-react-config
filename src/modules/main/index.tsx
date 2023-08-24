import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Main = () => {
  const [count, setCount] = useState(0);
  const { t } = useTranslation();

  return (
    <>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount(count => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        {t('someTranslatableText')}
      </div>
      <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
    </>
  );
};

export default Main;
