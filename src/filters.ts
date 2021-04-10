import { URL } from "url"
import { Row } from "./row"

export const bannedReferringPageUrls = [
	/blogpost\.com/i,
	/coupon|voucher/i,
	/whois/i,
	/hosting/i,
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
	/\?\p\=/i,
	/feeds/i,
	/watch[\/\?]/i,
	/\.php/i,
	/\.cgi/i,
	/\.htm[l?]/i,
	/png|jpg|mp3|mp4/i,
	/\/r\//i,
	/\/u\//i,
	/\/([0-9]{4,})\/([0-9]{2,})\/$/i,
]

export const bannedReferringPageTitles = [
	/sex/i,
	/xxx/i,
	/images/i,
	/keywords/i,
	/coupons/i,
]

export const evaluateRow = (row: Row): boolean => {
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

	const from = new URL(row.referringPageUrl.toLowerCase())
	const to = new URL(row.linkUrl.toLowerCase())

	if (from.pathname.length < 2) return false
	if (from.href.includes(to.hostname)) return false

	return true
}
