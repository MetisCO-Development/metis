"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Util = void 0;
class Util {
    getFullName(user) {
        return `${user.username}#${user.discriminator}`;
    }
    formatCode(message) {
        return `\`\`\`js\n${message}\n\`\`\``;
    }
    splitMessage(message, length) {
        let msgArray = [];
        if (!message) {
            return [];
        }
        if (Array.isArray(message)) {
            message = message.join("\n");
        }
        if (message.length > length) {
            let str = "";
            let position;
            while (message.length > 0) {
                position = message.length > length ? message.lastIndexOf("\n", length) : message.length;
                if (position > length) {
                    position = length;
                }
                str = message.substr(0, position);
                message = message.substr(position);
                msgArray.push(str);
            }
        }
        else {
            msgArray.push(message);
        }
        return msgArray;
    }
    formatTime(time) {
        const difference = Math.abs(Date.now() - time) / 1000;
        const days = Math.round(Math.floor(difference / 86400));
        const hours = Math.round(Math.floor(difference / 3600) % 24);
        const minutes = Math.round(Math.floor(difference / 60) % 60);
        const seconds = Math.round(difference % 60);
        return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    }
    getUserFlags(user) {
        let result = [];
        if (user.publicFlags) {
            user.publicFlags & (1 << 0) ?
                result.push("<:discordstaff:809121139317932083> Discord Staff") : null;
            user.publicFlags & (1 << 1) ?
                result.push("<:discordpartner:809121174133932043> Discord Partner") : null;
            user.publicFlags & (1 << 2) ?
                result.push("<:hypesquadevents:809121214798364733> Hypesquad Events") : null;
            user.publicFlags & (1 << 17) ?
                result.push("<:verifiedbotdeveloper:809121324026691624> Verified Bot Developer") : null;
            user.publicFlags & (1 << 3) ?
                result.push("<:bughunter1:809121446622003201> Discord Bug Hunter Level 1") : null;
            user.publicFlags & (1 << 14) ?
                result.push("<:bughunter2:809121611986108497> Discord Bug Hunter Level 2") : null;
            user.publicFlags & (1 << 9) ?
                result.push("<:earlysupporter:809121805981319168> Early Supporter") : null;
            user.publicFlags & (1 << 6) ?
                result.push("<:bravery:809121845688139819> HypeSquad Bravery") : null;
            user.publicFlags & (1 << 7) ?
                result.push("<:brilliance:809121977197527070> HypeSquad Brilliance") : null;
            user.publicFlags & (1 << 8) ?
                result.push("<:balance:809122013301833739> HypeSquad Balance") : null;
        }
        return result;
    }
}
exports.Util = Util;
