import React, { useEffect, useState } from 'react';
import { apiServices } from './api';
import './Home.css';

const Home = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        apiServices.hello()
            .then(response => {
                setMessage(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
    console.log(message);
    return (
        <div className="home">
            <h1>Welcome to the Home Page</h1>
            <p>This is a simple home page.</p>
            <p>API Response: <span> {message} </span></p>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <p>Bouchra w sou9ra6 ch6ari 🙃</p>
            
        </div>
    );
}

export default Home;
