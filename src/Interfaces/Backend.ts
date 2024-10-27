export interface IFilterPokemons {
    name: string | null;
    habitat: string | null;
    type: number | null;
    page: number;
    pageSize: number
}

export interface IType {
    id: number;
    name: string;
    img_url: string;
}
export interface IPokemon {
    id: number;
    name: string;
    habitat?: string | null;
    abilities: string[];
    front_default?: string | null;
    back_default?: string | null;
    front_female?: string | null;
    back_female?: string | null;
    front_shiny?: string | null;
    back_shiny?: string | null;
    front_shiny_female?: string | null;
    back_shiny_female?: string | null;
    types: IType[]
}


export interface IDataPokemons {
    data: {
        pokemons: IPokemon[]
        currentPage: number;
        lastPage: number;
        perPage: number;
        total: number;
    }
}