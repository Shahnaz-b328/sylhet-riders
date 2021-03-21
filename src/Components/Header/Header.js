import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css';
const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (

        <div className="header">
            <nav className="nav">
                <ul>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/destination">Destination</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <button onClick={() => setLoggedInUser({})}>Sign Out</button>
                </ul>
            </nav>
        </div>
    );
};

export default Header;