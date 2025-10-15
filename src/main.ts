// repl.js actually refers to repl.ts
import { startREPL } from "./repl.js";
import { getCommands } from "./command.js";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";


function main() {
  startREPL(getCommands());
}

main();