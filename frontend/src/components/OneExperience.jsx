import React from "react";
import "../styles/OneExperience.css"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import experienciasActions from "../redux/actions/experienciasActions"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import Comments from "../components/Comments"
import LoadingCards from '../helpers/LoadingCards'



const OneExperience = () => {
    const navigate = useNavigate()

    const { id } = useParams()
    const dispatch = useDispatch()
    const [reload, setReload] = useState(false)

    useEffect(() => {
        dispatch(experienciasActions.getOneExperiencia(id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload])

    function reloadChanger() {
        setReload(!reload)
    }

    const exp = useSelector(store => store.experienciasReducer.getOneExperiencia)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);


    return (
        <>
            <div className="general-container">
                <div className="l-exp-container">
                    {loading ?
                        <div className="l-card-container self-center">
                            <LoadingCards />
                        </div> :
                        <div className="l-card-container">
                            <div className="l-exp-card">
                                <div className="overlay"></div>
                                <img width="100%" className="l-card-img" src={exp?.imagen} alt="experience" />
                                <div className="l-card-text">
                                    <h2 className="l-card-name">{exp?.nombre}</h2>
                                </div>
                            </div>
                            <Comments reloadChanger={reloadChanger} />
                        </div>}
                    <div className="experienceBody">
                        <h2 className="titleExp">DESCRIPCION</h2>
                        <p className="subtitleExp">{exp?.descripcion}</p>
                        <h2 className="titleExp">¿QUE INCLUYE?</h2>
                        <p className="subtitleExp">{exp?.incluye}</p>
                        <h2 className="titleExp">UBICACION</h2>
                        <p className="subtitleExp">{exp?.direccion}</p>
                        <h2 className="titleExp">RESERVA ESTA EXPERIENCIA</h2>
                        <p className="subtitleExp">contacto@boxbonny.com</p>
                    </div>
                </div>
                <button onClick={() => navigate(-1)} className="card-button l-card-button fontRaleway">VOLVER AL PACK</button>
            </div>
        </>
    );

}


export default OneExperience
