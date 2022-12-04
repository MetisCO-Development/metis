import {Client, Collection, Guild, Message, GuildChannel, Embed, Member, User, Role, GuildTextableChannel, VoiceChannel, CategoryChannel, ClientOptions, TextChannel} from "eris";
import {Command} from "./Core/Structures/Command";

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
}