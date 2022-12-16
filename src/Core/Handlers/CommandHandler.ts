import {MetisInterface, CommandPermissions, ICommandContext} from "../../types";
import {MetisClient} from "../Structures/Client";
import {Member, Guild} from "eris"

export class CommandHandler { 
    client: MetisClient
    member: Member 
    guild: Guild 

    constructor(handler: Partial<CommandHandler>){
        this.client = handler.client 
        this.member = handler.member 
        this.guild = handler.guild
    }

    private async runCommand(metis: MetisInterface, ctx: ICommandContext): Promise<any> {
        ctx.command.execute(metis, ctx)
        if(ctx.command.deleteOnUsage){return ctx.msg.delete().catch((error: Error) => {})}
        if(!ctx.command.deleteOnUsage){return}
    }

    public async handleCommand(metis: MetisInterface, ctx: ICommandContext): Promise<any> { 
        const requiredUsers: Array<string> = ctx.command.requiredUsers 
        const requiredGuilds: Array<string> = ctx.command.requiredGuilds
        if(requiredUsers.length && requiredUsers.includes(this.member.id)){return this.runCommand(metis, ctx)}
        if(requiredGuilds.length && !requiredGuilds.includes(this.guild.id)){return}
        if(ctx.command.permLevel === CommandPermissions["user"]){return this.runCommand(metis, ctx)}
        if(ctx.command.permLevel === CommandPermissions["serverModerator"] && !(this.member.permissions.has('manageGuild') || 
        this.member.roles.some((role: string) => ctx.guildDatabase.modRoles.includes(role)))){return}
        if(ctx.command.permLevel === CommandPermissions["serverManager"] && !this.member.permissions.has('manageGuild')){return}
        if(ctx.command.permLevel === CommandPermissions["supportStaff"] && !metis.staff.includes(this.member.id)){return}
        if(ctx.command.permLevel === CommandPermissions["developer"] && !metis.developer.includes(this.member.id)){return}
        return this.runCommand(metis, ctx)
    }
}