import { combineReducers } from '@reduxjs/toolkit';
/* Reducers */
import { articlesSlice } from './articlesReducer/articlesReducer';
import { offsetReducer } from './offsetReducer/offsetReducer';
import { slugReducer } from './slugReducer/slugReducer';
import { currentReducer } from './currentReducer/currentReducer';

export const rootReducer = combineReducers({
  articles: articlesSlice.reducer,
  offset: offsetReducer,
  slug: slugReducer,
  current: currentReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
