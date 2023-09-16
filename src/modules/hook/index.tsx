import { useEffect, useLayoutEffect, useState } from 'react';

import { useReducerData, useStateCustom } from '../../hooks/useStateCustom.ts';
import { ButtonWithTranslate } from '../../components/buttonWithTranslate';
import { IData } from './types.ts';
import { generateData } from './utils.ts';

const Hook = () => {
  const [customCount, setCustomCount] = useStateCustom(1);
  const [state, dispatch] = useReducerData();
  const [data, setData] = useState<IData[]>(() => {
    console.log('initial');
    return generateData();
  });

  useEffect(() => {
    console.log('useEffect');
    setData(generateData());
    setCustomCount(2);
  }, []);

  useLayoutEffect(() => {
    console.log('useLayoutEffect');
    setData(generateData());
  }, []);

  console.log('data', data, customCount, state);

  return (
    <div>
      <div className='card'>
        <ButtonWithTranslate
          i18Key='count'
          handle={() => {
            dispatch({ type: 'increase' });
          }}
          i18Value={customCount}
        />
      </div>
    </div>
  );
};

export default Hook;
