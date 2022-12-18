"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("../main");
const types_1 = require("../types");
const CommandHandler_1 = require("../Core/Handlers/CommandHandler");
const mongoose_1 = __importDefault(require("mongoose"));
const config = require('../../config.json');
main_1.Metis.client.on('messageCreate', async (msg) => {
    let userDatabase;
    let guildDatabase;
    if (msg.author.bot) {
        return;
    }
    const args = msg.content.split(' ').splice(1);
    if (msg.channel.type === types_1.ChannelTypes['guildText']) {
        if (!await main_1.Metis.models.guild.exists({ guildId: msg.member.guild.id })) {
            await main_1.Metis.models.guild.create({
                _id: new mongoose_1.default.Types.ObjectId(),
                guildId: msg.channel.guild.id,
                guildName: msg.channel.guild.name,
                ownerId: msg.channel.guild.ownerID,
                owner: main_1.Metis.util.getFullName(main_1.Metis.client.users.get(msg.channel.guild.ownerID))
            });
            main_1.Metis.client.executeWebhook(config.devWebID, config.devWebhook, {
                embed: {
                    color: main_1.Metis.colors.green,
                    title: 'New Guild Database Created',
                    description: `**Guild:** ${msg.channel.guild.name} (\`${msg.channel.guild.id}\`)\n**Owner:** ${main_1.Metis.util.getFullName(main_1.Metis.client.users.get(msg.channel.guild.ownerID))}`,
                    timestamp: new Date()
                }
            });
            main_1.Metis.logger.info("MongoDB", `Initialized Guild Model with ID: ${msg.member.guild.id}`);
        }
        guildDatabase = await main_1.Metis.models.guild.findOne({ guildId: msg.member.guild.id });
        let prefix = guildDatabase.prefix;
        if (msg.content.startsWith(main_1.Metis.devPrefix) && msg.author.id === "344954369285947392" ? prefix = main_1.Metis.devPrefix : prefix = prefix)
            if (!msg.content.length) {
                return;
            }
        if (!msg.content.startsWith(prefix)) {
            return;
        }
        const commandName = msg.content.split(' ')[0].toLowerCase().slice(prefix.length);
        if (!await main_1.Metis.models.user.findOne({ userID: msg.author.id })) {
            let ownedGuilds = main_1.Metis.client.guilds.filter(c => c.ownerID === msg.author.id).map(c => c.name + " " + "(" + c.id + ")");
            await main_1.Metis.models.user.create({
                userID: msg.author.id,
                username: main_1.Metis.util.getFullName(msg.author),
                ownedGuilds: ownedGuilds
            });
            main_1.Metis.client.executeWebhook(config.devWebID, config.devWebhook, {
                embed: {
                    color: main_1.Metis.colors.green,
                    title: 'New User Database Created',
                    description: `**User:** ${main_1.Metis.util.getFullName(msg.author)} (\`${msg.author.id}\`)`,
                    timestamp: new Date()
                }
            });
            main_1.Metis.logger.info('Metis', `Initialized Guild Model with ID: ${msg.author.id}`);
        }
        userDatabase = await main_1.Metis.models.user.findOne({ userID: msg.author.id });
        const Command = main_1.Metis.commands.get(commandName) ||
            main_1.Metis.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
        if (!Command) {
            return;
        }
        const ctx = {
            msg: msg,
            channel: msg.channel,
            command: Command,
            guild: msg.channel.guild,
            member: msg.member,
            user: msg.author,
            content: msg.content,
            args: args,
            dev: false,
            guildDatabase: guildDatabase,
            userDatabase: userDatabase
        };
        const CmdHandler = new CommandHandler_1.CommandHandler({
            client: main_1.Metis.client,
            member: msg.member,
            guild: msg.member.guild
        });
        CmdHandler.handleCommand(main_1.Metis, ctx);
    }
});
