/** @param {NS} ns **/
export async function main(ns) {
    let [target] = ns.args
    let monLim = ns.getServerMaxMoney(target) * .69
    let secLim = ns.getServerMinSecurityLevel(target) + 5
    
    if(ns.fileExists('BruteSSH.exe', 'home')) ns.brutessh(target)
    ns.nuke(target)
    while(1){
        if(ns.getServerSecurityLevel(target) > monLim){
            await ns.weaken(target)
        }
        else if(ns.getServerMoneyAvailable(target) < secLim){
            await ns.grow(target)
        }
        else {
            await ns.hack(target)
        }
    }
}
