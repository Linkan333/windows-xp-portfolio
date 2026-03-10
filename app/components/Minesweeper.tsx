"use client";

import { type MouseEvent, useEffect, useRef, useState } from "react";
import XPTitleBar from "./XPTitleBar";

const WINDOW_WIDTH = 370;
const WINDOW_HEIGHT = 460;
const GRID_SIZE = 9;
const MINE_COUNT = 10;

type GameStatus = "ready" | "playing" | "won" | "lost";

interface MineSweeperProps {
  zIndex: number;
  onBringToFront: () => void;
  onMinimize: () => void;
  onClose: () => void;
}

interface Cell {
  isMine: boolean;
  adjacent: number;
  revealed: boolean;
  flagged: boolean;
  exploded: boolean;
}

function createEmptyBoard(): Cell[][] {
  return Array.from({ length: GRID_SIZE }, () =>
    Array.from({ length: GRID_SIZE }, () => ({
      isMine: false,
      adjacent: 0,
      revealed: false,
      flagged: false,
      exploded: false,
    })),
  );
}

function cloneBoard(board: Cell[][]): Cell[][] {
  return board.map((row) => row.map((cell) => ({ ...cell })));
}

function getNeighbours(row: number, col: number): Array<[number, number]> {
  const neighbours: Array<[number, number]> = [];

  for (let rowDelta = -1; rowDelta <= 1; rowDelta += 1) {
    for (let colDelta = -1; colDelta <= 1; colDelta += 1) {
      if (rowDelta === 0 && colDelta === 0) continue;
      const nextRow = row + rowDelta;
      const nextCol = col + colDelta;
      if (
        nextRow >= 0 &&
        nextRow < GRID_SIZE &&
        nextCol >= 0 &&
        nextCol < GRID_SIZE
      ) {
        neighbours.push([nextRow, nextCol]);
      }
    }
  }

  return neighbours;
}

function createSeededBoard(safeRow: number, safeCol: number): Cell[][] {
  const board = createEmptyBoard();
  const candidates: Array<[number, number]> = [];

  for (let row = 0; row < GRID_SIZE; row += 1) {
    for (let col = 0; col < GRID_SIZE; col += 1) {
      if (row === safeRow && col === safeCol) continue;
      candidates.push([row, col]);
    }
  }

  for (let i = candidates.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [candidates[i], candidates[randomIndex]] = [candidates[randomIndex], candidates[i]];
  }

  for (let mineIndex = 0; mineIndex < MINE_COUNT; mineIndex += 1) {
    const [mineRow, mineCol] = candidates[mineIndex];
    board[mineRow][mineCol].isMine = true;
  }

  for (let row = 0; row < GRID_SIZE; row += 1) {
    for (let col = 0; col < GRID_SIZE; col += 1) {
      if (board[row][col].isMine) continue;
      board[row][col].adjacent = getNeighbours(row, col).filter(
        ([nextRow, nextCol]) => board[nextRow][nextCol].isMine,
      ).length;
    }
  }

  return board;
}

function revealRegion(board: Cell[][], row: number, col: number) {
  const queue: Array<[number, number]> = [[row, col]];

  while (queue.length > 0) {
    const [currentRow, currentCol] = queue.shift()!;
    const currentCell = board[currentRow][currentCol];

    if (currentCell.revealed || currentCell.flagged) continue;
    currentCell.revealed = true;

    if (currentCell.adjacent !== 0) continue;

    for (const [nextRow, nextCol] of getNeighbours(currentRow, currentCol)) {
      const nextCell = board[nextRow][nextCol];
      if (!nextCell.revealed && !nextCell.flagged && !nextCell.isMine) {
        queue.push([nextRow, nextCol]);
      }
    }
  }
}

function revealMines(board: Cell[][], explodedRow: number, explodedCol: number) {
  for (let row = 0; row < GRID_SIZE; row += 1) {
    for (let col = 0; col < GRID_SIZE; col += 1) {
      const cell = board[row][col];
      if (cell.isMine) {
        cell.revealed = true;
      }
      if (row === explodedRow && col === explodedCol) {
        cell.exploded = true;
      }
    }
  }
}

function hasWon(board: Cell[][]): boolean {
  let revealedSafeSquares = 0;

  for (let row = 0; row < GRID_SIZE; row += 1) {
    for (let col = 0; col < GRID_SIZE; col += 1) {
      const cell = board[row][col];
      if (!cell.isMine && cell.revealed) {
        revealedSafeSquares += 1;
      }
    }
  }

  return revealedSafeSquares === GRID_SIZE * GRID_SIZE - MINE_COUNT;
}

function flagAllMines(board: Cell[][]) {
  for (let row = 0; row < GRID_SIZE; row += 1) {
    for (let col = 0; col < GRID_SIZE; col += 1) {
      const cell = board[row][col];
      if (cell.isMine) {
        cell.flagged = true;
      }
    }
  }
}

function formatCounter(value: number): string {
  const clamped = Math.max(-99, Math.min(value, 999));
  if (clamped < 0) {
    return `-${Math.abs(clamped).toString().padStart(2, "0")}`;
  }
  return clamped.toString().padStart(3, "0");
}

const adjacencyColor: Record<number, string> = {
  1: "text-[#0000ff]",
  2: "text-[#008000]",
  3: "text-[#ff0000]",
  4: "text-[#000080]",
  5: "text-[#800000]",
  6: "text-[#008080]",
  7: "text-[#000000]",
  8: "text-[#808080]",
};

export default function MineSweeper({
  zIndex,
  onBringToFront,
  onMinimize,
  onClose,
}: MineSweeperProps) {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [board, setBoard] = useState<Cell[][]>(() => createEmptyBoard());
  const [status, setStatus] = useState<GameStatus>("ready");
  const [elapsed, setElapsed] = useState(0);
  const offset = useRef({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const flagsUsed = board.flat().filter((cell) => cell.flagged).length;
  const minesLeft = MINE_COUNT - flagsUsed;

  const handleTitleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (position === null && windowRef.current) {
      const rect = windowRef.current.getBoundingClientRect();
      setPosition({ x: rect.left, y: rect.top });
      offset.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
      setDragging(true);
      return;
    }

    if (!position) return;

    setDragging(true);
    offset.current = {
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    };
  };

  useEffect(() => {
    if (!dragging) return;

    const handleMouseMove = (event: globalThis.MouseEvent) => {
      setPosition({
        x: event.clientX - offset.current.x,
        y: event.clientY - offset.current.y,
      });
    };

    const handleMouseUp = () => {
      setDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  useEffect(() => {
    document.body.classList.toggle("xp-cursor-dragging", dragging);

    return () => {
      document.body.classList.remove("xp-cursor-dragging");
    };
  }, [dragging]);

  useEffect(() => {
    if (status !== "playing") return;

    const intervalId = window.setInterval(() => {
      setElapsed((current) => Math.min(current + 1, 999));
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [status]);

  const resetGame = () => {
    setBoard(createEmptyBoard());
    setStatus("ready");
    setElapsed(0);
  };

  const handleReveal = (row: number, col: number) => {
    if (status === "won" || status === "lost") return;

    let nextStatus: GameStatus = status;

    setBoard((previousBoard) => {
      let nextBoard = cloneBoard(previousBoard);
      const clickedCell = nextBoard[row][col];

      if (clickedCell.revealed || clickedCell.flagged) return previousBoard;

      if (status === "ready") {
        nextBoard = createSeededBoard(row, col);
        nextStatus = "playing";
      }

      if (nextBoard[row][col].isMine) {
        revealMines(nextBoard, row, col);
        nextStatus = "lost";
        return nextBoard;
      }

      revealRegion(nextBoard, row, col);

      if (hasWon(nextBoard)) {
        flagAllMines(nextBoard);
        nextStatus = "won";
      }

      return nextBoard;
    });

    if (nextStatus !== status) {
      setStatus(nextStatus);
    }
  };

  const handleToggleFlag = (row: number, col: number) => {
    if (status === "won" || status === "lost") return;

    setBoard((previousBoard) => {
      const nextBoard = cloneBoard(previousBoard);
      const targetCell = nextBoard[row][col];

      if (targetCell.revealed) return previousBoard;

      targetCell.flagged = !targetCell.flagged;
      return nextBoard;
    });
  };

  const windowStyle = position
    ? {
        left: position.x,
        top: position.y,
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT,
        zIndex,
      }
    : { width: WINDOW_WIDTH, height: WINDOW_HEIGHT, zIndex };

  const smiley =
    status === "lost" ? "😵" : status === "won" ? "😎" : status === "playing" ? "🙂" : "😀";

  return (
    <div
      ref={windowRef}
      className={`absolute ${
        position === null ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" : ""
      }`}
      style={windowStyle}
      onMouseDown={onBringToFront}
    >
      <div className="flex h-full w-full flex-col rounded-[8px] border-[3px] border-t-white border-l-white border-r-[#7b7b7b] border-b-[#7b7b7b] bg-[#c0c0c0] p-[3px] select-none">
        <XPTitleBar
          title="Minesweeper"
          onMouseDown={handleTitleMouseDown}
          iconSrc="/images/minesweeper.ico"
          iconAlt="Minesweeper icon"
          onMinimize={onMinimize}
          onClose={onClose}
        />

        <div className="h-7 border-b border-[#7b7b7b] bg-[#d4d0c8] px-2 text-sm">
          <div className="flex h-full items-center gap-4">
            <span className="cursor-default hover:underline">Game</span>
            <span className="cursor-default hover:underline">Help</span>
          </div>
        </div>

        <div className="border-2 border-t-[#7b7b7b] border-l-[#7b7b7b] border-r-white border-b-white bg-[#c0c0c0] p-2">
          <div className="mb-2 flex items-center justify-between border-2 border-t-[#7b7b7b] border-l-[#7b7b7b] border-r-white border-b-white bg-[#c0c0c0] p-2">
            <div className="min-w-[56px] bg-black px-2 py-1 text-center font-mono text-xl tracking-[0.08em] text-[#ff2a2a]">
              {formatCounter(minesLeft)}
            </div>

            <button
              type="button"
              onClick={resetGame}
              className="h-9 w-9 border-2 border-t-white border-l-white border-r-[#7b7b7b] border-b-[#7b7b7b] bg-[#d4d0c8] text-xl active:border-t-[#7b7b7b] active:border-l-[#7b7b7b] active:border-r-white active:border-b-white"
              aria-label="Reset Minesweeper"
            >
              {smiley}
            </button>

            <div className="min-w-[56px] bg-black px-2 py-1 text-center font-mono text-xl tracking-[0.08em] text-[#ff2a2a]">
              {formatCounter(elapsed)}
            </div>
          </div>

          <div className="grid grid-cols-9 border-2 border-t-[#7b7b7b] border-l-[#7b7b7b] border-r-white border-b-white bg-[#7b7b7b] p-[2px]">
            {board.map((row, rowIndex) =>
              row.map((cell, colIndex) => {
                const content = cell.flagged
                  ? "🚩"
                  : cell.revealed
                    ? cell.isMine
                      ? "💣"
                      : cell.adjacent > 0
                        ? cell.adjacent
                        : ""
                    : "";

                return (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    type="button"
                    onClick={() => handleReveal(rowIndex, colIndex)}
                    onContextMenu={(event) => {
                      event.preventDefault();
                      handleToggleFlag(rowIndex, colIndex);
                    }}
                    className={`h-7 w-7 text-[15px] font-bold leading-none ${
                      cell.revealed
                        ? `border border-[#a9a9a9] bg-[#d4d0c8] ${
                            cell.exploded ? "bg-[#ff6f6f]" : ""
                          } ${adjacencyColor[cell.adjacent] ?? "text-black"}`
                        : "border-2 border-t-white border-l-white border-r-[#7b7b7b] border-b-[#7b7b7b] bg-[#d4d0c8]"
                    }`}
                    aria-label={`Cell ${rowIndex + 1}-${colIndex + 1}`}
                  >
                    {content}
                  </button>
                );
              }),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
