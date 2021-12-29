/** @param {NS} ns **/
export async function main(ns) {
    let [mode, target] = ns.args
    while(1) await [ns.weaken, ns.grow, ns.hack][mode](target)
}
