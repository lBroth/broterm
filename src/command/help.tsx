import {CommandObjectType, CommandType, CommandTypeDescription} from "./index.d"
import * as packageJSON from "../../package.json"

function commandTypeToString() {
	return `${packageJSON.name} version ${packageJSON.version}\n` +
		"Available commands:" +
		Object.values(CommandType)
		// @ts-ignore // TODO - type
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