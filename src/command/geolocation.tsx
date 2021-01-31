import {CommandObjectType, CommandType} from "./index.d";

function geolocationResponseToString(json:any) {
	return `Geolocation plugin by ipify.org` +
		Object.keys(json)
			.map((c) => "\n" + c.replace("geoplugin_", "") + ": " + json[c])
			.join("") +
		"\n"
}

async function func() {
	try {
		const response = await fetch('https://api.ipify.org?format=json')
		const json = await response.json()
		return {result: geolocationResponseToString(json), command: CommandType.GEOLOCATION}
	} catch(e) {
		console.error(e);
		// TODO - throw error
		return {result: "error getting ip info", command: CommandType.GEOLOCATION}
	}
}

const Geolocation: CommandObjectType = {
	command: CommandType.GEOLOCATION,
	func,
}

export default Geolocation