import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { type Article } from './articlesTypes';

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async function ([offset, limit]: number[]) {
    const response = await fetch(
      `https://blog.kata.academy/api/articles?limit=${limit}&offset=${offset}`
    );
    return await response.json();
  }
);

interface ArticlesState {
  articles: Article[];
  articlesCount: number;
}

const initialState: { articles: Article[]; articlesCount: number } = {
  articles: [],
  articlesCount: 0,
};

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.fulfilled, (state: ArticlesState, action) => {
      state.articles = [...action.payload.articles];
    });
  },
});
