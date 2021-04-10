import Papa, { ParseResult } from "papaparse"
import { evaluateRow } from "./filters"
import { convertRow, RawRow, Row } from "./row"

export class Sheet {
	public readonly name: string = ``
	private readonly input: string = ``
	private rows: Row[] = []
	private shortlist: Row[] = []
	private options = {
		csvParser: {
			header: true,
		},
	}

	public constructor(name: string, input: string) {
		this.name = name.trim()
		this.input = input.trim()
	}

	public parseFromInput() {
		this.rows = []
		const parsed = Papa.parse<RawRow>(this.input, this.options.csvParser)
		this.ensureInputFormat(parsed)
		this.rows = parsed.data.map(convertRow)
	}

	public ensureInputFormat(data: ParseResult<RawRow>) {
		const { meta } = data
		const { fields = [] } = meta
		const neededFields: Array<keyof RawRow> = [
			`Referring Page URL`,
			`Referring Page Title`,
			`Link Anchor`,
			`Type`,
			`Domain Rating`,
			`Language`,
			`Link URL`,
		]

		for (const field of neededFields) {
			const fieldFound = fields.includes(field)
			if (!fieldFound)
				throw new Error(
					`Field '${field}' not found when parsing '${this.name}'.`
				)
		}
	}

	public makeShortlist(): void {
		this.shortlist = this.rows.filter(evaluateRow)
	}

	public getShortlist(): Row[] {
		return this.shortlist
	}

	public getRows(): Row[] {
		return this.rows
	}
}
