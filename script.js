const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const resultsDiv = document.getElementById("results");

searchButton.addEventListener("click", searchRepositories);
searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    searchRepositories();
  }
});

function searchRepositories() {
  const searchString = searchInput.value.trim();
  if (searchString.length < 3) {
    alert("Введите не менее 3 символов для поиска");
    return;
  }

  const url = `https://api.github.com/search/repositories?q=${searchString}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.total_count === 0) {
        resultsDiv.innerHTML = "Ничего не найдено";
      } else {
        const repositories = data.items.slice(0, 10);
        const listItems = repositories.map((repo) => {
          const name = repo.name;
          const url = repo.html_url;
          const description = repo.description;
          const language = repo.language;
          return `<li><a href="${url}" target="_blank">${name}</a> (${language})<br>${description}</li>`;
        });
        resultsDiv.innerHTML = `<ul>${listItems.join("")}</ul>`;
      }
    })
    .catch((error) => {
      console.error(error);
      resultsDiv.innerHTML = "Ошибка при выполнении запроса";
    });
}
