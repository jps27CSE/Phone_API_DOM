const phoneDataLoad = async (input_data, isShowAll) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${input_data}`;

  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, isShowAll);
};

const displayPhones = (data, isShowAll) => {
  const phoneContainer = document.getElementById("phone_container");

  phoneContainer.textContent = "";
  const showAllContainer = document.getElementById("show-all-container");
  if (data.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  if (!isShowAll) {
    data = data.slice(0, 12);
  }

  data.forEach((phone) => {
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-gray-400 p-4 shadow-xl`;
    phoneCard.innerHTML = `
    <figure>
    <img
      src="${phone.image}"
    />
  </figure>
  <div class="card-body">
    <h2 class="card-title text-black">${phone.phone_name}</h2>
    <p class="text-black">If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary" onclick="show_phone_details_button('${phone.slug}')">Show Details</button>
    </div>
  </div>
    `;

    phoneContainer.appendChild(phoneCard);
  });
  toggleSpinner(false);
};

const handleSearch = (isShowAll) => {
  toggleSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  phoneDataLoad(searchText, isShowAll);
};

const handleShowAll = () => {
  handleSearch(true);
};

const toggleSpinner = (isLoading) => {
  const loadSpinner = document.getElementById("loading_spinner");

  if (isLoading) {
    loadSpinner.classList.remove("hidden");
  } else {
    loadSpinner.classList.add("hidden");
  }
};

const show_phone_details_button = async (data) => {
  const fetchData = await fetch(
    `https://openapi.programming-hero.com/api/phone/${data}`
  );

  const receiveData = await fetchData.json();
  Showing_phone_detail(receiveData.data);
};

const Showing_phone_detail = (data) => {
  const phoneName = document.getElementById("show_detail_phone_name");

  phoneName.innerText = data.name;

  const showDetailContainer = document.getElementById("show_detail_container");

  showDetailContainer.innerHTML = `
  <img src="${data.image}" alt="" />
  <p><span>Storage:</span>${data?.mainFeatures?.storage}</p>
  <p><span>GPS:</span>${data.others?.GPS || "No GPS available"}</p>
  <p><span>GPS:</span>${
    data.others?.GPS ? data.others.GPS : "No GPS available in this device"
  }</p>
  `;

  show_phone_details.showModal();
};
