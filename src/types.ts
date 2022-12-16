import {Client, Collection, Guild, Message, GuildChannel, Embed, Member, User, Role, GuildTextableChannel, VoiceChannel, CategoryChannel, ClientOptions, TextChannel} from "eris";
import {Command} from "./Core/Structures/Command";
import {Logger} from "./Core/Structures/Logger"
import {MetisClient} from "./Core/Structures/Client"; 
import {Resolver} from "./Core/Structures/Resolver"
import {Util} from "./Core/Structures/Util"
import {MongoGuild, MongoGuildModel} from "./Core/Models/MongoGuild";
import {MongoUser, MongoUserModel} from "./Core/Models/MongoUser";
import {MongoGlobal, MongoGlobalModel} from "./Core/Models/MongoGlobal"

export interface ICommandContext{
    msg: Message;
    channel: TextChannel;
    guild: Guild;
    member: Member;
    user: User;
    command: Command;
    content: string;
    args: Array<string>;
    dev: boolean; 
    guildDatabase: MongoGuild 
    userDatabase: MongoUser
}

export interface MetisInterface { 
    client: MetisClient, 
    commands: CommandCollection
    models: MetisModels
    prefix: string
    aPrefix: string 
    devPrefix: string 
    logger: Logger 
    resolver: Resolver
    util: Util
    emotes: MetisEmotes 
    colors: MetisColors 
    staff: Array<string> 
    developer: Array<string> 
    version: string

}

export interface MetisEmotes { 
    success: string 
    error: string 
    neutral: string
    online: string 
    idle: string 
    dnd: string 
    offline: string 
    info: string
}

export interface MetisColors { 
    red: number 
    yellow: number 
    green: number 
    blue: number 
    default: number
}

export interface MetisModels { 
    guild: MongoGuildModel
    user: MongoUserModel, 
    global: MongoGlobalModel
}

export enum CommandPermissions { 
    user = 0, 
    serverModerator = 1, 
    serverManager = 2,
    supportStaff = 3,
    developer = 4
}

export enum ChannelTypes {
    guildText = 0,
    directMessage = 1,
    guildVoice = 2,
    groupDm = 3,
    guildCategory = 4,
    guildNews = 5,
    guildStore = 6
}

export type CommandCollection = Collection<Command>
export type PermissionLevels = 0 | 1 | 2 | 3 | 4

