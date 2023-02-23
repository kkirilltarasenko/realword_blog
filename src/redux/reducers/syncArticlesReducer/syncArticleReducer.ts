import { type Article } from '../articlesReducer/articlesTypes';
import { SET_LIKE, SET_ARTICLES } from '../../reduxActions';

const defaultState: { articles: Article[] } = {
  articles: [],
};

export const syncArticlesReducer = (
  state = defaultState,
  action: { type: string; payload: [Article[], Article] }
): { articles: Article[] } => {
  switch (action.type) {
    case SET_ARTICLES:
      return { ...state, articles: action.payload[0] };
    case SET_LIKE:
      return {
        ...state,
        articles: state.articles.map((el: Article) => {
          if (el.slug === action.payload[1].slug) {
            return Object.assign({}, el, action.payload[1]);
          }

          return el;
        }),
      };
    default:
      return state;
  }
};

export const setArticles = (
  payload: [Article[], Article]
): { type: string; payload: [Article[], Article] } => ({
  type: SET_ARTICLES,
  payload,
});

export const setLike = (
  payload: [Article[], Article]
): { type: string; payload: [Article[], Article] } => ({
  type: SET_LIKE,
  payload,
});
