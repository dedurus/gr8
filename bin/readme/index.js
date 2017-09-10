var fs = require('fs')
var gr8utils = require('../../utils')

var templates = {}

templates['defaults'] = JSON.stringify(gr8utils.defaults, null, 2)

templates['utilityKeys'] = Object.keys(gr8utils.utils).map(function (key) {
  return '`' + key + '`'
}).join(', ')

templates['utilityIndex'] = Object.keys(gr8utils.utils).map(function (key) {
  return '- [' + key + '](#' + key + ')'
}).join('\n')

templates['utilitySections'] = Object.keys(gr8utils.utils).map(function (key) {
  var utils = {}
  utils[key] = gr8utils.utils[key]
  var css = gr8utils.generate(utils)
  return [
    `<details id="${key}">`,
    `<summary>${key}</summary>`,
    '',
    '```css',
    css,
    '```',
    '',
    '</details>'
  ].join('\n')
}).join('\n\n')

var readme = fs.readFileSync(__dirname + '/index.md', 'utf8')

// d.i.y. {{ templates }}
function tinyBars (str, data) {
  var re = /\{\{(.+)\}\}/gi
  return str.replace(re, function (match, val) {
    return data[val.trim()] || ''
  })
}

readme = tinyBars(readme, templates)

fs.writeFile('readme.md', readme, function (err) {
  if (err) {
    return console.log(err)
  }

  console.log('readme generated and saved to readme.md')
})

// ```html
// <div class="c6 p2 fs1-5">subarashīdesu!</div>
// ```

// ```css
// .c6{width:50%}
// .p2{padding:2rem}
// .fs1-5{font-size:1.5rem}
// ```
