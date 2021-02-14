export type HistoryObjectType = {
	command: string
	result: string
}

export type CommandObjectType = {
	command: Command
	func: (args?: string[]) => Promise<HistoryObjectType>
	resetHistory?: boolean
}

export type Command = {
	type: CommandType
	description: CommandTypeDescription
	argsDescription?: string
}
export enum CommandType {
	HELP = 'help',
	CLEAR = 'clear',
	IP = 'ip',
	USERAGENT = 'useragent',
	SECRET = 'secret',
	ABOUT = 'about',
	COVID = 'covid'
}

export enum CommandTypeDescription {
	HELP = 'show all available commands',
	CLEAR = 'clear console',
	IP = 'print your ip address',
	USERAGENT = 'print your user agent',
	SECRET = 'generate secret by nanoid',
	ABOUT = 'app info',
	COVID = 'get covid info'
}

