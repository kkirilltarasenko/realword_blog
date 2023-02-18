import React, { type FC } from 'react';
/* React Router */
import { Link } from 'react-router-dom';
/* Redux */
import { useDispatch } from 'react-redux';
import { type AppDispatch } from '../../redux/store';
import { type Article } from '../../redux/reducers/articlesReducer/articlesTypes';
import { setSlug } from '../../redux/reducers/slugReducer/slugReducer';
/* Components */
import { HeartOutlined } from '@ant-design/icons';
/* Style */
import './ArticleComponent.scss';
import { Tag } from 'antd';
import { format } from 'date-fns';

interface ArticleProps {
  article: Article;
}

const ArticleComponent: FC<ArticleProps> = ({ article }): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const onLinkClick = (slug: string): void => {
    dispatch(setSlug(slug));
  };

  const date = format(new Date(article.createdAt), 'MMMM d, uuu');

  return (
    <div className="article">
      <div className="article__content">
        <div className="article__title--box">
          <Link
            onClick={() => {
              onLinkClick(article.slug);
            }}
            to={`/articles/${article.slug}`}
            className="article__title"
          >
            {article.title}
          </Link>
          <div className="article__favorite--box">
            <HeartOutlined />
            <h2 className="articles_favorite">{article.favoritesCount}</h2>
          </div>
        </div>
        <div className="article__tags">
          {article.tagList.map((el: string) => {
            return <Tag key={Math.random()}>{el}</Tag>;
          })}
        </div>
        <p className="article__text">{article.description}</p>
      </div>
      <div className="article__author">
        <div className="article__author--box">
          <h2 className="article__author--name">{article.author.username}</h2>
          <h3 className="article__author--date">{date}</h3>
        </div>
        <img src={article.author.image} alt="" className="article__author--avatar" />
      </div>
    </div>
  );
};

export default ArticleComponent;
