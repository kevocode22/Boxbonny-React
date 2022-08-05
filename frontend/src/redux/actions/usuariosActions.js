import axios from 'axios';

const usuariosActions = {
    registrarse: (data) => {
        // console.log(userData)
        return async (dispatch, getState) => {
            try {
                const res = await axios.post("https://boxbonny-back.herokuapp.com/api/registrarse", { data })
                dispatch({
                    type: 'MESSAGE',
                    payload: {
                        view: true,
                        message: res.data.message,
                        success: res.data.success
                    }
                })
                return res
            } catch (error) {
                console.log(error)
            }

        }
    },

    inicioSesion: (logueado) => {
        return async (dispatch, getState) => {
            const res = await axios.post("https://boxbonny-back.herokuapp.com/api/inicioSesion", { logueado })
            // console.log(res)
            //primero verifico que el success sea true
            if (res.data.success) {
                localStorage.setItem("token", res.data.response.token) //tomo el token que le envie desde el back y lo envio al local storage
                dispatch({ type: "USER", payload: res.data.response.usuarioData });
            }
            dispatch({
                type: 'MESSAGE',
                payload: {
                    view: true,
                    message: res.data.message,
                    success: res.data.success
                }
            })

            return res
        }
    },

    desloguearse: () => {
        return async (dispatch, getState) => {
            localStorage.removeItem('token')
            dispatch({
                type: 'USER',
                payload: null
            })
        }
    },

    verificarToken: (token) => {
        // console.log(token)

        return async (dispatch, getState) => {

            await axios.get("https://boxbonny-back.herokuapp.com/api/verificarToken", {
                headers: {
                    "Authorization": "Bearer " + token //el header espera una autoriz. metodo para autenticar y autozar el usuario
                }
            })
                .then(res => {
                    if (res.data.success) {
                        dispatch({ type: "USER", payload: res.data.response });
                        dispatch({
                            type: "MESSAGE",
                            payload: {
                                view: true,
                                message: res.data.message,
                                success: res.data.success
                            }
                        });
                    } else { localStorage.removeItem("token") }
                }


                )
                .catch(error => {
                    if (error.response.status === 401) //problemas de autenticacion
                        dispatch({
                            type: "MESSAGE",
                            payload: {
                                view: true,
                                message: "Please Log In again",
                                success: false
                            }
                        })
                    localStorage.removeItem("token")
                })
        }
    }
}


export default usuariosActions