import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Main = () => {
  const [count, setCount] = useState(0);
  const { t } = useTranslation();

  return (
    <>
      <h1>{t('react')}</h1>
      <div className='card'>
        <button onClick={() => setCount(count => count + 1)}>{t('countIs', { count })}</button>
      </div>
    </>
  );
};

export default Main;
