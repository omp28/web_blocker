import React, { useState, useEffect } from "react";

const Popup = () => {
  const [blocklist, setBlocklist] = useState([]);
  const [newUrl, setNewUrl] = useState("");

  useEffect(() => {
    chrome.storage.sync.get(["blocklist"], (result) => {
      setBlocklist(result.blocklist || []);
    });
  }, []);

  const addUrl = () => {
    const updatedBlocklist = [...blocklist, newUrl];
    chrome.storage.sync.set({ blocklist: updatedBlocklist }, () => {
      setBlocklist(updatedBlocklist);
      setNewUrl("");
    });
  };

  const removeUrl = (url) => {
    const updatedBlocklist = blocklist.filter((item) => item !== url);
    chrome.storage.sync.set({ blocklist: updatedBlocklist }, () => {
      setBlocklist(updatedBlocklist);
    });
  };

  return (
    <div>
      <h1>Website Blocker</h1>
      <input
        type="text"
        value={newUrl}
        onChange={(e) => setNewUrl(e.target.value)}
        placeholder="Add new URL"
      />
      <button onClick={addUrl}>Add</button>
      <ul>
        {blocklist.map((url, index) => (
          <li key={index}>
            {url}
            <button onClick={() => removeUrl(url)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Popup;
