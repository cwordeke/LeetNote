"use strict";
// Allow sidepanel to open when extension is clicked
if (chrome.sidePanel?.setPanelBehavior) {
    const result = chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
    if (result?.catch) {
        result.catch((error) => console.error(error));
    }
}
