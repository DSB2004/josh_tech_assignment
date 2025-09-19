function createGridCard({
  imageSrc = "./assets/images/product.png",
  title = "Product Title",
  price = "₹0",
  rating = "0.0",
  time = "0-0 min",
}) {
  return `
    <div class="w-fit flex flex-col gap-2" style="background-color: var(--white)">
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

function init() {
  const parent = document.getElementById("kitchen-card-grid");
  fetch("./assets/static/products.json").then((res) => {
    res.json().then((value) => {
      let cards = "";
      for (let val of value) {
        cards += createGridCard(val);
      }
      parent.innerHTML = cards;
    });
  });
}

init();

const videoWrapper = document.getElementById("video-box");
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
