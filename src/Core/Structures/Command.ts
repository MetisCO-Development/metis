import {Message, TextableChannel} from "eris"; 
import {Metis} from "../../main"; 
import {ICommandContext} from "../../types";

export class Command { 
    name: string; 
    id: string; 
    module: string; 
    aliases: Array<string>; 
    permissions: string;
    helpInfo: string; 
    helpUsage: string;
    helpExample: string;
    constructor(data: Partial<Command>){ 
        this.name = data.name || 'unnamed'
        this.id = data.name; 
        this.module = data.module || 'default'
        this.aliases = data.aliases || ['None']; 
        this.permissions = data.permissions || 'User'
        this.helpInfo = data.helpInfo || 'someone waz lazy *yawn*'; 
        this.helpUsage = data.helpUsage 
        this.helpExample = data.helpExample 
    
    }
    async execute(metis: Metis, ctx: ICommandContext): Promise<unknown>{
        return 'Unimplemented'
    }

}