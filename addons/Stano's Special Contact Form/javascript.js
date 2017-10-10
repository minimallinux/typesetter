function addRow(a, b, d, k, l, m, n, p, q) {
  a = document.getElementById(a);
  for (var h = a.rows.length, r = a.insertRow(h), t = a.rows[1].cells.length, g = 0;g < t;g++) {
    var e = r.insertCell(g), f = parseInt(a.rows[h - 1].cells[1].innerHTML) + 1;
    switch(g) {
      case 0:
        e.innerHTML = '<input type="button" value="' + b + '" onclick="deleteRow(this)" />';
        break;
      case 1:
        e.innerHTML = f;
        break;
      case 2:
        e.innerHTML = '<input name="label' + f + '" type="text" value="' + d + " " + f + '" style="width:120px;" />';
        break;
      case 3:
        var c = document.createElement("select");
        c.options[0] = new Option(k, "input");
        c.options[1] = new Option(l, "checkbox");
        c.options[2] = new Option(m, "radio");
        c.options[3] = new Option(n, "select");
        c.options[4] = new Option(p, "textarea");
        c.options[5] = new Option(q, "textarea");
        c.name = "type" + f;
        c.selectedIndex = 0;
        e.innerHTML = " ";
        e.appendChild(c);
        c.addEventListener ? c.addEventListener("change", changeEvent, !1) : c.attachEvent && c.attachEvent("onchange", changeEvent);
        break;
      case 4:
        e.innerHTML = '<input name="valid' + f + '" type="text" />';
        break;
      case 5:
        c = document.createElement("input"), c.setAttribute("type", "text"), c.setAttribute("value", ""), c.setAttribute("name", "multi_values" + f), c.style.display = "none", e.appendChild(c);
    }
    document.getElementById("maxval").value = f + "";
    $(a).tableDnD({onDrop:function(a, b) {
      reindexRows();
    }});
  }
}
function changeEvent(a) {
  target = a.target ? a.target : a.srcElement;
  checkSelectedType(target);
}
function deleteRow(a) {
  a = a.parentNode.parentNode;
  var b = a.parentNode.parentNode;
  2 >= b.rows.length || (b.deleteRow(a.sectionRowIndex + 1), reindexRows());
}
function checkSelectedType(a) {
  var b = a.parentNode.parentNode;
  b.cells[5].childNodes[0] && b.cells[5].childNodes[0].style && (b.cells[5].childNodes[0].style.display = "radio" == a.value || "select" == a.value ? "block" : "none");
  b.cells[5].childNodes[1] && b.cells[5].childNodes[1].style && (b.cells[5].childNodes[1].style.display = "radio" == a.value || "select" == a.value ? "block" : "none");
}
function reindexRows() {
  $("#dataTable tbody").find("tr").each(function(a) {
    a += 1;
    this.id = "row" + a;
    var b = this.getElementsByTagName("td"), d;
    b[1].innerHTML = a;
    d = b[2].getElementsByTagName("input");
    d[0].name = "label" + a;
    d = b[3].getElementsByTagName("select");
    d[0].name = "type" + a;
    d = b[4].getElementsByTagName("input");
    d[0].name = "valid" + a;
    d = b[5].getElementsByTagName("input");
    d[0].name = "multi_values" + a;
  });
}
$(document).ready(function() {
  $("#dataTable tbody").tableDnD({onDrop:function(a, b) {
    reindexRows();
  }});
});
function switch_language(a) {
  var b = window.location.href, d = b.indexOf("?");
  -1 < d && (b = window.location.href.substr(0, d));
  location.href = b + "?iLanguage=" + a.value;
}
;