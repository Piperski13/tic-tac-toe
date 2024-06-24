# Tic-Tac-Toe Project

This project is a Tic-Tac-Toe game built using HTML, CSS, JavaScript, Node.js, and Express.js.

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Description

The Tic-Tac-Toe Project is a web application that allows users to play the classic Tic-Tac-Toe game. The application has the following features:

- **Main Game Route:** The root route (`/` or `http://localhost:3000/`) loads the game page and fetches data from the server using a GET request to `/options`.
- **Player Route:** A GET request to `/player` to fetch the current player's information.
- **Save Player Move:** A POST request to `/player` saves the current player's move after each turn.
- **Save Game State:** A POST request to `/options` saves the current game board to the server.

## Installation

To set up and run this project locally, follow these steps:

1. **Clone the repository:**
   `git clone https://github.com/username/tic-tac-toe-project.git`
2. **Navigate to the project directory:**
   `tic-tac-toe-project`
3. **Install the dependencies:**
   `npm install`
4. **Start the Node.js server:**
   `node server.js`
**The application will be running at http://localhost:3000.**

## Usage

### Main Game Route
Load the root route at [http://localhost:3000/](http://localhost:3000/) to start the game. This route fetches game data from the server using a GET request to `/options` and renders the game page by calling the render function, which also makes a GET request to load the player's move from the server.

### Player Route
Visit [http://localhost:3000/player](http://localhost:3000/player) to fetch the current player's information using a GET request.

### Save Player Move
The application saves the current player's move after each turn using a POST request to `/player`.

### Save Game State
The current game board is saved to the server using a POST request to `/options`.

## API Endpoints

### GET /options
Fetches the game options data from the server.

### GET /player
Fetches the current player's information from the server.

### POST /player
Saves the current player's move to the server.

### POST /options
Saves the current game board to the server.

