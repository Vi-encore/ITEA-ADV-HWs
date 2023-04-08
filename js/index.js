const form = document.querySelector(".drop__area"); //dropArea
fileInput = form.querySelector(".drop__btn-hidden"); //dropBtnHidden
(progressArea = document.querySelector(".drop__progress-area")),
  (uploadedArea = document.querySelector(".drop__done-area")),
  (dropText = document.querySelector(".drop__do-that"));
//doneArea

let uploadedFile;

form.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", (e) => {
  let file = e.target.files[0];

  if (file) {
    let fileName = file.name;
    if (fileName.length >= 12) {
      let splitName = fileName.split(".");
      fileName = splitName[0].substring(0, 12) + "... ." + splitName[1];
    }
    uploadFile(fileName);
  }
});

function uploadFile(name) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "php/upload.php");
  xhr.upload.addEventListener("progress", ({ loaded, total }) => {
    let fileLoaded = Math.floor((loaded / total) * 100);
    let fileTotal = Math.floor(total / 1000);
    let fileSize;

    fileTotal < 1024
      ? (fileSize = fileTotal + " KB")
      : (fileSize = (loaded / (1024 * 1024)).toFixed(2) + " MB");

    let progressHTML = `<div class="drop__row">
            <i class="fa-solid fa-file-arrow-up drop__progress-icon"></i>
            <div class="drop__content">
              <div class="drop__details">
                <span class="drop__name">${name} · Uploading</span>
                <span class="drop__percent">${fileLoaded}%</span>
              </div>
              <div class="drop__progress-bar">
                <div class="progress" style='width: ${fileLoaded}%'></div>
              </div>
            </div>
          </div>`;

    uploadedArea.classList.add("onprogress");
    progressArea.innerHTML = progressHTML;

    if (loaded == total) {
      progressArea.innerHTML = "";
      let uploadedHTML = `<div class="drop__row">
                    <div class="drop__content">
                      <i class="fa-solid fa-file-arrow-up drop__progress-icon"></i>
                      <div class="drop__details">
                        <span class="drop__name">${name} · Uploaded</span>
                        <span class="drop__size">${fileSize}</span>
                      </div>
                    </div>
                    <i class="fa-solid fa-check drop__checkmark"></i>
                  </div>`;
      uploadedArea.classList.remove("onprogress");
      uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML);
    }
  });

  let formData = new FormData(form);

  xhr.send(formData);
}
///////////////////////////////

form.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropText.innerHTML = "Release to Upload";
  form.classList.add("active");
});

form.addEventListener("dragleave", () => {
  dropText.innerHTML = "Browse or Drop Files to Upload";
  form.classList.remove("active");
});

form.addEventListener("drop", (e) => {
  e.preventDefault();

  let file = e.dataTransfer.files[0];
  let fileName = file.name;

  giveSize(file, fileName);
  dropText.innerHTML = "Browse or Drop Files to Upload";
  form.classList.remove("active");

  // let file = e.target.files[0];
});

// function showFile() {
//   let fileType = uploadedFile.type;

//   let fileRead = new FileReader();

//   fileRead.onload = () => {
//     let fileUrl = fileRead.result;

//     let imgTag = `<img src='${fileUrl}' alt='uploaded image' class='uploadedImg'>`;
//     form.innerHTML = imgTag;
//   };

//   fileRead.readAsDataURL(uploadedFile);
// }
function giveSize(file, name) {
  let fileName = name;
  if (fileName.length >= 12) {
    let splitName = fileName.split(".");
    fileName = splitName[0].substring(0, 12) + "... ." + splitName[1];
  }

  let size = file.size;

  uploadFileDrop(fileName, size);

  function uploadFileDrop(name, size) {
    let xhr = new XMLHttpRequest();

    xhr.open("POST", "php/upload.php");

    xhr.upload.addEventListener("progress", ({ loaded, total }) => {
      total = size;
      let step = size * 0.2;

      let result = 0;
        function newLoaded() {
          while (result <= size) {
            for (let i = 0; i < 5; i++) {
              result += step;
            }

            return Math.round(result);
            console.log(result);
          }
        }

    //   function timer() {
    //     setTimeout(function () {
    //       result += step;
    //       console.log(result);
    //       count++;
    //       if (count <= 5) {
    //         timer();
    //       }
    //     }, 1000);
    //     Math.round(result);
    //   }

    //   timer();

      loaded = newLoaded();
      console.log(loaded, total);

      let fileLoaded = Math.floor((newLoaded() / total) * 100);
      let fileTotal = Math.floor(total / 1000);
      let fileSize;

      let count = 1;

      let smt = 0;

      fileTotal < 1024
        ? (fileSize = fileTotal + " KB")
        : (fileSize = (newLoaded() / (1024 * 1024)).toFixed(2) + " MB");

      //   let progressHTML = `<div class="drop__row">
      //         <i class="fa-solid fa-file-arrow-up drop__progress-icon"></i>
      //         <div class="drop__content">
      //           <div class="drop__details">
      //             <span class="drop__name">${name} · Uploading</span>
      //             <span class="drop__percent">${fileLoaded}%</span>
      //           </div>
      //           <div class="drop__progress-bar">
      //             <div class="progress" style='width: ${fileLoaded}%'></div>
      //           </div>
      //         </div>
      //       </div>`;

      //   uploadedArea.classList.add("onprogress");
      //   progressArea.innerHTML = progressHTML;

      if (newLoaded() == total) {
        progressArea.innerHTML = "";
        let uploadedHTML = `<div class="drop__row">
                    <div class="drop__content">
                      <i class="fa-solid fa-file-arrow-up drop__progress-icon"></i>
                      <div class="drop__details">
                        <span class="drop__name">${name} · Uploaded</span>
                        <span class="drop__size">${fileSize}</span>
                      </div>
                    </div>
                    <i class="fa-solid fa-check drop__checkmark"></i>
                  </div>`;
        uploadedArea.classList.remove("onprogress");
        uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML);
      }
    });

    let formData = new FormData(form);

    xhr.send(formData);
  }
}
