export type GalleryCategory = 'Todos' | 'Casamentos' | 'Retratos' | 'Eventos';

export interface GalleryItem {
  id: string;
  title: string;
  category: Exclude<GalleryCategory, 'Todos'>;
  location: string;
  description: string;
  alt: string;
  webpSrc: string;
  jpgSrc: string;
  width: number;
  height: number;
}

export interface StudioService {
  number: string;
  title: string;
  summary: string;
  deliverables: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  context: string;
  rating: number;
  text: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const STUDIO_INFO = {
  name: 'Gouveia Photo Art',
  slogan: 'Momentos eternizados em arte',
  niche: 'Fotógrafo',
  address: 'R. 122, 239 - St. Sul, Goiânia - GO, 74085-500',
  shortAddress: 'R. 122, 239 · Setor Sul, Goiânia - GO',
  phoneDisplay: '(62) 3278-5206',
  whatsappNumber: '556232785206',
  whatsappBaseUrl: 'https://wa.me/556232785206',
  whatsappDefaultMessage:
    'Olá! Gostaria de solicitar um orçamento com a Gouveia Photo Art.',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=R.+122,+239+-+St.+Sul,+Goi%C3%A2nia+-+GO,+74085-500',
  hours: 'Segunda a Sábado · Atendimento com hora marcada',
} as const;

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'noiva-luz-natural',
    title: 'Preparação da Noiva em Luz Natural',
    category: 'Casamentos',
    location: 'Goiânia · GO',
    description:
      'Retrato editorial em preto e branco valorizando a textura da renda, o gesto sereno e a luz suave de janela.',
    alt: 'Fotografia em preto e branco de noiva com vestido de renda em luz natural pela Gouveia Photo Art',
    webpSrc: '/images/foto-2.webp',
    jpgSrc: '/images/foto-2.jpg',
    width: 1024,
    height: 1536,
  },
  {
    id: 'primeira-danca-celebracao',
    title: 'Primeira Dança sob Luz Cênica',
    category: 'Casamentos',
    location: 'Goiânia · GO',
    description:
      'Registro monocromático do movimento da valsa com contraste dramático e iluminação de palco.',
    alt: 'Casal de noivos durante a primeira dança em casamento fotografado em preto e branco pela Gouveia Photo Art',
    webpSrc: '/images/foto-3.webp',
    jpgSrc: '/images/foto-3.jpg',
    width: 1024,
    height: 1536,
  },
  {
    id: 'retrato-gala-evento',
    title: 'Retrato em Evento de Gala',
    category: 'Retratos',
    location: 'Goiânia · GO',
    description:
      'Direção de retrato em ambiente de celebração com equilíbrio preciso entre iluminação cênica e nitidez.',
    alt: 'Retrato editorial de convidado em traje social diante de painel floral iluminado em evento de gala',
    webpSrc: '/images/foto-1.webp',
    jpgSrc: '/images/foto-1.jpg',
    width: 1024,
    height: 1536,
  },
  {
    id: 'cobertura-corporativa-palco',
    title: 'Cobertura de Encontro Corporativo',
    category: 'Eventos',
    location: 'Goiânia · GO',
    description:
      'Documentação completa de palestras, bastidores e ambientação para eventos empresariais e lançamentos.',
    alt: 'Cobertura fotográfica de auditório e palco em evento corporativo realizado pela Gouveia Photo Art',
    webpSrc: '/images/foto-4.webp',
    jpgSrc: '/images/foto-4.jpg',
    width: 1024,
    height: 1365,
  },
];

export const STUDIO_SERVICES: StudioService[] = [
  {
    number: '01.',
    title: 'Casamentos & Celebrações',
    summary:
      'Cobertura documental e editorial do making of à festa, capturando expressões espontâneas, detalhes do figurino e a atmosfera única da celebração.',
    deliverables: 'Pré-wedding · Cerimônia e recepção · Galeria digital em alta resolução',
  },
  {
    number: '02.',
    title: 'Retratos & Ensaios Autorais',
    summary:
      'Sessões personalizadas com direção de cena natural para retratos individuais, posicionamento profissional, famílias e momentos marcantes.',
    deliverables: 'Direção de luz e pose · Tratamento fino de cor e pele · Arquivos para impressão',
  },
  {
    number: '03.',
    title: 'Eventos Corporativos & Marcas',
    summary:
      'Registro ágil e criterioso de palestras, lançamentos, confraternizações e bastidores com entrega organizada para imprensa e redes sociais.',
    deliverables: 'Cobertura de palco e público · Seleção prévia ágil · Licenciamento comercial',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'dep-1',
    name: 'Mariana Alencar',
    context: 'Casamento em Goiânia',
    rating: 5,
    text: 'Cada fotografia transmite exatamente a emoção que vivemos naquele dia. A sensibilidade na direção durante o making of nos deixou completamente à vontade.',
  },
  {
    id: 'dep-2',
    name: 'Rafael Mendonça',
    context: 'Evento Corporativo',
    rating: 5,
    text: 'Contratamos a Gouveia Photo Art para o lançamento da nossa marca e a entrega superou as expectativas. Imagens nítidas, bem compostas e prontas no prazo combinado.',
  },
  {
    id: 'dep-3',
    name: 'Camila & Bruno Teles',
    context: 'Ensaio e Cerimônia',
    rating: 5,
    text: 'Do atendimento inicial no Setor Sul até o recebimento da galeria final, tudo foi conduzido com muito cuidado, pontualidade e olhar artístico.',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Como funciona o agendamento e a reserva de data?',
    answer:
      'Você pode solicitar disponibilidade pelo formulário de contato ou diretamente pelo WhatsApp (62) 3278-5206. Após alinharmos o tipo de ensaio ou evento, a data é reservada mediante assinatura de proposta e sinal.',
  },
  {
    id: 'faq-2',
    question: 'Qual é o prazo médio de entrega das fotografias editadas?',
    answer:
      'Ensaios individuais e corporativos são entregues em até 7 dias úteis. Para casamentos e eventos de grande porte, enviamos uma prévia selecionada em até 72 horas e a galeria completa tratada em até 25 dias úteis.',
  },
  {
    id: 'faq-3',
    question: 'Os atendimentos acontecem apenas no Setor Sul ou também em locações externas?',
    answer:
      'Nosso ponto de atendimento fica na R. 122, 239 - St. Sul, em Goiânia, mas realizamos ensaios externos, residenciais, cerimônias e eventos corporativos em toda a Grande Goiânia e região.',
  },
  {
    id: 'faq-4',
    question: 'Todas as fotos entregues passam por tratamento profissional?',
    answer:
      'Sim. Todas as imagens selecionadas recebem curadoria cuidadosa, ajuste de cor, contraste, iluminação natural e tratamento de acabamento mantendo a fidelidade e a naturalidade de cada cena.',
  },
  {
    id: 'faq-5',
    question: 'Como recebo as fotos após a edição?',
    answer:
      'As imagens são disponibilizadas em uma galeria digital privada com download em alta resolução para impressões e versão otimizada para compartilhamento rápido em redes sociais.',
  },
];
