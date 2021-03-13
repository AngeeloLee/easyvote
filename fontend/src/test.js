let N = 5, M = 4
let hight = [2,3,4,5,3,6,7,1,1,8]
let matrix = [
//   0 1 2 3 4  5 6 7 8 9
    [0,1,0,0,0, 0,0,0,0,0], //0
    [1,0,1,0,0, 0,0,0,0,0], //1
    [0,1,0,1,0, 0,0,0,0,0], //2
    [0,0,1,0,1, 1,0,0,0,0], //3
    [0,0,0,1,0, 0,0,0,0,0], //4

    [0,0,0,1,0, 0,1,0,0,0], //5
    [0,0,0,0,0, 1,0,1,0,1], //6
    [0,0,0,0,0, 0,1,0,1,0], //7
    [0,0,0,0,0, 0,0,1,0,0], //8
    [0,0,0,0,0, 0,1,0,0,0], //9
]
let visited = [false,false,false,false,false, false,false,false,false,false]

function findPath(u) {
    visited[u] = true
    let sub = []
    for(let i=0; i<u; i++) {
        if (matrix[u][i] == 1 && !visited[i] && hight[i]<=hight[u]) {
            sub.push(i)
        }
    }
    if (sub.length == 0) {
        return 1
    }
    let paths = []
    for (let v of sub) {
        paths.push(findPath(v))
    }
    return Math.max(...paths) + 1
}
let hist = hight.indexOf(Math.max(...hight))
console.log(hist)
console.log(findPath(hist))