import { IData } from './types.ts';

export function generateData() {
  const data: IData[] = [];

  for (let i = 0; i < 50; i++) {
    data.push({
      id: i,
      number: i,
    });
  }
  return data;
}
