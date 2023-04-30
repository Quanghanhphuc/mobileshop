keyLocalStorageSanPham = "creatProduct";
keyLocalStorageItemGioHang = "danhSachItemGioHang";

function TaoDoiTuongSanPham(hinhAnh, ten, giaGoc, hangDT, moTa, id) {
  var sanPham = new Object();
  sanPham.hinhAnh = hinhAnh;
  console.log(sanPham.hinhAnh);
  sanPham.ten = ten;
  sanPham.giaGoc = giaGoc;
  sanPham.hangDT = hangDT;
  sanPham.moTa = moTa;
  if (id != null) {
    sanPham.id = id;
  } else {
    sanPham.id = taoID();
  }

  sanPham.tinhGiaBan = function () {
    var giaBan = this.giaGoc * (1 - this.phanTramGiamGia);
    return giaBan;
  };
  sanPham.toJson = function () {
    var json = JSON.stringify(this);
    return json;
  };

  sanPham.fromJSON = function (json) {
    var doiTuongDayDu = new Object();
    var doiTuong = JSON.parse(json);

    var doiTuongDayDu = TaoDoiTuongSanPham(
      doiTuong.hinhAnh,
      doiTuong.ten,
      doiTuong.giaGoc,
      doiTuong.hangDT,
      doiTuong.moTa
    );
    return doiTuongDayDu;
  };
  return sanPham;
}

function chuyenDanhSachSPSangHTML(creatProduct) {
  var danhSachSPHTML = '<div class="items">';
  for (let i = 0; i < creatProduct.length; i++) {
    var sanPham = creatProduct[i];
    var htmlSanPham = chuyenDoiTuongSangHTML(sanPham);
    danhSachSPHTML = danhSachSPHTML + htmlSanPham;
  }
  danhSachSPHTML = danhSachSPHTML + "</div>";
  return danhSachSPHTML;
}

function chuyenDoiTuongSangHTML(sanPham) {
  var html = "";
  html += '<div class="item">';

  html += ' <div class="item_image">';
  html += '<img src="' + sanPham.hinhAnh + '" alt="" id="image"/>';
  html += "  </div>";
  html += '  <h2 class="item_title">' + sanPham.ten + "</h2>";
  html += ' <div class="item_price">';
  html += ' <span class="item_origin">' + sanPham.giaGoc + "Đ</span>";
  html += "  </div>";
  html += '<div class="item_sale-text">' + sanPham.moTa + "</div>";
  html += '<div class="buyMoreCart">';
  html +=
    "<button onclick=\"themSPVaoGioHang('" +
    sanPham.id +
    '\')" class="btn">Thêm vào giỏ hàng</button>';
  html += " </div>";

  html += "</div>";
  return html;
}

function chuyenDanhSachSangHTMlChiTietSanPham(creatProduct) {
  var danhSachSPHTML = '<div class="productDescription">';

  for (let i = 0; i < creatProduct.length; i++) {
    var sanPham = creatProduct[i];
    var htmlSanPham = chuyenDoiTuongSangChiTietSP(sanPham);
    danhSachSPHTML = danhSachSPHTML + htmlSanPham;
  }
  danhSachSPHTML = danhSachSPHTML + "</div>";
  return danhSachSPHTML;
}

// function truyXuatDoiTuongTheoTen(id) {
//   var jsdanhsach = localStorage.getItem("creatProduct");
//   var danhsach = JSON.parse(jsdanhsach);

//   for (var i = 0; i < danhsach.length; i++) {
//     var doiTuongLayra = danhsach[i];
//     if (doiTuongLayra.id == id) {
//       return doiTuongLayra;
//     }
//   }
// }
/*
mục tiêu: từ idSanPham lấy lên đối tượng đầy đủ
input: idSanPham
output: đối tượng sản phẩm
*/
function laySanPhamTheoID(idSanPham) {
  var sanPham = new Object();

  /*bước 1: lấy toàn bộ sản phẩm từ localstorage xuống*/
  var danhSachSanPham = layDanhSachSanPhamDuoiLocalStorage();

  /*bước 2: tìm đối tượng có id= idSanPham*/
  for (var i = 0; i < danhSachSanPham.length; i++) {
    var sanPhamHienTai = danhSachSanPham[i];
    if (sanPhamHienTai.id == idSanPham) {
      sanPham = sanPhamHienTai;
    }
  }

  /*bước 3: chuyển đối tương thành đối tượng đầy đủ */
  sanPham = TaoDoiTuongSanPham(
    sanPham.hinhAnh,
    sanPham.ten,
    sanPham.giaGoc,
    sanPham.id
  );
  return sanPham;
}
/**lấy toàn bộ danh sách dưới localstorage */
function layDanhSachSanPhamDuoiLocalStorage() {
  var jsDanhSanPham = localStorage.getItem(keyLocalStorageSanPham);
  var danhSachSanPham = JSON.parse(jsDanhSanPham);
  return danhSachSanPham;
}

function LayDanhSachItemGioHangDuoiLocalStorage() {
  var jsDanhSachItemGioHang = localStorage.getItem(keyLocalStorageItemGioHang);
  danhDachItemGioHang = JSON.parse(jsDanhSachItemGioHang);
  return danhDachItemGioHang;
}

function luuDanhSachSanPhamVaoXuongLocalStorage(keyLocalStorageSanPham) {
  // bước 1: chuyển thành chuỗi json
  var jsDanhSachSanPham = JSON.stringify(keyLocalStorageSanPham);
  // bước 2: lưu vào localStorage
  localStorage.setItem(keyLocalStorageSanPham, jsDanhSachSanPham);
}
function chooseFile(fileInput) {
  if (fileInput.files && fileInput.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $("#image").attr("src", e.target.result);
    };

    reader.readAsDataURL(fileInput.files[0]);
  }
}
