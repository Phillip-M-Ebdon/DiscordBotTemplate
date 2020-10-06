const fs = require('fs');

const { prefix, token } = require('./config.json');

const Discord = require('discord.js');
const client = new Discord.Client();

const { models } = require('./initModels');

client.commands = new Discord.Collection();
const allCommands = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of allCommands) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}


client.once('ready', () => {
    console.log('ready');
});

client.on('message', message => {
    // early exit conditions
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    // args split by whitespace
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(command) || client.commands.find(cmd => cmd.alt && cmd.alt.includes(commandName));
    if (!command) return;



});

client.login(token);