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
const inputFileUpload: HTMLInputElement = selectQuery("input");

const labelDropzone: HTMLLabelElement = selectQuery("label");

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
  } catch (fileDropError) {
    error("File drop error:", { fileDropError });
    addClass(labelDropzone, "invalid-drop");
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
  } catch (fileUploadError) {
    error("File upload error:", { fileUploadError });
    removeClass(labelDropzone, "dragging");
  }
}
