import {Command} from "../../Core/Structures/Command"

class Ping extends Command {
    constructor() {
        super({})
    }
}
module.exports.cmd = Ping; 
