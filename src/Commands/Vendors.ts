import { CommandInteraction, CacheType, MessageEmbed } from "discord.js";
import Client from "../Core/Client";
import SlashCommand from "../Structures/SlashCommand";

export default class Vendors extends SlashCommand {
    public constructor() {
        super({
            name: "vendors",
            description: "Get latest vendor information",
        });
    }

    public async run(interaction: CommandInteraction, client: Client) {
        return await interaction.reply("Vendors. Nothing to see yet");
    }
}