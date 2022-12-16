import {Client, ClientOptions, Collection} from "eris";
import Guild from '../src/Core/Models/Guild'; 
import Global from '../src/Core/Models/Global';
import User from '../src/Core/Models/User'; 
import {Logger} from "./Core/Structures/Logger"; 
import {default as fs} from "fs"; 
import mongoose, { ConnectOptions } from "mongoose";
import {Command} from "./Core/Structures/Command"; 
const config = require("../config.json"); 

export class Metis extends Client { 
    logger: Logger;
    version = 'v1.0.0'
    commands: Collection<Command>;
    bevents: {[key: string]: () => void};
    prefix = config.prefix; 
    aPrefix = config.alphaPrefix
    devPrefix = config.devPrefix 
    models = {user: User, global: Global, guild: Guild};
    success = '<:metisSuccess:1043785651914559519>';
    error = '<:metisError:1043785694969069627>';
    neutral = '<:metisNeutral:1043786253138657320>';
    online = '<:metisOnline:1043785771779371038>';
    idle = '<:metisYellow:1043785838720458862>';
    dnd ='<:metisDnd:1043786201796190241>';
    offline = '<:metisOffline:1043785900745838714>';
    red = 16711680;
    yellow = 16770560;
    green = 1441536;
    blue = 30719;
    defaultColor = 3242182;
    // util: Util;
    // resolver: Resolver;
    staff = ['344954369285947392', '510638296041259008']; 
    admins = ['344954369285947392', '510638296041259008']; 
    devs = ['344954369285947392']; 
    constructor(token: string, options: ClientOptions) { 
        super(token, options); 
        this.logger = new Logger()
        this.commands = new Collection(Command)
        this.bevents = {};
        // this.util = new Util()
        // this.resolver = new Resolver()

    }

    init(): void { 
        fs.readFile(`${__dirname}/metis.txt`, "utf8", function(err, data) { 
            console.log(data)
        })
        this.logger.info('Metis', 'Initializing', 'Client Initialization').then(async () => { 
            this.loadCommands(); 
            this.loadEvents()
            this.connect()
            // this.db()
        })
    }

    // private loadEvents(){
    //     const events = fs.readdirSync(`${__dirname}/Events`).filter(file => file.endsWith('js')); 
    //     for (let file of events) { 
    //         const evt = require(`${__dirname}/Events/${file}`)
    //         metis.logger.success('Metis', 'All events loaded!', 'Event Loader')
    //     }
    // }

    loadEvents(): void{
        const eventfiles = fs.readdirSync(__dirname + "/Events");
        eventfiles.forEach(file => {
            this.loadEvent(file);
            metis.logger.success('Metis', `Loaded ${this.bevents} Events`, 'Event Loader')
        });
    }
    
    loadEvent(eventfile: string): void{
        try{
            let Event = require(`./Events/${eventfile}`).default;
            if(!Event){Event = require(`./Events/${eventfile}`).event}
            this.bevents[Event.name] = Event.handle.bind(this);
            this.on(Event.name, this.bevents[Event.name]);
        }catch(err){
            
            console.log(err);
        }
    }

    private db(): void{
        mongoose.connect(config.mongoLogin, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          dbName: 'metis',
        } as ConnectOptions); 
        mongoose.connection.on('error', () => { 
            this.logger.error("Metis", 'Failed to connect to MongoDB', 'Mongo Connecter')
        }); 
        mongoose.connection.on('open', () => { 
            this.logger.success("Metis", 'Connected to MongoDB', 'Mongo Connecter')
        })
    }

    private loadCommands(){
        fs.readdirSync(`${__dirname}/Modules`).forEach(dir => { 
            const commands = fs.readdirSync(`${__dirname}/Modules/${dir}`).filter(file => file.endsWith('js'))

            for (let file of commands) { 
                let pull = require(`${__dirname}/Modules/${dir}/${file}`)
                let CmdClass = new pull.cmd 
                this.commands.add(CmdClass)
                metis.logger.success('Metis', `Loaded ${commands.length} commands.`, 'Command Loader')
            }

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