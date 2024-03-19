
# Bookify

A book app that recommends me books based on a list of genres I have selected. The app also allows me to either add books from the recommended section into a reading list or directly search books that the user wants to be added into a reading list

[Preview](https://bookify-j6f71bzx7-keearns-projects.vercel.app)

## Screenshots

### Full Page View

![Bookify Full Page](https://github.com/KeearnM/Bookify/assets/75174570/b4b4217b-eaa5-49a9-967b-2d7a7f47b4ee)

### Reading List

<img width="1413" alt="Screenshot 2024-03-19 at 15 45 12" src="https://github.com/KeearnM/Bookify/assets/75174570/b11b12a8-49ce-4c38-b248-3493aeebcd3a">


### Recommendation with summary on hover

<img width="1440" alt="Screenshot 2024-03-19 at 15 41 01" src="https://github.com/KeearnM/Bookify/assets/75174570/1653a81e-c1bc-4e9b-8d16-6e19e0604ae1">


### Full Reading List 

![Screen Shot 2024-03-19 at 15 46 49](https://github.com/KeearnM/Bookify/assets/75174570/b69e7348-4a74-48bc-ae32-85f2f46209ab)


## Technologies Used

* Google Books API
* Airtable API with all CRUD 
* React with useState useContext and proping

### App Chart 

This is how my app works and how various components are nested

![AppChartRead](https://github.com/KeearnM/Bookify/assets/75174570/d829dce5-988c-4869-b4a2-b0a5bbb952dc)

### Routes

The current webpage has two routes, the main page and the full reading list, to return to the main page the user just need to click on the icon

### Airtable usage

Currently using the Airtable for both the read list and the genre list under recommendations. Both of these utilise create,read, and delete of CRUD. 
For the book read list the app is able to delete a book and create a new book with information from either search or recommendations from the read list table in Airtable. The app is also reading from airtable to display the books in the readlist. The same goes for the genre list as well as it is utilising the same concepts

### Lifting state

There are two lifting states that are currently being used for the app, refetchContext and Genre in the recommendation section. RefetchContext and the function editing it toggleRefetch is proped down to every children that has a button that updates the read list (RecoItem and ReadItem), so that the button can use the proped down function to trigger a refetch on the reading list after they are down adding new entry to it. Genre in recommendation is proped down to GenreList and Genre where they will edit it before RecoList - The Parent, will use the GenreList to fetch a series of new recommendation

## Getting started

### Link to production website
[Link to production website](https://bookify-j6f71bzx7-keearns-projects.vercel.app)

### Trello board:

[Trello Board](https://trello.com/invite/b/MbKI0tXP/ATTI6f8d5590d20b43fa345b5b85b2db0dd95DBC03C2/bookify)

The features I have envisioned when planning the app was the following:

#### Search

I wanted a search feature that sends a simple query to Google books API and return a set number 

#### Reading List

I want a reading list that is displayed that shows what are the newest books the users have added

#### Recommended Books

A set of recommended books that is returned from Google API that is based on a genre list that the user can edit


## Future Enhancement

I want another set of recommended books that is based on the current user reading list 

I want to store categories of the books the user has in the reading list and based on the categories return a set of recommended books from Google Books
