import React, { useState, useEffect, useMemo } from 'react';
import { 
  Wine, 
  GlassWater, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Copy, 
  Sparkles, 
  Heart, 
  Maximize2, 
  Minimize2, 
  ArrowRight, 
  ShieldCheck, 
  ExternalLink,
  Plus, 
  Minus,
  Menu,
  X,
  Award,
  SlidersHorizontal,
  Download,
  AlertCircle,
  Lock,
  Key,
  LogIn,
  UserPlus,
  LogOut,
  User
} from 'lucide-react';

const AppStyles = () => {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400&family=Manrope:wght@300;400;500;600;700&display=swap');

      :root {
        --cream: #F7F1E7;
        --cream-deep: #EFE6D8;
        --bordeaux: #6E1F2E;
        --bordeaux-deep: #571825;
        --bordeaux-subtle: #F3EAEB;
        --charcoal: #1F1B18;
        --taupe: #8B7B6A;
        --beige: #E3D8C7;
        --brass: #B08D57;
      }

      body {
        background-color: var(--cream);
        color: var(--charcoal);
        font-family: 'Manrope', -apple-system, BlinkMacSystemFont, sans-serif;
        overflow-x: hidden;
        margin: 0;
        padding: 0;
        -webkit-font-smoothing: antialiased;
      }

      .font-serif-display {
        font-family: 'Fraunces', 'Cormorant Garamond', Georgia, serif;
      }

      .font-serif-editorial {
        font-family: 'Cormorant Garamond', Georgia, serif;
      }

      .bg-cream { background-color: var(--cream); }
      .bg-cream-deep { background-color: var(--cream-deep); }
      .bg-bordeaux { background-color: var(--bordeaux); }
      .bg-bordeaux-deep { background-color: var(--bordeaux-deep); }
      .bg-bordeaux-subtle { background-color: var(--bordeaux-subtle); }
      .text-charcoal { color: var(--charcoal); }
      .text-taupe { color: var(--taupe); }
      .text-bordeaux { color: var(--bordeaux); }
      .text-brass { color: var(--brass); }
      .border-beige { border-color: var(--beige); }
      .border-bordeaux { border-color: var(--bordeaux); }

      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }

      @keyframes pulseSoft {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
      }

      .animate-fade-in {
        animation: fadeIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }

      .animate-pulse-soft {
        animation: pulseSoft 3s infinite ease-in-out;
      }

      ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      ::-webkit-scrollbar-track {
        background: var(--cream-deep);
      }
      ::-webkit-scrollbar-thumb {
        background: var(--beige);
        border-radius: 9999px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: var(--taupe);
      }
    `}</style>
  );
};

const EVENT_DATA = {
  title: "Chez Vino et Dodo",
  subtitle: "Soirée dégustation & accords mets-vins",
  theme: "Le chardonnay à travers le monde",
  themeShort: "Odyssée du Chardonnay",
  dateDisplay: "Vendredi 16 Octobre",
  year: "2026",
  timeDisplay: "19h00 précises",
  locationName: "La Maison Ottignies",
  locationCity: "Ottignies-Louvain-la-Neuve",
  locationFull: "Quartier du Centre, 1340 Ottignies-Louvain-la-Neuve, Belgique",
  locationMapUrl: "https://maps.google.com/?q=Ottignies-Louvain-la-Neuve",
  pricePerPerson: 20,
  bottlePrice: 10,
  maxCapacity: 10,
  organizers: [
    { name: "Vino (Amaury)", role: "Amateur de terroirs & sommelier du soir", note: "Passionné par la tension minérale des grands blancs et les vignerons bio." },
    { name: "Dodo (Dorian)", role: "Chef de table & maître du festin", note: "Amoureux des accords délicats, des plats mijotés et des grandes tablées chaleureuses." }
  ],
  paymentInfo: {
    iban: "BE76 0012 3456 7890",
    bic: "GEBABEBB",
    accountHolder: "Amaury & Dorian (Chez Vino et Dodo)",
    revolutHandle: "@vinododo",
    revolutUrl: "https://revolut.me/vinododo",
    refPattern: "NOM + CHARDONNAY 16/10"
  },
  menuHighlights: [
    { course: "Apéritif & Mise en bouche", item: "Gougères au Comté 24 mois & sablés parmesan romarin" },
    { course: "Entrée", item: "Carpaccio de Saint-Jacques, agrumes confits, huile de noisette" },
    { course: "Plat", item: "Suprême de volaille fermière au vin blanc, mousseline de céleri et girolles" },
    { course: "Fromages", item: "Sélection affinée : Chaource crémeux, Tomme crayeuse, Comté d'alpage" },
    { course: "Clôture", item: "Tarte fine aux poires caramélisées & touche de fleur de sel" }
  ]
};

const WINES = [
  {
    id: "chablis-premier-cru",
    name: "Chablis 1er Cru 'Vaudevey'",
    domain: "Domaine Laroche",
    region: "Bourgogne (Chablis)",
    country: "France",
    countryFlag: "🇫🇷",
    vintage: "2022",
    grape: "100% Chardonnay",
    alcohol: "12.5% vol.",
    soil: "Kimméridgien calcaire, marnes à petites huîtres fossilisées (Exogyra virgula)",
    style: "Tendu, ciselé, pureté saline",
    accentColor: "#D6C7A1",
    tagline: "Le temple de la minéralité pure et du calcaire kimméridgien",
    tastingNotes: {
      robe: "Or pâle aux reflets vert amande, éclat cristallin et limpide.",
      nez: "Bouquet d'agrumes vifs (citron de Menton, yuzu), pierre à fusil, iode, craie humide et fleurs blanches.",
      bouche: "Attaque tranchante et lumineuse. La trame acide est droite, guidée par une salinité saline vibrante qui fait saliver longuement."
    },
    pairing: "Carpaccio de Saint-Jacques au citron vert, huîtres creuses d'Oléron, gougères au vieux Comté.",
    story: "La vallée de Vaudevey est encastrée dans un vallon frais et pentu. Cette cuvée est le point de repère absolu pour comprendre le Chardonnay dans sa forme la plus pure et la plus septentrionale, sans maquillage de bois.",
    anecdote: "Le sol date du Jurassique supérieur (-150 millions d'années). Quand vous le buvez, vous dégustez littéralement le fond d'une mer préhistorique.",
    service: {
      temperature: "10°C – 12°C",
      decanting: "Non indispensable, ouvrir 20 minutes avant le service",
      aging: "À boire entre 2024 et 2030"
    }
  },
  {
    id: "sonoma-coast",
    name: "'Les Noisetiers' Sonoma Coast",
    domain: "Kistler Vineyards",
    region: "Sonoma Coast, Californie",
    country: "États-Unis",
    countryFlag: "🇺🇸",
    vintage: "2021",
    grape: "100% Chardonnay",
    alcohol: "14.1% vol.",
    soil: "Sables fins de Goldridge et argiles sédimentaires marines",
    style: "Opulent, soyeux, noisette torréfiée & brioche",
    accentColor: "#E0B36C",
    tagline: "La haute couture californienne inspirée des grands Meursaults",
    tastingNotes: {
      robe: "Or brillant intense aux reflets dorés chauds.",
      nez: "Éblouissant : noisette grillée, beurre frais d'Isigny, pêche blanche mûre, tarte au citron meringuée et un souffle boisé vanillé très noble.",
      bouche: "Texture crémeuse somptueuse, volume en bouche envoûtant, équilibré par une tension apportée par les brumes maritimes du Pacifique."
    },
    pairing: "Suprême de volaille aux morilles et à la crème, risotto crémeux à la truffe blanche, homard rôti au beurre clarifié.",
    story: "Kistler est une icône confidentielle californienne. Steve Kistler a sélectionné des clones de Chardonnay de Bourgogne pour produire un blanc au croisement du soleil américain et de la rigueur bourguignonne.",
    anecdote: "Le nom 'Les Noisetiers' est un hommage en français voulu par le domaine pour souligner cette note irrésistible de noisette qui signe la finale.",
    service: {
      temperature: "12°C – 14°C",
      decanting: "Aérer en carafe 45 minutes pour déployer ses arômes",
      aging: "Potentiel jusqu'en 2034"
    }
  },
  {
    id: "margaret-river",
    name: "Art Series Chardonnay",
    domain: "Leeuwin Estate",
    region: "Margaret River, Western Australia",
    country: "Australie",
    countryFlag: "🇦🇺",
    vintage: "2020",
    grape: "100% Chardonnay",
    alcohol: "13.5% vol.",
    soil: "Sols profonds de graviers latéritiques sur socle granitique",
    style: "Complexe, énergique, agrumes & boisé précieux",
    accentColor: "#C9A76E",
    tagline: "L'un des plus grands blancs de l'hémisphère Sud",
    tastingNotes: {
      robe: "Or paille lumineux aux scintillements platine.",
      nez: "Profond et kaléidoscopique : zeste de pamplemousse rose, poire pochée, sésame grillé, cardamome et un boisé français ultra raffiné.",
      bouche: "Concentration remarquable soutenue par une acidité naturelle laser. Longueur spectaculaire avec des amers nobles qui nettoient le palais."
    },
    pairing: "Lotte rôtie au beurre noisette, tajine de veau aux fruits secs, Comté 30 mois.",
    story: "Margaret River bénéficie d'un climat maritime tempéré par deux océans (Indien et Austral). Robert Mondavi a personnellement conseillé la famille Horgan pour planter ce vignoble d'exception dans les années 70.",
    anecdote: "Chaque millésime arbore sur son étiquette une œuvre d'art contemporaine originale commandée à un artiste australien renommé.",
    service: {
      temperature: "11°C – 13°C",
      decanting: "Ouvrir 30 minutes au préalable",
      aging: "Garde exceptionnelle : 15 à 20 ans"
    }
  },
  {
    id: "casablanca-valley",
    name: "'Wild Ferment' Chardonnay",
    domain: "Viña Errázuriz",
    region: "Valle de Casablanca",
    country: "Chili",
    countryFlag: "🇨🇱",
    vintage: "2022",
    grape: "100% Chardonnay",
    alcohol: "13.0% vol.",
    soil: "Sols argilo-sableux avec dépôts décomposés de la cordillère de la Côte",
    style: "Salin, floral, levures indigènes & fraîcheur australe",
    accentColor: "#E3D3A8",
    tagline: "Quand les brumes de l'océan Pacifique bercent les vignes andines",
    tastingNotes: {
      robe: "Robe jaune paille claire, lumineuse et éclatante.",
      nez: "Fruits tropicaux croquants (goyave, ananas frais), fleur d'oranger, mie de pain levain et une pointe saline maritime.",
      bouche: "Vivacité saline, texture veloutée issue de la fermentation spontanée aux levures indigènes, finale épurée et très digeste."
    },
    pairing: "Ceviche de dorade à la mangue et coriandre, empanadas au crabe, chèvre frais aux herbes sauvages.",
    story: "La vallée de Casablanca est rafraîchie chaque matin par la Camanchaca, une brume dense venant du courant froid de Humboldt. Cela confère une maturation lente sans perte de fraîcheur.",
    anecdote: "Les levures utilisées ne sont pas achetées en laboratoire : elles vivent naturellement sur la peau des raisins du domaine, rendant chaque millésime unique.",
    service: {
      temperature: "10°C – 12°C",
      decanting: "Non requis",
      aging: "Prêt à boire, optimale jusqu'en 2028"
    }
  },
  {
    id: "hemel-en-aarde",
    name: "Estate Chardonnay",
    domain: "Hamilton Russell Vineyards",
    region: "Hemel-en-Aarde Valley, Walker Bay",
    country: "Afrique du Sud",
    countryFlag: "🇿🇦",
    vintage: "2022",
    grape: "100% Chardonnay",
    alcohol: "13.3% vol.",
    soil: "Schistes argileux riches en fer (Bokkeveld shale)",
    style: "Silex fumé, poire williams & élégance aristocratique",
    accentColor: "#CBB38B",
    tagline: "Le joyau de la vallée du 'Ciel et de la Terre'",
    tastingNotes: {
      robe: "Jaune or subtil aux reflets bronze légers.",
      nez: "Fascinant de complexité minérale : silex frotté, fumée froide, coing, poire conférence et fleurs séchées.",
      bouche: "Grosse matière texturée, presque tannique dans sa texture minérale, avec une énergie contenue et une persistance vibrante."
    },
    pairing: "Tartare de thon rouge aux noisettes, quasi de veau braisé, brie de Meaux à la truffe.",
    story: "Hemel-en-Aarde signifie 'Ciel et Terre' en afrikaans. Anthony Hamilton Russell a dédié sa vie à prouver que cette vallée côtière australe pouvait rivaliser directement avec la Côte de Beaune.",
    anecdote: "La récolte se fait à la main au lever du jour à quelques kilomètres des baleines franches australes qui viennent mettre bas dans la baie voisine.",
    service: {
      temperature: "11°C – 13°C",
      decanting: "Aérer 30 minutes avant dégustation",
      aging: "Magnifique jusqu'en 2032"
    }
  }
];

const BottleVisual = ({ wine, size = "md" }) => {
  const isLarge = size === "lg";
  const isSmall = size === "sm";

  const height = isLarge ? 500 : isSmall ? 220 : 360;
  const width = isLarge ? 170 : isSmall ? 76 : 124;

  return (
    <div className="relative flex items-center justify-center select-none group">
      <div 
        className="absolute w-44 h-80 rounded-full blur-3xl opacity-25 pointer-events-none transition-all duration-700 group-hover:opacity-40"
        style={{ backgroundColor: wine.accentColor }}
      />
      <svg
        width={width}
        height={height}
        viewBox="0 0 140 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm transition-transform duration-500 ease-out group-hover:scale-105"
      >
        <defs>
          <linearGradient id={`glassGrad-${wine.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1C241B" />
            <stop offset="22%" stopColor="#31402F" />
            <stop offset="50%" stopColor="#4D5F4A" />
            <stop offset="78%" stopColor="#253023" />
            <stop offset="100%" stopColor="#121811" />
          </linearGradient>

          <linearGradient id={`foilGrad-${wine.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#571825" />
            <stop offset="35%" stopColor="#8C2B3C" />
            <stop offset="65%" stopColor="#B08D57" />
            <stop offset="100%" stopColor="#4A131F" />
          </linearGradient>

          <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodOpacity="0.12" floodColor="#000000" />
          </filter>
        </defs>

        <path
          d="M58 20 C58 14 60 8 70 8 C80 8 82 14 82 20 L82 95 C82 110 88 125 106 148 C120 166 124 186 124 215 L124 398 C124 416 114 424 70 424 C26 424 16 416 16 398 L16 215 C16 186 20 166 34 148 C52 125 58 110 58 95 Z"
          fill={`url(#glassGrad-${wine.id})`}
          filter="url(#softShadow)"
        />

        <path
          d="M24 215 L24 395 C24 408 30 415 48 418 L48 215 C48 185 42 165 32 152 C26 170 24 190 24 215 Z"
          fill="#FFFFFF"
          fillOpacity="0.08"
        />

        <path
          d="M58 8 L82 8 L82 85 C82 87 80 90 78 90 L62 90 C60 90 58 87 58 85 Z"
          fill={`url(#foilGrad-${wine.id})`}
        />
        <rect x="56" y="8" width="28" height="6" rx="2" fill="#B08D57" fillOpacity="0.9" />
        <rect x="58" y="70" width="24" height="2" fill="#E3D8C7" fillOpacity="0.4" />

        <g id="label">
          <rect
            x="30"
            y="215"
            width="80"
            height="145"
            rx="3"
            fill="#FAF6EF"
            stroke="#E3D8C7"
            strokeWidth="0.75"
          />
          <rect
            x="34"
            y="219"
            width="72"
            height="137"
            rx="2"
            fill="none"
            stroke="#D6C7A1"
            strokeWidth="0.5"
            strokeDasharray="2 1"
          />
          
          <text x="70" y="240" textAnchor="middle" fontSize="6.5" fill="#6E1F2E" fontFamily="sans-serif" letterSpacing="0.16em" fontWeight="600">
            CHARDONNAY
          </text>
          
          <line x1="45" y1="247" x2="95" y2="247" stroke="#B08D57" strokeWidth="0.5" />
          
          <text x="70" y="266" textAnchor="middle" fontSize="9" fill="#1F1B18" fontFamily="serif" fontWeight="700">
            {wine.vintage}
          </text>
          
          <text x="70" y="280" textAnchor="middle" fontSize="6.5" fill="#1F1B18" fontFamily="serif" fontStyle="italic">
            {wine.domain.length > 18 ? wine.domain.slice(0, 16) + '…' : wine.domain}
          </text>

          <text x="70" y="294" textAnchor="middle" fontSize="5.5" fill="#8B7B6A" fontFamily="sans-serif" letterSpacing="0.08em">
            {wine.country.toUpperCase()}
          </text>

          <circle cx="70" cy="315" r="8" fill="none" stroke="#6E1F2E" strokeWidth="0.6" />
          <text x="70" y="318" textAnchor="middle" fontSize="6.5" fill="#6E1F2E" fontFamily="serif">
            V&D
          </text>
          
          <text x="70" y="342" textAnchor="middle" fontSize="4.5" fill="#8B7B6A" fontFamily="sans-serif">
            SÉLECTION PRIVÉE
          </text>
        </g>

        <ellipse cx="70" cy="416" rx="42" ry="5" fill="#0E130D" fillOpacity="0.7" />
      </svg>
    </div>
  );
};

const submitToGoogleSheets = async (formData) => {
  const GOOGLE_SCRIPT_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyyyBb4eKiHcsZoPzQ9VDifC4sinJvlSOre18ZtBl8g4GJ10flcD0-hsoJjGFI-438L/exec"; 

  const payload = {
    timestamp: new Date().toLocaleString("fr-BE", { timeZone: "Europe/Brussels" }),
    event: EVENT_DATA.title,
    theme: EVENT_DATA.theme,
    date: EVENT_DATA.dateDisplay,
    ...formData
  };

  try {
    const existing = JSON.parse(localStorage.getItem('vinododo_registrations') || '[]');
    existing.push(payload);
    localStorage.setItem('vinododo_registrations', JSON.stringify(existing));
  } catch (err) {
    console.warn("Stockage local indisponible :", err);
  }

  try {
    if (GOOGLE_SCRIPT_WEBHOOK_URL && GOOGLE_SCRIPT_WEBHOOK_URL.trim().length > 0) {
      await fetch(GOOGLE_SCRIPT_WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      });
      return { success: true, mode: "google-sheets" };
    } else {
      await new Promise(res => setTimeout(res, 850));
      return { success: true, mode: "local-simulation", data: payload };
    }
  } catch (error) {
    console.error("Erreur d'envoi vers Google Sheets :", error);
    return { success: false, error };
  }
};

const InvitationGate = ({ onLoginSuccess, registeredCount, maxCapacity }) => {
  const [activeTab, setActiveTab] = useState('register'); // 'register' | 'login'
  const isFull = registeredCount >= maxCapacity;

  // Registration state
  const [regForm, setRegForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    hasPlusOne: false,
    plusOneName: '',
    dietary: 'aucun',
    dietaryNotes: '',
    takeBottle: false,
    bottleCount: 1,
    consentRgpd: true
  });

  // Login state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Dynamic price calculation
  const guestsCount = regForm.hasPlusOne ? 2 : 1;
  const basePrice = guestsCount * EVENT_DATA.pricePerPerson;
  const bottleExtra = regForm.takeBottle ? (regForm.bottleCount * EVENT_DATA.bottlePrice) : 0;
  const totalPrice = basePrice + bottleExtra;

  const validateRegistration = () => {
    const errs = {};
    if (!regForm.firstName.trim()) errs.firstName = "Le prénom est requis";
    if (!regForm.lastName.trim()) errs.lastName = "Le nom est requis";
    if (!regForm.email.trim()) {
      errs.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regForm.email)) {
      errs.email = "Adresse email invalide";
    }
    if (!regForm.phone.trim()) errs.phone = "Le numéro de téléphone est requis";
    if (!regForm.password.trim() || regForm.password.length < 4) {
      errs.password = "Choisissez un mot de passe (min. 4 caractères)";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!validateRegistration()) return;

    setIsSubmitting(true);
    const submissionPayload = {
      ...regForm,
      guestsCount,
      totalPrice,
      isWaitlist: isFull
    };

    await submitToGoogleSheets(submissionPayload);

    // Save registered user locally for login
    try {
      const storedUsers = JSON.parse(localStorage.getItem('vinododo_users') || '[]');
      storedUsers.push({
        name: `${regForm.firstName} ${regForm.lastName}`,
        firstName: regForm.firstName,
        email: regForm.email.toLowerCase().trim(),
        password: regForm.password
      });
      localStorage.setItem('vinododo_users', JSON.stringify(storedUsers));
    } catch (e) {
      console.warn("Storage warning:", e);
    }

    setIsSubmitting(false);
    onLoginSuccess({
      name: `${regForm.firstName} ${regForm.lastName}`,
      firstName: regForm.firstName,
      email: regForm.email,
      justRegistered: true,
      submissionData: submissionPayload
    });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');

    const cleanId = loginIdentifier.toLowerCase().trim();
    const cleanPwd = loginPassword.trim();

    if (!cleanId || !cleanPwd) {
      setLoginError("Veuillez renseigner votre prénom (ou email) et votre mot de passe.");
      return;
    }

    // Check stored users or bypass master password
    const storedUsers = JSON.parse(localStorage.getItem('vinododo_users') || '[]');
    const foundUser = storedUsers.find(u => 
      (u.email === cleanId || u.firstName.toLowerCase() === cleanId) && u.password === cleanPwd
    );

    // Master secret key or match
    if (foundUser || cleanPwd === 'chardonnay' || cleanPwd === 'vinododo2026') {
      const userObj = foundUser || {
        name: loginIdentifier,
        firstName: loginIdentifier.split(' ')[0],
        email: cleanId
      };
      onLoginSuccess(userObj);
    } else {
      setLoginError("Identifiant ou mot de passe incorrect. Astuce : si vous venez de vous inscrire, vérifiez l'orthographe ou créez votre accès.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-10 relative">
      <div className="absolute inset-0 bg-cream opacity-90 -z-10" />
      <div className="w-full max-w-xl bg-cream border border-beige rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden animate-fade-in">
        
        {/* Welcome Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="w-14 h-14 rounded-full border border-beige bg-cream-deep text-bordeaux mx-auto flex items-center justify-center shadow-sm">
            <Wine className="w-7 h-7" strokeWidth={1.5} />
          </div>

          <span className="text-xs uppercase tracking-widest text-brass font-semibold block">
            Invitation Privée
          </span>

          <h1 className="font-serif-display text-3xl sm:text-4xl text-charcoal tracking-tight">
            Bonjour ! Vino & Dodo vous invitent
          </h1>

          <p className="font-serif-editorial text-xl sm:text-2xl text-taupe italic">
            à leur soirée vin du {EVENT_DATA.dateDisplay}
          </p>

          <p className="text-xs sm:text-sm text-charcoal/80 max-w-md mx-auto leading-relaxed">
            {EVENT_DATA.theme} · 19h à {EVENT_DATA.locationCity}. Cinq flacons d'exception, dîner gourmand fait maison et anecdotes de table.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1 bg-cream-deep/60 rounded-xl border border-beige mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('register')}
            className={`py-2.5 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'register'
                ? 'bg-cream text-bordeaux shadow-sm'
                : 'text-taupe hover:text-charcoal'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>S'inscrire ({EVENT_DATA.pricePerPerson}€)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('login')}
            className={`py-2.5 rounded-lg text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 ${
              activeTab === 'login'
                ? 'bg-cream text-bordeaux shadow-sm'
                : 'text-taupe hover:text-charcoal'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Déjà inscrit</span>
          </button>
        </div>

        {/* Tab 1: Registration Form */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-4 animate-fade-in text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
                  Prénom *
                </label>
                <input
                  type="text"
                  value={regForm.firstName}
                  onChange={(e) => setRegForm({ ...regForm, firstName: e.target.value })}
                  placeholder="ex. Éléonore"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-cream-deep/40 border border-beige text-xs text-charcoal focus:outline-none focus:border-bordeaux"
                />
                {errors.firstName && <span className="text-[11px] text-bordeaux mt-0.5 block">{errors.firstName}</span>}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
                  Nom *
                </label>
                <input
                  type="text"
                  value={regForm.lastName}
                  onChange={(e) => setRegForm({ ...regForm, lastName: e.target.value })}
                  placeholder="ex. Martin"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-cream-deep/40 border border-beige text-xs text-charcoal focus:outline-none focus:border-bordeaux"
                />
                {errors.lastName && <span className="text-[11px] text-bordeaux mt-0.5 block">{errors.lastName}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={regForm.email}
                  onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                  placeholder="votre@adresse.be"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-cream-deep/40 border border-beige text-xs text-charcoal focus:outline-none focus:border-bordeaux"
                />
                {errors.email && <span className="text-[11px] text-bordeaux mt-0.5 block">{errors.email}</span>}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
                  Téléphone / WhatsApp *
                </label>
                <input
                  type="tel"
                  value={regForm.phone}
                  onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                  placeholder="+32 470 12 34 56"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-cream-deep/40 border border-beige text-xs text-charcoal focus:outline-none focus:border-bordeaux"
                />
                {errors.phone && <span className="text-[11px] text-bordeaux mt-0.5 block">{errors.phone}</span>}
              </div>
            </div>

            {/* Password Creation */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
                Choisissez un mot de passe personnel *
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={regForm.password}
                  onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                  placeholder="Pour vous reconnecter à l'app plus tard"
                  className="w-full px-3.5 py-2.5 pl-9 rounded-lg bg-cream-deep/40 border border-beige text-xs text-charcoal focus:outline-none focus:border-bordeaux"
                />
                <Lock className="w-4 h-4 text-taupe absolute left-3 top-3" />
              </div>
              {errors.password && <span className="text-[11px] text-bordeaux mt-0.5 block">{errors.password}</span>}
            </div>

            {/* Plus One (+1) toggle */}
            <div className="pt-2 border-t border-beige/60">
              <label className="flex items-center justify-between cursor-pointer py-1">
                <div>
                  <span className="text-xs font-semibold text-charcoal block">Venir accompagné(e) (+1) ?</span>
                  <span className="text-[11px] text-taupe">Ajoute une seconde place au dîner</span>
                </div>
                <input
                  type="checkbox"
                  checked={regForm.hasPlusOne}
                  onChange={(e) => setRegForm({ ...regForm, hasPlusOne: e.target.checked })}
                  className="w-4 h-4 accent-bordeaux rounded cursor-pointer"
                />
              </label>

              {regForm.hasPlusOne && (
                <input
                  type="text"
                  value={regForm.plusOneName}
                  onChange={(e) => setRegForm({ ...regForm, plusOneName: e.target.value })}
                  placeholder="Prénom de votre invité(e)"
                  className="w-full mt-2 px-3 py-2 rounded-lg bg-cream border border-beige text-xs text-charcoal focus:outline-none focus:border-bordeaux"
                />
              )}
            </div>

            {/* Dietary preferences */}
            <div className="pt-2 border-t border-beige/60">
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5">
                Régime alimentaire & allergies
              </label>
              <div className="grid grid-cols-3 gap-1.5 mb-2">
                {['aucun', 'vegetarien', 'sans_gluten'].map((mode) => (
                  <button
                    type="button"
                    key={mode}
                    onClick={() => setRegForm({ ...regForm, dietary: mode })}
                    className={`py-1.5 px-2 rounded text-[11px] border capitalize ${
                      regForm.dietary === mode 
                        ? 'border-bordeaux bg-bordeaux-subtle text-bordeaux font-semibold' 
                        : 'border-beige text-taupe'
                    }`}
                  >
                    {mode === 'aucun' ? 'Normal' : mode === 'vegetarien' ? 'Végétarien' : 'Sans gluten'}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={regForm.dietaryNotes}
                onChange={(e) => setRegForm({ ...regForm, dietaryNotes: e.target.value })}
                placeholder="Précision (ex. intolérance lactose...)"
                className="w-full px-3 py-1.5 rounded-lg bg-cream-deep/30 border border-beige text-xs text-charcoal focus:outline-none focus:border-bordeaux"
              />
            </div>

            {/* Take Bottle Home Option (+10 €) */}
            <div className="pt-2 border-t border-beige/60 p-3 rounded-xl bg-cream-deep/40 border border-beige space-y-2">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="text-xs font-semibold text-charcoal flex items-center gap-1.5">
                    <Wine className="w-3.5 h-3.5 text-bordeaux" />
                    Repartir avec une bouteille (+10 €)
                  </span>
                  <span className="text-[11px] text-taupe block">Tarif préférentiel dégustation</span>
                </div>
                <input
                  type="checkbox"
                  checked={regForm.takeBottle}
                  onChange={(e) => setRegForm({ ...regForm, takeBottle: e.target.checked })}
                  className="w-4 h-4 accent-bordeaux rounded cursor-pointer"
                />
              </label>

              {regForm.takeBottle && (
                <div className="flex items-center justify-between pt-2 border-t border-beige text-xs">
                  <span>Nombre de flacons :</span>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => setRegForm({ ...regForm, bottleCount: Math.max(1, regForm.bottleCount - 1) })}
                      className="w-6 h-6 rounded-full border border-beige bg-cream flex items-center justify-center text-xs"
                    >
                      -
                    </button>
                    <span className="font-mono font-semibold">{regForm.bottleCount}</span>
                    <button
                      type="button"
                      onClick={() => setRegForm({ ...regForm, bottleCount: Math.min(4, regForm.bottleCount + 1) })}
                      className="w-6 h-6 rounded-full border border-beige bg-cream flex items-center justify-center text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Total Price preview */}
            <div className="flex items-baseline justify-between pt-2 border-t border-beige">
              <div>
                <span className="text-xs font-semibold text-charcoal block">Total participation :</span>
                <span className="text-[10px] text-taupe">{guestsCount} place(s) {regForm.takeBottle ? `+ ${regForm.bottleCount} bouteille` : ''}</span>
              </div>
              <span className="font-serif-display text-2xl font-bold text-bordeaux font-mono">
                {totalPrice} €
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-full bg-bordeaux text-cream font-semibold text-xs uppercase tracking-wider shadow-sm hover:bg-bordeaux-deep transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2 hover:scale-[1.01]"
            >
              {isSubmitting ? (
                <span>Enregistrement en direct...</span>
              ) : (
                <span>S'inscrire et entrer dans l'App · {totalPrice} €</span>
              )}
            </button>
          </form>
        )}

        {/* Tab 2: Login Form */}
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4 animate-fade-in text-left">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
                Prénom ou Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  placeholder="ex. Éléonore ou votre email"
                  className="w-full px-3.5 py-2.5 pl-9 rounded-lg bg-cream-deep/40 border border-beige text-xs text-charcoal focus:outline-none focus:border-bordeaux"
                />
                <User className="w-4 h-4 text-taupe absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Votre mot de passe choisi à l'inscription"
                  className="w-full px-3.5 py-2.5 pl-9 rounded-lg bg-cream-deep/40 border border-beige text-xs text-charcoal focus:outline-none focus:border-bordeaux"
                />
                <Key className="w-4 h-4 text-taupe absolute left-3 top-3" />
              </div>
            </div>

            {loginError && (
              <div className="p-3 rounded-lg bg-bordeaux-subtle border border-bordeaux/20 text-xs text-bordeaux flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-bordeaux text-cream font-semibold text-xs uppercase tracking-wider shadow-sm hover:bg-bordeaux-deep transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.01]"
            >
              <LogIn className="w-4 h-4" />
              <span>Se connecter et ouvrir l'App</span>
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => onLoginSuccess({ name: "Ami Curieux", firstName: "Ami" })}
                className="text-[11px] text-taupe hover:text-bordeaux underline"
              >
                Accès rapide sans mot de passe (mode découverte)
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

const HeaderNav = ({ activePage, setActivePage, registeredCount, maxCapacity, currentUser, onLogout }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const spotsLeft = maxCapacity - registeredCount;

  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-md border-b border-beige transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        
        <button 
          onClick={() => { setActivePage('home'); setMobileOpen(false); }}
          className="flex items-center space-x-3 text-left focus:outline-none group"
        >
          <div className="w-10 h-10 rounded-full border border-beige bg-cream-deep flex items-center justify-center text-bordeaux transition-transform duration-300 group-hover:scale-105">
            <Wine className="w-5 h-5" strokeWidth={1.5} />
          </div>
          <div>
            <span className="font-serif-display font-semibold text-xl tracking-tight block text-charcoal group-hover:text-bordeaux transition-colors">
              Chez Vino & Dodo
            </span>
            <span className="text-xs uppercase tracking-widest text-taupe font-medium block">
              16 Octobre · Ottignies
            </span>
          </div>
        </button>

        <nav className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => setActivePage('home')}
            className={`text-sm font-medium tracking-wide transition-colors py-1 relative ${
              activePage === 'home' ? 'text-bordeaux font-semibold' : 'text-taupe hover:text-charcoal'
            }`}
          >
            L'Édition
            {activePage === 'home' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-bordeaux rounded-full animate-fade-in" />
            )}
          </button>

          <button 
            onClick={() => setActivePage('degustation')}
            className={`text-sm font-medium tracking-wide transition-colors py-1 relative flex items-center gap-1.5 ${
              activePage === 'degustation' ? 'text-bordeaux font-semibold' : 'text-taupe hover:text-charcoal'
            }`}
          >
            <span>Fiches Vins (5)</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-cream-deep text-taupe border border-beige">Live</span>
            {activePage === 'degustation' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-bordeaux rounded-full animate-fade-in" />
            )}
          </button>

          <button 
            onClick={() => setActivePage('vote')}
            className={`text-sm font-medium tracking-wide transition-colors py-1 relative ${
              activePage === 'vote' ? 'text-bordeaux font-semibold' : 'text-taupe hover:text-charcoal'
            }`}
          >
            Coup de Cœur
            {activePage === 'vote' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-bordeaux rounded-full animate-fade-in" />
            )}
          </button>

          <div className="h-4 w-px bg-beige" />

          {/* User Badge / Logout */}
          {currentUser && (
            <div className="flex items-center space-x-3">
              <span className="text-xs text-taupe">
                Bonjour, <strong className="text-charcoal">{currentUser.firstName}</strong>
              </span>
              <button
                onClick={onLogout}
                className="p-1.5 rounded-full text-taupe hover:text-bordeaux hover:bg-cream-deep transition-colors"
                title="Déconnexion"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActivePage('inscription')}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all duration-300 ${
                activePage === 'inscription'
                  ? 'bg-bordeaux-deep text-cream ring-2 ring-bordeaux'
                  : 'bg-bordeaux text-cream hover:bg-bordeaux-deep shadow-sm hover:scale-[1.02]'
              }`}
            >
              Réservation ({EVENT_DATA.pricePerPerson}€)
            </button>
          </div>
        </nav>

        <div className="flex md:hidden items-center space-x-3">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-charcoal hover:text-bordeaux focus:outline-none"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-cream border-b border-beige px-6 py-6 space-y-4 animate-fade-in">
          {currentUser && (
            <div className="flex items-center justify-between pb-3 border-b border-beige">
              <span className="text-xs text-taupe">Connecté en tant que <strong>{currentUser.firstName}</strong></span>
              <button onClick={onLogout} className="text-xs text-bordeaux font-semibold flex items-center gap-1">
                <LogOut className="w-3.5 h-3.5" /> Déconnexion
              </button>
            </div>
          )}
          <button
            onClick={() => { setActivePage('home'); setMobileOpen(false); }}
            className="block w-full text-left text-base font-medium text-charcoal py-2 border-b border-beige/60"
          >
            Présentation & Thème
          </button>
          <button
            onClick={() => { setActivePage('degustation'); setMobileOpen(false); }}
            className="flex items-center justify-between w-full text-left text-base font-medium text-charcoal py-2 border-b border-beige/60"
          >
            <span>Fiches Dégustation</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-cream-deep border border-beige">5 cuvées</span>
          </button>
          <button
            onClick={() => { setActivePage('vote'); setMobileOpen(false); }}
            className="block w-full text-left text-base font-medium text-charcoal py-2 border-b border-beige/60"
          >
            Vote du Vin Préféré
          </button>
          <button
            onClick={() => { setActivePage('inscription'); setMobileOpen(false); }}
            className="block w-full text-center py-3 rounded-full bg-bordeaux text-cream font-semibold text-sm uppercase tracking-wider mt-4"
          >
            Réserver ({EVENT_DATA.pricePerPerson}€)
          </button>
        </div>
      )}
    </header>
  );
};

const MobileBottomBar = ({ activePage, setActivePage }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-cream/95 backdrop-blur-md border-t border-beige px-4 py-2 flex items-center justify-around">
      <button
        onClick={() => setActivePage('home')}
        className={`flex flex-col items-center py-1 px-3 ${
          activePage === 'home' ? 'text-bordeaux font-semibold' : 'text-taupe'
        }`}
      >
        <Wine className="w-5 h-5 mb-0.5" strokeWidth={1.5} />
        <span className="text-[10px] tracking-wider uppercase">Accueil</span>
      </button>

      <button
        onClick={() => setActivePage('degustation')}
        className={`flex flex-col items-center py-1 px-3 ${
          activePage === 'degustation' ? 'text-bordeaux font-semibold' : 'text-taupe'
        }`}
      >
        <GlassWater className="w-5 h-5 mb-0.5" strokeWidth={1.5} />
        <span className="text-[10px] tracking-wider uppercase">Vins</span>
      </button>

      <button
        onClick={() => setActivePage('vote')}
        className={`flex flex-col items-center py-1 px-3 ${
          activePage === 'vote' ? 'text-bordeaux font-semibold' : 'text-taupe'
        }`}
      >
        <Award className="w-5 h-5 mb-0.5" strokeWidth={1.5} />
        <span className="text-[10px] tracking-wider uppercase">Vote</span>
      </button>
    </div>
  );
};

const CountdownTimer = () => {
  const calculateTimeLeft = () => {
    const eventTime = new Date('2026-10-16T19:00:00').getTime();
    const now = new Date().getTime();
    const difference = eventTime - now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60)
      };
    }
    return { days: 38, hours: 19, minutes: 0 };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="inline-flex items-center gap-4 px-4 py-2 rounded-full bg-cream-deep/80 border border-beige text-xs text-taupe">
      <span className="uppercase tracking-widest text-[10px] font-semibold text-charcoal">
        Compte à rebours
      </span>
      <div className="h-3 w-px bg-beige" />
      <div className="flex items-center gap-3 font-mono text-charcoal font-semibold">
        <span><strong>{timeLeft.days}</strong>j</span>
        <span><strong>{timeLeft.hours}</strong>h</span>
        <span><strong>{timeLeft.minutes}</strong>m</span>
      </div>
    </div>
  );
};

const HomePage = ({ setActivePage, registeredCount, maxCapacity }) => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (idx) => {
    setOpenAccordion(openAccordion === idx ? null : idx);
  };

  return (
    <div className="pb-24 animate-fade-in">
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-beige overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-bordeaux-subtle text-bordeaux border border-bordeaux/20">
                  Dégustation privée N°01
                </span>
                <CountdownTimer />
              </div>

              <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl text-charcoal tracking-tight leading-[1.08]">
                Chez <span className="italic font-normal text-bordeaux">Vino</span> et <span className="italic font-normal text-bordeaux">Dodo</span>
              </h1>

              <p className="font-serif-editorial text-2xl sm:text-3xl text-taupe italic">
                « {EVENT_DATA.theme} »
              </p>

              <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed max-w-xl">
                Une soirée intimiste entre amis pour explorer les mille visages du cépage roi blanc. 
                Cinq flacons d'exception venus de quatre continents, un dîner gourmand accordé sur mesure 
                et des anecdotes passionnées racontées au fil de chaque verre.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-beige/80">
                <div className="space-y-0.5">
                  <span className="text-[11px] uppercase tracking-wider text-taupe block">Rendez-vous</span>
                  <span className="font-medium text-sm text-charcoal flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-bordeaux" /> {EVENT_DATA.dateDisplay}
                  </span>
                  <span className="text-xs text-taupe block">{EVENT_DATA.timeDisplay}</span>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[11px] uppercase tracking-wider text-taupe block">Lieu</span>
                  <span className="font-medium text-sm text-charcoal flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-bordeaux" /> {EVENT_DATA.locationCity}
                  </span>
                  <span className="text-xs text-taupe block truncate">Ottignies-LLN</span>
                </div>

                <div className="space-y-0.5 col-span-2 sm:col-span-1">
                  <span className="text-[11px] uppercase tracking-wider text-taupe block">Participation</span>
                  <span className="font-medium text-sm text-charcoal">
                    {EVENT_DATA.pricePerPerson} € <span className="text-xs font-normal text-taupe">/ convive</span>
                  </span>
                  <span className="text-xs text-emerald-800 block">Dîner + 5 vins inclus</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => setActivePage('degustation')}
                  className="px-8 py-4 rounded-full bg-bordeaux text-cream font-medium text-sm tracking-wide uppercase shadow-sm hover:bg-bordeaux-deep transition-all duration-300 flex items-center justify-center gap-3 hover:scale-[1.02]"
                >
                  <span>Découvrir les 5 flacons</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setActivePage('vote')}
                  className="px-6 py-4 rounded-full border border-charcoal/30 hover:border-bordeaux text-charcoal hover:text-bordeaux font-medium text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  <span>Voter pour votre vin préféré</span>
                </button>
              </div>

              <div className="text-xs text-taupe flex items-center gap-2">
                <Users className="w-4 h-4 text-bordeaux" />
                <span>Table limitée à {EVENT_DATA.maxCapacity} personnes seulement ({registeredCount} déjà inscrits)</span>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-sm p-8 rounded-2xl bg-cream-deep/70 border border-beige flex flex-col items-center text-center">
                <div className="text-[11px] uppercase tracking-widest text-brass font-semibold mb-2">
                  Flacon d'ouverture
                </div>
                
                <BottleVisual wine={WINES[0]} size="md" />

                <div className="mt-6 space-y-1">
                  <span className="font-serif-display text-xl text-charcoal font-semibold block">
                    {WINES[0].name}
                  </span>
                  <span className="text-xs uppercase tracking-wider text-taupe block">
                    {WINES[0].domain} · {WINES[0].vintage}
                  </span>
                  <p className="text-xs text-charcoal/70 italic max-w-xs mt-2">
                    « Minéralité calcaire kimméridgienne pure et tension saline »
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-beige w-full flex justify-between text-xs text-taupe">
                  <span>5 pays</span>
                  <span>5 philosophies</span>
                  <span>1 cépage culte</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 border-b border-beige">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 mb-14">
            <span className="text-xs uppercase tracking-widest text-brass font-semibold">
              Le Manifeste
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-charcoal">
              La table comme théâtre d'émotions
            </h2>
            <div className="w-12 h-0.5 bg-bordeaux mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-charcoal/85 leading-relaxed text-base">
            <div className="space-y-4">
              <p>
                Ni cours magistral intimidant, ni simple apéro improvisé. Chez Vino et Dodo est né d'une envie 
                simple : réunir quelques âmes curieuses autour d'un grand festin maison pour déguster des vins 
                qui ont une âme, un lieu, une signature géologique.
              </p>
              <p>
                À chaque bouteille débouchée, nous levons le voile sur les secrets de son terroir, les choix du 
                vigneron et l'anecdote qui transforme une gorgée en souvenir impérissable.
              </p>
            </div>

            <div className="space-y-4">
              <p>
                Pour cette première édition, nous avons choisi le <strong>Chardonnay</strong> : un cépage caméléon 
                capable d'offrir la salinité la plus tranchante du nord de la France comme l'opulence beurrée 
                la plus séduisante des côtes pacifiques californiennes.
              </p>
              <p className="text-sm border-l-2 border-bordeaux pl-4 text-taupe italic">
                « Un grand vin ne se boit pas seul : il se partage, s'écoute et s'accompagne d'une assiette 
                pensée pour lui rendre hommage. »
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Evening Flow */}
      <section className="py-20 border-b border-beige">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 mb-14">
            <span className="text-xs uppercase tracking-widest text-brass font-semibold">
              Le Programme
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-charcoal">
              Déroulement de la soirée
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                time: "19h00",
                title: "Accueil & Verre de bienvenue",
                desc: "Arrivée chez nous à Ottignies, mise en bouche croustillante et présentation informelle du voyage œnologique.",
                details: "Gougères chaudes au Comté 24 mois, présentation des convives et distribution des carnets de dégustation."
              },
              {
                time: "19h45",
                title: "Dégustation comparative des Blancs vifs",
                desc: "Chablis Premier Cru (France) face au Wild Ferment de la Vallée de Casablanca (Chili).",
                details: "Comparaison à l'aveugle de la minéralité septentrionale face aux embruns du Pacifique, accompagnée d'un carpaccio de Saint-Jacques marinées."
              },
              {
                time: "20h45",
                title: "Le Cœur du Festin : Textures & Richesse",
                desc: "Les Noisetiers de Kistler (Californie) & Leeuwin Estate (Australie).",
                details: "Suprême de volaille fermière au vin blanc et champignons sauvages pour magnifier le gras noble et le boisé vanillé subtil."
              },
              {
                time: "22h00",
                title: "La Touche Australe & Fromages affinés",
                desc: "Hamilton Russell (Afrique du Sud) avec notre sélection de pâtes pressées et fleuries.",
                details: "Silex fumé et tension crayeuse en accord parfait avec un Chaource onctueux et un Comté d'alpage."
              },
              {
                time: "22h45",
                title: "Vote du Vin Préféré & Digression libre",
                desc: "Élection du flacon favori des convives, café de spécialité ou tisane bio, et possibilité d'emporter sa bouteille réservée.",
                details: "Remise des prix symboliques, discussions et clôture en douceur."
              }
            ].map((step, idx) => (
              <div 
                key={idx}
                className="bg-cream-deep/30 border border-beige rounded-xl p-5 transition-colors hover:border-bordeaux/30"
              >
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleAccordion(idx)}
                >
                  <div className="flex items-start sm:items-center space-x-4">
                    <span className="px-2.5 py-1 rounded bg-cream border border-beige text-xs font-mono font-semibold text-bordeaux">
                      {step.time}
                    </span>
                    <div>
                      <h4 className="font-serif-display font-semibold text-lg text-charcoal">
                        {step.title}
                      </h4>
                      <p className="text-xs text-taupe mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                  <button className="text-taupe hover:text-charcoal p-1">
                    <Plus className={`w-4 h-4 transition-transform duration-200 ${openAccordion === idx ? 'rotate-45 text-bordeaux' : ''}`} />
                  </button>
                </div>

                {openAccordion === idx && (
                  <div className="mt-4 pt-3 border-t border-beige/60 text-xs text-charcoal/80 leading-relaxed animate-fade-in pl-14">
                    {step.details}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practical Location */}
      <section className="py-20 border-b border-beige">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-cream-deep/60 border border-beige rounded-2xl p-8 sm:p-10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-brass font-semibold">
                  Accès & Commodités
                </span>
                <h3 className="font-serif-display text-2xl sm:text-3xl text-charcoal mt-1">
                  Ottignies-Louvain-la-Neuve
                </h3>
              </div>
              <a
                href={EVENT_DATA.locationMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-4 py-2.5 rounded-full bg-cream border border-beige hover:border-bordeaux text-charcoal hover:text-bordeaux transition-colors"
              >
                <span>Ouvrir dans Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <p className="text-sm text-charcoal/80 leading-relaxed">
              L'adresse exacte (à 5 minutes à pied de la gare d'Ottignies, idéale pour laisser la voiture au repos 
              et rentrer en train en toute sécurité) est réservée aux convives confirmés.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

const TastingPage = ({ activeWineIndex, setActiveWineIndex, setActivePage }) => {
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const wine = WINES[activeWineIndex];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        setActiveWineIndex((prev) => (prev + 1) % WINES.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveWineIndex((prev) => (prev - 1 + WINES.length) % WINES.length);
      } else if (e.key === 'Escape' && isPresentationMode) {
        setIsPresentationMode(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPresentationMode, setActiveWineIndex]);

  const handleNext = () => {
    setActiveWineIndex((prev) => (prev + 1) % WINES.length);
  };

  const handlePrev = () => {
    setActiveWineIndex((prev) => (prev - 1 + WINES.length) % WINES.length);
  };

  return (
    <div className={`transition-colors duration-500 ${isPresentationMode ? 'fixed inset-0 z-50 bg-[#161311] text-cream overflow-y-auto' : 'pb-24 animate-fade-in'}`}>
      
      <div className={`max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between border-b ${isPresentationMode ? 'border-charcoal/40' : 'border-beige'}`}>
        <div className="flex items-center space-x-3">
          <span className={`text-xs font-mono tracking-widest uppercase ${isPresentationMode ? 'text-taupe' : 'text-charcoal font-semibold'}`}>
            FLACON 0{activeWineIndex + 1} / 0{WINES.length}
          </span>
          <div className="hidden sm:flex space-x-1.5">
            {WINES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveWineIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeWineIndex === idx 
                    ? 'w-8 bg-bordeaux' 
                    : isPresentationMode ? 'w-2 bg-neutral-700' : 'w-2 bg-beige hover:bg-taupe'
                }`}
                aria-label={`Aller au vin ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsPresentationMode(!isPresentationMode)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 border transition-all ${
              isPresentationMode 
                ? 'bg-neutral-800 border-neutral-700 text-cream hover:bg-neutral-700' 
                : 'bg-cream border-beige text-charcoal hover:border-bordeaux'
            }`}
          >
            {isPresentationMode ? (
              <>
                <Minimize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Quitter plein écran</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-bordeaux" />
                <span className="hidden sm:inline">Mode Projection</span>
              </>
            )}
          </button>

          <div className="flex items-center space-x-1">
            <button
              onClick={handlePrev}
              className={`p-2 rounded-full border transition-all ${
                isPresentationMode 
                  ? 'border-neutral-700 text-cream hover:bg-neutral-800' 
                  : 'border-beige text-charcoal hover:border-bordeaux bg-cream'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className={`p-2 rounded-full border transition-all ${
                isPresentationMode 
                  ? 'border-neutral-700 text-cream hover:bg-neutral-800' 
                  : 'border-beige text-charcoal hover:border-bordeaux bg-cream'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative py-6">
              <BottleVisual wine={wine} size="lg" />
            </div>

            <div className={`mt-4 px-4 py-1.5 rounded-full border text-xs flex items-center gap-2 ${
              isPresentationMode ? 'bg-neutral-900 border-neutral-700 text-neutral-300' : 'bg-cream-deep border-beige text-charcoal'
            }`}>
              <span className="text-base">{wine.countryFlag}</span>
              <span className="font-semibold">{wine.country}</span>
              <span>·</span>
              <span className="font-mono">{wine.vintage}</span>
              <span>·</span>
              <span>{wine.alcohol}</span>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-brass font-semibold">
                  {wine.region}
                </span>
                <span className="text-xs text-taupe italic">
                  Cuvée 0{activeWineIndex + 1}
                </span>
              </div>

              <h1 className={`font-serif-display text-3xl sm:text-4xl lg:text-5xl leading-tight font-semibold ${
                isPresentationMode ? 'text-white' : 'text-charcoal'
              }`}>
                {wine.name}
              </h1>

              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="font-medium text-bordeaux">{wine.domain}</span>
                <span className="text-taupe">·</span>
                <span className={isPresentationMode ? 'text-neutral-400' : 'text-taupe'}>{wine.grape}</span>
              </div>

              <p className={`text-sm sm:text-base italic border-l-2 border-bordeaux pl-3 ${
                isPresentationMode ? 'text-neutral-300' : 'text-charcoal/80'
              }`}>
                « {wine.tagline} »
              </p>
            </div>

            <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl border ${
              isPresentationMode ? 'bg-neutral-900/80 border-neutral-800' : 'bg-cream-deep/40 border-beige'
            }`}>
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-brass block">Robe</span>
                <p className={`text-xs leading-relaxed ${isPresentationMode ? 'text-neutral-300' : 'text-charcoal/80'}`}>{wine.tastingNotes.robe}</p>
              </div>

              <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-beige/60 pt-2 sm:pt-0 sm:pl-3">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-brass block">Nez</span>
                <p className={`text-xs leading-relaxed ${isPresentationMode ? 'text-neutral-300' : 'text-charcoal/80'}`}>{wine.tastingNotes.nez}</p>
              </div>

              <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-beige/60 pt-2 sm:pt-0 sm:pl-3">
                <span className="text-[10px] uppercase tracking-widest font-semibold text-brass block">Bouche</span>
                <p className={`text-xs leading-relaxed ${isPresentationMode ? 'text-neutral-300' : 'text-charcoal/80'}`}>{wine.tastingNotes.bouche}</p>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-brass font-semibold block">
                L'Histoire & Le Choix de Vino et Dodo
              </span>
              <p className={`text-sm sm:text-base leading-relaxed ${isPresentationMode ? 'text-neutral-300' : 'text-charcoal/90'}`}>
                {wine.story}
              </p>
              <div className={`p-3 rounded-lg border text-xs italic ${
                isPresentationMode ? 'bg-neutral-800/60 border-neutral-700 text-neutral-300' : 'bg-cream border-beige text-taupe'
              }`}>
                💡 <strong>L'anecdote de table :</strong> {wine.anecdote}
              </div>
            </div>

            <div className={`p-4 rounded-xl border flex items-start gap-3 ${
              isPresentationMode ? 'bg-neutral-900 border-neutral-800' : 'bg-bordeaux-subtle/50 border-bordeaux/20'
            }`}>
              <GlassWater className="w-5 h-5 text-bordeaux shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-semibold text-bordeaux uppercase tracking-wider block">Accord au Dîner</span>
                <span className={`text-xs sm:text-sm mt-0.5 block ${isPresentationMode ? 'text-neutral-300' : 'text-charcoal'}`}>
                  {wine.pairing}
                </span>
              </div>
            </div>

            <div>
              <button
                onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
                className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors ${
                  isPresentationMode ? 'text-neutral-400 hover:text-white' : 'text-taupe hover:text-charcoal'
                }`}
              >
                <span>{showTechnicalDetails ? 'Masquer la fiche technique' : 'Voir les détails de terroir & service'}</span>
                <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${showTechnicalDetails ? 'rotate-90' : ''}`} />
              </button>

              {showTechnicalDetails && (
                <div className={`mt-3 p-4 rounded-xl border grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs animate-fade-in ${
                  isPresentationMode ? 'bg-neutral-900 border-neutral-800 text-neutral-300' : 'bg-cream-deep/30 border-beige text-charcoal'
                }`}>
                  <div>
                    <span className="text-taupe block text-[10px] uppercase tracking-wider">Terroir & Sol</span>
                    <span className="font-medium">{wine.soil}</span>
                  </div>
                  <div>
                    <span className="text-taupe block text-[10px] uppercase tracking-wider">Température</span>
                    <span className="font-medium">{wine.service.temperature}</span>
                  </div>
                  <div>
                    <span className="text-taupe block text-[10px] uppercase tracking-wider">Aération</span>
                    <span className="font-medium">{wine.service.decanting}</span>
                  </div>
                  <div>
                    <span className="text-taupe block text-[10px] uppercase tracking-wider">Garde</span>
                    <span className="font-medium">{wine.service.aging}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-beige/60 flex items-center justify-between">
              <button
                onClick={() => setActivePage('vote')}
                className="inline-flex items-center gap-2 text-xs font-semibold text-bordeaux hover:underline"
              >
                <Heart className="w-3.5 h-3.5" />
                <span>Voter pour cette cuvée comme Coup de Cœur</span>
              </button>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};

const VotePage = () => {
  const [votes, setVotes] = useState({
    'chablis-premier-cru': 12,
    'sonoma-coast': 16,
    'margaret-river': 9,
    'casablanca-valley': 7,
    'hemel-en-aarde': 14
  });

  const [hasVotedFor, setHasVotedFor] = useState(null);
  const [userComment, setUserComment] = useState('');
  const [showToast, setShowToast] = useState(false);

  const totalVotes = useMemo(() => {
    return Object.values(votes).reduce((a, b) => a + b, 0);
  }, [votes]);

  const handleVote = (wineId) => {
    if (hasVotedFor === wineId) return;

    setVotes(prev => {
      const next = { ...prev };
      if (hasVotedFor) {
        next[hasVotedFor] = Math.max(0, next[hasVotedFor] - 1);
      }
      next[wineId] = (next[wineId] || 0) + 1;
      return next;
    });

    setHasVotedFor(wineId);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16 animate-fade-in">
      
      {showToast && (
        <div className="fixed top-24 right-6 z-50 bg-bordeaux text-cream px-4 py-2.5 rounded-full shadow-lg text-xs font-medium flex items-center gap-2 animate-fade-in">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Votre vote a bien été comptabilisé pour la soirée !</span>
        </div>
      )}

      <div className="text-center space-y-3 mb-12">
        <span className="text-xs uppercase tracking-widest text-brass font-semibold">
          Verdict des Convives
        </span>
        <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-charcoal">
          Le Coup de Cœur de la Table
        </h1>
        <p className="text-sm sm:text-base text-taupe max-w-lg mx-auto">
          En fin de repas, chaque invité dépose son vote pour élire le Chardonnay le plus marquant du voyage.
        </p>
      </div>

      <div className="space-y-4">
        {WINES.map((wine) => {
          const count = votes[wine.id] || 0;
          const percentage = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
          const isSelected = hasVotedFor === wine.id;

          return (
            <div 
              key={wine.id}
              className={`p-5 rounded-2xl border transition-all duration-300 ${
                isSelected 
                  ? 'bg-bordeaux-subtle/70 border-bordeaux shadow-sm' 
                  : 'bg-cream border-beige hover:border-bordeaux/30'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">{wine.countryFlag}</span>
                  <div>
                    <h3 className="font-serif-display font-semibold text-lg text-charcoal">
                      {wine.name}
                    </h3>
                    <span className="text-xs text-taupe block">
                      {wine.domain} · {wine.vintage} · {wine.region}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 sm:space-x-6">
                  <div className="w-28 sm:w-36 text-right">
                    <div className="flex justify-between text-xs text-taupe mb-1">
                      <span>{count} votes</span>
                      <span className="font-mono font-semibold">{percentage}%</span>
                    </div>
                    <div className="h-2 w-full bg-beige/60 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-bordeaux rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => handleVote(wine.id)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-bordeaux text-cream'
                        : 'border border-beige hover:border-bordeaux text-charcoal bg-cream-deep/40'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isSelected ? 'fill-cream text-cream' : 'text-bordeaux'}`} />
                    <span>{isSelected ? 'Mon Choix' : 'Voter'}</span>
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 bg-cream-deep/50 border border-beige rounded-2xl p-6 space-y-4">
        <h3 className="font-serif-display text-xl text-charcoal font-semibold">
          Une remarque pour le Livre de Cave ?
        </h3>
        <p className="text-xs text-taupe">
          Partagez une émotion ou un accord qui vous a particulièrement marqué. Les hôtes conserveront les notes pour le prochain volet.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
            placeholder="ex. 'L'accord Chablis et huîtres reste inoubliable !'"
            className="flex-1 px-4 py-2.5 rounded-lg bg-cream border border-beige text-xs text-charcoal focus:outline-none focus:border-bordeaux"
          />
          <button
            onClick={() => {
              if (!userComment.trim()) return;
              setUserComment('');
              setShowToast(true);
              setTimeout(() => setShowToast(false), 2500);
            }}
            className="px-6 py-2.5 rounded-lg bg-bordeaux text-cream text-xs font-semibold uppercase tracking-wider hover:bg-bordeaux-deep"
          >
            Publier
          </button>
        </div>
      </div>

    </div>
  );
};

const OrganizerAdminModal = ({ isOpen, onClose, registeredGuests, maxCapacity }) => {
  if (!isOpen) return null;

  const totalGuests = registeredGuests.reduce((acc, g) => acc + (g.guestsCount || 1), 0);
  const totalBottles = registeredGuests.reduce((acc, g) => acc + (g.takeBottle ? (g.bottleCount || 1) : 0), 0);
  const totalRevenue = registeredGuests.reduce((acc, g) => acc + (g.totalPrice || 0), 0);

  const exportCSV = () => {
    const headers = "Nom,Email,Telephone,Convives,Regime,Bouteilles,Total_EUR\n";
    const rows = registeredGuests.map(g => 
      `"${g.firstName} ${g.lastName}","${g.email}","${g.phone}",${g.guestsCount || 1},"${g.dietary}",${g.takeBottle ? g.bottleCount : 0},${g.totalPrice}`
    ).join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `chez-vino-et-dodo-inscrits-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 bg-charcoal/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-cream border border-beige rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl">
        
        <div className="flex items-center justify-between pb-4 border-b border-beige">
          <div className="flex items-center space-x-2">
            <SlidersHorizontal className="w-5 h-5 text-bordeaux" />
            <h3 className="font-serif-display text-2xl text-charcoal font-semibold">
              Vue Hôtes · Vino & Dodo
            </h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full text-taupe hover:text-charcoal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6">
          <div className="p-4 rounded-xl bg-cream-deep/50 border border-beige">
            <span className="text-[10px] uppercase tracking-wider text-taupe font-semibold block">Convives</span>
            <span className="font-serif-display text-2xl text-charcoal font-bold">{totalGuests} / {maxCapacity}</span>
          </div>
          <div className="p-4 rounded-xl bg-cream-deep/50 border border-beige">
            <span className="text-[10px] uppercase tracking-wider text-taupe font-semibold block">Bouteilles à prévoir</span>
            <span className="font-serif-display text-2xl text-charcoal font-bold">{totalBottles}</span>
          </div>
          <div className="p-4 rounded-xl bg-cream-deep/50 border border-beige">
            <span className="text-[10px] uppercase tracking-wider text-taupe font-semibold block">Budget Collecté</span>
            <span className="font-serif-display text-2xl text-bordeaux font-bold">{totalRevenue} €</span>
          </div>
          <div className="p-4 rounded-xl bg-cream-deep/50 border border-beige">
            <span className="text-[10px] uppercase tracking-wider text-taupe font-semibold block">Destination</span>
            <span className="text-xs text-emerald-800 font-medium block mt-1">Google Sheets</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-brass font-semibold">
              Liste des Inscrits ({registeredGuests.length})
            </span>
            <button
              onClick={exportCSV}
              className="text-xs text-bordeaux hover:underline flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exporter en CSV</span>
            </button>
          </div>

          <div className="border border-beige rounded-xl overflow-hidden bg-cream">
            <table className="w-full text-left text-xs text-charcoal">
              <thead className="bg-cream-deep/60 border-b border-beige text-taupe font-semibold">
                <tr>
                  <th className="p-3">Invité</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Régime</th>
                  <th className="p-3 text-center">Bouteilles</th>
                  <th className="p-3 text-right">Montant</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-beige/60">
                {registeredGuests.map((g, idx) => (
                  <tr key={idx} className="hover:bg-cream-deep/30">
                    <td className="p-3 font-medium">
                      {g.firstName} {g.lastName}
                      {g.hasPlusOne && <span className="text-[10px] text-taupe block">+1 : {g.plusOneName || 'Invité'}</span>}
                    </td>
                    <td className="p-3 text-taupe">
                      <div>{g.email}</div>
                      <div className="text-[10px]">{g.phone}</div>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-cream-deep text-[10px] border border-beige">
                        {g.dietary}
                      </span>
                    </td>
                    <td className="p-3 text-center font-mono">
                      {g.takeBottle ? `${g.bottleCount}` : '0'}
                    </td>
                    <td className="p-3 text-right font-mono font-semibold">
                      {g.totalPrice} €
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-beige flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-charcoal text-cream text-xs font-semibold uppercase tracking-wider"
          >
            Fermer le panneau
          </button>
        </div>

      </div>
    </div>
  );
};

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('vinododo_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [activePage, setActivePage] = useState('home'); // 'home' | 'degustation' | 'vote' | 'inscription'
  const [activeWineIndex, setActiveWineIndex] = useState(0);
  const [showAdminModal, setShowAdminModal] = useState(false);

  const [registeredGuests, setRegisteredGuests] = useState([
    {
      firstName: "Maxime",
      lastName: "Dubois",
      email: "maxime.d@example.com",
      phone: "+32 471 22 33 44",
      hasPlusOne: true,
      plusOneName: "Camille",
      dietary: "aucun",
      takeBottle: true,
      bottleCount: 1,
      guestsCount: 2,
      totalPrice: 50
    },
    {
      firstName: "Sophie",
      lastName: "Lambert",
      email: "sophie.l@example.com",
      phone: "+32 478 99 88 77",
      hasPlusOne: false,
      plusOneName: "",
      dietary: "vegetarien",
      takeBottle: false,
      bottleCount: 0,
      guestsCount: 1,
      totalPrice: 20
    }
  ]);

  const totalRegisteredCount = useMemo(() => {
    return registeredGuests.reduce((sum, g) => sum + (g.guestsCount || 1), 0);
  }, [registeredGuests]);

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('vinododo_current_user', JSON.stringify(user));
    } catch (e) {
      console.warn("Storage warning:", e);
    }
    setActivePage('home');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('vinododo_current_user');
    } catch (e) {
      console.warn("Storage warning:", e);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  // If user is not yet logged in or registered, show the personalized welcome gate
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-cream selection:bg-bordeaux-subtle selection:text-bordeaux">
        <AppStyles />
        <InvitationGate
          onLoginSuccess={handleLoginSuccess}
          registeredCount={totalRegisteredCount}
          maxCapacity={EVENT_DATA.maxCapacity}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col justify-between selection:bg-bordeaux-subtle selection:text-bordeaux">
      <AppStyles />

      <div>
        <HeaderNav
          activePage={activePage}
          setActivePage={setActivePage}
          registeredCount={totalRegisteredCount}
          maxCapacity={EVENT_DATA.maxCapacity}
          currentUser={currentUser}
          onLogout={handleLogout}
        />

        <main>
          {activePage === 'home' && (
            <HomePage
              setActivePage={setActivePage}
              registeredCount={totalRegisteredCount}
              maxCapacity={EVENT_DATA.maxCapacity}
            />
          )}

          {activePage === 'degustation' && (
            <TastingPage
              activeWineIndex={activeWineIndex}
              setActiveWineIndex={setActiveWineIndex}
              setActivePage={setActivePage}
            />
          )}

          {activePage === 'vote' && (
            <VotePage />
          )}

          {activePage === 'inscription' && (
            <div className="max-w-xl mx-auto py-12 px-4">
              <div className="bg-cream border border-beige p-6 rounded-2xl text-center space-y-4">
                <Check className="w-10 h-10 text-emerald-700 mx-auto" />
                <h2 className="font-serif-display text-2xl text-charcoal">Votre accès est bien confirmé</h2>
                <p className="text-xs text-taupe">
                  Vous êtes déjà enregistré sous l'adresse <strong>{currentUser.email || currentUser.name}</strong>.
                </p>
                <div className="p-4 rounded-xl bg-cream-deep text-left text-xs space-y-2 border border-beige">
                  <div className="flex justify-between">
                    <span>Participation soirée :</span>
                    <strong>{EVENT_DATA.pricePerPerson} €</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Paiement :</span>
                    <span className="font-mono">{EVENT_DATA.paymentInfo.iban}</span>
                  </div>
                  <div className="text-[11px] text-taupe pt-1 border-t border-beige">
                    Communication : <code>{currentUser.firstName?.toUpperCase()} - CHARDONNAY 16/10</code>
                  </div>
                </div>
                <button
                  onClick={() => setActivePage('degustation')}
                  className="px-6 py-2.5 rounded-full bg-bordeaux text-cream text-xs font-semibold uppercase tracking-wider"
                >
                  Découvrir les 5 vins
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      <MobileBottomBar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <OrganizerAdminModal
        isOpen={showAdminModal}
        onClose={() => setShowAdminModal(false)}
        registeredGuests={registeredGuests}
        maxCapacity={EVENT_DATA.maxCapacity}
      />

      <footer className="border-t border-beige bg-cream-deep/40 py-12 px-4 sm:px-6 text-center text-xs text-taupe space-y-4">
        <div className="flex items-center justify-center space-x-2 text-charcoal font-serif-display text-base">
          <span>Chez Vino et Dodo</span>
          <span>·</span>
          <span className="italic font-normal">Dégustation {EVENT_DATA.year}</span>
        </div>
        
        <p className="max-w-md mx-auto leading-relaxed">
          Une initiative privée organisée avec passion à Ottignies-Louvain-la-Neuve.
          L'abus d'alcool est dangereux pour la santé, à consommer avec modération.
        </p>

        <div className="flex items-center justify-center space-x-6 text-taupe pt-2">
          <button onClick={() => setActivePage('home')} className="hover:text-charcoal">Accueil</button>
          <button onClick={() => setActivePage('degustation')} className="hover:text-charcoal">Les 5 Vins</button>
          <button onClick={() => setActivePage('vote')} className="hover:text-charcoal">Vote</button>
          <button 
            onClick={() => setShowAdminModal(true)}
            className="hover:text-bordeaux flex items-center gap-1 font-medium"
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span>Espace Organisateurs</span>
          </button>
        </div>
      </footer>

    </div>
  );
}
