/** @param {NS} ns **/

import {getNuked} from 'nuke-helpers.js'

// run lvl.js

export async function main(ns) {
    let file = 'serf.js'

    let check = x=> (ns.getHackingLevel() - ns.getServerRequiredHackingLevel(x)) / ns.getHackingLevel()

    while(1){
        ns.scriptKill(file, 'home')
        let target = getNuked(ns).sort((a, b)=> check(b) - check(a))[0]
        let thrCount = 0 | (ns.getServerMaxRam('home') - ns.getServerUsedRam('home')) / ns.getScriptRam('serf.js')
        let hackCount = 10

        ns.run(file, thrCount, 0, target)

        await ns.sleep(hackCount * ns.getWeakenTime(target) + 300)
    }
}
