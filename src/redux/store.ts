import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';
import { moviesAPI } from '../services/MoviesService';
import { movieAPI } from '../services/MovieService';

export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(moviesAPI.middleware, movieAPI.middleware),
  });
const store = setupStore();
export default store;
export type RooteState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof setupStore>;
