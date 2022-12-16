import {User, Message, Member, Guild, Role, CategoryChannel, Channel, TextChannel} from "eris"
import {Metis as metis} from "../../main"
import { ChannelTypes } from "../../types"
export class Resolver {

    async user(msg: Message, search: string): Promise<User|null>{
        if(!search.length){return null}
        let result: User
        if(Number(search) && !msg.mentions.length){
            result = await metis.client.getUser(search)
        }
        if(!Number(search) && msg.mentions.length){
            result = msg.mentions[0]
        }
        return result
    }

    async member(msg: Message, guild: Guild, search: string): Promise<Member|null> {
        if(!search.length){return null}
        let result: Member
        if(Number(search) && !msg.mentions.length){
            result = await metis.client.getMember(guild.id, search)
        }
        if(!Number(search) && !msg.mentions.length){
            result = guild.members.find((member: Member) => member.username.toLowerCase().startsWith(search.toLowerCase())) ||
            guild.members.find((member: Member) => member.nick && member.nick.startsWith(search.toLowerCase()))
        }
        if(!Number(search) && msg.mentions.length){
            result = await metis.client.getMember(guild.id, msg.mentions[0].id)
        }
        return result
    }

    async role(msg: Message, guild: Guild, search: string): Promise<Role|null> {
        let result: Role
        if(Number(search) && !msg.roleMentions.length){
            result = guild.roles.get(search)
        }
        if(!Number(search) && !msg.roleMentions.length){
            result = guild.roles.find((role: Role) => role.name.toLowerCase().startsWith(search.toLowerCase()))
        }
        if(!Number(search) && msg.roleMentions.length){
            result = guild.roles.get(msg.roleMentions[0])
        }
        return result
    }

    async category(guild: Guild, search: string): Promise<CategoryChannel|null> {
        let result: CategoryChannel
        if(Number(search)){
            const filteredChannels: Array<Channel> = guild.channels.filter((channel: Channel) => channel.type === ChannelTypes["guildCategory"])
            if(!filteredChannels.length){return null}
            for(const entry of filteredChannels){
                if(entry.id === search){result = entry as CategoryChannel}
            }
        }
        if(!Number(search)){
            result = guild.channels.find((channel: CategoryChannel) => channel.name.toLowerCase().startsWith(search.toLowerCase())) as CategoryChannel
            if(!result){result = null}
            if(result && result.type !== ChannelTypes["guildCategory"]){result = null}
        }
        return result
    }

    async channel(msg: Message, guild: Guild, search: string): Promise<TextChannel|null> {
        let result: TextChannel
        if(Number(search)){
            const filteredChannels: Array<Channel> = guild.channels.filter((channel: Channel) => channel.type === ChannelTypes["guildText"])
            if(!filteredChannels.length){return null}
            for(const entry of filteredChannels){
                if(entry.id === search){result = entry as TextChannel}
            }
        }
        if(!Number(search) && !msg.channelMentions.length){
            result = guild.channels.find((channel: TextChannel) => channel.name.toLowerCase().startsWith(search.toLowerCase())) as TextChannel
            if(!result){result = null}
            if(result && result.type !== ChannelTypes["guildText"]){result = null}
        }
        if(!Number(search) && msg.channelMentions.length){
            result = guild.channels.get(msg.channelMentions[0]) as TextChannel
            if(!result){result = null}
            if(result && result.type !== ChannelTypes["guildText"]){result = null}
        }
        return result
    }

}