import React, {FC, useCallback, useEffect, useMemo, useState} from "react";
import {Col, Container, Dropdown, DropdownButton, Jumbotron, Row, Spinner } from "react-bootstrap";
import styles from './index.module.css';
import {useSelector, useDispatch} from "react-redux";
import { GET_BREEDS } from "../../actions/cat.action";

interface Breed {
    name: string,
    id: string
}

const List : FC = () => {
    const dispatch = useDispatch();
    const getBreedStatus = useSelector((state: any)=>state?.cat?.getBreedStatus);
    const breeds = useSelector((state: any)=>state?.cat?.breeds);

    const [selectedBreed, setSelectedBreed] = useState<Breed>();

    useEffect(()=>{
        dispatch({ type: GET_BREEDS.REQUEST });
    },[]);

    const changeBreed = useCallback(({id, name}: Breed)=>{
        setSelectedBreed({id, name});
    }, []);

    const breedsSelector = useMemo(()=>{
        if(getBreedStatus !== "success")
            return <Spinner animation="grow" variant="secondary" />;
        else
            return <DropdownButton id="dropdown-variants-secondary" title={selectedBreed?.name ?? "Select breed"} key={"Secondary"} variant={"secondary"}>
                {breeds.map(({id, name}:Breed)=>(<Dropdown.Item key={id} onClick={()=>{changeBreed({id, name})}}>{name}</Dropdown.Item>))}
            </DropdownButton>;
    }, [getBreedStatus, selectedBreed]);

    return <>
        <Jumbotron className={styles.container} fluid>
            <Container>
                <h1>Cat Browser</h1>
                {breedsSelector}
            </Container>
        </Jumbotron>
    </>
}

export default List;
