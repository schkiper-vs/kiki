// src/types.ts

// Позиция (координаты X/Y)
export type Position = {
  x: number;
  y: number;
};

// Размер (ширина и высота)
export type Size = {
  width: number;
  height: number;
};

// Общая конфигурация позиции и размера
export type WindowSettings = {
  position: Position;
  size: Size;
};