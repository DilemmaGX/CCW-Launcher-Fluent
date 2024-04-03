var data = {};

function dom() {
    var table = document.getElementById("t");
    var tbody = table.getElementsByTagName("tbody")[0];
    tbody.innerHTML = ""; // 清空表格内容

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            var row = tbody.insertRow();
            var cell_uuid = row.insertCell(0);
            var cell_name = row.insertCell(1);
            var cell_controls = row.insertCell(2);

            cell_uuid.innerHTML = key;
            cell_name.innerHTML = data[key]['name'];

            ///////////////////////////////////////////////////////////////////
            var button1 = document.createElement("button");
            button1.innerHTML = "<i class='icons10-controller'></i>启动";
            button1.className = "app-btn app-btn-success";
            button1.style.marginRight = "5px";
            button1.onclick = function () {
                window.open(`https://www.ccw.site/player/${key}`)
            };
            cell_controls.appendChild(button1);

            var button2 = document.createElement("button");
            button2.innerHTML = "<i class='icons10-pencil'></i>编辑";
            button2.className = "app-btn app-btn-primary";
            button2.style.marginRight = "5px";
            button2.onclick = function () {
                window.open(`https://www.ccw.site/gandi/project/${key}`)
            };
            cell_controls.appendChild(button2);

            var button3 = document.createElement("button");
            button3.innerHTML = "<i class='icons10-controller'></i>含参启动";
            button3.className = "app-btn app-btn-outline-success";
            button3.style.marginRight = "5px";
            button3.onclick = function () {
                var result = prompt("启动参数");
                if (result != null) {
                    window.open(`https://www.ccw.site/player/${key}?kontakt=${btoa(result)}`);
                }
            };
            cell_controls.appendChild(button3);
            
            var button4 = document.createElement("button");
            button4.innerHTML = "<i class='icons10-pencil'></i>含参编辑";
            button4.className = "app-btn app-btn-outline-primary";
            button4.style.marginRight = "5px";
            button4.onclick = function () {
                var result = prompt("编辑参数");
                if (result != null) {
                    window.open(`https://www.ccw.site/gandi/project/${key}?kontakt=${btoa(result)}`);
                }
            };
            cell_controls.appendChild(button4);

            var button5 = document.createElement("button");
            button5.innerHTML = "<i class='icons10-cross'></i>移除";
            button5.className = "app-btn app-btn-danger";
            button5.style.marginRight = "5px";
            button5.onclick = function () {
                delete data[key];
                tbody.deleteRow(row.rowIndex - 1);
                saveData();
            };
            cell_controls.appendChild(button5);
            ///////////////////////////////////////////////////////////////////
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