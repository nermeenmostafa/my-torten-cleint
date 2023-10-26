import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context'

function Comment() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const navigate = useNavigate()

  const { user } = useContext(AuthContext)
  function getComments() {
    axios.get('http://localhost:5005/api/comments').then((response) => {
      setComments(response.data);
    });

  }

  useEffect(() => {
    // Fetch comments when the component mounts
    getComments()

  }, []);
  const addComment = () => {
    const token = localStorage.getItem('authToken')
    // Send a POST request to create a new comment
    axios.post('http://localhost:5005/api/comments', { text: newComment, name: user._id }, { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
      // Update the state with the new comment
      console.log('in post')
      // setComments([...comments, response.data]);
      // setNewComment({ text: '', name: '' });

      getComments()
    })
      .catch(err => {
        console.log(err)
      });

  };

  return (
    <div>
      <h1>Comments</h1>
      <ul style={{fontSize:'20px'}}>
        {comments.map((comment) => (
          <li className={'li-comment'} key={comment._id}>- {comment.text}</li>
        ))}
      </ul>
      {/* <input style={{ marginRight: '1rem', marginBottom: '7rem' }}
        type="text"
        placeholder="Name"
        value={newComment.name}
        onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
      /> */}
      <input style={{ width: '30rem', height: '11rem', margin: '0 auto', float: 'none', marginBottom: '15px', marginLeft: '9rem' }} className="shadow-lg p-2 mb-0 bg-white rounded "
        type="text"
        placeholder="Comment text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />

      <button className='btn' style={{ marginTop: '7rem' }} onClick={addComment}>Add Comment</button>
    </div>
  );
}


export default Comment;
