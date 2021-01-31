import {CommandObjectType, CommandType} from "./index.d";

async function func() {
	return {result: navigator.userAgent, command: CommandType.USERAGENT}
}

const UserAgent: CommandObjectType = {
	command: CommandType.USERAGENT,
	func
}
export default UserAgent