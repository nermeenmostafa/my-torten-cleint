import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function EditTorte() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')

    const { id } = useParams()

    const navigate = useNavigate()

    function deleteTorte() {
        axios.delete(`https://project-m-server-ufrw.onrender.com/api/tortes/${id}`)
            .then(response => {
                navigate('/')
            })
            .catch((err) => {

                console.log(err)
            })
    }
    useEffect(() => {
        axios.get(`https://project-m-server-ufrw.onrender.com/api/tortes/${id}`)
            .then(response => {
                console.log(response.data)
                setName(response.data.name)
                setDescription(response.data.description)
                setImage(response.data.image)
            })
    }, [])
    function handleSubmit(e) {
        e.preventDefault()

        axios.put(`https://project-m-server-ufrw.onrender.com/api/tortes/${id}`, { name, description, image })
            .then((updatedtorte) => {
                navigate(`/`)
            })
            .catch(err => {
                console.log(err)
            })
    }
    const handleFileUpload = (e) => {
        // console.log("The file to be uploaded is: ", e.target.files[0]);
     
        const uploadData = new FormData();
     
        // imageUrl => this name has to be the same as in the model since we pass
        // req.body to .create() method when creating a new movie in '/api/movies' POST route
        uploadData.append("imageUrl", e.target.files[0]);
     
       axios.post('https://project-m-server-ufrw.onrender.com/api/upload',uploadData)
          .then(response => {
             console.log("response is: ", response.data.fileUrl);
            // response carries "fileUrl" which we can use to update the state
            setImage(response.data.fileUrl);
          })
          .catch(err => console.log("Error while uploading the file: ", err));
      };
    return (
        <div className="container mt-5" style={{ width: '50%', height: '50%', background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)', animation: 'gradient 15s ease infinite', backgroundSize: '400% 400%' }}>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>
                        Title
                        <input className="form-control" type="text" value={name} onChange={(e) => { setName(e.target.value) }} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Description
                        <input className="form-control" type="text" value={description} onChange={(e) => { setDescription(e.target.value) }} />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Image url
                        <input className="form-control" type="file"  onChange={handleFileUpload} />
                    </label>
                </div>

                <button className="btn btn-primary">Submit</button>

            </form>
        </div>
    )
}

export default EditTorte
