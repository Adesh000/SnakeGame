import {Coordinate} from '../types/types';

export const checkGameOver = (
  snakeHead: Coordinate,
  boundaries: any,
): boolean => {
  return (
    snakeHead.x < boundaries.xMin ||
    snakeHead.x > boundaries.xMax ||
    snakeHead.y < boundaries.yMin ||
    snakeHead.y > boundaries.yMax
  );
};

export const checkSnakeOverlap = (
  snakeHead: Coordinate,
  snake: Coordinate[],
) => {
  return snake
    .slice(1)
    .some(cell => cell.x === snakeHead.x && cell.y === snakeHead.y);
};
