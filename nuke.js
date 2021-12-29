/** @param {NS} ns **/

// run nuke.js

import {getServers} from 'nuke-helpers.js'

export async function main(ns) {
    ns.print(getServers(ns))
    for(let host of getServers(ns)){
        if(!ns.hasRootAccess(host) && ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(host)){
            let ports = ns.getServerNumPortsRequired(host)
            try {
                if(ports > 0) ns.brutessh(host)
                if(ports > 1) ns.ftpcrack(host)
                if(ports > 2) ns.relaysmtp(host)
                if(ports > 3) ns.httpworm(host)
                if(ports > 4) ns.sqlinject(host)
                ns.nuke(host)
            }
            catch(e){}
        }
    }
}
