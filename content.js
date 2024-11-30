// Adds a custom "Extract Comments" button to the identified elements
function addExtractButton() {
  setTimeout(() => {
    // Select all elements matching the provided classes
    const elements = document.querySelectorAll(
      ".x9f619.x1n2onr6.x1ja2u2z.x78zum5.xdt5ytf.x2lah0s.x193iq5w.xeuugli.xsyo7zv.x16hj40l.x10b6aqq.x1yrsyyn"
    );

    // Filter elements that include the word "comments" in their text content or attributes
    const commentElements = Array.from(elements).filter(
      (element) =>
        element.textContent.toLowerCase().includes("comments") ||
        element.innerHTML.toLowerCase().includes("comments")
    );

    if (commentElements.length === 0) {
      console.error("No comment elements found.");
      return;
    }

    // Check if the button already exists
    if (document.getElementById("extractButton")) {
      return;
    }

    // Append the button to the first matching comment element
    const targetElement = commentElements[0];
    console.log("Target element for button:", targetElement);

    // Create the button
    const button = document.createElement("button");
    button.id = "extractButton";
    button.innerText = "Extract Comments";
    button.style.cssText =
      "margin: 20px; padding: 10px; background: #007bff; color: white; border: none; cursor: pointer;border-radius: 5px;";
    button.addEventListener("click", async () => {
      console.log("Extract button clicked");

      await selectAllComments(); // Click "Most relevant" and select "All comments"
      await scrollSecondDialogToEnd(); // Scroll the second dialog to the end
      scrollDialogToEnd(); // Scroll the first dialog to load comments
      mapUsernamesToCommentsAndDownloadCSV(); // Extract and format the comments
    });

    // Append the button to the target element
    targetElement.appendChild(button);
    console.log("Extract button added.");
  }, 1000);
}

// Function to click "Most relevant" and select "All comments"
async function selectAllComments() {
  const elements = document.querySelectorAll("span.x193iq5w"); // Match the most stable class
  const targetElement = Array.from(elements).find((el) =>
    el.textContent.includes("Most relevant")
  );

  if (targetElement) {
    targetElement.click();
    console.log("'Most relevant' clicked.");

    // Wait for the menu to load
    setTimeout(() => {
      const menuItems = document.querySelectorAll("[role='menuitem']");
      const allCommentsElement = Array.from(menuItems).find((item) =>
        item.textContent.includes("All comments")
      );

      if (allCommentsElement) {
        allCommentsElement.click();
        console.log("'All comments' clicked.");
      } else {
        console.log("'All comments' menu item not found.");
      }
    }, 1000); // Wait 1 second for the menu to load
  } else {
    console.log("'Most relevant' button not found.");
  }
}

// Scroll the dialog to load all comments
function scrollDialogToEnd() {
  const dialogs = document.querySelectorAll('[role="dialog"]');

  if (dialogs.length > 0) {
    const dialog = dialogs[0];
    const scrollableContent = dialog.querySelector(".x1q594ok.xb57i2i"); // Update if necessary

    if (scrollableContent) {
      let lastScrollHeight = 0;

      const interval = setInterval(() => {
        scrollableContent.scrollTop = scrollableContent.scrollHeight;

        if (scrollableContent.scrollHeight === lastScrollHeight) {
          clearInterval(interval);
          console.log("Reached the end of the dialog.");
        } else {
          lastScrollHeight = scrollableContent.scrollHeight;
        }
      }, 1000);
    } else {
      console.error("Scrollable content not found inside the dialog.");
    }
  } else {
    console.error("No dialog found on the page.");
  }
}

// Scroll the second dialog to load all comments
function scrollSecondDialogToEnd() {
  return new Promise((resolve, reject) => {
    const dialogs = document.querySelectorAll('[role="dialog"]'); // Update selector if necessary

    if (dialogs.length > 1) {
      const dialog = dialogs[1]; // Second dialog
      console.log("Second dialog found. Searching for scrollable content...");

      const scrollableContent = dialog.querySelector(".xb57i2i.x1q594ok"); // Add all or unique class names

      if (scrollableContent) {
        console.log("Scrollable content found. Scrolling...");
        let lastScrollHeight = 0;

        const interval = setInterval(() => {
          scrollableContent.scrollTop = scrollableContent.scrollHeight;

          if (scrollableContent.scrollHeight === lastScrollHeight) {
            clearInterval(interval);
            console.log("Scrolling complete. Reached the end of the content.");
            resolve();
          } else {
            lastScrollHeight = scrollableContent.scrollHeight;
          }
        }, 3000);
      } else {
        console.error("Scrollable content not found inside the second dialog.");
        reject("Scrollable content not found");
      }
    } else {
      console.error(
        "Second dialog not found. Make sure there are at least two dialogs visible."
      );
      reject("Second dialog not found");
    }
  });
}

// Extract and format comments from the dialog
function mapUsernamesToCommentsAndDownloadCSV() {
  // Select all elements containing potential data
  const elements = document.querySelectorAll(
    "div.xwib8y2.xn6708d.x1ye3gou.x1y1aw1k, div.x1lliihq.xjkvuk6.x1iorvi4"
  );

  // Initialize an array to store the mapped data
  const mappedData = [];
  let currentUsername = null;

  elements.forEach((element) => {
    if (
      element.classList.contains("xwib8y2") &&
      element.classList.contains("xn6708d")
    ) {
      // Element is a username
      const fullUsername = element.innerText.trim();
      // Extract the username part before the first newline
      currentUsername = fullUsername.split("\n")[0];
    } else if (
      element.classList.contains("x1lliihq") &&
      element.classList.contains("xjkvuk6")
    ) {
      // Element is a comment
      if (currentUsername) {
        mappedData.push({
          username: currentUsername,
          comment: element.innerText.trim(),
        });
        // Reset username to ensure proper mapping
        currentUsername = null;
      }
    }
  });

  // Convert the mapped data into CSV format
  let csvContent = "Username,Comment\n"; // Add headers
  mappedData.forEach((row) => {
    const escapedUsername = row.username.replace(/"/g, '""');
    const escapedComment = row.comment.replace(/"/g, '""');
    csvContent += `"${escapedUsername}","${escapedComment}"\n`;
  });

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "comments.csv";
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  console.log("CSV file has been generated and downloaded.");
}

// Add the extract button when the page loads+++++++++++++++++++++++++    ++
document.addEventListener("click", addExtractButton);
