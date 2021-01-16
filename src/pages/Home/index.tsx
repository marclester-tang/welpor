import React, {FC, useCallback, useEffect, useMemo, useState} from "react";
import {Button, Container, Dropdown, DropdownButton, Jumbotron, Spinner} from "react-bootstrap";
import styles from './index.module.css';
import {useSelector, useDispatch} from "react-redux";
import {GET_BREEDS, GET_CATS_BY_BREED} from "../../actions/cat.action";
import CardList from "../../components/CardList";
import ContentLoader from 'react-content-loader';
import { useHistory, useLocation } from "react-router-dom";

interface Breed {
    name: string | null,
    id: string | null
}

const MyLoader = () => (
    <ContentLoader viewBox="0 0 900 507" height={507} width={900}>
        <rect x="30" y="20" rx="0" ry="0" width="130" height="23" />
        <rect x="30" y="60" rx="0" ry="0" width="200" height="120" />
        <rect x="30" y="189" rx="0" ry="0" width="200" height="15" />
        <rect x="30" y="211" rx="0" ry="0" width="140" height="15" />
        <rect x="243" y="60" rx="0" ry="0" width="200" height="120" />
        <rect x="243" y="189" rx="0" ry="0" width="200" height="15" />
        <rect x="243" y="211" rx="0" ry="0" width="140" height="15" />
        <rect x="455" y="60" rx="0" ry="0" width="200" height="120" />
        <rect x="455" y="189" rx="0" ry="0" width="200" height="15" />
        <rect x="455" y="211" rx="0" ry="0" width="140" height="15" />
        <rect x="667" y="60" rx="0" ry="0" width="200" height="120" />
        <rect x="667" y="188" rx="0" ry="0" width="200" height="15" />
        <rect x="667" y="209" rx="0" ry="0" width="140" height="15" />
        <rect x="30" y="280" rx="0" ry="0" width="130" height="23" />
        <rect x="30" y="320" rx="0" ry="0" width="200" height="120" />
        <rect x="30" y="450" rx="0" ry="0" width="200" height="15" />
        <rect x="30" y="474" rx="0" ry="0" width="140" height="15" />
        <rect x="243" y="320" rx="0" ry="0" width="200" height="120" />
        <rect x="455" y="320" rx="0" ry="0" width="200" height="120" />
        <rect x="667" y="320" rx="0" ry="0" width="200" height="120" />
        <rect x="243" y="450" rx="0" ry="0" width="200" height="15" />
        <rect x="455" y="450" rx="0" ry="0" width="200" height="15" />
        <rect x="667" y="450" rx="0" ry="0" width="200" height="15" />
        <rect x="243" y="474" rx="0" ry="0" width="140" height="15" />
        <rect x="455" y="474" rx="0" ry="0" width="140" height="15" />
        <rect x="667" y="474" rx="0" ry="0" width="140" height="15" />
    </ContentLoader>
)

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}


const Home : FC = () => {
    //Set the limit per page to 8 so it would appear balance
    const PAGE_LIMIT = 8;

    const history = useHistory();
    const query = useQuery();
    const dispatch = useDispatch();
    const getBreedStatus = useSelector((state: any)=>state?.cat?.getBreedStatus);
    const getCatListStatus = useSelector((state: any)=>state?.cat?.getCatListStatus);
    const breeds = useSelector((state: any)=>state?.cat?.breeds);
    const catsByBreed = useSelector((state: any)=>state?.cat?.catsByBreed);
    const showMore = useSelector((state: any)=>state?.cat?.showMore);

    const [selectedBreed, setSelectedBreed] = useState<Breed>();
    const [currentPage, setCurrentPage] = useState<number>(1);

    const changeBreed = useCallback(({id, name}: Breed)=>{
        setCurrentPage(1);
        setSelectedBreed({id, name});
        dispatch({ type: GET_CATS_BY_BREED.REQUEST, payload: {page: 1, limit: PAGE_LIMIT, id} });
    }, [setCurrentPage, setSelectedBreed, dispatch]);

    useEffect(()=>{
        dispatch({ type: GET_BREEDS.REQUEST });
    },[]);

    useEffect(()=>{
        const id = query.get("breed");
        const name = query.get("name");
        if(id !== null && id !== selectedBreed?.id)
            changeBreed({id, name})
    }, [query, changeBreed, selectedBreed]);

    const incrementPage = useCallback(()=>{
        const newPage = currentPage + 1;
        setCurrentPage(newPage);
        dispatch({ type: GET_CATS_BY_BREED.REQUEST, payload: {page: newPage, limit: PAGE_LIMIT, id: selectedBreed?.id} });
    }, [currentPage, setCurrentPage, selectedBreed, dispatch]);

    const onCardItemClick = useCallback((id: string)=>{
        history.push(`/detail/${id}`);
    },[history]);

    const breedsSelector = useMemo(()=>{
        if(getBreedStatus !== "success")
            return <Spinner animation="grow" variant="secondary" />;
        return <DropdownButton id="dropdown-variants-secondary" title={selectedBreed?.name ?? "Select breed"} key={"Secondary"} variant={"secondary"}>
            {breeds.map(({id, name}:Breed)=>(<Dropdown.Item key={id} href={`/?breed=${id}&name=${name}`}>{name}</Dropdown.Item>))}
        </DropdownButton>;
    }, [getBreedStatus, selectedBreed]);

    const catList = useMemo(()=>{
        if(getCatListStatus === "loading" && currentPage === 1)
            return <MyLoader />;
        return <CardList items={catsByBreed} onItemClick={onCardItemClick}/>;
    }, [catsByBreed, getCatListStatus, currentPage]);

    const moreButton = useMemo(()=>{
        if(showMore && getCatListStatus !== "loading") {
            return <Container className={`${styles.moreButtonContainer} ${styles.center}`}>
                <Button variant="secondary" size="lg" block onClick={incrementPage}>Load More...</Button>
            </Container>;
        }else if(showMore && getCatListStatus === "loading" && currentPage > 1){
            return <Container className={`mb-4 ${styles.center}`}>
                <MyLoader />
            </Container>;
        }
        return <></>;
    }, [showMore, getCatListStatus, incrementPage, currentPage]);

    return <>
        <Jumbotron className={styles.container} fluid>
            <Container className={`d-flex ${styles.center} flex-column`}>
                <h1>Welcome! I'm a Cat Browser</h1>
                {breedsSelector}
            </Container>
        </Jumbotron>
        <Container className={`mb-4 ${styles.center}`}>
            {catList}
        </Container>
        {moreButton}
    </>
}

export default Home;
