import React from 'react';
import axios from 'axios';

const ChangeUserRole = ({ userId }) => {
  const handleRoleChange = () => {
    axios.post(`/api/changeUserRole/${userId}`)
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <button onClick={handleRoleChange}>Change to Admin</button>
    </div>
  );
};

export default ChangeUserRole;