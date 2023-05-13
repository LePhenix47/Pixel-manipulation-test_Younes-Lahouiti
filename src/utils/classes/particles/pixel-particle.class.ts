export class PixelParticle {
  context: any;
  width: any;
  height: any;
  originX: any;
  originY: any;
  color: any;
  x: number;
  y: number;
  gap: number;
  size: number;
  vectorX: number;
  vectorY: number;
  mouseParticleDistanceX: number;
  mouseParticleDistanceY: number;
  mouseTotalDistance: number;
  force: number;
  angle: number;
  friction: number;
  ease: number;
  constructor(
    context,
    width,
    height,
    pixelX,
    pixelY,
    pixelColor,
    pixelSize,
    pixelGap = 0
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

  update() {}

  draw() {}
}
