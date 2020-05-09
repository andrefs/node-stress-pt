const chai = require('chai');
const expect = chai.expect;

const {wordStressed} = require('../index.js');

describe('wordStressed', () => {
  it('words with an accent character', () => {
    expect(wordStressed("pirinéus", {sylSep: '#'})).to.equal("pi#ri#né:us");
    expect(wordStressed("delícia", {sylSep: '#'})).to.equal("de#lí:#ci#a");
    expect(wordStressed("sótão", {sylSep: '#'})).to.equal("só:#tão");
  });
  it('words ending in z l r i u is us', () => {
    expect(wordStressed("sagaz", {sylSep: '#'})).to.equal("sa#ga:z");
    expect(wordStressed("nabal", {sylSep: '#'})).to.equal("na#ba:l");
    expect(wordStressed("sorrir", {sylSep: '#'})).to.equal("sor#ri:r");
    expect(wordStressed("aqui", {sylSep: '#'})).to.equal("a#qui:");
    expect(wordStressed("quis", {sylSep: '#'})).to.equal("qui:s");
    expect(wordStressed("adeus", {sylSep: '#'})).to.equal("a#de:us");
  });
  it('stress in 2nd syllable from the end', () => {
    expect(wordStressed("claro", {sylSep: '#'})).to.equal("cla:#ro");
    //expect(wordStressed("importa", {sylSep: '#'})).to.equal("im#po:r#ta");
    //expect(wordStressed("processamento", {sylSep: '#'})).to.equal("pro#ces#sa#me:n#to");
  });
  it('stress in single syllable words', () => {
    expect(wordStressed("mau", {sylSep: '#'})).to.equal("ma:u");
    expect(wordStressed("li", {sylSep: '#'})).to.equal("li:");
    expect(wordStressed("são", {sylSep: '#'})).to.equal("sã:o");
    expect(wordStressed("pé", {sylSep: '#'})).to.equal("pé:");
    expect(wordStressed("ter", {sylSep: '#'})).to.equal("te:r");
  });
});
