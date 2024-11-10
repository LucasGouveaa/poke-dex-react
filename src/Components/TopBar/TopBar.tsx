import React, {useEffect, useRef, useState} from 'react';
import styles from './styles.module.scss';
import {Outlet, useNavigate} from "react-router-dom";
import {IDataUser, IUser} from "../../Interfaces/Backend";
import {useMutation, useQuery} from "react-query";
import {logout, me} from "../../Services/Services";
import userImg from '../../Images/pokemon-trainer.png';
import logoutImg from '../../Images/logout.png';
import {useCookies} from "react-cookie";
import {toast} from "react-toastify";

const TopBar: React.FC = () => {
    document.title = "Pokédex";
    const [user, setUser] = useState<IUser | null>(null);
    const [isPopperVisible, setIsPopperVisible] = useState(false);

    const {data} = useQuery<IDataUser>(['user-me'], () => me(), {
        staleTime: Infinity
    })

    useEffect(() => {
        if (data && data.data && data.data.user) {
            setUser(data.data.user)
        }
    }, [data]);

    const [cookies, setCookie, removeCookie] = useCookies(['jwt_token']);
    const navigate = useNavigate()

    const boxRef = useRef<HTMLDivElement | null>(null);
    const popperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                popperRef.current &&
                !popperRef.current.contains(event.target as Node) &&
                boxRef.current &&
                !boxRef.current.contains(event.target as Node)
            ) {
                setIsPopperVisible(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const togglePopper = () => {
        if (user) {
            setIsPopperVisible((prev) => !prev);
        }
    };

    const mutateLogout = useMutation(() => {
            return logout()
        },
        {
            onSettled: (result) => {
                if (result && result.data && result.data.success) {
                    removeCookie('jwt_token', { path: '/', domain: process.env.REACT_APP_URL });
                    navigate('/login')
                }
            },
            onError: (error) => {
                console.log(error)
                toast.error('Erro ao deslogar.')
            }
        })


    return (
        <>
            <div className={styles.topBar}>
                <div className={styles.userInfo} ref={boxRef} onClick={togglePopper}>
                    <img
                        src={userImg}
                        alt="User"
                        className={styles.userAvatar}
                    />
                    <span className={styles.userName}>{user?.name}</span>
                </div>

                {isPopperVisible && (
                    <div className={styles.popper} ref={popperRef}>
                        <div className={styles.logout} onClick={() => mutateLogout.mutate()}>
                            <img
                                src={logoutImg}
                                alt={"Sair"}
                            />
                            <span>Sair</span>
                        </div>
                    </div>
                )}
            </div>
            <Outlet/>
        </>
    );
};

export default TopBar;
