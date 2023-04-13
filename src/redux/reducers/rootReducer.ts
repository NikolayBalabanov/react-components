import { combineReducers } from 'redux';
import movieSlice from '../slices/movieSlice';
import moviesSlice from '../slices/moviesSlice';

const rootReducer = combineReducers({
  movieSlice,
  moviesSlice,
});

export default rootReducer;
