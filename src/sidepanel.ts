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

  const saveBtn = document.getElementById('btn-save');
  saveBtn?.addEventListener('click', async () => {
      const key = await getProblemKey();
      
      // Get drawing as SVG string
      const svgString = editor.toSVG().outerHTML; 
      
      // Save svg to chrome's local data storage
      await chrome.storage.local.set({ [key]: svgString });
      
      console.log("Saved note for:", key);
  });

  const loadBtn = document.getElementById('btn-load');
  loadBtn?.addEventListener('click', async () => {
      const key = await getProblemKey();
      
      // Chrome data for URL
      const result = await chrome.storage.local.get(key);
      const savedSvgString = result[key];
      
      // Load the saved note if found
      if (savedSvgString) {
          editor.loadFromSVG(savedSvgString); 
          console.log("Loaded note for:", key);
      } else {
          console.log("No saved note found for this problem.");
      }
  });
});


// Gets chrome's active tab's path (to store svg to each problem)
async function getProblemKey(): Promise<string> {
    const tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    const activeTab = tabs[0];
    
    if (activeTab && activeTab.url) {
        const url = new URL(activeTab.url);
        
        // Regex looks for "/problems/" and gets the text that comes next stopping at the next /
        const match = url.pathname.match(/\/problems\/([^/]+)/);
        
        if (match && match[1]) {
            return match[1];
        }
    }
    return "default-note";
}