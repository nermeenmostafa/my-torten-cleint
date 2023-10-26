
import React, { useState,useEffect} from 'react';


const CartPage = () => {
  const [cartTortes, setCartTortes] = useState([]);
  
  const [totalPrice, setTotalPrice] = useState(0);
 
  const addTorteToCart = (torte, quantity, size) => {
    const updatedCart = [...cartTortes, { torte, quantity, size }];
    setCartTortes(updatedCart);
    CalculateTotal(updatedCart);
  };

  //const removeTorteFromCart = (Torte) => {
    //const updatedCart = [...cartTortes];
    //updatedCart.splice(TorteIndex, 1);
    //setCartTortes(updatedCart);
    //CalculateTotal(updatedCart);
  //};
  const removeTorteFromCart = (TorteIndex) => {
    const updatedCart = [...cartTortes];
    updatedCart.splice(TorteIndex, 1);
    setCartTortes(updatedCart);
    CalculateTotal(updatedCart);
    localStorage.setItem('shoppingCart',JSON.stringify(updatedCart))
  };
  
    // Update local storage
    
    const CalculateTotal = (tortes) => {
      const total = tortes.reduce((acc, torte) => {
        if (torte.size === 'small') {
          return acc + torte.quantity * 50;
        } else if (torte.size === 'medium') {
          return acc + torte.quantity * 80;
        } else if (torte.size === 'large') {
          return acc + torte.quantity * 120;
        }
        return acc;
      }, 0);
      setTotalPrice(total);
    };
  
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('shoppingCart'));
    if (savedCart) {
      setCartTortes(savedCart);
      CalculateTotal(savedCart);
    }
  }, []);
  
  
 // const CalculateTotal= (tortes) => {
    //const total = tortes.reduce((acc, torte) => acc + torte.price, 0);
   // setTotalPrice(total);
 // };

  // useEffect(()=>{
  //   if(localStorage.getItem('shoppingCart')){
  //     setCartTortes(JSON.parse(localStorage.getItem('shoppingCart')))
  //   }

  // },[])

  useEffect(()=>{
    console.log(cartTortes)

  },[cartTortes])

  return (
    <>
    <div >
    <h2>Shopping Cart</h2>
    <div className='cart' style={{marginLeft:'9rem'}}>
    <div className="w-100 m-5">
      {cartTortes.map((torte, index) => (
        <div key={index} className="col-md-9 m-4 ">
          <img src={torte.torte.image} className="img-fluid" style={{ height: '200px', width: '200px' }} alt="" />
          <div className="flex-container">
          <div className="w-50  " style={{marginLeft:'13rem'}}>
          <span className="form-control" style={{marginBottom:'1rem'}}>{torte.torte.name}</span>
          {torte.size === 'small' &&  <span className="form-control">${torte.quantity*50}</span>}
          {torte.size === 'medium' &&  <span className="form-control">${torte.quantity*80}</span>}
          {torte.size === 'larg' &&  <span className="form-control">${torte.quantity*120}</span>}
    
          <button className="btn" onClick={() => removeTorteFromCart(index)}>Remove</button>
          </div>
          </div>
        </div>
      ))}
      </div>
    </div>
   <div className="cart-total">
    <strong>Total: ${totalPrice.toFixed(2)}</strong>
    </div>
    
  
    <button onClick={() => alert("Payment integration needed!")}>
      Proceed to Payment
    </button>

  </div>
  </>
);
};

export default CartPage;