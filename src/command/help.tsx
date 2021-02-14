import {CommandObjectType, CommandType, CommandTypeDescription} from "./index.d"
import * as packageJson from "../../package.json"
import Commands from "./core";

function commandTypeToString() {

	return `${packageJson.name} version ${packageJson.version}\n` +
		"Available commands:" +
		Object.values(Commands)
		.map((c) => "\n - " + c.command.type + ": " + c.command.description + (
				c.command.argsDescription ? "\n   args:\n   - " +c.command.argsDescription : ""
			)).join("") +
		"\n"
}

async function func() {
	return {result: commandTypeToString(), command: CommandType.HELP}
}

const Help: CommandObjectType = {
	command: { type: CommandType.HELP, description: CommandTypeDescription.HELP },
	func
}
export default Help