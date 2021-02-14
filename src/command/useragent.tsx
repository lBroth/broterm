import {CommandObjectType, CommandType, CommandTypeDescription} from "./index.d";

async function func() {
	return {result: navigator.userAgent, command: CommandType.USERAGENT}
}

const UserAgent: CommandObjectType = {
	command: { type: CommandType.USERAGENT, description: CommandTypeDescription.USERAGENT },
	func
}
export default UserAgent