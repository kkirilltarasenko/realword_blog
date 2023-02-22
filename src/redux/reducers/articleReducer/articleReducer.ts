import { type Article } from '../articlesReducer/articlesTypes';
import { SET_ARTICLE } from '../../reduxActions';

const defaultState: { article: Article } = {
  article: {
    slug: '',
    title: '',
    description: '',
    body: '',
    createdAt: '',
    updatedAt: '',
    tagList: [],
    favorited: false,
    favoritesCount: 0,
    author: {
      username: '',
      bio: '',
      image: '',
      following: '',
    },
  },
};

export const articleReducer = (
  state = defaultState,
  action: { type: string; payload: Article }
): { article: Article } => {
  switch (action.type) {
    case SET_ARTICLE:
      return { ...state, article: action.payload };
    default:
      return state;
  }
};

export const setArticle = (payload: Article): { type: string; payload: Article } => ({
  type: SET_ARTICLE,
  payload,
});
