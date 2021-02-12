export type HistoryObjectType = {
	command: string
	result: string
}

export type CommandObjectType = {
	command: string
	func: () => Promise<HistoryObjectType>
	resetHistory?: boolean
}

export enum CommandType {
	HELP = 'help',
	CLEAR = 'clear',
	IP = 'ip',
	USERAGENT = 'useragent'
}

export enum CommandTypeDescription {
	HELP = 'show all available commands',
	CLEAR = 'clear console',
	IP = 'print your ip address',
	USERAGENT = 'print your user agent'
}

