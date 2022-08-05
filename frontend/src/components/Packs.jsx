import React from 'react'
import { Link as LinkRouter } from 'react-router-dom'
import "../styles/packDetails.css"

function Packs({ pack }) {

    return (
        <div className="card" key={pack?._id}>
            <h2 className="text-title">{pack?.nombre}</h2>
            <video className="card-img" autoPlay loop muted>
                <source src={pack?.imagen} type='video/mp4' />
            </video>
            <div className="card-info font-bold fontRaleway">
                <p className="text-body">{pack?.descripcion}</p>
                <p className="text-body">PRECIO: ${pack?.Precio}</p>
                <LinkRouter to={`packdetails/${pack?._id}`}><button className="card-button fontRaleway" title="botón a ver detalles del pack">VER PACK</button></LinkRouter>
            </div>
        </div>
    )
}

export default Packs