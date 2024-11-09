import React from 'react';
import {Route, Routes} from "react-router-dom";
import NotFound from "../Pages/NotFound/NotFound";
import ListPokemons from "../Pages/Pokemons/List";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import RequireAuth from "./RequireAuth";
import TopBar from "../Components/TopBar/TopBar";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route element={(
                <RequireAuth>
                    <>
                    <TopBar/>
                    </>
                </RequireAuth>
            )}>
                <Route path="/" element={<Home/>}/>
                <Route path="/pokemons" element={<ListPokemons/>}/>
            </Route>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
}