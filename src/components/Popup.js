import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

const Popup = () => {
  const [blocklist, setBlocklist] = useState([]);
  const [newUrl, setNewUrl] = useState("");
  const [isExtensionEnabled, setIsExtensionEnabled] = useState(true);

  useEffect(() => {
    chrome.storage.sync.get(["blocklist"], (result) => {
      setBlocklist(result.blocklist || []);
    });
    chrome.storage.sync.get(["isactive_state"], (result) => {
      setIsExtensionEnabled(
        result.isactive_state !== undefined ? result.isactive_state : true
      );
    });
  }, []);

  const addUrlToBlocklist = () => {
    if (newUrl.trim() === "") return;
    const updatedBlocklist = [...blocklist, newUrl.trim()];
    chrome.storage.sync.set({ blocklist: updatedBlocklist }, () => {
      setBlocklist(updatedBlocklist);
      setNewUrl("");
    });
  };

  const removeUrlFromBlocklist = (url) => {
    const updatedBlocklist = blocklist.filter((item) => item !== url);
    chrome.storage.sync.set({ blocklist: updatedBlocklist }, () => {
      setBlocklist(updatedBlocklist);
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addUrlToBlocklist();
    }
  };

  const toggleExtension = () => {
    chrome.storage.sync.set({ isactive_state: !isExtensionEnabled }, () => {
      setIsExtensionEnabled(!isExtensionEnabled);
    });
  };

  return (
    <div className="px-8 py-4 bg-white rounded-lg shadow-lg w-48">
      <h1 className="text-xl font-bold mb-4 text-center">Website Blocker</h1>
      <div className="mb-4">
        <input
          type="text"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          className="p-2 border border-gray-300 rounded w-full mb-2 focus:outline-none focus:border-blue-500"
          placeholder="Add a URL to block"
        />
        <button
          onClick={addUrlToBlocklist}
          className="w-full flex justify-center items-center bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors duration-200"
        >
          Add <IoMdAdd size={20} className="inline ml-2" />
        </button>
      </div>

      <hr className="mb-4" />

      <h2 className="text-m font-bold mb-2">Blocked Websites :</h2>
      <ul className="space-y-2">
        {blocklist.map((url, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-gray-100 p-2 rounded border border-gray-200 shadow-sm hover:bg-gray-200 transition-colors duration-200"
          >
            <span className="break-words">{url}</span>
            <button
              onClick={() => removeUrlFromBlocklist(url)}
              className="text-red-500 ml-2 hover:text-red-600 transition-colors duration-200"
            >
              <MdDelete size={20} />
            </button>
          </li>
        ))}
      </ul>
      <div
        className="mb-4 flex items-center justify-center cursor-pointer absolute top-0 right-0 p-1"
        onClick={toggleExtension}
        role="button"
        tabIndex="0"
        onKeyPress={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            toggleExtension();
          }
        }}
      >
        <div className="relative">
          <input
            type="checkbox"
            id="toggle"
            className="sr-only"
            checked={isExtensionEnabled}
            onChange={toggleExtension}
          />
          <div
            className={`block bg-gray-600 w-10 h-6 rounded-full ${
              isExtensionEnabled ? "bg-green-600" : "bg-red-700"
            }`}
          ></div>
          <div
            className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${
              isExtensionEnabled
                ? "translate-x-full bg-green-600"
                : "bg-red-800"
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
