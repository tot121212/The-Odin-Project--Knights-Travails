# Knight's Travails

A JavaScript implementation of a pathfinding algorithm that calculates the shortest sequence of moves for a knight on a chessboard of arbitrary size.

## Project Overview

This project simulates the movement of a knight on an `n x n` chessboard using graph traversal. It builds a graph where each square is a node, and valid knight moves form the edges. The algorithm uses breadth-first search (BFS) to find the shortest path from a starting square to a target square.

## Features

- Dynamically generates a chessboard of any size
- Each square is represented as a node with adjacency references to valid knight moves
- Implements BFS to determine the shortest path between two squares
- Structured using ES6 classes with clean, modular logic
- Includes console output for board visualization and debugging

## How to Run

1. Clone the repository:

```bash
git clone https://github.com/your-username/knights-travails.git
cd knights-travails
node main.js
