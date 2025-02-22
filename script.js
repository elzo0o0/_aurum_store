// Обработчик для бургер-меню
const mobileMenu = document.getElementById("mobile-menu");
const nav = document.querySelector("nav");

mobileMenu.addEventListener("click", () => {
  nav.classList.toggle("active");
});

// Инициализация корзины
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Функция для обновления отображения количества товаров в корзине
function updateCartCount() {
  const cartCount = document.querySelector(".cart a");
  cartCount.textContent = `Корзина (${cart.length})`;
}

// Функция для добавления товара в корзину
function addToCart(productName, productPrice) {
  const product = {
    name: productName,
    price: productPrice,
  };
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart)); // Сохраняем корзину в localStorage
  updateCartCount();
  alert(`${productName} добавлен в корзину!`);
}

// Функция для отображения корзины (можно добавить модальное окно)
function showCart() {
  const cartContent = cart
    .map((item) => `${item.name} - ${item.price}`)
    .join("\n");
  alert(`Ваша корзина:\n${cartContent}`);
}

// Обработчик событий для кнопок "Добавить в корзину"
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount(); // Обновляем количество товаров при загрузке страницы

  const addToCartButtons = document.querySelectorAll(".product-card button");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productCard = button.closest(".product-card");
      const productName = productCard.querySelector("h3").textContent;
      const productPrice = productCard.querySelector("p").textContent;
      addToCart(productName, productPrice);
    });
  });

  // Обработчик для ссылки "Корзина"
  const cartLink = document.querySelector(".cart a");
  cartLink.addEventListener("click", (e) => {
    e.preventDefault(); // Предотвращаем переход по ссылке
    showCart();
  });
});

// Функция для отображения модального окна с корзиной
function showCartModal() {
  const modal = document.getElementById("cartModal");
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  // Очищаем содержимое корзины перед обновлением
  cartItems.innerHTML = "";

  // Добавляем товары в корзину
  let total = 0;
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.price}`;
    cartItems.appendChild(li);
    total += parseFloat(item.price.replace("₽", "").replace(",", ""));
  });

  cartTotal.textContent = `Общая сумма: ${total.toFixed(2)}₽`;

  modal.style.display = "block";
}

document.querySelector(".close").addEventListener("click", () => {
  document.getElementById("cartModal").style.display = "none";
});

document.getElementById("clearCart").addEventListener("click", () => {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showCartModal();
});

const cartLink = document.querySelector(".cart a");
cartLink.addEventListener("click", (e) => {
  e.preventDefault();
  showCartModal();
});
