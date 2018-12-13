# WS_BooleanNetworks
This program aims to create interactive Boolean Watts-Strogatz networks using p5.js (https://www.nature.com/articles/30918).  

The original model involves:

(1) Generating a set of nodes.
(2) Wiring each node to its neighbors based on proximity.
(3) Passing each node through rewiring function such that each node is rewired or left alone according to a certain probability.

(The model ultimately shows that a large range of possible rewiring probability values allows networks to remain clique-ish while retaining a high level of connectivity.)

In this implementation of the model, each node assmes either an active (1) or inactive state (-1).  Each node is unidirectionally connected to 4 other nodes, with some connections being 'activating' and others being 'inhibitory'.  For each node, if the sum of the product of its input nodes * their signs > 0 during t = -1, then it will be active at t = 0.
