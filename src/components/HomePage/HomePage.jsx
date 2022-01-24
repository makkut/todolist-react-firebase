import React, { useEffect, useRef } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { useNavigate, useResolvedPath } from 'react-router-dom';
import { useState } from 'react/cjs/react.development';
import { uid } from 'uid';
import { set, ref, onValue, remove, update } from 'firebase/database';
import s from './HomePage.module.css';

const HomePage = () => {
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [tempUidd, setTempUidd] = useState('');
    const navigate = useNavigate();
    const inputField = useRef(null);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
                    setTodos([]);
                    const data = snapshot.val();
                    if (data !== null) {
                        Object.values(data).map((todo) => {
                            setTodos((oldArray) => [...oldArray, todo]);
                        });
                    }
                });
            } else if (!user) {
                navigate('/');
            }
        });
    }, []);

    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                navigate('/');
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    const writeDatabase = () => {
        if (inputField.current.value !== '') {
            const uidd = uid();
            set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
                todo: todo,
                uidd: uidd,
                isComplete: false,
            });

            setTodo('');
        } else {
            alert('enter task text');
            return;
        }
    };

    const handleUpdate = (todo) => {
        setIsEdit(true);
        setTodo(todo.todo);
        setTempUidd(todo.uidd);
        console.log(todo);
    };

    const handleDelete = (uid) => {
        remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
    };

    const handleEditConfirm = () => {
        update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
            todo: todo,
            tempUidd: tempUidd,
        });
        setTodo('');
        setIsEdit(false);
    };

    const handleComplete = (todo) => {
        let isCompleteNew = !todo.isComplete;
        update(ref(db, `/${auth.currentUser.uid}/${todo.uidd}/`), {
            isComplete: isCompleteNew,
        });
    };

    return (
        <div className={`${s.container} `}>
            <h2>Tasks</h2>
            <div className={s.inputGroup}>
                <input
                    type='text'
                    placeholder='Add Todo...'
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    ref={inputField}
                    className={s.inputTask}
                />
                {isEdit ? (
                    <div
                        className={s.addConfirmButton}
                        onClick={handleEditConfirm}
                        className='waves-effect waves-light btn'
                    >
                        confirm
                    </div>
                ) : (
                    <div
                        className={s.addConfirmButton}
                        onClick={writeDatabase}
                        className='waves-effect waves-light btn'
                    >
                        Add
                    </div>
                )}
            </div>
            {todos.map((todo, uidd) => (
                <div key={uidd} className={s.task}>
                    {todo.isComplete ? (
                        <a className={`btn-floating btn-small ${s.taskCheck}`}>
                            <i
                                class='small material-icons'
                                onClick={() => handleComplete(todo)}
                            >
                                check
                            </i>
                        </a>
                    ) : (
                        <a className={`btn-floating btn-small ${s.taskCheck}`}>
                            <i
                                class='small material-icons'
                                onClick={() => handleComplete(todo)}
                            >
                                check_box_outline_blank
                            </i>
                        </a>
                    )}
                    <h5>{todo.todo}</h5>
                    <div className={s.taskButtons}>
                        <div onClick={() => handleUpdate(todo)}>
                            <a
                                className='btn-floating btn-small'
                                style={{ marginRight: '5px' }}
                            >
                                <i className='material-icons'>edit</i>
                            </a>
                        </div>
                        <div onClick={() => handleDelete(todo.uidd)}>
                            <a className='btn-floating btn-small '>
                                <i className='material-icons'>close</i>
                            </a>
                        </div>
                    </div>
                </div>
            ))}
            <div
                onClick={handleSignOut}
                className={`waves-effect waves-light btn ${s.buttonOut}`}
            >
                signout
            </div>
        </div>
    );
};

export default HomePage;
