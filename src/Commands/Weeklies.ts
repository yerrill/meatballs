import { CommandInteraction, CacheType, MessageEmbed } from "discord.js";
import Client from "../Core/Client";
import SlashCommand from "../Structures/SlashCommand";

export default class Weeklies extends SlashCommand {
    public constructor() {
        super({
            name: "weeklies",
            description: "Get current weekly information",
        });
    }

    public async run(interaction: CommandInteraction, client: Client) {
        return await interaction.reply("Weeklies. Nothing to see yet");
    }
}