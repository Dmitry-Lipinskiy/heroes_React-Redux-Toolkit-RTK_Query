import { configureStore } from '@reduxjs/toolkit';

import filters from '../slices/filters';
import { apiHeroes } from '../slices/apiHeroes';

const stringMiddleware = () => (next) => (action) => {
  if (typeof action === 'string') {
    return next({
      type: action,
    });
  }
  return next(action);
};

export const store = configureStore({
  reducer: { filters, [apiHeroes.reducerPath]: apiHeroes.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stringMiddleware, apiHeroes.middleware),
  davTools: process.env.NODE_ENV !== 'production',
});