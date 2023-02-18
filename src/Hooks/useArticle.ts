import { type Article } from '../redux/reducers/articlesReducer/articlesTypes';

export const useArticle = (slug: string, articles: Article[]): Article | null => {
  for (let i = 0; i < articles.length; i++) {
    if (articles[i].slug === slug) {
      return articles[i];
    }
  }

  return null;
};
