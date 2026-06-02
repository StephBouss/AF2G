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
    category: "Actions Sociales",
    date: "Décembre 2024",
    dateSort: 202412,
    desc: "L'AF2G a célébré la Journée Internationale de l'Enfant Conscient en réunissant enfants et encadreurs autour d'ateliers éducatifs et culturels. Une rencontre placée sous le signe de l'éveil, de la transmission des valeurs et de la promotion de l'enfance épanouie au Gabon.",
    image: "/actions/journee-enfants.jpg"
  },
  {
    id: 9,
    title: "Octobre Rose — Marche et Aérobic de Solidarité",
    category: "Solidarité",
    date: "Octobre 2024",
    dateSort: 202410,
    desc: "Dans le cadre d'Octobre Rose, l'AF2G a organisé une séance d'aérobic et de marche solidaire en plein air, réunissant des dizaines de femmes en rose. Un moment fort de cohésion, de sport et de sensibilisation au dépistage du cancer du sein, pour rappeler que la prévention est l'affaire de toutes.",
    image: "/actions/octobre-rose-sport.jpg"
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
];
