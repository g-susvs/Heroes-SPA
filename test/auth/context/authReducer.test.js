import { authReducer, types } from "../../../src/auth"

describe('Pruebas en authReducer', () => {

    const initialState = {
        logged: true,
        user:{ id: '123', name: 'Jesús' }
    }
    

    test('debe de retornar el estado por defecto', () => {
        const state = authReducer(initialState, {});
        expect(state).toStrictEqual(initialState);
    })

    test('debe de (login) llamar el login autenticar y establecer el user', () => {
        const action = {
            type: types.login,
            payload: { id: '123', name: 'Juan' }
        }
        const state = authReducer(initialState, action);
        expect(state.logged).toBeTruthy();
        expect(state).toEqual({
            logged: true,
            user: action.payload
        })
    })
    
    test('debe de (logout) borrar el name del usuario y logged en false', () => {
        const action = {type: types.logout}
        const state = authReducer(initialState, action);
        expect(state).toEqual({logged: false});
        
    })  

})