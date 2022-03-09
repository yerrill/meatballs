import { MessageEmbed } from "discord.js";

export default class TwitterEmbed extends MessageEmbed {
    public constructor(content: string){
        super();
        this.setColor("#1DA1F2");
        this.setTitle(content);
        this.setURL("https://twitter.com");
        this.setDescription(content);
    }
}