const fs = require('fs');
const INIT_MIN_NUMBER = 10000000;

function Graph() {
    this.list = {};
}

Graph.prototype.insert = function(vertex, neighbors) {
    if (!this.list[vertex]) {
        this.list[vertex] = neighbors;
    } else {
        this.list[vertex].push(...neighbors);
    }

    for (let neighbor of neighbors) {
        let vertex = neighbor[0];
        if (!this.list[vertex]) {
            this.list[vertex] = [];
        }
    }
}

var count = 0;
Graph.prototype.shortestPath = function(from, to) {
    const path = {};

    // Initialize path
    for (let vertex in this.list) {
        // Math.min() is also work
        path[vertex] = {
            weight: vertex == from ? 0 : INIT_MIN_NUMBER,
            prevVertex: null
        }
    }

    const queue = [from];

    while (queue.length > 0) {

        let target = queue.shift();

        const neighbors = this.list[target];

        for (let neighbor of neighbors) {
            if (neighbor.length === 0) {
                continue;
            }

            let vertex = neighbor[0];
            let weight = neighbor[1];

            var totalWeight = path[target].weight === INIT_MIN_NUMBER ? weight : parseInt(weight) + parseInt(path[target].weight);

            if (path[vertex].weight > totalWeight) {
                path[vertex] = {
                    weight: totalWeight,
                    prevVertex: target
                }
                queue.push(vertex);
            }
        }
    }

    const pathTo = [to];
    const distances = [];
    let currentNode = path[to];

    while (currentNode) {
        const prevVertex = currentNode.prevVertex;
        if (prevVertex) {
            pathTo.unshift(prevVertex);
            const distance = currentNode.weight - path[prevVertex].weight;
            distances.unshift(distance);
        }
        currentNode = path[prevVertex];
    }

    totalDistance = distances.reduce((auc, curr) => auc + curr, 0)
    return {
        totalDistance,
        distances,
        pathTo
    };
}


function run() {

    // Read data 

    fs.readFile('./data.txt', 'utf8', function(err, data) {

        const nodes = {};
        var result = data.toString().split("\n").forEach(function(value) {
            let lines = value.toString().split(" ").map((l) => {
                return l.split("\t")
            });

            lines = lines[0];
            const key = lines.shift();

            lines.forEach((d) => {
                if (!nodes[key]) {
                    nodes[key] = [];
                }

                const vertex = d.split(",");
                if (vertex.length === 2) {
                    nodes[key].push(vertex);
                }
            })

            return lines;
        });

        var graph = new Graph();

        for (let key in nodes) {
            graph.insert(key, nodes[key]);
        }


        var targets = [7, 37, 59, 82, 99, 115, 133, 165, 188, 197];
        var results = [];
        for (let target of targets) {
            var result = graph.shortestPath('1', target.toString());
            results.push(result);
        }

        console.log(results.map((result) => result.totalDistance).reduce((acc, crr) => acc !== "" ? acc + "," + crr : acc + crr, ""));

    });
}

run()