var keyLocalStorageGioHang = "danhSachItemGioHang";

/** yêu cầu tạo ra đối tượng item giỏ hàng
input: idSanPham, soluong
output: đối tượng item giỏ hàng 
* */

function layGioHangTuLocalStorage() {
  var gioHang = new Array();
  var jsGioHang = localStorage.getItem(keyLocalStorageGioHang);

  if (jsGioHang != null) gioHang = JSON.parse(jsGioHang);

  return gioHang;
}

function themSanPhamVaoGioHang(idSanPham, gioHang) {
  var gioHangSauKhiDuocThem = gioHang;
  var itemGioHang = taoDoiTuongItemGioHang(idSanPham, 1);
  ("");
  gioHangSauKhiDuocThem.push(itemGioHang);
  return gioHangSauKhiDuocThem;
}
/**
 bước hai: lấy ra toàn bộ item được lưu trữ trên localstrorage
 input: trống
 output: danh sách toàn bộ item được đưa vào giỏ hàng
 **/

function luuGioHangVaoLocalStorage(gioHang) {
  // bước 1: chuyển thành chuỗi json
  var jsGioHang = JSON.stringify(gioHang);
  // bước 2: lưu vào localStorage
  localStorage.setItem(keyLocalStorageGioHang, jsGioHang);
}
function taoDoiTuongItemGioHang(idSanPham, soLuong) {
  var itemGioHang = new Object();

  itemGioHang.idSanPham = idSanPham;
  itemGioHang.soLuong = soLuong;
  return itemGioHang;
}
