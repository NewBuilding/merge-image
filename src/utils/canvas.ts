import { round } from 'lodash'

export const createCanvas = (
  width: number,
  height: number,
): HTMLCanvasElement => {
  const canvas = document.createElement('canvas')
  canvas.height = round(height)
  canvas.width = round(width)
  return canvas
}
