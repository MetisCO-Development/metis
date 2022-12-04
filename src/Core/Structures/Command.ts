import {Message, TextableChannel} from "eris"; 
import {Metis} from "../../main"; 
import {ICommandContext} from "../../types";
export class Command { 
    name: string; 
    id: string; 
    aliases: Array<string>; 
    requiredGuilds: Array<string>;
    requiredRoles: Array<string>;
    requiredUsers: Array<string>;
    helpInfo: string; 
    helpUsage: string;
    helpExample: string;
    commandType: string; 
    constructor(data: Partial<Command>){ 
        this.name = data.name || 'unnamed'
        this.aliases = data.aliases || []; 
        this.id = data.name; 

        this.requiredGuilds = data.requiredGuilds || []; 
        this.requiredRoles = data.requiredRoles || []; 
        this.requiredUsers = data.requiredUsers || []; 

        this.helpInfo = data.helpInfo || 'someone waz lazy *yawn*'; 
        this.helpUsage = data.helpUsage 
        
        this.commandType = data.commandType || 'default'
    }
    async execute(metis: Metis, ctx: ICommandContext): Promise<unknown>{
        return 'Unimplemented'
    }

}