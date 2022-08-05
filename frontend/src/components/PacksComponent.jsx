import React, { useEffect, useState } from "react";
import '../styles/cards.css'
import { useDispatch, useSelector } from 'react-redux'
import packsActions from "../redux/actions/packsActions";
import LoadingCards from '../helpers/LoadingCards'

import Packs from "./Packs";



const PacksComponent = () => {
    const [inputValue, setInputValue] = useState(99999)
    const dispatch = useDispatch()

    function clearfilter(event) {
        event.preventDefault()
        dispatch(packsActions.getPacks(99999))
    }

    useEffect(() => {
        dispatch(packsActions.getPacks(inputValue))
        // eslint-disable-next-line
    }, [inputValue])

    const packs = useSelector(store => store.packsReducer.filterPacks)

    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);
    return (
        <div className="superContainer">
            <div className="container-izq">
                <div className="titlePacks">
                    <h2 className="hover:animate-pulse titleCards">PACKS</h2>
                    <h2 className="hover:animate-pulse subtitle-cards">"No se envuelven, envuelven en una nueva experiencia a quien los recibe. Se guardan en la memoria y se convierten en uno de esos recuerdos que, como un buen vino, mejoran con el tiempo"</h2>
                    <h2 className="hover:animate-pulse selecciona-experiencias">SELECCIONA Y DESCUBRI LAS EXPERIENCIAS</h2>
                    <h2 className="hover:animate-pulse selecciona-experiencias subt-exp">TENEMOS OPCIONES ADAPTADAS Y ACCESIBLES PARA DISCAPACIDAD</h2>
                </div>
                <div className="container-filtro-precios">
                    <h2 className="texto-filtro-precios">PODES FILTRAR POR PRECIO</h2>
                    <form className="filtro-precios">
                        <div className="box-checkbox">
                            <input type="radio" className="inputPrecios" value="5000" id="cinco"
                                onClick={(event) => {
                                    if (event.target.checked === true) {
                                        setInputValue(event.target.value)
                                    }
                                }} />
 

                            <label className="label-checkbox" htmlFor="cinco">Hasta $5000</label>
                        </div>
                        <div className="box-checkbox">
                            <input type="radio" className="inputPrecios" value="7500" id="ocho"
                                onClick={(event) => {
                                    if (event.target.checked === true) {
                                        setInputValue(event.target.value)
                                    }
                                }} />
                            <label className="label-checkbox" htmlFor="ocho">Hasta $7500</label>
                        </div>
                        <div className="box-checkbox">
                            <input type="radio" className="inputPrecios" value="9999" id="diez"
                                // onClick={clearfilter}
                                onClick={(event) => {
                                    if (event.target.checked === true) {
                                        setInputValue(event.target.value)
                                    }
                                }}
                            />
                            <label className="label-checkbox" htmlFor="diez">Hasta $10000</label>
                        </div>
                        <div>
                            <button onClick={clearfilter} className="btn-clean">Limpiar Filtro</button>
                        </div>
                    </form>
                </div>
            </div>
            {loading ?
                <div className="containerPacks self-center ">
                    <LoadingCards />
                </div> :
                <div className="containerPacks">
                    {packs && packs?.map((pack) => (
                        <Packs pack={pack} />
                    ))
                    }
                </div>

            }
        </div>
    );

}

export default PacksComponent
