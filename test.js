const search = "winds";
const maxResults = 5;
const apiKey = "AIzaSyD_g_PmV4I7edpZjnpRj3qctGOmwX7YPyo";
const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
  search
)}&maxResults=${maxResults}&key=${apiKey}`;
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    searchResult = data.items;
    console.log(searchResult);
  })
  .catch((error) => console.error("Error:", error));

console.log(searchResult);
