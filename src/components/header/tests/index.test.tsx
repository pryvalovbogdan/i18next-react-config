import { renderWithProviders } from '../../../utils/testsUtils.tsx';

import { Header } from '../index.tsx';

describe('Test Header', () => {
  test('snapshot', () => {
    const { baseElement } = renderWithProviders(<Header />);

    expect(baseElement).toMatchSnapshot();
  });
});
