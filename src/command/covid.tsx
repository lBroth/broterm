import {CommandObjectType, CommandType, CommandTypeDescription} from "./index.d";

const ignoreObjectKeys = ['Premium']

function covidResponseToString(json: any, args?: string[]) {
	let res = `Covid19 data by covid19api.com\n`
	if (args && args.length > 0) {
		switch(args[0]) {
			case 'countries':
				res += json.Countries.map((c: any) => objectToString(c)).join("\n")
				break
			case 'country':
				res += json.Countries.filter((c: any) => c.Country.toLowerCase() === args[1].toLowerCase()).map((c: any) => objectToString(c))
				break
			default:
				// none
				// TODO - trow error unrecognized arg args[0]

		}
	} else {
		// world data
		res += objectToString(json.Global)
	}
	return res
}

async function func(args?: string[]) {
	try {
		const response = await fetch('https://api.covid19api.com/summary')
		const json = await response.json()
		return {result: covidResponseToString(json, args), command: CommandType.COVID}
	} catch(e) {
		console.error(e);
		// TODO - throw error
		return {result: "error getting covid info", command: CommandType.COVID}
	}
}

const Covid: CommandObjectType = {
	command: { type: CommandType.COVID, description: CommandTypeDescription.COVID, argsDescription: "[optional] countries - example command: `covid countries`\n   - [optional] country - example command: `covid country italy`"},
	func,
}

export default Covid


// TODO - move to utils
function objectToString (obj: any) {
		return Object.keys(obj)
			.map((c1) => ignoreObjectKeys.indexOf(c1) === -1 ? "  " + c1 + ": " + obj[c1] + "\n" : "")
			.join("")
}