import { type ArticleInputTypes } from './articleInputTypes';
import { SET_ARTICLE_INPUT } from '../../reduxActions';

export const setArticleInput = (
  payload: [ArticleInputTypes, string]
): { type: string; payload: [ArticleInputTypes, string] } => ({
  type: SET_ARTICLE_INPUT,
  payload,
});
