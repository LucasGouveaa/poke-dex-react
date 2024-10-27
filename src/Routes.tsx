import React from 'react';
import {Route, Routes} from "react-router-dom";
import NotFound from "./Pages/NotFound/NotFound";
import ListPokemons from "./Pages/Pokemons/List";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/pokemons" element={<ListPokemons/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
}