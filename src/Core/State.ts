//import * as StateFile from './state.json';
import {readFileSync, writeFileSync} from 'fs';
const stateSave = './src/Core/state.json';


interface StateObj {
    twitterUsers: TwitterPair[];
}


export default class State{
    obj: StateObj;
    //twitterUsers: TwitterPair[];

    constructor() {
        this.obj = JSON.parse(readFileSync(stateSave, 'utf8'));
    }
}

export class TwitterPair {
    userId: string;
    lastTweet: string;

    constructor(id: string, tid: string) {
        this.userId = id;
        this.lastTweet = tid;
    }

    get id(): string {
        return this.userId;
    }

    get tweet(): string {
        return this.lastTweet;
    }
}