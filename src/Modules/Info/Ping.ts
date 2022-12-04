import {Command} from "../../Core/Structures/Command"

class Ping extends Command {
    constructor() {
        super({})
        this.name = "build"
        this.aliases = ["pull"]
        this.id = this.name;
        this.requiredUsers = ["489989456175300618", "253233185800847361", "344954369285947392", "325087287539138560"];
        this.helpInfo = "Builds Jerry."
        this.commandType = "developer"
    }
}
module.exports.cmd = Ping; 
