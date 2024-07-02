chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    chrome.storage.sync.get(["blocklist"], (result) => {
      const blocklist = result.blocklist || [];
      var extensionEnabled = true;
      chrome.storage.sync.get(["isactive_state"], (result1) => {
        extensionEnabled = result1.isactive_state;
        const blocked = blocklist.some((blockedUrl) =>
          changeInfo.url.includes(blockedUrl)
        );
        console.log("URL: ", changeInfo.url);
        console.log("Blocked: ", blocked);
        console.log(result1);
        console.log("Extension enabled: ", extensionEnabled);
        console.log(blocklist);
        if (blocked && extensionEnabled) {
          chrome.tabs.update(tabId, { url: "blocked.html" });
        }
      });
    });
  }
});
