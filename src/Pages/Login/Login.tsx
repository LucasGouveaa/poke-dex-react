import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss';
import {useNavigate} from "react-router-dom";
import UseAuth from "../../Helpers/UseAuth";
import {useMutation} from "react-query";
import {login} from "../../Services/Services";
import {useCookies} from "react-cookie";
import {IPostLogin} from "../../Interfaces/Backend";
import {toast} from 'react-toastify';

const Login: React.FC = () => {
    const [params, setParams] = useState<IPostLogin>({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const isAuthenticated = UseAuth();
    const [cookies, setCookies] = useCookies(['jwt_token']);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validação simples dos campos
        if (!params.email.trim() || !params.password.trim()) {
            toast.info('Por favor, preencha todos os campos.');
            return;
        }

        mutateLogin.mutate()
    };

    const mutateLogin = useMutation(() => {
        return login(params)
    }, {
        onSettled: (result) => {
            if (result && result.data) {
                if (result.data.success) {
                    setCookies("jwt_token", result.data.token, {
                        domain: window.location.hostname,
                        path: "/",
                        maxAge: 3600 * 24
                    })

                    navigate('/')
                } else {
                    toast.error(result.data.message)
                }
            }
        },
        onError: (error) => {
            console.log(error)
            toast.error('Erro ao logar.')
        }
    })

    return (
        <div className={styles.loginContainer}>
            <h1>Login</h1>
            <form className={styles.loginForm} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        value={params.email}
                        disabled={mutateLogin.isLoading}
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
                        value={params.password}
                        disabled={mutateLogin.isLoading}
                        onChange={(e) => setParams({...params, password: e.target.value})}
                        placeholder="Digite sua senha"
                        required
                    />
                </div>

                <button disabled={mutateLogin.isLoading} type="submit" className={styles.loginButton}>Entrar</button>

                <p onClick={() => navigate('/register')}>Não possui conta? Crie agora!</p>
            </form>
        </div>
    );
};

export default Login;