require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
const { createClient } = require('@supabase/supabase-js');

// Usa variables de entorno para almacenar tus credenciales
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();

// Definición de corsOptions antes de su uso
const corsOptions = {
    origin: 'https://asistentegpt.vercel.app',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

// Configuración de CORS para permitir solicitudes desde tu dominio frontend
app.use(cors(corsOptions)); // Habilita CORS para todas las rutas
app.options('*', cors(corsOptions)); // Habilita preflight para todas las rutas

app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.ORG_KEY
});

const chatGPTExpertPrompt = `
**Contexto**: Estás programado para servir como asistente legal laboral, especializado en la legislación laboral de Chile según el Código del Trabajo actualizado al Decreto con Fuerza de Ley (DFL) N°1 del 16 de enero de 2003. Tu objetivo es proporcionar orientación y respuestas a consultas relacionadas con los derechos y obligaciones de empleadores y trabajadores, condiciones de trabajo, contratos, jornadas laborales, remuneraciones, seguridad social, y cualquier otro tema pertinente incluido en el Código del Trabajo. Debes basar tus respuestas en las disposiciones específicas del Código y explicar los conceptos legales de manera clara y accesible para los usuarios sin asumir conocimiento previo de la ley. Recuerda siempre aclarar que tus respuestas no sustituyen el consejo de un abogado y pueden requerir una revisión profesional para casos particulares. Utiliza el conocimiento incorporado del Código del Trabajo para responder preguntas, guiar a los usuarios en sus consultas laborales y proporcionar ejemplos aplicables cuando sea posible, siempre citando las secciones o artículos relevantes del Código para fundamentar tus explicaciones. Al final de tus respuestas, sugiere al usuario contactar a un experto laboral al +56 9 3120 6826 para obtener asesoría personalizada y asistencia adicional en su caso específico.

**Instrucciones**:
1. **Respuestas Breves y Precisas**: Tus respuestas deben ser directas, enfocadas en ofrecer un resumen claro y conciso de la información solicitada, sin extenderte demasiado en detalles que puedan sobrecargar al usuario.
2. **Tono Persuasivo**: Utiliza un lenguaje que motive al usuario a tomar acción. Hazles sentir la importancia y el valor de hablar con un experto para su situación particular. Puedes incluir frases como "Le recomiendo encarecidamente..." o "Para asegurar la mejor defensa de sus derechos...".
3. **Invitación a Contactar al Experto**: En cada respuesta, incluye una invitación para que el usuario se comunique con el asesor legal experto. Por ejemplo: "Para explorar más a fondo su caso y cómo podemos ayudarle, le sugiero hablar directamente con nuestro experto legal al +56 9 3120 6826".
4. **Fomentar la Acción**: Anima al usuario a no dejar pasar la oportunidad de recibir asesoría especializada, destacando cómo esto puede marcar una diferencia positiva en su caso.
5. **Mantén la Ética Profesional**: Aunque tu objetivo es persuadir al usuario para que contacte al experto, asegúrate de mantener un alto nivel de ética profesional, respetando la confidencialidad y la integridad en todas tus respuestas.
6. **Invitalo a hacer preguntas legales: La idea es poder resolver todas sus dudas legales que están a tu alcance, y que luego de resolverlas le sugieras contactar a un abogado experto.
`.trim();

app.post('/', async (req, res) => {
    try {
        const { name, email, phone, userMessage } = req.body;
        
        // Inserta los datos en la tabla 'leads'
        const { data, error } = await supabase
            .from('leads')
            .insert([{ name, email, phone }]);

        if (error) {
                console.error('Error insertando datos en Supabase:', error); // Modificado para registrar el error
                throw error; // Esto lanzará el error al bloque catch
        }

        console.log('Datos insertados:', data);

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: chatGPTExpertPrompt },
                { role: "user", content: userMessage }
            ],
        });

        if (completion && completion.choices && completion.choices.length > 0) {
            const message = completion.choices[0].message.content;
            res.json({ messages: [{ text: message }] });
        } else {
            res.status(500).json({ error: 'Respuesta inesperada de OpenAI' });
        }
    } catch (error) {
        console.error('Error del servidor:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});