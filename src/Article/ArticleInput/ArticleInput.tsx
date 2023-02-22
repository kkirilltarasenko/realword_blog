import React, { type ChangeEvent, type FC } from 'react';
/* Redux */
import { useDispatch } from 'react-redux';
import { type ArticleInputTypes } from '../../redux/reducers/articleInputReducer/articleInputTypes';
import { type AppDispatch } from '../../redux/store';
import { setArticleInput } from '../../redux/reducers/articleInputReducer/articleInputActions';
import { setTag, type TagType } from '../../redux/reducers/tagsReducer/tagsReducer';
/* Style */
import './ArticleInput.scss';

interface ArticleInputProps {
  label?: string;
  placeholder: string;
  type: string;
  element: ArticleInputTypes | TagType;
}

const ArticleInput: FC<ArticleInputProps> = ({
  label,
  placeholder,
  type,
  element,
}): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  const classNames: string[] = ['article-input'];
  switch (type) {
    case 'tag':
      classNames.push('article-input--tag');
      break;
    default:
      break;
  }

  const changeValue = (element: ArticleInputTypes | TagType, value: string): void => {
    dispatch(setArticleInput([element, value]));
    dispatch(setTag([element, value, []]));
  };

  return (
    <label className="article-input--box">
      <span className="article-input--label">{label}</span>
      <input
        value={element.value}
        type="text"
        placeholder={placeholder}
        className={classNames.join(' ')}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          changeValue(element, e.target.value);
        }}
      />
    </label>
  );
};

export default ArticleInput;
