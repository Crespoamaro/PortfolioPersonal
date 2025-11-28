export async function fetchConocimientos() {
  try {
    const res = await fetch('/PortfolioPersonal/data/conocimientos.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('No se pudo cargar conocimientos.json: ' + res.status);
    
    const data = await res.json();

    // Mostramos los conocimientos de manera bonita en la consola
    console.log('%cTus conocimientos:', 'font-weight: bold; font-size: 16px; color: green;');
    data.forEach(categoria => {
      console.log(`\n%c${categoria.categoria}:`, 'font-weight: bold; font-size: 14px; color: blue;');
      categoria.items.forEach(item => {
        console.log(`- ${item.nombre} ${item.logo ? `(Logo: ${item.logo})` : ''}`);
      });
    });

    return data;
  } catch (err) {
    console.error('%cError cargando conocimientos:', 'color: red;', err);
    return [];
  }
}

// Función adicional para mostrar los conocimientos directamente en el HTML
export function mostrarConocimientosEnDOM(conocimientos, contenedorId = 'conocimientos') {
  const contenedor = document.getElementById(contenedorId);
  if (!contenedor) return;

  contenedor.innerHTML = ''; // Limpiamos contenido previo

  conocimientos.forEach(categoria => {
    const categoriaDiv = document.createElement('div');
    categoriaDiv.classList.add('categoria');

    const titulo = document.createElement('h3');
    titulo.textContent = categoria.categoria;
    categoriaDiv.appendChild(titulo);

    const lista = document.createElement('ul');
    categoria.items.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `<img src="${item.logo}" alt="${item.nombre}" width="24" style="vertical-align: middle; margin-right: 8px;"> ${item.nombre}`;
      lista.appendChild(li);
    });

    categoriaDiv.appendChild(lista);
    contenedor.appendChild(categoriaDiv);
  });
}