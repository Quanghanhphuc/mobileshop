function taoID() {
  var id = "";
  id = String(new Date().getTime());
  return id;
}
function chooseFile(fileInput) {
  if (fileInput.files && fileInput.files[0])
    console.log(fileInput.files && fileInput.files[0]);
  {
    var reader = new FileReader();
    console.log(reader);
    reader.onload = function (e) {
      $("#image").attr("src", e.target.result);
    };
    reader.readAsDataURL(fileInput.files[0]);
  }
}
