import {CommandObjectType, CommandType} from "./index.d";

async function func() {
	return {result: "", command: CommandType.CLEAR}
}

const Clear: CommandObjectType = {
	command: CommandType.CLEAR,
	func,
	resetHistory: true
}
export default Clear