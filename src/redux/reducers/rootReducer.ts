import { combineReducers } from 'redux';
import searchSlice from '../slices/searchSlice';
import contactsSlice from '../slices/contactsSlice';
import { moviesAPI } from '../../services/MoviesService';
import { movieAPI } from '../../services/MovieService';

const rootReducer = combineReducers({
  searchSlice,
  contactsSlice,
  [moviesAPI.reducerPath]: moviesAPI.reducer,
  [movieAPI.reducerPath]: movieAPI.reducer,
});

export default rootReducer;
