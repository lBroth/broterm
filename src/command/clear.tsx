import {CommandObjectType, CommandType, CommandTypeDescription} from "./index.d";

async function func() {
	return {result: "", command: CommandType.CLEAR}
}

const Clear: CommandObjectType = {
	command: { type: CommandType.CLEAR, description: CommandTypeDescription.CLEAR },
	func,
	resetHistory: true
}
export default Clear