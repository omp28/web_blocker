chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    const extensionEnabled = true;
    chrome.storage.sync.get(["blocklist"], (result) => {
      const blocklist = result.blocklist || [];
      const blocked = blocklist.some((blockedUrl) =>
        changeInfo.url.includes(blockedUrl)
      );
      chrome.storage.sync.get(["isactive_state"], (result) => {
        extensionEnabled = result.isactive_state;
        console.log("Extension enabled: ", extensionEnabled);
      });
      if (blocked && extensionEnabled) {
      }
    });
  }
});
