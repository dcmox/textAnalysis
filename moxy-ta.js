"use strict";
/**
 * Daniel Moxon
 * Copyright (C) 2020
 * https://github.com/dcmox/lexy
 */
exports.__esModule = true;
var MoxyTA = /** @class */ (function () {
    function MoxyTA(document) {
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
                wordPercentage: 0
            },
            wordFrequency: {}
        };
        this._document = document;
    }
    MoxyTA.prototype.scan = function () {
        var _this = this;
        var doc = this._document.toLowerCase();
        var words = doc
            .replace(/\.|\n|\!|\:|\?|\'|\"|\,|\;/g, ' ')
            .split(' ')
            .filter(function (word) { return word.length !== 0; });
        words.forEach(function (word) {
            if (_this._analysis.wordFrequency[word]) {
                _this._analysis.wordFrequency[word].frequency++;
            }
            else {
                _this._analysis.wordFrequency[word] = { frequency: 1 };
            }
        });
        this._analysis.punctuationFrequency = {
            comma: this._document.split(',').length - 1,
            exclamation: this._document.split('!').length - 1,
            period: this._document.split('.').length - 1,
            colon: this._document.split(':').length - 1,
            semicolon: this._document.split(';').length - 1,
            questionMark: this._document.split('?').length - 1,
            singleQuote: this._document.split("'").length - 1,
            doubleQuote: this._document.split('"').length - 1
        };
        for (var i = 97; i < 123; i++) {
            this._analysis.alphabetFrequency[String.fromCharCode(i)] =
                doc.split(String.fromCharCode(i)).length - 1;
        }
        Object.keys(this._analysis.wordFrequency).forEach(function (k) {
            _this._analysis.totals.totalWords += _this._analysis.wordFrequency[k].frequency;
        });
        Object.keys(this._analysis.wordFrequency).forEach(function (k) {
            _this._analysis.topWords.push({
                word: k,
                frequency: _this._analysis.wordFrequency[k].frequency /
                    _this._analysis.totals.totalWords
            });
        });
        Object.keys(this._analysis.alphabetFrequency).forEach(function (k) {
            _this._analysis.totals.totalLetters += _this._analysis.alphabetFrequency[k];
        });
        Object.keys(this._analysis.punctuationFrequency).forEach(function (k) {
            return (_this._analysis.totals.totalPunctuation += _this._analysis.punctuationFrequency[k]);
        });
        Object.keys(this._analysis.alphabetFrequency).forEach(function (k) {
            _this._analysis.alphabetFrequencyPercent.push({
                letter: k,
                frequency: _this._analysis.alphabetFrequency[k] /
                    _this._analysis.totals.totalLetters
            });
        });
        this._analysis.topWords = this._analysis.topWords
            .sort(function (a, b) { return (a.frequency > b.frequency ? -1 : 1); })
            .slice(0, 20);
        this._analysis.totals.letterPercentage =
            this._analysis.totals.totalLetters /
                (this._analysis.totals.totalLetters +
                    this._analysis.totals.totalPunctuation +
                    this._analysis.totals.totalWords);
        this._analysis.totals.punctuationPercentage =
            this._analysis.totals.totalPunctuation /
                (this._analysis.totals.totalPunctuation +
                    this._analysis.totals.totalLetters +
                    this._analysis.totals.totalWords);
        this._analysis.totals.wordPercentage =
            this._analysis.totals.totalWords /
                (this._analysis.totals.totalWords +
                    this._analysis.totals.totalLetters +
                    this._analysis.totals.totalPunctuation);
        return this._analysis;
    };
    return MoxyTA;
}());
exports.MoxyTA = MoxyTA;
module.exports = MoxyTA;
