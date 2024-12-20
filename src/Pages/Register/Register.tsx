import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss';
import {useNavigate} from "react-router-dom";
import {useMutation} from "react-query";
import {register} from "../../Services/Services";
import {IPostRegister} from "../../Interfaces/Backend";
import {useCookies} from "react-cookie";
import UseAuth from "../../Helpers/UseAuth";
import {toast} from "react-toastify";

const Register: React.FC = () => {
    const [params, setParams] = useState<IPostRegister>({
        name: '',
        email: '',
        password: ''
    });

    const [confirmPassword, setConfirmPassword] = useState('');
    const [cookies, setCookies] = useCookies(['jwt_token']);
    const navigate = useNavigate();
    const isAuthenticated = UseAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated]);



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!params.name.trim() || !params.email.trim() || !params.password.trim() || !confirmPassword.trim()) {
            toast.info('Por favor, preencha todos os campos.');
            return;
        }
        if (params.password.trim() !== confirmPassword.trim()) {
            toast.error('As senhas não coincidem.');
            return;
        }
        if (params.password.trim().length < 6){
            toast.error('A senha deve conter no mínimo 6 caracteres.');
            return;
        }

        mutateRegister.mutate()
    };

    const mutateRegister = useMutation(() => {
        return register(params)
    }, {
        onSettled: (result) => {
            if (result && result.data) {
                if (result.data.success) {
                    setCookies("jwt_token", result.data.token, {
                        domain: process.env.REACT_APP_URL,
                        path: '/',
                        maxAge: 3600 * 24,
                    })

                    navigate('/')
                } else {
                    toast.error(result.data.message)
                }
            }
        },
        onError: (error) => {
            console.log(error)
            toast.error('Erro ao cadastrar.')
        }
    })

    return (
        <div className={styles.registerContainer}>
            <h1>Registro</h1>
            <form className={styles.registerForm} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Nome</label>
                    <input
                        type="text"
                        id="name"
                        disabled={mutateRegister.isLoading}
                        value={params.name}
                        onChange={(e) => setParams({...params, name: e.target.value})}
                        placeholder="Digite seu nome"
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        disabled={mutateRegister.isLoading}
                        value={params.email}
                            onChange={(e) => setParams({...params, email: e.target.value})}
                        placeholder="Digite seu e-mail"
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="password">Senha</label>
                    <input
                        type="password"
                        id="password"
                        disabled={mutateRegister.isLoading}
                        value={params.password}
                        onChange={(e) => setParams({...params, password: e.target.value})}
                        placeholder="Digite sua senha"
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="confirmPassword">Confirme sua Senha</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        disabled={mutateRegister.isLoading}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirme sua senha"
                        required
                    />
                </div>

                <button type="submit" disabled={mutateRegister.isLoading} className={styles.registerButton}>
                    Registrar
                </button>

                <span className={styles.navigate}>Já possui conta? <p onClick={() => navigate('/login')}>Entre agora!</p></span>
            </form>
        </div>
    );
};

export default Register;
