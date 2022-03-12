import { CommandInteraction, CacheType, MessageEmbed } from "discord.js";
import Client from "../Core/Client";
import SlashCommand from "../Structures/SlashCommand";

export default class BungieHelp extends SlashCommand {
    public constructor() {
        super({
            name: "bungiehelp",
            description: "Get latest @BungieHelp tweet",
        });
    }

    public async run(interaction: CommandInteraction, client: Client) {
        return await interaction.reply("BungieHelp. Nothing to see yet");
    }
}