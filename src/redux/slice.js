import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
  error: false,
  noMoreNews: false,
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    getNewsRequest (state) {
      state.loading = true
      state.error = null
    },
    getNewsSuccess (state, action) {
      const {news, noMore} = action.payload;
      news.forEach(el => state.items.push(el))
      state.loading = false
      state.error = null
      state.noMoreNews = noMore
    },
    getNewsFailure (state, action) {
      state.error = action.payload;
      state.loading = false
    },
    getAdditionalNewsRequest(state) {
      state.loading = true
      state.error = null
    },
  }
})

export const { getNewsRequest, getNewsSuccess, getNewsFailure, getAdditionalNewsRequest } = newsSlice.actions;
export default newsSlice.reducer; 