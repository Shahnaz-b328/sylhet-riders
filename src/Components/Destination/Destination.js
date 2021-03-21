import React, { useContext, useState } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../../App';
import './Destination.css';
const Destination = () => {
    const { name } = useParams();
    const [search, setSearch] = useState();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const handleChange = (event) => {
        let isField = true;
        if (event.target.name === 'from') {
            isField = (event.target.value);
            console.log(isField);
        }
        if (event.target.name === 'to') {
            isField = (event.target.value);
            console.log(isField);
        }
        if (isField) {
            const ridersInfo = setSearch;
            ridersInfo[event.target.name] = event.target.value;
            setSearch(ridersInfo);
            console.log(ridersInfo);
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();
    }
    return (
        <div>
            <h1 style={{ color: 'navy' }}>{name}</h1>
            <p style={{ color: 'navy', textAlign: 'center' }}>Welcome, {loggedInUser.displayName}</p>
            <div className="form-design">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="">Pic From</label>
                    <input onChange={handleChange} type="text" className="form-control" name="from" />
                    <label htmlFor="">Pic To</label>
                    <input onChange={handleChange} type="text" className="form-control" name="to" />
                    <input type="submit" value="search" />
                </form>
            </div>

        </div>
    );
};

export default Destination;