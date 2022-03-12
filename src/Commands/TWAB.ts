import { CommandInteraction, CacheType, MessageEmbed } from "discord.js";
import Client from "../Core/Client";
import SlashCommand from "../Structures/SlashCommand";

export default class TWAB extends SlashCommand {
    public constructor() {
        super({
            name: "twab",
            description: "Get latest twab",
        });
    }

    public async run(interaction: CommandInteraction, client: Client) {
        return await interaction.reply("TWAB. Nothing to see yet");
    }
}