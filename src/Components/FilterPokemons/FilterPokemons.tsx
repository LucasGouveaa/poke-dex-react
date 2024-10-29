import React, {useEffect, useState} from "react";
import styles from "./styles.module.scss";
import {Button, Input} from "reactstrap";
import Select from "react-select";
import {IFilterPokemons} from "../../Interfaces/Backend";
import {useQuery} from "react-query";
import {getHabitats, getTypes} from "../../Services/Services";

interface Option {
    value: string;
    label: string;
}

interface Props {
    setFilter: Function;
    filter: IFilterPokemons
    isLoading: boolean
}

const FilterPokemons: React.FC<Props> = ({filter, setFilter, isLoading}) => {
    const [searchName, setSearchName] = useState('');
    const [filterHabitats, setFilterHabitats] = useState<Option | null>(null);
    const [filterTypes, setFilterTypes] = useState<Option | null>(null);
    const [habitats, setHabitats] = useState<Option[]>([]);
    const [types, setTypes] = useState<Option[]>([]);

    const {data: dataHabitats, isLoading: isLoadingHabitats} = useQuery(['habitats'], () => getHabitats(), {
        staleTime: Infinity
    })

    const {data: dataTypes, isLoading: isLoadingTypes} = useQuery(['types'], () => getTypes(), {
        staleTime: Infinity
    })

    useEffect(() => {
        if (dataHabitats && dataHabitats.data) {
            setHabitats(dataHabitats.data)
        }
    }, [dataHabitats]);

    useEffect(() => {
        if (dataTypes && dataTypes.data) {
            setTypes(dataTypes.data)
        }
    }, [dataTypes]);

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
                disabled={isLoading}
            />
            <Select
                options={habitats}
                placeholder="Habitat"
                value={filterHabitats}
                onChange={(options) => setFilterHabitats(options)}
                isClearable
                className={styles.select}
                isDisabled={isLoading || isLoadingHabitats}
            />
            <Select
                options={types}
                placeholder="Tipo"
                value={filterTypes}
                onChange={(options) => setFilterTypes(options)}
                isClearable
                className={styles.select}
                isDisabled={isLoading || isLoadingTypes}
            />
            <Button color="primary" onClick={handleFilter} className={styles.filterButton} isDisabled={isLoading}>
                Filtrar
            </Button>
        </div>
    )
}

export default FilterPokemons