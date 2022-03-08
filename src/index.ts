import { Client, Intents } from "discord.js";
import * as config from './config.json';

const client: Client = new Client({intents: [Intents.FLAGS.GUILDS]});

client.once('ready', () => {
    console.log('Ready.');
});

client.login(config.token);