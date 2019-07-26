const chai = require('chai');
const expect = chai.expect;

const {wordStressed} = require('../index.js');

describe('wordStressed', () => {
  it('words with an accent character', () => {
    expect(wordStressed("pirinéus")).to.equal("pi|ri|né:us");
    expect(wordStressed("delícia")).to.equal("de|lí:|ci|a");
    expect(wordStressed("sótão")).to.equal("só:|tão");
  });
  it('words ending in z l r i u is us', () => {
    expect(wordStressed("sagaz")).to.equal("sa|ga:z");
    expect(wordStressed("nabal")).to.equal("na|ba:l");
    expect(wordStressed("sorrir")).to.equal("sor|ri:r");
    expect(wordStressed("aqui")).to.equal("a|qui:");
    expect(wordStressed("quis")).to.equal("qui:s");
    expect(wordStressed("adeus")).to.equal("a|de:us");
  });
  it('stress in 2nd syllable from the end', () => {
    expect(wordStressed("claro")).to.equal("cla:|ro");
    expect(wordStressed("importa")).to.equal("im|po:r|ta");
    expect(wordStressed("processamento")).to.equal("pro|ces|sa|me:n|to");
  });
  it('stress in single syllable words', () => {
    expect(wordStressed("mau")).to.equal("ma:u");
    expect(wordStressed("li")).to.equal("li:");
    expect(wordStressed("são")).to.equal("sã:o");
    expect(wordStressed("pé")).to.equal("pé:");
    expect(wordStressed("ter")).to.equal("te:r");
  });
});
