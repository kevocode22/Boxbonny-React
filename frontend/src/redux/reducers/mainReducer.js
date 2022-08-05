import { combineReducers } from "redux";
import experienciasReducer from "./experienciasReducer";
import packsReducer from "./packsReducer";
import usuariosReducer from "./usuariosReducer";
import shoppingReducer from "./shoppingReducer";

const mainReducer = combineReducers({
  experienciasReducer, packsReducer, usuariosReducer, shoppingReducer
})

export default mainReducer