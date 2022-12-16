import {Client, ClientOptions, User, Member, Guild} from "eris"; 

export class MetisClient extends Client{ 
    options: ClientOptions 
    token: string
    super(options: ClientOptions, token: string) { 
        this.options = options
        this.token = token
    }

    public async getUser(userID: string): Promise<User>{
        let user: User
        if(!Number(userID)){return}
        user = this.users.get(userID)
        if(!user){user = await this.getRESTUser(userID)}
        return user
    }

    public async getMember(guildID: string, userID: string): Promise<Member>{
        let member: Member
        let guild: Guild
        if(!Number(guildID)){return}
        if(!Number(userID)){return}
        guild = this.guilds.get(guildID)
        if(!guild){return}
        member = guild.members.get(userID)
        if(!member){member = await this.getRESTGuildMember(guildID, userID)}
        return member
    }

    public async getGuild(guildID: string): Promise<Guild> {
        let guild: Guild
        if(!Number(guildID)){return}
        guild = this.guilds.get(guildID)
        return guild
    }
}