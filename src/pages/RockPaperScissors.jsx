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

export default function RockPaperScissors() {

    const handSigns = [<FaRegHandRock />, <FaRegHandPaper />, <FaRegHandScissors />];
    const [playerChoice, setPlayerChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [result, setResult] = useState("");
    const [robotAction, setRobotAction] = useState(normal);
    const [robotText, setRobotText] = useState("Hi There! I am your robot friend. Let's play Rock Paper Scissors!");
    const [shuffleIcon, setshuffleIcon] = useState(null);
    const [gameStart, setGameStart] = useState(false);
    const [gameStartText, setGameStartText] = useState("");

    const robotEmotions = {
        "Waiting": [{ emote: normal, text: "Hmmmmm..." }, { emote: normal, text: "Let me show you how it's done!" }, { emote: normal, text: "I will beat you!" }],
        "It's a draw!": [{ emote: normal, text: "Hmm... It's a draw!" }, { emote: normal, text: "Let's try again!" }],
        "Computer wins!": [{ emote: celebrate, text: "Yay! I won!" }, { emote: normal, text: "Yay! I won!, One more time?" }, { emote: celebrate, text: "Better luck next time" }],
        "You win!": [{ emote: cry, text: "Oh no! You won!" }, { emote: cry, text: "This doesn't count! One more time!" }, { emote: angry, text: "Come on! One more time!" }, { emote: sad, text: "Shoot! One more time!!!!" }, { emote: worried, text: "Let's try again!" }],
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

    useEffect(() => {
        if (result === "Start") {
            setGameStart(true);
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
        if (gameStart) return;
        setResult("Start");
        setPlayerChoice(choice);
        setTimeout(() => {
            setGameStartText("Rock");
        }, 0);
        setTimeout(() => {
            setGameStartText("Paper");
        }, 1000);
        setTimeout(() => {
            setGameStartText("Scissors");
        }, 2000);
        setTimeout(() => {
            setGameStartText("Shoot!");
        }, 3000);

        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * choices.length);
            const computer = choices[randomIndex];
            setComputerChoice(computer);
            const gameResult = getResult(choice.name, computer.name);
            setGameStart(false);
            setResult(gameResult);
        }, 3000);

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
                    {computerChoice && !gameStart ? computerChoice.icon : (
                        shuffleIcon
                    )}
                </div>
                <div style={{ height: '100%', width: ".1vw", backgroundColor: '#e0f2f7' }}></div>
                <div className="outcome-player">
                    {playerChoice && !gameStart ? playerChoice.icon : (
                        shuffleIcon
                    )}
                </div>
                <div className="playerChoice">
                    Choose
                    {choices.map((choice) => (
                        <div className="choices-icons" key={choice.name} onClick={() => handleChoice(choice)}>
                            {choice.icon}
                        </div>
                    ))}
                </div>
            </div>
            <div className="big-text">
                {gameStartText}
            </div>
        </div>
    );
}
