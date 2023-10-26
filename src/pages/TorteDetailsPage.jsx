import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import TortesService from '../services/TorteService'

function TorteDetailsPage(props) {
    const [torte, setTorte] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()

    function deleteTorte() {
        TortesService.deleteTorte(id)
            .then(() => {
                navigate('/')
            }).
            catch(err => {
                console.log(err)
            })
    }
    useEffect(() => {
        TortesService.getTorte(id)
            .then((response) => {
                console.log(response.data)
                setTorte(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [id])
    return (
        <div className="torteDetails">
            {/* Before we set the state to the 1 torte */}
            {torte === null && <h2>Loading</h2>}


            {/* After we set the state to the 1 torte */}
            {torte && (
                <>
                    <h1>{torte.name}</h1>
                    <img src={torte.image} className="img-fluid" style={{ height: '400px' }}></img>
                    <p>{torte.description}</p>
                </>
            )}

            {torte && torte.map((onetorte) => {
                return (
                    <li className="TaskCard card" key={onetorte._id}>
                        <h3>{onetorte.name}</h3>
                        <img src={onetorte.image} className="img-fluid" style={{ height: '400px' }}></img>
                        <p>Description:{onetorte.description}</p>
                    </li>
                )
            })}
            <Link to={"/"}>
                <button>Go back to tortes/button/</button>
            </Link>


            <Link to={`/tortes/${id}/edit`}>
                <button>Edit torte</button>
            </Link>

            <button onClick={deleteTorte}>Delete</button>
        </div>
    )
}


export default TorteDetailsPage