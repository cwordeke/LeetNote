import { Editor } from "js-draw";
import "js-draw/bundledStyles";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("editor-container");

  if (!container) {
    console.error("Could not find editor-container");
    return;
  }

  container.style.width = "100vw";
  container.style.height = "100vh";

  const editor = new Editor(container);

  editor.addToolbar();
});