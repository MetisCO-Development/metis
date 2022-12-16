"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelTypes = exports.CommandPermissions = void 0;
var CommandPermissions;
(function (CommandPermissions) {
    CommandPermissions[CommandPermissions["user"] = 0] = "user";
    CommandPermissions[CommandPermissions["serverModerator"] = 1] = "serverModerator";
    CommandPermissions[CommandPermissions["serverManager"] = 2] = "serverManager";
    CommandPermissions[CommandPermissions["supportStaff"] = 3] = "supportStaff";
    CommandPermissions[CommandPermissions["developer"] = 4] = "developer";
})(CommandPermissions = exports.CommandPermissions || (exports.CommandPermissions = {}));
var ChannelTypes;
(function (ChannelTypes) {
    ChannelTypes[ChannelTypes["guildText"] = 0] = "guildText";
    ChannelTypes[ChannelTypes["directMessage"] = 1] = "directMessage";
    ChannelTypes[ChannelTypes["guildVoice"] = 2] = "guildVoice";
    ChannelTypes[ChannelTypes["groupDm"] = 3] = "groupDm";
    ChannelTypes[ChannelTypes["guildCategory"] = 4] = "guildCategory";
    ChannelTypes[ChannelTypes["guildNews"] = 5] = "guildNews";
    ChannelTypes[ChannelTypes["guildStore"] = 6] = "guildStore";
})(ChannelTypes = exports.ChannelTypes || (exports.ChannelTypes = {}));
