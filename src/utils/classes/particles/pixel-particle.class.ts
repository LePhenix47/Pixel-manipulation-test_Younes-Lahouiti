/**
 * A class that represents a single pixel in the PixelEffect animation.
 *
 * @class
 */
export class PixelParticle {
  /**
   * The canvas rendering context used to draw the particle.
   */
  context: CanvasRenderingContext2D;
  /**
   * The width of the canvas.
   */
  width: number;
  /**
   * The height of the canvas.
   */
  height: number;
  /**
   * The x-coordinate of the pixel in the original image.
   */
  originX: number;
  /**
   * The y-coordinate of the pixel in the original image.
   */
  originY: number;
  /**
   * The color of the pixel.
   */
  color: string;
  /**
   * The current x-coordinate of the particle.
   */
  x: number;
  /**
   * The current y-coordinate of the particle.
   */
  y: number;
  /**
   * The distance between the particle and its nearest neighbor.
   */
  gap: number;
  /**
   * The size of the particle.
   */
  size: number;
  /**
   * The current velocity of the particle along the x-axis.
   */
  vectorX: number;
  /**
   * The current velocity of the particle along the y-axis.
   */
  vectorY: number;
  /**
   * The distance between the particle and the mouse along the x-axis.
   */
  mouseParticleDistanceX: number;
  /**
   * The distance between the particle and the mouse along the y-axis.
   */
  mouseParticleDistanceY: number;
  /**
   * The total distance between the particle and the mouse.
   */
  mouseTotalDistance: number;
  /**
   * The force applied to the particle when it is near the mouse.
   */
  force: number;
  /**
   * The angle between the particle and the mouse.
   */
  angle: number;
  /**
   * The friction applied to the particle's velocity.
   */
  friction: number;
  /**
   * The ease applied to the particle's movement.
   */
  ease: number;

  /**
   * @param {CanvasRenderingContext2D} context - The canvas rendering context used to draw the particle.
   * @param {number} width - The width of the canvas.
   * @param {number} height - The height of the canvas.
   * @param {number} pixelX - The x-coordinate of the pixel in the original image.
   * @param {number} pixelY - The y-coordinate of the pixel in the original image.
   * @param {string} pixelColor - The color of the pixel.
   * @param {number} pixelSize - The size of the pixel.
   * @param {number} [pixelGap=0] - The distance between the pixel and its nearest neighbor.
   */
  constructor(
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
    pixelX: number,
    pixelY: number,
    pixelColor: string,
    pixelSize: number,
    pixelGap: number = 0
  ) {
    this.context = context;
    this.width = width;
    this.height = height;

    this.originX = pixelX;
    this.originY = pixelY;
    this.color = pixelColor;

    this.x = Math.random() * this.width;
    this.y = Math.random() * this.height;

    this.gap = pixelGap;

    this.size = pixelSize - this.gap;

    this.vectorX = 0;
    this.vectorY = 0;

    this.mouseParticleDistanceX = 0;
    this.mouseParticleDistanceY = 0;
    this.mouseTotalDistance = 0;

    this.force = 0;
    this.angle = 0;

    this.friction = Math.random() * 0.6 + 0.15;
    this.ease = Math.random() * 0.2 + 0.05;
  }

  update() {
    this.x += this.vectorX + (this.originX - this.x) * this.ease;
    this.y += this.vectorY + (this.originY - this.y) * this.ease;
  }

  draw() {
    this.context.fillStyle = this.color;
    this.context.fillRect(this.x, this.y, this.size, this.size);
  }
}
