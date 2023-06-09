import { PixelEffect } from "./utils/classes/effects/pixel-effect.class";
import {
  clearOldPaint,
  get2DContext,
  setCanvasSize,
} from "./utils/functions/canvas.functions";
import { error, log } from "./utils/functions/console.functions";
import {
  addClass,
  removeClass,
  selectQuery,
  selectQueryAll,
} from "./utils/functions/dom.functions";
import {
  checkFileType,
  fileToBase64String,
  getInputFiles,
  getTranferedFiles,
} from "./utils/functions/file.functions";
import { formatSignificantDigitsNumber } from "./utils/functions/internalization.functions";

const mouseInfos: Map<string, number> = new Map();
mouseInfos.set("x", 0);
mouseInfos.set("y", 0);
mouseInfos.set("radius", 20_000);

document.addEventListener("mousemove", setMouseCoords);

log("Hello world!");
const inputFileUpload: HTMLInputElement = selectQuery(".index__input");
inputFileUpload.addEventListener("change", handleFileUpload);

const labelDropzone: HTMLLabelElement = selectQuery(".index__label");

labelDropzone.addEventListener("dragover", handleDragOver);
labelDropzone.addEventListener("dragleave", handleDragLeave);
labelDropzone.addEventListener("drop", handleFileDrop);

const imageElement: HTMLImageElement = selectQuery(".index__image");
let imageMetrics = {
  width: 0,
  height: 0,
  aspectRatio: 0,
};

const main: HTMLElement = selectQuery("main");
const controlsSection: HTMLElement = selectQuery(".index__controls");

const deleteButton: HTMLButtonElement = selectQuery(".index__delete-button");
deleteButton.addEventListener("click", resetDropzone);

const inputRangePixelResolution: HTMLInputElement =
  selectQuery("#pixel-resolution");
const labelPixelResolution: HTMLLabelElement = selectQuery(
  "label[for=pixel-resolution]"
);

const inputRangeMouseRadius: HTMLInputElement = selectQuery("#mouse-radius");
const labelMouseRadius: HTMLLabelElement = selectQuery(
  "label[for=mouse-radius]"
);

inputRangePixelResolution.addEventListener("input", setImageResToInputValue);
inputRangeMouseRadius.addEventListener("input", setMouseRadius);

log(
  inputRangeMouseRadius,
  labelPixelResolution,
  inputRangePixelResolution,
  labelMouseRadius
);

const canvas: HTMLCanvasElement = selectQuery(".index__canvas");
const context: CanvasRenderingContext2D = get2DContext(canvas);

let animationId: number = 0;

/**
 * Updates the dropzone highlight effect when dragging over the dropzone
 * @param {DragEvent} event - The dragover event
 */
function handleDragOver(event: DragEvent): void {
  event.preventDefault();

  removeDropzoneStateClasses();
  addClass(labelDropzone, "dragging");
}

/**
 * Event listener for drag leave events.
 *
 * @param {DragEvent} event - The drag event.
 */
function handleDragLeave(event: DragEvent): void {
  event.preventDefault();

  removeDropzoneStateClasses();
  removeClass(labelDropzone, "dragging");
}

/**
 * Handles the file drop event
 *
 * @param {DragEvent} event - The drag event object
 *
 * @returns {Promise<void>} A promise that resolves when the file drop is handled
 */

async function handleFileDrop(event: DragEvent): Promise<void> {
  event.preventDefault();
  log(event);
  removeDropzoneStateClasses();
  try {
    //@ts-ignore
    const fileDropped: File = await getTranferedFiles(event);

    const isNotAFile: boolean = !fileDropped;
    if (isNotAFile) {
      addClass(labelDropzone, "invalid-drop");
      throw "Data dropped is not a file!";
    }
    //@ts-ignore
    const isNotAnImage: boolean = !checkFileType(fileDropped, "image");
    if (isNotAnImage) {
      addClass(labelDropzone, "invalid-img-drop");
      throw "File dropped is not an image!";
    }
    log(fileDropped);
    const base64String: string = await fileToBase64String(fileDropped);
    await setImageSource(base64String);
    hideDropzone();
    showDeleteButton();
    showControlInputs();
    animate();
    showCanvas();
  } catch (fileDropError) {
    error("File drop error:", { fileDropError });
    addClass(labelDropzone, "invalid-drop");
  } finally {
    removeClass(labelDropzone, "dragging");
  }
}

function removeDropzoneStateClasses() {
  removeClass(labelDropzone, "invalid-drop");
  removeClass(labelDropzone, "invalid-img-drop");
  removeClass(labelDropzone, "invalid-img-upload");
}

/**
 * Handles the file upload event
 *
 * @param {Event} event - The event object
 *
 * @returns {Promise<void>} A promise that resolves when the file upload is handled
 */
async function handleFileUpload(event: Event): Promise<void> {
  removeDropzoneStateClasses();
  try {
    //@ts-ignore
    const inputElement: HTMLInputElement = event.currentTarget;
    //@ts-ignore
    const fileUploaded: File = await getInputFiles(inputElement);

    //@ts-ignore
    const isNotAnImage: boolean = !checkFileType(fileUploaded, "image");
    if (isNotAnImage) {
      addClass(labelDropzone, "invalid-img-upload");
      throw "File uploaded is not an image!";
    }

    const base64String: string = await fileToBase64String(fileUploaded);
    await setImageSource(base64String);
    hideDropzone();
    showDeleteButton();
    showControlInputs();
    animate();
    showCanvas();
  } catch (fileUploadError) {
    error("File upload error:", { fileUploadError });
  } finally {
    removeClass(labelDropzone, "dragging");
  }
}

/**
 * Sets the base64 string as the source of the image and logs its width and height when it finishes loading
 *
 * @param {string} base64String - The base64 encoded image string
 *
 * @returns {Promise<void>} A promise that resolves when the image is loaded and the width and height are logged
 */
async function setImageSource(base64String: string): Promise<void> {
  imageElement.src = base64String;

  imageElement.addEventListener("load", setCanvasSizeToImage);
}

let effectHandler = new PixelEffect(canvas, imageElement);

/**
 * Sets the size of the canvas to match the dimensions of the given image
 *
 * @param {Event} event - The event object
 *
 * @returns {void} Returns nothing
 */
function setCanvasSizeToImage(event: Event): void {
  //@ts-ignore
  const { width, height }: HTMLImageElement = event.currentTarget;

  imageMetrics.width = width;
  imageMetrics.height = height;

  imageMetrics.aspectRatio = width / height;

  const overflows: boolean =
    main.clientWidth < width || main.clientHeight < height;
  if (overflows) {
    log("Overflows!");
    //Add logic here to resize the imageMetrics
    setCanvasSize(canvas, imageMetrics.width, imageMetrics.height);
  } else {
    setCanvasSize(canvas, imageMetrics.width, imageMetrics.height);
  }
  createImageOnCanvas(13);
  log(effectHandler);
}

/**
 * Function that shows the input controls
 *
 * @returns {void}
 */
function showControlInputs(): void {
  removeClass(controlsSection, "hide");
}

/**
 * Function that hides the input controls
 *
 * @returns {void}
 */
function hideControlInputs(): void {
  addClass(controlsSection, "hide");
}

/**
 * Creates an image on a canvas with the specified pixel resolution
 * by calling the `.createImage()` of the effect handler
 *
 * @param {number} [pixelResolution=1] - The pixel resolution of the canvas.
 * @returns {void}
 */
function createImageOnCanvas(pixelResolution: number = 1): void {
  effectHandler.createImage(pixelResolution);
}

window.addEventListener("resize", handleWindowResize);

/**
 * Event listener for window resize events.
 *
 * @param {Event} event - The event object
 *
 * @returns {void} Returns nothing
 */
function handleWindowResize(event: Event): void {
  log("changed width");
}

/**
 * Hides the dropzone element by adding the "hide" class and removing the "dragging" class.
 *
 *  @returns {void}
 */
function hideDropzone(): void {
  removeClass(labelDropzone, "dragging");
  addClass(labelDropzone, "hide");
}

function setMouseCoords(event: MouseEvent) {
  mouseInfos.set("x", event.x);
  mouseInfos.set("y", event.y);
  // log(mouseInfos);
}
/**
 * Shows the dropzone element by removing the "hide" class.
 *
 *  @returns {void}
 */
function showDropzone(): void {
  removeClass(labelDropzone, "hide");
}

/**
 * Resets the dropzone element and related canvas by clearing old paint, setting canvas size to 0, clearing the image src, and hiding the delete button element.
 * Finally, it shows the dropzone element.
 *
 *  @returns {void}
 */
function resetDropzone(): void {
  clearOldPaint(context, canvas.width, canvas.height);

  imageElement.src = "";

  inputFileUpload.value = "";

  hideDeleteButton();

  cancelAnimation();

  hideControlInputs();

  imageMetrics = {
    width: 0,
    height: 0,
    aspectRatio: 0,
  };

  setCanvasSize(canvas, 0, 0);

  showDropzone();
}

/**
 * Shows the delete button element by removing the "hide" class.
 *
 *  @returns {void}
 */
function showDeleteButton(): void {
  removeClass(deleteButton, "hide");
}

/**
 * Hides the delete button element by adding the "hide" class.
 *
 *  @returns {void}
 */
function hideDeleteButton(): void {
  addClass(deleteButton, "hide");
}

/**
 * Shows the canvas
 *
 * @returns {void}
 */
function showCanvas(): void {
  removeClass(canvas, "hide");
}

/**
 * Hides the canvas
 *
 * @returns {void}
 */
function hideCanvas(): void {
  addClass(canvas, "hide");
}

/**
 * Animates the pixels on the canvas using the effect handler and requestAnimationFrame.
 *
 *  @returns {void}
 */
function animate(): void {
  //We remove old paint
  clearOldPaint(context, canvas.width, canvas.height);

  //Insert effect here
  effectHandler.animatePixels(
    mouseInfos.get("x"),
    mouseInfos.get("y"),
    mouseInfos.get("radius")
  );

  //We create our animation loop and set the animation ID
  // in case we need to cancel the animation
  animationId = requestAnimationFrame(animate);
}

/**
 * Cancels the animation frame request with the provided animation ID, hides the canvas
 * and resets the particles array
 *
 *  @returns {void}
 */
function cancelAnimation(): void {
  cancelOnlyTheAnimation();
  effectHandler.reset();
  hideCanvas();
}

/**
 * Function that only cancels the animation on the canvas without resetting anything else
 *
 *  @returns {void}
 */
function cancelOnlyTheAnimation(): void {
  cancelAnimationFrame(animationId);
}

/**
 * Sets the image resolution to the canvas
 *
 * @param {InputEvent} event - Event on the input
 */
function setImageResToInputValue(event: InputEvent) {
  clearOldPaint(context, canvas.width, canvas.height);
  //@ts-ignore
  const inputValue: number = Number(event.target.value);
  labelPixelResolution.textContent = `Pixel resolution: ${inputValue}px`;

  log("change", inputValue);
  cancelOnlyTheAnimation();
  effectHandler.reset();

  effectHandler.createImage(inputValue);
  animate();
}
function setMouseRadius(event: InputEvent) {
  //@ts-ignore
  const inputValue: number = Number(event.target.value) * 1_000;

  const formattedInputValue: string = formatSignificantDigitsNumber(inputValue);
  labelMouseRadius.textContent = `Mouse radius: ${formattedInputValue}`;

  mouseInfos.set("radius", inputValue);
}
