import React, {FC} from "react";
import {Card, Container} from "react-bootstrap";
import styles from "../Home/index.module.css";

interface Props {

}

const Details : FC<Props> = ({}) => {
    return <>
        <Container className={`mb-4 ${styles.center}`}>
            <Card>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk
                        of the card's content.
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    </>
}

export default Details;
