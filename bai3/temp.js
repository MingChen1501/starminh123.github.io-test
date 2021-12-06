import "./styles.css";

function $(selector) {
  const selectors = document.querySelectorAll(selector);
  return selectors.length === 1 ? selectors[0] : selectors;
}
// template string

const productList = [];

// console.log($("#formAdd"));
$("#formAdd").addEventListener("submit", function (e) {
  e.preventDefault();

  const product = {
    id: productList.length + 1,
    name: $("#product-name").value,
    price: $("#product-price").value
  };

  // Thêm phần tử vào mảng
  productList.push(product);
  // Hiển thị ra ngoài
  showProduct(productList);

  // Tinh tong gia tien
  totalPrice(productList);
});

function showProduct(data) {
  if (!Array.isArray(data) || !data.length) return [];

  const result = data
    .map(function (item, index) {
      return `
      <tr>
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td>${item.price}</td>
        <td><button onclick="removeItem(${
          item.id
        })" class="btn btn-danger">Xoa</button></td>
      </tr>
    `;
    })
    .join("");
  $("#productList").innerHTML = result;
}

window.removeItem = (id) => {
  // Tìm index của sản phẩm dựa vào id lấy được thông qua click button
  const productIndex = productList.findIndex((item) => item.id === id);
  // xóa phần tử dựa theo index
  productList.splice(productIndex, 1);
  // sau khi xóa xong thì gọi lại hàm showProduct để hiển thị danh sách
  // sản phẩm sau khi xóa
  showProduct(productList);
  // Tinh tong gia tien
  totalPrice(productList);
};

function totalPrice(data) {
  if (!Array.isArray(data) || !data.length) return 0;
  const total = data.reduce(function (prevValue, currentValue) {
    return prevValue + +currentValue.price;
  }, 0);
  $("#totalPrice").innerHTML = total;
}

showProduct(productList);
