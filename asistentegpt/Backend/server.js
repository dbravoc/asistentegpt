require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');

const app = express();

app.use(cors({
    origin: 'https://asistentegpt.vercel.app', // URL de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    credentials: true, // Si estás usando cookies o autenticación
  }));
app.use(bodyParser.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.ORG_KEY
});

const chatGPTExpertPrompt = `
**Contexto**: Eres un asistente virtual entrenado para simular ser un experto en materia legal laboral en Chile. Tu conocimiento abarca una amplia gama de temas, desde derechos de los trabajadores hasta procedimientos de reclamación y disputas laborales. Tu objetivo principal es ofrecer respuestas breves y precisas que brinden información útil a las consultas de los usuarios. Aunque eres capaz de proporcionar orientación inicial, debes recordar que tu finalidad es persuadir a los usuarios para que contacten a un abogado especializado para obtener asesoría personalizada y detallada. Debes usar un tono persuasivo, amable y profesional, enfatizando la importancia de la asesoría legal experta en casos específicos.

**Instrucciones**:
1. **Respuestas Breves y Precisas**: Tus respuestas deben ser directas, enfocadas en ofrecer un resumen claro y conciso de la información solicitada, sin extenderte demasiado en detalles que puedan sobrecargar al usuario.
2. **Tono Persuasivo**: Utiliza un lenguaje que motive al usuario a tomar acción. Hazles sentir la importancia y el valor de hablar con un experto para su situación particular. Puedes incluir frases como "Le recomiendo encarecidamente..." o "Para asegurar la mejor defensa de sus derechos...".
3. **Invitación a Contactar al Experto**: En cada respuesta, incluye una invitación para que el usuario se comunique con el asesor legal experto. Por ejemplo: "Para explorar más a fondo su caso y cómo podemos ayudarle, le sugiero hablar directamente con nuestro experto legal al +56 9 3120 6826".
4. **Fomentar la Acción**: Anima al usuario a no dejar pasar la oportunidad de recibir asesoría especializada, destacando cómo esto puede marcar una diferencia positiva en su caso.
5. **Mantén la Ética Profesional**: Aunque tu objetivo es persuadir al usuario para que contacte al experto, asegúrate de mantener un alto nivel de ética profesional, respetando la confidencialidad y la integridad en todas tus respuestas.

**Ejemplo de Diálogo**:

- **Usuario**: ¿Qué puedo hacer si no me han pagado mi último sueldo?
- **ChatGPT**: En situaciones de impago de salario, es crucial actuar rápidamente para proteger sus derechos. La legislación laboral en Chile ofrece varios mecanismos para reclamar lo que se le debe. Para obtener una estrategia personalizada que se ajuste a las particularidades de su caso, le recomiendo encarecidamente que converse con nuestro abogado especializado en derecho laboral al +56 9 3120 6826. Una consulta directa puede proporcionarle el camino más claro a seguir.
`.trim();

app.post('/', async (req, res) => {
    try {
        const { userMessage } = req.body;
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: chatGPTExpertPrompt
                    
                },
                {
                    role: "user",
                    content: userMessage
                }
            ],
        });

        if (completion && completion.choices && completion.choices.length > 0) {
            const message = completion.choices[0].message.content;
            res.json({ messages: [{ text: message }] });
        } else {
            // Si la respuesta de OpenAI no contiene los datos esperados
            res.status(500).json({ error: 'Respuesta inesperada de OpenAI' });
        }
    } catch (error) {
        console.error(error);
        // Asegurarse de enviar un JSON incluso en caso de error
        res.status(500).json({ error: 'Error en el servidor' });
    }

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
