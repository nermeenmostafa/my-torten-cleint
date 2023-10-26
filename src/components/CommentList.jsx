import React, { useEffect, useState } from 'react';

function CommentList() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch('https://project-m-server-ufrw.onrender.com/api/comments') // Replace with the correct API endpoint
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error('Error fetching comments:', error));
  }, []);


  return (
    <div>
      <h2>Comments</h2>
      <ul style={{width:'20rem',height:'5rem', margin:'0 auto', float:'none', marginBottom:'10px' }} className="shadow-lg p-2 mb-0 bg-white rounded " >
         {comments.map((comment) => (
           <li key={comment._id}>- {comment.text}</li>
         ))}
       </ul>
    </div>
  );
}

export default CommentList;