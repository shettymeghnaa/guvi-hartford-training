
function downloadFiles(callback) {
  setTimeout(() => {
    console.log("Download completed");
    callback();
  }, 2000);
}

downloadFiles(() => {
  console.log("File opened");
});
