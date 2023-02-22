import React, { type FC } from 'react';
import { type TagType } from '../../redux/reducers/tagsReducer/tagsReducer';
/* Style */
import './TagButton.scss';

interface TagButtonProps {
  tag: TagType;
  style: string;
  children: string;
  createFunc: () => void;
  deleteFunc: (tag: TagType) => void;
}

const TagButton: FC<TagButtonProps> = ({
  tag,
  style,
  children,
  createFunc,
  deleteFunc,
}): JSX.Element => {
  const classNames = ['tag-button'];
  switch (style) {
    case 'delete':
      classNames.push('tag-button--delete');
      break;
    case 'create':
      classNames.push('tag-button--create');
      break;
    default:
      break;
  }

  return (
    <button
      type="button"
      className={classNames.join(' ')}
      onClick={() => {
        switch (style) {
          case 'delete': {
            deleteFunc(tag);
            break;
          }
          case 'create': {
            createFunc();
            break;
          }
          default:
            break;
        }
      }}
    >
      {children}
    </button>
  );
};

export default TagButton;
