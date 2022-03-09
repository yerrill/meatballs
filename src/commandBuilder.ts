import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { oauthClientId, meatballsGuild, token } from './config.json';

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
    new SlashCommandBuilder().setName('embedtest').setDescription('Test Embedded Message'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(oauthClientId, meatballsGuild), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);
