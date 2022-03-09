import { Client, Intents, Message, MessageEmbed, TextChannel } from "discord.js";
import * as config from './config.json';
import TwitterEmbed from "./Structures/Twitter";
import './Structures/Twitter';
import { TwitterApi } from 'twitter-api-v2';

const client: Client = new Client({intents: [Intents.FLAGS.GUILDS]});
const twitterClient = new TwitterApi(config.twitterBearer);

async function sendEmbed(channelID: string, embed: MessageEmbed): Promise<Message<boolean>> {
    const channel = client.channels.cache.get(channelID) as TextChannel;
    return channel.send({ embeds: [embed] });
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
        sendEmbed(config.twitterChannel, new TwitterEmbed("abc")).then(async (m) => {
			await interaction.reply("Sending...");
		}).catch(async (e) => {
			await interaction.reply(`Error ${e}`);
		});
    }
});

client.login(config.token);