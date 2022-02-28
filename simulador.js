class Config {
  static get currencySymbol() {
    return "AR$";
  }
}

class Product {
  constructor(prodName, prodPrice, prodStock) {
    this.name = prodName;
    this.price = prodPrice;
    this.stock = prodStock;
  }

  show() {
    return `${this.name} - ${this.price}${Config.currencySymbol} - ${this.stock} unidades`;
  }
}

class ShoppingCartProduct {
  constructor(product, amount) {
    this.product = product;
    this.amount = amount;
  }

  get finalPrice() {
    return (this.product.price * this.amount).toFixed(2);
  }

  show() {
    return `${this.product.name}: ${this.amount} u. x ${this.product.price}${Config.currencySymbol} = ${this.finalPrice}${Config.currencySymbol}`;  }
}

class ShoppinigCart {
  constructor() {
    this.products = [];
  }

  addProduct(product, amount) {
    const index = this.products.findIndex((pc) => pc.product === product);

    let shoppingCartProduct;
    if (index === -1) {
      shoppingCartProduct = new ShoppingCartProduct(product, 0);
    } else {
      shoppingCartProduct = this.products[index];
    }

    if (product.stock >= shoppingCartProduct.amount + amount) {
      shoppingCartProduct.amount += amount;
      product.stock -= amount;
      if (index === -1) {
        this.products.push(shoppingCartProduct);
      } else {
        this.products[index] = shoppingCartProduct;
      }
      return `${product.name} (${product.price}${Config.currencySymbol} x ${shoppingCartProduct.amount} = ${shoppingCartProduct.finalPrice}${Config.currencySymbol}) agregado!`;
    } else {
      return `No hay stock suficiente de ${product.name}. Stock actual: ${product.stock}`;
    }
  }

  show() {
    let total = 0;
    this.products.forEach((p) => {      
      total += Number(p.finalPrice);
    });    
    return `${this.products
      .map((p) => p.show())
      .join("\n")}\nTotal: ${Number(total).toFixed(2)}${Config.currencySymbol}`;
  }
}

const products = [];
const shoppingCart = new ShoppinigCart();
const productsNames = ["Logitech G Series G733", "Gigabyte Geforce Rtx 3090", "Redragon Shiva K512"]
for (let index = 0; index < productsNames.length; index++) {
  products.push(
    new Product(
      productsNames[index],
      Number((Math.random() * 1000).toFixed(2)),
      Number(Math.floor(Math.random() * 100000).toFixed(2))
    )
  );
}

const main = function () {
  const name = prompt("Hola!! Cual es tu nombre?") ?? "";
  alert(
    `Hola ${name}, en la siguiente ventana vas a ver todos los productos que tenemos para ofrecerte`
  );
  alert(getAvailableProducts());
  const addProductsToCart = confirm("¿Deseas elegir algún producto?");
  if (addProductsToCart) {
    loadProducts();
  }
  alert(shoppingCart.show());
  console.log("Adios :)");
};

function getAvailableProducts() {
  let availableProducts = "Los productos disponibles son:\n";

  for (let index = 0; index < products.length; index++) {
    const prod = products[index];
    if (prod.stock > 0) {
      availableProducts += `${prod.show()}\n`;
    }
  }
  return availableProducts;
}

function loadProducts() {
  let exit = false;
  do {
    const productName = (
      prompt("Ingrese el nombre del producto") ?? ""
    ).toLowerCase();

    let amount = parseInt(prompt("Cuantas unidades?") ?? 0);
    while (amount <= 0) {
      alert(`La cantidad (${cantidad}) ingresada es incorrecta.`);
      amount = parseInt(prompt("Cuantas unidades?") ?? 0);
    }

    const product = products.find(
      (p) => p.name.toLowerCase() === productName
    );
    if (product) {
      alert(shoppingCart.addProduct(product, amount));
    } else {
      alert(
        `El producto '${productName}' no se encontró en nuestra base de datos :O`
      );
    }

    const continueAddingProducts = confirm("¿Desea continuar agregando productos?");
    exit = !continueAddingProducts;
  } while (!exit);
}

main();
