
import {Avatar,  Rating} from '@mui/material';


export const Comment = ({comentario}) => {
  return (
    <>
      <div className='l-usuario-container'>
        <div className='l-avatar'>
          <Avatar alt="Remy Sharp" src={comentario.idUsuario?.imagen} />
          <div className='l-nombreusuario'>{comentario.idUsuario?.nombre} {comentario.idUsuario?.apellido}</div>
        </div>
        <Rating name="half-rating-read" value={comentario.rating} precision={1} readOnly />
      </div>
      <div className="comment-box-commented">{comentario.comentario}</div>
    </>
  )
}
