// Cargar datos dinámicos desde haikus_mona.json y renderizarlos en el DOM
fetch('/utils/haikus_mona.json')
  .then(response => response.json())
  .then(data => {
    const haikusContainer = document.querySelector('.haiku-containers');
    const octocatContainer = document.querySelector('.octocat');

    // Renderizar haikus
    data.forEach(haiku => {
      const haikuDiv = document.createElement('div');
      haikuDiv.className = 'haiku-content';
      haikuDiv.innerHTML = `
        <span class="emoji">${haiku.emoji || '🌸'}</span>
        <p class="haikus">${haiku.text}</p>
      `;
      haikusContainer.appendChild(haikuDiv);
    });

    // Renderizar Octocat
    const octocat = data[0]; // Ejemplo: usar el primer elemento como Octocat
    octocatContainer.innerHTML = `
      <h2>${octocat.name}</h2>
      <img class="mona-images" src="${octocat.url}" alt="${octocat.name}">
      <p>${octocat.haiku}</p>
      <p><em>Author: ${octocat.author}</em></p>
    `;
  })
  .catch(error => console.error('Error al cargar los datos:', error));