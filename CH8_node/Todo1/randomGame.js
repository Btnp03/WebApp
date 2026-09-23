const waitAndRandom = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const num = Math.floor(Math.random() * 10);
            resolve(num);
        }, 2000);
    });
};

const playGame = async () => {
    for (let i = 1; i <= 3; i++) {
        console.log("Wait 2 second …");
        const num = await waitAndRandom();
        console.log(`Num ${i} :  ${num}`);
        
        if (num % 2 !== 0) {
            console.log("You lost");
            return; 
        }
    }
    console.log("You win");
};

playGame();