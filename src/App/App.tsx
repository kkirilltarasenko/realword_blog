import React, { useEffect } from 'react';
/* Router Dom */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch } from '../redux/store';
import { fetchArticles } from '../redux/reducers/articlesReducer/articlesReducer';
import { type RootState } from '../redux/reducers/rootReducer';
/* Pages */
import Articles from '../Articles/Articles';
import ArticlePage from '../Articles/ArticlePage/ArticlePage';
import Registration from '../Authorization/Registration/Registration';
import Login from '../Authorization/Login/Login';
import Profile from '../Authorization/Profile/Profile';
/* Components */
import Header from '../Header/Header';

function App(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const offset = useSelector((state: RootState) => state.offset.offset);

  useEffect(() => {
    async function fetchApi(): Promise<void> {
      await dispatch(fetchArticles(offset));
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
