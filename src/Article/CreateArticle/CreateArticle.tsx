import React, { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
/* Redux */
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch } from '../../redux/store';
import { type RootState } from '../../redux/reducers/rootReducer';
import { type TagType } from '../../redux/reducers/tagsReducer/tagsReducer';
import { addTag, deleteTag } from '../../redux/reducers/tagsReducer/tagsReducer';
import { type ArticleInputTypes } from '../../redux/reducers/articleInputReducer/articleInputTypes';
import { setArticleInput } from '../../redux/reducers/articleInputReducer/articleInputActions';
import { setLoginError } from '../../redux/reducers/loginErrorReducer/loginErrorReducer';
import { fetchArticles } from '../../redux/reducers/articlesReducer/articlesReducer';
import { setArticles } from '../../redux/reducers/syncArticlesReducer/syncArticleReducer';
/* Components */
import ArticleInput from '../ArticleInput/ArticleInput';
import FormSubmitButton from '../../Authorization/FormSubmitButton/FormSubmitButton';
import TagButton from '../TagButton/TagButton';
/* Style */
import './CreateArticle.scss';
import '../Article.scss';

const CreateArticle: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const activeUser = useSelector((state: RootState) => state.activeUser.user);
  const inputs = useSelector((state: RootState) => state.articleInputs);
  const tags = useSelector((state: RootState) => state.tags);
  const isLoginError: boolean = useSelector((state: RootState) => state.isLoginError.isLoginError);

  if (activeUser === undefined) {
    navigate('/sign-in');
  }

  const add = (): void => {
    const newTag = {
      id: Math.random(),
      value: '',
    };

    dispatch(addTag([newTag, '', []]));
  };

  const del = (tag: TagType): void => {
    dispatch(deleteTag([tag, '', []]));
  };

  const changeValue = (element: ArticleInputTypes, value: string): void => {
    dispatch(setArticleInput([element, value]));
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (inputs[0].value === '' || inputs[1].value === '' || inputs[2].value === '') {
      dispatch(setLoginError(true));
      return;
    }

    async function create(): Promise<void> {
      await fetch('https://blog.kata.academy/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${activeUser.token}`,
        },
        body: JSON.stringify({
          article: {
            title: inputs[0].value,
            description: inputs[1].value,
            body: inputs[2].value,
            tagList: tags.map((el: TagType) => {
              return el.value;
            }),
          },
        }),
      });

      const articles = await dispatch(fetchArticles([0, 5]));
      dispatch(setArticles([articles.payload.articles, articles.payload.articles[0]]));
      dispatch(setLoginError(false));
      navigate('/');
    }

    void create();
  };

  return (
    <form
      className="article-form"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        submitForm(e);
      }}
    >
      <h1 className="article-mode--title">Create new article</h1>
      <ArticleInput element={inputs[0]} label={'Title'} placeholder={'Title'} type={'text'} />
      <ArticleInput
        element={inputs[1]}
        label={'Short Description'}
        placeholder={'Title'}
        type={'text'}
      />
      <div>
        <h2 className="article-textarea--title">Text</h2>
        <textarea
          className="article-textarea"
          name=""
          id=""
          onChange={(e) => {
            changeValue(inputs[2], e.target.value);
          }}
          placeholder={'Text'}
          value={inputs[2].value}
        ></textarea>
      </div>
      <div className="article-create--tags">
        Tags
        <div className="article-create--tags-container">
          <div className="article-create--tags-box">
            {tags.map((el: TagType) => {
              return (
                <div key={el.id} className="article-create--tag-box">
                  <ArticleInput element={el} placeholder={'Text'} type={'tag'} />
                  <TagButton tag={el} style={'delete'} createFunc={add} deleteFunc={del}>
                    Delete
                  </TagButton>
                </div>
              );
            })}
          </div>
          <TagButton tag={tags[0]} style={'create'} createFunc={add} deleteFunc={del}>
            Add tag
          </TagButton>
        </div>
      </div>
      <div className={isLoginError ? 'article__create--error' : 'hidden'}>
        <pre>All fields are required.</pre>
      </div>
      <div className="article-create--button">
        <FormSubmitButton>Send</FormSubmitButton>
      </div>
    </form>
  );
};

export default CreateArticle;
