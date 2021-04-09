import Papa from "papaparse"
import { convertRow, RawRow, Row } from "./row"

const bannedReferringPageUrls = [
	/blogpost\.com/i,
	/coupon/i,
	/voucher/i,
	/author|authors/i,
	/tag|tags/i,
	/category|categories/i,
	/page|pages/i,
	/logo/i,
	/\/testimonial[s?]/i,
	/\/search\//i,
	/\/find\//i,
	/\?\s\=/i,
	/\?\q\=/i,
	/feeds/i,
	/watch[\/\?]/i,
	/\.php/i,
	/\.htm[l?]/i,
	/png|jpg|mp3|mp4/i,
	/\/r\//i,
	/\/u\//i,
	/\/([0-9]{4,})\/([0-9]{2,})\/$/i,
]

const bannedReferringPageTitles = [
	/sex/i,
	/xxx/i,
	/images/i,
	/keywords/i,
	/coupons/i,
]

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
		this.rows = parsed.data.map(convertRow)
	}

	public makeShortlist(): void {
		this.shortlist = this.rows.filter(this.evaluateRow)
	}

	public getShortlist(): Row[] {
		return this.shortlist
	}

	public getRows(): Row[] {
		return this.rows
	}

	private evaluateRow(row: Row): boolean {
		if (row.domainRating < 10) return false
		if (row.language !== `en`) return false
		if (row.type.includes(`image`)) return false
		if (row.type.includes(`nofollow`)) return false

		if (bannedReferringPageUrls.some((re) => re.test(row.referringPageUrl)))
			return false

		if (bannedReferringPageTitles.some((re) => re.test(row.referringPageTitle)))
			return false

		const nonAscii = row.referringPageTitle
			.replace(/[\x00-\x7F€––“”»·]/g, "")
			.trim()
		if (nonAscii.length > 2) return false

		return true
	}
}
