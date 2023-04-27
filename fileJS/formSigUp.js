var keyDanhSachTaiKhoanLocalStorage = "account";

function TaoDoiTuongDangKy(accouts, passwords, password) {
  var dangKy = new Object();
  dangKy.accouts = accouts;
  dangKy.passwords = passwords;
  dangKy.password = password;

  dangKy.toJson = function () {
    var json = JSON.stringify(this);
    return json;
  };

  dangKy.fromJSON = function (json) {
    var doiTuongDayDu = new Object();
    var doiTuong = JSON.parse(json);

    var doiTuongDayDu = TaoDoiTuongSanPham(
      doiTuong.accouts,
      doiTuong.passwords,
      doiTuong.password
    );
    return doiTuongDayDu;
  };
  return dangKy;
}

function layDanhSachTaiKhoanDuoiLocalStorage() {
  var jsDanhSachTaiKhoan = localStorage.getItem(
    keyDanhSachTaiKhoanLocalStorage
  );
  danhSachTaiKhoan = JSON.parse(jsDanhSachTaiKhoan);
  return danhSachTaiKhoan;
}
