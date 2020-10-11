import React, { PropsWithChildren } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render as rtlRender, RenderOptions, RenderResult } from '@testing-library/react';
import { configureStore, EnhancedStore, DeepPartial } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import reducer from '../store/reducers';
import { RootState } from '../store/redux';

interface CustomRenderOptions extends Omit<RenderOptions, 'queries'> {
  initialState?: DeepPartial<RootState>;
  store?: EnhancedStore<RootState>;
}

function render(
  ui: React.ReactElement,
  {
    initialState,
    store = configureStore({ reducer, preloadedState: initialState }),
    ...renderOptions
  }: CustomRenderOptions = {},
): [RenderResult, EnhancedStore<RootState>] {
  function Wrapper({ children }: PropsWithChildren<void>): JSX.Element {
    return (
      <MemoryRouter>
        <Provider store={store}>{children}</Provider>
      </MemoryRouter>
    );
  }

  return [rtlRender(ui, { wrapper: Wrapper as never, ...renderOptions }), store];
}

export * from '@testing-library/react';
export { render as providerRender };
