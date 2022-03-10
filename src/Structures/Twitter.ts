import { MessageEmbed } from "discord.js";
import { TweetUserTimelineV2Paginator, TwitterApi, UserV2Result } from "twitter-api-v2";

export class Twitter {
    twitterClient: TwitterApi;
    bearerToken!: string;

    constructor(bearer: string) {
        this.twitterClient = new TwitterApi(bearer);
        this.bearerToken = bearer;
    }

    async getIdByUsername(username: string): Promise<string> { // Change To accurate typing later
        const user: Promise<UserV2Result> = this.twitterClient.v2.userByUsername(username); // Promise, find user

        return new Promise((resolve, reject) => {
            user.then( (v) => {
                resolve(v.data.id);
            });
            user.catch( (e) => {
                reject(`getIdByUsername - Twitter Error: ${e}`);
            });
        });
    }

    async makeProfile(id: string): Promise<Profile> { // Create a profile used for further actions
        const info: Promise<UserV2Result> = this.twitterClient.v2.user(id, { "user.fields": ["profile_image_url"] });

        return new Promise((resolve, reject) => {
            info.then( (v) => {
                resolve(new Profile(v.data.id, v.data.name, v.data.username, v.data.profile_image_url));
            });
            info.catch( (e) => {
                reject(`makeProfile - Twitter Error ${e}`)
            });
        });
    }

    async getTweetsByProfile(profile: Profile): Promise<Tweet[]> {
        const info: Promise<TweetUserTimelineV2Paginator> = this.twitterClient.v2.userTimeline(profile.id); //, {exclude: ['replies', 'retweets'], since_id: '1500706183379705858'}

        return new Promise((resolve, reject) => {
            var arr: Tweet[] = [];
            var t: Tweet;

            info.then( (v) => {
                for (var n in v.tweets) {
                    t = new Tweet(profile, v.tweets[n].id, v.tweets[n].text);
                    arr.push(t);
                }

                resolve(arr);
            });
            info.catch( (e) => {
                reject(`getTweetsByProfile - Twitter Error ${e}`);
            });
        });
    }


}

export class Profile { // Twitter user profile.
    profileId: string;
    profileName: string;
    profileUsername: string;
    profileImage?: string;
    profileURL: string;

    constructor(id: string, name: string, user: string, image?: string) {
        this.profileId = id;
        this.profileName = name;
        this.profileUsername = user;
        this.profileImage = image;
        this.profileURL = `https://twitter.com/${this.profileUsername}`
    }

    get id(): string {
        return this.profileId;
    }

    get name(): string {
        return this.profileName;
    }

    get username(): string {
        return this.profileUsername;
    }

    get url(): string | undefined{
        return this.profileURL;
    }

    get image(): string {
        return this.image;
    }
}

export class Tweet {
    tweetAuthor: Profile;
    tweetId: string;
    tweetText: string;

    constructor(author: Profile, id: string, text: string) {
        this.tweetAuthor = author;
        this.tweetId = id;
        this.tweetText = text;
    }

    get author(): Profile {
        return this.tweetAuthor;
    }

    get id(): string {
        return this.tweetId;
    }

    get text(): string {
        return this.tweetText;
    }
}

export class TwitterEmbed extends MessageEmbed {
    public constructor(content: string){
        super();
        this.setColor("#1DA1F2");
        this.setTitle(content);
        this.setURL("https://twitter.com");
        this.setDescription(content);
    }
}