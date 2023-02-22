import React, { type FC } from 'react';
import { Link } from 'react-router-dom';
/* Style */
import '../../../Article/TagButton/TagButton.scss';
import './ArticleButton.scss';

interface ArticleButtonProps {
  style: string;
  path: string;
  children: string;
  func: () => void;
}

const ArticleButton: FC<ArticleButtonProps> = ({ style, path, children, func }): JSX.Element => {
  const classNames = ['tag-button'];
  switch (style) {
    case 'delete':
      classNames.push('tag-button--delete');
      break;
    case 'edit':
      classNames.push('article-button--edit');
      break;
    default:
      break;
  }

  return style === 'edit' ? (
    <button
      type="button"
      className={classNames.join(' ')}
      onClick={() => {
        func();
      }}
    >
      <Link className="article--link" to={path}>
        {children}
      </Link>
    </button>
  ) : (
    <button
      type="button"
      className={classNames.join(' ')}
      onClick={() => {
        func();
      }}
    >
      {children}
    </button>
  );
};

export default ArticleButton;
