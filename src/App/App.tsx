import React, { useEffect } from 'react';
/* Router Dom */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch } from '../redux/store';
import { fetchArticles } from '../redux/reducers/articlesReducer/articlesReducer';
import { type RootState } from '../redux/reducers/rootReducer';
import { setArticles } from '../redux/reducers/syncArticlesReducer/syncArticleReducer';
/* Pages */
import Articles from '../Articles/Articles';
import ArticlePage from '../Articles/ArticlePage/ArticlePage';
import Registration from '../Authorization/Registration/Registration';
import Login from '../Authorization/Login/Login';
import Profile from '../Authorization/Profile/Profile';
import CreateArticle from '../Article/CreateArticle/CreateArticle';
import EditArticle from '../Article/EditArticle/EditArticle';
/* Components */
import Header from '../Header/Header';

function App(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const offset = useSelector((state: RootState) => state.offset.offset);
  const isAuth = window.localStorage.getItem('isAuth');

  useEffect(() => {
    async function fetchApi(): Promise<void> {
      const articles = await dispatch(fetchArticles(offset));
      dispatch(setArticles([articles.payload.articles, articles.payload.articles[0]]));
    }

    void fetchApi();
  });

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:slug" element={<ArticlePage />} />
        <Route path="/sign-up" element={<Registration />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/new-article" element={isAuth === 'true' ? <CreateArticle /> : <Login />} />
        <Route path="/articles/:slug/edit" element={<EditArticle />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
