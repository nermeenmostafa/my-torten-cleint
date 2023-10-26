import React ,{useEffect, useState}from "react";
import Torte from "../components/Torte";
import axios from "axios";

function HomeScreen() {
const[tortes,setTortes]=useState([])

function getTortes(){
    axios.get('http://localhost:5005/api/tortes')
    .then((response)=>{
        setTortes(response.data)
    })
}
useEffect(()=>{
    getTortes()
    
},[])

  

    
    return (
        <div>
            <div className="row">
                {tortes.map(torte => {
                    return (
                    <div className="col-md-4">
                       
                        <div>
                            <Torte torte={torte} getTortes={getTortes} />
                        </div>
                    </div>)

                })}
                

            </div>
        </div>
    )
}
export default HomeScreen;