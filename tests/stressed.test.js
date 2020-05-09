const chai = require('chai');
const expect = chai.expect;

const {stressed} = require('../index.js');

describe('stressed', () => {
  it('correctly finds stressed syllables in multiple words', () => {
    expect(stressed("Esta é uma frase de teste para esta função deste módulo")).to.equal("E:s|ta é: u:|ma fra:|se de: te:s|te pa:|ra e:s|ta fun|çã:o de:s|te mó:|du|lo");

    expect(stressed("Esta é uma frase de teste para esta função deste módulo", {sylSep: '#'})).to.equal("E:s#ta é: u:#ma fra:#se de: te:s#te pa:#ra e:s#ta fun#çã:o de:s#te mó:#du#lo");
  });
});
