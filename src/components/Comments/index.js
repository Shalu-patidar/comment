import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here

const randomIndex = () =>
  Math.floor(Math.random() * initialContainerBackgroundClassNames.length)

class Comments extends Component {
  state = {
    commentsList: [],
    nameInput: '',
    commentInput: '',
  }

  updateNameInput = e => this.setState({nameInput: e.target.value})

  updateCommentInput = e => this.setState({commentInput: e.target.value})

  submitForm = e => {
    e.preventDefault()
    const {nameInput, commentInput} = this.state
    const newComment = {
      id: uuidv4(),
      username: nameInput,
      comment: commentInput,
      isLiked: false,
      date: new Date(),
      randomBg: initialContainerBackgroundClassNames[randomIndex()],
    }

    if (nameInput.length !== 0) {
      this.setState(prevState => ({
        commentsList: [...prevState.commentsList, newComment],
        nameInput: '',
        commentInput: '',
      }))
    }
  }

  deleteComment = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.filter(
        eachComment => eachComment.id !== id,
      ),
    }))
  }

  hitLike = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (eachComment.id === id) {
          return {
            ...eachComment,
            isLiked: !eachComment.isLiked,
          }
        }
        return eachComment
      }),
    }))
  }

  render() {
    const {nameInput, commentInput, commentsList} = this.state

    return (
      <div className="bg-container">
        <div className="content-wrapper">
          <h1 className="main-heading">Comments</h1>
          <div className="forms-and-image-container">
            <img
              className="comments-image"
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
            />
            <form onSubmit={this.submitForm}>
              <p className="say-sth-text">
                Say Something about 4.0 Technologies
              </p>
              <input
                onChange={this.updateNameInput}
                value={nameInput}
                id="nameInput"
                className="name-input"
                type="text"
                placeholder="Your Name"
              />
              <textarea
                onChange={this.updateCommentInput}
                value={commentInput}
                className="comment-input"
                placeholder="Your Comment"
                rows="5"
              />
              <button type="submit" className="add-comment-btn">
                Add Comment
              </button>
            </form>
          </div>

          <hr />

          <div className="comments-count-container">
            <span className="comments-count">{commentsList.length}</span>
            <p className="comments-count-text">Comments</p>
          </div>

          <ul className="comments-container">
            {commentsList.map(eachComment => (
              <CommentItem
                key={eachComment.id}
                commentItem={eachComment}
                deleteComment={this.deleteComment}
                hitLike={this.hitLike}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
