import { combineReducers } from '@reduxjs/toolkit';
/* Reducers */
import { articlesSlice } from './articlesReducer/articlesReducer';
import { offsetReducer } from './offsetReducer/offsetReducer';
import { slugReducer } from './slugReducer/slugReducer';
import { currentReducer } from './currentReducer/currentReducer';
import { formInputReducer } from './formInputReducer/formInputReducer';
import { isAuthReducer } from './isAuthReducer/isAuthReducer';
import { loginErrorReducer } from './loginErrorReducer/loginErrorReducer';
import { activeUserReducer } from './activeUserReducer/activeUserReducer';
import { articleInputReducer } from './articleInputReducer/articleInputReducer';
import { tagsReducer } from './tagsReducer/tagsReducer';
import { articleReducer } from './articleReducer/articleReducer';
import { syncArticlesReducer } from './syncArticlesReducer/syncArticleReducer';

export const rootReducer = combineReducers({
  articles: articlesSlice.reducer,
  offset: offsetReducer,
  slug: slugReducer,
  current: currentReducer,
  inputs: formInputReducer,
  isAuth: isAuthReducer,
  isLoginError: loginErrorReducer,
  activeUser: activeUserReducer,
  articleInputs: articleInputReducer,
  tags: tagsReducer,
  article: articleReducer,
  syncArticles: syncArticlesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
