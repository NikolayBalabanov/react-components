import { combineReducers } from 'redux';
import movieSlice from '../slices/movieSlice';
import moviesSlice from '../slices/moviesSlice';
import searchSlice from '../slices/searchSlice';

const rootReducer = combineReducers({
  movieSlice,
  moviesSlice,
  searchSlice,
});

export default rootReducer;
