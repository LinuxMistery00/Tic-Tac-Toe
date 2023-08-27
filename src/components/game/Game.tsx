import React, { useState } from 'react';
import styles from './styles.module.css';

export default function Game() {
    const [actualPlayerLetter, setActualPlayerLetter] = useState<"O" | "X">("O");
    const [winnerText, setWinnerText] = useState<string | null>(null);

    const handleWinner = (winner: "O" | "X") => {
        setWinnerText(`Player ${winner} Venceu!`);
    };

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const button = event.target as HTMLButtonElement;
        if (!button.textContent) {
            button.textContent = actualPlayerLetter;
            setActualPlayerLetter(actualPlayerLetter === "O" ? "X" : "O");
            const winner = checkForWin();
            if (winner) {
                handleWinner(winner);
            }
        }
    };

    const checkForWin = (): "O" | "X" | null => {
        const winningCombinations = [
            [1, 2, 3], [4, 5, 6], [7, 8, 9],
            [1, 4, 7], [2, 5, 8], [3, 6, 9],
            [1, 5, 9], [3, 5, 7]
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            const BTN1 = document.getElementById(`GameBTN${a}`);
            const BTN2 = document.getElementById(`GameBTN${b}`);
            const BTN3 = document.getElementById(`GameBTN${c}`);

            if (
                BTN1?.textContent === 'X' &&
                BTN2?.textContent === 'X' &&
                BTN3?.textContent === 'X'
            ) {
                return 'X';
            }

            if (
                BTN1?.textContent === 'O' &&
                BTN2?.textContent === 'O' &&
                BTN3?.textContent === 'O'
            ) {
                return 'O';
            }
        }

        return null;
    };

    const renderButtons = () => {
        const buttons = [];
        for (let i = 1; i <= 9; i++) {
            buttons.push(
                <button
                    key={`GameBTN${i}`}
                    className={styles.GameBTN}
                    id={`GameBTN${i}`}
                    onClick={handleButtonClick}
                ></button>
            );
        }
        return (
            <div className={styles.GameBTNContainer}>
                {buttons}
            </div>
        );
    };

    return (
        <div className={styles.Game}>
            {renderButtons()}
            <div className={styles.WinnerPlayer} id='WinnerPlayer'>
                {winnerText && <h1>{winnerText}</h1>}
            </div>
        </div>
    );
}