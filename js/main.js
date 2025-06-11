var bookmarkName = document.querySelector("#siteName");
var bookmarkUrl = document.querySelector("#siteUrl");
var bookmarkTable = document.querySelector("#bookmarkTable");
var submitBtn = document.querySelector("#submitBtn");
var bookmarkList;

if (localStorage.getItem("bookmarkList")) {
  bookmarkList = JSON.parse(localStorage.getItem("bookmarkList"));
  display();
} else {
  bookmarkList = [];
}

function addUrl() {
  var bookmarkObj = {
    name: bookmarkName.value,
    url: bookmarkUrl.value,
  };
  bookmarkList.push(bookmarkObj);
  display();
  saveToLocalStorage(bookmarkList);
}

function display() {
  var container = `<tr class="border-0 border-bottom">
                        <th class="py-2">Index </th>
                        <th>Website Name</th>
                        <th>Visit</th>
                        <th>Delete</th>
                    </tr>`;

  for (var i = 0; i < bookmarkList.length; i++) {
    container += ` <tr class="border-0 border-bottom">
                        <td class="py-3"> ${i} </td>
                        <td> ${bookmarkList[i].name}</td>
                        <td><a href="${bookmarkList[i].url}" class="btn btn-green"><i class="fa-solid fa-eye pe-1"></i> Visit</a></td>
                        <td><button onclick="deleteBookmark(${i})" class="btn btn-red"><i class="fa-solid fa-trash"></i>Delete</button></td>
                    </tr>`;
  }
  bookmarkTable.innerHTML = container;
}

function deleteBookmark(index) {
  bookmarkList.splice(index, 1);
  display();
  saveToLocalStorage(bookmarkList);
}

function saveToLocalStorage(arr) {
  localStorage.setItem("bookmarkList", JSON.stringify(arr));
}

submitBtn.addEventListener("click", function(){addUrl(); });
