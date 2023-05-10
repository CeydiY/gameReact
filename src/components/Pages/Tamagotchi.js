import React, {useEffect, useState} from "react";
import {getBarColor} from "../accions/accions";
import '../../css/tamagotchi.css';

export const Tamagotchi = () => {
    const [name, setName] = useState('Tamagotchi Ceydi');
    const [age, setAge] = useState(0);
    const [health, setHealth] = useState(100);
    const [happiness, setHappiness] = useState(100);
    const [hunger, setHunger] = useState(100);

    useEffect(() =>{
        const interval = setInterval(() => {
            setAge(age => age + 1);
            setHunger(hunger => Math.max(0, hunger - 5));
            setHealth(health => Math.max(0, health - 5));
            setHappiness(happiness => Math.max(0, happiness - 5));
        }, 3000)
        return () => clearInterval(interval);
    }, []);

    const feed = () => {
        setHunger(hunger => Math.min(100, hunger + 20));
        setHealth(health => Math.min(100, health + 5));
        setHappiness(happiness => Math.min(100, happiness + 5));
    };
    const sleep = () => {
        setHunger(hunger => Math.max(0, hunger - 5));
        setHappiness(happiness => Math.max(0,happiness - 5));
        setHealth(health => Math.min(100, health + 10));
    }
    const play = () => {
        setHunger(hunger => Math.min(100, hunger + 20));
        setHealth(health => Math.max(0, health - 5));
        setHappiness(happiness => Math.min(100, happiness + 5));
    };

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "nombreMascota": "Luis",
            "nivelHambre": hunger,
            "nivelEnergia": health,
            "nivelFelicidad": happiness,
            "fechaNacimiento": age,
        })
    };
    
    return(
        <div>
            <h1 className="name">{name}</h1>
            <p><strong>Age: {age}</strong></p>
            <p className="states">Hunger: <div className="progress-bar" style={{width: `${hunger}%`, backgroundColor: getBarColor(hunger)}}>
                {hunger}
            </div></p>
            <p className="states">Health: <div className="progress-bar" style={{width: `${health}%`, backgroundColor: getBarColor(health)}}>
                {health}
            </div></p>
            <p className="states">Happiness: <div className="progress-bar" style={{width: `${happiness}%`, backgroundColor: getBarColor(happiness)}}>
                {happiness}
            </div></p>
            {health === 0 || happiness === 0 ? (
                <p>Your Tamagotchi has died.</p>

            ) : (
                <>
                    <button onClick={feed}>Feed</button>
                    <button onClick={play}>Play</button>
                    <button onClick={sleep}>Sleep</button>
                </>
            )}
        </div>
    );
};
