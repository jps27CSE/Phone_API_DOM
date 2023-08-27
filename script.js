const phoneDataLoad = async (input_data, isShowAll) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${input_data}`;

  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, isShowAll);
};

const displayPhones = (data, isShowAll) => {
  const phoneContainer = document.getElementById("phone_container");

  console.log(data);

  phoneContainer.textContent = "";
  const showAllContainer = document.getElementById("show-all-container");
  if (data.length > 12) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }
  console.log(isShowAll);
  if (!isShowAll) {
    data = data.slice(0, 12);
  }

  data.forEach((phone) => {
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;
    phoneCard.innerHTML = `
    <figure>
    <img
      src="${phone.image}"
    />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${phone.phone_name}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
    `;

    phoneContainer.appendChild(phoneCard);
  });
};

const handleSearch = (isShowAll) => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  phoneDataLoad(searchText, isShowAll);
};

const handleShowAll = () => {
  handleSearch(true);
};
