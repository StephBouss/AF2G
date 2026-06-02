export type Action = {
  id: number;
  title: string;
  category: string;
  date: string;
  dateSort: number; // YYYYMM — pour trier du plus récent au plus ancien
  desc: string;
  image: string;
};

export const actions: Action[] = [
  {
    id: 1,
    title: "Séminaire de Renforcement des Capacités",
    category: "Formation",
    date: "Mars 2024",
    dateSort: 202403,
    desc: "Une formation intensive pour les greffières sur les nouvelles procédures numériques.",
    image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Don à l'Orphelinat de Libreville",
    category: "Solidarité",
    date: "Février 2024",
    dateSort: 202402,
    desc: "Remise de vivres et de kits scolaires aux enfants démunis.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Campagne Octobre Rose — Sensibilisation au Cancer du Sein",
    category: "Sensibilisation",
    date: "Octobre 2024",
    dateSort: 202410,
    desc: "L'AF2G s'est mobilisée tout au long du mois d'octobre pour sensibiliser ses membres et le grand public au dépistage précoce du cancer du sein. Ateliers d'information, témoignages et moments de solidarité ont marqué cette campagne placée sous le signe de l'espoir et de la prévention.",
    image: "/actions/octobre-rose.jpg"
  },
  {
    id: 4,
    title: "Forum du Leadership Féminin",
    category: "Leadership",
    date: "Décembre 2023",
    dateSort: 202312,
    desc: "Panel d'échanges avec des femmes leaders de divers secteurs professionnels.",
    image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Soutien aux Femmes Incarcérées",
    category: "Actions Sociales",
    date: "Novembre 2023",
    dateSort: 202311,
    desc: "Visite et distribution de kits d'hygiène à la prison centrale.",
    image: "https://images.unsplash.com/photo-1593113589914-00ef4e562f05?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Atelier de Gestion du Stress au Travail",
    category: "Formation",
    date: "Octobre 2023",
    dateSort: 202310,
    desc: "Une session dédiée au bien-être psychologique dans le milieu judiciaire.",
    image: "https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 8,
    title: "Mise à Jour du Bureau de l'AF2G",
    category: "Leadership",
    date: "Janvier 2025",
    dateSort: 202501,
    desc: "L'AF2G a procédé à la mise à jour officielle de son bureau exécutif lors d'une cérémonie réunissant membres et invités. Présentations des nouveaux responsables, partage de la vision stratégique et renouvellement de l'engagement collectif au service des femmes greffières du Gabon.",
    image: "/actions/mise-a-jour-bureau.jpg"
  },
  {
    id: 7,
    title: "Journée Internationale de l'Enfant Conscient",
    category: "Formation",
    date: "Décembre 2024",
    dateSort: 202412,
    desc: "L'AF2G a célébré la Journée Internationale de l'Enfant Conscient en réunissant enfants et encadreurs autour d'ateliers éducatifs et culturels. Une rencontre placée sous le signe de l'éveil, de la transmission des valeurs et de la promotion de l'enfance épanouie au Gabon.",
    image: "/actions/journee-enfants.jpg"
  },
];
