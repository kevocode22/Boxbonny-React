import axios from "axios";

const comentariosActions = {

    AddComment: (comentario) => {
        // console.log("COMENTARIO", comentario)
        
        return async (dispatch, getState) => {
            try{
            const token = localStorage.getItem("token")
            const res = await axios.post("https://boxbonny-back.herokuapp.com/api/experiencias/comment", {comentario}, {
                headers: {
                    "Authorization": "Bearer " + token
                }
                
            })
            // console.log("RESP ACTIONS",res)

            return res.data

            }catch (error){
                console.log(error)
            }
        } 
    },

    UpdateComment: (comentario) => {
        // console.log("COMENTARIO",comentario)
        const token = localStorage.getItem('token')
        return async (dispatch, getState) => {
            try{
                const res = await axios.put("https://boxbonny-back.herokuapp.com/api/modifcomment", {...comentario }, {
                    headers: {
                        'Authorization': 'Bearer '+token
                    }
                })
                // console.log("RESACTIONS",res)

                dispatch({
                    type: 'message',
                    payload: {
                        view: true,
                        message: res.data.message,
                        success: res.data.success
                    }
                })

                return res

            }catch(err){
                console.log(err)
            }

        }
    } ,
  
  
    DeleteComment: (id) => {
        const token = localStorage.getItem("token")
        return async (dispatch, getState) => {
            const res = await axios.post(`https://boxbonny-back.herokuapp.com/api/experiencias/comment/${id}`, {}, {
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            dispatch({
                type: "MESSAGE",
                payload: {
                    view: true,
                    message: res.data.message,
                    success: res.data.success
                }
            })
            return res
        }

    },
}

export default comentariosActions