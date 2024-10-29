import React from 'react';
import {Route, Routes} from "react-router-dom";
import NotFound from "./Pages/NotFound/NotFound";
import ListPokemons from "./Pages/Pokemons/List";
import Home from "./Pages/Home/Home";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/pokemons" element={<ListPokemons/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
}