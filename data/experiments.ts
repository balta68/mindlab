export type Energy = 'baja' | 'media' | 'alta';
export type Focus = 'calma' | 'foco' | 'conexion' | 'energia';

export type Experiment = {
  id: string;
  title: string;
  focus: Focus;
  energy: Energy[];
  hypothesis: string;
  steps: string[];
};

export const experiments: Experiment[] = [
  {
    id: 'calma-1',
    title: 'Aterrizaje sensorial',
    focus: 'calma',
    energy: ['baja', 'media'],
    hypothesis: 'Conectar con estímulos concretos puede reducir el ruido mental.',
    steps: [
      'Busca 3 objetos de un mismo color a tu alrededor.',
      'Toca 2 texturas distintas durante unos segundos.',
      'Escucha 1 sonido lejano sin juzgarlo.',
    ],
  },
  {
    id: 'calma-2',
    title: 'Silencio de 3 minutos',
    focus: 'calma',
    energy: ['baja', 'media', 'alta'],
    hypothesis: 'Bajar el volumen del entorno puede ayudar a regular la activación.',
    steps: [
      'Siéntate cómodamente.',
      'Permanece 3 minutos en silencio sin mirar el móvil.',
      'Observa cómo cambia tu cuerpo al parar.',
    ],
  },
  {
    id: 'foco-1',
    title: 'Mono-tasking de 10 minutos',
    focus: 'foco',
    energy: ['media', 'alta'],
    hypothesis: 'Hacer una sola cosa reduce la dispersión y mejora la claridad mental.',
    steps: [
      'Elige una tarea pequeña.',
      'Hazla durante 10 minutos sin cambiar de pestaña ni mirar el móvil.',
      'Cuando termines, evalúa cómo estaba tu atención.',
    ],
  },
  {
    id: 'foco-2',
    title: 'Mesa despejada',
    focus: 'foco',
    energy: ['baja', 'media'],
    hypothesis: 'Reducir estímulos visuales puede facilitar el enfoque.',
    steps: [
      'Retira 5 objetos innecesarios de tu mesa o entorno.',
      'Deja visible solo lo imprescindible.',
      'Trabaja 5 minutos en ese espacio limpio.',
    ],
  },
  {
    id: 'conexion-1',
    title: 'Mensaje de gratitud',
    focus: 'conexion',
    energy: ['media', 'alta'],
    hypothesis: 'La conexión social breve y positiva puede mejorar el estado emocional.',
    steps: [
      'Piensa en una persona a la que agradezcas algo.',
      'Envíale un mensaje corto y sincero.',
      'No esperes respuesta inmediata: el experimento ya está hecho.',
    ],
  },
  {
    id: 'conexion-2',
    title: 'Micro gesto amable',
    focus: 'conexion',
    energy: ['baja', 'media', 'alta'],
    hypothesis: 'Un gesto social pequeño puede cambiar el tono del día.',
    steps: [
      'Haz un cumplido sincero o da las gracias con intención.',
      'Observa la reacción de la otra persona.',
      'Observa también cómo te sientes tú.',
    ],
  },
  {
    id: 'energia-1',
    title: 'Activación de 2 minutos',
    focus: 'energia',
    energy: ['baja', 'media'],
    hypothesis: 'Mover el cuerpo un poco puede desbloquear la inercia.',
    steps: [
      'Ponte de pie.',
      'Mueve hombros, cuello y brazos durante 2 minutos.',
      'Termina con 3 respiraciones profundas.',
    ],
  },
  {
    id: 'energia-2',
    title: 'Paseo relámpago',
    focus: 'energia',
    energy: ['media', 'alta'],
    hypothesis: 'Un cambio breve de entorno puede elevar la energía percibida.',
    steps: [
      'Sal a caminar 5 minutos o recorre el pasillo o la casa.',
      'Mira a lo lejos al menos 3 veces.',
      'Vuelve y nota si cambia tu nivel de activación.',
    ],
  },
];