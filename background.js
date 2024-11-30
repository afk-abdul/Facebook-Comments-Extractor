// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.emails) {
//     // Create a text blob containing each email on a new line
//     const blob = new Blob([message.emails.join("\n")], { type: "text/plain" });
//     const url = URL.createObjectURL(blob);

//     // Start the download process
//     chrome.downloads.download({
//       url: url,
//       filename: "extracted_emails.txt",
//       saveAs: true,
//     });

//     // Cleanup URL object after download
//     URL.revokeObjectURL(url);
//   }
// });

// chrome.runtime.onInstalled.addListener(() => {
//   console.log("Email Extractor extension installed.");
// });

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.emails) {
//     console.log("Received emails in background script:", message.emails);
//     const blob = new Blob([message.emails.join("\n")], { type: "text/plain" });
//     const url = URL.createObjectURL(blob);

//     chrome.downloads.download({
//       url: url,
//       filename: "extracted_emails.txt",
//       saveAs: true,
//     });

//     URL.revokeObjectURL(url);
//   }
// });

// Optional: Background script (currently not in use)
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension Installed!");
});
