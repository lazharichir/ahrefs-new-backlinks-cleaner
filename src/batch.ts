import { unparse } from "papaparse"
import { Row } from "./row"
import { Sheet } from "./sheet"

export class Batch {
	private sheets: Sheet[] = []
	private shortlist: Row[] = []

	public constructor() {}

	public newSheet(sheetName: string, sheetInput: string): Sheet {
		const newSheet = new Sheet(sheetName, sheetInput)
		this.appendSheet(newSheet)
		return newSheet
	}

	public appendSheet(sheet: Sheet) {
		this.sheets.push(sheet)
	}

	public parseAll() {
		this.sheets.forEach((sheet) => {
			console.log(`[${sheet.name}] Parsing`)
			sheet.parseFromInput()
			console.log(`${sheet.getRows().length} row(s) found`)
		})
	}

	public shortlistAll() {
		this.sheets.forEach((sheet) => {
			console.log(`[${sheet.name}] Shortlisting`)
			sheet.makeShortlist()
			console.log(`${sheet.getShortlist().length} row(s) kept`)
		})
	}

	public combineShortlists() {
		this.shortlist = []

		this.shortlist = this.sheets.reduce<Row[]>((acc, sheet) => {
			return acc.concat(...sheet.getShortlist())
		}, [])

		this.shortlist = this.shortlist.sort(
			(a, b) => b.domainRating - a.domainRating
		)
	}

	public getShortlist() {
		return this.shortlist
	}

	public getShortlistAsCSV(): string {
		const columns: Array<keyof Row> = [
			`found`,
			`domainRating`,
			`referringPageTitle`,
			`referringPageUrl`,
			`linkUrl`,
			`textPre`,
			`linkAnchor`,
			`textPost`,
		]

		return unparse(this.getShortlist(), {
			header: true,
		})
	}
}
