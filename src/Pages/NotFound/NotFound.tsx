import React from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './styles.module.scss';

const NotFound: React.FC = () => {
    document.title = 'Pokédex';

    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.errorCode}>404</h1>
            <h2 className={styles.message}>Página Não Encontrada</h2>
            <p className={styles.description}>
                A página que você está procurando não existe.
            </p>
            <button onClick={handleGoHome} className={styles.button}>
                Voltar para a Página Inicial
            </button>
        </div>
    );
};

export default NotFound;