# Min Cut
![cut](http://www.mathcs.emory.edu/~cheung/Courses/323/Syllabus/NetFlow/FIGS/netflow09a.gif)

## What is Min-cut?
Min-Cut is one of the ways to solve Max flow problem. Max flow is maximum flow from node `s` (called source) to node `t` (called sink) on the graph. A flow network is a directed graph denoted by `G = (V, E)`. V means vertex and E means edges same as other graphs. The capacity constraint is the flow cannot be a negative number and exceed the capacity. (0 <= |f| <= c)

## Karger's algorithm
Karger's algorithm is an algorithm to find out min cut by contracting the graph (keeping edges between vertices) until the number of the vertices is 2. The set of remaining edges is called "cut". By repeating this process and getting cuts arbitrary times, we will get minimum cut. 

### Implementation
Karger's algorithm uses random selection to pick up an edge at random, thus its time complexity depends on the probability of random selection. Put simply, the steps of Kurkas' algorithm are picking one edge at random and constructing two nodes besides the edge until the number of vertices is 2. (Keep the edges). If you have 10 vertices, contract vertices until there are 2 vertices, which will be able to be done by simple while loop. 
```
vertices = graph.keys

while (vertices !== 2) {
  edge = pickupOneEdge();
  contract(edge);
}

return graph.verticies[first or second].length
```

#### State
- Graph (Adjacency List)
- total number of edges
To pick a random edge, a total number of edges is used to generate a random number. 

#### Behavior
- 1. pick a random edge
- 2. contraction

##### 1. pick a random edge
In theory, we need to pick up a random edge, and it means picking up a vertex and its neighbor so this helper function or this process returns both of them.

To achieve that, iterate vertices and stop randomly and get its neighbor. Suppose we have this graph below

```
{
  'a': ['b', 'c'],
  'b': ['d'],
  'c': ['e', 'f'],
}
```
You have to pick up a vertex out of 'a', 'b', 'c'. How can we decide which to pick? First of all, get the total number of edges, in this case, it is 5. Secondly, pick a number from `0` (min edge number) to `5` (total number of edges) at random. Let's say we get 4 and put it in a variable `int random_edge`, then we iterate over the graph and subtract `random_edge` from length of the neighbors until `random_edge` is less than the length of the neighbors of a vertex such as `a => 2, b => 1, c => 2`. If `random_edge` is less than the length of neighbors of a vertex, then get a neighbor. 

#1: First iteration of graph.
- vertex => 'a'
- neighbors of 'a' => ['b', 'c']
- neighbors length => 2 
- random_edge => 4

`random_edge` is greater than `neighbors length`
  `random_edge = random_edge - neighbors.length`
  equal to 
  `random_edge = 4 - 2 = 2`
  
#2: Second 
- vertex => 'b'
- neighbors of 'b => ['d']
- neighbors length => 1
- random_edge => 2

`random_edge` is greate than `neighbors length` thus, `random_edge = 2 - 1 = 1`.

#3: Third iteration
- vertex => 'c'
- neighbors of 'c' => ['e', 'f']
- neighbors length => 2
- random_edge => 1
- 
`random_edge` is less than `neighbors length` so `return neighbors[random_edge] = ['e', 'f'][1] = 'e'`

At this moment, the loop is ended. Now, current vertex is 'c' and current neighbor is `e` so this function returns `['c', 'e']`
or `{ vertex: 'c', neighbor: 'e' }` whatever data structure you want.

#### 2. contraction
Contract two vertices are fairly easy. Takes two vertices `(u, v)` from step 1 and delete the vertex `v` and the edges to `v`. Suppose we have this graph
```
{
  'a': ['b', 'c'],
  'b': ['d'],
  'c': ['e', 'f'],
  'd': ['b'],
  'e': ['c'],
  'f': ['c']
}
```
If we pick "c" as `v` and `"e"` as `u`, we need to delete `"e"`.
First access to e's neighbors and iterate over neighbors array. In this case, it is ['c'] so we jump to graph['c']'s neighbor array which is ['e', 'f']. Now we find 'e' inside the array so replace it to `u` vertex which is `"c"`.

```
{
  'a': ['b', 'c'],
  'b': ['d'],
  'c': ['c', 'f'],
  'd': ['b'],
  'f': ['c']
}
```
Now `e` is gone but `c` has duplication of itself called self-loop. We need to delete this because self loop will never be able to a cut. At the end of this process, the graph will look like below.
```
{
  'a': ['b', 'c'],
  'b': ['d'],
  'c': ['f'],
  'd': ['b'],
  'f': ['c']
}
```

Repeat this process until the number of vertices is 2. Don't the edges unique, it will miss the whole point of this algorithm. Eventually, you will have the same amount of edges.
```
{
  a: [b, b, b],
  b: [a, a, a]
}
```
So this is cut and the size of the cut is 3. However, this is just one cut. You still don't know that this is minimum cut or not at this moment so that, it will be better to run (n) times.

```
min = Math.min
graph = new Graph()

for (i to n) {
  var cut = graph.minCut();
  if (min > cut) {
    min = cut
  }
}

return min
```
