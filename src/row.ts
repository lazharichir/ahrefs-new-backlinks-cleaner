export type RawRow = {
	"#": string
	"Total Backlinks": string
	"Domain Rating": string
	"URL Rating": string
	"Referring Domains": string
	"Referring Page URL": string
	"Referring Page Title": string
	"Internal Links Count": string
	"External Links Count": string
	"Last HTTP Code": string
	"Link URL": string
	TextPre: string
	"Link Anchor": string
	TextPost: string
	Type: string
	"Backlink Status": string
	Found: string
	Language: string
	Traffic: string
	Keywords: string
	"Js rendered": string
	"Linked Domains": string
}

export type Row = {
	index: number
	totalBacklinks: number
	domainRating: number
	urlRating: number
	referringDomains: number
	referringPageUrl: string
	referringPageTitle: string
	internalLinksCount: number
	externalLinksCount: number
	lastHttpCode: number
	linkUrl: string
	textPre: string
	linkAnchor: string
	textPost: string
	type: string[]
	backlinkStatus: string
	found: Date
	language: string
	traffic: number
	keywords: number
	jsRendered: boolean
	linkedDomains: number
}

export const RawRowKeyMapping: Record<keyof RawRow, keyof Row> = {
	"#": `index`,
	"Total Backlinks": `totalBacklinks`,
	"Domain Rating": `domainRating`,
	"URL Rating": `urlRating`,
	"Referring Domains": `referringDomains`,
	"Referring Page URL": `referringPageUrl`,
	"Referring Page Title": `referringPageTitle`,
	"Internal Links Count": `internalLinksCount`,
	"External Links Count": `externalLinksCount`,
	"Last HTTP Code": `lastHttpCode`,
	"Link URL": `linkUrl`,
	TextPre: `textPre`,
	"Link Anchor": `linkAnchor`,
	TextPost: `textPost`,
	Type: `type`,
	"Backlink Status": `backlinkStatus`,
	Found: `found`,
	Language: `language`,
	Traffic: `traffic`,
	Keywords: `keywords`,
	"Js rendered": `jsRendered`,
	"Linked Domains": `linkedDomains`,
}

export const RowRawKeyMapping: Record<keyof Row, keyof RawRow> = {
	index: "#",
	totalBacklinks: "Total Backlinks",
	domainRating: "Domain Rating",
	urlRating: "URL Rating",
	referringDomains: "Referring Domains",
	referringPageUrl: "Referring Page URL",
	referringPageTitle: "Referring Page Title",
	internalLinksCount: "Internal Links Count",
	externalLinksCount: "External Links Count",
	lastHttpCode: "Last HTTP Code",
	linkUrl: "Link URL",
	textPre: `TextPre`,
	linkAnchor: "Link Anchor",
	textPost: `TextPost`,
	type: `Type`,
	backlinkStatus: "Backlink Status",
	found: `Found`,
	language: `Language`,
	traffic: `Traffic`,
	keywords: `Keywords`,
	jsRendered: "Js rendered",
	linkedDomains: "Linked Domains",
}

export const convertRow = (rawRow: RawRow, index?: number): Row => {
	return {
		index: index || -1,
		totalBacklinks: parseInt(rawRow[RowRawKeyMapping[`totalBacklinks`]]),
		domainRating: parseInt(rawRow[RowRawKeyMapping[`domainRating`]]),
		urlRating: parseInt(rawRow[RowRawKeyMapping[`urlRating`]]),
		referringDomains: parseInt(rawRow[RowRawKeyMapping[`referringDomains`]]),
		referringPageUrl: String(rawRow[RowRawKeyMapping[`referringPageUrl`]]),
		referringPageTitle: String(rawRow[RowRawKeyMapping[`referringPageTitle`]]),
		internalLinksCount: parseInt(
			rawRow[RowRawKeyMapping[`internalLinksCount`]]
		),
		externalLinksCount: parseInt(
			rawRow[RowRawKeyMapping[`externalLinksCount`]]
		),
		lastHttpCode: parseInt(rawRow[RowRawKeyMapping[`lastHttpCode`]]),
		linkUrl: String(rawRow[RowRawKeyMapping[`linkUrl`]]),
		textPre: String(rawRow[RowRawKeyMapping[`textPre`]]),
		linkAnchor: String(rawRow[RowRawKeyMapping[`linkAnchor`]]),
		textPost: String(rawRow[RowRawKeyMapping[`textPost`]]),
		type: String(rawRow[RowRawKeyMapping[`type`]])
			.split(`, `)
			.map((e) => e.toLowerCase()),
		backlinkStatus: String(rawRow[RowRawKeyMapping[`backlinkStatus`]]),
		found: new Date(rawRow[RowRawKeyMapping[`found`]]),
		language: String(rawRow[RowRawKeyMapping[`language`]]),
		traffic: parseInt(rawRow[RowRawKeyMapping[`traffic`]]),
		keywords: parseInt(rawRow[RowRawKeyMapping[`keywords`]]),
		jsRendered: Boolean(rawRow[RowRawKeyMapping[`jsRendered`]]),
		linkedDomains: parseInt(rawRow[RowRawKeyMapping[`linkedDomains`]]),
	}
}
