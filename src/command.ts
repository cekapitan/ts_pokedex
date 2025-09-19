export type CLICommand = {
    name: string;
    description: string;
    callback: (commands: Record<string, CLICommand>) => void;
  };


  export function getCommands(): Record<string, CLICommand> {
    return {
      exit: {
        name: "exit",
        description: "Exits the pokedex",
        callback: commandExit,
      },
      help: {
        name: "help",
        description: "Shows the help menu",
        callback: commandHelp,
      }
      // can add more commands here
    };
  }