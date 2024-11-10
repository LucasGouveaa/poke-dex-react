import React, {useEffect, useState} from 'react';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import styles from './styles.module.scss';
import {IFilterPokemons, IPokemon, IType} from "../../Interfaces/Backend";
import 'bootstrap/dist/css/bootstrap.min.css';
import Switch from 'react-switch';
import img from '../../Images/pokeball.png';
import {toast} from 'react-toastify';
import {useMutation, useQueryClient} from "react-query";
import {capturePokemon, releasePokemon} from "../../Services/Services";

interface Props {
    isOpen: boolean;
    toggle: () => void;
    pokemon: IPokemon;
}

const PokemonDetailModal: React.FC<Props> = ({isOpen, toggle, pokemon}) => {
    const [isShiny, setIsShiny] = useState(false);
    const [isFemale, setIsFemale] = useState(false);

    const queryClient = useQueryClient();

    useEffect(() => {
        setIsShiny(false)
        setIsFemale(false)

    }, [pokemon]);

    const getUrl = (pokemon: IPokemon) => {
        if (isShiny) {
            if (isFemale) {
                return pokemon.front_shiny_female
            }

            return pokemon.front_shiny
        } else {
            if (isFemale) {
                return pokemon.front_female
            }

            return pokemon.front_default
        }
    }

    const mutateCapturePokemon = useMutation(() => {
            return capturePokemon(pokemon.id);
        },
        {
            onSettled: (result) => {
                if (result && result.data) {
                    if (result.data.success) {
                        toast.success(result.data.message)
                        queryClient.invalidateQueries(['pokemons'])
                        toggle()

                    } else {
                        toast.error(result.data.message)
                    }
                }
            },
            onError: (error) => {
                console.log(error)
                toast.error("Erro ao capturar pokemon.")
            }
        });

    const mutateReleasePokemon = useMutation(() => {
            return releasePokemon(pokemon.id);
        },
        {
            onSettled: (result) => {
                if (result && result.data) {
                    if (result.data.success) {
                        toast.success(result.data.message)
                        queryClient.invalidateQueries(['pokemons'])
                        toggle()

                    } else {
                        toast.error(result.data.message)
                    }
                }
            },
            onError: (error) => {
                console.log(error)
                toast.error("Erro ao capturar pokemon.")
            }
        })

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Detalhes</ModalHeader>
            <ModalBody>
                <div className={styles.toggleContainer}>
                    <div>
                        <span>Shiny</span>
                        <Switch
                            onChange={() => setIsShiny(!isShiny)}
                            checked={isShiny}
                            disabled={!pokemon.front_shiny}
                            offColor="#888"
                            onColor="#2196F3"
                            uncheckedIcon={false}
                            checkedIcon={false}
                            height={20}
                            width={40}
                        />
                    </div>
                    <div>
                        <span>Feminino</span>
                        <Switch
                            onChange={() => setIsFemale(!isFemale)}
                            checked={isFemale}
                            disabled={!pokemon.front_female}
                            offColor="#888"
                            onColor="#2196F3"
                            uncheckedIcon={false}
                            checkedIcon={false}
                            height={20}
                            width={40}
                        />
                    </div>
                </div>
                <div className={styles.pokemonImage}>
                    <img
                        src={getUrl(pokemon) ?? ''}
                        alt={pokemon.name}
                    />
                </div>
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
                <p><strong>Nome:</strong> {pokemon.name}</p>
                <p><strong>Habitat:</strong> {pokemon.habitat ?? 'Não definido'}</p>
                <p><strong>Habilidades:</strong> {pokemon.abilities.join(', ')}</p>
                {pokemon.trainer_name ?
                    <p><strong>Capturado por:</strong> {pokemon.trainer_name}</p>
                    :
                    <div className={styles.capture}>
                        <button onClick={() => mutateCapturePokemon.mutate()}>
                            <img src={img} alt={'Pokeball'}/>
                            <span>Capturar</span>
                        </button>
                    </div>
                }
                {pokemon.is_trainer &&
                    <div className={styles.release}>
                        <button onClick={() => mutateReleasePokemon.mutate()}>
                            <span>Soltar</span>
                        </button>
                    </div>
                }
            </ModalBody>
        </Modal>
    );
};

export default PokemonDetailModal;
