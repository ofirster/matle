import chess
import json
import os

boards=[]
files=['matle/blitz_mate_games.json','matle/bullet_mate_games.json','matle/classical_mate_games.json']
for file in files:
    f = open(file)
    data= json.load(f)
    for game in data:

    # Example for the first game
        moves = game["Moves"]

        # Create a new board
        board = chess.Board()

        # Apply each move
        for move in moves.split():
            if '.' in move:
                continue
            board.push_san(move)

        # Print final board state
        boards.append(str(board))
     


with open('boards.json', 'w') as f:
    json.dump(boards, f)