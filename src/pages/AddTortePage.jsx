import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.css";


function AddTortePage(props) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');


  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem('authToken');
    const newTorte = {
      name,
      category,
      image,
      description,
    };

    axios
      .post('https://project-m-server-ufrw.onrender.com/api/tortes', newTorte, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert('Torte successfully created');
        setName('');

        setCategory('');
        setImage('');
        setDescription('');
        navigate('/'); // Redirect to the home page or any other page you want
      });
  }
  const handleFileUpload = (e) => {
    // console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.files[0]);

    axios.post('https://project-m-server-ufrw.onrender.com/api/upload', uploadData)
      .then(response => {
        console.log("response is: ", response.data.fileUrl);
        // response carries "fileUrl" which we can use to update the state
        setImage(response.data.fileUrl);
      })
      .catch(err => console.log("Error while uploading the file: ", err));
  };
  return (
   
      <div className="container mt-5" style={{ width: '50%', height: '100%' }}>
        <h2>Add Torte</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
            style={{width:'100%',height:'50px'}}
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>


          <div className="form-group">
            <label>Category</label>
            <input
            style={{width:'100%',height:'50px'}}
              type="text"
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input
            style={{width:'100%',height:'50px'}}
              type="file"
              className="form-control"
              onChange={handleFileUpload}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
            style={{width:'100%',height:'100px'}}
              type="text"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
   
  );
}

export default AddTortePage