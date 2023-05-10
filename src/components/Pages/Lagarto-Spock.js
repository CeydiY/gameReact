import {options} from "../constants/Options";
import {useChoices} from "../../utils/Choices";
import {OptionButton} from "../../utils/Buttons";
import '../../css/lagarto.css';
import {useEffect, useState} from "react";
import {Records} from "./Records";

export const LagartoSpock = () => {
    const {
        userChoice,
        computerChoice,
        userMessage,
        computerMessage,
        result,
        disabled,
        handlePlay,
        reset,
    } = useChoices();

    let [winner, setWinner] = useState("");
    let [time, setTime] = useState("");
    let [player, setPlayer] = useState("")
    let current = new Date().toISOString().slice(0,10);


    useEffect(() => {
        setTime(current);
    }, [current])

    useEffect(() => {
        if (result === 0) setWinner("Empate");
        else if (result === 2) setWinner("Ganó la computadora");
        else if (result === 1) setWinner("Ganó el jugador");

    }, [result])

    const checkWinner = () => {
        if (result === 0) setWinner("Empate");
        else if (result === 2) setWinner("Ganó la computadora");
        else if (result === 1) setWinner("Ganó el jugador");

        callToApi();
    }
    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "nombreJugador": "Luis",
            "fechaHoraPartida": time,
            "resultadoPartida": winner,
        })
    };
    const callToApi = () => {
        fetch('/api/lagarto/lagarto', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                else if(response.ok){
                    setTime(null);
                    setWinner(null)
                    reset();
                }

            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
    Records();
    return (
        <div className="flex items-center justify-center h-screen back">
            <div className="rounded-xl p-4 bg-cyan-700">
                <h1 className="text-4xl mb-4 text-center font-bold">¡A jugar!</h1>
                <div className="max-w-md mx-auto">
                    {options.map((option) => (
                        <OptionButton
                            key={option.id}
                            option={option}
                            handlePlay={handlePlay}
                            disabled={disabled}
                        />
                    ))}
                    {userChoice !== null && <p className="text-xl mt-4">{userMessage}</p>}
                    {computerChoice !== null && (
                        <p className="text-xl mt-4">{computerMessage}</p>
                    )}
                    {result !== null && (
                        <div className="mt-8">
                            {result === 0 && <p className="text-xl mt-4">🤷🏽‍♀️ Empate</p>}
                            {result === 1 && (
                                <p className="text-xl mt-4">
                                    🏆 Has ganado con {options[userChoice]?.name} contra{" "}
                                    {options[computerChoice]?.name}
                                </p>
                            )}
                            {result === 2 && (
                                <p className="text-xl mt-4">
                                    💥 Has perdido con {options[userChoice]?.name} contra{" "}
                                    {options[computerChoice]?.name}
                                </p>
                            )}
                            <button
                                className="bg-yellow-500 hover:bg-yellow-700 text-black font-semibold py-2 px-4 mt-4 border-b-4 border-yellow-700"
                                onClick={checkWinner}
                            >
                                Jugar de nuevo
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}