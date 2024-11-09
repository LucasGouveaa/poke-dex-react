import api from "./Api";
import {IFilterPokemons, IPostLogin, IPostRegister} from "../Interfaces/Backend";

export const getPokemons = (data: IFilterPokemons) => {
    return Promise.resolve(api.get('/v1/pokemons', {params: data}))
}

export const getHabitats = () => {
    return Promise.resolve(api.get('/v1/habitats'))
}

export const getTypes = () => {
    return Promise.resolve(api.get('/v1/types'))
}

export const me = () => {
    return Promise.resolve(api.get('/v1/auth/me'))
}

export const login = (data: IPostLogin) => {
    return Promise.resolve(api.post('/v1/auth/login', data))
}

export const register = (data: IPostRegister) => {
    return Promise.resolve(api.post('/v1/auth/register', data))
}