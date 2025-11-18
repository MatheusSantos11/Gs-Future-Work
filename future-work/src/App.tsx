import type { IUsuario } from './data/usuario.model';
import usuariosData from './data/usuario.json';
import logo from "./imgs/logo.png";
import menu from "./imgs/menu.svg";
import perfil from "./imgs/perfil.png";
import './App.css'
import { SugestoesPerfis } from "./components/SugestoesPerfis";


function App() {
  const usuarios = usuariosData as IUsuario[];

  return (
    <>
      <div className='bg-[#2A2B30] h-full w-full'>
        <header className=' fixed z-10 bg-[#202327] h-15 w-full p-2 flex gap-4 top-0'>
          <img src={logo} alt="" className='h-10 w-37'/>
          <input type="text" placeholder='Pesquisar' className='border-[#35393C] border-2 h-9 p-2 rounded-lg mt-1'/>
          <div>
            <img src={menu} alt="" className='flow h-10 w-10 ml-8 mt-1'/>
          </div>
        </header>
        <div className=' h-40 p-4'>
          <div className='flex flex-wrap'>
            <img src={perfil} alt="" className='h-20 w-20'/>
            <div className='mt-3 ml-3'>
              <h2 className='text-xl'>Nome</h2>
              <p className='text-[#9FA2A3]'>cargo</p>
            </div>
          </div>
            <div className='flex flex-wrap ml-4 mt-2 gap-2'>
              <button className='bg-[#287ADF]'>Customizar</button>
              <button className='bg-[#287ADF]'>Networks</button>
              <button className='bg-[#287ADF]'>Certificados</button>
            </div>
        </div>
        <div className='p-4'>
          <SugestoesPerfis usuarios={usuarios} />
        </div>

      </div>
    </>
  );
}
export default App
