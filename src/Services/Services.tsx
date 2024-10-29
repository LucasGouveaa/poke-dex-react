import api from "./Api";
import {IFilterPokemons} from "../Interfaces/Backend";

export const getPokemons = (data: IFilterPokemons) => {
    return Promise.resolve(api.get('/v1/pokemons', {params: data}))
}

export const getHabitats = () => {
    return Promise.resolve(api.get('/v1/habitats'))
}

export const getTypes = () => {
    return Promise.resolve(api.get('/v1/types'))
}