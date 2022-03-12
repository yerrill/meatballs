import Event from '../Structures/Event';
import * as Discord from 'discord.js';
import SlashCommand from '../Structures/SlashCommand';
import CommandManager from './CommandManager';
import EventManager from './EventManager';

export default class Client extends Discord.Client {
    public Commands!: Discord.Collection<string, SlashCommand>;
    public Events!: Discord.Collection<string, Event>;
    public CommandMgr!: CommandManager;
    public EventMgr!: EventManager;

    public constructor(clientOptions: Discord.ClientOptions) {
        super(clientOptions);
        this.Commands = new Discord.Collection<string, SlashCommand>();
        this.Events = new Discord.Collection<string, Event>();
        this.CommandMgr = new CommandManager(this);
        this.EventMgr = new EventManager(this);
    }

    public async init(): Promise<any> {
        await this.CommandMgr.load("Commands/");
        await this.EventMgr.load("Events/");
    }

    public async start(): Promise<string> {
        return await this.login();
    }

    public stop(): any {

    }
}