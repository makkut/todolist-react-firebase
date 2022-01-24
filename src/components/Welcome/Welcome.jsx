import React, { useState, useEffect } from 'react';
import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import s from './Welcome.module.css';

const Welcome = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistring, setIsRegistring] = useState(false);
    const [registerInformation, setRegisterInformation] = useState({
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                navigate('/homepage');
            }
        });
    }, []);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate('/homepage');
            })
            .catch((err) => alert(err.message));
    };

    const handleRegister = () => {
        if (registerInformation.email !== registerInformation.confirmEmail) {
            alert('please confirm that email are the same');
            return;
        } else if (
            registerInformation.password !== registerInformation.confirmPassword
        ) {
            alert('please confirm that password are the same');
            return;
        }
        createUserWithEmailAndPassword(
            auth,
            registerInformation.email,
            registerInformation.password
        )
            .then(() => {
                navigate('/homepage');
            })
            .catch((err) => alert(err.message));
    };

    return (
        <div className={s.container}>
            <h1>Todo list</h1>
            <div>
                {isRegistring ? (
                    <>
                        <div class='row'>
                            <div class='input-field col s6'>
                                <input
                                    type='email'
                                    placeholder='email'
                                    value={registerInformation.email}
                                    onChange={(e) =>
                                        setRegisterInformation({
                                            ...registerInformation,
                                            email: e.target.value,
                                        })
                                    }
                                />
                                <input
                                    type='email'
                                    placeholder='Confirm email'
                                    value={registerInformation.confirmEmail}
                                    onChange={(e) =>
                                        setRegisterInformation({
                                            ...registerInformation,
                                            confirmEmail: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <div class='input-field col s6'>
                                <input
                                    type='password'
                                    placeholder='password'
                                    value={registerInformation.password}
                                    onChange={(e) =>
                                        setRegisterInformation({
                                            ...registerInformation,
                                            password: e.target.value,
                                        })
                                    }
                                />
                                <input
                                    type='password'
                                    placeholder='Confirm password'
                                    value={registerInformation.confirmPassword}
                                    onChange={(e) =>
                                        setRegisterInformation({
                                            ...registerInformation,
                                            confirmPassword: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className={s.buttonGroup}>
                            <div
                                className='waves-effect waves-light btn'
                                onClick={handleRegister}
                            >
                                Register
                            </div>
                            <div
                                className='waves-effect waves-light btn'
                                onClick={() => setIsRegistring(false)}
                            >
                                Go back
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div class='row'>
                            <input
                                className='validate'
                                type='email'
                                onChange={handleEmailChange}
                                value={email}
                                placeholder='email'
                            />

                            <input
                                className='validate'
                                type='password'
                                onChange={handlePasswordChange}
                                value={password}
                                placeholder='password'
                            />
                        </div>
                        <div className={s.buttonGroup}>
                            <div
                                className='waves-effect waves-light btn'
                                onClick={handleSignIn}
                            >
                                Sign In
                            </div>
                            <div
                                className='waves-effect waves-light btn'
                                onClick={() => setIsRegistring(true)}
                            >
                                Create an account
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Welcome;
