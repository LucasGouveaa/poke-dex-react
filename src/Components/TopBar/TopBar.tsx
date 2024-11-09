import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss';
import {Outlet} from "react-router-dom";
import {IDataUser, IUser} from "../../Interfaces/Backend";
import {useQuery} from "react-query";
import {me} from "../../Services/Services";
import img from '../../Images/pokemon-trainer.png';

const TopBar: React.FC = () => {
    document.title = "Pokédex"
    const [user, setUser] = useState<IUser | null>(null)

    const {data} = useQuery<IDataUser>(['user-me'], () => me(), {
        staleTime: Infinity
    })

    useEffect(() => {
        if (data && data.data && data.data.user) {
            setUser(data.data.user)
        }
    }, [data]);

    return (
        <>
            <div className={styles.topBar}>
                <div className={styles.userInfo}>
                    <img
                        src={img}
                        alt="User"
                        className={styles.userAvatar}
                    />
                    <span className={styles.userName}>{user?.name}</span>
                </div>
            </div>
            <Outlet/>
        </>
    );
};

export default TopBar;
