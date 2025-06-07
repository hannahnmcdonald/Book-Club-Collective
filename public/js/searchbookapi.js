function bookSearch() {
    var search = document.getElementById('search').value;

    console.log(search);

    $.ajax({

        url: "https://www.googleapis.com/books/v1/volumes?q=" + search,
        dataType: "json",
        success: function(data) {
                        
            //This deletes any existing data that has been anchored so a new search gets a clean anchor point
            while (apiSearchAnchor.firstChild) {
                apiSearchAnchor.removeChild(apiSearchAnchor.firstChild);
              }

            for(i=0; i <data.items.length; i++){

                //create variables from returned data
                let title = data.items[i].volumeInfo.title;
                //Truncates the title to the length specified
                title = title.substring(0, 35);   
                let author = data.items[i].volumeInfo.authors;
                let imgsrchttp = data.items[i].volumeInfo.imageLinks.smallThumbnail;
                let isbn13 = data.items[i].volumeInfo.industryIdentifiers[0].identifier;
                let rating = data.items[i].volumeInfo.averageRating;
                
                //create the elements
                var col = document.createElement("div");
                var card = document.createElement("div");
                var body = document.createElement("div");
                
                var cardTitleHeader = document.createElement("h2");
                var cardTitle = document.createElement("a");
                var bookimg = document.createElement("img");
                var bookauthor = document.createElement("p");
                //var starRating = document.createElement("h2");

                //This element is to display actual image of Stars for the review
                //The code uses the work of Fred Genkin on css-tricks.com, but has been altered
                var starsActual = document.createElement("div");

                //append to html - need to append before attaching a class
                col.append(card);
                card.append(body);
                body.append(cardTitleHeader, bookimg, bookauthor, starsActual);
                cardTitleHeader.append(cardTitle);

                //attach a class - set attribute
                col.setAttribute('class', "col-4 mt-3 border border-3");
                //titleButton.setAttribute('class', "btn btn-primary");
                bookauthor.setAttribute('class', "authorstyle");
                //starRating.setAttribute('class', "starStyle");

                starsActual.setAttribute('class', "Stars");
                starsActual.setAttribute('style', "--rating:" + rating);

                //use text content to to assign content to html elements
                cardTitle.setAttribute('href', "/review/" + isbn13);
                cardTitle.textContent = title;
                bookimg.setAttribute('src', imgsrchttp);
                bookimg.setAttribute('class', 'mt-3');
                bookauthor.textContent = author;

                //appened the new container to the document
                apiSearchAnchor.append(col);

            }
        },
        type: 'GET'
    });
}

//set document getelement to a variable then use as truthy, this prevents the event listener from giving errors on pages in which it is not present
const isSearchButton = document.getElementById('bookSearchButton');

if (isSearchButton) {
    document.getElementById('bookSearchButton').addEventListener('click', bookSearch, false)
};
