/** @param {NS} ns **/

// run hack.js [target]

import {getNuked} from 'nuke-helpers.js'

export async function main(ns) {
    let [target] = ns.args

    ns.disableLog('ALL')
    ns.enableLog('print')
    ns.enableLog('sleep')

    for(let host of getNuked(ns)){
        await ns.scp('serf.js', host)
    }
    
    while(1){
        let secLim = ns.getServerMinSecurityLevel(target) + 3
        let monLim = ns.getServerMaxMoney(target) * .9
        let hackCount = .05

        hackCount += 2

        let mode

        if(ns.getServerSecurityLevel(target) > secLim) mode = 0 // weaken
        else if(ns.getServerMoneyAvailable(target) < monLim) mode = 1 // grow
        else mode = 2 // hack

        ns.print('mode: ' + mode)
        ns.print(`sec: ${ns.getServerSecurityLevel(target)}/${secLim}`)
        ns.print(`mon: ${ns.getServerMoneyAvailable(target)}/${monLim}`)

        for(let host of getNuked(ns)){
            ns.killall(host)
            let thrCount = 0 | ns.getServerMaxRam(host) / ns.getScriptRam('serf.js')
            if(thrCount > 0){
                ns.exec('serf.js', host, thrCount, mode, target);
            }
        }

        await ns.sleep(hackCount * [ns.getWeakenTime, ns.getGrowTime, ns.getHackTime][mode](target) + 300)
    }
}
