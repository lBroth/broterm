import {CommandObjectType, CommandType} from "./index.d";

function geolocationResponseToString(json:any) {
	return `Geolocation plugin by geoplugin.net` +
		Object.keys(json)
			.map((c) => "\n" + c.replace("geoplugin_", "") + ": " + json[c])
			.join("") +
		"\n"
}

async function func() {
	try {
		const response = await fetch('http://www.geoplugin.net/json.gp')
		const json: { geoplugin_request: string } = await response.json()
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