import {CommandObjectType, CommandType, CommandTypeDescription} from "./index.d";
import { nanoid } from 'nanoid'

async function func(args?: string []) {
	const size = args && args.length > 0 && parseInt(args[0], 10) > 0 ? parseInt(args[0], 10) : 16
	return {result: nanoid(size), command: CommandType.SECRET}
}

const Secret: CommandObjectType = {
	command: { type: CommandType.SECRET, description: CommandTypeDescription.SECRET , argsDescription: "[optional] size: number default=16 - example command: `secret 10`"},
	func,


}
export default Secret