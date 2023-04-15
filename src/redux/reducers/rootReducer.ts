import { combineReducers } from 'redux';
import movieSlice from '../slices/movieSlice';
import moviesSlice from '../slices/moviesSlice';
import searchSlice from '../slices/searchSlice';
import contactsSlice from '../slices/contactsSlice';

const rootReducer = combineReducers({
  movieSlice,
  moviesSlice,
  searchSlice,
  contactsSlice,
});

export default rootReducer;
