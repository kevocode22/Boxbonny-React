import React, { useRef } from 'react'
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import "../styles/Comments.css"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react";
import comentariosActions from "../redux/actions/comentariosActions"
import ModifyComment from "../components/ModifyComment"
import toast from "react-hot-toast"
import { Link as LinkRouter } from "react-router-dom"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect } from 'react';
import { Comment } from './Comment';

function Comments({ reloadChanger }) {

    const [open, setOpen] = useState(false);
    const [scroll, setScroll] = useState('paper');
    const [value, setValue] = useState(null);

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);


    const experiencia = useSelector(store => store.experienciasReducer.getOneExperiencia)
    // console.log("EXPERIENCIA", experiencia)
    const usuario = useSelector(store => store.usuariosReducer.user)
    // console.log("USUARIO", usuario)


    let comentariosArray = experiencia.comentarios
    // console.log("COMENTARIOS", comentariosArray)
    const RatingsSuma = comentariosArray?.map(item => item.rating).reduce((prev, curr) => prev + curr, 0);
    const RatingPromedio = Math.ceil(RatingsSuma / comentariosArray?.length)
    // console.log("PROMEDIO", RatingPromedio)



    const [inputText, setInputText] = useState()
    const dispatch = useDispatch()
    const inputTextElement = useRef(null)

    function handleInputText(event) {
        setInputText(event.currentTarget.textContent)
    }


    //AGREGAR COMENTARIO

    useEffect(() => {


    })

    async function agregarCommentarioUsuario(event) {
        event.preventDefault()
        const comentario = {
            experiencia: experiencia._id,
            comentario: inputText,
            rating: value
        }
        const res = await dispatch(comentariosActions.AddComment(comentario))
        inputTextElement.current.innerText = ""
        reloadChanger()
        setValue(null)

        if (res.success) {
            toast(res.message)
        } else {
            toast.error(res.message)
        }
    }

    return (

        <div className='l-dropdown'>
            {// eslint-disable-next-line
            comentariosArray?.length !== 0 ?
                <Button onClick={handleClickOpen('paper')} className="rating-text">VALORACION DE ESTA EXPERIENCIA ENTRE {comentariosArray?.length} OPINIONES!
                    <Rating name="half-rating-read rating-opiniones" value={RatingPromedio} precision={1} readOnly />
                </Button> :
                <Button onClick={handleClickOpen('paper')} className="rating-text">NADIE VALORO ESTA EXPERIENCIA AUN!
                    <Rating name="half-rating-read" value={RatingPromedio} precision={1} readOnly />
                </Button>
            }
            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">OPINIONES</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        {experiencia.comentarios?.map(comentario =>

                            <div className="l-comments-container" key={comentario._id}>
                                {/* si el usuario no es el que hizo el comentario */}

                                {comentario?.idUsuario._id !== usuario?.id ?

                                   <Comment comentario={comentario} />
                                    :
                                    <ModifyComment comentario={comentario} usuario={usuario} reloadChanger={reloadChanger} />
                                }
                            </div>
                        )}


                        {/* CONDICION USUARIO LOGUEADO*/}

                        {usuario ?
                            <>
                                <div className="l-comments-container">
                                    <div className='l-usuario-container'>
                                        <div className='l-avatar'>
                                            <Avatar alt="Remy Sharp" src={usuario?.imagen} />
                                            <div className='l-nombreusuario'>{usuario?.nombre} {usuario?.apellido}</div>
                                        </div>
                                        <Rating name="simple-controlled"
                                            value={value}
                                            onChange={(event, newValue) => {
                                                setValue(newValue);
                                            }} />
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
                                            <div className="comment-box" ref={inputTextElement} onInput={handleInputText} contentEditable suppressContentEditableWarning={true}></div>
                                        </div>
                                        <div className='l-buttons-cont'>
                                            <button onClick={agregarCommentarioUsuario}>➕</button>
                                        </div>
                                    </Box>
                                </div>
                            </>
                            :
                            <div className="login-button-box">
                                <div className="invitation"> SI DISFRUTASTE DE ESTA EXPERIENCIA, QUEREMOS CONOCER TU OPINION!</div>
                                <LinkRouter to={"/signin"}>
                                    <button className="card-button l-card-button-comments fontRaleway">INGRESA</button>
                                </LinkRouter>
                            </div>
                        }

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button className="button-cerrar" onClick={handleClose}>CERRAR ❌</Button>
                </DialogActions>
            </Dialog>




        </div >
    )
}

export default Comments


