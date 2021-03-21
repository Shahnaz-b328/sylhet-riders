import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { UserContext } from '../../App';
import './Login.css';
import { handleGoogleSignIn, initializeLogin, createUserWithEmailAndPassword, signInWithEmailAndPassword, handleSignOut } from './loginManage';

const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: ''
    });

    initializeLogin();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };


    const GoogleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, true)
                console.log(res);
            })
    }

    const signOut = () => {
        handleSignOut()
            .then(res => {
                handleResponse(res, false);
            })
    }

    const handleBlur = (event) => {
        let isFieldValid = true;
        if (event.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (event.target.name === 'password') {
            const isPasswordValid = event.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(event.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (event.target.name === 'password2') {
            const isPasswordValid = event.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(event.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }

        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
            console.log(newUserInfo);
        }
    }

    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        if (redirect) {
            history.replace(from);
        }
        console.log(res);
    }

    const handleSubmit = (event) => {
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    handleResponse(res, true)
                })
        }
        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }
        event.preventDefault();
    }

    return (
        <div>
            <div className="container">
                {newUser ? <h3 style={{ textAlign: 'center', color: 'lightcoral' }}>Create Account</h3>
                    : <h3 style={{ textAlign: 'center', color: 'lightcoral' }}>Login</h3>
                }

                <form onSubmit={handleSubmit}>
                    {newUser && <input type="text" onBlur={handleBlur} name="name" className="form-control" placeholder="Name" />}

                    <input type="text" onBlur={handleBlur} name="email" className="form-control" placeholder="Email" required />
                    <input type="password" onBlur={handleBlur} name="password" className="form-control" placeholder="Password" required />
                    {newUser && <input type="password" onBlur={handleBlur} name="password2" className="form-control" placeholder="Confirm Password" required />}

                    <div style={{ textAlign: 'center' }}>
                        <input type="submit" value={newUser ? 'Create an account' : 'Login'} an account />
                    </div>
                </form>

                <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} />
                <label htmlFor="newUser">Create a new account</label>
                <p style={{ color: 'red' }}>{loggedInUser.error}</p>
            </div>

            <div className="button-center">
                {user.isSignedIn ? <button onClick={signOut}>Sign Out</button>
                    : <button className="google-button" onClick={GoogleSignIn}><FontAwesomeIcon icon={faGoogle} />Continue Google</button>}
            </div>
        </div>
    );
};

export default Login;