var data = {};

function dom() {
    var table = document.getElementById("t");
    var tbody = table.getElementsByTagName("tbody")[0];
    tbody.innerHTML = ""; // 清空表格内容

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            var row = tbody.insertRow();
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);

            cell1.innerHTML = key;
            cell2.innerHTML = data[key]['name'];

            var button1 = document.createElement("button");
            button1.innerHTML = "<i class='icons10-controller'></i>启动";
            button1.className = "app-btn app-btn-success";
            button1.style.marginRight = "5px";
            button1.onclick = function () {
                window.open(`https://www.ccw.site/player/${key}`)
            };
            cell3.appendChild(button1);

            var button2 = document.createElement("button");
            button2.innerHTML = "<i class='icons10-cross'></i>移除";
            button2.className = "app-btn app-btn-danger";
            button2.onclick = function () {
                delete data[key];
                tbody.deleteRow(row.rowIndex - 1);
                saveData();
            };
            cell3.appendChild(button2);
        }
    }
}

function genDataset() {
    var uuid = document.getElementById("uuid").value;
    var name = document.getElementById("name").value;
    data[uuid] = { "name": name };
    dom();
    saveData();
}

function saveData() {
    localStorage.setItem('data', JSON.stringify(data));
}

function loadData() {
    if (localStorage.getItem('data') != null) { data = JSON.parse(localStorage.getItem('data')) };
}

function changeTheme() {
    const colorScheme = Appearance.getColorScheme();
    if (colorScheme === "dark") {
        Appearance.setLightScheme();
        var element = document.getElementById("theme");
        element.className = 'icons10-sun';
    } else {
        Appearance.setDarkScheme();
        var element = document.getElementById("theme");
        element.className = 'icons10-moon';
    }
}