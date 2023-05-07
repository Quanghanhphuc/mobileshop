var keyDanhSachTaiKhoanLocalStorage = "account";

function layDanhSachTaiKhoanDuoiLocalStorage() {
  var jsDanhSachTaiKhoan = localStorage.getItem(
    keyDanhSachTaiKhoanLocalStorage
  );

  danhSachTaiKhoan = JSON.parse(jsDanhSachTaiKhoan);
  return danhSachTaiKhoan;
}

function TaoDoiTuongDangKy(account, password, email) {
  var dangKy = new Object();
  dangKy.account = account;
  dangKy.password = password;
  dangKy.email = email;

  dangKy.toJson = function () {
    var json = JSON.stringify(this);
    return json;
  };

  dangKy.fromJSON = function (json) {
    var doiTuongDayDu = new Object();
    var doiTuong = JSON.parse(json);

    var doiTuongDayDu = TaoDoiTuongSanPham(
      doiTuong.account,
      doiTuong.password,
      doiTuong.email
    );
    return doiTuongDayDu;
  };
  return dangKy;
}
var formDangKy = JSON.parse(localStorage.getItem("account"));
if (formDangKy == null) {
  formDangKy = new Array();
}

function clearInput() {
  document.getElementById("account").value = "";
  document.getElementById("password").value = "";
  document.getElementById("email").value = "";
}

function clearInputAdd() {
  document.getElementById("hinhAnh").value = "";
  document.getElementById("ten").value = "";
  document.getElementById("giaGoc").value = "";
  document.getElementById("hangDT").value = "";
  document.getElementById("moTa").value = "";
}
function validateInput() {
  const fomElement = document.querySelector(".form");
  const inPutElemen = fomElement.querySelectorAll(".input_check");
  for (let i = 0; i < inPutElemen.length; i++) {
    if (inPutElemen[i].value === "") {
      inPutElemen[i].parentElement.querySelector(
        ".error"
      ).innerText = `không được để trống ${inPutElemen[i].id}`;
    } else {
      inPutElemen[i].parentElement.querySelector(".error").innerText = "";
    }
  }
}
var danhSachTK = localStorage.getItem(keyDanhSachTaiKhoanLocalStorage)
  ? JSON.parse(localStorage.getItem(keyDanhSachTaiKhoanLocalStorage))
  : [];
function checkInputAccount() {
  const danhSachTaiKhoan = localStorage.getItem(keyDanhSachTaiKhoanLocalStorage)
    ? JSON.parse(localStorage.getItem(keyDanhSachTaiKhoanLocalStorage))
    : [];
  var accounts = document.getElementById("account").value;
  for (var i = 0; i < danhSachTaiKhoan.length; i++) {
    if (danhSachTaiKhoan[i].account == accounts) {
      console.log(danhSachTaiKhoan[i].account);
      return true;
    }
  }
}
// form đăng ký-----------------

function dangKy() {
  validateInput();
  const fomElement = document.querySelector(".form");
  const error = fomElement.querySelectorAll(".error");
  const errors = [];
  for (let i = 0; i < error.length; i++) {
    errors.push(error[i].innerText);
  }

  const account = document.getElementById("account").value;
  const password = document.getElementById("password").value;
  const email = document.getElementById("email").value;

  const taoDoiTuogDanhSachTK = TaoDoiTuongDangKy(account, password, email);

  if (checkInputAccount() || account == "" || password == "" || email == "") {
    showToast(errorMsg);
  } else {
    formDangKy.push(taoDoiTuogDanhSachTK);
    showToast(succsesMsg);
    clearInput();
  }

  localStorage.setItem("account", JSON.stringify(formDangKy));
}

// form đăng nhập-----------------
function dangNhap() {
  validateInput();
  const fomElement = document.querySelector(".form");
  const error = fomElement.querySelectorAll(".error");
  const errors = [];
  for (let i = 0; i < error.length; i++) {
    errors.push(error[i].innerText);
  }
  const tenTaiKhoan = document.getElementById("account").value;

  const matKhau = document.getElementById("password").value;

  const kiemTraTk = danhSachTK.some(
    (value) => value.account === tenTaiKhoan && value.password === matKhau
  );

  if (kiemTraTk) {
    localStorage.setItem("luuBoNho", tenTaiKhoan);
    isLogin = true;
    window.location.href = "admin.html";
  } else {
    showToast(errorMsg);
  }
}

var isLogin = !!localStorage.getItem("luuBoNho"); //?true:fale

function kiemTraTK() {
  if (isLogin) {
    window.location.href = "admin.html";
  }
}

var ishow = false;

function onclickOpen(element) {
  ishow = !ishow;
  if (ishow) {
    document.getElementById("nav_header").style.left = "0";
    document.getElementById("bar_icon").style.marginLeft = "150px";
    document.getElementById("search").style.display = "none";
  } else {
    document.getElementById("nav_header").style.left = "-240px";
    document.getElementById("bar_icon").style.marginLeft = "10px";
    document.getElementById("search").style.display = "block";
  }
}

// var imagess = document.getElementById("hinhAnh");
// console.log(imagess);
// var src = "";

// imagess.addEventListener("change", function () {
//   console.log(imagess.value);
//   var reader = new FileReader();

//   reader.addEventListener("load", () => {
//     src = reader.result;

//     return src;
//   });
//   reader.readAsDataURL(this.files[0]);
// });
var toastBox = document.getElementById("toastBox");
var succsesMsg = '<i class="fa-solid fa-circle-check"></i> Thành Công';
var errorMsg = '<i class="fa-solid fa-circle-xmark"></i> Xin kiểm tra lại';
var ifoMsg =
  '<i class="fa-solid fa-circle-exclamation"></i> Cảnh báo chưa nhập thông tin';
function showToast(msg) {
  var toast = document.createElement("div");
  toast.classList.add("toast");
  toast.innerHTML = msg;
  toastBox.appendChild(toast);

  if (msg.includes("tra")) {
    toast.classList.add("tra");
  }
  if (msg.includes("Cảnh")) {
    toast.classList.add("Cảnh");
  }

  setTimeout(() => {
    toast.remove();
  }, 6000);
}
