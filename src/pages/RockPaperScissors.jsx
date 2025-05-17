import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./RockPapaerScissor.css"
import cry from "./cry.png";
import normal from "./normal.png";
import angry from "./angry.png";
import worried from "./worried.png";
import sad from "./sad.png";
import celebrate from "./celebrate.png";
import { FaRegHandPaper, FaRegHandRock, FaRegHandScissors } from "react-icons/fa";
import { s } from "framer-motion/client";

const robotEmotions = {
    "Waiting": [{ emote: normal, text: "Hmmmmm..." }],
    "It's a draw!": [{ emote: normal, text: "Hmm... It's a draw!" }],
    "Computer wins!": [{ emote: celebrate, text: "Yay! I won!" }, { emote: normal, text: "Yay! I won!, One more time?" }],
    "You win!": [{ emote: cry, text: "Oh no! You won!" }, { emote: angry, text: "Come on! One more time!" }, { emote: sad, text: "Ahhhhhhh! One more time!!!!" }, { emote: worried, text: "Let's try again!" }],
}

const choices = [
    { name: "Rock", icon: <FaRegHandRock /> },
    { name: "Paper", icon: <FaRegHandPaper /> },
    { name: "Scissors", icon: <FaRegHandScissors /> },
];

const getResult = (player, computer) => {
    if (player === computer) return "It's a draw!";
    if (
        (player === "Rock" && computer === "Scissors") ||
        (player === "Paper" && computer === "Rock") ||
        (player === "Scissors" && computer === "Paper")
    ) {
        return "You win!";
    }
    return "Computer wins!";
};

export default function RockPaperScissors() {
    document.title = "Rock Paper Scissors";
    const handSigns = [<FaRegHandRock />, <FaRegHandPaper style={{ rotate: '180deg' }} />, <FaRegHandScissors />];
    const [playerChoice, setPlayerChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [result, setResult] = useState("");
    const [robotAction, setRobotAction] = useState(normal);
    const [robotText, setRobotText] = useState("Hi There! I am your robot friend. Let's play Rock Paper Scissors!");
    const [shuffle, setshuffle] = useState(false);
    const [shuffleIcon, setshuffleIcon] = useState(null);

    useEffect(() => {
        if (result === "Start") {
            setshuffle(true);
            let randomIndex = Math.floor(Math.random() * robotEmotions["Waiting"].length);
            const { emote, text } = robotEmotions["Waiting"][randomIndex];
            setRobotAction(emote);
            setRobotText(text);
        }
        if (result === "It's a draw!") {
            let randomIndex = Math.floor(Math.random() * robotEmotions["It's a draw!"].length);
            const { emote, text } = robotEmotions["It's a draw!"][randomIndex];
            setRobotAction(emote);
            setRobotText(text);
        }
        if (result === "You win!") {
            let randomIndex = Math.floor(Math.random() * robotEmotions["You win!"].length);
            const { emote, text } = robotEmotions["You win!"][randomIndex];
            setRobotAction(emote);
            setRobotText(text);
        }
        if (result === "Computer wins!") {
            let randomIndex = Math.floor(Math.random() * robotEmotions["Computer wins!"].length);
            const { emote, text } = robotEmotions["Computer wins!"][randomIndex];
            setRobotAction(emote);
            setRobotText(text);
        }
    }, [result])

    const handleChoice = (choice) => {
        if (shuffle) return;
        setResult("Start");
        setPlayerChoice(choice);
        let timeoutinterval = setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * choices.length);
            const computer = choices[randomIndex];
            setComputerChoice(computer);
            const gameResult = getResult(choice.name, computer.name);
            setshuffle(false);
            setResult(gameResult);
        }, 2000);

        return () => {
            clearTimeout(timeoutinterval);
        };
    };

    useEffect(() => {
        setInterval(() => {
            setshuffleIcon(handSigns[0]);
        }, 100);
        setInterval(() => {
            setshuffleIcon(handSigns[1]);
        }, 200);
        setInterval(() => {
            setshuffleIcon(handSigns[2]);
        }, 300);
    }, []);

    return (
        <div className="main-window">
            <h1>WELCOME</h1>
            <h1>Rock Paper Scissors Game</h1>
            <div className="outcome">
                <div className="cumputerChoice">
                    <img
                        src={robotAction}
                        alt="Robot"
                        className={`robot ${result === "Computer wins!" ? "celebrate" : ""}`}
                        style={{ width: "8vw", height: "8vw" }}
                    />

                    <div className={`robotText ${result === "Computer wins!" ? "celebrate" : ""}`}>
                        {robotText}
                    </div>
                </div>
                <div className="outcome-computer">
                    {computerChoice && !shuffle ? computerChoice.icon : (
                        shuffleIcon
                    )}
                </div>
                <div style={{ height: '100%', width: ".1vw", backgroundColor: '#e0f2f7' }}></div>
                <div className="outcome-player">
                    {playerChoice ? playerChoice.icon : (
                        shuffleIcon
                    )}
                </div>
                <div className="playerChoice">
                    {choices.map((choice) => (
                        <div className="choices-icons" key={choice.name} onClick={() => handleChoice(choice)}>
                            {choice.icon}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
