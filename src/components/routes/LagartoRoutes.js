import {useState} from "react";
import {options} from "../constants/Options";
import {useChoices} from "../../utils/Choices";

export const LagartoRoutes = () => {
    let [winner, setWinner] = useState("");
    let [userChoiceName, setUserChoiceName] = useState();
    let [computerChoiceName, setComputerChoiceName] = useState();
    let [time, setTime] = useState("");
    const checkWinner = () => {
        let current = new Date().toISOString();
        setTime(current)

        setUserChoiceName(options[userChoice].name);

        setComputerChoiceName(options[computerChoice].name);

        if (result === 1) setWinner("Anonymous");
        else if (result === 2) setWinner("CPU");
        else if (result === 0) setWinner("Tie");

        apicall();
    }
    const requestOptions = {

        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            "name": "Antonio",
            "userChoice": userChoiceName,
            "computerChoice": computerChoiceName,
            "winner": winner,
            "date": time

        })
    };
    const apicall = () => {
        console.log(userChoiceName)
        console.log(computerChoiceName)
        fetch('/api/Spock', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                // check for error response
                if (!response.ok) {
                // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                reset();

            })
            .catch(error => {

                console.error('There was an error!', error);
            });
    }
}
