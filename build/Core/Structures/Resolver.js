"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resolver = void 0;
const main_1 = require("../../main");
const types_1 = require("../../types");
class Resolver {
    async user(msg, search) {
        if (!search.length) {
            return null;
        }
        let result;
        if (Number(search) && !msg.mentions.length) {
            result = await main_1.Metis.client.getUser(search);
        }
        if (!Number(search) && msg.mentions.length) {
            result = msg.mentions[0];
        }
        return result;
    }
    async member(msg, guild, search) {
        if (!search.length) {
            return null;
        }
        let result;
        if (Number(search) && !msg.mentions.length) {
            result = await main_1.Metis.client.getMember(guild.id, search);
        }
        if (!Number(search) && !msg.mentions.length) {
            result = guild.members.find((member) => member.username.toLowerCase().startsWith(search.toLowerCase())) ||
                guild.members.find((member) => member.nick && member.nick.startsWith(search.toLowerCase()));
        }
        if (!Number(search) && msg.mentions.length) {
            result = await main_1.Metis.client.getMember(guild.id, msg.mentions[0].id);
        }
        return result;
    }
    async role(msg, guild, search) {
        let result;
        if (Number(search) && !msg.roleMentions.length) {
            result = guild.roles.get(search);
        }
        if (!Number(search) && !msg.roleMentions.length) {
            result = guild.roles.find((role) => role.name.toLowerCase().startsWith(search.toLowerCase()));
        }
        if (!Number(search) && msg.roleMentions.length) {
            result = guild.roles.get(msg.roleMentions[0]);
        }
        return result;
    }
    async category(guild, search) {
        let result;
        if (Number(search)) {
            const filteredChannels = guild.channels.filter((channel) => channel.type === types_1.ChannelTypes["guildCategory"]);
            if (!filteredChannels.length) {
                return null;
            }
            for (const entry of filteredChannels) {
                if (entry.id === search) {
                    result = entry;
                }
            }
        }
        if (!Number(search)) {
            result = guild.channels.find((channel) => channel.name.toLowerCase().startsWith(search.toLowerCase()));
            if (!result) {
                result = null;
            }
            if (result && result.type !== types_1.ChannelTypes["guildCategory"]) {
                result = null;
            }
        }
        return result;
    }
    async channel(msg, guild, search) {
        let result;
        if (Number(search)) {
            const filteredChannels = guild.channels.filter((channel) => channel.type === types_1.ChannelTypes["guildText"]);
            if (!filteredChannels.length) {
                return null;
            }
            for (const entry of filteredChannels) {
                if (entry.id === search) {
                    result = entry;
                }
            }
        }
        if (!Number(search) && !msg.channelMentions.length) {
            result = guild.channels.find((channel) => channel.name.toLowerCase().startsWith(search.toLowerCase()));
            if (!result) {
                result = null;
            }
            if (result && result.type !== types_1.ChannelTypes["guildText"]) {
                result = null;
            }
        }
        if (!Number(search) && msg.channelMentions.length) {
            result = guild.channels.get(msg.channelMentions[0]);
            if (!result) {
                result = null;
            }
            if (result && result.type !== types_1.ChannelTypes["guildText"]) {
                result = null;
            }
        }
        return result;
    }
}
exports.Resolver = Resolver;
