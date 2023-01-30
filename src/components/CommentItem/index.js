// Write your code here
import './index.css'
import {formatDistanceToNow} from 'date-fns'

const CommentItem = props => {
  const {commentItem, deleteComment, hitLike} = props
  const {username, comment, isLiked, id, date, randomBg} = commentItem

  const onDelete = () => deleteComment(id)

  const onLike = () => hitLike(id)

  let likeClass = ''
  let likeUrl =
    'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  if (isLiked) {
    likeClass = 'light-blue-text'
    likeUrl =
      'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
  }

  return (
    <li className="comments-item">
      <div className="dp-text-container">
        <span className={`dp ${randomBg}`}>{username[0].toUpperCase()}</span>
        <div className="text-container">
          <p className="user-name">
            {username}
            <span className="time-ago">{formatDistanceToNow(date)}</span>
          </p>
          <p className="user-comment">{comment}</p>
        </div>
      </div>
      <div className="like-delete">
        <button className="like-button" type="button" onClick={onLike}>
          <img src={likeUrl} alt="like" />
          <span className={`like-text ${likeClass}`}>Like</span>
        </button>
        <button
          data-testid="delete"
          className="delete-button"
          type="button"
          onClick={onDelete}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr />
    </li>
  )
}

export default CommentItem
