# stress-pt

Functions to split syllables and find stressed vowels in Portuguese
text.

Mostly an incomplete port to Node.js of the Perl module
[Lingua::PT::PLN](https://metacpan.org/pod/Lingua::PT::PLN).

## Install

```shell
npm i -S stress-pt
```

```js
const {syllable, stressed, wordStressed} = require('stress-pt');
```

[Try it in your browser](https://npm.runkit.com/stress-pt)


## API

### syllable

Returns a word with syllables separated by '|'.

```js
syllable('batatas'); // 'ba|ta|tas'
```

### wordStressed

Returns a word with syllables separated by '|' and the stressed vowel marked with ':'.

```js
wordStressed('batatas'); // 'ba|ta:|tas'
```

### stressed

Returns multi word text with all the words with syllables separated and stressed vowel marked.


```js
stressed('Olá mundo!'); // 'O|lá: mu:n|do!'
```

## To do

* port other functions as well (`toPhon`, ...)
* add support for other languages

## Bugs and stuff
Open a GitHub issue or, preferably, send me a pull request.

## Acknowledgements

Many thanks to José João Almeida and Alberto Simões, who developed the
original version of this code in Perl:
[Lingua::PT::PLN](https://metacpan.org/pod/Lingua::PT::PLN).

## License

The MIT License (MIT)

Copyright (c) 2019 André Santos <andrefs@andrefs.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
