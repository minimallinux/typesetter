function Validator(a) {
  (this.formobj = document.forms[a]) ? (this.formobj.onsubmit ? (this.formobj.old_onsubmit = this.formobj.onsubmit, this.formobj.onsubmit = null) : this.formobj.old_onsubmit = null, this.formobj._sfm_form_name = a, this.formobj.onsubmit = form_submit_handler, this.addValidation = add_validation, this.setAddnlValidationFunction = set_addnl_vfunction, this.clearAllValidations = clear_all_validations, this.disable_validations = !1, document.error_disp_handler = new sfm_ErrorDisplayHandler, this.EnableOnPageErrorDisplay = 
  validator_enable_OPED, this.EnableOnPageErrorDisplaySingleBox = validator_enable_OPED_SB, this.show_errors_together = !0, this.EnableMsgsTogether = sfm_enable_show_msgs_together, document.set_focus_onerror = !0, this.EnableFocusOnError = sfm_validator_enable_focus) : alert("Error: couldnot get Form object " + a);
}
function sfm_validator_enable_focus(a) {
  document.set_focus_onerror = a;
}
function set_addnl_vfunction(a) {
  this.formobj.addnlvalidation = a;
}
function sfm_set_focus(a) {
  document.set_focus_onerror && a.focus();
}
function sfm_enable_show_msgs_together() {
  this.show_errors_together = !0;
  this.formobj.show_errors_together = !0;
}
function clear_all_validations() {
  for (var a = 0;a < this.formobj.elements.length;a++) {
    this.formobj.elements[a].validationset = null;
  }
}
function form_submit_handler() {
  var a = !0;
  document.error_disp_handler.clear_msgs();
  for (var b = 0;b < this.elements.length && (this.elements[b].validationset && !this.elements[b].validationset.validate() && (a = !1), a || this.show_errors_together);b++) {
  }
  this.addnlvalidation && (str = " var ret = " + this.addnlvalidation + "()", eval(str), ret || (a = !1));
  return a ? !0 : (document.error_disp_handler.FinalShowMsg(), !1);
}
function add_validation(a, b, c) {
  var d = null;
  3 < arguments.length && (d = arguments[3]);
  if (this.formobj) {
    var e = this.formobj[a];
    e.length && isNaN(e.selectedIndex) && (e = e[0]);
    e ? (e.validationset || (e.validationset = new ValidationSet(e, this.show_errors_together)), e.validationset.add(b, c, d), e.validatorobj = this) : alert("Error: Couldnot get the input object named: " + a);
  } else {
    alert("Error: The form object is not set properly");
  }
}
function validator_enable_OPED() {
  document.error_disp_handler.EnableOnPageDisplay(!1);
}
function validator_enable_OPED_SB() {
  document.error_disp_handler.EnableOnPageDisplay(!0);
}
function sfm_ErrorDisplayHandler() {
  this.msgdisplay = new AlertMsgDisplayer;
  this.EnableOnPageDisplay = edh_EnableOnPageDisplay;
  this.ShowMsg = edh_ShowMsg;
  this.FinalShowMsg = edh_FinalShowMsg;
  this.all_msgs = [];
  this.clear_msgs = edh_clear_msgs;
}
function edh_clear_msgs() {
  this.msgdisplay.clearmsg(this.all_msgs);
  this.all_msgs = [];
}
function edh_FinalShowMsg() {
  this.msgdisplay.showmsg(this.all_msgs);
}
function edh_EnableOnPageDisplay(a) {
  this.msgdisplay = 1 == a ? new SingleBoxErrorDisplay : new DivMsgDisplayer;
}
function edh_ShowMsg(a, b) {
  var c = [];
  c.input_element = b;
  c.msg = a;
  this.all_msgs.push(c);
}
function AlertMsgDisplayer() {
  this.showmsg = alert_showmsg;
  this.clearmsg = alert_clearmsg;
}
function alert_clearmsg(a) {
}
function alert_showmsg(a) {
  for (var b = "", c = null, d = 0;d < a.length;d++) {
    null == c && (c = a[d].input_element), b += a[d].msg + "\n";
  }
  alert(b);
  null != c && sfm_set_focus(c);
}
function sfm_show_error_msg(a, b) {
  document.error_disp_handler.ShowMsg(a, b);
}
function SingleBoxErrorDisplay() {
  this.showmsg = sb_div_showmsg;
  this.clearmsg = sb_div_clearmsg;
}
function sb_div_clearmsg(a) {
  a = form_error_div_name(a);
  show_div_msg(a, "");
}
function sb_div_showmsg(a) {
  for (var b = "<ul>\n", c = 0;c < a.length;c++) {
    b += "<li>" + a[c].msg + "</li>\n";
  }
  b += "</ul>";
  a = form_error_div_name(a);
  show_div_msg(a, b);
}
function form_error_div_name(a) {
  var b = null, c;
  for (c in a) {
    if (b = a[c].input_element) {
      break;
    }
  }
  a = "";
  b && (a = b.form._sfm_form_name + "_errorloc");
  return a;
}
function DivMsgDisplayer() {
  this.showmsg = div_showmsg;
  this.clearmsg = div_clearmsg;
}
function div_clearmsg(a) {
  for (var b in a) {
    var c = element_div_name(a[b].input_element);
    show_div_msg(c, "");
  }
}
function element_div_name(a) {
  a = a.form._sfm_form_name + "_" + a.name + "_errorloc";
  return a = a.replace(/[\[\]]/gi, "");
}
function div_showmsg(a) {
  var b = null, c;
  for (c in a) {
    null == b && (b = a[c].input_element);
    var d = element_div_name(a[c].input_element);
    show_div_msg(d, a[c].msg);
  }
  null != b && sfm_set_focus(b);
}
function show_div_msg(a, b) {
  if (0 >= a.length) {
    return !1;
  }
  if (document.layers) {
    divlayer = document.layers[a];
    if (!divlayer) {
      return;
    }
    divlayer.document.open();
    divlayer.document.write(b);
    divlayer.document.close();
  } else {
    if (document.all) {
      divlayer = document.all[a];
      if (!divlayer) {
        return;
      }
      divlayer.innerHTML = b;
    } else {
      if (document.getElementById) {
        divlayer = document.getElementById(a);
        if (!divlayer) {
          return;
        }
        divlayer.innerHTML = b;
      }
    }
  }
  divlayer.style.visibility = "visible";
}
function ValidationDesc(a, b, c, d) {
  this.desc = b;
  this.error = c;
  this.itemobj = a;
  this.condition = d;
  this.validate = vdesc_validate;
}
function vdesc_validate() {
  return null == this.condition || eval(this.condition) ? validateInput(this.desc, this.itemobj, this.error) ? !0 : (this.itemobj.validatorobj.disable_validations = !0, sfm_set_focus(this.itemobj), !1) : !0;
}
function ValidationSet(a, b) {
  this.vSet = [];
  this.add = add_validationdesc;
  this.validate = vset_validate;
  this.itemobj = a;
  this.msgs_together = b;
}
function add_validationdesc(a, b, c) {
  this.vSet[this.vSet.length] = new ValidationDesc(this.itemobj, a, b, c);
}
function vset_validate() {
  for (var a = !0, b = 0;b < this.vSet.length && (a = a && this.vSet[b].validate(), a || this.msgs_together);b++) {
  }
  return a;
}
function validateEmail(a) {
  a = a.match("^(.+)@(.+)$");
  return null == a || null != a[1] && null == a[1].match(/^\"?[\w-_\.]*\"?$/) ? !1 : null != a[2] ? null == a[2].match(/^[\w-\.]*\.[A-Za-z]{2,4}$/) && null == a[2].match(/^\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\]$/) ? !1 : !0 : !1;
}
function IsCheckSelected(a, b) {
  var c = !1, d = a.form.elements[a.name];
  if (d.length) {
    for (var e = -1, g = 0;g < d.length;g++) {
      if (d[g].value == b) {
        e = g;
        break;
      }
    }
    0 <= e && "1" == d[e].checked && (c = !0);
  } else {
    "1" == a.checked && (c = !0);
  }
  return c;
}
function TestDontSelectChk(a, b, c) {
  var d = !0, d = IsCheckSelected(a, b) ? !1 : !0;
  0 == d && (c && 0 != c.length || (c = "Can't Proceed as you selected " + a.name), sfm_show_error_msg(c, a));
  return d;
}
function TestShouldSelectChk(a, b, c) {
  var d = !0, d = IsCheckSelected(a, b) ? !0 : !1;
  0 == d && (c && 0 != c.length || (c = "You should select " + a.name), sfm_show_error_msg(c, a));
  return d;
}
function TestRequiredInput(a, b) {
  var c = !0, d = a.value, d = d.replace(/^\s+|\s+$/g, "");
  0 == eval(d.length) && (b && 0 != b.length || (b = a.name + " : Required Field"), sfm_show_error_msg(b, a), c = !1);
  return c;
}
function TestMaxLen(a, b, c) {
  var d = !0;
  eval(a.value.length) > eval(b) && (c && 0 != c.length || (c = a.name + " : " + b + " characters maximum "), sfm_show_error_msg(c, a), d = !1);
  return d;
}
function TestMinLen(a, b, c) {
  var d = !0;
  eval(a.value.length) < eval(b) && (c && 0 != c.length || (c = a.name + " : " + b + " characters minimum  "), sfm_show_error_msg(c, a), d = !1);
  return d;
}
function TestInputType(a, b, c, d) {
  var e = !0;
  b = a.value.search(b);
  0 < a.value.length && 0 <= b && (c && 0 != c.length || (c = d), sfm_show_error_msg(c, a), e = !1);
  return e;
}
function TestEmail(a, b) {
  var c = !0;
  0 < a.value.length && !validateEmail(a.value) && (b && 0 != b.length || (b = a.name + ": Enter a valid Email address "), sfm_show_error_msg(b, a), c = !1);
  return c;
}
function TestLessThan(a, b, c) {
  var d = !0;
  isNaN(a.value) ? (sfm_show_error_msg(a.name + ": Should be a number ", a), d = !1) : eval(a.value) >= eval(b) && (c && 0 != c.length || (c = a.name + " : value should be less than " + b), sfm_show_error_msg(c, a), d = !1);
  return d;
}
function TestGreaterThan(a, b, c) {
  var d = !0;
  isNaN(a.value) ? (sfm_show_error_msg(a.name + ": Should be a number ", a), d = !1) : eval(a.value) <= eval(b) && (c && 0 != c.length || (c = a.name + " : value should be greater than " + b), sfm_show_error_msg(c, a), d = !1);
  return d;
}
function TestRegExp(a, b, c) {
  var d = !0;
  0 < a.value.length && !a.value.match(b) && (c && 0 != c.length || (c = a.name + ": Invalid characters found "), sfm_show_error_msg(c, a), d = !1);
  return d;
}
function TestDontSelect(a, b, c) {
  var d = !0;
  null == a.selectedIndex && (sfm_show_error_msg("ERROR: dontselect command for non-select Item"), d = !1);
  a.selectedIndex == eval(b) && (c && 0 != c.length || (c = a.name + ": Please Select one option "), sfm_show_error_msg(c, a), d = !1);
  return d;
}
function TestSelectOneRadio(a, b) {
  for (var c = a.form.elements[a.name], d = !1, e = 0;e < c.length;e++) {
    if (c[e].checked) {
      d = !0;
      break;
    }
  }
  0 == d && (b && 0 != b.length || (b = "Please select one option from " + a.name), sfm_show_error_msg(b, a));
  return d;
}
function validateInput(a, b, c) {
  var d = !0, e = a.search("="), g = "", f = "";
  0 <= e ? (g = a.substring(0, e), f = a.substr(e + 1)) : g = a;
  switch(g) {
    case "req":
    ;
    case "required":
      d = TestRequiredInput(b, c);
      break;
    case "maxlength":
    ;
    case "maxlen":
      d = TestMaxLen(b, f, c);
      break;
    case "minlength":
    ;
    case "minlen":
      d = TestMinLen(b, f, c);
      break;
    case "alnum":
    ;
    case "alphanumeric":
      d = TestInputType(b, "[^A-Za-z0-9]", c, b.name + ": Only alpha-numeric characters allowed ");
      break;
    case "alnum_s":
    ;
    case "alphanumeric_space":
      d = TestInputType(b, "[^A-Za-z0-9\\s]", c, b.name + ": Only alpha-numeric characters and space allowed ");
      break;
    case "num":
    ;
    case "numeric":
      d = TestInputType(b, "[^0-9]", c, b.name + ": Only digits allowed ");
      break;
    case "dec":
    ;
    case "decimal":
      d = TestInputType(b, "[^0-9.]", c, b.name + ": Only numbers allowed ");
      break;
    case "alphabetic":
    ;
    case "alpha":
      d = TestInputType(b, "[^A-Za-z]", c, b.name + ": Only alphabetic characters allowed ");
      break;
    case "alphabetic_space":
    ;
    case "alpha_s":
      d = TestInputType(b, "[^A-Za-z\\s]", c, b.name + ": Only alphabetic characters and space allowed ");
      break;
    case "email":
      d = TestEmail(b, c);
      break;
    case "lt":
    ;
    case "lessthan":
      d = TestLessThan(b, f, c);
      break;
    case "gt":
    ;
    case "greaterthan":
      d = TestGreaterThan(b, f, c);
      break;
    case "regexp":
      d = TestRegExp(b, f, c);
      break;
    case "dontselect":
      d = TestDontSelect(b, f, c);
      break;
    case "dontselectchk":
      d = TestDontSelectChk(b, f, c);
      break;
    case "shouldselchk":
      d = TestShouldSelectChk(b, f, c);
      break;
    case "selone_radio":
      d = TestSelectOneRadio(b, c);
  }
  return d;
}
function VWZ_IsListItemSelected(a, b) {
  for (var c = 0;c < a.options.length;c++) {
    if (1 == a.options[c].selected && a.options[c].value == b) {
      return !0;
    }
  }
  return !1;
}
function VWZ_IsChecked(a, b) {
  if (a.length) {
    for (var c = 0;c < a.length;c++) {
      if ("1" == a[c].checked && a[c].value == b) {
        return !0;
      }
    }
  } else {
    if ("1" == a.checked) {
      return !0;
    }
  }
  return !1;
}
;