import { useState } from 'react'
import type { IUsuario } from './data/usuario.model';
import usuariosData from './data/usuario.json';
import logo from "./imgs/logo.png";
import menu from "./imgs/menu.svg";
import './App.css'

function App() {
  const [usuarios] = useState<IUsuario[]>(usuariosData);

  return (
    <>
      <div>
        <header className='z-10 bg-[#202327] h-15 w-full p-2 flex gap-4'>
          <img src={logo} alt="" className='h-10 w-37'/>
          <input type="text" placeholder='Pesquisar' className='border-[#35393C] border-2 h-9 p-2 rounded-lg mt-1'/>
          <div>
            <img src={menu} alt="" className='h-10 w-10 ml-8 mt-1' />
          </div>
        </header>




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
