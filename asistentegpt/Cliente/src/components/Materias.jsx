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
      <div className="bg-white">
        <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-6 py-24 sm:px-6 sm:py-1 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Materias de expertiz</h2>
            <p className="mt-4 text-gray-500">
              The walnut wood card tray is precision milled to perfectly fit a stack of Focus cards. The powder coated
              steel divider separates active cards from new ones, or can be used to archive important task lists.
            </p>
  
            <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
              {features.map((feature) => (
                <div key={feature.name} className="border-t border-gray-200 pt-4">
                  <dt className="font-medium text-gray-900">{feature.name}</dt>
                  <dd className="mt-2 text-sm text-gray-500">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
            <img
              src="src/assets/img/LABORAL JURIDICO3.png"
              alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
              className="rounded-lg bg-gray-100"
            />
            <img
              src="src/assets/img/DALL·E 2023-12-22 16.13.27 - A depiction of 'Unjust Dismissal' in a legal setting. The scene shows an employee being notified of their dismissal in an office, with a look of shock.png"
              alt="Top down view of walnut card tray with embedded magnets and card groove."
              className="rounded-lg bg-gray-100"
            />
            <img
              src="src/assets/img/DALL·E 2023-12-22 16.13.35 - A scene illustrating 'Self-dismissal' in a workplace context. The image shows an employee in a thoughtful pose, holding a legal document that signifie.png"
              alt="Side of walnut card tray with card groove and recessed card area."
              className="rounded-lg bg-gray-100"
            />
            <img
              src="src/assets/img/DALL·E 2023-12-22 16.13.40 - Illustration representing 'Violation of Rights' in the workplace. The image portrays an employee facing a challenging situation, such as harassment or.png"
              alt="Walnut card tray filled with cards and card angled in dedicated groove."
              className="rounded-lg bg-gray-100"
            />
          </div>
        </div>
      </div>
    )
  }
  