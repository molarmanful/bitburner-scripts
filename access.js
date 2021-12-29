/** @param {NS} ns **/
export async function main(ns) {
    while(1){
        for(let target of ns.scan()){
            if(ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(target)){
                let [file] = ns.args
                let thrCount = 0 | ns.getServerMaxRam(target) / ns.getScriptRam(file)

                await ns.scp(file, target)
                ns.nuke(target)
                ns.exec(file, target, thrCount, target)
            }
        }
        await ns.sleep(1000)
    }
}
