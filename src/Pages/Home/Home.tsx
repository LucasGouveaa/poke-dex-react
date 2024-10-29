import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import img from '../../Images/pokeball.png';

const Home: React.FC = () => {
    document.title = 'Pokédex';
    const navigate = useNavigate();

    const goToPokemonList = () => {
        navigate('/pokemons');
    };

    return (
        <div className={styles.home}>
            <img src={img} alt={'Pokeball'}/>
            <h1>Bem-vindo à Pokédex!</h1>
            <p>Explore uma lista completa de Pokémons.</p>
            <button onClick={goToPokemonList}>
                Ir para Listagem de Pokémons
            </button>
        </div>
    );
};

export default Home;
