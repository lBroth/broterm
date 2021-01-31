import {CommandObjectType, CommandType, CommandTypeDescription} from "./index.d"
import * as packageJson from "../../package.json"

function commandTypeToString() {
	return `${packageJson.name} version ${packageJson.version}\n` +
		"Available commands:" +
		Object.values(CommandType)
		// @ts-ignore // TODO - refactor next line
		.map((c) => "\n - " + c + ": " + CommandTypeDescription[c.toUpperCase()])
		.join("") +
		"\n"
}

async function func() {
	return {result: commandTypeToString(), command: CommandType.HELP}
}

const Help: CommandObjectType = {
	command: CommandType.HELP,
	func
}
export default Help