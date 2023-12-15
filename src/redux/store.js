import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import saga from "./sagas";
import newsSlice from "./slice";

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: {
    news: newsSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(saga)

export default store;