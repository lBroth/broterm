import {CommandObjectType, CommandType} from "./index.d";
import { nanoid } from 'nanoid'

async function func() {
	return {result: nanoid(), command: CommandType.SECRET}
}

const Secret: CommandObjectType = {
	command: CommandType.SECRET,
	func,

}
export default Secret