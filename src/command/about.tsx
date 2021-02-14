import {CommandObjectType, CommandType, CommandTypeDescription} from "./index.d"
import * as packageJson from "../../package.json"

function about() {
	return `${packageJson.name} version ${packageJson.version} ` +
		`by ${packageJson.author} ${packageJson.repository.url}`
}

async function func() {
	return {result: about(), command: CommandType.HELP}
}

const About: CommandObjectType = {
	command: { type: CommandType.ABOUT, description: CommandTypeDescription.ABOUT },
	func
}
export default About