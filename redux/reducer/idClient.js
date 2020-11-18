import { saveId } from '../action';
import * as types from '../constans/ActionType';

var initialState = [
    {
        id : '',
        name : '',
        urlImg: ''
    }
]

const idClient = (state = initialState, action) => {
    var {id, name, urlImg} = action;
    switch( action.type){
        case types.SAVE_ID_CLIENT:
            for(var i = 0; i< state.length; i++){
                state[i].id = id
                state[i].name = name
                state[i].urlImg = urlImg
            }
            console.log(state)
            return [...state]
        default: return [...state]
    }
}

export default idClient;