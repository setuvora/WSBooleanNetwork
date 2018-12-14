# WS_BooleanNetworks
This program aims to use p5.js to create interactive boolean Watts-Strogatz networks (first described here: https://www.nature.com/articles/30918).  

The original model involves:

(1) Generating a set of nodes.
(2) Wiring each node to its neighbors based on proximity.
(3) Passing each node through rewiring function such that each node is either: [a] rewired to a randomly selected node or [b] left alone. The desicion to carry out either [a] or [b] is based on a 'rewiring probability'.

The model ultimately shows that a large range of possible rewiring probability values allows networks to remain 'clique-ish' while retaining a high level of connectivity, giving a 'small-world' property commonly seen in real world networks (e.g. actors who have collaborated with Kevin Bacon).

In this implementation of the model, each node assmes either an active (1) or inactive state (0).  

Each node is unidirectionally connected to 4 other nodes, with some connections being 'activating' (-->; +1) and others being 'inhibitory' (--|, -1).  Nodes are rewired based on the slider value (ranging from 'local' to 'global').

Clicking on a node activates it.  After the initial node is activated, the status of all the nodes in the network is updated.
For each node, if the sum of the product of its input nodes * their signs > 0 during t = -1, then it will be active at t = 0.  When the slider is on 'local' network activity stays near the activated node, and then peters out.  When the slider is on 'global' activity spreads rapidly through the network, regardless of proximity to the initial activated node.

Notice an intermediate range of slider values that allows 'cliqueishness' but also some nice communication between 'cliques' - small-world. 
