# PokerCalculator

A full-stack MERN web application for calculating chip values and distributing poker game winnings.

## Features

- Support for 2-8 players
- Chip value calculation system (white: 10, blue: 25, red: 50, green: 100, black: 1000 points)
- Two payout methods:
  - Percentage-based (proportional to chip value)
  - Fixed split (50% first, 30% second, 20% third)
- Real-time chip value calculations
- Responsive design for desktop and mobile
- Input validation and error handling

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd PokerCalculator
```

2. Install all dependencies:
```bash
npm run install-all
```

This will install dependencies for both the server and client.

### Running the Application

To run both the server and client concurrently:

```bash
npm run dev
```

Or run them separately:

**Server only:**
```bash
npm run server
```

**Client only:**
```bash
npm run client
```

### Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Usage

1. **Set up the game:**
   - Select the number of players (2-8)
   - Enter the total pot amount
   - Choose the payout method

2. **Enter player information:**
   - Enter each player's name
   - Input their chip counts for each color

3. **Calculate results:**
   - Click "Calculate Payouts" to see the distribution
   - View rankings and payout amounts
   - Click "New Game" to start over

## Project Structure

```
poker-calculator/
├── client/          # React frontend
├── server/          # Express backend
├── package.json     # Root package file
└── README.md        # This file
```

## API Endpoints

- `POST /api/calculate` - Calculate payouts based on player data
- `GET /health` - Health check endpoint
