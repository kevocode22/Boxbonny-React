import React from 'react'
import '../styles/login.css'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import usuariosActions from '../redux/actions/usuariosActions';
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast';
import GoogleSignIn from './GoogleSignIn'
import GoogleSignUp from './GoogleSignUp';

const SignIn = () => {


    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const container = document.querySelector(".containerRegistro");

    useEffect(() => {
        const sign_in_btn = document.querySelector("#sign_in_btn")
        const sign_up_btn = document.querySelector("#sign_up_btn")
        sign_up_btn.addEventListener("click", () => {
            container.classList.add("sign_up_mode");
        });
        sign_in_btn.addEventListener("click", () => {
            container.classList.remove("sign_up_mode");
        });
        const container = document.querySelector(".containerRegistro");
        //eslint-disable-next-line
    }, [])

    const loginSubmit = async (event) => {
        event.preventDefault()
        const logueado = {
            email: event.target[0].value,
            password: event.target[1].value,
            from: "formulario-inicio"
        }
        // console.log(logueado)
        let res = await dispatch(usuariosActions.inicioSesion(logueado))
        // console.log(res)
        if (res.data.success) {
            toast.success(res.data.message)
            navigate("/")
        } else {
            toast.error(res.data.message)
        }

    }

    const signUpSubmit = async (event) => {
        event.preventDefault()
        // console.log(event.target[4].value)
        const data = {
            nombre: event.target[0].value,
            apellido: event.target[1].value,
            email: event.target[3].value,
            contraseña: event.target[4].value,
            imagen: event.target[2].value,
            from: "formulario-registro"

        }

        let res = await dispatch(usuariosActions.registrarse(data))
        let errorSignUp = res.data.message
        if (res.data.from === "validator") {
            errorSignUp.forEach(e => {
                toast.error(e.message)
            })
        }
        if (res?.data.success) {
            const container1 = document.querySelector(".containerRegistro");
            container1.classList.remove("sign_up_mode")
            toast.success(res.data.message)
        } else {
            toast.error(res.data.message)
        }

    }


    return (
        <div className="containerRegistro h-screen max-w-full ">
            <div className="form_container">
                <div className="signin_signup">
                    <form onSubmit={loginSubmit} action="#" className="sign_in_form">
                        <h2 className="title">Ingresá</h2>

                        <div className="inputBox">
                            <input autoComplete="new-password" className="inputlogin" type="text" placeholder="Email" />
                        </div>

                        <div className="inputBox">
                            <input autoComplete="new-password" className="inputlogin" type="password" placeholder="Contraseña" />
                        </div>

                        <input type="submit" value="Inicia Sesión" className="btn" id="sign_btn" />
                        <p className="social_text">O iniciá sesión con:</p>

                        <div className="social_media">
                            <GoogleSignIn />
                        </div>

                    </form>
                    <form onSubmit={signUpSubmit} action="#" className="sign_up_form">
                        <h2 className="title"> Registrate </h2>
                        <div className="inputBox">
                            <input autoComplete="new-password" type="text" placeholder="Nombre" />
                        </div>
                        <div className="inputBox">
                            <input autoComplete="new-password" type="text" placeholder="Apellido" />
                        </div>
                        <div className="inputBox">
                            <input autoComplete="new-password" type="text" placeholder="Imagen" />
                        </div>

                        <div className="inputBox">
                            <input autoComplete="new-password" type="email" placeholder="Email" />
                        </div>
                        <div className="inputBox">
                            {/* <input type="password" placeholder="Contraseña" /> */}
                            <input autoComplete="new-password"
                                type="password"
                                className="inputForm w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                                placeholder="Enter password"
                            />
                        </div>

                        <input type="submit" className="btn" value="Registro" title="boton envio de registro" />
                        <p className="social_text">O registrate con:</p>
                        <div className="social_media" id="boton-signupgoogle">
                            <GoogleSignUp />
                        </div>

                    </form>
                </div>
            </div>
            <div className="panel_container">
                <div className="panel left_panel">
                    <div className="content">
                        <h3>No tenés cuenta todavía?</h3>
                        <p>
                            Registrate para empezar a regalar emociones
                        </p>
                        <button className="btn transparent" id="sign_up_btn"  >
                            Registrate
                        </button>
                    </div>
                    <div className="image"></div>
                </div>
                <div className="panel right_panel">
                    <div className="content">
                        <h3>Querés iniciar sesión?</h3>
                        <p>
                            Iniciá sesión para seguir regalando momentos inolvidables
                        </p>
                        <button className="btn transparent" id="sign_in_btn">
                            Iniciar Sesión
                        </button>
                    </div>
                    <div className="image"></div>
                </div>
            </div>
        </div>

    )
}

export default SignIn