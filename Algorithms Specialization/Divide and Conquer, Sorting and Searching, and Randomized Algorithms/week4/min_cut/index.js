var fs = require('fs');
var utils = require('util');
const {
    promisify
} = require('util');
const readFileAsync = promisify(fs.readFile);

function Graph() {
    this.list = {};
    this.minCutVerticies = null;
    this.totalEdges = 0;
}

Graph.prototype.insert = function(fromVertex, toVertex) {
    if (!this.list[fromVertex]) {
        this.list[fromVertex] = [];
    }

    if (!this.list[toVertex]) {
        this.list[toVertex] = [];
    }

    this.totalEdges += 1;

    var isNotContainToVertex = this.list[fromVertex].indexOf(toVertex) < 0
    var isNotContainFromVertex = this.list[toVertex].indexOf(fromVertex) < 0

    if (isNotContainToVertex) {
        this.list[fromVertex].push(toVertex.toString());
    }

    if (isNotContainFromVertex) {
        this.list[toVertex].push(fromVertex.toString());
    }
};

Graph.prototype.contraction = function({
    fromVertex,
    toVertex
}) {

    this.totalEdges -= this.list[fromVertex].length;
    this.totalEdges -= this.list[toVertex].length;
    // 1.5: Update total edges

    // 1.2: Merge the edges 
    this.list[fromVertex] = this.list[fromVertex].concat(this.list[toVertex]);

    // 1.3: Update all references to v2 to point to v1
    this.list[toVertex].forEach(neighbor => {

        this.list[neighbor] = this.list[neighbor].map((v) =>
            v == toVertex ? fromVertex.toString() : v.toString()
        );

    });

    // 1.4: Remove self loops
    this.list[fromVertex] = this.list[fromVertex].filter(v => v != fromVertex)

    this.totalEdges += this.list[fromVertex].length;

    delete this.list[toVertex];

    return this.list;
}

/*
 * @return verticies {object}: return random edge
 */

Graph.prototype.pickRandomEdge = function() {
    var totalEdges = this.totalEdges;

    // Pick random number between 0 to total edges
    var randEdge = Math.floor(Math.random() * totalEdges);

    // Iterate over graph
    for (let vertex in this.list) {

        var vertexEdges = this.list[vertex];

        // If edges of a vertex (vertex_edges) is greater than random_edge
        if (vertexEdges.length < randEdge) {

            // subtract length of vertex_edges from rand_edge 
            randEdge -= vertexEdges.length;

        } else {
            // from_vertex: current vertex and to_vertex: vertex_edges[rand_edge-1]
            var index = randEdge > 0 ? randEdge - 1 : randEdge;
            var edge = {
                fromVertex: vertex,
                toVertex: vertexEdges[index]
            }
            return edge;
        }
    }
}

/*
  I got this code from somewhere.
*/

function deepCopy(object) {
    const cache = new WeakMap(); // Map of old - new references

    function copy(obj) {
        if (typeof obj !== 'object' || obj === null)
            return obj;

        if (obj instanceof Date)
            return new Date().setTime(obj.getTime());

        if (obj instanceof RegExp)
            return new RegExp(obj.source, obj.flags);

        if (cache.has(obj))
            return cache.get(obj);

        const result = obj instanceof Array ? [] : {};

        cache.set(obj, result); // store reference to object before the recursive starts

        if (obj instanceof Array) {
            for (const o of obj) {
                result.push(copy(o));
            }
            return result;
        }

        const keys = Object.keys(obj);

        for (const key of keys)
            result[key] = copy(obj[key]);

        return result;
    }

    return copy(object);
}

Graph.prototype.minCut = function() {
    var minCut = 0;

    // Deep Copy Graph
    var graph = deepCopy(this);
    Object.setPrototypeOf(graph, Graph.prototype);

    // Iterate over graph until element is 2.
    var verticies = Object.keys(graph.list);

    while (verticies.length > 2) {

        // 1.1: Pick a random edge
        var edge = graph.pickRandomEdge();
        // console.log(edge)
        // 1.6: Update cut groupings
        graph.contraction(edge);
        verticies = Object.keys(graph.list);
    }

    // 1.7: Calc min cut
    for (let vertex in graph.list) {
        minCut = graph.list[vertex].length;
    }

    return {
        minCut,
        minList: graph.list
    }
    // 1.8: Return min cut and the two supervertices
}

async function runMinCut(times) {

    // Read data 
    var data = await readFileAsync('./data.txt', 'utf-8');
    var result = data.toString().split("\n").map(function(value) {
        var line = value.toString().replace("\r", "").split(" ");
        if (line[line.length - 1] === '') {
            line.pop();
        }
        return line;
    });

    var graph = new Graph();
    var minCut = [];
    var min = Math.min();

    result.forEach(function(line) {
        var vertex = line.shift();
        line.forEach(function(l) {
            graph.insert(vertex, l);
        });
    });

    for (var i = 0; i < times; i++) {
        var n = graph.minCut();
        if (min > n.minCut) {
            min = n.minCut;
        }
    }

    return min;
}

runMinCut(100).then(result => console.log(result));