import {Coordinate} from '../types/types';

export const checkEatsFood = (
  head: Coordinate,
  food: Coordinate,
  area: number,
): boolean => {
  const distanceX: number = Math.abs(head.x - food.x);
  const distanceY: number = Math.abs(head.y - food.y);

  return distanceX < area && distanceY < area;
};
