import axios from "axios";

const packsActions = {
    getPacks: (inputValue) => {
      return async (dispatch, getState) => {
         const res = await axios.get("https://boxbonny-back.herokuapp.com/api/packs");
         // console.log(res)
         dispatch({ type: "GETPACKS", payload: res.data.response.packs })
         dispatch({ type: "FILTERPACKS", payload: inputValue})
      };
   },

   getOnePack: (id) => {
      return async (dispatch, getState) => {
         const res = await axios.get(`https://boxbonny-back.herokuapp.com/api/packs/${id}`);
         // console.log(res)
         dispatch({ type: "GETONEPACK", payload: res.data.response });
      };
   },
   
   filterExperiencia: (input) => {
      return (dispatch, getState) => {
         dispatch({ type: "FILTEREXPERIENCIAS", payload: input });
      };
   },
   // filterPacks:(inputValue) => {
   // // console.log("🚀 ~ file: packsActions.js ~ line 26 ~ inputValue", inputValue)
   //    return (dispatch, getState) => {
   //       dispatch({type: "FILTERPACKS", payload: inputValue})
   //    }
   // }
};

export default packsActions;
