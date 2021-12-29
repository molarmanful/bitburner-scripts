/** @param {NS} ns **/

// run hacknet.js

export async function main(ns) {
    let hn = ns.hacknet
    let canBuy = x=> x < ns.getServerMoneyAvailable('home') / 2
    while(1){
        if(canBuy(hn.getPurchaseNodeCost())){
            hn.purchaseNode()
        }
        for(let i in [...new Array(hn.numNodes())]){
            let d = hn.getNodeStats(i).level % 10
            if(canBuy(hn.getLevelUpgradeCost(i, 10 - d))){
                hn.upgradeLevel(i, 10 - d)
            }
            if(canBuy(hn.getRamUpgradeCost(i, 10 - d))){
                hn.upgradeRam(i, 10 - d)
            }
            if(canBuy(hn.getCoreUpgradeCost(i, 10 - d))){
                hn.upgradeCore(i, 10 - d)
            }
        }
        await ns.sleep(1000)
    }
}
