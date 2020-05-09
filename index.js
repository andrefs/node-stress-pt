'use strict';

const acento = '[áéíóúâêôãõüöäëï]';
const vogal  = '[áéíóúâêôãõàèaeiouüöäëï]';
const consoante = '[bcçdfghjklmñnpqrstvwyxz]';

const syl = {
   20 : " -.!?:;",
   10 : "bçdfgjkpqtv",
    8 : "sc",
    7 : "m",
    6 : "lzx",
    5 : "nr",
    4 : "h",
    3 : "wy",
    2 : "eaoáéíóúôâêûàãõäëïöü",
    1 : "iu",
    breakpair:
      // "ie|ia|io|ee|oo|oa|sl|sm|sn|sc|sr|rn|bc|lr|lz|bd|bj|bg|bq|bt|bv|pt|pc|dj|pç|ln|nr|mn|tp|bf|bp",
      "sl|sm|sn|sc|sr|rn|bc|lr|lz|bd|bj|bg|bq|bt|bv|pt|pc|dj|pç|ln|nr|mn|tp|bf|bp|xc|sç|ss|rr",
      // dígrafos que se separam sempre: xc, sç, ss, rr, sc.
};

let spri = {};

Object.keys(syl)
  .filter(pri => pri.match(/\d/))
  .forEach(pri => {
    for(let x of syl[pri].split('')){
      spri[x] = Number(pri);
    }
  });

const sylseppair = syl.breakpair.replace(/(\p{L})(\p{L})/gu, '(\?<=($1))(\?=($2))');

function syllable(word, opts={}){
  const sylSep = opts.sylSep || '|';
  word = word
    .replace(new RegExp(sylseppair, 'g'), '|')
    .replace(/(\p{L})(?=(\p{L})(\p{L}))/ug, (m, m1, m2, m3) => (spri[m1.toLowerCase()] < spri[m2.toLowerCase()] && spri[m2.toLowerCase()] >= spri[m3.toLowerCase()]) ? m1+'|' : m1)

    .replace(/([a])(i[ru])$/i, '$1|$2') // ditongos and friends

    //word = word  #s{([ioeê])([aoe])}{$1|$2}ig; # not this simple
    .replace(/(?<!^h)([ioeê])([e])/ig, '$1|$2')
    .replace(/([ioeêé])([ao])/ig, '$1|$2')    // la|go|a; di|a; ru|bé|o|la; né|on; au|ré|o|la

    .replace(/([^qg]u)(ai|ou|a)/i, '$1|$2')   // BUGFIX:  [^q]: qu|a|se => qua|se
    .replace(new RegExp('([^qgc]u)(i|ei|iu|ir|'+acento+'|e)', 'i'), '$1|$2') // continu|e
    .replace(/([lpt]u)\|(i)(?=\|[ao])/ig, '$1$2')  // a|le|lui|a ta|pui|a con|lui|o
    .replace(/([^q]u)(o)/i, '$1|$2')      // quo|ta; vácu|o
    .replace(new RegExp('([aeio])('+acento+')', 'i'), '$1|$2')

    .replace(new RegExp('([íúô])('+vogal+')', 'i'), '$1|$2')
    .replace(/^a(o|e)/i, 'a|$1')                  // a|onde; a|orta; a|eródromo

  // Exemplo: his|tó|ria
  if(word.match(new RegExp('([\p{L}\|]*'+acento+'[\p{L}\|]*)\-', 'u'))){
    if(word.match(/([eiou])\|([aeio])\-/)){ // palavras com hifen
      if(RegExp.$1 != RegExp.$2){
        word = word.replace(/([eiou])\|([aeio])(?=\-)/ig, '$1$2');
      }
    }
  }

  if(word.match(new RegExp('([\p{L}\|]*'+acento+'[\p{L}\|]*)$', 'u'))){
    if(word.match(/([eiou])\|([aeio])$/)){
      if(RegExp.$1 != RegExp.$2){
        word.replace(/([eiou])\|([aeio])$/ig, '$1$2');
      }
    }
  }
  //    s{([qg]u)\|([eií])}{$1$2}i;

  word = word
    .replace(/rein/ig, 're|in')  // re|in|ves|tir
    .replace(/ae/ig, 'a|e')      // ma|ca|en|se ; es|ma|e|cer
    .replace(/ain/ig, 'a|in')    // a|in|da con|tra|in|for|mar pa|in|ço

    .replace(/ao(?!s)/ig, 'a|o') // ca|o|ti|ca|men|te ; ma|o|me|tis|mo != caos
    .replace(/cue/ig, 'cu|e') // ar|cu|en|se
    .replace(/cui(?=\|?[mnr])/ig, 'cu|i') //
    .replace(/cui(?=\|da\|de$)/ig, 'cu|i') // pro|mis|cu|i|da|de; i|no|cu|i|da|de
    .replace(/coi(?=[mn])/ig, 'co|i') // co|in|ci|den|te;
    .replace(/cai(?=\|?[mnd])/ig, 'ca|i') // des|ca|i|de|la; des|ca|i|men|to
    .replace(new RegExp('ca\\|i(?=\\|?[m]'+acento+')', 'ig'), 'cai') // cai|mão
    .replace(/cu([áó])/ig, 'cu|$1') // pe|cu|á|ria va|cu|ó|me|tro
    .replace(/ai(?=\|?[z])/ig, 'a|i') // ra|iz ; en|ra|i|zar
    .replace(/i(u\|?)n/ig, 'i|$1n') // tri|un|fo
    .replace(/i(u\|?)r/ig, 'i|$1r') // di|ur|no
    .replace(/i(u\|?)v/ig, 'i|$1v') // viuvar
    .replace(/i(u\|?)l/ig, 'i|$1l') // friulano
    .replace(/ium/ig, 'i|um') // médium
    .replace(/([ta])iu/ig, '$1i|u') // multiuso , baiuca,  maiusculizar
    .replace(/miu\|d/ig, 'mi|u|d') // miudinho
    .replace(/au\|to(?=i)/ig, 'au|to|') // au|to|i|ma|gem
    .replace(new RegExp('(?<='+vogal+')i\\|nh(?=[ao])', 'ig'), '|i|nh') // # ven|to|i|nha
    .replace(/oi([mn])/ig, 'o|i$1') // a|men|do|im monoinsaturado microinjecção
    .replace(/oi\|b/ig, 'o|i|b') // proibido
    .replace(/ois(?!$)/ig, 'o|is') // ma|o|is|mo ; e|go|is|ti|ca|men|te
    .replace(new RegExp('o(i\\|?)s(?='+acento+')','ig'), 'o|$1s') // ra|di|o|i|só|to|po
    .replace(/([dtm])aoi/ig, '$1a|o|i') // da|o|is|ta ; ta|o|is|ta ; ma|o|is|ta
    .replace(/(?<=[trm])u\|i(?=\|?[tvb][oa])/ig, 'ui')
    // ?: gra|tui|ti|da|de vs in|tu|i|ti|vo

    .replace(/^gas\|tro(?!-)/ig, 'gas|tro|') // gas|tro|in|tes|ti|nal ; gas|tro-in|tes|ti|nal
    .replace(/^fais/ig, 'fa|is') // faiscar | faiscação
    .replace(/^hie/ig, 'hi|e') // hi|e|na ; hi|e|rar|ca
    .replace(/^ciu/ig, 'ci|u') // ci|u|men|to
    .replace(/(?<=^al\|ca)\|i/ig, 'i') // al|cai|de
    .replace(/(?<=^an\|ti)(p)\|?/ig, '|$1') // anti
    .replace(/(?<=^an\|ti)(\-p)\|?/ig, '$1') // anti
    .replace(/(?<=^neu\|ro)p\|/ig, '|p') // neu|ro|psi|có|lo|go
    .replace(/(?<=^pa\|ra)p\|/ig, '|p') // pa|ra|psi|có|lo|go
    .replace(/(?<=^ne\|)op\|/ig, 'o|p') // neopsicadélico
    .replace(/^re(?=[i]\|?[md])/ig, 're|') // re|i|dra|ta|ção
    .replace(/^re(?=i\|n[ií]\|c)/ig, 're|') // re|i|ni|ci|ar
    .replace(/^re(?=i\|nau\|g)/ig, 're|') // re|i|nau|gu|rar
    .replace(/^re(?=[u]\|?[ntsr])/ig, 're|') // re|u|so
    .replace(new RegExp('(?<=^vi\\|de\\|)o('+vogal+')', 'ig'), 'o|$1') // vi|de|o|a|ma|dor

    .replace(new RegExp('^su\\|b(?!'+vogal+')', 'ig'), 'sub|')
    .replace(new RegExp('(?<=[\\|\-])su\\|b(?!'+vogal+')', 'ig'), 'sub|')
    .replace(/^sub\|l(?=i\|?m)/ig, 'su|bl') // su|bli|mar (excepção, compostas: sub|li|mi|nar sub|li|mi|te)
    .replace(/(?<=\|)sub\|l(?=i\|?m)/ig, 'su|bl')
    .replace(/^sub\|l(?=i\|?nh)/ig, 'su|bl')  // (excepção: sublinha)
    .replace(/(?<=\|)sub\|l(?=i\|?nh)/ig, 'su|bl')
    .replace(new RegExp('^sub\\|s(?=\\|?'+vogal+')', 'ig'), 'sub|s')
    .replace(new RegExp('(?<=\\|)sub\\|s(?=\\|?'+vogal+')', 'ig'), 'sub|s')
    .replace(new RegExp('^sub\\|s(?=\\|?'+consoante+')', 'ig'), 'subs|')
    .replace(new RegExp('(?<=\\|)sub\\|s(?=\\|?'+consoante+')', 'ig'), 'subs|')

    .replace(/so\|bs/ig, 'sobs') // de|sobs|tru|ir

    .replace(/(?<=\|)trai(?=\|d)/ig, 'tra|i')  // re|tra|i|da|men|te ; des|con|tra|i|da|men|te

    .replace(/^e\|cze/ig, 'ec|ze')  // ec|ze|ma

    .replace(new RegExp('^ex\\|tra(?='+vogal+')', 'ig'), 'ex|tra|') // ex|tra|or|di|na|ri|a|men|te

    .replace(/u\|i$/ig, 'ui') // institui ; chui ;em
    .replace(/\|?ói([ao])$/ig, 'ói|$1') // jóia clarabóia
    .replace(/ei([oa])(?=$|\-)/ig, 'ei|$1') // ma|ré-chei|a mei|a-ir|mã meio

    .replace(new RegExp('^a\\|([bd])([svqnmgfz])('+vogal+')', 'ig'), 'a$1|$2$3')  // ab|sin|to
    .replace(new RegExp('(?<=\\|)a\\|([bd])([svqnmgfz])('+vogal+')', 'ig'), 'a$1|$2$3')  // re|ab|sor|ção
    .replace(/^a\|(b)(r)(o)(?=\|g)/ig, 'a$1|$2$3')  // ab|ro|ga|ção
    .replace(new RegExp('^a\\|([bd])([s])\\|?('+consoante+')', 'ig'), 'a$1$2|$3')  // abs|trac|to
    .replace(new RegExp('^o\\|([bd])([svqnmgfz])('+vogal+')', 'ig'), 'o$1|$2$3')  // ob|ser|var
    .replace(new RegExp('^o\\|([bd])([s])\\|?('+consoante+')', 'ig'), 'o$1$2|$3')  // obs|tru|ir
    .replace(/([qg]u)\|([aeií])/i, '$1$2')
    .replace(/([qg]u)\|([o])$/i, '$1$2')  // ambíguo; contíguo

    .replace(new RegExp('^('+consoante+')\\|', 'i'), '$1')
    //s{êm$}{ê|_nhem}i;      # removido após reunião do P-Pal a 2010-06-01

    .replace(/tun\|gs/ig, 'tungs')  // tungsténio
    .replace(/p\|s$/i, 'ps') // excepção de "ps" como breakpair
    .replace(/(^p|\-p)\|s([ií])/i, '$1s$2') // excepção de "ps" como breakpair => mé|di|co-psi|co|ló|gi|co

    .replace(/s\|s$/i, 'ss') // excepção de "ss" como breakpair => fitness

    .replace(/\|\|/g, '\|');

  return sylSep === '|' ? word : word.replace(/\|/g, sylSep);
}

function stressed(text, opts={}){
  const sylSep = opts.sylSep || '|';
  const res = text.replace(/(\p{L}+)/gu, w => wordStressed(w));

  return sylSep === '|' ? res : res.replace(/\|/g, sylSep);
}

function wordStressed(word, opts={}){
  const sylSep = opts.sylSep || '|';
  const flag = opts.flag || false;
  word = syllable(word);
  let oldword = word;

  // word with an accent character
  word = oldword.replace(new RegExp('(\\p{L}*'+acento+')', 'iu'), '"$1');

  // word ending with z l r i u is us
  if(word === oldword){
    word = word.replace(/(\p{L}*([zlr]|[iu]s?|um))$/iu, '"$1');
  }
  // accent in 2 syllable from the end
  if(word === oldword){
    word = word.replace(/(\p{L}+\|\p{L}+)$/u, '"$1');
  }
  // accent in the only syllable
  if(word === oldword){
    word = word.replace(/(\p{L})/u, '"$1');
  }


  if(!flag){
    word = word
    // accent in the 1.st vowel
      .replace(new RegExp('"(([qg]u|'+consoante+')*([i]'+vogal+'|'+vogal+'|[yw]))', 'i'), '$1:')
      // mv accent after accents
      .replace(new RegExp(':('+acento+')', 'i'), '$1:')
      .replace(/"/g, '');
  }

  return sylSep === '|' ? word : word.replace(/\|/g, sylSep);
}


module.exports = {
  syllable,
  stressed,
  wordStressed
};



