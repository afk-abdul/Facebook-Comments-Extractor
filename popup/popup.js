// document
//   .getElementById("extractEmailsButton")
//   .addEventListener("click", async () => {
//     const [tab] = await chrome.tabs.query({
//       active: true,
//       currentWindow: true,
//     });

//     chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       function: () => {
//         const button = document.getElementById("extract-emails-btn");
//         if (button) {
//           button.click();
//           const statusMessage = document.getElementById("statusMessage");
//           if (statusMessage) {
//             statusMessage.textContent = "Extraction initiated!";
//           }
//         } else {
//           const statusMessage = document.getElementById("statusMessage");
//           if (statusMessage) {
//             statusMessage.textContent = "Comments not found.";
//           }
//         }
//       },
//     });
//   });
// popup.js
document.addEventListener("DOMContentLoaded", function () {
  console.log("Popup loaded - Follow instructions to use the extension.");
});
