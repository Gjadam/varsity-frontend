import React, { useContext, useEffect, useState } from 'react'
import './Comments.css'
import AuthContext from '../../Context/AuthContext';
import { Link } from 'react-router-dom';
import { PiArrowBendDownLeft } from 'react-icons/pi';
export default function Comments({ comments, submitComment }) {

  const authContext = useContext(AuthContext)
  const [newCommentBody, setNewCommentBody] = useState('')
  const [newCommentScore, setNewCommentScore] = useState(0)


  const onChangeHandler = (event) => {
    setNewCommentBody(event.target.value)
  }

  const scoreCommentHandler = (event) => {
    const inputNumber = parseInt(event.target.value, 10);
    setNewCommentScore(inputNumber);
  }

  useEffect(() => {
    if (newCommentScore > 5) {
      setNewCommentScore(5);
    } else if(newCommentScore < 0) {
      setNewCommentScore(0);
    }
  }, [newCommentScore]);

  return (
    <div className='comments'>
      {authContext.isLoggedIn === true ? (
        <div className="comments__register-comments">
          <h1 className="comments__register-comments__title">ثبت دیدگاه</h1>
          <h3 className="comments__register-comments__text">آدرس ایمیل شما منتشر نخواهد شد. فیلدهای الزامی مشخص شده اند*</h3>
          <form className="comments__register-comments__inputs">
            <div className="comments__register-comments__input__email">
              <label htmlFor="score" className="comments__register-comments__input__email__label">امتیاز*</label>
              <input type="number" id='score' value={newCommentScore} onChange={scoreCommentHandler} className="comments__register-comments__input__email__input" required />
            </div>
            <div className="comments__register-comments__input__text-area">
              <label htmlFor="Comment" className="comments__register-comments__input__text-area__label">متن دیدگاه*</label>
              <textarea id='Comment' value={newCommentBody} onChange={onChangeHandler} className='comments__register-comments__input__text-area__input' style={{ width: "100%", height: "10rem" }} required></textarea>
            </div>
            <button className='comments__register-comments__inputs__submit' onClick={(event) => submitComment(newCommentBody, newCommentScore, event)}>ثبت</button>
          </form>
        </div>
      ) : (
        <h1 className="comments__register__empty">برای ثبت دیدگاه ابتدا باید <Link to="/login" className='comments__register__empty__style'>لاگین</Link> کنید</h1>
      )}

      <div className="comments__user-comments">
        {comments.length === 0 ? (
          <h1 className="comments__user-comments__empty">هنوز دیدگاه جدیدی ثبت نشده ):</h1>
        ) : (
          <>
            <h1 className="comments__user-comments__title">دیدگاه کاربران</h1>
            {comments.map(comment => (
              <div className="comments__user-comments__comment" key={comment._id}>
                <div className="comments__user-comments__comment__username__wrapper">
                  <h1 className="comments__user-comments__comment__username">{comment.creator.name}</h1>
                  <h3 className="comments__user-comments__comment__username__role">{comment.creator.role === "ADMIN" ? 'ادمین' : 'کاربر'}</h3>
                  <h3 className='comments__user-comments__comment__username__date'>{comment.createdAt.slice(0, 10)}</h3>
                </div>
                <h3 className="comments__user-comments__comment__user-text">{comment.body}</h3>
                <a href="" className="comments__user-comments__comment__link">پاسخ</a>
                {
                  comment.answerContent && (
                    <div className="comments__user-comments__comment__answer">
                      <div className="comments__user-comments__comment__answer__admin-name__wrapper">
                        <h1 className="comments__user-comments__comment__answer__admin-name"><PiArrowBendDownLeft className='comments__user-comments__comment__answer__admin-name__arrow' />{comment.answerContent.creator.name}</h1>
                        <h3 className="comments__user-comments__comment__admin-name__role">{comment.answerContent.creator.role === "ADMIN" ? 'ادمین' : 'کاربر'}</h3>
                        <h3 className='comments__user-comments__comment__admin-name__date'>{comment.createdAt.slice(0, 10)}</h3>
                      </div>
                      <h3 className="comments__user-comments__comment__answer__admin-text">{comment.answerContent.body}</h3>
                      <a href="" className="comments__user-comments__comment__link">پاسخ</a>
                    </div>
                  )
                }
              </div>
            ))}
          </>
        )}


      </div>
    </div>
  )
}
