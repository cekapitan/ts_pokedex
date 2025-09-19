export function getCommands() {
    return {
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
        // can add more commands here
    };
}
