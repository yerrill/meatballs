import { UserApplicationCommandData } from "discord.js";
import { ApplicationCommandTypes } from "discord.js/typings/enums";

export default abstract class UserCommand implements UserApplicationCommandData {
    type!: "USER" | ApplicationCommandTypes.USER;
    name!: string;
    defaultPermission?: boolean | undefined;
    
}