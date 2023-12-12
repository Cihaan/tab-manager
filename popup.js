function searchTabs(query, isUrlSearch = false) {
  chrome.tabs.query({}, function (tabs) {
    let results = tabs.filter((tab) =>
      isUrlSearch
        ? tab.url.toLowerCase().includes(query.toLowerCase())
        : tab.title.toLowerCase().includes(query.toLowerCase()),
    );
    document.getElementById("results").innerHTML = "";
    results.forEach((tab) => {
      let tabElement = document.createElement("div");
      tabElement.className = "tab";
      tabElement.textContent = tab.title;
      tabElement.addEventListener("click", function () {
        chrome.tabs.update(tab.id, { active: true });
      });
      let closeButton = document.createElement("span");
      closeButton.className = "close";
      closeButton.textContent = "x";
      closeButton.addEventListener("click", function (e) {
        e.stopPropagation();
        chrome.tabs.remove(tab.id);
      });
      tabElement.appendChild(closeButton);
      document.getElementById("results").appendChild(tabElement);
    });
  });
}

document.getElementById("search").addEventListener("input", function (e) {
  searchTabs(e.target.value);
});

document.getElementById("urlSearch").addEventListener("input", function (e) {
  searchTabs(e.target.value, true);
});
