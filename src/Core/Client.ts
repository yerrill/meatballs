import * as Discord from 'discord.js';

export default class Client extends Discord.Client {
    public Commands!: Discord.Collection<String, any>;
    public Events!: Discord.Collection<String, any>;

    public constructor(clientOptions: Discord.ClientOptions) {
        super(clientOptions);
    }

    public init(): any {

    }

    public start(): any {

    }

    public stop(): any {

    }
}