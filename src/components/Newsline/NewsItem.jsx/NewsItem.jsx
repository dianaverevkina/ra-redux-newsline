import { format } from 'date-fns'
import { ru } from 'date-fns/locale';
import { WebpageLink } from './WebpageLink/WebpageLink';

function replaceLinks(text) {
  const regex = /(https?:\/\/[\w-]{1,32}\.[\w-]{1,32}\S*)/g;
  const parts = text.split(regex); 

  return parts.map((part) => {
    if (regex.test(part)) {
      return <a key={part} href={part} target="_blank" rel="noopener noreferrer">{part}</a>;
    } else {
      return part;
    }
  });
}

function formatDate(date) {
  if (!date) return;

  const newDate = new Date(date)
  const formattedDate = format(newDate, 'd MMM в HH:mm',  { locale: ru });

  return formattedDate;
}

export const NewsItem = ({item}) => {
  if (!item) return;
  const {comments, likes, reposts, text, views, attachments, date} = item;

  let formattedDate = formatDate(date);
  let link;

  attachments.forEach(item => {
    if (item.type !== 'link') return;
      link = <WebpageLink data={item.link}/>
  })

  return (
    <li className='item'>
      <header className='item__header'>
        <div className='item__logo'>
          <img src="/images/group-logo.png" alt="лого" />
        </div>
        <div className="item__group-name">
          <h2 className=''>Университет интернет-профессий</h2>
          <span className='item__date'>{formattedDate}</span>
        </div>
      </header>
      <div>
        <p className='item__text'>{replaceLinks(text)}</p>
        {link}
      </div>
      <footer className='item__footer'>
        <div className="social-actions">
          <div className="social-actions__likes social-actions__action">
            <div className='social-actions__img'>
              <img src="images/like.svg" alt="" />
            </div>
            <span className='social-actions__count'>{likes.count}</span>
          </div>
          <div className="social-actions__comments social-actions__action">
            <div className='social-actions__img'>
              <img src="images/comment.svg" alt="" />
            </div>
            <span className='social-actions__count'>{comments.count}</span>
          </div>
          <div className="social-actions__shares social-actions__action">
            <div className='social-actions__img'>
              <img src="images/share.svg" alt="" />
            </div>
            <span className='social-actions__count'>{reposts.count}</span>
          </div>
        </div>
        <div className='item__views social-actions__action'>
          <div className='item__views-img'>
            <img src="images/view.svg" alt="" />
          </div>
          <span className='ite__views-count'>{views.count}</span>
        </div>
      </footer>
    </li>
  )
}
