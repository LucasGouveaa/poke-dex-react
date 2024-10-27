import React, {useState} from "react";
import styles from "./styles.module.scss";
import {Button, Input} from "reactstrap";
import Select from "react-select";
import {IFilterPokemons} from "../../Interfaces/Backend";

interface Option {
    value: string;
    label: string;
}

interface Props {
    setFilter: Function;
    filter: IFilterPokemons
}

const FilterPokemons: React.FC<Props> = ({filter, setFilter}) => {
    const [searchName, setSearchName] = useState('');
    const [filterHabitats, setFilterHabitats] = useState<Option | null>(null);
    const [filterTypes, setFilterTypes] = useState<Option | null>(null);

    const habitats: Option[] = [
        {value: 'Forest', label: 'Forest'},
        {value: 'Cave', label: 'Cave'},
        {value: 'Mountain', label: 'Mountain'},
        {value: 'Grassland', label: 'Grassland'},
    ];

    const types: Option[] = [
        {value: 'Grass', label: 'Grass'},
        {value: 'Fire', label: 'Fire'},
        {value: 'Water', label: 'Water'},
        {value: 'Electric', label: 'Electric'},
        {value: 'Flying', label: 'Flying'},
        {value: 'Bug', label: 'Bug'},
    ];

    const handleFilter = () => {
        setFilter({
            ...filter,
            name: searchName,
            habitat: filterHabitats?.value,
            type: filterTypes ? filterTypes.value : null,
            page: 1
        })
    }


    return (
        <div className={styles.filters}>
            <Input
                type="text"
                placeholder="Nome"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className={styles.searchInput}
            />
            <Select
                options={habitats}
                placeholder="Habitat"
                value={filterHabitats}
                onChange={(options) => setFilterHabitats(options)}
                isClearable
                className={styles.select}
            />
            <Select
                options={types}
                placeholder="Tipo"
                value={filterTypes}
                onChange={(options) => setFilterTypes(options)}
                isClearable
                className={styles.select}
            />
            <Button color="primary" onClick={handleFilter} className={styles.filterButton}>
                Filtrar
            </Button>
        </div>
    )
}

export default FilterPokemons