export function getServers(ns) {
    let res = []
    let tree = {home: 0}
    let queue = Object.keys(tree)
    let name
    while(name = queue.pop()){
        let depth = tree[name]
        res.push(name)
        for (let host of ns.scan(name)){
            if(!tree[host]){
                queue.push(host)
                tree[host] = depth + 1
            }
        }
    }
    return res
}

export function getNuked(ns){
    return getServers(ns).filter(a=> a != 'home' && ns.hasRootAccess(a))
}
