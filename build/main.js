"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metis = void 0;
const eris_1 = require("eris");
// save space for all Utils, Resolvers, Logger, Mongo models, types
const Logger_1 = require("./Core/Structures/Logger");
const fs_1 = __importDefault(require("fs"));
const mongoose_1 = __importDefault(require("mongoose"));
const Command_1 = require("./Core/Structures/Command");
const config = require("../config.json");
class Metis extends eris_1.Client {
    constructor(token, options) {
        super(token, options);
        this.logger = new Logger_1.Logger();
        this.version = 'v1.0.0';
        this.bevents = {};
        this.commands = new eris_1.Collection(Command_1.Command);
        this.prefix = config.prefix;
        this.aPrefix = config.alphaPrefix;
        this.devPrefix = config.devPrefix;
        // this.models = {user: UserModel, global: GlobalModel, guild: GuildModel}
        this.emotes = {
            success: '<:metisSuccess:1043785651914559519>',
            error: '<:metisError:1043785694969069627>',
            neutral: '<:metisNeutral:1043786253138657320>',
            online: '<:metisOnline:1043785771779371038>',
            idle: '<:metisYellow:1043785838720458862>',
            dnd: '<:metisDnd:1043786201796190241>',
            offline: '<:metisOffline:1043785900745838714>'
        };
        this.colors = {
            red: 16711680,
            yellow: 16770560,
            green: 1441536,
            blue: 30719,
            default: 14356496
        };
        // this.util = new Util()
        // this.resolver = new Resolver()
        this.staff = ['344954369285947392', '510638296041259008'];
        this.admins = ['344954369285947392', '510638296041259008'];
        this.devs = ['344954369285947392', '510638296041259008'];
    }
    init() {
        fs_1.default.readFile(`${__dirname}/metis.txt`, "utf8", function (err, data) {
            console.log(data);
            metis.logger.success("Metis", 'Commands Loaded!');
            metis.logger.success("Metis", 'Events Loaded');
        });
        this.loadCommands();
        // this.loadEvents()
        this.db();
        this.connect();
    }
    loadEvents() {
        const eventfiles = fs_1.default.readdirSync(__dirname + "/Events");
        eventfiles.forEach(file => {
            console.log(file);
            this.loadEvent(file);
        });
    }
    loadEvent(eventfile) {
        try {
            let Event = require(`./Events/${eventfile}`).default;
            if (!Event) {
                Event = require(`./Events/${eventfile}`).event;
            }
            this.bevents[Event.name] = Event.handle.bind(this);
            this.on(Event.name, this.bevents[Event.name]);
        }
        catch (err) {
            metis.logger.error("Metis", err);
        }
    }
    db() {
        mongoose_1.default.connect(config.mongoLogin, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: 'metis',
        });
        mongoose_1.default.connection.on('error', () => {
            this.logger.error("Metis", 'Failed to connect to MongoDB');
        });
        mongoose_1.default.connection.on('open', () => {
            this.logger.success("Metis", 'Connected to MongoDB');
        });
    }
    reloadEvent(eventname) {
        if (!this.bevents[eventname]) {
            throw new Error('Cannot reload an event that does not exist!');
        }
        delete require.cache[require.resolve(`${__dirname}/Events/${eventname.charAt(0).toUpperCase() + eventname.slice(1)}.js`)];
        this.removeAllListeners(eventname);
        this.loadEvent(eventname.charAt(0).toUpperCase() + eventname.slice(1));
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
    }
}
exports.Metis = Metis;
const metis = new Metis(config.token, {
    getAllUsers: true,
    messageLimit: 100,
    restMode: true,
    autoreconnect: true,
    defaultImageFormat: 'png',
    defaultImageSize: 2048,
    intents: ['all']
});
metis.init();
