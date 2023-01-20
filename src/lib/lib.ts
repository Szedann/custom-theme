export const loadCSS = async (oldCSS?: string, css?: string) => {
    const tabs = await chrome.tabs.query({ active: true });
    console.log(tabs[0])
    if (oldCSS) {
        await chrome.scripting.removeCSS({
            css: oldCSS,
            target: { tabId: tabs[0].id }
        })
    }
    css ||= (await chrome.storage.local.get())[new URL(tabs[0].url).hostname] || ""
    await chrome.scripting.insertCSS({
        css,
        target: { tabId: tabs[0].id, },
    });
    return css as string
}