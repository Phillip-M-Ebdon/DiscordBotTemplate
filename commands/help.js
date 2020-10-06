const { prefix, default_cooldown } = require('../config.json');

module.exports = {
    name: 'help',
    alt: ['commands', 'h'],
    usage: '(optional)[command name]',
    description: 'List all commands, or give info and usage on specified',
    cooldown: 1,
    execute(message, args) {
        const data = [];
        const { commands } = message.client;

        // List All
        if (!args.length) {
            data.push('All Commands:');
            data.push(commands.map(cmd => cmd.name).join('\n'));
            data.push(`\n Send \`${prefix}help [command name]\` to get descriptions and usage information.`)

            return message.author.send(data, { split: true })
                .then( () => {
                    if (message.channel.type === 'dm') return;
                    message.reply('I hitup your DMs with all my commands.');
                })
                .catch(error => {
                    console.error(`Failed DMing ${message.author.tag}.\n`, error);
                    message.reply(`Seemed like I can't DM you the help, have you disable DM?`);
                })
        }
        // Attempt to find specified Command
        const cmdName = args[0].toLowerCase();
        const command = commands.get(cmdName) || commands.find(cmd => cmd.alt && cmd.alt.includes(cmdName));
        if (!command) {
            return message.reply("I don't appear to have a command by that name");
        }

        data.push(`Name: ${command.name}`)
        if (command.alt) data.push(`Alt Names: ${command.alt.join(', ')}`);
        if (command.description) data.push(`Description: ${command.description}`);
        if (command.usage) data.push(`Usage: ${prefix}${command.name} ${command.usage}`);
        if (command.cooldown) data.push(`Cooldown: ${command.cooldown || default_cooldown} second(s)`);
        message.channel.send(data, { split: true });
    }
}