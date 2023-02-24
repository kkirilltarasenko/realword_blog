import React, { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useArticle } from '../../Hooks/useArticle';
import ReactMarkdown from 'react-markdown';
/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch } from '../../redux/store';
import { type RootState } from '../../redux/reducers/rootReducer';
import { type Article } from '../../redux/reducers/articlesReducer/articlesTypes';
import { setTags, clearTags, type TagType } from '../../redux/reducers/tagsReducer/tagsReducer';
import { setArticleInput } from '../../redux/reducers/articleInputReducer/articleInputActions';
/* Style */
import './ArticlePage.scss';
/* Components */
import ArticleComponent from '../ArticleComponent/ArticleComponent';
import ArticleButton from './ArticleButton/ArticleButton';
import { Empty, Popconfirm } from 'antd';

const ArticlePage: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const activeUser = useSelector((state: RootState) => state.activeUser.user);
  const slug: string = useSelector((state: RootState) => state.slug.slug);
  const articles = useSelector((state: RootState) => state.syncArticles.articles);
  const article: Article | null = useArticle(slug, articles);
  const inputs = useSelector((state: RootState) => state.articleInputs);

  const editFunc = (): void => {
    if (article !== null) {
      const tags: TagType[] = article.tagList.map((el: string) => {
        return { id: Math.random(), value: el };
      });

      dispatch(setArticleInput([inputs[0], article.title]));
      dispatch(setArticleInput([inputs[1], article.description]));
      dispatch(setArticleInput([inputs[2], article.body]));

      dispatch(clearTags());
      dispatch(setTags([tags[0], '', tags]));
    }
  };

  const deleteFunc = (): void => {
    if (article !== null) {
      void fetch(`https://blog.kata.academy/api/articles/${article.slug}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${activeUser.token}`,
        },
      });
    }

    navigate('/');
  };

  return article !== null ? (
    <div className="article__page">
      <ArticleComponent article={article} />
      <div
        className={
          article.author.username === activeUser.username ? 'article__edit-buttons' : 'hidden'
        }
      >
        <Popconfirm
          title={'Are you sure to delete this article?'}
          okText={'Yes'}
          cancelText={'No'}
          placement={'right'}
          onConfirm={() => {
            deleteFunc();
          }}
        >
          <button className="tag-button tag-button--delete">Delete</button>
        </Popconfirm>
        <ArticleButton style={'edit'} path={`/articles/${article.slug}/edit`} func={editFunc}>
          Edit
        </ArticleButton>
      </div>
      <div className="article__body">
        <ReactMarkdown>{article.body}</ReactMarkdown>
      </div>
    </div>
  ) : (
    <div className="empty">
      <Empty />
    </div>
  );
};

export default ArticlePage;
