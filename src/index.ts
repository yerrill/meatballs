import { Client, Intents, MessageEmbed } from "discord.js";
import * as config from './config.json';
import TwitterEmbed from "./Structures/Twitter";
import './Structures/Twitter.ts'

const client: Client = new Client({intents: [Intents.FLAGS.GUILDS]});

async function sendEmbed(channelID: string, embed: MessageEmbed) {
    const channel = client.channels.cache.get(channelID);
    channel.send({ embeds: embed });
}

client.once('ready', () => {
    console.log('Ready.');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply('Server info.');
	} else if (commandName === 'user') {
		await interaction.reply('User info.');
	} else if (commandName === 'embedtest') {
        sendEmbed(config.twitterChannel, new TwitterEmbed("abc"));
        await interaction.reply("Sending...");
    }
});

client.login(config.token);