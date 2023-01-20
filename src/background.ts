import { loadCSS } from "./lib/lib"

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    await loadCSS()
    chrome.storage.local.onChanged.addListener(async (changes) => {
        console.log(changes)
        const hostname = new URL(tab.url).hostname
        if (changes[hostname]) await loadCSS(changes[hostname].oldValue, changes[hostname].newValue)
    })
})