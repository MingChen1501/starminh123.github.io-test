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
            <td>${item.price}</td>
            <td>${item.quantity}</td>
            <td>${item.totalPrice}</td>
        </tr>
    `
    }).join("");
    $("#listProduct").innerHTML = result;
    SumPrice(listProducts);
    listProductremove();
    //# = id, stt = index in data
}
function listProductremove() {
    const listRemove = document.querySelectorAll("#remove");
    //let res = [];
    //let can be re-assign
    for (let id of listRemove) {
        id.addEventListener("click", () => {
            if (id.checked && !indexRemove.includes(id.value)){
                /* console.log("push"); */
                /* res.push(id.value); */
                indexRemove.push(id.value);
                /* console.table(indexRemove); */
            } else {
                /* console.log("filter"); */
                indexRemove = indexRemove.filter(item => item !== id.value);
                /* console.table(indexRemove); */
            }
        })
    }
    //res contain id product is checked in listProducts  remove
    
}
function removeProduct() {
    
    const btnRemove = $("#removeProducts")
    btnRemove.addEventListener("click", () => {
        if(indexRemove.length > 0) {
            /* console.log("index List truoc khi sort")
            console.table(indexRemove); */
            indexRemove.sort((a, b) => +(a) - +(b));
            /* console.log("index List sau khi sort")
            console.table(indexRemove);
            console.log("list truoc khi xoa")
            console.table( listProducts); */
            while(indexRemove.length !== 0) {
                let i = +indexRemove[indexRemove.length - 1]
                listProducts.splice(i, 1);
                indexRemove.pop();
                //0 1 2 3 4 5
                //
            }
           /*  console.log("index List sau khi xoa")
            console.table(indexRemove);
            console.log("list sau khi xoa")
            console.table( listProducts); */
            showProducts(listProducts);
        }
    })
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
        price: 2,
        quantity: 4,
        totalPrice: 8
    })
    
    listProducts.push({
        name: "xoai",
        price: 3,
        quantity: 4,
        totalPrice: 12
    })
    
    listProducts.push({
        name: "le",
        price: 3,
        quantity: 5,
        totalPrice: 15
    }) 
    showProducts(listProducts);
    if (n != 0) return test(n-1);
}
