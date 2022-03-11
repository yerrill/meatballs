import { Client, Intents, Message, MessageEmbed, TextChannel } from "discord.js";
import * as config from './config.json';
import { Profile, Tweet, Twitter, TwitterEmbed } from "./Structures/Twitter";
import { TwitterApi } from 'twitter-api-v2';

const client: Client = new Client({intents: [Intents.FLAGS.GUILDS]});
const t = new Twitter(config.twitterBearer);

async function sendEmbed(channelID: string, embed: MessageEmbed): Promise<Message<boolean>> {
    const channel = client.channels.cache.get(channelID) as TextChannel;
    return channel.send({ embeds: [embed] });
}

async function getTweetsbyUser(user: string): Promise<Tweet[]> {
	const id: string = await t.getIdByUsername(user);
	const prof: Profile = await t.makeProfile(id);
	return await t.getTweetsByProfile(prof);
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

		const userTweets: Tweet[] = await getTweetsbyUser("DattosDestiny");
		await interaction.reply("Sending...");

		for(var n in userTweets) {
			await sendEmbed(config.twitterChannel, new TwitterEmbed(userTweets[n]));
		}
	}
});

client.login(config.token);