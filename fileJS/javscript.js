var barIcon = document.getElementById("bar_icon");

var openIcon = document.getElementById("open");

var openHeader = document.getElementById("nav_header");
var iconClose = document.getElementById("icon_close");
var closeIcon = document.getElementById("close");

function openClicl() {
  openHeader.style.display = "block";
  closeIcon.style.display = "block";
  openIcon.style.display = "none";
}

function closeCLick() {
  openHeader.style.display = "none";
  closeIcon.style.display = "none";
  openIcon.style.display = "block";
}

var hide = document.getElementById("hide");
var closeOut = document.getElementById("out");
console.log(closeOut);

function dangNhap() {
  var nodeAccount = document.getElementById("account");
  var account = nodeAccount.value;
  console.log(account);

  var nodePassword = document.getElementById("password");
  var password = nodePassword.value;
  console.log(password);

  var danhSachTaiKhoan = layDanhSachTaiKhoanDuoiLocalStorage();
  console.log(danhSachTaiKhoan);

  if (danhSachTaiKhoan == null) {
    alert("xin lỗi bạn chưa có tài khoản xin mời đăng ký");
  }
  for (var i = 0; i < danhSachTaiKhoan.length; i++) {
    var taiKhoan = danhSachTaiKhoan[i];
  }
  if (taiKhoan.accouts == account && taiKhoan.password == password) {
    alert("đăng nhập thành công");
    hide.style.display = "block";
    closeOut.innerHTML = "Thoát";
    var x = document.getElementById("links");
    x.href = "admin.html";
  } else {
    alert("Xin lỗi tài khoản hoặc mật khẩu không chính xác");
  }
}
