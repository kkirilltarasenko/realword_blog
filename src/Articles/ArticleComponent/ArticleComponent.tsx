import React, { type FC } from 'react';
/* React Router */
import { Link, useNavigate } from 'react-router-dom';
/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch } from '../../redux/store';
import { type Article } from '../../redux/reducers/articlesReducer/articlesTypes';
import { type RootState } from '../../redux/reducers/rootReducer';
import { setSlug } from '../../redux/reducers/slugReducer/slugReducer';
import { setArticle } from '../../redux/reducers/articleReducer/articleReducer';
import { setLike } from '../../redux/reducers/syncArticlesReducer/syncArticleReducer';
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
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const activeUser = useSelector((state: RootState) => state.activeUser.user);

  const onLinkClick = (slug: string): void => {
    dispatch(setSlug(slug));
    dispatch(setArticle(article));
  };

  const like = (): void => {
    if (activeUser === undefined) {
      navigate('/sign-in');
      return;
    }

    async function clickLike(): Promise<void> {
      if (!article.favorited) {
        const response = await fetch(
          `https://blog.kata.academy/api/articles/${article.slug}/favorite`,
          {
            method: 'POST',
            headers: {
              Authorization: `Token ${activeUser.token}`,
            },
          }
        );
        const favorite = await response.json();
        dispatch(setLike([[], favorite.article]));
      }

      if (article.favorited) {
        const response = await fetch(
          `https://blog.kata.academy/api/articles/${article.slug}/favorite`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Token ${activeUser.token}`,
            },
          }
        );

        const favorite = await response.json();
        dispatch(setLike([[], favorite.article]));
      }
    }

    void clickLike();
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
            <HeartOutlined
              className={article.favorited ? 'article__like' : ''}
              onClick={() => {
                like();
              }}
            />
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
