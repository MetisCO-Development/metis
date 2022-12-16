import {Metis as metis} from "../main";
import {Message, TextChannel} from "eris"; 
import {MongoUser} from "../Core/Models/MongoUser"; 
import {MongoGuild} from "../Core/Models/MongoGuild"
import {ICommandContext, ChannelTypes} from "../types";
import {CommandHandler} from "../Core/Handlers/CommandHandler";
import {Command} from "../Core/Structures/Command";
import {default as mongoose} from "mongoose"; 

metis.client.on('messageCreate', async (msg: Message) => { 
    let userDatabase: MongoUser 
    let guildDatabase: MongoGuild 

    if (msg.author.bot){return} 

    const args = msg.content.split(' ').splice(1)

    if (msg.channel.type === ChannelTypes['guildText']) { 
        if(!await metis.models.guild.exists({guildId: msg.member.guild.id})){
            await metis.models.guild.create({
                _id: new mongoose.Types.ObjectId(),
                guildId: msg.channel.guild.id, 
                guildName: msg.channel.guild.name, 
                ownerId: msg.channel.guild.ownerID, 
                owner: metis.util.getFullName(metis.client.users.get(msg.channel.guild.ownerID))
            })
            metis.logger.info("MongoDB", `Initialized Guild Model with ID: ${msg.member.guild.id}`)
        }

        guildDatabase = await metis.models.guild.findOne({guildId: msg.member.guild.id})
        let prefix: string = guildDatabase.prefix ?? metis.prefix  
        
        if (msg.content.startsWith(metis.devPrefix) && msg.author.id === "344954369285947392" ? prefix = metis.devPrefix : prefix = prefix)
        if (!msg.content.length){return}
        if(!msg.content.startsWith(prefix)){return}
        const commandName = msg.content.split(' ')[0].toLowerCase().slice(prefix.length)
        if(!await metis.models.user.findOne({userID: msg.author.id})){
            await metis.models.user.create({userID: msg.author.id})
        }
        userDatabase = await metis.models.user.findOne({userID: msg.author.id})

        const Command = metis.commands.get(commandName) || 
        metis.commands.find((cmd: Command) => cmd.aliases && cmd.aliases.includes(commandName))
        if(!Command){return}

        const ctx: ICommandContext = {
            msg: msg,
            channel: msg.channel as TextChannel,
            command: Command,
            guild: msg.channel.guild,
            member: msg.member!,
            user: msg.author,
            content: msg.content,
            args: args,
            dev: false,
            guildDatabase: guildDatabase, 
            userDatabase: userDatabase
        }
        const CmdHandler = new CommandHandler({
            client: metis.client, 
            member: msg.member, 
            guild: msg.member.guild
        })
        CmdHandler.handleCommand(metis, ctx)

    }
})
