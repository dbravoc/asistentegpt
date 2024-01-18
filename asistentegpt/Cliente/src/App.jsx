import './App.css'
import Inicio from './components/Inicio';
import Materias from './components/Materias';
import Formulario from './components/Formulario';
import Footer from './components/Footer';



const App = () => {
  return (
    <>
      <div className="mx-auto max-w-2xl sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between flex-wrap">
          <div className="w-full lg:w-1/2">
            <Inicio />
          </div>
          <div className="w-full lg:w-1/2 px-6">
            <Formulario />
          </div>
        </div>
        <Materias />
        <Footer />
      </div>
    </>
  );
};

export default App;

