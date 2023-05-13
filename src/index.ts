import { setCanvasSize } from "./utils/functions/canvas.functions";
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

log("Hello world!");
const inputFileUpload: HTMLInputElement = selectQuery(".index__input");

const labelDropzone: HTMLLabelElement = selectQuery(".index__label");

const imageToDraw: HTMLImageElement = selectQuery(".index__image");
const imageMetrics = {
  width: 0,
  height: 0,
  aspectRatio: 0,
};

const canvas: HTMLCanvasElement = selectQuery(".index__canvas");

inputFileUpload.addEventListener("change", handleFileUpload);

labelDropzone.addEventListener("dragover", handleDragOver);
labelDropzone.addEventListener("dragleave", handleDragLeave);
labelDropzone.addEventListener("drop", handleFileDrop);

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
    const base64String = await fileToBase64String(fileDropped);
    setImageSource(base64String);
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
    //@ts-ignore
    const base64String = await fileToBase64String(fileUploaded);
    setImageSource(base64String);
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
 * @returns {void} A promise that resolves when the image is loaded and the width and height are logged
 */
function setImageSource(base64String: string): void {
  imageToDraw.src = base64String;

  imageToDraw.addEventListener("load", setCanvasSizeToImage);
}

/**
 * Sets the size of the canvas to match the dimensions of the given image
 *
 * @param {Event} event - The event object
 *
 * @returns {void} Returns nothing
 */
function setCanvasSizeToImage(event: Event): void {
  //@ts-ignore
  const { width, height } = event.currentTarget;
  imageMetrics.width = width;
  imageMetrics.height = height;

  imageMetrics.aspectRatio = width / height;

  setCanvasSize(canvas, imageMetrics.width, imageMetrics.height);
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
