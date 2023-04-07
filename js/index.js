const dragArea = document.querySelector(".downloader__drag-area");
const dragText = document.querySelector(".drag__header");
const openFolderBtn = document.querySelector(".drag__header-btn");
const uploadInput = document.querySelector(".upload-input");

let uploadedFile;

function removeClass(area, text) {
  area.classList.remove("active");
  text.innerHTML = "Drag & Drop";
}

function showFile() {
  let fileType = uploadedFile.type;
  let validFiles = ["image/jpeg", "image/jpg", "image/png"];

  if (validFiles.includes(fileType)) {
    let fileRead = new FileReader();

    fileRead.onload = () => {
      let fileUrl = fileRead.result;

      let imgTag = `<img src='${fileUrl}' alt='uploaded image' class='uploaded-img'>`;
      dragArea.innerHTML = imgTag;
    };

    fileRead.readAsDataURL(uploadedFile);
  } else {
    alert("Incorrect file extension! Try again later!");
    removeClass(dragArea, dragText);
  }
}

openFolderBtn.addEventListener("click", () => {
  uploadInput.click();
});

uploadInput.addEventListener("change", function () {
  uploadedFile = this.files[0];

  showFile();

  dragArea.classList.add("active");
});

dragArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dragText.innerHTML = "Release to upload";
  dragArea.classList.add("active");
});

dragArea.addEventListener("dragleave", () => {
  removeClass(dragArea, dragText);
});

dragArea.addEventListener("drop", (e) => {
  e.preventDefault();

  uploadedFile = e.dataTransfer.files[0];
  showFile();
});
