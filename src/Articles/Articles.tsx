import React, { type FC } from 'react';
/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { type RootState } from '../redux/reducers/rootReducer';
import { type AppDispatch } from '../redux/store';
import { type Article } from '../redux/reducers/articlesReducer/articlesTypes';
import { setOffset } from '../redux/reducers/offsetReducer/offsetReducer';
import { setCurrent } from '../redux/reducers/currentReducer/currentReducer';
/* Components */
import ArticleComponent from './ArticleComponent/ArticleComponent';
import { Pagination, Spin } from 'antd';
/* Style */
import './Articles.scss';

const Articles: FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const syncArticles = useSelector((state: RootState) => state.syncArticles.articles);
  const current = useSelector((state: RootState) => state.current.current);

  const changePage = (page: number): void => {
    dispatch(setCurrent(page));
    dispatch(setOffset((page - 1) * 5));
  };

  return syncArticles.length !== 0 ? (
    <div className="articles">
      {syncArticles.map((article: Article) => {
        return <ArticleComponent key={Math.random()} article={article} />;
      })}
      <div className="articles__pagination">
        <Pagination
          onChange={(page: number) => {
            changePage(page);
          }}
          current={current}
          total={50}
          pageSize={1}
        />
      </div>
    </div>
  ) : (
    <div className="loading">
      <Spin tip="Loading" size="large">
        Loading
      </Spin>
    </div>
  );
};

export default Articles;
