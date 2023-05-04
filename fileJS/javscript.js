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
  console.log(account);
  const password = document.getElementById("password").value;
  console.log(password);
  const email = document.getElementById("email").value;
  console.log(email);

  const taoDoiTuogDanhSachTK = TaoDoiTuongDangKy(account, password, email);
  console.log(taoDoiTuogDanhSachTK);
  if (account == "" || password == "" || email == "") {
    showLoi();
  } else {
    formDangKy.push(taoDoiTuogDanhSachTK);
    showThanhCongThongBao();
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
    kiemTraTK();
  } else {
    showLoi();
  }
}

var danhSachTK = layDanhSachTaiKhoanDuoiLocalStorage();

var isLogin = !!localStorage.getItem("luuBoNho"); //?true:fale

function kiemTraTK() {
  if (isLogin) {
    window.location.href = "admin.html";
    showThanhCongThongBao(
      toast({
        title: "Thành Công",
        message: "Chúc mừng bạn đã đăng ký thành công",
        type: "thanhCong",
        duration: 3000,
      })
    );
  }
}
function toast({ title = "", message = "", type = "info", duration = 3000 }) {
  var main = document.getElementById("toasts");
  if (main) {
    var html = document.createElement("div");

    var autoRemove = setTimeout(function () {
      main.removeChild(html);
    }, duration + 1000);
  }

  html.onclick = function (e) {
    if (e.target.closest(".toast_close")) {
      main.removeChild(html);
      clearTimeout(autoRemove);
    }
  };
  var toastIcon = {
    thanhCong: "fa-solid fa-check",
    loi: "fa-solid fa-info",
    canhBao: "fa-solid fa-triangle-exclamation",
    error: "fa-solid fa-triangle-exclamation",
  };
  var delay = (duration / 1000).toFixed(2);
  var icon = toastIcon[type];
  html.classList.add("toastss", `toast${type}`);
  html.style.animation = `sliderToast ease 0.5s, fadeOut linear 1s ${delay}s forwards`;
  html.innerHTML =
    '<div class="toast toastss">\n' +
    '          <div class="  ">\n' +
    '            <h3 class="toast_body--title">' +
    title +
    "</h3>\n" +
    '            <p class="toast_body--message">' +
    message +
    "</p>\n" +
    "          </div>\n" +
    "        </div>";

  main.appendChild(html);
}

function showThanhCongThongBao() {
  toast({
    title: "Thành Công",
    message: "Chúc mừng bạn đã đăng ký thành công",
    type: "thanhCong",
    duration: 3000,
  });
}

function showLoi() {
  toast({
    title: "Không thành công",
    message: "Thông tin bạn nhập không chính xác mời nhập lại",
    type: "loi",
    duration: 3000,
  });
}

var ishow = false;

function onclickOpen(element) {
  ishow = !ishow;
  if (ishow) {
    document.getElementById("nav_header").style.left = "0";
    document.getElementById("bar_icon").style.marginLeft = "190px";
    document.getElementById("search").style.display = "none";
  } else {
    document.getElementById("nav_header").style.left = "-240px";
    document.getElementById("bar_icon").style.marginLeft = "10px";
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
