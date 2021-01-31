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
	GEOLOCATION = 'geolocation',
	USERAGENT = 'useragent'
}

export enum CommandTypeDescription {
	HELP = 'show all available commands',
	CLEAR = 'clear console',
	GEOLOCATION = 'get geolocation information',
	USERAGENT = 'show the user agent'
}

