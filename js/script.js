function createGridCard({
  imageSrc = "./assets/images/product.png",
  title = "Product Title",
  price = "₹0",
  rating = "0.0",
  time = "0-0 min",
}) {
  return `
    <div class="w-fit flex flex-col rounded-md shadow-sm gap-2" style="background-color: var(--white)">
      <img src="${imageSrc}" alt="${title}" width="300" height="300" />
      <div class="mx-4 flex flex-col gap-2 pb-2">
        <div class="flex items-center justify-between">
          <h4 class="card-h4">${title}</h4>
          <h4 class="card-h4">${price}</h4>
        </div>
        <div class="flex justify-between">
          <div class="flex justify-between items-center gap-4">
            <span class="flex justify-between items-center" style="background-color: var(--background-white);">
              <img src="./assets/icons/star.svg" alt="">
              <span class="card-span">${rating}</span>
            </span>
            <span class="card-span" style="background-color: var(--background-white);">
              [ ${time} ]
            </span>
          </div>
          <img src="./assets/icons/plus.svg" alt="">
        </div>
      </div>
    </div>
  `;
}

function createSlideCard({
  imageSrc = "./assets/images/product.png",
  title = "Product Title",
  price = "₹0",
  rating = "0.0",
  time = "0-0 min",
}) {
  return `
    <div class="swiper-slide">
      <div class="w-fit m-auto shadow-md flex flex-col gap-2 rounded-md" style="background-color: var(--white)">
        <img src="${imageSrc}" alt="${title}" width="300" height="300" />
        <div class="mx-4 flex flex-col gap-2 pb-2">
          <div class="flex items-center justify-between">
            <h4 class="card-h4">${title}</h4>
            <h4 class="card-h4">${price}</h4>
          </div>
          <div class="flex justify-between">
            <div class="flex justify-between items-center gap-4">
              <span class="flex justify-between items-center" style="background-color: var(--background-white);">
                <img src="./assets/icons/star.svg" alt="">
                <span class="card-span">${rating}</span>
              </span>
              <span class="card-span" style="background-color: var(--background-white);">
                [ ${time} ]
              </span>
            </div>
            <img src="./assets/icons/plus.svg" alt="">
          </div>
        </div>
      </div>
    </div>
  `;
}

function createDailogCard({
  imageSrc = "./assets/images/product.png",
  title = "Product Title",
  price = "₹0",
  rating = "0.0",
  time = "0-0 min",
}) {
  return `
<div class="m-4 gap-4 flex flex-col items-center">
  <img
    class="rounded-md"
    src=${imageSrc}
    alt="Product Image"
    width="300"
    height="300"
  />

  <h3>${title}</h3>
  <div class="flex items-center justify-between">
    <h4 class="card-h4">${price}</h4>
  </div>
  <div class="flex justify-between w-full gap-2">
    <div class="flex justify-between items-center gap-4 w-full">
      <span
        class="flex justify-between items-center"
        style="background-color: var(--background-white)"
      >
        <img src="./assets/icons/star.svg" alt="" />
        <span class="card-span">${rating}</span>
      </span>
      <span class="card-span" style="background-color: var(--background-white)">
         ${time}
      </span>
    </div>
    <img src="./assets/icons/plus.svg" alt="" />
  </div>
</div>
`;
}

function init() {
  const grid = document.getElementById("kitchen-card-grid");
  const carousel = document.getElementById("carousel");

  fetch("./assets/static/products.json")
    .then((res) => res.json())
    .then((value) => {
      let cards = "";
      let slide = "";
      for (let val of value) {
        cards += createGridCard(val);
        slide += createSlideCard(val);
      }
      grid.innerHTML = cards;
      carousel.innerHTML = slide;

      new Swiper(".swiper", {
        direction: "horizontal",
        loop: false,
        spaceBetween: 0,
        slidesPerView: 1,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          640: { slidesPerView: 1 },
          1000: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
          1500: { slidesPerView: 4 },
        },
      });
    });
}

window.onload = () => {
  init();
  const videoButton = document.getElementById("video-button");
  const video = document.getElementById("video");

  video.addEventListener("click", () => {
    if (video.paused) {
      videoButton.style.opacity = "0%";
      video.play();
    } else {
      videoButton.style.opacity = "100%";
      video.pause();
    }
  });

  const dishButton = document.getElementById("dish-button");
  const dishDialog = document.getElementById("dish-dialog");
  const dialogContent = document.getElementById("dialog-content");
  const dialogCancelButton = document.getElementById("dialog-cancel");
  const dialogCloseButton = document.getElementById("dialog-close");

  dishButton.addEventListener("click", () => {
    fetch("./assets/static/products.json")
      .then((res) => res.json())
      .then((value) => {
        const random = Math.floor(Math.random() * value.length);
        const data = value[random];
        const content = createDailogCard(data);
        dialogContent.innerHTML = content;
        dishDialog.showModal();
        document.body.style.overflow = "hidden";
      });
  });
  dishDialog.addEventListener("close", () => {
    document.body.style.overflow = "";
  });

  dishDialog.addEventListener("cancel", () => {
    document.body.style.overflow = "";
  });

  dialogCancelButton.addEventListener("click", () => {
    dishDialog.close();
  });
  dialogCloseButton.addEventListener("click", () => {
    dishDialog.close();
  });
};
