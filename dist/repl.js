export function cleanInput(input) {
    return input.trim().toLowerCase().split(" ").filter(word => word !== "");
}
import { createInterface } from 'node:readline';
export function startREPL() {
    console.log("Pokédex REPL started! Type 'exit' to quit.");
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'Pokedex > ',
    });
    rl.prompt();
    rl.on('line', (input) => {
        const cleanedInput = cleanInput(input);
        if (input === "exit") {
            rl.close();
            return;
        }
        if (input === null) {
            rl.prompt();
            return;
        }
        else {
            console.log(`Your command was: ${cleanedInput[0]}`);
        }
    });
}
// const { stdin, stdout } = require('node:process');
// stdin.pipe(stdout);
