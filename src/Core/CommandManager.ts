import Client from "./Client";
import SlashCommand from "../Structures/SlashCommand";
import { resolve } from 'path';
import { sync } from 'glob';

export default class CommandManager {
    private readonly _client: Client;
    public constructor(client: Client) {
        this._client = client;
    }

    public async load(dir: string): Promise<any> {
        const d: string = resolve(dir);
        const fs: string[] = sync(`${d}/**/*.js`);

        for (const f of fs) {
            await import(f.split('.js')[0])
                .then((command: any) => {
                    const cmd: SlashCommand = new command.default();
                    this._client.Commands.set(cmd.name, cmd);
                    return Promise.resolve(console.log(`[COMMAND MANAGER] : LOADED COMMAND '${cmd.name.toUpperCase()}' SUCCESSFULLY`));
                }).catch((err) => {
                    return Promise.reject(console.log(`[COMMAND MANAGER] : ERROR LOADING COMMAND FROM '${f.toUpperCase()}'\n${err}`));
                });
        }
    }
}