const $ = (selector) => {
    const selectors = document.querySelectorAll(selector);
    return selectors.length === 1 ? selectors[0] : selectors;
};
const error = (message) => {
    return /* html */`<p style="color:red;">${message}</p>`;
};
const divError = new Array(7); //div errors input text and select option value = ""
divError[0] = $("#submitName");
divError[1] = $("#submitEmail");
divError[2] = $("#submitBrithDate");
divError[3] = $("#submitTel");
divError[4] = $("#submitAddress");
divError[5] = $("#submitCoSo");
divError[6] = $("#submitMajor");
divError[7] = $("#submitHobby");

const divErrorCheckBox = new Array(2);
divErrorCheckBox[0] = $("#submitGender");
divErrorCheckBox[1] = $("#submitSkill");


function checkAll() {
    let res = true;
    const inputs = new Array(7); 
    inputs[0] = $("#fullname").value;
    inputs[1] = $("#email").value;
    inputs[2] = $("#birthDate").value;
    inputs[3] = $("#phoneNumber").value;
    inputs[4] = $("#address").value;
    inputs[5] = $("#coso").value;
    inputs[6] = $("#major").value;
    inputs[7] = $("#hobby").value;
    const errors = new Array(7);
    errors[0] = error("Hãy nhập họ tên của bạn vào");
    errors[1] = error("Hãy nhập địa chỉ email hợp lệ");
    errors[2] = error("Hãy nhập ngày sinh của bạn");
    errors[3] = error("Hãy nhập số điện thoại chứa 10 kí tự số");
    errors[4] = error("Hãy nhập vào địa chỉ của bạn");
    errors[5] = error("Hãy chọn cơ sở Fpoly");
    errors[6] = error("Hãy chọn ngành học của bạn");
    errors[7] = error("Hãy chọn ít nhất 1 sở thích của bạn");

    for(let i in inputs) {
        if (inputs[i] === "") {
            divError[i].innerHTML = errors[i];
            res = false;
        }else {
            divError[i].innerHTML = error("");
        }
    }
    //check text input, select ... not checkbox


    if (!$("#male").checked && !$("#female").checked ) {
        divErrorCheckBox[0].innerHTML = error("Hãy chọn giới tính của bạn");
        res = false;
    }
    else {
        divErrorCheckBox[0].innerHTML = error("");
    }
    const temp = $("#skill");
    if (temp) {
        let notChecked = true;
        for(let i of temp) {
            if (i.checked) {
                notChecked = false;
                break;
            }
        }
        if (notChecked) {
            divErrorCheckBox[1].innerHTML = error("Hãy chọn ít nhất 1 kỹ năng");
            res = false;
        } else {
            divErrorCheckBox[1].innerHTML = error("");
        }
    }
    if(checkValid() && res){
        res = true;
    }else {
        res = false;
    }
    return res;
}
function checkValid() {
    let res = true;
    //check name.length >= 3
    let inputName = $("#fullname");
    if (inputName) {
        if(inputName.value !== "" && inputName.value.length < 3) {
            divError[0].innerHTML = error("Tên phải có từ 3 kí tự trở lên");
            res = false;
        } 
    }
    //check valid email
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let inputEmail = $("#email");
    if ((inputEmail.value).match(regexEmail)) {
        divError[1].innerHTML = error("");
    }else {
        if (inputEmail.value === ""){}
        else {
            divError[1].innerHTML = error("Email không đúng định dạng");
        }
        res = false;
    }
    //check numberphone is Number && length == 10 && start with 0
    let inputTel = $("#phoneNumber");
    if (!isNaN(inputTel.value) && inputTel.value.length === 10 && inputTel.value[0] === '0') {
        divError[3].innerHTML = error("");
    }else {
        if (inputTel.value === ""){}
        else {
            divError[3].innerHTML = error("Số điện thoại không đúng định dạng 10 số");
        }
        res = false
    }
    console.log("email ..." + res);
    return res;
}
function backToRegisterForm() {
    const btnBackToRegister = $("#back_register");
    if (btnBackToRegister) {
        btnBackToRegister.addEventListener("click", () => {
            $("#notification").style.display = "none";
            $("#register").style.display = "block";
        })
    }
}
function submit() {
    const btnSubmit = $("#save");
    if (btnSubmit) {
        btnSubmit.addEventListener("click", () => {
            if (checkAll()) {
                $("#register").style.display = "none";
                $("#notification").style.display = "block";
                console.log("abc")
            }else {
                console.log('asd')
            }
        })
    }
}
submit();
backToRegisterForm();