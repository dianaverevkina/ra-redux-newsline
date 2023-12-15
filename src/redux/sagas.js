import { getAdditionalNewsRequest, getNewsFailure, getNewsRequest, getNewsSuccess } from "./slice"
import {take, spawn, put, takeLatest, takeEvery, retry} from 'redux-saga/effects'

async function getNews(id, url) {
  const response = await fetch(`${url}${id ? id : ''}`);
  return response.json();
}

function* handleRequestSaga(url, action) {
  try {
    const data = yield retry(3, 1000, getNews, action.payload, url)
    const obj = {
      news: data,
      noMore: data.length < 5 ? true : false, 
    }
    yield put(getNewsSuccess(obj))
  } catch (error) {
    yield put(getNewsFailure(error.message))
  }
}

function* watchRequestSaga(url) {
  while(true) {
    yield take(getNewsRequest.type)
    yield takeLatest(getNewsRequest.type, handleRequestSaga, url)
  } 
}

function* watchAddRequestSaga( url) {
    yield takeEvery(getAdditionalNewsRequest.type, handleRequestSaga, url)
}

export default function* saga() {
  yield spawn(watchRequestSaga, 'http://localhost:7070/api/news')
  yield spawn(watchAddRequestSaga, 'http://localhost:7070/api/news?lastSeenId=')
}