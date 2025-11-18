import { useState } from 'react'
import type { IUsuario } from './data/usuario.model';
import usuariosData from './data/usuario.json';
import './App.css'

function App() {
  const [usuarios] = useState<IUsuario[]>(usuariosData);

  return (
    <>
      <div>
        <h1>Lista de Usuários ({usuarios.length} encontrados)</h1>

        {usuarios.map((usuario) => (
          <div key={usuario.id}>
            <h2>
              {usuario.nome} - {usuario.cargo}
            </h2>
            <p>Localização: {usuario.localizacao}</p>
            <p>Habilidades: {usuario.habilidadesTecnicas.join(", ")}</p>
          </div>
        ))}
      </div>
    </>
  );
}
export default App
