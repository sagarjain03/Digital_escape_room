import { useState } from 'react';

function Reaction() {
    // State variables
    const [isStarted, setIsStarted] = useState(false); 
    const [isTargetVisible, setIsTargetVisible] = useState(false); 
    const [startTime, setStartTime] = useState(0); 
    const [reactionTime, setReactionTime] = useState(0); 
    const [level, setLevel] = useState('easy'); 
    const [score, setScore] = useState(0); // Successful clicks
    const [fails, setFails] = useState(0); // Failed attempts
    const [gameStatus, setGameStatus] = useState(''); // Win or lose status

    
    const levels = {
        easy: { minDelay: 1000, maxDelay: 2000, maxReactionTime: 1000, targetScore: 6, maxFails: 4 },
        medium: { minDelay: 500, maxDelay: 1500, maxReactionTime: 800, targetScore: 8, maxFails: 3 },
        hard: { minDelay: 200, maxDelay: 1000, maxReactionTime: 400, targetScore: 10, maxFails: 2 },
    };

    // Start the game
    const startGame = () => {
        setIsStarted(true);
        setIsTargetVisible(false);
        setGameStatus('');
        const { minDelay, maxDelay } = levels[level];
        // Wait for a random delay before showing the target button
        setTimeout(() => {
            setIsTargetVisible(true);
            setStartTime(Date.now()); 
        }, Math.random() * (maxDelay - minDelay) + minDelay);
    };

    // Handle clicking the target button
    const handleClick = () => {
        if (!isTargetVisible) {
            // User clicked too early
            setFails((prev) => prev + 1);
            if (fails + 1 >= levels[level].maxFails) {
                setGameStatus('lose'); // Lose condition
                setIsStarted(false);
            }
            return;
        }

        // Calculate reaction time
        const timeTaken = Date.now() - startTime;
        setReactionTime(timeTaken);

        // Check if reaction time is within the allowed limit
        if (timeTaken <= levels[level].maxReactionTime) {
            setScore((prev) => prev + 1);
            // Check win condition
            if (score + 1 >= levels[level].targetScore) {
                setGameStatus('win'); // Win condition
                setIsStarted(false);
            } else {
                // Reset for the next round
                setIsTargetVisible(false);
                startGame();
            }
        } else {
            // Reaction time too slow
            setFails((prev) => prev + 1);
            if (fails + 1 >= levels[level].maxFails) {
                setGameStatus('lose'); // Lose condition
                setIsStarted(false);
            } else {
                // Reset for the next round
                setIsTargetVisible(false);
                startGame();
            }
        }
    };

    
    const resetGame = () => {
        setIsStarted(false);
        setIsTargetVisible(false);
        setScore(0);
        setFails(0);
        setReactionTime(0);
        setGameStatus('');
    };

    
    const changeLevel = (newLevel) => {
        setLevel(newLevel);
        resetGame();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-blue-900 text-white p-4">
            <h1 className="text-4xl font-bold mb-4">Reaction Timer ⏱️</h1>

            
            <div className="text-center mb-6">
                <p className="text-lg mb-2">Click the button as fast as you can when it appears!</p>
                <p className="text-sm text-gray-300">
                    Rules:
                    - Reach the target score to win.
                    - Click the button within {levels[level].maxReactionTime}ms to succeed.
                    - Clicking too early or too slow counts as a fail.
                    - Too many fails and you lose!
                </p>
            </div>

            <div className="flex gap-4 mb-6">
                {Object.keys(levels).map((lvl) => (
                    <button
                        key={lvl}
                        onClick={() => changeLevel(lvl)}
                        className={`px-6 py-2 rounded-lg font-semibold transition-all ${level === lvl ? 'bg-blue-600 scale-110 shadow-lg' : 'bg-blue-500 opacity-80 hover:opacity-100'
                            }`}
                    >
                        {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
                    </button>
                ))}
            </div>

            
            {isStarted && (
                <p className="text-lg mb-4">
                    Difficulty: <strong>{level.charAt(0).toUpperCase() + level.slice(1)}</strong>
                </p>
            )}

           
            {gameStatus === 'win' && (
                <p className="text-2xl text-green-400 mb-4 ">You Win! 🎉</p>
            )}
            {gameStatus === 'lose' && (
                <p className="text-2xl text-red-400 mb-4">You Lose! 😢</p>
            )}

            {!isStarted && (
                <button
                    onClick={gameStatus ? resetGame : startGame}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg text-xl hover:bg-blue-600 transition-all transform hover:scale-105"
                >
                    {gameStatus ? 'Play Again' : 'Start Game'}
                </button>
            )}

            {isStarted && !isTargetVisible && (
                <p className="text-xl text-gray-300 mt-4 animate-pulse">Wait for the button to appear...</p>
            )}

            {isTargetVisible && !gameStatus && (
                <button
                    onClick={handleClick}
                    className="bg-blue-600 text-white px-8 py-4 rounded-lg text-2xl mt-4 hover:bg-blue-700 transition-all transform hover:scale-105 absolute"
                    style={{
                        top: `${Math.random() * 80}%`, 
                        left: `${Math.random() * 80}%`, 
                    }}
                >
                    CLICK ME NOW!
                </button>
            )}

            <div className="mt-6 text-xl">
                <p>Score: <strong>{score}</strong></p>
                <p>Fails: <strong>{fails}</strong></p>
                {reactionTime > 0 && (
                    <p>Reaction Time: <strong>{reactionTime}ms</strong></p>
                )}
            </div>
        </div>
    );
}

export default Reaction;