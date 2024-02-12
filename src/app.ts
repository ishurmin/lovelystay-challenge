import { handleAddCommand, handleListCommand } from './handlers.js'
import { program } from '@commander-js/extra-typings'

program
  .command('add')
  .argument('<username>', 'GitHub username')
  .action(handleAddCommand)

program
  .command('list')
  .option('-loc, --location <location>')
  .option('-lang, --language <language>')
  .action(handleListCommand)

await program.parseAsync()
process.exit()