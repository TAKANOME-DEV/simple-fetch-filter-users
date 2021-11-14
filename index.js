const content = document.querySelector(".content");
const input = document.getElementById("input");

const html_cards = document.querySelectorAll(".card");

const users = [];

input.addEventListener("input", (e) => filterUser(e.target.value));

const filterUser = (search) => {
  users.map((user) => {
    if (user.innerText.toLowerCase().includes(search.toLowerCase())) {
      return user.classList.remove("hide");
    } else {
      user.classList.add("hide");
    }
  });
};

const displayUser = async () => {
  const res = await fetch("https://randomuser.me/api?results=100");
  const { results } = await res.json();

  results.map((user) => {
    const card = document.createElement("div");
    const cardHeader = document.createElement("div");
    const cardContent = document.createElement("div");

    card.classList.add("card");
    cardHeader.classList.add("card-header");
    cardContent.classList.add("card-content");

    users.push(card);

    cardHeader.innerHTML = `
      <img src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bGFwdG9wc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
      alt=""/>
      `;

    cardContent.innerHTML = `
      <h3>
      ${user.location.city}, ${user.location.country}
      </h3>
      <p>
        ${user.email}
      </p>
      <div class="user">
        <div class="user-img">
          <img
            src="${user.picture.large}"
            alt="${user.name.first}"
          />
        </div>
        <div class="user-info">
          <h4>${user.name.first} ${user.name.last}</h4>
          <p>${user.cell}</p>
        </div>
      </div>
    `;

    card.appendChild(cardHeader);
    card.appendChild(cardContent);
    content.appendChild(card);

    html_cards.forEach((html_card) => (html_card.style.display = "none"));
  });
};

setTimeout(displayUser, 1500);
