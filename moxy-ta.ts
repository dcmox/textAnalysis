/**
 * Daniel Moxon
 * Copyright (C) 2020
 * https://github.com/dcmox/lexy
 */

interface IMoxyTAResult {
    wordFrequency: IFrequencyAnalysis,
    punctuationFrequency: IFrequency,
    alphabetFrequency: IFrequency,
    topWords: any[],
    alphabetFrequencyPercent: any[],
    totals: IFrequencyTotals,
}

interface IFrequencyTotals {
    totalWords: number,
    totalLetters: number,
    totalPunctuation: number,
    wordPercentage: number,
    letterPercentage: number,
    punctuationPercentage: number
}

interface IFrequencyAnalysis { [key: string]: IAnalysisResult }
interface IAnalysisResult { frequency: number }

interface IFrequency { [key: string]: number }

export class MoxyTA {
    public _analysis: IMoxyTAResult
    public _document: string

    constructor(document: string) {
        this._analysis = {
            alphabetFrequency: {},
            alphabetFrequencyPercent: [],
            punctuationFrequency: {},
            topWords: [],
            totals: {
                letterPercentage: 0,
                punctuationPercentage: 0,
                totalLetters: 0,
                totalPunctuation: 0,
                totalWords: 0,
                wordPercentage: 0,
            },
            wordFrequency: {},
        }
        this._document = document
    }

    // get percentage
    public scan(): IMoxyTAResult {
        const words: string[] = this._document
            .replace(/\.|\n|\!|\:|\?|\'|\"|\,|\;/g, ' ')
            .split(' ')
            .filter((word: string) => word.length !== 0)

        words.forEach((word: string) => {
            if (this._analysis.wordFrequency[word]) {
                this._analysis.wordFrequency[word].frequency++
            } else {
                this._analysis.wordFrequency[word] = { frequency: 1 }
            }
        })
        this._analysis.punctuationFrequency = {
            comma: this._document.split(',').length - 1,
            exclamation: this._document.split('!').length - 1,
            period: this._document.split('.').length - 1,
            colon: this._document.split(':').length - 1,
            semicolon: this._document.split(';').length - 1,
            questionMark: this._document.split('?').length - 1,
            singleQuote: this._document.split('\'').length - 1,
            doubleQuote: this._document.split('"').length - 1,
        }
        const doc: string = this._document.toLowerCase()
        for (let i = 97; i < 123; i++) {
            this._analysis.alphabetFrequency[String.fromCharCode(i)] = doc.split(String.fromCharCode(i)).length - 1
        }

        Object.keys(this._analysis.wordFrequency).forEach((k: string) => {
            this._analysis.totals.totalWords += this._analysis.wordFrequency[k].frequency
        })

        Object.keys(this._analysis.wordFrequency).forEach((k: string) => {
            this._analysis.topWords.push({ word: k,
                frequency: this._analysis.wordFrequency[k].frequency / this._analysis.totals.totalWords })
        })

        Object.keys(this._analysis.alphabetFrequency).forEach((k: string) => {
            this._analysis.totals.totalLetters += this._analysis.alphabetFrequency[k]
        })

        Object.keys(this._analysis.punctuationFrequency).forEach((k: string) =>
            this._analysis.totals.totalPunctuation += this._analysis.punctuationFrequency[k])

        Object.keys(this._analysis.alphabetFrequency).forEach((k: string) => {
            this._analysis.alphabetFrequencyPercent.push({ letter: k,
                frequency: this._analysis.alphabetFrequency[k] / this._analysis.totals.totalLetters })
        })

        this._analysis.topWords = this._analysis.topWords
            .sort((a: any , b: any) => a.frequency > b.frequency ? -1 : 1)
            .slice(0, 20)

        this._analysis.totals.letterPercentage = this._analysis.totals.totalLetters
             / (this._analysis.totals.totalLetters + this._analysis.totals.totalPunctuation + this._analysis.totals.totalWords)

        this._analysis.totals.punctuationPercentage = this._analysis.totals.totalPunctuation
             / ( this._analysis.totals.totalPunctuation + this._analysis.totals.totalLetters + this._analysis.totals.totalWords)

        this._analysis.totals.wordPercentage = this._analysis.totals.totalWords
             / (this._analysis.totals.totalWords + this._analysis.totals.totalLetters + this._analysis.totals.totalPunctuation)
        return this._analysis
    }
}

export default MoxyTA
