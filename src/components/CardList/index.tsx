import React, {FC, useEffect} from "react";
import {Button, Card, Col, Row} from "react-bootstrap";
import styles from './index.module.css';

interface Props {
    items: [],
    onItemClick: (id: string) => void
}

const CardList : FC<Props> = ({items, onItemClick}) => {
    return <>
        <Row xs={1} md={3} lg={4}>
            {items?.map((item: any, index: number)=>(<Col key={`item${index}`}>
                <Card className={styles.card}>
                    <Card.Img variant="top" src={item?.url} className={styles.img}/>
                    <Card.Footer>
                        <Button variant="outline-dark" size="sm" block onClick={()=>{
                            onItemClick(item?.id);
                        }}>
                            View Details
                        </Button>
                    </Card.Footer>
                </Card>
            </Col>))}
        </Row>
    </>
}

export default CardList;
