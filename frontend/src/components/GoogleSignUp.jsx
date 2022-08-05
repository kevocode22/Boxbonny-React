import React, { useEffect } from "react"
import jwt_decode from "jwt-decode"
import { useDispatch } from "react-redux"
import usuariosActions from "../redux/actions/usuariosActions"
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

export default function GoogleSignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    async function handleCallBackResponse(response) {
        // console.log(response.credential);
        let userObject = jwt_decode(response.credential);
        // console.log(userObject);
        // console.log(props)
// eslint-disable-next-line
        const res = await dispatch(usuariosActions.registrarse({
            nombre: userObject.given_name,
            apellido: userObject.family_name,
            email: userObject.email,
            contraseña: userObject.sub,
            imagen: userObject.picture,
            from: "GOOGLE"

        }))
        if (res.data.success) {
            toast.success(res.data.message)
            navigate('/signin')
        } else {
            toast.error(res.data.message)
        }
    
       

    }

    useEffect(() => {
        /*global google*/
        google.accounts.id.initialize({
            client_id: '470285644051-uhachn5p7j7be2rkqtqthkeuc5mkeq76.apps.googleusercontent.com',
            callback: handleCallBackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            { theme: "filled_black", size: "small", locale: 'en', text: 'signup_with', shape: "pill" }
        )
    });

    return (
        <div>
            <div id="buttonDiv"></div>
        </div>
    )





}
