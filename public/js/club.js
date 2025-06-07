const newFormClubHandler = async (event) => {
    event.preventDefault();
    const name = document.querySelector('#clubName').value.trim();
    const description = document.querySelector('#clubDescription').value.trim();
    if (name && description) {
      const response = await fetch(`/clubs`, {
        method: 'POST',
        body: JSON.stringify({ name, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to create club');
      }
    }
  };
  
  document
    .querySelector('#blog-form')
    .addEventListener('submit', newFormClubHandler);
  