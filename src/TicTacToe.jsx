import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [timer, setTimer] = useState(5);
    const winner = calculateWinner(board);

    useEffect(() => {
        if (winner) return;
        const countdown = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 5));
        }, 1000);
        return () => clearInterval(countdown);
    }, [isXNext, winner]);

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
    };

    return (
        <div className={`flex flex-col items-center p-6 ${winner ? 'bg-blue-500 min-h-screen flex justify-center items-center' : ''}`}>
            {winner ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white text-4xl font-bold text-center">
                    🎉 {winner} Wins!
                </motion.div>
            ) : (
                <>
                    <h1 className="text-2xl font-bold mb-4">Tic-Tac-Toe</h1>
                    <div className="text-lg mb-2">Time Left: {timer}s</div>
                    <div className="grid grid-cols-3 gap-2">
                        {board.map((cell, index) => (
                            <motion.div
                                key={index}
                                whileTap={{ scale: 0.9 }}
                                className="w-20 h-20 bg-pink-200 flex items-center justify-center text-4xl rounded-2xl shadow-md cursor-pointer"
                                onClick={() => handleClick(index)}
                            >
                                {cell}
                            </motion.div>
                        ))}
                    </div>
                    <div className="mt-4">
                        <p className="text-lg">Next Turn: {isXNext ? "🐱" : "🦝"}</p>
                    </div>
                    <button onClick={resetGame} className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-pink-600">
                        Reset Game
                    </button>
                </>
            )}
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
