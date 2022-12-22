"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metis = void 0;
const eris_1 = require("eris");
const MongoGuild_1 = __importDefault(require("./Core/Models/MongoGuild"));
const MongoGlobal_1 = __importDefault(require("./Core/Models/MongoGlobal"));
const MongoUser_1 = __importDefault(require("./Core/Models/MongoUser"));
const Logger_1 = require("./Core/Structures/Logger");
const fs_1 = __importDefault(require("fs"));
const mongoose_1 = __importDefault(require("mongoose"));
const Command_1 = require("./Core/Structures/Command");
const Client_1 = require("./Core/Structures/Client");
const Resolver_1 = require("./Core/Structures/Resolver");
const Util_1 = require("./Core/Structures/Util");
const config = require("../config.json");
const ErisOptions = {
    intents: ['all'],
    allowedMentions: { everyone: true, roles: true, users: true },
    guildCreateTimeout: 3000,
    messageLimit: 100,
    restMode: true,
    opusOnly: true,
    defaultImageSize: 2048,
    defaultImageFormat: 'png',
    autoreconnect: true,
    compress: true
};
class metis {
    constructor(token, clientOptions) {
        this.client = new Client_1.MetisClient(token, clientOptions);
        this.commands = new eris_1.Collection(Command_1.Command);
        this.models = { user: MongoUser_1.default, guild: MongoGuild_1.default, global: MongoGlobal_1.default };
        this.logger = new Logger_1.Logger();
        this.resolver = new Resolver_1.Resolver();
        this.util = new Util_1.Util();
        this.prefix = config.prefix;
        this.aPrefix = config.alphaPrefix;
        this.devPrefix = config.devPrefix;
        this.emotes = {
            success: '<:metisSuccess:1043785651914559519>',
            error: '<:metisError:1043785694969069627>',
            neutral: '<:metisNeutral:1043786253138657320>',
            online: '<:metisOnline:1043785771779371038>',
            idle: '<:metisYellow:1043785838720458862>',
            dnd: '<:metisDnd:1043786201796190241>',
            offline: '<:metisOffline:1043785900745838714>',
            info: '<:metisInfo:1053174375945347152>'
        };
        this.colors = {
            red: 16711680,
            yellow: 16770560,
            green: 1441536,
            blue: 30719,
            default: config.defaultColor
        };
        this.staff = ['344954369285947392', '510638296041259008'];
        this.developer = ['344954369285947392'];
        this.version = config.version;
    }
    async init() {
        this.loadCommands();
        this.loadEvents();
        this.db();
    }
    async loadEvent(eventName) {
        let requiredEvent;
        if (eventName.length > 50) {
            return "Event name is too long";
        }
        return requiredEvent = require(`${__dirname}/Events/${eventName}`);
    }
    async loadEvents() {
        const eventFiles = fs_1.default.readdirSync(`${__dirname}/Events`);
        if (!eventFiles.length) {
            return this.logger.warn("Metis", "No events found", "Event Loader");
        }
        eventFiles.forEach(event => this.loadEvent(event));
        this.logger.success("Metis", `Loaded ${eventFiles.length} Events`, "Event Loader");
    }
    db() {
        mongoose_1.default.connect(config.mongoLogin, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'metis-ts',
        });
        mongoose_1.default.connection.on('error', () => {
            this.logger.error("Metis", 'Failed to connect to MongoDB', 'Mongo Connection');
        });
        mongoose_1.default.connection.on('open', () => {
            this.logger.success("Metis", 'Connected to MongoDB', 'Mongo Connection');
        });
    }
    loadCommands() {
        fs_1.default.readdirSync(`${__dirname}/Modules`).forEach(dir => {
            const commands = fs_1.default.readdirSync(`${__dirname}/Modules/${dir}`).filter(file => file.endsWith('js'));
            for (let file of commands) {
                let pull = require(`${__dirname}/Modules/${dir}/${file}`);
                let CmdClass = new pull.cmd;
                this.commands.add(CmdClass);
            }
        });
        exports.Metis.logger.success('Metis', `Loaded ${this.commands.size} Commands`, 'Command Loader');
    }
}
exports.Metis = new metis(config.token, ErisOptions);
async function start() {
    exports.Metis.logger.info('Metis', 'Initializing...');
    exports.Metis.init().then(async () => {
        const Gateway = await exports.Metis.client.getBotGateway();
        exports.Metis.client.options.maxShards = Gateway.shards;
        exports.Metis.client.connect();
    });
}
fs_1.default.readFile(`${__dirname}/metis.txt`, "utf8", async function (error, data) {
    console.log(data);
    await start();
});
