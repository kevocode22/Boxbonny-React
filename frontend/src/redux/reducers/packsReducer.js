const initialState = {
    packs: [],
    getOnePack: [],
    filterPacks:[]
}

const packsReducer = (state = initialState, action) => {

    switch (action.type) {
        case "GETPACKS":
            return {
                ...state,
                packs: action.payload,
                filterPacks: action.payload
            }
        case "GETONEPACK":
            return {
                ...state,
                getOnePack: action.payload
            }
        case "FILTERPACKS":
                let filter = state.filterPacks.filter(pack => pack.Precio < action.payload)   
                // console.log("ACTION.PAYLOAD", action.payload);    
                // console.log("FILTER", filter) 
            return{
                ...state,
                filterPacks: filter
            }
        default:
            return state
    }
}

export default packsReducer