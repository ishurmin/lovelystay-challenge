import { program } from 'commander'
import { handleAddCommand } from './handlers.js'

program
  .command('add')
  .argument('<username>', 'GitHub username')
  .action(handleAddCommand)

await program.parseAsync()
process.exit()