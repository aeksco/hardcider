#!/usr/bin/env node
const chalk = require('chalk')
const semver = require('semver')
const minimist = require('minimist')
const program = require('commander')

// Search Constants
const CITATION_URL_IEEE ='http://www.citationmachine.net/ieee/cite-a-website'
const CITATION_URL_MLA ='http://www.citationmachine.net/mla/cite-a-website'

// // // //

program
  .version(require('../package').version)
  .usage('<command> [options]')

program
  .command('website <website-url>')
  .description('fetch a basic citation for the website-url argument')
  .option('--ieee', 'IEEE Format citation')
  .option('--mla', 'MLA Formatted citation')
  .action((websiteUrl, cmd) => {

    // Pulls options from command
    let fetchUrl = ''
    const options = cleanArgs(cmd)

    if (options.mla) {
      fetchUrl = CITATION_URL_MLA
      console.log(`\n${chalk.blue(`Fetching MLA citation...`)}\n`)
    } else {
      fetchUrl = CITATION_URL_IEEE
      console.log(`\n${chalk.blue(`Fetching IEEE citation...`)}\n`)
    }

    // Logs start prompt
    require('../lib/fetch')(fetchUrl, websiteUrl)
    .then((resp) => {

      // Logs citations
      console.log(chalk.yellow(resp))

      // Roll credits
      // console.log(`\n${chalk.blue(`Built by @aeksco - Powered by citationmachine.com`)}\n`)

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
