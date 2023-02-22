import { type ArticleInputTypes } from './articleInputTypes';
import { defaultState } from './articleInputState';
import { SET_ARTICLE_INPUT } from '../../reduxActions';

export const articleInputReducer = (
  state = defaultState,
  action: { type: string; payload: [ArticleInputTypes, string] }
): ArticleInputTypes[] => {
  switch (action.type) {
    case SET_ARTICLE_INPUT:
      return state.map((el: ArticleInputTypes) => {
        if (el.id === action.payload[0].id) {
          el.value = action.payload[1];
        }

        return el;
      });
    default:
      return state;
  }
};
