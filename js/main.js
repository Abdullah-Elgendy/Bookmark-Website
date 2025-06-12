var bookmarkName = document.querySelector("#siteName");
var nameWarning = document.querySelector(".name-warning");
var bookmarkUrl = document.querySelector("#siteUrl");
var urlWarning = document.querySelector(".url-warning");

var bookmarkTable = document.querySelector("#bookmarkTable");
var submitBtn = document.querySelector("#submitBtn");
var bookmarkList;

//check if local storage already contains the array of objects, if not then create an empty array.
if (localStorage.getItem("bookmarkList")) {
  bookmarkList = JSON.parse(localStorage.getItem("bookmarkList"));
  display();
} else {
  bookmarkList = [];
}

//function to add object to array
function addUrl() {
  if (validName() && validURL()) {
    checkProtocol()
    var bookmarkObj = {
      name: bookmarkName.value,
      url: bookmarkUrl.value,
    };
    clearFields();
    bookmarkList.push(bookmarkObj);
    display();
    saveToLocalStorage(bookmarkList);
  }
}

//function to display array of objects on the webpage
function display() {
  var container = `<tr class="border-0 border-bottom">
                        <th class="py-2">Index </th>
                        <th>Website Name</th>
                        <th>Visit</th>
                        <th>Delete</th>
                    </tr>`;

  for (var i = 0; i < bookmarkList.length; i++) {
    container += ` <tr class="border-0 border-bottom">
                        <td class="py-3"> ${i + 1} </td>
                        <td> ${bookmarkList[i].name}</td>
                        <td><a href="${
                          bookmarkList[i].url
                        }" target="_blank" class="btn btn-green"><i class="fa-solid fa-eye pe-1"></i> Visit</a></td>
                        <td><button onclick="deleteBookmark(${i})" class="btn btn-red"><i class="fa-solid fa-trash"></i>Delete</button></td>
                    </tr>`;
  }
  bookmarkTable.innerHTML = container;
}

//function to delete bookmark object from the array
function deleteBookmark(index) {
  bookmarkList.splice(index, 1);
  display();
  saveToLocalStorage(bookmarkList);
}

//function to save array of objects in local storage
function saveToLocalStorage(arr) {
  localStorage.setItem("bookmarkList", JSON.stringify(arr));
}

//function to clear input fields
function clearFields() {
  bookmarkName.value = null;
  bookmarkUrl.value = null;
  bookmarkName.classList.remove("is-valid");
  bookmarkUrl.classList.remove("is-valid");
}

//function to validate name, length must be greater than 2
function validName() {
  if (bookmarkName.value.length < 3) {
    bookmarkName.classList.add("is-invalid");
    bookmarkName.classList.remove("is-valid");
    nameWarning.classList.replace("d-none", "d-block");
    return false;
  } else {
    bookmarkName.classList.remove("is-invalid");
    bookmarkName.classList.add("is-valid");
    nameWarning.classList.replace("d-block", "d-none");
    return true;
  }
}

//function to validate URL using regex
function validURL() {

  //regex for valid url, the \b at the end is to allow for a path after the main website URL.
  var urlRegex = bookmarkUrl.value
    .toLowerCase()
    .match(
      /^(https?:\/\/)?(www\.)?[\w\-]{2,256}\.\w{2,4}\b([\w@:%_\+.~#?&\/=-]*)$/
    );

  //if url is matched and is not null
  if (urlRegex) {
    bookmarkUrl.classList.remove("is-invalid");
    bookmarkUrl.classList.add("is-valid");
    urlWarning.classList.replace("d-block", "d-none");
    return true;
  } else {
    bookmarkUrl.classList.add("is-invalid");
    bookmarkUrl.classList.remove("is-valid");
    urlWarning.classList.replace("d-none", "d-block");
    return false;
  }
}

//function to check if url has the http(s) protocol
function checkProtocol() {
  //look for the http(s):// protocol because we need it for the href attribute in the anchor tag
  var protocol = bookmarkUrl.value.toLowerCase().match(/^(https?:\/\/)/);
  //if https:// is already included then return
  if (protocol) {
    return;
  }
  //if https:// isn't included then add it to the url
  bookmarkUrl.value = "https://" + bookmarkUrl.value;
}

//event listener for the submit button, calls the addUrl() function
submitBtn.addEventListener("click", function () {
  addUrl();
});
