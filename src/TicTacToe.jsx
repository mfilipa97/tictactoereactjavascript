import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [timer, setTimer] = useState(5);
    const [gameStarted, setGameStarted] = useState(false);
    const winner = calculateWinner(board);

    useEffect(() => {
        if (winner || !gameStarted) return;
        const countdown = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 5));
        }, 1000);
        return () => clearInterval(countdown);
    }, [isXNext, winner, gameStarted]);

    useEffect(() => {
        if (timer === 0 && !winner) {
            setIsXNext(!isXNext);
            setTimer(5);
        }
    }, [timer, isXNext, winner]);

    const handleClick = (index) => {
        if (board[index] || winner) return;
        const newBoard = [...board];
        newBoard[index] = isXNext ? "🐱" : "🦝";
        setBoard(newBoard);
        setIsXNext(!isXNext);
        setTimer(5);
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setTimer(5);
        setGameStarted(false);
    };

    if (!gameStarted) {
        return (
            <div className="min-h-screen bg-gradient-to-r from-pink-200 via-purple-300 to-blue-200 flex flex-col items-center justify-center p-6 text-center">
                <motion.h1
                    className="text-5xl font-bold mb-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                    🐾 Tic-Tac-Toe 🎉
                </motion.h1>
                <p className="text-lg mb-6 max-w-md">
                    Welcome to the cutest Tic-Tac-Toe game! 🐱 vs 🦝
                    <br />
                    Take turns placing your emoji on the board. You have 5 seconds to make a move, or your turn will be skipped!
                </p>
                <button
                    onClick={() => setGameStarted(true)}
                    className="bg-purple-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-600 transition"
                >
                    Start Game
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-pink-200 via-purple-300 to-blue-200 flex flex-col items-center justify-center p-6">
            {winner ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-white text-4xl font-bold text-center mb-8"
                >
                    🎉 {winner} Wins!
                </motion.div>
            ) : (
                <>
                    <motion.h1
                        className="text-4xl font-bold mb-10 text-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    >
                        🐾 Tic-Tac-Toe 🎉
                    </motion.h1>

                    <div className="text-lg mb-4">
                        ⏳ <span className="font-bold">Time Left: </span>
                        <span className={`text-2xl font-bold ${timer <= 3 ? "text-red-500 shake" : "text-blue-500"}`}>{timer}s</span> 🚨
                    </div>

                    <div className="mt-4">
                        <p className="text-lg">
                            <span className="font-bold">It's </span>
                            <span className="text-purple-500 text-2xl font-bold">
                                {isXNext ? "🐱 Kitty's" : "🦝 Raccoon's"}
                            </span>
                            <span className="font-bold"> turn!</span>
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-6">
                        {board.map((cell, index) => (
                            <motion.div
                                key={index}
                                whileTap={{ scale: 0.9 }}
                                className="w-28 h-28 bg-pink-300 flex items-center justify-center text-5xl rounded-2xl shadow-md hover:bg-pink-400 transition cursor-pointer"
                                onClick={() => handleClick(index)}
                            >
                                {cell}
                            </motion.div>
                        ))}
                    </div>
                </>
            )}

            <button
                onClick={resetGame}
                className="mt-8 bg-purple-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-600 transition"
            >
                Reset Game
            </button>
        </div>
    );
};

const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let [a, b, c] of lines) {
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
};

export default TicTacToe;
