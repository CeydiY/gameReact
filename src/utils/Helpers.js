import {options} from "../components/constants/Options";

export const GetResult = (userChoice, computerChoice) => {
    if (userChoice === computerChoice) {
        return 0;
    }

    if (options[userChoice].beats.includes(computerChoice)) {
        return 1;
    }

    return 2;
};