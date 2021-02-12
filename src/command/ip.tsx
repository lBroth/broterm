import {CommandObjectType, CommandType} from "./index.d";

function geolocationResponseToString(json:any) {
	return `` +
		Object.keys(json)
			.map((c) => c.replace("geoplugin_", "") + ": " + json[c])
			.join("") +
		" by ipify.org\n"
}

async function func() {
	try {
		const response = await fetch('https://api.ipify.org?format=json')
		const json = await response.json()
		return {result: geolocationResponseToString(json), command: CommandType.IP}
	} catch(e) {
		console.error(e);
		// TODO - throw error
		return {result: "error getting ip info", command: CommandType.IP}
	}
}

const Ip: CommandObjectType = {
	command: CommandType.IP,
	func,
}

export default Ip