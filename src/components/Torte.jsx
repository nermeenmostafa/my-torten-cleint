import React, { useState, useEffect } from "react";
import tortes from "../Tortendata";
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate, useParams } from "react-router-dom"
import torteService from '../services/TorteService'
import { useContext } from "react";                     // <== IMPORT 
import { AuthContext } from "../context/auth.context";
import axios from 'axios';

function Torte({ torte, getTortes }) {
    const [Quantity, setQuantity] = useState('1')
    const [size, setSize] = useState('small')
    const [show, setShow] = useState(false);

    const {id} = useParams()
    const navigate = useNavigate()
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

   const {user}=useContext(AuthContext)
   

    const storedCart = JSON.parse(localStorage.getItem('shoppingCart'));
    const [shoppingCart, setShoppingCart] = useState(storedCart);


    function deleteTorte(){
        torteService.deleteTorte(torte._id)
        .then(()=>{
            console.log('deleted')
            getTortes()
        }).
        catch(err=>{
            console.log(err)
        })
    }


    function addToCart(torte){
    
     setShoppingCart([...shoppingCart,{torte,quantity:Quantity,size}])
    }
    const handleTorteClick = (torte) => {
        const updatedCart = [...storedCart, torte];
        setShoppingCart(updatedCart);
      };

    useEffect(()=>{
        localStorage.setItem('shoppingCart',JSON.stringify(shoppingCart))
        console.log(localStorage.getItem('shoppingCart'))
    },[shoppingCart])

    return (
      
                    <div style={{width:'85%',marginLeft:'2rem',height:'85%'}} className="shadow-lg p-3 mb-5 bg-white rounded " >
                          
                        <div onClick={handleShow}>
                      
                            <h1>{torte.name}</h1>
                            <img src={torte.image} className="img-fluid" style={{ height: '300px', width: '300px' }} />
                        </div>
                        <div className="flex-container">
                            <div className="w-100 m-1 ">
                                <p>Sizes</p>
                                <select className="form-control" value={size} onChange={(e) => { setSize(e.target.value) }}>
                                    {torte.sizes.map(size => {
                                        return <option value={size}>{size}</option>
                                    })}
                                </select>
                            </div>
                            <div className="w-100 m-1">
                                <p>Quantity</p>
                                <select className="form-control" value={Quantity} onChange={(e) => { setQuantity(e.target.value) }}>
                                    {[...Array(10).keys()].map((x, i) => {
                                        return <option value={i + 1}>{i + 1}</option>
                                    })}
                                </select>
                            </div>

                        </div>
                        <div className="flex-container">
                            <div className="m-1 w-100">
                                {console.log(torte.prices[0])}
                                <h4 className="mt-1">price : {torte.prices[0][size] * Quantity} $ </h4>
                            </div>
                            <div className="m-1 w-100">
                                
                                <button className="btn" onClick={()=>{addToCart(torte)}} to={"/cart"} >Add To Cart</button>

                                {user && user.isAdmin &&  <button className="icon-button" onClick={deleteTorte}>Delete</button>}
                                {user && user.isAdmin &&  <Link className="icon-link" to={`tortes/${torte._id}/edit`}>edit</Link>}
                           
                               
                            </div>

                        </div>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>{torte.name}</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <img src={torte.image} className="img-fluid" style={{ height: '400px' }}></img>
                                <p>{torte.description}</p>
                            </Modal.Body>

                            <Modal.Footer>
                                <button className="btn" onClick={handleClose}>Close</button>

                            </Modal.Footer>
                        </Modal>
                    </div>
        
    )
}
export default Torte;