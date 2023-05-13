import { get2DContext } from "../../functions/canvas.functions";
import { PixelParticle } from "../particles/pixel-particle.class";

export class PixelEffect {
  private particlesArray: PixelParticle[];
  private pixelsData;

  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  imageElement: HTMLImageElement;

  constructor(canvas: HTMLCanvasElement, imageElement: HTMLImageElement) {
    this.canvas = canvas;
    this.context = get2DContext(canvas);

    this.particlesArray = [];
    this.imageElement = imageElement;

    this.pixelsData = this.context.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }

  createImage() {
    this.context.drawImage(this.imageElement, 0, 0);
  }

  animatePixels() {
    for (const particle of this.particlesArray) {
      particle.update();
      particle.draw();
    }
  }

  private convertToPixels(cellSize = 1) {
    for (let y = 0; y < this.pixelsData.height; y += cellSize) {
      for (let x = 0; x < this.pixelsData.width; x += cellSize) {
        const pixelPosX = x * 4;
        const pixelPosY = y * 4;
        const pixelIndex = pixelPosX + pixelPosY * this.pixelsData.width;

        const alpha = this.pixelsData.data[pixelIndex + 3];

        const isTransparent = alpha <= 0;
        if (isTransparent) {
          continue;
        }
        // Accessing pixel values
        const red = this.pixelsData.data[pixelIndex + 0];
        const green = this.pixelsData.data[pixelIndex + 1];
        const blue = this.pixelsData.data[pixelIndex + 2];

        //We get an approximate value of the brightness of the pixel
        const averageColorBrightness = red + green + blue / 3;
        const color = `rgb(${red}, ${green}, ${blue})`;

        // const pixelParticle = new PixelParticle(
        //   this.context,
        //   this.canvas.width,
        //   this.canvas.height,
        //   x,
        //   y,
        //   color,
        //   cellSize
        // );

        // this.particlesArray.push(pixelParticle);
      }
    }
  }
}
