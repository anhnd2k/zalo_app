import * as types from '../constans/ActionType';

export const saveId = (id, name, urlImg) => {
    return {
        type : types.SAVE_ID_CLIENT,
        id,
        name,
        urlImg
    }
}