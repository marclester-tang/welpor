import React, {FC, useEffect, useMemo} from "react";
import {Button, Card, Container} from "react-bootstrap";
import styles from "./index.module.css";
import {useHistory, useParams} from "react-router-dom";
import {GET_CAT_DETAILS} from "../../actions/cat.action";
import {useDispatch, useSelector} from "react-redux";
import ContentLoader from "react-content-loader";

interface UrlParams {
    id: string | undefined
}

const MyLoader = () => (
    <ContentLoader viewBox="0 0 900 500" height={500} width={900}>
        <rect x="3" y="3" rx="10" ry="10" width="900" height="380" />
        <rect x="6" y="400" rx="0" ry="0" width="900" height="20" />
        <rect x="4" y="440" rx="0" ry="0" width="900" height="20" />
        <rect x="4" y="480" rx="0" ry="0" width="900" height="20" />
    </ContentLoader>
)


const Details : FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {id} = useParams<UrlParams>();

    const getCatDetailsStatus = useSelector((state: any)=>state?.cat?.getCatDetailsStatus);
    const catDetails = useSelector((state: any)=>state?.cat?.catDetails);

    useEffect(()=>{
        if(id) {
            dispatch({type: GET_CAT_DETAILS.REQUEST, payload: {id}});
        }
    },[id, dispatch]);

    const detailsCard = useMemo(()=>{
        if(getCatDetailsStatus === 'loading') {
            return <MyLoader/>;
        }else if(catDetails){
            return <Card>
                <Card.Header>
                    <Button variant="outline-dark" size="sm" onClick={()=>{
                        history.goBack();
                    }}>
                        GO Back
                    </Button>
                </Card.Header>
                <Card.Img variant="top"  className={styles.img} src={catDetails?.url} />
                <Card.Body>
                    <h3>
                        {catDetails?.breeds[0]?.name}
                    </h3>
                    <h5>Origin: {catDetails?.breeds[0]?.origin}</h5>
                    <Card.Title>{catDetails?.breeds[0]?.temperament}</Card.Title>
                    <Card.Text>
                        {catDetails?.breeds[0]?.description}
                    </Card.Text>
                </Card.Body>
            </Card>;
        }
    }, [catDetails, getCatDetailsStatus, history]);

    return <>
        <Container className={`py-4 ${styles.center}`}>
            {detailsCard}
        </Container>
    </>
}

export default Details;
