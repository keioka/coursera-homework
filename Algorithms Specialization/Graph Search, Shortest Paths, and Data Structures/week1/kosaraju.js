var fs = require('fs');
function Graph() {
  this.list = {};
}

Graph.prototype.insert = function(newVertex, neighborVertex) {
  if (!this.list[newVertex]) {
    if (!this.list[neighborVertex]) {
      this.list[neighborVertex] = [];
    }
    this.list[newVertex] = [neighborVertex];
  } else {
    // If neighborVertex is not initialized
    if (!this.list[neighborVertex]) {
      this.list[neighborVertex] = [];
    }
    // Add neighborVertex to
    this.list[newVertex].push(neighborVertex);

  }
};

Graph.prototype.addEdge = function(vertexFrom, vertexTo) {
  if (this.list[vertexFrom] || this.list[vertexTo]) {
    throw new Error('Vertex does not exsists');
  }
  this.list[vertexFrom].push(vertexTo);
};

function getReverseGraph(graph) {
  var vertices = Object.keys(graph);
  var reverseEdgeGraph = {};

  for (let vertex of vertices) {
    for (let neighbor of graph[vertex]) {
      if (reverseEdgeGraph[neighbor]) {
        reverseEdgeGraph[neighbor].push(vertex);
      } else {
        reverseEdgeGraph[neighbor] = [vertex];
      }
    }
  }

  return reverseEdgeGraph;
}

Graph.prototype.getStrongComponent = function() {

  var leaderStack = [];
  var leaderContain = {};
  var visited = {};

  for (let vertex in this.list) {

    if (visited[vertex]) continue;
    
    let stack = [vertex];

    while (stack.length > 0) {

      var nextNode = stack.pop();

      if (!visited[nextNode]) {
       
        visited[nextNode] = true;

        // Even if it is duplicate, put it in stack
        stack.push(nextNode);

        for (var neighbor of this.list[nextNode]) {
          // If the vertex is not visited, push each nodes to stack
          if (!visited[neighbor]) {
            stack.push(neighbor);
          }
        }

      // If it has been visited before, put it leaderStack
      } else {
        if (!leaderContain[nextNode]) {
          leaderStack.push(nextNode);
          leaderContain[nextNode] = true;
        }
      }    
    }

  }

  var reverseEdgeGraph = getReverseGraph(this.list);

  var allSCC = [];
  visited = {};

  leaderStack.reverse().forEach((vertex) => {

    if (visited[vertex]) return;
    
    // Mark vertex as visited
    var scc = [];
    let stack = [vertex];

    while (stack.length > 0) {
      // Get a node from stack
      var nextNode = stack.pop();
      
      // Invoke given function
      if (!visited[nextNode]) {
        scc.push(nextNode);
        visited[nextNode] = true;
      
        // Iterate adjacent nodes
        if (reverseEdgeGraph[nextNode]) {
        // console.log('stack', stack)
          for (var neighbor of reverseEdgeGraph[nextNode]) {
            // If the vertex is not visited, push each nodes to stack
            if (!visited[neighbor]) {
              stack.push(neighbor);
            }
          }
        }
      }
    }

    if (scc.length) allSCC.push(scc);
  })
  
  return allSCC
}

function main() {
  
  fs.readFile('./data.txt', 'utf-8', function(err, str) {

    var result = str.toString().split("\n").map(function(value) {
      return value.split(" ");
    });
    
    var graph = new Graph();

    console.log('* Adding vertices')

    result.forEach(function(line) {
      graph.insert(line[0], line[1]);
    });

    console.log('* getStrongComponent')
   
    var result = graph.getStrongComponent();
    
    result = result.map(function(scc) {
      return scc.length;
    })
    .sort(function(a, b) {
      return b - a;
    })
    .slice(0, 5)
    
    console.log(result)
  });
}

main(); 