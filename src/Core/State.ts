//import * as StateFile from './state.json';
import {readFileSync, writeFileSync} from 'fs';
const stateSave = './src/Core/state.json';


interface StateObj_ {
    twitterUsers: Pair[];
}

export class StateObj implements StateObj_ {
    twitterUsers: Pair[];

    constructor() {
        this.twitterUsers = [];
    }
}

interface Pair_ {
    id: string;
    value: string;
}

export class Pair implements Pair_ {
    id: string;
    value: string;

    constructor(in_id: string, in_value: string) {
        this.id = in_id;
        this.value = in_value;
    }

}


export default class State{
    obj: StateObj;
    //twitterUsers: TwitterPair[];

    constructor() {
        var json: any = JSON.parse(readFileSync(stateSave, 'utf8'));

        this.obj = new StateObj();

        for (var n in json.twitterUsers) { // Parse twitter users and last tweet into pair
            this.obj.twitterUsers.push(new Pair(json.twitterUsers[n].id, json.twitterUsers[n].value));
        }
    }

    write(): void {
        writeFileSync(stateSave, JSON.stringify(this.obj));
    }
}
