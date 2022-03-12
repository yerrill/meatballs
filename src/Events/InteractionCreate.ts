import { CommandInteraction } from "discord.js";
import Client from "../Core/Client";
import Event from "../Structures/Event";

export default class InteractionCreate extends Event {
    public constructor() {
        super('interactionCreate');
    }

    public async run(interaction: CommandInteraction, client: Client) {
        if (!interaction.isCommand() || !client.Commands.has(interaction.commandName)) {
            console.log(`Command ${interaction.commandName} not found`);
        } else return await client.Commands.get(interaction.commandName)?.run(interaction, client);
    }
}