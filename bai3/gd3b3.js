const $ = (selector) => {
    const selectors = document.querySelectorAll(selector);
    return selectors.length === 1 ? selectors[0] : selectors;
}
let listProducts = [];
let indexRemove = [];
function SumPrice(data) {
    const sum = data.reduce((preValue, curValue) => {
        return preValue + curValue.totalPrice; 
    }, 0)
    $("#totalPrice").innerHTML = sum;
}
function showProducts(data) {
    const result = data.map((item, index) => {
        return /* html */`
        <tr>
            <td><input type="checkbox" value="${index}" id="remove"></td> 
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td><input type="number" value="${item.price}" id="showValue"></td>
            <td><input type="number" value="${item.quantity}" id="showQuantity"></td>
            <td>${item.totalPrice}</td>
        </tr>
    `
    }).join("");
    $("#listProduct").innerHTML = result;
    if(indexRemove.length !== 0) {
        indexRemove.splice(0, indexRemove.length);
    }
    SumPrice(listProducts);
    listProductremove();
    changeValueInListProducts();
}
function listProductremove() {
    const listRemove = document.querySelectorAll("#remove");
    for (let id of listRemove) {
        id.addEventListener("click", () => {
            if (id.checked && !indexRemove.includes(id.value)){
                indexRemove.push(id.value);
            } else {
                indexRemove = indexRemove.filter(item => item !== id.value);
            }
        })
    }
}
function removeProduct() {
    const btnRemove = $("#removeProducts")
    btnRemove.addEventListener("click", () => {
        if(indexRemove.length > 0) {
            indexRemove.sort((a, b) => +(a) - +(b));
            while(indexRemove.length !== 0) {
                let i = +indexRemove[indexRemove.length - 1]
                listProducts.splice(i, 1);
                indexRemove.pop();
            }
            showProducts(listProducts);
        }
    })
}
function changeValueInListProducts() {
    const price = document.querySelectorAll("#showValue")
    if(price) {
        for(let i of price) {
            let b = +i.parentElement.previousElementSibling.previousElementSibling.innerHTML - 1;
            i.addEventListener("change", () => {
                listProducts[b].price = +i.value;
                listProducts[b].totalPrice = listProducts[b].quantity * listProducts[b].price;
                showProducts(listProducts);
            })
        }
    }
    const quantity = document.querySelectorAll("#showQuantity");
    if(quantity) {
        for(let i of quantity) {
            let b = +i.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML - 1;
            i.addEventListener("change", () => {
                listProducts[b].quantity = +i.value;
                listProducts[b].totalPrice = listProducts[b].quantity * listProducts[b].price;
                showProducts(listProducts);
            })
        }
    }
}
function addProduct() {
    const btnAdd = $("#addProduct");
    if(btnAdd) {
        btnAdd.addEventListener("click", () => {
            const product = {
                name: $("#productName").value,
                price: +$("#price").value,
                quantity: +$("#quantity").value,
                totalPrice: $("#price").value * $("#quantity").value
            }
            listProducts.push(product);
            showProducts(listProducts);
        });
    }
}
addProduct();
removeProduct();

function test(n) {
    listProducts.push({
        name: "cam",
        price: 20000,
        quantity: 4,
        totalPrice: 80000
    })
    
    listProducts.push({
        name: "xoai",
        price: 20000,
        quantity: 4,
        totalPrice: 80000
    })
    
    listProducts.push({
        name: "le",
        price: 30000,
        quantity: 5,
        totalPrice: 150000
    }) 
    showProducts(listProducts);
    
    if (n && n > 1) return test(n-1);
}
