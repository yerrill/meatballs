import { CommandInteraction, CacheType, MessageEmbed } from "discord.js";
import Client from "../Core/Client";
import SlashCommand from "../Structures/SlashCommand";

export default class Xur extends SlashCommand {
    public constructor() {
        super({
            name: "xur",
            description: "Get current Xur inventory",
        });
    }

    public async run(interaction: CommandInteraction, client: Client) {
        const embed = new MessageEmbed()
            .setTitle("XÛR Inventory")
            .setDescription("XÛR has absolutely nothing useful because he's not fucking here");
        
        return await interaction.reply({ embeds: [embed] });
    }
}