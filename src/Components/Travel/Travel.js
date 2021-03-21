import React from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router';

export const Travel = (props) => {
    const { name, img } = props.rider;
    const history = useHistory();
    const handleBook = (name) => {
        history.push(`/destination/${name}`);
    }
    return (
        <div>
            <Card style={{ width: '14rem' }}>
                <Card.Img style={{ cursor: 'pointer' }} onClick={() => handleBook(name)} variant="top" src={img} />
                <Card.Body>
                    <Card.Title style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => handleBook(name)}>{name}</Card.Title>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Travel;