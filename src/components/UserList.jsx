import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);

  function  getUsers(){
    axios.get('https://project-m-server-ufrw.onrender.com/api/users')
    .then((response) => setUsers(response.data))
    .catch((error) => console.error(error));
  }
  useEffect(() => {
   getUsers()
  }, []);
  const ChangeUserRole = ( userId ) => {
  
      axios.post(`https://project-m-server-ufrw.onrender.com/api/changeUserRole/${userId}`)
        .then((response) => {console.log(response.data)
        getUsers()})
        .catch((error) => console.error(error));

}

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(user => {
            return(
                <div key={user._id}>
                    {user.isAdmin && <li >{user.email} - Admin </li>} 
                    {!user.isAdmin && <li >{user.email} - user </li>} 
                    
                    <button onClick={()=>{ChangeUserRole(user._id)}}>Chane ${user.email} role</button>
                </div>
            )
       
        })}
      </ul>
    </div>
  );
}

export default UserList;