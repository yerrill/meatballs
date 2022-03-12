import Client from './Client';
import Event from '../Structures/Event';
import { resolve } from 'path';
import { sync } from 'glob';

export default class EventManager {
    private readonly _client: Client;

    public constructor(client: Client) {
        this._client = client;
    }

    public async load(dir: string): Promise<any> {
        const d: string = resolve(dir);
        const fs: string[] = sync(`${d}/**/*.js`);

        for (const f of fs) {
            await import(f.split('.js')[0])
                .then((event: any) => {
                    const e: Event = new event.default();
                    this._client.Events.set(e.name, e);
                    this._client.on(e.name, async(...args:any) => await e.run(...args, this._client));
                    return Promise.resolve(console.log(`[EVENT MANAGER] : LOADED EVENT '${e.name.toUpperCase()}' SUCCESSFULLY`));
                }).catch((err) => {
                    return Promise.reject(console.log(`[EVENT MANAGER] : ERROR LOADING EVENT FROM '${f.toUpperCase()}'\n${err}`));
                });
        }
        return true;
    }
}