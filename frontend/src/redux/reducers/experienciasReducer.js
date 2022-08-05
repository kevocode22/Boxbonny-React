const initialState = {
    experiencias: [],
    auxiliar: [],
    getOneExperiencia: {},
    filter: []

}

const experienciasReducer = (state = initialState, action) => {

    switch (action.type) {
        case "GETEXPERIENCIAS":
            return {
                ...state,
                experiencias: action.payload,
                auxiliar: action.payload,
                filter: action.payload

            }

        case "GETONEEXPERIENCIA":
            return {
                ...state,
                getOneExperiencia: action.payload
            }

        case "FILTEREXPERIENCIAS":
            let filterExperiencia = state.experiencias.filter(city => city.ciudad === action.payload.value)
            return {
                ...state,
                filter: filterExperiencia,
            }
        case "GETEXPERIENCIASBYPACK":
            return {
                ...state,
                getExperienciasByPack: action.payload
            }

        default:
            return state
    }
}

export default experienciasReducer