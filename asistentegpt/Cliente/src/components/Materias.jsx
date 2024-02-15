import React from 'react';
import mariano1 from "../assets/img/mariano perfil.png";
import mariano2 from "../assets/img/m2.jpeg";
import LogoMorado from "../assets/img/LABORAL JURIDICO3.png";
import david from "../assets/img/david.jpeg";



const features = [
    { name: 'Despido injustificado', description: 'Asistencia legal en despidos sin causa, enfocada en derechos y compensaciones."' },
    { name: 'Autodespido', description: 'Orientación legal para rescisiones laborales iniciadas por incumplimientos del empleador.' },
    { name: 'Vulneración de derechos', description: 'Protección jurídica ante abusos laborales como acoso o discriminación.' },
    { name: 'Accidente o enfermedad laboral', description: 'Representación legal en lesiones o enfermedades por el trabajo, buscando compensación adecuada.' },
    { name: 'No pago de cotizaciones o sueldo', description: 'Asesoría legal en casos de impago de sueldos, asegurando la justicia financiera.' },
    { name: 'Ley Bustos', description: 'Asesoría legal especializada en el cumplimiento de obligaciones previsionales por parte de empleadores, garantizando tus derechos de seguridad social.' },
  
]
  
  export default function Example() {
    return (
        <div className="mx-auto grid grid-cols-1 items-center gap-x-48 gap-y-16 px-6 py-6 sm:py-6 sm:grid-cols-2 sm:px-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Materias de expertiz</h2>
            <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
              {features.map((feature) => (
                <div key={feature.name} className="border-t border-gray-200 pt-4">
                  <dt className="font-medium text-gray-900">{feature.name}</dt>
                  <dd className="mt-2 text-sm text-gray-500">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
              <div className="grid grid-cols-1 gap-0">
              <div className='flex flex-col justify-center items-center'>
                <img src={mariano1} alt=""  className='rounded-2xl w-48 h-48 object-cover my-5' />
                <a href='https://www.linkedin.com/in/mariano-hern%C3%A1ndez-garc%C3%ADa-070b5a13b/' className='font-bold text-indigo-700'>Mariano Hernández</a>
                <p>Experto Laboral y Corporativo</p>
                </div>
                <div></div>
              <div className='flex flex-col justify-center items-center'>
                <img src={mariano2} alt=""  className='rounded-2xl w-48 h-48 object-cover my-5' />
                <a href='https://www.linkedin.com/in/soledad-rodr%C3%ADguez-sanhueza-7399b9187/' className='font-bold text-indigo-700'>Soledad Rodríguez</a>
                <p>Experta Laboral y Familia</p>
                </div>


          </div>
        </div>
    )
  }
  