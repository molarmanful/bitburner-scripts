/** @param {NS} ns **/

// run startup.js

export async function main(ns) {
    ns.run('nuke.js')
    ns.run('hack.js', 1, 'phantasy')
    ns.run('lvl.js')
}
