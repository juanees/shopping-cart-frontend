class Config {
  static get currencySymbol() {
    return "AR$";
  }
}

class Product {
  constructor(prodName, prodPrice, prodDescription, prodStock, prodImage) {
    this.name = prodName;
    this.price = prodPrice;
    this.description = prodDescription;
    this.stock = prodStock;
    this.imageURI = prodImage;
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
    return `${this.product.name}: ${this.amount} u. x ${this.product.price}${Config.currencySymbol} = ${this.finalPrice}${Config.currencySymbol}`;
  }
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
    return `${this.products.map((p) => p.show()).join("\n")}\nTotal: ${Number(
      total
    ).toFixed(2)}${Config.currencySymbol}`;
  }
}

const products = [];

/** INIT PRODUCTS ARRAY **/
// prodName, prodPrice, prodDescription, prodStock, prodImage
products.push(
  new Product(
    "Logitech G Series G733",
    1232,
    "¡Experimentá la adrenalina de sumergirte en la escena de otra manera!",
    1,
    "https://http2.mlstatic.com/D_NQ_NP_2X_724084-MLA44771577124_022021-F.webp"
  )
);

products.push(
  new Product(
    "Gigabyte Geforce Rtx 3090",
    2300,
    "Nvidia es el fabricante líder de placas de video; su calidad asegura una experiencia positiva en el desarrollo del motor gráfico de tu computadora.",
    2,
    "https://http2.mlstatic.com/D_NQ_NP_2X_800490-MLA45639317539_042021-F.webp"
  )
);

products.push(
  new Product(
    "Redragon Shiva K512",
    321,
    "Disfrutá de tus partidas en otro nivel con Redragon",
    3,
    "https://http2.mlstatic.com/D_NQ_NP_2X_852452-MLA47614354444_092021-F.webp"
  )
);

products.push(
  new Product(
    "Pendrive SanDisk 16GB",
    600,
    "Este pendrive te permitirá almacenar hasta 16 GB para que puedas guardar gran cantidad de información, imágenes u otros tipos de archivos.",
    4,
    "https://http2.mlstatic.com/D_NQ_NP_2X_794011-MLA32123024675_092019-F.webp"
  )
);

const shoppingCart = new ShoppinigCart();

/**
 * Function in charge of creating products elements and insert them in the dom
 */
function setProductsOnDOM() {
  const shopElement = document.querySelector("#wrap > section");
  products.forEach((prod) => {
    const productTemplate = document.createElement("div");
    productTemplate.setAttribute("class", "product");
    productTemplate.setAttribute(
      "style",
      `background-image: url('${prod.imageURI}');`
    );

    const title = document.createElement("h1");
    title.innerText = prod.name;

    const description = document.createElement("p");
    description.innerText = prod.description;

    const customButton = document.createElement("div");
    customButton.setAttribute("class", "button");

    const price = document.createElement("div");
    price.setAttribute("class", "price");
    price.innerText = `${prod.price}${Config.currencySymbol}`;
    customButton.appendChild(price);

    const link = document.createElement("a");
    link.setAttribute("class", "addtocart");
    const add = document.createElement("div");
    add.setAttribute("class", "add");
    add.innerText = "Add to Cart";
    const added = document.createElement("div");
    added.setAttribute("class", "added");
    added.innerText = "Add to Cart";
    link.appendChild(add);
    link.appendChild(added);
    customButton.appendChild(link);

    productTemplate.appendChild(title);
    productTemplate.appendChild(description);
    productTemplate.appendChild(customButton);

    shopElement.appendChild(productTemplate);
  });
}

const main = function () {
  setProductsOnDOM();
  // const name = prompt('Hola!! Cual es tu nombre?') ?? '';
  // alert(
  //   `Hola ${name}, en la siguiente ventana vas a ver todos los productos que tenemos para ofrecerte`
  // );
  // alert(getAvailableProducts());
  // const addProductsToCart = confirm('¿Deseas elegir algún producto?');
  // if (addProductsToCart) {
  //   loadProducts();
  // }
  // alert(shoppingCart.show());
  // console.log('Adios :)');
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

    const product = products.find((p) => p.name.toLowerCase() === productName);
    if (product) {
      alert(shoppingCart.addProduct(product, amount));
    } else {
      alert(
        `El producto '${productName}' no se encontró en nuestra base de datos :O`
      );
    }

    const continueAddingProducts = confirm(
      "¿Desea continuar agregando productos?"
    );
    exit = !continueAddingProducts;
  } while (!exit);
}

main();
