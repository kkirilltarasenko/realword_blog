import React, { type FC } from 'react';
import { useArticle } from '../../Hooks/useArticle';
import ReactMarkdown from 'react-markdown';
/* Redux */
import { useSelector } from 'react-redux';
import { type RootState } from '../../redux/reducers/rootReducer';
import { type Article } from '../../redux/reducers/articlesReducer/articlesTypes';
/* Style */
import './ArticlePage.scss';
/* Components */
import ArticleComponent from '../ArticleComponent/ArticleComponent';

const ArticlePage: FC = (): JSX.Element => {
  const slug: string = useSelector((state: RootState) => state.slug.slug);
  const articles = useSelector((state: RootState) => state.articles.articles);
  const article: Article | null = useArticle(slug, articles);

  return article !== null ? (
    <div className="article__page">
      <ArticleComponent article={article} />
      <div className="article__body">
        <ReactMarkdown>{article.body}</ReactMarkdown>
      </div>
    </div>
  ) : (
    <h1>Error: 404</h1>
  );
};

export default ArticlePage;
