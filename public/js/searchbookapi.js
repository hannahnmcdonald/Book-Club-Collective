document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const q = params.get('q');

  if (q) {
    const input = document.getElementById('search');
    if (input) input.value = q;

    bookSearch(q); // run the search using the query
  }
});

// Modified search function to accept input
function bookSearch(query) {
  if (!query) {
    query = document.getElementById('search').value;
  }

  $.ajax({
    url: "https://www.googleapis.com/books/v1/volumes?q=" + encodeURIComponent(query),
    dataType: "json",
    success: function(data) {
      const apiSearchAnchor = document.getElementById('apiSearchAnchor');
      if (!apiSearchAnchor) return;

      apiSearchAnchor.innerHTML = ''; // Clear previous results

      data.items.forEach(item => {
        const title = item.volumeInfo.title || 'Unknown Title';
        const author = (item.volumeInfo.authors || []).join(', ');
        const imgsrc = item.volumeInfo.imageLinks?.smallThumbnail || 'https://via.placeholder.com/150';
        const isbn13 = item.volumeInfo.industryIdentifiers?.[0]?.identifier || 'N/A';
        const rating = item.volumeInfo.averageRating || 0;

        const col = document.createElement("div");
        col.className = "col-4 mt-3 border border-3";
        col.innerHTML = `
          <div>
            <div>
              <h2><a href="/review/${isbn13}">${title}</a></h2>
              <img src="${imgsrc}" class="mt-3" />
              <p class="authorstyle">${author}</p>
              <div class="Stars" style="--rating:${rating}"></div>
            </div>
          </div>
        `;

        apiSearchAnchor.appendChild(col);
      });
    },
    type: 'GET'
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const q = params.get('q');

  if (q) {
    const input = document.getElementById('searchbooks-input');
    if (input) input.value = q;
    bookSearch(q);
  }

  const searchBtn = document.getElementById('searchbooks-button');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const input = document.getElementById('searchbooks-input');
      const query = input?.value.trim();
      if (query) {
        bookSearch(query);
      }
    });
  }
});
