(function () {
  const PRICE_CENTS = 600;
  const form = document.querySelector("#order-form");
  const quantityInput = document.querySelector("#quantity");
  const total = document.querySelector("#total");
  const message = document.querySelector("#order-message");

  function clampQuantity(value) {
    const parsed = Number.parseInt(value, 10);
    if (Number.isNaN(parsed)) {
      return 1;
    }
    return Math.min(20, Math.max(1, parsed));
  }

  function updateTotal() {
    const quantity = clampQuantity(quantityInput.value);
    quantityInput.value = String(quantity);
    total.textContent = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format((PRICE_CENTS * quantity) / 100);
  }

  document.querySelectorAll(".quantity-button").forEach((button) => {
    button.addEventListener("click", () => {
      const step = Number.parseInt(button.dataset.step, 10);
      quantityInput.value = String(clampQuantity(Number(quantityInput.value) + step));
      updateTotal();
    });
  });

  quantityInput.addEventListener("input", updateTotal);
  quantityInput.addEventListener("blur", updateTotal);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    updateTotal();

    const quantity = clampQuantity(quantityInput.value);
    const treats = quantity * 3;
    message.textContent = `DM to order: ${quantity} bag${quantity === 1 ? "" : "s"} / ${treats} treats. Opening Instagram...`;
    window.open("https://ig.me/m/goldengoodiestreats", "_blank", "noopener");
  });

  updateTotal();
})();
