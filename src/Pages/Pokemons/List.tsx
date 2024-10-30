import React, {CSSProperties, useState} from 'react';
import styles from './styles.module.scss';
import FilterPokemons from "../../Components/FilterPokemons/FilterPokemons";
import {IDataPokemons, IFilterPokemons, IPokemon, IType} from "../../Interfaces/Backend";
import {useQuery} from "react-query";
import {getPokemons} from "../../Services/Services";
import {BarLoader} from "react-spinners";
import Pagination from "../../Components/Pagination/Pagination";
import PokemonDetailModal from "../../Components/PokemonDetailModal/PokemonDetailModal";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const ListPokemons: React.FC = () => {
    document.title = 'Pokémons'

    const [filter, setFilter] = useState<IFilterPokemons>({
        name: null,
        habitat: null,
        type: null,
        page: 1,
        pageSize: 10
    })
    const [selectedPokemon, setSelectedPokemon] = useState<IPokemon | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {data, isLoading} = useQuery<IDataPokemons>(['pokemons', filter], () => getPokemons(filter), {
        staleTime: Infinity
    })

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const openModal = (pokemon: IPokemon) => {
        setSelectedPokemon(pokemon);
        toggleModal();
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Pokémons</h1>
                    <FilterPokemons filter={filter} setFilter={setFilter} isLoading={isLoading}/>
                </div>
                {isLoading ?
                    <BarLoader
                        color={'#3b4cca'}
                        loading={isLoading}
                        cssOverride={override}
                        aria-label="Loading Spinner"
                        data-testid="loader"

                    />
                    : (data && data.data && data.data.pokemons.length > 0 ?
                            <div className={styles.pokemonGrid}>
                                {data.data.pokemons.map((pokemon: IPokemon) => {
                                    return (
                                        <div key={pokemon.id} className={styles.pokemonCard}
                                             onClick={() => openModal(pokemon)}>
                                            <img src={pokemon.front_default ?? ''}
                                                 alt={pokemon.name}/>
                                            <p><strong>ID:</strong> {pokemon.id}</p>
                                            <p><strong>Nome:</strong> {pokemon.name}</p>
                                            <p className={styles.habitat}>
                                                <strong>Habitat:</strong> {pokemon.habitat ?? 'Não definido'}
                                            </p>
                                            <div className={styles.pokemonTypes}>
                                                {pokemon.types.map((type: IType) => {
                                                    return (
                                                        <img
                                                            className={styles.typeBadge}
                                                            src={type.img_url}
                                                            alt={type.name}/>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            :
                            <div className={styles.alignCenter}>
                                <p>Nenhum resultado encotrado.</p>
                            </div>
                    )}
                {data && data.data &&
                    <Pagination
                        currentPage={data.data.currentPage}
                        lastPage={data.data.lastPage}
                        onPageChange={(payload) => setFilter({...filter, page: payload})}
                    />
                }
            </div>
            {selectedPokemon &&
                <PokemonDetailModal
                    isOpen={isModalOpen}
                    toggle={toggleModal}
                    pokemon={selectedPokemon}
                />
            }
        </>
    );
};

export default ListPokemons;
