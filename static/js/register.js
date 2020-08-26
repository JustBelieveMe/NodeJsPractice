// author: JustBelieveMe王俊武
// target: test and practice

$().ready(function () {
    $("#sheet").validate({
        rules: {
            company: "require",
            employeeId: "require",
            name: "require",
            gneder: "require",
        },
        message: {
            company: "請輸入公司名稱",
            employeeId: "請輸入員工編號",
            name: "請輸入姓名",
            gender: "請選擇性別"
        }
    });
})



$("#clear_btn").click(function () {
    $("input[type=\"text\"]").val(null);
})

function fillsheet() {

}

function addItem() {
    $("#addNew").click(function () {
        const remarks = document.getElementById("remarks");
        const remarkValue = remarks.value;
        $("#remarksTextarea").val(remarkValue + "\n");
    })
}


$("#headShot").change(function () {
    readURL(this);
})


function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $("#imgPreview").attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}


