import {Metis as metis} from "../main";
import {Message, TextChannel} from "eris"; 
import {MongoUser} from "../Core/Models/MongoUser"; 
import {MongoGuild} from "../Core/Models/MongoGuild"
import {ICommandContext, ChannelTypes} from "../types";
import {CommandHandler} from "../Core/Handlers/CommandHandler";
import {Command} from "../Core/Structures/Command";
import {default as mongoose} from "mongoose"; 
const config = require('../../config.json'); 

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
            metis.client.executeWebhook(config.devWebID, config.devWebhook, { 
                embed: { 
                    color: metis.colors.green, 
                    title : 'New Guild Database Created',
                    description: `**Guild:** ${msg.channel.guild.name} (\`${msg.channel.guild.id}\`)\n**Owner:** ${metis.util.getFullName(metis.client.users.get(msg.channel.guild.ownerID))}`,
                    timestamp: new Date()                }
            })
            metis.logger.info("MongoDB", `Initialized Guild Model with ID: ${msg.member.guild.id}`)
        }

        guildDatabase = await metis.models.guild.findOne({guildId: msg.member.guild.id})
        let prefix = metis.prefix

        if (metis.client.user.id == '1053147299611693056') { 
            prefix = metis.aPrefix
        } 
        // @ts-ignore
        if (msg.content.startsWith(metis.devPrefix) && msg.author.id === "344954369285947392" ? prefix = metis.devPrefix : prefix = prefix)
        console.log(prefix)
        if (!msg.content.length){return}
        if(!msg.content.startsWith(prefix)){return}
        const commandName = msg.content.split(' ')[0].toLowerCase().slice(prefix.length)
        if(!await metis.models.user.findOne({userID: msg.author.id})){
            let ownedGuilds = metis.client.guilds.filter(c => c.ownerID === msg.author.id).map(c => c.name + " " + "(" + c.id + ")")
            await metis.models.user.create({
                userID: msg.author.id, 
                username: metis.util.getFullName(msg.author), 
                ownedGuilds: ownedGuilds
            })

            metis.client.executeWebhook(config.devWebID, config.devWebhook, { 
                embed: { 
                    color: metis.colors.green, 
                    title: 'New User Database Created',
                    description: `**User:** ${metis.util.getFullName(msg.author)} (\`${msg.author.id}\`)`,
                    timestamp: new Date()               
                 }
            })
            metis.logger.info('Metis', `Initialized User Model with ID: ${msg.author.id}`)
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
