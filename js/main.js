var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var allSites = [];
if (localStorage.getItem("sites") !== null) {
    allSites = JSON.parse(localStorage.getItem("sites"));
    displayData();
}

function addWebsite() {
    var website = {
        name: siteName.value,
        url: siteUrl.value,
    };

    allSites.push(website);
    localStorage.setItem("sites", JSON.stringify(allSites));
    displayData();
    clearForm();

    console.log(allSites);
}

function clearForm() {
    siteName = "";
    siteUrl = "";
}

function displayData() {
    var content = "";
    for (var i = 0; i < allSites.length; i++) {
        content += `
   <tr>
    <td>${i}</td>
<td>${allSites[i].name}</td>
<td><button  onclick="visitSite(${i})"class="btn btn-outline-success btn-sm">Visit</button></td>
<td><button onclick="deleteSites(${i})" class="btn btn-outline-danger btn-sm">Delete</button></td>
</tr>`;
    }
    document.getElementById("tableData").innerHTML = content;
}

function deleteSites(index) {
    allSites.splice(index, 1);
    displayData();
    localStorage.setItem("sites", JSON.stringify(allSites));
}

function visitSite(index) {
    window.open(allSites[index].url, "_blank");
}

function allValidation(element, msgId) {
    var msg = document.getElementById("msgId");
    var regex = {
        siteName: /^[A-Z][a-z]{3,8}$/,
        siteUrl: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
    };
    if (regex[element.id].test(element.value)) {
        element.classList.add("is valid");
        element.classList.remove("is not valid");
        msg.classList.add("d-none");
        return true;
    } else {
        element.classList.add("is not valid");
        element.classList.remove("is valid");
        msg.classList.remove("d-none");
        return false;
    }
}