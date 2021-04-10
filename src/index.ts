import type { HttpFunction } from "@google-cloud/functions-framework/build/src/functions"
import { readFileSync } from "fs"
import { resolve } from "path"
import { Batch } from "./batch"

export const handler: HttpFunction = async (req, res) => {
	try {
		const { method } = req

		let data = ``

		switch (method) {
			case `GET`:
				data = await handleGET(req, res)
				break
			case `POST`:
				data = await handlePOST(req, res)
				break
			default:
				throw new Error(`Method '${method}' is not supported.`)
		}

		res.send(data)
	} catch (error) {
		console.error(error)
		res.status(422).send({
			error: {
				message: error.message || `No error message.`,
			},
		})
	}
}

const handleGET: HttpFunction = async (req, res) => {
	const data = readFileSync(resolve(`./html/index.html`), {
		encoding: `utf8`,
	})
	return data
}

const handlePOST: HttpFunction = async (req, res) => {
	const { inputs } = JSON.parse(req.body)

	if (inputs?.length === 0) throw new Error(`No inputs provided.`)

	const batch = new Batch()

	for (const input of inputs) {
		const [guid, stringifiedCsv] = input
		batch.newSheet(guid, stringifiedCsv)
	}

	batch.parseAll()
	batch.shortlistAll()
	batch.combineShortlists()

	return {
		csv: batch.getShortlistAsCSV(),
		shortlist: batch.getShortlist(),
		statistics: {
			shortlistLength: batch.getShortlist().length,
		},
	}
}
