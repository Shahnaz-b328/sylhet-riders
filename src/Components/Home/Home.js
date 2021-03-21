import React, { useEffect, useState } from 'react';
import data from '../../data/data';
import Travel from '../Travel/Travel';
import './Home.css';
const Home = () => {
    const [riders, setRiders] = useState([]);
    useEffect(() => {
        setRiders(data);
    }, [])
    return (
        <div className="background-color">
            <div className="title">
                <h3>Sylhet Riders</h3>
            </div>
            <div className="background-design">
                {
                    riders.map(rider => <Travel key={rider.id} rider={rider}></Travel>)
                }
            </div>
        </div>
    );
};

export default Home;