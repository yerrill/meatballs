import { Intents, MessageEmbed } from "discord.js";
import * as config from './config.json';
import Client from "./Core/Client";

const client: Client = new Client({intents: [Intents.FLAGS.GUILDS]});
client.token = config.token;

client.once('ready', () => {
    console.log('Ready.');
});

client.init();
client.start();