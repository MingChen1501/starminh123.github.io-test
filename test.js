var regExPhonNumber = /^\d{10}$/;

const carts = [
    {name: "bánh ngọt phomai", price: 1000, quantity: 1},
    {name: "bánh ngọt phomai", price: 500, quantity: 1},
    {name: "bánh ngọt phomai", price: 2000, quantity: 1}
]
function showCarts(list) {
    let topRow = `
    <tr>
        <td>STT</td>
        <td>Ten san pham</td>
        <td>Don gia</td>
        <td>So luong</td>
        <td>Thanh tien</td>
    </tr>`
    let botRow =  `
    <tr>
        <td colspan="4">Tong tien</td>
        <td id="totalPrice"></td>
    </tr>`
    const result = list.map((item, index) => {
        return `
        <tr>
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td><input type="number" class="quantity" value="${item.quantity}"></td>
            <td>${item.price * item.quantity}</td>
        </tr>`
    }).join("");
    
    document.getElementById("carts").innerHTML = topRow + result + botRow;
    changeQuantity();
    totalMoney(carts);
    //tạo event khi change quantity
}
function totalMoney(data) {
    const result = data.reduce((a, b) => a + b.price * b.quantity, 0);
    document.getElementById("totalPrice").innerHTML = result;

}
function checkQuantity(value) {
    if(value > 0) {
        return true;
    }
}
function changeQuantity() {
    let quantitys = document.querySelectorAll(".quantity");
    console.log(quantitys);
    for (let [i, quantity] of quantitys.entries()) {
        quantity.addEventListener("change", function() {
            if (checkQuantity(quantity.value)) {
                carts[i].quantity = quantity.value;
            }else {
                carts[i].quantity = 1;
            }
            showCarts(carts);
        });
    }

}
function validate() {
    let send = document.getElementById("send");
    if (send) {
        send.addEventListener("click", function() {
            console.log("a");
            let error = "";
            let inputs = [
                document.getElementById("customerName").value,
                document.getElementById("phoneNumber").value
            ]
            const errors = [
                "loi ten <br>",
                "loi sdt <br>"
            ]
            for (i in inputs) {
                let message = errors[i];
                //validate

                if (inputs[i] === "") error += message;
                else if (i === 0 && inputs[i] === "") error +=message;
                else if (!regExPhonNumber.test(inputs[1])) error = errors[1];
            }
            console.log(inputs[1]);
            console.log(regExPhonNumber.test(inputs[1]))
            if (error === "") document.getElementById("alert").innerHTML = "done";
            else document.getElementById("alert").innerHTML = error;
        })
    }
}
validate();
showCarts(carts);
//.changeQuantity();
//changeQuantity();