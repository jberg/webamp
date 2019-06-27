const { COMMANDS } = require("./constants");

class Variable {
  constructor(a, b, name) {
    this.a = a;
    this.b = b;
    this.name = name;
  }
}

class Command {
  constructor({
    commandsBuffer,
    pos,
    types,
    variables,
    functionNames,
    localFunctions
  }) {
    const opcode = commandsBuffer.readInt8(pos);
    this.pos = pos;
    this.opcode = opcode;
    this.arguments = [];
    this.command = COMMANDS[opcode];
    this.size = 1;

    if (this.command == null) {
      throw new Error(`Unknown opcode "${opcode}"`);
    }

    if (this.command.arg == null) {
      this.size = 1;
      return;
    }

    const argType = this.command.arg;
    let arg = null;
    switch (argType) {
      case "var": {
        arg = commandsBuffer.readUInt32LE(pos + 1);
        break;
      }
      case "line": {
        const variable = commandsBuffer.readUInt32LE(pos + 1) + 5;
        arg = { name: variable, line: variable };
        break;
      }
      case "objFunc": {
        const variable = commandsBuffer.readUInt32LE(pos + 1);
        if (functionNames[variable] != null) {
          arg = functionNames[variable].function;
        } else {
          throw new Error("unknown Object function");
        }
        break;
      }
      case "func": {
        // Note in the perl code here: "todo, something strange going on here..."
        const variable = commandsBuffer.readUInt32LE(pos + 1) + 5;
        const offset = variable + pos;
        arg = {
          name: `func${offset}`,
          code: [],
          offset
        };
        if (localFunctions[offset] == null) {
          localFunctions[offset] = {
            function: arg,
            offset
          };
        }
        break;
      }
      case "obj": {
        const variable = commandsBuffer.readUInt32LE(pos + 1);
        arg = types[variable];
        break;
      }
    }

    this.arguments = [arg];
    this.size = 5;

    // From perl: look forward for a stack protection block
    // (why do I have to look FORWARD. stupid nullsoft)
    if (
      commandsBuffer.length > pos + 5 + 4 &&
      commandsBuffer.readUInt32LE(pos + 5) >= 0xffff0000
    ) {
      this.size += 4;
    }

    if (opcode === 112) {
      this.size += 1;
    }
  }
}

module.exports = Command;