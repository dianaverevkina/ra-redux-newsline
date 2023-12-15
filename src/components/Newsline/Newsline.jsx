import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAdditionalNewsRequest, getNewsRequest } from '../../redux/slice';
import { Loader } from '../Loader/Loader';
import { NewsItem } from './NewsItem.jsx/NewsItem';

export const Newsline = () => {
  const {items, loading, error, noMoreNews} = useSelector(state => state.news)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNewsRequest())
  }, []) 

  let content;

  if(items.length) {
    content = items.map(item => <NewsItem key={item.id} item={item} />);
  }

  if (error) {
    console.log(error)
  } 

  function handleClick() {
    const lastNews = items[items.length - 1];
    return lastNews && dispatch(getAdditionalNewsRequest(lastNews.id))
  }

  function handleScrollUp() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  return (
    <>
      <h1 className='header'>Новости</h1>
      <div className="news-block">
        <ul className='news-list'>
          {content}
        </ul>

        {!noMoreNews && <button onClick={handleClick}>
          {loading && <Loader />}
          {!loading && 'Eще'}
        </button>}
      </div>
      <button className='btn-nav' onClick={handleScrollUp}>
        <img src="/images/arrow-up.svg" alt="" />
      </button>
    </>
  )
}
