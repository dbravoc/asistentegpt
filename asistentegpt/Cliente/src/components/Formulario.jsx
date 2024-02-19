import React, { useState } from 'react';
import ChatComponent from './ChatComponent'; // Asume que este es tu componente dechat
import LogoLargo from "../assets/img/LABORALJURIDICO.jpeg";

export default function Formulario() {
  const [showChat, setShowChat] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => { // Marca esta función como async
    e.preventDefault();
    // Agregar console.log aquí para verificar los datos que se enviarán
    console.log('Enviando datos al backend:', JSON.stringify({ ...formData, userMessage: "Mensaje inicial del usuario" }));
    try {
      const response = await fetch('https://asistentegpt-backend.vercel.app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, userMessage: "Mensaje inicial del usuario" }), // Incluye todos los datos del formulario más cualquier otro dato necesario
      });

      if (!response.ok) {
        throw new Error('Error al enviar los datos');
      }

      const data = await response.json(); // Procesa la respuesta del backend
      console.log(data); // Muestra los datos o haz algo con ellos
      setShowChat(true); // Muestra el componente del chat después de enviar los datos correctamente
    } catch (error) {
      console.error('Error al enviar formulario:', error);
    }
  };
  
  if (showChat) {
    return <ChatComponent />;
  }

    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center py-1 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src={LogoLargo}
          />
            <h2 className="mt-3 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
              Ingresa tus datos para iniciar una conversación con un asistente legal virtual
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
            <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Nombre y apellido
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                  Nº de teléfono
                </label>
                <div className="mt-2">
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    required
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>  
              
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Iniciar conversación
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Necesitas conversar con uno de nuestros abogados expertos?{' '}
              <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Escríbenos un whatsapp 
              </a>
            </p>
          </div>
        </div>
      </>
    )
  }
  