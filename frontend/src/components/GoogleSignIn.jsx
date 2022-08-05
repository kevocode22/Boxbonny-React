import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import usuariosActions from "../redux/actions/usuariosActions"
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

export default function GoogleSignIn() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    async function handleCallBackResponse(response) {
        let userObject = jwt_decode(response.credential);
        // eslint-disable-next-line
        const res = await dispatch(usuariosActions.inicioSesion({
            email: userObject.email,
            password: userObject.sub,
            from: 'GOOGLE'
        }))
        if (res.data.success) {
            toast.success(res.data.message)
            navigate('/signin')
        } else {
            toast.error(res.data.message)
        }

    }

    useEffect(() => {
        /* global google*/
        google.accounts.id.initialize({
            client_id: '470285644051-uhachn5p7j7be2rkqtqthkeuc5mkeq76.apps.googleusercontent.com',
            callback: handleCallBackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById('buttonID'),
            { theme: "filled_black", size: "small", locale: 'en', text: 'signin_with', shape: "pill" }
        )
        // eslint-disable-next-line
    });

    return (
        <div>
            <div id="buttonID"></div>
        </div>
    )

}
