// Add this code to the function that handles the purchase button click event

const filmId = e.target.dataset.id;
const film = films.find(f => f.id === filmId);
if (film.tickets_sold >= film.capacity) {
  alert("Sorry, this film is sold out!");
  return;
}

// Update tickets_sold locally
film.tickets_sold += 1;

// Send PATCH request to update tickets_sold on server
fetch(`http://localhost:3000/films/${filmId}`, {
  method: "PATCH",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    tickets_sold: film.tickets_sold
  })
})
  .then(res => res.json())
  .then(updatedFilm => {
    // Update films array with updatedFilm
    films = films.map(f => (f.id === updatedFilm.id ? updatedFilm : f));

    // Render films to update tickets_sold on page
    renderFilms(films);
  })
  .catch(err => console.error(err));
// Add this code to the function that renders the films list

// Create delete button for each film
const deleteBtn = document.createElement("button");
deleteBtn.innerText = "Delete";
deleteBtn.classList.add("delete-btn");
deleteBtn.dataset.id = film.id;
li.appendChild(deleteBtn);

// Add event listener to delete button
deleteBtn.addEventListener("click", e => {
  e.stopPropagation();

  const filmId = e.target.dataset.id;

  // Send DELETE request to remove film from server
  fetch(`http://localhost:3000/films/${filmId}`, {
    method: "DELETE"
  })
    .then(() => {
      // Remove film from films array
      films = films.filter(f => f.id !== filmId);

      // Render films to remove film from page
      renderFilms(films);
    })
    .catch(err => console.error(err));
});

