import { ApplicationCommandOptionData, ApplicationCommandPermissionData, ChatInputApplicationCommandData, CommandInteraction } from "discord.js";
import { ApplicationCommandTypes } from "discord.js/typings/enums";
import Client from "../Core/Client";

interface SlashCommandData extends ChatInputApplicationCommandData {
    permissions?: ApplicationCommandPermissionData[];
}

export default abstract class SlashCommand implements SlashCommandData {
    permissions?: ApplicationCommandPermissionData[] | undefined;
    description!: string;
    type?: "CHAT_INPUT" | ApplicationCommandTypes.CHAT_INPUT | undefined;
    options?: ApplicationCommandOptionData[] | undefined;
    name!: string;
    defaultPermission?: boolean | undefined;
    public constructor(info: SlashCommandData) {
        Object.assign(this, info);
    }

    public abstract run(interaction: CommandInteraction, client: Client): any;

    public toJSON(): any {
        return {
            type: this.type,
            name: this.name,
            description: this.description,
            options: this.options || [],
            default_permission: this.defaultPermission
        };
    }
}