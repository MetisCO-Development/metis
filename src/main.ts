import {Client, ClientOptions, Collection} from "eris"; 
// save space for all Utils, Resolvers, Logger, Mongo models, types
import {Logger} from "../src/Core/Structures/Logger"; 
import {default as fs} from "fs"; 
import mongoose, { ConnectOptions } from "mongoose";
import { receiveMessageOnPort } from "worker_threads";
const config = require("../config.json"); 

export class Metis extends Client { 
    logger: Logger;
    version: String
    bevents: {[key: string]: () => void}; 
    // commands: Collection<command>;
    prefix: string;
    aPrefix: string;
    devPrefix: string;
    models: {};
    emotes: {};
    colors: {};
    // util: Util;
    // resolver: Resolver;
    staff: Array<string>;
    admins: Array<string>; 
    devs: Array<string>;
    constructor(token: string, options: ClientOptions) { 
        super(token, options); 
        this.logger = new Logger()
        this.version = 'v1.0.0'
        this.bevents = {}; 
        // this.commands = new Collection(command)
        this.prefix = config.prefix; 
        this.aPrefix = config.alphaPrefix
        this.devPrefix = config.devPrefix 
        // this.models = {user: UserModel, global: GlobalModel, guild: GuildModel}
        this.emotes = { 
            success: '<:metisSuccess:1043785651914559519>',
            error: '<:metisError:1043785694969069627>',
            neutral: '<:metisNeutral:1043786253138657320>',
            online: '<:metisOnline:1043785771779371038>',
            idle: '<:metisYellow:1043785838720458862>',
            dnd: '<:metisDnd:1043786201796190241>',
            offline: '<:metisOffline:1043785900745838714>'
        }
        this.colors = { 
            red: 16711680,
            yellow: 16770560,
            green: 1441536,
            blue: 30719,
            default: 14356496
        }
        // this.util = new Util()
        // this.resolver = new Resolver()
        this.staff = ['344954369285947392', '510638296041259008']; 
        this.admins = ['344954369285947392', '510638296041259008']; 
        this.devs = ['344954369285947392', '510638296041259008']; 

    }

    init(): void { 
        fs.readFile(`${__dirname}/metis.txt`, "utf8", function(err, data) { 
            console.log(data)
            metis.logger.success(metis.user.username, 'Commands Loaded!')
            metis.logger.success(metis.user.username, 'Events Loaded')
        })
        this.loadCommands(); 
        this.loadEvents()
        this.connect()
        this.db()
    }

    loadEvents(): void{
        const eventfiles = fs.readdirSync(__dirname + "/Events"); 
        eventfiles.forEach(file => { 
            console.log(file)
            this.loadEvent(file);
        });
    }

    loadEvent(eventfile: string): void{
        try{
            let Event = require(`./Events/${eventfile}`).default;
            if(!Event){Event = require(`./Events/${eventfile}`).event}
            this.bevents[Event.name] = Event.handle.bind(this); 
            this.on(Event.name, this.bevents[Event.name]);
        }catch(err) {
            metis.logger.error(metis.user.username, err)
        }
    }

    private db(): void{
        mongoose.connect(config.mongoLogin, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: true,
          dbName: 'metis',
        } as ConnectOptions); 
        mongoose.connection.on('error', () => { 
            this.logger.error(this.user.username, 'Failed to connect to MongoDB')
        }); 
        mongoose.connection.on('open', () => { 
            this.logger.success(this.user.username, 'Connected to MongoDB')
        })
    }

    reloadEvent(eventname: string): void{
        if(!this.bevents[eventname]){throw new Error('Cannot reload an event that does not exist!');}
        delete require.cache[require.resolve(`${__dirname}/Events/${eventname.charAt(0).toUpperCase() + eventname.slice(1)}.js`)]
        this.removeAllListeners(eventname); 
        this.loadEvent(eventname.charAt(0).toUpperCase() + eventname.slice(1));
    }

    private loadCommands(){
        fs.readdirSync(`${__dirname}/Modules`).forEach(dir => { 


        })
            
        }
    }
    
const metis = new Metis(config.token, { 
    getAllUsers: true, 
    messageLimit: 100, 
    restMode: true, 
    autoreconnect: true, 
    defaultImageFormat: 'png', 
    defaultImageSize: 2048, 
    intents: ['all']
})

metis.init()