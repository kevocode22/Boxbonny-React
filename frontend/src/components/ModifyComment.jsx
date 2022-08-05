import React from "react";
import { useDispatch } from "react-redux"
import { useState } from "react";
import comentariosActions from "../redux/actions/comentariosActions";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import "../styles/Comments.css"
import toast from 'react-hot-toast';
import Rating from '@mui/material/Rating';

function ModifyComment({ comentario, reloadChanger, usuario }) {
    // console.log("COMENTARIO", comentario)


    const [modify, setModify] = useState()
    const dispatch = useDispatch()


    //EDITAR COMENTARIO
  
    async function modifyComment(event) {
        event.preventDefault()
        const commentData = {
            idComentario: event.target.id,
            comentario: modify,
        }
        const res = await dispatch(comentariosActions.UpdateComment(commentData))
        reloadChanger()


        if (res.data.success) {
            toast(res.data.message)
        } else {
            toast.error(res.data.message)
        }
    }

    //ELIMINAR COMENTARIO

    async function deleteComment(event) {
        event.preventDefault()
        const res = await dispatch(comentariosActions.DeleteComment(event.target.id))
        reloadChanger()


        if (res.data.success) {
            toast(res.data.message)
        } else {
            toast.error(res.data.message)
        }

    }

    return (
        <>
            <div className="l-commentsmodif-container">
                <div className='l-usuario-container'>
                    <div className='l-avatar'>
                        <Avatar alt="Remy Sharp" src={usuario?.imagen} />
                        <div className='l-nombreusuario'>{comentario.idUsuario?.nombre} {comentario.idUsuario?.apellido}</div>
                    </div>
                    <Rating name="half-rating-read" value={comentario.rating} precision={1} readOnly />
                </div>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <div className="comment-box" onInput={(event) => setModify(event.currentTarget.textContent)} suppressContentEditableWarning={true} contentEditable>{comentario.comentario}</div>
                    </div>
                    <div className='l-buttons-cont'>
                        <button onClick={modifyComment} id={comentario._id} className="call-button comment-button">✏️</button>
                        <button onClick={deleteComment} id={comentario._id} className="call-button comment-button">❌</button>
                    </div>
                </Box>
            </div>
        </>















    )
}
export default ModifyComment