chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    chrome.storage.sync.get(["blocklist"], (result) => {
      const blocklist = result.blocklist || [];
      const blocked = blocklist.some((blockedUrl) =>
        changeInfo.url.includes(blockedUrl)
      );
      if (blocked) {
        chrome.tabs.update(tabId, {
          url: chrome.runtime.getURL("blocked.html"),
        });
      }
    });
  }
});
