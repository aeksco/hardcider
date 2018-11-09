#!/usr/bin/env node
const chalk = require('chalk')
const semver = require('semver')
const minimist = require('minimist')
const program = require('commander')

// // // //

// Citation URL components
const CITATION_URL_ROOT = 'http://www.citationmachine.net/'
const CITATION_URL_SUFFIX_WEBSITE = '/cite-a-website'
const CITATION_URL_SUFFIX_BOOK = '/cite-a-book'

// Citation Types
const CITATION_TYPE_WEBSITE = 'WEBSITE'
const CITATION_TYPE_BOOK = 'BOOK'

// Citation Formats
const FORMAT_APA = 'APA'
const FORMAT_MLA = 'MLA'
const FORMAT_CHICAGO = 'Chicago'
const FORMAT_IEEE = 'IEEE'

// buildUrl
// Builds a URL from which the citation is fetched
function buildUrl({ type, format }) {
  switch (type) {
    case CITATION_TYPE_WEBSITE:
      return [CITATION_URL_ROOT, format.toLowerCase(), CITATION_URL_SUFFIX_WEBSITE].join('')
    case CITATION_TYPE_BOOK:
      return [CITATION_URL_ROOT, format.toLowerCase(), CITATION_URL_SUFFIX_BOOK].join('')
  }
}

// getFormat
// Pulls the correct format from CLI options
function getFormat(options) {
  if (options.mla) { return FORMAT_MLA }
  if (options.chicago) { return FORMAT_CHICAGO }
  if (options.ieee) { return FORMAT_IEEE }
  return FORMAT_APA
}

// // // //

program
  .version(require('../package').version)
  .usage('<command> [options]')

program
  .command('website <website-url>')
  .description('fetch a basic citation for the website-url argument')
  .option('--apa', 'APA Formatted citation (default)')
  .option('--mla', 'MLA Formatted citation')
  .option('--chicago', 'Chicao Formatted citation')
  .option('--ieee', 'IEEE Format citation')
  .action((websiteUrl, cmd) => {
    const format = getFormat(cleanArgs(cmd))
    const fetchUrl = buildUrl({ type: CITATION_TYPE_WEBSITE, format: 'mla' })

    // Logs start prompt
    console.log(`\n${chalk.blue(`Fetching ${format} website citation...`)}`)

    // Fetch citation
    require('../lib/fetch')(fetchUrl, websiteUrl)
    .then((resp) => {

      // Logs citations
      console.log(`\n${chalk.yellow(resp)}\n`)

      // Exit the CLI
      process.exit()
    })

  })

program
  .command('book <isbn>')
  .description('fetch a basic citation for the a book\'s ISBN')
  .option('--apa', 'APA Formatted citation (default)')
  .option('--mla', 'MLA Formatted citation')
  .option('--chicago', 'Chicao Formatted citation')
  .option('--ieee', 'IEEE Format citation')
  .action((isbn, cmd) => {
    const format = getFormat(cleanArgs(cmd))
    const fetchUrl = buildUrl({ type: CITATION_TYPE_BOOK, format: 'mla' })

    // Logs start prompt
    console.log(`\n${chalk.blue(`Fetching ${format} book citation...`)}`)

    // Fetch citation
    require('../lib/fetch')(fetchUrl, isbn)
    .then((resp) => {

      // Logs citations
      console.log(`\n${chalk.yellow(resp)}\n`)

      // Exit the CLI
      process.exit()
    })

  })

// output help information on unknown commands
program
  .arguments('<command>')
  .action((cmd) => {
    program.outputHelp()
    console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
    console.log()
  })

// add some useful info on help
program.on('--help', () => {
  console.log()
  console.log(`  Run ${chalk.cyan(`hardcider <command> --help`)} for detailed usage of given command.`)
  console.log()
})

program.commands.forEach(c => c.on('--help', () => console.log()))

// Parse arguments into commander program
program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}

function camelize (str) {
  return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '')
}

// commander passes the Command object itself as options,
// extract only actual options into a fresh object.
function cleanArgs (cmd) {
  const args = {}
  cmd.options.forEach(o => {
    const key = camelize(o.long.replace(/^--/, ''))
    // if an option is not present and Command has a method with the same name
    // it should not be copied
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key]
    }
  })
  return args
}
