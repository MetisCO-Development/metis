import {Message, TextableChannel, TextChannel} from "eris"; 
import { Metis } from "../../main";
import {CommandPermissions, ICommandContext, MetisInterface, PermissionLevels} from "../../types";
import { MetisClient } from "./Client";
import {Metis as metis} from "../../main"
export class Command { 
    id: string; 
    name: string;
    module: string
    description: string; 
    usage: string;
    example: string; 
    permLevel: PermissionLevels 
    requiredUsers: Array<string>;
    requiredGuilds: Array<string>;
    showOnHelp: boolean; 
    deleteOnUsage: boolean 
    enabled: boolean 
    aliases: Array<string>
    
    constructor(cmd: Partial<Command>){ 
        this.id = cmd.name ?? "unknown"
        this.name = cmd.name ?? "unknown"
        this.module = cmd.module ?? "Internal"
        this.description = cmd.description ?? "None" 
        this.usage = cmd.name + " " + cmd.usage ?? cmd.name
        this.example = cmd.name + " " + cmd.example ?? "None"
        this.permLevel = cmd.permLevel ?? CommandPermissions["user"]
        this.requiredUsers = cmd.requiredUsers ?? []
        this.requiredGuilds = cmd.requiredGuilds ?? []
        this.showOnHelp = cmd.showOnHelp ?? true 
        this.deleteOnUsage = cmd.deleteOnUsage ?? false 
        this.enabled = cmd.enabled ?? true 
        this.aliases = cmd.aliases ?? []
    }

    public client: MetisClient = metis.client

    async execute(metis: MetisInterface, ctx: ICommandContext): Promise<any>{
        if(!ctx){return}
        if(!metis.commands){return}
        return new Promise((resolve, reject) => {})
    }

    success(channel: TextChannel, message: string): any { 
        if(!channel.permissionsOf(this.client.user.id).has('sendMessages')){return}
        if(message.length > 500){return}
        return channel.createMessage(`${metis.emotes.success} ${message}`).catch((error: Error) => {})
    }

    error(channel: TextChannel, message: string): any { 
        if(!channel.permissionsOf(this.client.user.id).has('sendMessages')){return}
        if(message.length > 500){return}
        channel.createMessage(`${metis.emotes.error} ${message}`).catch((error: Error) => {})
    }

    info(channel: TextChannel, message: string): any { 
        if(!channel.permissionsOf(this.client.user.id).has('sendMessages')){return}
        if(message.length > 500) {return}
        channel.createMessage(`${metis.emotes.info} ${message}`).catch((error: Error) => {})
    }

}