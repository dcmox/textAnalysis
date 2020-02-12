const assert = require('assert')
const MoxyTA = require('../moxy-ta')

describe('moxy-ta test suite', () => {
	it('should scan and get frequency analysis', () => {
		const doc = `
        This is a tset to see how well my script currently works! How well do you guys think it works? We will find out soon! Woot. What the buck?? How. is. this. working? colon : test
        `
		const ta = new MoxyTA(doc)

		const result = ta.scan()

		console.log(result)

		assert.equal(result.totals.letterPercentage, 0.7386363636363636)
		assert.equal(result.totals.punctuationPercentage, 0.0625)
		assert.equal(result.totals.wordPercentage, 0.19886363636363635)

		assert.equal(result.totals.totalLetters, 130)
		assert.equal(result.totals.totalPunctuation, 11)
		assert.equal(result.totals.totalWords, 35)
	})
})
