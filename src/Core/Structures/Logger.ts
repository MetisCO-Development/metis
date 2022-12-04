import signale from "signale"

export class Logger {
    public info(name: string, message: string, subprefix?: string): any {
        if(name.length > 50){return "Name value exceeds 50 characters"}
        if(subprefix){message = `[${subprefix}] ${message}`}
        signale.info({prefix:`[${name}]`, message: message})
    }
    
    public success(name: string, message: string, subprefix?: string): any {
        if(name.length > 50){return "Name value exceeds 50 characters"}
        if(subprefix){message = `[${subprefix}] ${message}`}
        signale.success({prefix: `[${name}]`, message: message})
    }
    
    public warn(name: string, message: string, subprefix?: string): any {
        if(name.length > 50){return "Name value exceeds 50 characters"}
        if(subprefix){message = `[${subprefix}] ${message}`}
        signale.warn({prefix: `[${name}]`, message: message})
    }
    
    public error(name: string, message: string, subprefix?: string): any {
        if(name.length > 50){return "Name value exceeds 50 characters"}
        if(subprefix){message = `[${subprefix}] ${message}`}
        signale.error({prefix: `[${name}]`, message: message})
    }
    
    public fatal(name: string, message: string, subprefix?: string): any {
        if(name.length > 50){return "Name value exceeds 50 characters"}
        if(subprefix){message = `[${subprefix}] ${message}`}
        signale.fatal({prefix: `[${name}]`, message: message})
    }
}