import { program } from 'commander'
import { handleAddCommand, handleListCommand } from './handlers.js'

program
  .command('add')
  .argument('<username>', 'GitHub username')
  .action(handleAddCommand)

program
  .command('list')
  .action(handleListCommand)

await program.parseAsync()
process.exit()