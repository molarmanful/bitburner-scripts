/** @param {NS} ns **/

// run server.js 8

export async function main(ns) {
    let [ram] = ns.args

    let canBuy = x=> x < ns.getServerMoneyAvailable('home')

    while(ns.getPurchasedServers().length < ns.getPurchasedServerLimit()){
        ns.print(`child count: ${ns.getPurchasedServers().length}/${ns.getPurchasedServerLimit()}`)
        ns.print('child cost: ' + ns.getPurchasedServerCost(ram))
        ns.print(ns.getPurchasedServers())
        if(canBuy(ns.getPurchasedServerCost(ram))){
            ns.purchaseServer('child', ram)
        }
        await ns.sleep(1000)
    }
}
