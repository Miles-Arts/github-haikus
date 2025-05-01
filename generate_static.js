const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

// Datos estáticos para renderizar la vista
const data = {
  haikus: [
    {
      text: "Cerebro digital,\npiensa como los humanos,\nfuturo hoy.",
      image: "example.jpg"
    },
    {
      text: "Aprende el mundo,\ndatos crean caminos,\nsabiduría.",
      image: "example.jpg"
    }
  ],
  octocat: {
    name: "the Filmtocat",
    url: "https://octodex.github.com//images/filmtocat.png",
    author: "jeejkang",
    haiku: "Luces, cámara, git\nCeluloides digitales\nFilma tu código"
  }
};

// Ruta de la plantilla EJS
const templatePath = path.join(__dirname, 'views', 'index.ejs');
const outputPath = path.join(__dirname, 'docs', 'index.html');

// Leer y renderizar la plantilla
fs.readFile(templatePath, 'utf-8', (err, template) => {
  if (err) {
    console.error('Error leyendo la plantilla:', err);
    return;
  }

  const html = ejs.render(template, data);

  // Crear la carpeta docs si no existe
  if (!fs.existsSync(path.join(__dirname, 'docs'))){
    fs.mkdirSync(path.join(__dirname, 'docs'));
  }

  // Escribir el archivo HTML generado
  fs.writeFile(outputPath, html, (err) => {
    if (err) {
      console.error('Error escribiendo el archivo HTML:', err);
    } else {
      console.log('Archivo HTML generado correctamente en docs/index.html');
    }
  });

  // Copiar recursos estáticos (CSS e imágenes) a la carpeta docs
  const publicPath = path.join(__dirname, 'public');
  const docsPath = path.join(__dirname, 'docs');

  fs.cp(publicPath, docsPath, { recursive: true }, (err) => {
    if (err) {
      console.error('Error copiando recursos estáticos:', err);
    } else {
      console.log('Recursos estáticos copiados correctamente a docs/');
    }
  });
});