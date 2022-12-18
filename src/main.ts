import {ClientOptions, Collection} from "eris";
import MongoGuild from './Core/Models/MongoGuild'; 
import MongoGlobal from './Core/Models/MongoGlobal';
import MongoUser from './Core/Models/MongoUser'; 
import {Logger} from "./Core/Structures/Logger"; 
import {default as fs} from "fs"; 
import mongoose, { ConnectOptions } from "mongoose";
import {Command} from "./Core/Structures/Command"; 
import {MetisClient} from "./Core/Structures/Client"
import {CommandCollection, MetisColors, MetisEmotes, MetisInterface, MetisModels} from "./types";
import {Resolver} from "./Core/Structures/Resolver";
import {Util} from "./Core/Structures/Util";
const config = require("../config.json"); 

const ErisOptions: ClientOptions = { 
    intents: ['all'], 
    allowedMentions: {everyone: true, roles: true, users: true}, 
    guildCreateTimeout: 3000, 
    messageLimit: 100, 
    restMode: true, 
    opusOnly: true, 
    defaultImageSize: 2048, 
    defaultImageFormat: 'png', 
    autoreconnect: true, 
    compress: true
}

class metis implements MetisInterface {
    public client: MetisClient 
    public commands: CommandCollection 
    public models: MetisModels
    public logger: Logger 
    public resolver: Resolver
    public util: Util
    public prefix: string;
    public aPrefix: string;
    public devPrefix: string;
    public emotes: MetisEmotes;
    public colors: MetisColors;
    public staff: string[];
    public developer: string[];
    public version: string; 

    constructor(token: string, clientOptions: ClientOptions){
        this.client = new MetisClient(token, clientOptions)
        this.commands = new Collection(Command)
        this.models = {user: MongoUser, guild: MongoGuild, global: MongoGlobal}
        this.logger = new Logger()
        this.resolver = new Resolver()
        this.util = new Util()
        this.prefix = config.prefix 
        this.aPrefix = config.alphaPrefix 
        this.devPrefix = config.devPrefix 
        this.emotes = { 
            success: '<:metisSuccess:1043785651914559519>',
            error: '<:metisError:1043785694969069627>',
            neutral: '<:metisNeutral:1043786253138657320>',
            online: '<:metisOnline:1043785771779371038>',
            idle: '<:metisYellow:1043785838720458862>',
            dnd: '<:metisDnd:1043786201796190241>',
            offline: '<:metisOffline:1043785900745838714>', 
            info: '<:metisInfo:1053174375945347152>'
        }
        this.colors = { 
            red: 16711680,
            yellow: 16770560,
            green: 1441536,
            blue: 30719,
            default: 3242182
        }
        this.staff = ['344954369285947392', '510638296041259008']; 
        this.developer = ['344954369285947392']; 
        this.version = config.version 
    }
    

    public async init(): Promise<any> { 
        this.loadCommands(); 
        this.loadEvents()
        this.db()
    }


    private async loadEvent(eventName: string): Promise<any> {
        let requiredEvent: any
        if(eventName.length > 50){return "Event name is too long"}
        return requiredEvent = require(`${__dirname}/Events/${eventName}`)
    }

    private async loadEvents(): Promise<any> {
        const eventFiles = fs.readdirSync(`${__dirname}/Events`)
        if(!eventFiles.length){return this.logger.warn("Metis", "No events found", "Event Loader")}
        eventFiles.forEach(event => this.loadEvent(event))
        this.logger.success("Metis", `Loaded ${eventFiles.length} Events`, "Event Loader")
    }

    private db(): void{
        mongoose.connect(config.mongoLogin, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          dbName: 'metis-ts',
        } as ConnectOptions); 
        mongoose.connection.on('error', () => { 
            this.logger.error("Metis", 'Failed to connect to MongoDB', 'Mongo Connection')
        }); 
        mongoose.connection.on('open', () => { 
            this.logger.success("Metis", 'Connected to MongoDB', 'Mongo Connection')
        })
    }

    private loadCommands(){
        fs.readdirSync(`${__dirname}/Modules`).forEach(dir => { 
            const commands = fs.readdirSync(`${__dirname}/Modules/${dir}`).filter(file => file.endsWith('js'))

            for (let file of commands) { 
                let pull = require(`${__dirname}/Modules/${dir}/${file}`)
                let CmdClass = new pull.cmd 
                this.commands.add(CmdClass)
            
            }
            Metis.logger.success('Metis', `Loaded ${commands.length} Commands`, 'Command Loader')

        })
            
        }
    }
export const Metis = new metis(config.token, ErisOptions)
async function start(): Promise<any> {
    Metis.logger.info('Metis', 'Initializing...')
    Metis.init().then(async () => { 
        const Gateway = await Metis.client.getBotGateway()
        Metis.client.options.maxShards = Gateway.shards 
        Metis.client.connect()
    })
}
    
fs.readFile(`${__dirname}/metis.txt`, "utf8", async function(error, data){
    console.log(data)
    await start()
 })
