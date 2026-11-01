const API_BASE = "https://saathi-backend-ykg5.onrender.com";
const HISTORY_KEY = "saathiSchoolQuizHistory";
const AUTH_TOKEN = localStorage.getItem("saathiToken");

let AUTH_USER = null;

try {
  AUTH_USER = JSON.parse(localStorage.getItem("saathiUser") || "null");
} catch {
  AUTH_USER = null;
}

if (!AUTH_TOKEN || AUTH_USER?.role !== "student") {
  window.location.replace("login.html");
}

const HINTS = {
  general: "Read the question carefully and recall the key idea from the lesson.",
  fractions: "Think about equal parts of a whole. Check the numerator and denominator.",
  multiplication: "Try using equal groups or repeated addition.",
  addition: "Combine the quantities carefully and check your calculation.",
  decimals: "Think about tenths and hundredths, and line up decimal places.",
  integers: "Picture the numbers on a number line. Pay attention to positive and negative signs.",
  "rational-numbers": "Think about whether the number can be written as a ratio of integers.",
  equations: "Remember that an equation stays balanced when you perform the same operation on both sides.",
  algebra: "Look for terms you can combine or a variable representing an unknown.",
  factorisation: "Look for factors whose product gives the expression.",
  squares: "Think about a number multiplied by itself.",
  "quadratic-equations": "Look carefully at the highest power of the variable.",
  shapes: "Count the straight sides of the shape.",
  angles: "Think about the amount of a turn represented by the angle.",
  perimeter: "Think about the distance all the way around a shape.",
  nutrition: "Connect the nutrient with what the body needs it to do.",
  vitamins: "Think about which foods provide different vitamins.",
  minerals: "Recall which minerals help the body build and maintain healthy structures.",
  photosynthesis: "Think about what plants need to make their own food.",
  force: "Think about how a push or pull can affect an object.",
  pressure: "Compare the same force acting over a small area and a large area.",
  friction: "Consider what happens when two surfaces move or try to move against each other.",
  speed: "Compare the distance travelled with the time taken.",
  acceleration: "Focus on how velocity changes over time.",
  motion: "Think about how an object's position changes over time.",
  cells: "Recall the basic unit that makes up living organisms.",
  "cell-parts": "Think about the different structures inside or around a cell.",
  reactions: "Separate the starting substances from the substances formed.",
  balancing: "Count each type of atom on both sides of the equation.",
  oxidation: "Think about the chemical process involved when iron rusts.",
  energy: "Consider whether energy is released or absorbed.",
  reflection: "Think about what happens when light meets a surface.",
  mirrors: "Recall the properties of an image formed by a plane mirror.",
  "light-sources": "Separate objects that produce light from objects that reflect it.",
  shadows: "Think about what happens when light is blocked.",
  maps: "Look for clues about symbols and features shown on maps.",
  directions: "Recall the main compass directions and their opposites.",
  scale: "Compare a distance on the map with the real distance it represents.",
  earth: "Separate Earth's rotation from its revolution around the Sun.",
  rotation: "Think about how long Earth takes to spin once on its axis.",
  "solar-system": "Recall the natural objects that move around planets.",
  resources: "Think about whether a resource can be naturally replaced.",
  conservation: "Choose the action that avoids wasting natural resources.",
  forests: "Think about the role forests play for wildlife and ecosystems.",
  history: "Think about the evidence historians use to understand the past.",
  "historical-sources": "Look for objects or records that can provide evidence about earlier times.",
  heritage: "Think about what communities pass down across generations.",
  constitution: "Recall the document that establishes the basic framework of government.",
  government: "Think about the roles different parts of a government perform.",
  rights: "Recall the document that establishes important rights and protections.",
  democracy: "Think about how people participate in choosing representatives.",
  elections: "Consider how citizens choose people to represent them.",
  nouns: "Identify the word that names a person, place, animal, or thing.",
  pronouns: "Look for a word that can stand in place of a noun.",
  plurals: "Check the spelling pattern for naming more than one item.",
  "proper-nouns": "Look for a specific name rather than a general name.",
  grammar: "Read the entire sentence and check how the words fit together.",
  "past-tense": "Think about the form of a verb used for an action that has already happened.",
  "present-tense": "Check the verb form and its agreement with the subject.",
  "continuous-tense": "Look at the helping verb and the form of the main verb.",
  "future-tense": "Look for the word that expresses an action yet to happen.",
  synonyms: "Look for a word with a similar meaning.",
  antonyms: "Look for a word with the opposite meaning.",
  "word-meaning": "Use the context and compare the choices with the meaning being described.",
  comprehension: "Use the information in the passage and focus on the detail being asked.",
  "main-idea": "Think about the central subject, not just a small detail.",
  "passive-voice": "In passive voice, the receiver of the action is placed in focus.",
  "active-voice": "Find who or what performs the action.",
  sangya: "संज्ञा किसी व्यक्ति, स्थान, वस्तु या भाव का नाम बताती है।",
  "सangya": "संज्ञा किसी व्यक्ति, स्थान, वस्तु या भाव का नाम बताती है।",
  sarvanam: "संज्ञा के स्थान पर आने वाले शब्द को पहचानें।",
  kriya: "ऐसे शब्द पर ध्यान दें जो किसी काम या स्थिति को बताता है।",
  paryayvachi: "मिलते-जुलते अर्थ वाले शब्द के बारे में सोचें।",
  vilom: "दिए गए शब्द के विपरीत अर्थ के बारे में सोचें।",
  visheshan: "वह शब्द खोजें जो किसी की विशेषता बताता है।",
  namavachakam: "వ్యక్తి, ప్రదేశం, వస్తువు లేదా భావం పేరును తెలిపే పదాన్ని గుర్తించండి.",
  sarvanamam: "నామవాచకానికి బదులుగా ఉపయోగించే పదాన్ని గుర్తించండి.",
  paryayapadalu: "దగ్గర అర్థం ఉన్న పదాన్ని గుర్తించండి.",
  vyatireka: "వ్యతిరేక అర్థం ఉన్న పదాన్ని ఆలోచించండి.",
  visheshanam: "గుణాన్ని తెలిపే పదంపై దృష్టి పెట్టండి.",
  vyakaranam: "వాక్యాన్ని పూర్తిగా చదివి పదాల ఉపయోగాన్ని పరిశీలించండి."
};

function getHint(question, tag = "general") {
  if (/[\u0900-\u097F]/.test(question)) {
    return HINTS[tag] ||
      "वाक्य को ध्यान से पढ़ें और पाठ में सीखे गए नियम का उपयोग करें।";
  }

  if (/[\u0C00-\u0C7F]/.test(question)) {
    return HINTS[tag] ||
      "ప్రశ్నను జాగ్రత్తగా చదివి పాఠంలో నేర్చుకున్న భావాన్ని గుర్తు చేసుకోండి.";
  }

  return HINTS[tag] || HINTS.general;
}

function Q(question, options, answer, explanation, tag = "general") {
  return {
    question,
    options,
    answer,
    explanation,
    tag,
    hint: getHint(question, tag)
  };
}

function T(name, icon, lesson, example, questions) {
  return { name, icon, lesson, example, questions };
}

// ==================================================
// LEARNING CONTENT
// ==================================================

const content = {
  // ---------------- MATHEMATICS ----------------

  fractions: T("Fractions", "➗",
    "A fraction represents a part of a whole. The numerator is the top number and the denominator is the bottom number.",
    "1/2 + 1/2 = 1. Two halves make one whole.",
    [
      Q("What is 1/2 + 1/2?", ["1/4", "1", "1/2", "2"], 1, "Two halves make one whole.", "fractions"),
      Q("What is the numerator in 3/5?", ["3", "5", "8", "2"], 0, "The numerator is the top number.", "fractions"),
      Q("What is 1/4 + 2/4?", ["3/4", "3/8", "2/4", "1/2"], 0, "Add the numerators and keep the denominator.", "fractions"),
      Q("Which fraction equals 1/2?", ["1/3", "3/4", "2/4", "2/3"], 2, "2/4 simplifies to 1/2.", "fractions"),
      Q("What is half of 12?", ["4", "6", "8", "10"], 1, "12 divided by 2 is 6.", "multiplication")
    ]),

  decimals: T("Decimals", "🔢",
    "Decimals represent parts of a whole using a decimal point.",
    "0.5 + 0.5 = 1.0.",
    [
      Q("What is 0.5 + 0.5?", ["0.10", "1.0", "0.5", "1.5"], 1, "Five tenths plus five tenths equals one.", "decimals"),
      Q("Which number is greatest?", ["0.25", "0.5", "0.35", "0.15"], 1, "0.50 is the greatest.", "decimals"),
      Q("What is 2.5 + 1.2?", ["3.7", "3.2", "4.7", "2.7"], 0, "2.5 + 1.2 = 3.7.", "addition"),
      Q("What is 1 - 0.25?", ["0.25", "0.50", "0.75", "1.25"], 2, "1.00 - 0.25 = 0.75.", "decimals"),
      Q("What is 0.2 × 10?", ["0.02", "2", "20", "0.2"], 1, "0.2 multiplied by 10 equals 2.", "multiplication")
    ]),

  integers: T("Integers", "🔢",
    "Integers include negative whole numbers, zero, and positive whole numbers.",
    "-3 + 5 = 2.",
    [
      Q("What is -3 + 5?", ["-8", "-2", "2", "8"], 2, "Moving five steps right from -3 gives 2.", "integers"),
      Q("What is -4 - 2?", ["-6", "-2", "6", "2"], 0, "Subtracting 2 from -4 gives -6.", "integers"),
      Q("Which number is greatest?", ["-7", "-2", "-9", "-10"], 1, "-2 is closest to zero.", "integers"),
      Q("What is -2 × 3?", ["6", "-6", "5", "-5"], 1, "A negative multiplied by a positive is negative.", "multiplication"),
      Q("What is the additive inverse of 8?", ["8", "0", "1", "-8"], 3, "8 + (-8) = 0.", "integers")
    ]),

  rational: T("Rational Numbers", "➗",
    "A rational number can be written as p/q, where p and q are integers and q is not zero.",
    "1/2 and -3/4 are rational numbers.",
    [
      Q("Which is a rational number?", ["√2", "π", "3/4", "√3"], 2, "3/4 is a ratio of two integers.", "rational-numbers"),
      Q("What is the reciprocal of 3/4?", ["3/4", "4/3", "7/4", "1/3"], 1, "Swap the numerator and denominator.", "fractions"),
      Q("What is 0.25 as a fraction?", ["1/2", "1/3", "1/4", "2/5"], 2, "0.25 = 25/100 = 1/4.", "decimals"),
      Q("What is 1/2 + 1/2?", ["1", "1/4", "2", "1/2"], 0, "One half plus one half equals one.", "fractions"),
      Q("Which is greater?", ["-3/4", "-1/2", "They are equal", "Cannot compare"], 1, "-1/2 is closer to zero.", "rational-numbers")
    ]),

  algebra: T("Algebra", "📐",
    "Algebra uses letters to represent unknown numbers. Equations help us find those values.",
    "If x + 3 = 7, then x = 4.",
    [
      Q("If x + 3 = 7, what is x?", ["3", "4", "5", "10"], 1, "Subtract 3 from both sides.", "equations"),
      Q("If y = 4, what is 2y?", ["2", "4", "6", "8"], 3, "2 × 4 = 8.", "multiplication"),
      Q("Simplify 3x + 2x.", ["5", "5x", "6x", "x"], 1, "Add like terms: 3x + 2x = 5x.", "algebra"),
      Q("If x - 5 = 2, what is x?", ["3", "5", "7", "10"], 2, "Add 5 to both sides.", "equations"),
      Q("Which is an algebraic expression?", ["5 + 3", "x + 4", "8 × 2", "9 - 1"], 1, "x + 4 contains a variable.", "algebra")
    ]),

  geometry: T("Geometry", "📐",
    "Geometry studies shapes, lines, angles, and their properties.",
    "The angles inside a triangle add up to 180 degrees.",
    [
      Q("How many sides does a triangle have?", ["2", "3", "4", "5"], 1, "A triangle has three sides.", "shapes"),
      Q("What is a right angle?", ["45°", "60°", "90°", "180°"], 2, "A right angle measures 90 degrees.", "angles"),
      Q("How many degrees are in a straight angle?", ["90°", "120°", "180°", "360°"], 2, "A straight angle measures 180 degrees.", "angles"),
      Q("What is the perimeter of a square with side 4 cm?", ["8 cm", "12 cm", "16 cm", "20 cm"], 2, "Perimeter = 4 × side = 16 cm.", "perimeter"),
      Q("How many sides does a hexagon have?", ["5", "6", "7", "8"], 1, "A hexagon has six sides.", "shapes")
    ]),

  quadratic: T("Quadratic Equations", "📈",
    "A quadratic equation has the highest power of its variable equal to 2.",
    "x² - 5x + 6 = 0 has roots 2 and 3.",
    [
      Q("What is the degree of a quadratic equation?", ["1", "2", "3", "4"], 1, "A quadratic equation has degree 2.", "quadratic-equations"),
      Q("Which is a quadratic equation?", ["x + 2 = 0", "x³ + 1 = 0", "x² + 3x + 2 = 0", "2x = 8"], 2, "The highest power of x is 2.", "quadratic-equations"),
      Q("What are the roots of x² - 5x + 6 = 0?", ["1 and 6", "2 and 3", "-2 and -3", "0 and 6"], 1, "(x - 2)(x - 3) = 0.", "factorisation"),
      Q("What is the discriminant?", ["b² - 4ac", "b² + 4ac", "a² - bc", "2a + b"], 0, "The discriminant is b² - 4ac.", "quadratic-equations"),
      Q("What are the roots of x² = 9?", ["Only 3", "Only -3", "0 and 9", "3 and -3"], 3, "Both 3 and -3 have square 9.", "squares")
    ]),

  // ---------------- SCIENCE ----------------

  food: T("Components of Food", "🥗",
    "Food gives us energy and helps us grow. Nutrients include carbohydrates, proteins, fats, vitamins, and minerals.",
    "Carbohydrates provide energy. Proteins help the body grow and repair itself.",
    [
      Q("Which nutrient helps growth and repair?", ["Fats", "Proteins", "Water", "Carbohydrates"], 1, "Proteins help the body grow and repair tissues.", "nutrition"),
      Q("Which food is a source of vitamin C?", ["Rice", "Butter", "Orange", "Salt"], 2, "Oranges contain vitamin C.", "vitamins"),
      Q("Which nutrient is a major energy source?", ["Carbohydrates", "Vitamins", "Minerals", "Water"], 0, "Carbohydrates provide energy.", "nutrition"),
      Q("What is a balanced diet?", ["Only fruits", "Only rice", "Only milk", "A suitable mix of needed nutrients"], 3, "A balanced diet provides essential nutrients.", "nutrition"),
      Q("Which mineral helps build strong bones?", ["Iron", "Calcium", "Sodium", "Iodine"], 1, "Calcium is important for bones and teeth.", "minerals")
    ]),

  plants: T("Plants and Photosynthesis", "🌱",
    "Green plants make food through photosynthesis using sunlight, water, and carbon dioxide.",
    "Roots absorb water, while leaves capture sunlight.",
    [
      Q("What is the process by which plants make food?", ["Digestion", "Respiration", "Photosynthesis", "Evaporation"], 2, "Plants make food through photosynthesis.", "photosynthesis"),
      Q("Which pigment captures light?", ["Chlorophyll", "Haemoglobin", "Melanin", "Keratin"], 0, "Chlorophyll absorbs light.", "photosynthesis"),
      Q("Which gas do plants use during photosynthesis?", ["Oxygen", "Carbon dioxide", "Hydrogen", "Nitrogen"], 1, "Plants use carbon dioxide to make food.", "photosynthesis"),
      Q("Which part mainly absorbs water?", ["Flower", "Fruit", "Leaf", "Roots"], 3, "Roots absorb water from the soil.", "plant-parts"),
      Q("Which gas is released during photosynthesis?", ["Oxygen", "Nitrogen", "Methane", "Hydrogen"], 0, "Oxygen is released during photosynthesis.", "photosynthesis")
    ]),

  force: T("Force and Pressure", "🚀",
    "Force is a push or pull. Pressure describes how much force acts on a given area.",
    "A sharp pin has a small tip, so the same force creates greater pressure.",
    [
      Q("What is force?", ["A colour", "A temperature", "A push or pull", "A sound"], 2, "A force is a push or pull.", "force"),
      Q("How is pressure calculated?", ["Area ÷ force", "Force ÷ area", "Force × time", "Mass ÷ volume"], 1, "Pressure equals force divided by area.", "pressure"),
      Q("What is the SI unit of pressure?", ["Pascal", "Metre", "Newton", "Joule"], 0, "Pressure is measured in pascals.", "pressure"),
      Q("Friction generally opposes what?", ["Light", "Sound", "Mass", "Relative motion"], 3, "Friction opposes relative motion.", "friction"),
      Q("How can pressure be reduced for the same force?", ["Decrease area", "Increase area", "Increase force", "Remove the object"], 1, "Increasing area reduces pressure.", "pressure")
    ]),

  motion: T("Motion", "🏃",
    "Motion is a change in an object's position over time. Speed is distance travelled per unit of time.",
    "Speed = distance ÷ time. Travelling 100 metres in 20 seconds gives 5 m/s.",
    [
      Q("How is speed calculated?", ["Distance ÷ time", "Time ÷ distance", "Distance × time", "Distance + time"], 0, "Speed equals distance divided by time.", "speed"),
      Q("What is the SI unit of speed?", ["Kilogram", "Metre per second", "Newton", "Second"], 1, "Speed is measured in metres per second.", "speed"),
      Q("What is the speed for 100 m in 20 s?", ["2 m/s", "4 m/s", "5 m/s", "10 m/s"], 2, "100 divided by 20 equals 5.", "speed"),
      Q("What is acceleration?", ["Total distance", "Time taken", "Object's mass", "Rate of change of velocity"], 3, "Acceleration is the rate of change of velocity.", "acceleration"),
      Q("Uniform motion covers:", ["Equal distances in equal time intervals", "Different distances in equal intervals", "No distance", "Only curved paths"], 0, "Uniform motion covers equal distances in equal time intervals.", "motion")
    ]),

  cells: T("Cells", "🔬",
    "A cell is the basic structural and functional unit of living organisms.",
    "The nucleus contains genetic material and helps control cell activities.",
    [
      Q("What is the basic unit of life?", ["Organ", "Cell", "Tissue", "Bone"], 1, "The cell is the basic unit of life.", "cells"),
      Q("Which part controls many cell activities?", ["Nucleus", "Cell wall", "Vacuole", "Cytoplasm only"], 0, "The nucleus contains genetic material.", "cell-parts"),
      Q("Which structure surrounds an animal cell?", ["Chlorophyll", "Root", "Cell membrane", "Flower"], 2, "The cell membrane surrounds the cell.", "cell-parts"),
      Q("Which structure is present in plant cells but not animal cells?", ["Nucleus", "Cytoplasm", "Cell membrane", "Cell wall"], 3, "Plant cells have a cell wall.", "cell-parts"),
      Q("An organism made of one cell is called:", ["Unicellular", "Multicellular", "Non-living", "A tissue"], 0, "Unicellular organisms consist of one cell.", "cells")
    ]),

  chemical: T("Chemical Reactions", "🧪",
    "A chemical reaction changes substances into new substances. Starting substances are reactants and substances formed are products.",
    "Rusting of iron is a chemical change involving iron, oxygen, and moisture.",
    [
      Q("What are starting substances called?", ["Reactants", "Products", "Mixtures", "Solutions"], 0, "Reactants are present at the start.", "reactions"),
      Q("Why balance a chemical equation?", ["To remove atoms", "To create atoms", "To keep each type of atom equal on both sides", "To increase mass"], 2, "Atoms are conserved in a chemical reaction.", "balancing"),
      Q("Rusting of iron is an example of:", ["Freezing", "Oxidation", "Melting", "Boiling"], 1, "Rusting involves oxidation.", "oxidation"),
      Q("An exothermic reaction generally:", ["Absorbs heat", "Stops motion", "Creates matter", "Releases energy"], 3, "Exothermic reactions release energy.", "energy"),
      Q("What are products?", ["Starting substances", "Substances formed in a reaction", "Measuring tools", "Forces"], 1, "Products are substances formed.", "reactions")
    ]),

  light: T("Light", "💡",
    "Light allows us to see objects. Reflection occurs when light bounces off a surface.",
    "A plane mirror forms an upright image.",
    [
      Q("What is reflection?", ["Bending of sound", "Absorption of all light", "Bouncing of light from a surface", "Production of heat"], 2, "Reflection is the bouncing back of light.", "reflection"),
      Q("Which surface is a good reflector?", ["Rough cloth", "Polished mirror", "Paper tissue", "Soil"], 1, "A polished mirror reflects light well.", "reflection"),
      Q("What kind of image does a plane mirror form?", ["Always vertically inverted", "Always smaller", "Always larger", "Upright and virtual"], 3, "A plane mirror forms an upright virtual image.", "mirrors"),
      Q("Which object emits its own light?", ["The Sun", "The Moon", "A mirror", "A book"], 0, "The Sun produces its own light.", "light-sources"),
      Q("A shadow forms when an object:", ["Creates water", "Blocks light", "Makes sound", "Changes its mass"], 1, "An opaque object blocks light.", "shadows")
    ]),

  // ---------------- SOCIAL STUDIES ----------------

  maps: T("Maps and Directions", "🗺️",
    "A map represents a place on a flat surface. Maps use symbols, directions, and scales.",
    "A map key explains the symbols used on a map.",
    [
      Q("What does a map key explain?", ["Weather", "Map symbols", "Population only", "Time"], 1, "A map key explains the symbols.", "maps"),
      Q("Which direction is opposite to north?", ["East", "West", "South", "North-east"], 2, "South is opposite to north.", "directions"),
      Q("What does a map scale show?", ["Map distance compared with real distance", "Map colour", "Date only", "Temperature"], 0, "A scale compares map distance with real distance.", "scale"),
      Q("Which tool helps identify directions?", ["Thermometer", "Clock", "Ruler", "Compass"], 3, "A compass helps identify directions.", "directions"),
      Q("Which map shows mountains and rivers?", ["Timetable", "Physical map", "Population list", "Calendar"], 1, "A physical map shows natural features.", "maps")
    ]),

  earth: T("Earth and Its Movements", "🌍",
    "Earth rotates on its axis and revolves around the Sun.",
    "Earth's rotation causes day and night.",
    [
      Q("What causes day and night?", ["Earth's rotation", "Clouds", "Moon's colour", "Rain"], 0, "Earth's rotation causes day and night.", "earth"),
      Q("What does Earth revolve around?", ["The Moon", "The Sun", "Mars", "Jupiter"], 1, "Earth revolves around the Sun.", "earth"),
      Q("How long does Earth take to rotate once?", ["One month", "One year", "One day", "One week"], 2, "One rotation takes about 24 hours.", "rotation"),
      Q("What is Earth's natural satellite?", ["Mars", "Venus", "The Sun", "The Moon"], 3, "The Moon is Earth's natural satellite.", "solar-system"),
      Q("Which model represents Earth?", ["Globe", "Thermometer", "Clock", "Compass"], 0, "A globe is a model of Earth.", "earth")
    ]),

  resources: T("Natural Resources", "🌳",
    "Natural resources come from nature. They include water, air, soil, sunlight, forests, and minerals.",
    "Saving water, planting trees, and recycling help conserve resources.",
    [
      Q("Which is a renewable resource?", ["Coal", "Petroleum", "Sunlight", "Natural gas"], 2, "Sunlight is renewable.", "resources"),
      Q("Which resource is needed for breathing?", ["Plastic", "Air", "Iron", "Coal"], 1, "Humans need oxygen from air.", "resources"),
      Q("Which action conserves water?", ["Leaving taps open", "Ignoring leaks", "Wasting water", "Fixing leaking taps"], 3, "Fixing leaks prevents water waste.", "conservation"),
      Q("Which is a fossil fuel?", ["Coal", "Sunlight", "Wind", "Flowing water"], 0, "Coal is a fossil fuel.", "resources"),
      Q("Why protect forests?", ["Only for decoration", "They support wildlife and ecosystems", "They stop all rain", "They have no value"], 1, "Forests support wildlife and ecosystems.", "forests")
    ]),

  history: T("History and Heritage", "🏛️",
    "History studies people, events, and societies of the past. Historians use records, objects, and monuments as evidence.",
    "An old coin or inscription can help us learn about the past.",
    [
      Q("What does history study?", ["Only future events", "Weather only", "People and events of the past", "Only mathematics"], 2, "History studies the past.", "history"),
      Q("Which can be a historical source?", ["New plastic bag", "Old inscription", "Blank page", "Modern calculator"], 1, "Inscriptions provide evidence about the past.", "historical-sources"),
      Q("Who studies historical evidence?", ["Historians", "Chefs only", "Pilots only", "Singers only"], 0, "Historians study evidence from the past.", "history"),
      Q("What is heritage?", ["Only new buildings", "Only money", "Weather", "Things passed down from earlier generations"], 3, "Heritage is passed down through generations.", "heritage"),
      Q("Why preserve historical monuments?", ["To erase history", "To protect cultural and historical heritage", "To prevent learning", "To change the past"], 1, "Preservation protects historical heritage.", "heritage")
    ]),

  civics: T("The Constitution", "⚖️",
    "A constitution establishes the basic rules for governing a country and defines rights and government responsibilities.",
    "India's Constitution came into effect on 26 January 1950.",
    [
      Q("When did India's Constitution come into effect?", ["15 August 1947", "26 January 1950", "2 October 1948", "26 November 1949"], 1, "It came into effect on 26 January 1950.", "constitution"),
      Q("What does a constitution establish?", ["Rules of governance", "Daily weather", "Lunch menus", "Sports scores"], 0, "It lays out the basic framework of government.", "constitution"),
      Q("India is a:", ["Monarchy", "Colonial empire", "Democratic republic", "Private kingdom"], 2, "India is a democratic republic.", "government"),
      Q("Which document establishes constitutional rights?", ["Shopping list", "Timetable", "Map key", "The Constitution"], 3, "The Constitution establishes important rights and protections.", "rights"),
      Q("In a democracy, political authority ultimately comes from:", ["The people", "One company", "A foreign ruler", "One family"], 0, "Democratic authority comes from the people.", "democracy")
    ]),

  democracy: T("Democracy", "🏛️",
    "Democracy is a system in which people participate in choosing their representatives.",
    "Citizens vote in elections to choose their representatives.",
    [
      Q("What is a key feature of democracy?", ["No laws", "People choose representatives", "No public voice", "Permanent unelected rule"], 1, "People participate in choosing representatives.", "democracy"),
      Q("What are elections used for?", ["Measuring rainfall", "Drawing maps", "Choosing representatives", "Making food"], 2, "Elections allow people to choose representatives.", "elections"),
      Q("Who may vote in Indian general elections if eligible?", ["Any visitor", "Only teachers", "Only government employees", "Eligible citizens aged 18 or above"], 3, "Eligible Indian citizens can vote from age 18.", "elections"),
      Q("What does a legislature do?", ["Makes laws", "Predicts earthquakes", "Grows crops", "Prints every book"], 0, "Legislatures make laws.", "government"),
      Q("Why is voting important?", ["It removes all duties", "It lets citizens participate in choosing leaders", "It ends every disagreement", "It replaces courts"], 1, "Voting lets citizens participate in democracy.", "elections")
    ]),

  // ---------------- ENGLISH ----------------

  nouns: T("Nouns and Pronouns", "📚",
    "A noun names a person, place, animal, or thing. A pronoun is used instead of a noun.",
    "Ravi is a boy. He is kind. Ravi is a noun and he is a pronoun.",
    [
      Q("Find the noun: 'The cat sleeps.'", ["The", "Cat", "Sleeps", "None"], 1, "Cat names an animal.", "nouns"),
      Q("Which word is a pronoun?", ["School", "Table", "She", "Book"], 2, "She is a pronoun.", "pronouns"),
      Q("What is the plural of book?", ["Books", "Bookes", "Bookies", "Book"], 0, "The plural is books.", "plurals"),
      Q("Which is a proper noun?", ["City", "Girl", "River", "India"], 3, "India is a specific country.", "proper-nouns"),
      Q("Choose the correct sentence.", ["He are happy.", "He is happy.", "He am happy.", "He be happy."], 1, "He is happy is grammatically correct.", "grammar")
    ]),

  tenses: T("Tenses", "✍️",
    "Tenses show when an action happens: in the past, present, or future.",
    "Past: played. Present: play. Future: will play.",
    [
      Q("What is the past tense of eat?", ["Ate", "Eats", "Eating", "Eat"], 0, "The simple past tense is ate.", "past-tense"),
      Q("Choose the correct sentence.", ["She go to school.", "She going to school.", "She goes to school.", "She gone to school."], 2, "She goes to school is correct.", "present-tense"),
      Q("'They are playing' is in which tense?", ["Simple past", "Present continuous", "Simple future", "Past perfect"], 1, "Are playing is present continuous.", "continuous-tense"),
      Q("Complete: 'I ___ help tomorrow.'", ["Did", "Am", "Was", "Will"], 3, "Will help expresses a future action.", "future-tense"),
      Q("Choose the correct sentence.", ["He have a book.", "He has a book.", "He having a book.", "He haves a book."], 1, "He has a book is correct.", "grammar")
    ]),

  vocabulary: T("Vocabulary", "📝",
    "Vocabulary means the words we know and use. Synonyms have similar meanings, while antonyms have opposite meanings.",
    "Happy and joyful are synonyms. Hot and cold are antonyms.",
    [
      Q("What is a synonym of happy?", ["Sad", "Joyful", "Angry", "Tired"], 1, "Joyful means happy.", "synonyms"),
      Q("What is the opposite of ancient?", ["Old", "Historic", "Modern", "Past"], 2, "Modern is the opposite of ancient.", "antonyms"),
      Q("What does enormous mean?", ["Tiny", "Very large", "Very quiet", "Very quick"], 1, "Enormous means extremely large.", "word-meaning"),
      Q("Choose a synonym for begin.", ["Start", "Finish", "Stop", "Close"], 0, "Start and begin have similar meanings.", "synonyms"),
      Q("What is the opposite of generous?", ["Kind", "Helpful", "Selfish", "Friendly"], 2, "Selfish is the opposite of generous.", "antonyms")
    ]),

  comprehension: T("Reading Comprehension", "📖",
    "Reading comprehension means understanding a passage and answering questions using information from it.",
    "Read a passage carefully and look for the information needed to answer.",
    [
      Q("What is reading comprehension?", ["Copying every word", "Understanding a passage", "Counting letters only", "Writing numbers"], 1, "Comprehension checks understanding of a text.", "comprehension"),
      Q("Passage: Ravi walks to school. How does Ravi travel?", ["By plane", "By boat", "On foot", "By train"], 2, "The passage says Ravi walks.", "comprehension"),
      Q("Where should you look for an answer about a passage?", ["In the passage", "Only in the title", "In a random book", "Nowhere"], 0, "Use information from the passage.", "comprehension"),
      Q("What does a title usually help identify?", ["Author's age", "Number of pages", "Font size", "Main topic"], 3, "A title often indicates the main topic.", "main-idea"),
      Q("If rain stopped a match, why did it stop?", ["Players were tired", "Because it rained", "It was night", "The ball was lost"], 1, "The given information says rain stopped the match.", "comprehension")
    ]),

  voice: T("Active and Passive Voice", "✍️",
    "In active voice, the subject performs the action. In passive voice, the subject receives the action.",
    "Active: Ram writes a letter. Passive: A letter is written by Ram.",
    [
      Q("Choose the passive form of 'Ram writes a letter.'", ["A letter writes Ram.", "Ram is written by a letter.", "A letter is written by Ram.", "A letter was writing Ram."], 2, "The object becomes the subject in passive voice.", "passive-voice"),
      Q("In active voice, who usually performs the action?", ["The subject", "The object only", "The punctuation mark", "The adjective"], 0, "The subject performs the action.", "active-voice"),
      Q("Choose the passive form of 'She cleaned the room.'", ["She was cleaned by the room.", "The room cleaned her.", "The room is cleaning.", "The room was cleaned by her."], 3, "The room receives the action.", "passive-voice"),
      Q("Which sentence is active voice?", ["The cake was baked by Ana.", "Ana baked the cake.", "The cake is being baked.", "The work was done."], 1, "Ana performs the action.", "active-voice"),
      Q("Passive voice commonly uses:", ["Only adjectives", "Only nouns", "Be + past participle", "Only prepositions"], 2, "Passive forms commonly use be and a past participle.", "passive-voice")
    ]),

  // ---------------- HINDI ----------------

  hindiNoun: T("संज्ञा", "📚",
    "संज्ञा किसी व्यक्ति, स्थान, वस्तु या भाव के नाम को कहते हैं।",
    "राम, दिल्ली, पुस्तक और खुशी संज्ञा के उदाहरण हैं।",
    [
      Q("संज्ञा किसे कहते हैं?", ["काम के नाम को", "व्यक्ति, स्थान, वस्तु या भाव के नाम को", "गुण बताने वाले शब्द को", "जोड़ने वाले शब्द को"], 1, "संज्ञा नाम बताने वाला शब्द है।", "संगya"),
      Q("'राम विद्यालय जाता है' में संज्ञा कौन है?", ["जाता", "है", "राम", "में"], 2, "राम व्यक्ति का नाम है।", "sangya"),
      Q("कौन-सा शब्द किसी स्थान का नाम है?", ["खेलना", "सुंदर", "जल्दी", "दिल्ली"], 3, "दिल्ली एक स्थान का नाम है।", "sangya"),
      Q("'पुस्तक' किसका नाम है?", ["वस्तु", "क्रिया", "गुण", "सर्वनाम"], 0, "पुस्तक एक वस्तु का नाम है।", "sangya"),
      Q("कौन-सा शब्द भाववाचक संज्ञा है?", ["किताब", "ईमानदारी", "मोहन", "शहर"], 1, "ईमानदारी एक भाव या गुण का नाम है।", "sangya")
    ]),

  hindiPronoun: T("सर्वनाम", "📝",
    "संज्ञा के स्थान पर प्रयोग होने वाले शब्द सर्वनाम कहलाते हैं।",
    "राम पढ़ता है। वह मेहनती है। यहाँ 'वह' सर्वनाम है।",
    [
      Q("सर्वनाम किसके स्थान पर आता है?", ["क्रिया", "विशेषण", "संज्ञा", "विराम चिह्न"], 2, "सर्वनाम संज्ञा के स्थान पर आता है।", "sarvanam"),
      Q("कौन-सा शब्द सर्वनाम है?", ["सुंदर", "वह", "दौड़ना", "किताब"], 1, "वह एक सर्वनाम है।", "sarvanam"),
      Q("'मैं विद्यालय जाता हूँ' में सर्वनाम कौन है?", ["विद्यालय", "जाता", "हूँ", "मैं"], 3, "मैं बोलने वाले के लिए प्रयोग हुआ है।", "sarvanam"),
      Q("कौन-सा शब्द व्यक्ति की ओर संकेत कर सकता है?", ["वे", "पेड़", "लाल", "खेल"], 0, "वे एक सर्वनाम है।", "sarvanam"),
      Q("रिक्त स्थान भरें: ___ मेरी मित्र है।", ["खेल", "वह", "सुंदर", "दौड़"], 1, "वह मेरी मित्र है।", "sarvanam")
    ]),

  hindiVerb: T("क्रिया", "✍️",
    "जिस शब्द से किसी काम के करने या होने का पता चलता है, उसे क्रिया कहते हैं।",
    "खाना, पढ़ना और दौड़ना क्रिया के उदाहरण हैं।",
    [
      Q("क्रिया क्या बताती है?", ["स्थान का नाम", "काम या होने की स्थिति", "व्यक्ति का नाम", "रंग का नाम"], 1, "क्रिया काम या स्थिति बताती है।", "kriya"),
      Q("कौन-सा शब्द क्रिया है?", ["किताब", "सुंदर", "दौड़ना", "नीला"], 2, "दौड़ना एक काम बताता है।", "kriya"),
      Q("'सीमा गाना गाती है' में क्रिया कौन है?", ["सीमा", "गाना गाती है", "में", "कोई नहीं"], 1, "गाना गाती है काम को बताता है।", "kriya"),
      Q("रिक्त स्थान भरें: बच्चे मैदान में ___ हैं।", ["मीठा", "लाल", "किताब", "खेल रहे"], 3, "खेल रहे हैं क्रिया है।", "kriya"),
      Q("कौन-सा शब्द काम बताता है?", ["पढ़ना", "घर", "मेज़", "हरा"], 0, "पढ़ना एक काम है।", "kriya")
    ]),

  hindiSynonym: T("पर्यायवाची शब्द", "📖",
    "जिन शब्दों के अर्थ समान या मिलते-जुलते होते हैं, उन्हें पर्यायवाची शब्द कहते हैं।",
    "सूर्य के पर्यायवाची शब्दों में रवि और सूरज शामिल हैं।",
    [
      Q("'सूर्य' का पर्यायवाची क्या है?", ["रात", "रवि", "जल", "धरती"], 1, "रवि सूर्य का पर्यायवाची है।", "paryayvachi"),
      Q("'जल' का समान अर्थ वाला शब्द कौन-सा है?", ["आकाश", "अग्नि", "पानी", "वायु"], 2, "जल और पानी के अर्थ समान हैं।", "paryayvachi"),
      Q("'पृथ्वी' का पर्यायवाची कौन-सा है?", ["धरती", "बादल", "तारा", "पर्वत"], 0, "धरती पृथ्वी का पर्यायवाची है।", "paryayvachi"),
      Q("'वन' का समान अर्थ वाला शब्द कौन-सा है?", ["नगर", "घर", "विद्यालय", "जंगल"], 3, "वन और जंगल के अर्थ समान हैं।", "paryayvachi"),
      Q("'मित्र' का पर्यायवाची कौन-सा है?", ["शत्रु", "दोस्त", "पथ", "वर्षा"], 1, "मित्र और दोस्त के अर्थ समान हैं।", "paryayvachi")
    ]),

  hindiAntonym: T("विलोम शब्द", "📝",
    "जिन शब्दों के अर्थ एक-दूसरे के विपरीत होते हैं, उन्हें विलोम शब्द कहते हैं।",
    "दिन का विलोम रात है।",
    [
      Q("'दिन' का विलोम क्या है?", ["सुबह", "शाम", "रात", "प्रकाश"], 2, "दिन का विलोम रात है।", "vilom"),
      Q("'अच्छा' का विलोम क्या है?", ["बुरा", "सुंदर", "साफ", "सही"], 0, "अच्छा का विलोम बुरा है।", "vilom"),
      Q("'ऊपर' का विलोम क्या है?", ["आगे", "पास", "दूर", "नीचे"], 3, "ऊपर का विलोम नीचे है।", "vilom"),
      Q("'सुख' का विलोम क्या है?", ["हँसी", "दुख", "आनंद", "प्रेम"], 1, "सुख का विलोम दुख है।", "vilom"),
      Q("'नया' का विलोम क्या है?", ["पुराना", "ताज़ा", "आधुनिक", "सुंदर"], 0, "नया का विलोम पुराना है।", "vilom")
    ]),

  hindiGrammar: T("हिंदी व्याकरण", "📘",
    "व्याकरण भाषा को सही ढंग से बोलने और लिखने के नियम सिखाता है।",
    "सही वाक्य: बच्चे विद्यालय जाते हैं।",
    [
      Q("व्याकरण किसमें सहायता करता है?", ["सही भाषा प्रयोग में", "गणना में ही", "चित्र बनाने में ही", "खेलने में ही"], 0, "व्याकरण सही भाषा प्रयोग में सहायता करता है।", "grammar"),
      Q("'सुंदर फूल' में विशेषण कौन-सा है?", ["फूल", "सुंदर", "में", "कोई नहीं"], 1, "सुंदर फूल की विशेषता बताता है।", "visheshan"),
      Q("रिक्त स्थान भरें: बच्चे विद्यालय ___ हैं।", ["जाता", "गई", "जाते", "जाता हूँ"], 2, "बच्चे विद्यालय जाते हैं सही वाक्य है।", "grammar"),
      Q("'और' किस प्रकार का शब्द है?", ["संज्ञा", "क्रिया", "विशेषण", "समुच्चयबोधक"], 3, "'और' शब्दों या विचारों को जोड़ता है।", "grammar"),
      Q("कौन-सा शब्द क्रिया है?", ["लिखना", "हरा", "मेज़", "विद्यालय"], 0, "लिखना एक क्रिया है।", "kriya")
    ]),

  hindiComprehension: T("अपठित गद्यांश", "📖",
    "अपठित गद्यांश पढ़कर उसके अर्थ को समझना और उससे जुड़े प्रश्नों के उत्तर देना होता है।",
    "गद्यांश में दिए गए तथ्यों के आधार पर उत्तर ढूँढ़ें।",
    [
      Q("अपठित गद्यांश का उद्देश्य क्या है?", ["केवल नकल करना", "पढ़कर समझना", "केवल गिनती करना", "चित्र बनाना"], 1, "इससे पढ़ने और समझने की क्षमता जाँची जाती है।", "comprehension"),
      Q("गद्यांश में उत्तर कहाँ ढूँढ़ना चाहिए?", ["अनुमान से ही", "कहीं भी", "गद्यांश में", "उत्तर नहीं देना"], 2, "उत्तर के लिए गद्यांश की जानकारी पढ़ें।", "comprehension"),
      Q("शीर्षक किसका संकेत देता है?", ["लेखक की उम्र", "पृष्ठ संख्या", "अक्षर का आकार", "मुख्य विषय"], 3, "शीर्षक अक्सर मुख्य विषय बताता है।", "main-idea"),
      Q("यदि बारिश से मैच रुका, तो मैच क्यों रुका?", ["बारिश के कारण", "परीक्षा के कारण", "रात होने से", "किताब खोने से"], 0, "गद्यांश में बारिश का कारण दिया गया है।", "comprehension"),
      Q("गद्यांश पढ़ते समय क्या समझना चाहिए?", ["केवल अक्षरों की संख्या", "मुख्य भाव", "पहला शब्द केवल", "रंग"], 1, "मुख्य भाव समझना महत्वपूर्ण है।", "comprehension")
    ]),

  // ---------------- TELUGU ----------------

  teluguNoun: T("నామవాచకాలు", "📚",
    "వ్యక్తి, ప్రదేశం, వస్తువు లేదా భావం పేరును తెలిపే పదాన్ని నామవాచకం అంటారు.",
    "రాము, హైదరాబాద్, పుస్తకం నామవాచకాలకు ఉదాహరణలు.",
    [
      Q("నామవాచకం అంటే ఏమిటి?", ["పని తెలిపే పదం", "పేరు తెలిపే పదం", "గుణం తెలిపే పదం", "కలిపే పదం"], 1, "పేరు తెలిపే పదాన్ని నామవాచకం అంటారు.", "namavachakam"),
      Q("వ్యక్తి పేరు ఏది?", ["పరుగెత్తు", "అందమైన", "రాము", "త్వరగా"], 2, "రాము ఒక వ్యక్తి పేరు.", "namavachakam"),
      Q("ప్రదేశం పేరు ఏది?", ["హైదరాబాద్", "తిను", "నీలం", "మంచి"], 0, "హైదరాబాద్ ఒక ప్రదేశం పేరు.", "namavachakam"),
      Q("'పుస్తకం' ఏది?", ["క్రియ", "విశేషణం", "సర్వనామం", "వస్తువు పేరు"], 3, "పుస్తకం ఒక వస్తువు పేరు.", "namavachakam"),
      Q("భావాన్ని తెలిపే పదం ఏది?", ["చెట్టు", "ఆనందం", "పాఠశాల", "రాము"], 1, "ఆనందం ఒక భావాన్ని సూచిస్తుంది.", "namavachakam")
    ]),

  teluguPronoun: T("సర్వనామాలు", "📝",
    "నామవాచకానికి బదులుగా ఉపయోగించే పదాలను సర్వనామాలు అంటారు.",
    "రాము వచ్చాడు. అతను చదువుతున్నాడు. ఇక్కడ 'అతను' సర్వనామం.",
    [
      Q("సర్వనామం దేనికి బదులుగా ఉపయోగిస్తారు?", ["క్రియకు", "విరామ చిహ్నానికి", "నామవాచకానికి", "గుణానికి"], 2, "సర్వనామం నామవాచకానికి బదులుగా వస్తుంది.", "sarvanamam"),
      Q("సర్వనామం ఏది?", ["పుస్తకం", "అతను", "పరుగెత్తు", "మంచి"], 1, "అతను ఒక సర్వనామం.", "sarvanamam"),
      Q("'నేను పాఠశాలకు వెళ్తాను'లో సర్వనామం ఏది?", ["పాఠశాలకు", "వెళ్తాను", "లో", "నేను"], 3, "నేను మాట్లాడే వ్యక్తిని సూచిస్తుంది.", "sarvanamam"),
      Q("బహువచన సర్వనామం ఏది?", ["వారు", "చెట్టు", "ఆడు", "మంచిది"], 0, "వారు అనేకమందిని సూచించవచ్చు.", "sarvanamam"),
      Q("ఖాళీని పూరించండి: ___ నా స్నేహితుడు.", ["ఆడటం", "అతను", "పచ్చని", "పుస్తకం"], 1, "అతను నా స్నేహితుడు.", "sarvanamam")
    ]),

  teluguVerb: T("క్రియలు", "✍️",
    "పని లేదా చర్యను తెలిపే పదాన్ని క్రియ అంటారు.",
    "చదవడం, ఆడడం, పరుగెత్తడం క్రియలకు ఉదాహరణలు.",
    [
      Q("క్రియ ఏమి తెలియజేస్తుంది?", ["వ్యక్తి పేరు", "ప్రదేశం", "పని లేదా చర్య", "రంగు"], 2, "క్రియ పని లేదా చర్యను తెలియజేస్తుంది.", "kriya"),
      Q("క్రియ పదం ఏది?", ["పుస్తకం", "చదవడం", "పచ్చని", "ఇల్లు"], 1, "చదవడం ఒక చర్య.", "kriya"),
      Q("'రాము పరిగెడుతున్నాడు'లో క్రియ ఏది?", ["రాము", "లో", "ఏదీ కాదు", "పరిగెడుతున్నాడు"], 3, "పరిగెడుతున్నాడు చర్యను తెలియజేస్తుంది.", "kriya"),
      Q("ఖాళీని పూరించండి: పిల్లలు మైదానంలో ___.", ["ఆడుతున్నారు", "నీలం", "పుస్తకం", "ఇల్లు"], 0, "ఆడుతున్నారు క్రియ.", "kriya"),
      Q("చర్యను తెలిపే పదం ఏది?", ["చెట్టు", "ఆడటం", "ఎరుపు", "పాఠశాల"], 1, "ఆడటం ఒక చర్య.", "kriya")
    ]),

  teluguSynonym: T("పర్యాయపదాలు", "📖",
    "ఒకే అర్థాన్ని లేదా దగ్గర అర్థాన్ని తెలిపే పదాలను పర్యాయపదాలు అంటారు.",
    "సూర్యుడికి భానుడు అనే పర్యాయపదం ఉంది.",
    [
      Q("సూర్యుడికి పర్యాయపదం ఏది?", ["చంద్రుడు", "రాత్రి", "భానుడు", "నీరు"], 2, "భానుడు సూర్యుడికి పర్యాయపదం.", "paryayapadalu"),
      Q("నీటికి సమానార్థక పదం ఏది?", ["జలం", "అగ్ని", "గాలి", "నేల"], 0, "జలం, నీరు ఒకే అర్థంలో వాడతారు.", "paryayapadalu"),
      Q("భూమికి పర్యాయపదం ఏది?", ["ఆకాశం", "వాయువు", "చంద్రుడు", "ధరణి"], 3, "ధరణి భూమికి పర్యాయపదం.", "paryayapadalu"),
      Q("స్నేహితుడికి దగ్గర అర్థం ఇచ్చే పదం ఏది?", ["శత్రువు", "మిత్రుడు", "పర్వతం", "వర్షం"], 1, "మిత్రుడు స్నేహితుడికి సమానార్థక పదం.", "paryayapadalu"),
      Q("అడవికి దగ్గర అర్థం ఇచ్చే పదం ఏది?", ["వనం", "నగరం", "పాఠశాల", "సముద్రం"], 0, "వనం అడవికి పర్యాయపదం.", "paryayapadalu")
    ]),

  teluguAntonym: T("వ్యతిరేక పదాలు", "📝",
    "వ్యతిరేక అర్థాలను తెలిపే పదాలను వ్యతిరేక పదాలు అంటారు.",
    "వెలుగు అనే పదానికి వ్యతిరేక పదం చీకటి.",
    [
      Q("వెలుగుకు వ్యతిరేక పదం ఏది?", ["ఉదయం", "చీకటి", "సూర్యుడు", "దీపం"], 1, "వెలుగుకు వ్యతిరేక పదం చీకటి.", "vyatireka"),
      Q("మంచికి వ్యతిరేక పదం ఏది?", ["సంతోషం", "అందం", "చెడు", "మంచితనం"], 2, "మంచికి వ్యతిరేక పదం చెడు.", "vyatireka"),
      Q("పైనకు వ్యతిరేక పదం ఏది?", ["కింద", "ముందు", "వెనుక", "పక్క"], 0, "పైనకు వ్యతిరేక పదం కింద.", "vyatireka"),
      Q("పెద్దకు వ్యతిరేక పదం ఏది?", ["ఎక్కువ", "విశాలం", "పొడవు", "చిన్న"], 3, "పెద్దకు వ్యతిరేక పదం చిన్న.", "vyatireka"),
      Q("సుఖానికి వ్యతిరేక పదం ఏది?", ["ఆనందం", "దుఃఖం", "ప్రేమ", "శాంతి"], 1, "సుఖానికి వ్యతిరేక పదం దుఃఖం.", "vyatireka")
    ]),

  teluguGrammar: T("తెలుగు వ్యాకరణం", "📘",
    "వ్యాకరణం భాషను సరిగ్గా మాట్లాడటం, రాయటం నేర్పుతుంది.",
    "సరైన వాక్యం: పిల్లలు పాఠశాలకు వెళ్తారు.",
    [
      Q("వ్యాకరణం దేనికి ఉపయోగపడుతుంది?", ["సరిగ్గా భాష వాడటానికి", "గణితం చేయడానికి మాత్రమే", "చిత్రాలు గీయడానికి", "ఆటలకు మాత్రమే"], 0, "వ్యాకరణం భాషను సరిగ్గా ఉపయోగించడంలో సహాయపడుతుంది.", "vyakaranam"),
      Q("'మంచి పుస్తకం'లో విశేషణం ఏది?", ["పుస్తకం", "మంచి", "లో", "ఏదీ కాదు"], 1, "మంచి అనే పదం పుస్తకం యొక్క గుణాన్ని చెబుతుంది.", "visheshanam"),
      Q("ఖాళీని పూరించండి: పిల్లలు పాఠశాలకు ___.", ["వెళ్తాడు", "వెళ్లింది", "వెళ్తారు", "వెళ్లాను"], 2, "పిల్లలు పాఠశాలకు వెళ్తారు సరైన వాక్యం.", "vyakaranam"),
      Q("'మరియు' అనే పదం సాధారణంగా ఏమి చేస్తుంది?", ["పేరు చెబుతుంది", "చర్య చెబుతుంది", "రంగు చెబుతుంది", "పదాలను కలుపుతుంది"], 3, "మరియు పదాలను లేదా భావాలను కలుపుతుంది.", "vyakaranam"),
      Q("క్రియ పదం ఏది?", ["చదవడం", "పచ్చని", "బల్ల", "పాఠశాల"], 0, "చదవడం ఒక క్రియ.", "kriya")
    ]),

  teluguComprehension: T("పఠన అవగాహన", "📖",
    "పఠన అవగాహన అంటే చదివిన విషయాన్ని అర్థం చేసుకుని ప్రశ్నలకు సమాధానాలు చెప్పడం.",
    "పాఠ్యంలో ఇచ్చిన సమాచారాన్ని ఉపయోగించి సమాధానం కనుగొనండి.",
    [
      Q("పఠన అవగాహన అంటే ఏమిటి?", ["నకలు చేయడం", "చదివిన విషయాన్ని అర్థం చేసుకోవడం", "అక్షరాలు లెక్కించడం", "చిత్రం వేయడం"], 1, "చదివిన విషయాన్ని అర్థం చేసుకోవడమే పఠన అవగాహన.", "comprehension"),
      Q("సమాధానం కోసం ఎక్కడ చూడాలి?", ["అంచనాలో మాత్రమే", "ఎక్కడైనా", "పాఠ్యంలో", "చూడకూడదు"], 2, "పాఠ్యంలో ఉన్న సమాచారాన్ని ఉపయోగించాలి.", "comprehension"),
      Q("శీర్షిక ఏమి తెలియజేస్తుంది?", ["రచయిత వయస్సు", "పేజీ సంఖ్య", "అక్షర పరిమాణం", "ప్రధాన విషయం"], 3, "శీర్షిక సాధారణంగా ప్రధాన విషయాన్ని తెలియజేస్తుంది.", "main-idea"),
      Q("వర్షం వల్ల ఆట ఆగిందని ఉంటే ఆట ఎందుకు ఆగింది?", ["వర్షం వల్ల", "పరీక్ష వల్ల", "రాత్రి వల్ల", "పుస్తకం వల్ల"], 0, "పాఠ్యంలో వర్షం కారణంగా ఆట ఆగిందని ఉంది.", "comprehension"),
      Q("పాఠ్యం చదివేటప్పుడు ఏమి తెలుసుకోవాలి?", ["అక్షరాల సంఖ్య మాత్రమే", "ప్రధాన భావం", "మొదటి పదం మాత్రమే", "రంగు"], 1, "ప్రధాన భావం అర్థం చేసుకోవడం ముఖ్యం.", "comprehension")
    ])
};

// ==================================================
// CLASS-WISE TOPIC MAP
// ==================================================

const classTopics = {
  "Class 6": {
    Mathematics: ["fractions", "decimals"],
    Science: ["food", "plants"],
    "Social Studies": ["maps", "earth"],
    English: ["nouns", "vocabulary"],
    Hindi: ["hindiNoun", "hindiPronoun"],
    Telugu: ["teluguNoun", "teluguPronoun"]
  },
  "Class 7": {
    Mathematics: ["decimals", "integers", "fractions"],
    Science: ["plants", "force"],
    "Social Studies": ["maps", "resources"],
    English: ["nouns", "tenses"],
    Hindi: ["hindiNoun", "hindiVerb", "hindiSynonym"],
    Telugu: ["teluguNoun", "teluguVerb", "teluguSynonym"]
  },
  "Class 8": {
    Mathematics: ["integers", "rational", "algebra"],
    Science: ["force", "cells", "plants"],
    "Social Studies": ["earth", "resources", "history"],
    English: ["tenses", "vocabulary", "comprehension"],
    Hindi: ["hindiPronoun", "hindiSynonym", "hindiGrammar"],
    Telugu: ["teluguPronoun", "teluguSynonym", "teluguGrammar"]
  },
  "Class 9": {
    Mathematics: ["rational", "algebra", "geometry"],
    Science: ["motion", "cells", "force"],
    "Social Studies": ["history", "civics", "resources"],
    English: ["voice", "comprehension", "vocabulary"],
    Hindi: ["hindiSynonym", "hindiAntonym", "hindiGrammar"],
    Telugu: ["teluguSynonym", "teluguAntonym", "teluguGrammar"]
  },
  "Class 10": {
    Mathematics: ["algebra", "geometry", "quadratic"],
    Science: ["chemical", "light", "motion"],
    "Social Studies": ["civics", "democracy", "history"],
    English: ["voice", "comprehension", "tenses"],
    Hindi: ["hindiAntonym", "hindiGrammar", "hindiComprehension"],
    Telugu: ["teluguAntonym", "teluguGrammar", "teluguComprehension"]
  }
};

// Add the additional Social Studies topics.
content.civics = T("The Constitution", "⚖️",
  "A constitution establishes the basic rules for governing a country and defines rights and government responsibilities.",
  "India's Constitution came into effect on 26 January 1950.",
  [
    Q("When did India's Constitution come into effect?", ["15 August 1947", "26 January 1950", "2 October 1948", "26 November 1949"], 1, "It came into effect on 26 January 1950.", "constitution"),
    Q("What does a constitution establish?", ["Rules of governance", "Daily weather", "Lunch menus", "Sports scores"], 0, "It lays out the basic framework of government.", "constitution"),
    Q("India is a:", ["Monarchy", "Colonial empire", "Democratic republic", "Private kingdom"], 2, "India is a democratic republic.", "government"),
    Q("Which document establishes constitutional rights?", ["Shopping list", "Timetable", "Map key", "The Constitution"], 3, "The Constitution establishes important rights.", "rights"),
    Q("In a democracy, political authority ultimately comes from:", ["The people", "One company", "A foreign ruler", "One family"], 0, "Democratic authority comes from the people.", "democracy")
  ]);

content.democracy = T("Democracy", "🏛️",
  "Democracy is a system in which people participate in choosing their representatives.",
  "Citizens vote in elections to choose their representatives.",
  [
    Q("What is a key feature of democracy?", ["No laws", "People choose representatives", "No public voice", "Permanent unelected rule"], 1, "People participate in choosing representatives.", "democracy"),
    Q("What are elections used for?", ["Measuring rainfall", "Drawing maps", "Choosing representatives", "Making food"], 2, "Elections let people select representatives.", "elections"),
    Q("Who may vote in Indian general elections if eligible?", ["Any visitor", "Only teachers", "Only government employees", "Eligible citizens aged 18 or above"], 3, "Eligible Indian citizens can vote from age 18.", "elections"),
    Q("What does a legislature do?", ["Makes laws", "Predicts earthquakes", "Grows crops", "Prints every book"], 0, "Legislatures make laws.", "government"),
    Q("Why is voting important?", ["It removes all duties", "It lets citizens help choose leaders", "It ends every disagreement", "It replaces courts"], 1, "Voting lets citizens participate in democracy.", "elections")
  ]);

content.resources = T("Natural Resources", "🌳",
  "Natural resources come from nature. They include water, air, soil, sunlight, forests, and minerals.",
  "Saving water, planting trees, and recycling help conserve resources.",
  [
    Q("Which is a renewable resource?", ["Coal", "Petroleum", "Sunlight", "Natural gas"], 2, "Sunlight is renewable.", "resources"),
    Q("Which resource is needed for breathing?", ["Plastic", "Air", "Iron", "Coal"], 1, "Humans need oxygen from air.", "resources"),
    Q("Which action conserves water?", ["Leaving taps open", "Ignoring leaks", "Wasting water", "Fixing leaking taps"], 3, "Fixing leaks prevents water waste.", "conservation"),
    Q("Which is a fossil fuel?", ["Coal", "Sunlight", "Wind", "Flowing water"], 0, "Coal is a fossil fuel.", "resources"),
    Q("Why protect forests?", ["Only decoration", "They support wildlife and ecosystems", "They stop all rain", "They have no value"], 1, "Forests support wildlife and ecosystems.", "forests")
  ]);

content.history = T("History and Heritage", "🏛️",
  "History studies people, events, and societies of the past. Historical sources include written records, objects, and monuments.",
  "An old coin or inscription can help us learn about the past.",
  [
    Q("What does history study?", ["Only future events", "Weather only", "People and events of the past", "Only mathematics"], 2, "History studies the past.", "history"),
    Q("Which can be a historical source?", ["New plastic bag", "Old inscription", "Blank page", "Modern calculator"], 1, "Inscriptions provide evidence about the past.", "historical-sources"),
    Q("Who studies historical evidence?", ["Historians", "Chefs only", "Pilots only", "Singers only"], 0, "Historians study the past.", "history"),
    Q("What is heritage?", ["Only new buildings", "Only money", "Weather", "Things passed down from earlier generations"], 3, "Heritage is passed down through generations.", "heritage"),
    Q("Why preserve historical monuments?", ["To erase history", "To protect cultural heritage", "To prevent learning", "To change the past"], 1, "Preservation protects historical heritage.", "heritage")
  ]);

content.voice = T("Active and Passive Voice", "✍️",
  "In active voice, the subject performs the action. In passive voice, the subject receives the action.",
  "Active: Ram writes a letter. Passive: A letter is written by Ram.",
  [
    Q("Choose the passive form of 'Ram writes a letter.'", ["A letter writes Ram.", "Ram is written by a letter.", "A letter is written by Ram.", "A letter was writing Ram."], 2, "The object becomes the subject in passive voice.", "passive-voice"),
    Q("In active voice, who usually performs the action?", ["The subject", "The object only", "The punctuation mark", "The adjective"], 0, "The subject performs the action.", "active-voice"),
    Q("Choose the passive form of 'She cleaned the room.'", ["She was cleaned by the room.", "The room cleaned her.", "The room is cleaning.", "The room was cleaned by her."], 3, "The room receives the action.", "passive-voice"),
    Q("Which sentence is active voice?", ["The cake was baked by Ana.", "Ana baked the cake.", "The cake is being baked.", "The work was done."], 1, "Ana performs the action.", "active-voice"),
    Q("Passive voice commonly uses:", ["Only adjectives", "Only nouns", "Be + past participle", "Only prepositions"], 2, "Passive forms commonly use be and a past participle.", "passive-voice")
  ]);

content.hindiComprehension = T("अपठित गद्यांश", "📖",
  "अपठित गद्यांश पढ़कर उसके अर्थ को समझना और उससे जुड़े प्रश्नों के उत्तर देना होता है।",
  "गद्यांश में दिए गए तथ्यों के आधार पर उत्तर ढूँढ़ें।",
  [
    Q("अपठित गद्यांश का उद्देश्य क्या है?", ["केवल नकल करना", "पढ़कर समझना", "केवल गिनती करना", "चित्र बनाना"], 1, "इससे पढ़ने और समझने की क्षमता जाँची जाती है।", "comprehension"),
    Q("गद्यांश में उत्तर कहाँ ढूँढ़ना चाहिए?", ["अनुमान से ही", "कहीं भी", "गद्यांश में", "उत्तर नहीं देना"], 2, "उत्तर के लिए गद्यांश की जानकारी पढ़ें।", "comprehension"),
    Q("शीर्षक किसका संकेत देता है?", ["लेखक की उम्र", "पृष्ठ संख्या", "अक्षर का आकार", "मुख्य विषय"], 3, "शीर्षक अक्सर मुख्य विषय बताता है।", "main-idea"),
    Q("यदि बारिश से मैच रुका, तो मैच क्यों रुका?", ["बारिश के कारण", "परीक्षा के कारण", "रात होने से", "किताब खोने से"], 0, "गद्यांश में बारिश का कारण दिया गया है।", "comprehension"),
    Q("गद्यांश पढ़ते समय क्या समझना चाहिए?", ["केवल अक्षरों की संख्या", "मुख्य भाव", "पहला शब्द केवल", "रंग"], 1, "मुख्य भाव समझना महत्वपूर्ण है।", "comprehension")
  ]);

content.teluguComprehension = T("పఠన అవగాహన", "📖",
  "పఠన అవగాహన అంటే చదివిన విషయాన్ని అర్థం చేసుకుని ప్రశ్నలకు సమాధానాలు చెప్పడం.",
  "పాఠ్యంలో ఇచ్చిన సమాచారాన్ని ఉపయోగించి సమాధానం కనుగొనండి.",
  [
    Q("పఠన అవగాహన అంటే ఏమిటి?", ["నకలు చేయడం", "చదివిన విషయాన్ని అర్థం చేసుకోవడం", "అక్షరాలు లెక్కించడం", "చిత్రం వేయడం"], 1, "చదివిన విషయాన్ని అర్థం చేసుకోవడమే పఠన అవగాహన.", "comprehension"),
    Q("సమాధానం కోసం ఎక్కడ చూడాలి?", ["అంచనాలో మాత్రమే", "ఎక్కడైనా", "పాఠ్యంలో", "చూడకూడదు"], 2, "పాఠ్యంలో ఉన్న సమాచారాన్ని ఉపయోగించాలి.", "comprehension"),
    Q("శీర్షిక ఏమి తెలియజేస్తుంది?", ["రచయిత వయస్సు", "పేజీ సంఖ్య", "అక్షర పరిమాణం", "ప్రధాన విషయం"], 3, "శీర్షిక సాధారణంగా ప్రధాన విషయాన్ని తెలియజేస్తుంది.", "main-idea"),
    Q("వర్షం వల్ల ఆట ఆగిందని ఉంటే ఆట ఎందుకు ఆగింది?", ["వర్షం వల్ల", "పరీక్ష వల్ల", "రాత్రి వల్ల", "పుస్తకం వల్ల"], 0, "పాఠ్యంలో వర్షం కారణంగా ఆట ఆగిందని ఉంది.", "comprehension"),
    Q("పాఠ్యం చదివేటప్పుడు ఏమి తెలుసుకోవాలి?", ["అక్షరాల సంఖ్య మాత్రమే", "ప్రధాన భావం", "మొదటి పదం మాత్రమే", "రంగు"], 1, "ప్రధాన భావం అర్థం చేసుకోవడం ముఖ్యం.", "comprehension")
  ]);

content.hindiGrammar = T("हिंदी व्याकरण", "📘",
  "व्याकरण भाषा को सही ढंग से बोलने और लिखने के नियम सिखाता है।",
  "सही वाक्य: बच्चे विद्यालय जाते हैं।",
  [
    Q("व्याकरण किसमें सहायता करता है?", ["सही भाषा प्रयोग में", "गणना में ही", "चित्र बनाने में ही", "खेलने में ही"], 0, "व्याकरण सही भाषा प्रयोग में सहायता करता है।", "grammar"),
    Q("'सुंदर फूल' में विशेषण कौन-सा है?", ["फूल", "सुंदर", "में", "कोई नहीं"], 1, "सुंदर फूल की विशेषता बताता है।", "visheshan"),
    Q("रिक्त स्थान भरें: बच्चे विद्यालय ___ हैं।", ["जाता", "गई", "जाते", "जाता हूँ"], 2, "बच्चे विद्यालय जाते हैं सही वाक्य है।", "grammar"),
    Q("'और' किस प्रकार का शब्द है?", ["संज्ञा", "क्रिया", "विशेषण", "समुच्चयबोधक"], 3, "'और' शब्दों या विचारों को जोड़ता है।", "grammar"),
    Q("कौन-सा शब्द क्रिया है?", ["लिखना", "हरा", "मेज़", "विद्यालय"], 0, "लिखना एक क्रिया है।", "kriya")
  ]);

content.teluguGrammar = T("తెలుగు వ్యాకరణం", "📘",
  "వ్యాకరణం భాషను సరిగ్గా మాట్లాడటం, రాయటం నేర్పుతుంది.",
  "సరైన వాక్యం: పిల్లలు పాఠశాలకు వెళ్తారు.",
  [
    Q("వ్యాకరణం దేనికి ఉపయోగపడుతుంది?", ["సరిగ్గా భాష వాడటానికి", "గణితం చేయడానికి మాత్రమే", "చిత్రాలు గీయడానికి", "ఆటలకు మాత్రమే"], 0, "వ్యాకరణం భాషను సరిగ్గా ఉపయోగించడంలో సహాయపడుతుంది.", "vyakaranam"),
    Q("'మంచి పుస్తకం'లో విశేషణం ఏది?", ["పుస్తకం", "మంచి", "లో", "ఏదీ కాదు"], 1, "మంచి అనే పదం పుస్తకం యొక్క గుణాన్ని చెబుతుంది.", "visheshanam"),
    Q("ఖాళీని పూరించండి: పిల్లలు పాఠశాలకు ___.", ["వెళ్తాడు", "వెళ్లింది", "వెళ్తారు", "వెళ్లాను"], 2, "పిల్లలు పాఠశాలకు వెళ్తారు సరైన వాక్యం.", "vyakaranam"),
    Q("'మరియు' అనే పదం సాధారణంగా ఏమి చేస్తుంది?", ["పేరు చెబుతుంది", "చర్య చెబుతుంది", "రంగు చెబుతుంది", "పదాలను కలుపుతుంది"], 3, "మరియు పదాలను లేదా భావాలను కలుపుతుంది.", "vyakaranam"),
    Q("క్రియ పదం ఏది?", ["చదవడం", "పచ్చని", "బల్ల", "పాఠశాల"], 0, "చదవడం ఒక క్రియ.", "kriya")
  ]);

// ==================================================
// APPLICATION STATE
// ==================================================

const pageIds = [
  "homePage",
  "topicsPage",
  "lessonPage",
  "quizPage",
  "resultPage",
  "progressPage"
];

let currentClass = AUTH_USER?.class_name || "Class 6";
let currentSubject = "Mathematics";
let currentTopic = null;
let currentQuestion = 0;
let selectedAnswer = null;
let score = 0;
let checked = false;
let mistakeTags = [];

// ==================================================
// BASIC HELPERS
// ==================================================

function $(id) {
  return document.getElementById(id);
}

function getTopics(className, subject) {
  const ids = classTopics[className]?.[subject] || [];

  return ids
    .filter(id => content[id])
    .map(id => ({ id, ...content[id] }));
}

// ==================================================
// STUDENT-SPECIFIC HISTORY
// ==================================================

function getCurrentStudentHistoryKey() {
    try {
        const user = JSON.parse(
            localStorage.getItem("saathiUser") || "{}"
        );

        const identity =
            user.email || user.student_code || user.id;

        return "saathiSchoolQuizHistory_" +
            String(identity || "guest").toLowerCase();

    } catch {
        return "saathiSchoolQuizHistory_guest";
    }
}

function getHistory() {
    try {
        const history = JSON.parse(
            localStorage.getItem(getCurrentStudentHistoryKey()) || "[]"
        );

        return Array.isArray(history) ? history : [];

    } catch {
        return [];
    }
}

function saveHistory(history) {
    try {
        localStorage.setItem(
            getCurrentStudentHistoryKey(),
            JSON.stringify(history)
        );
    } catch (error) {
        console.log("Could not save student history.");
    }
}

function getSaathiStudentToken() {
    return localStorage.getItem("saathiToken") || "";
}

function showPage(pageId) {
  pageIds.forEach(id => {
    $(id).classList.toggle("hidden", id !== pageId);
  });

  document.querySelectorAll("[data-go]").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.go === pageId
    );
  });

  if (pageId === "progressPage") {
    renderProgress();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}


// ==================================================
// OFFLINE QUIZ SUBMISSION QUEUE
// ==================================================

function getPendingQueueKey() {
    const user = JSON.parse(
        localStorage.getItem("saathiUser") || "{}"
    );

    const identity = user.email || user.student_code || user.id;

    if (!identity) {
        throw new Error("Student account not found.");
    }

    return "saathiPendingQuizSubmissions_" +
        String(identity).toLowerCase();
}

function getPendingQueue() {
    try {
        return JSON.parse(
            localStorage.getItem(getPendingQueueKey()) || "[]"
        );
    } catch {
        return [];
    }
}

function savePendingQueue(queue) {
    localStorage.setItem(
        getPendingQueueKey(),
        JSON.stringify(queue)
    );
}

function queueOfflineQuiz(payload, attempt) {
    const queue = getPendingQueue();

    queue.push({
        id: Date.now() + Math.random().toString(16).slice(2),
        payload: payload,
        attempt: attempt,
        queuedAt: new Date().toISOString()
    });

    savePendingQueue(queue);
}

async function sendQuizToServer(payload) {
    const token = getSaathiStudentToken();

    if (!token) {
        const error = new Error("Student login required.");
        error.status = 401;
        throw error;
    }

    const response = await fetch(
        `${API_BASE}/api/recommendation`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        }
    );

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        const error = new Error(
            data.detail || "Could not save quiz submission."
        );

        error.status = response.status;
        throw error;
    }

    return data;
}

// Prevent multiple sync operations at the same time.
let isSyncingSubmissions = false;

async function syncPendingSubmissions() {
    if (!navigator.onLine || isSyncingSubmissions) return;

    if (localStorage.getItem("saathiRole") !== "student") return;

    const token = getSaathiStudentToken();
    if (!token) return;

    let queue = getPendingQueue();

    if (queue.length === 0) return;

    isSyncingSubmissions = true;

    const remaining = [];
    let syncedCount = 0;

    try {
        for (let i = 0; i < queue.length; i++) {
            try {
                await sendQuizToServer(queue[i].payload);
                syncedCount++;
            } catch (error) {
                console.log("Quiz sync failed:", error);

                // Keep this and all remaining submissions for retry.
                remaining.push(...queue.slice(i));
                break;
            }
        }

        savePendingQueue(remaining);

        if ($("progressNote")) {
            $("progressNote").textContent =
                remaining.length > 0
                    ? `${remaining.length} quiz submission(s) waiting to sync.`
                    : syncedCount > 0
                        ? `${syncedCount} offline quiz submission(s) synced successfully.`
                        : "Your progress is private to your student account.";
        }

        console.log("Offline quizzes synced:", syncedCount);

    } finally {
        isSyncingSubmissions = false;
    }
}

// Sync when internet returns or the student reopens the app.
window.addEventListener("online", syncPendingSubmissions);

document.addEventListener("visibilitychange", function () {
    if (!document.hidden) {
        syncPendingSubmissions();
    }
});


// ==================================================
// CLASS AND TOPIC SELECTION
// ==================================================

function populateTopics(className, subject, selectId) {
  const select = $(selectId);
  select.innerHTML = "";

  getTopics(className, subject).forEach(item => {
    const option = document.createElement("option");
    option.value = item.id;
    option.textContent = item.name;
    select.appendChild(option);
  });
}

function openLesson(className, subject, topicId) {
  const item = content[topicId];

  if (!item) {
    alert("No topic is available for this selection.");
    return;
  }

  currentClass = className;
  currentSubject = subject;
  currentTopic = { id: topicId, ...item };

  $("lessonMeta").textContent = `${className} · ${subject}`;
  $("lessonTitle").textContent = item.name;
  $("lessonText").textContent = item.lesson;
  $("lessonExample").textContent = item.example;
  $("levelBadge").textContent = "Foundation";

  showPage("lessonPage");
}

function renderTopics() {
  const className = $("browseClass").value;
  const subject = $("browseSubject").value;
  const container = $("topicCards");

  container.innerHTML = "";

  getTopics(className, subject).forEach(item => {
    const card = document.createElement("article");
    card.className = "topic-card";

    const icon = document.createElement("div");
    icon.className = "topic-icon";
    icon.textContent = item.icon;

    const heading = document.createElement("h3");
    heading.textContent = item.name;

    const description = document.createElement("p");
    description.textContent = item.lesson;

    const button = document.createElement("button");
    button.className = "primary";
    button.textContent = "Open Topic →";

    button.addEventListener("click", () => {
      openLesson(className, subject, item.id);
    });

    card.append(icon, heading, description, button);
    container.appendChild(card);
  });

  if (!container.children.length) {
    container.textContent =
      "No sample topics are available for this selection yet.";
  }
}

// ==================================================
// QUIZ
// ==================================================

function startQuiz() {
  if (!currentTopic || !currentTopic.questions.length) return;

  currentQuestion = 0;
  selectedAnswer = null;
  score = 0;
  checked = false;
  mistakeTags = [];

  $("quizTitle").textContent =
    `${currentClass} · ${currentTopic.name}`;

  showPage("quizPage");
  renderQuestion();
}

function renderQuestion() {
  const item = currentTopic.questions[currentQuestion];

  selectedAnswer = null;
  checked = false;

  $("questionCount").textContent =
    `Question ${currentQuestion + 1} of ${currentTopic.questions.length}`;

  $("progressBar").style.width =
    `${(currentQuestion / currentTopic.questions.length) * 100}%`;

  $("questionText").textContent = item.question;
  $("feedback").textContent = "";
  $("answerBtn").disabled = true;
  $("answerBtn").textContent = "Check Answer";

  $("hintBox").classList.add("hidden");
  $("hintText").textContent = "";
  $("hintBtn").disabled = false;
  $("hintBtn").textContent = "Need a hint? 💡";

  const options = $("options");
  options.innerHTML = "";

  item.options.forEach((optionText, index) => {
    const label = document.createElement("label");
    label.className = "option";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "answer";
    radio.value = index;

    const text = document.createElement("span");
    text.textContent = optionText;

    radio.addEventListener("change", () => {
      if (checked) return;

      selectedAnswer = index;
      $("answerBtn").disabled = false;

      document.querySelectorAll(".option").forEach(option => {
        option.classList.remove("selected");
      });

      label.classList.add("selected");
    });

    label.append(radio, text);
    options.appendChild(label);
  });
}

function showHint() {
  if (checked || !currentTopic) return;

  const item = currentTopic.questions[currentQuestion];

  $("hintText").textContent = item.hint || HINTS.general;
  $("hintBox").classList.remove("hidden");
  $("hintBtn").textContent = "Hint shown";
  $("hintBtn").disabled = true;
}

function checkAnswer() {
  const item = currentTopic.questions[currentQuestion];

  if (!checked) {
    if (selectedAnswer === null) return;

    checked = true;
    $("hintBtn").disabled = true;

    const correct = selectedAnswer === item.answer;

    if (correct) {
      score++;
    } else if (item.tag && !mistakeTags.includes(item.tag)) {
      mistakeTags.push(item.tag);
    }

    document.querySelectorAll(".option").forEach((label, index) => {
      const radio = label.querySelector("input");
      radio.disabled = true;

      if (index === item.answer) {
        label.classList.add("correct");
      } else if (index === selectedAnswer && !correct) {
        label.classList.add("wrong");
      }
    });

    $("feedback").textContent =
      (correct ? "Correct! " : "Not quite. ") +
      item.explanation;

    $("feedback").style.color =
      correct ? "#16865c" : "#c44747";

    $("answerBtn").textContent =
      currentQuestion === currentTopic.questions.length - 1
        ? "View Results →"
        : "Next Question →";

    return;
  }

  if (currentQuestion < currentTopic.questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    $("answerBtn").disabled = true;
    finishQuiz();
  }
}

// ==================================================
// SIMPLE ADAPTIVE RECOMMENDATION
// ==================================================

function getRecommendation(finalScore) {
  if (finalScore <= 2) {
    return {
      level: "Foundation",
      title: "Let's revise the basics.",
      message:
        "Read the lesson again and try the questions once more.",
      reason:
        `You answered ${finalScore} out of 5 correctly. ` +
        "Review the main concept and practise slowly."
    };
  }

  if (finalScore === 3) {
    return {
      level: "Practice",
      title: "Let's practise a little more.",
      message:
        "Review the explanations and practise similar questions.",
      reason:
        "You answered 3 out of 5 correctly. More practice may " +
        "strengthen your understanding."
    };
  }

  return {
    level: "Challenge",
    title: "Good work! Try a challenge.",
    message:
      "Try a harder example or move to another topic.",
    reason:
      `You answered ${finalScore} out of 5 correctly. ` +
      "You may be ready for a more challenging activity."
  };
}

// ==================================================
// RESULTS AND FASTAPI CONNECTION
// ==================================================

async function finishQuiz() {
    const total = currentTopic.questions.length;
    const accuracy = Math.round((score / total) * 100);

    // Use the authenticated student's name.
    // Do not use undefined currentStudentName or getStudentName variables.
    const studentName =
        AUTH_USER?.name ||
        localStorage.getItem("saathiStudentName") ||
        $("studentName").value.trim() ||
        "Student";

    $("progressBar").style.width = "100%";

    $("resultTitle").textContent =
        accuracy >= 80
            ? "Excellent work!"
            : accuracy >= 60
                ? "Good effort!"
                : "Keep practising!";

    $("scoreValue").textContent = `${score}/${total}`;
    $("accuracyValue").textContent = `${accuracy}%`;

    // Generate recommendation immediately.
    let recommendation = getRecommendation(score);

    // Data to be sent to FastAPI.
    const payload = {
        student_name: studentName,
        class_name: currentClass,
        subject: currentSubject,
        topic: currentTopic.name,
        correct_answers: score,
        total_questions: total,
        mistake_tags: [...mistakeTags]
    };

    // Save the result locally first.
    const attempt = {
        studentName: studentName,
        className: currentClass,
        subject: currentSubject,
        topic: currentTopic.name,
        score: score,
        total: total,
        accuracy: accuracy,
        level: recommendation.level,
        mistakeTags: [...mistakeTags],
        date: new Date().toLocaleString()
    };

    const history = getHistory();
    history.unshift(attempt);
    saveHistory(history.slice(0, 50));

    // Display recommendation immediately.
    $("levelBadge").textContent = recommendation.level;
    $("recommendationTitle").textContent = recommendation.title;
    $("recommendationText").textContent = recommendation.message;
    $("reasonText").textContent = recommendation.reason;

    $("resultMessage").textContent =
        "Your results are ready. Saving your submission...";

    // Show results without waiting for the server.
    showPage("resultPage");

    // Synchronize with backend in the background.
    try {
        const serverResult = await sendQuizToServer(payload);

        recommendation = {
            level: serverResult.recommended_level || recommendation.level,
            title: serverResult.recommended_activity || recommendation.title,
            message: serverResult.explanation || recommendation.message,
            reason:
                serverResult.prerequisite_suggestion ||
                `SAATHI selected ${serverResult.recommended_level || recommendation.level} based on your quiz score.`
        };

        // Update recommendation if the server responds.
        $("levelBadge").textContent = recommendation.level;
        $("recommendationTitle").textContent = recommendation.title;
        $("recommendationText").textContent = recommendation.message;
        $("reasonText").textContent = recommendation.reason;

        $("resultMessage").textContent =
            "Quiz completed and successfully saved to SAATHI.";

    } catch (error) {
        console.log("Quiz submission could not be synced:", error);

        // Queue network/server failures and expired sessions for retry.
        if (
            !error.status ||
            error.status === 401 ||
            error.status >= 500
        ) {
            queueOfflineQuiz(payload, attempt);

            $("resultMessage").textContent =
                "Your quiz is saved on this device. It will automatically sync when internet returns.";
        } else {
            $("resultMessage").textContent =
                "Your result is saved on this device, but the server rejected the submission.";
        }
    }
}

// ==================================================
// MY PROGRESS
// ==================================================

// ==================================================
// MY PROGRESS - INDIVIDUAL STUDENT
// ==================================================

async function renderProgress() {
    const list = $("historyList");

    list.textContent = "Loading your progress...";

    let history = [];
    let usingLocalHistory = false;

    try {
        const token = getSaathiStudentToken();

        if (!token) {
            window.location.replace("login.html");
            return;
        }

        const response = await fetch(
            `${API_BASE}/api/student/submissions`,
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        );

        if (response.status === 401) {
            localStorage.removeItem("saathiToken");
            localStorage.removeItem("saathiUser");
            localStorage.removeItem("saathiRole");

            window.location.replace("login.html");
            return;
        }

        if (!response.ok) {
            throw new Error("Could not load student progress.");
        }

        const data = await response.json();

        const records = Array.isArray(data)
            ? data
            : data.submissions || data.history || [];

        history = records.map(item => {
            const correct = Number(
                item.correct_answers ?? item.score ?? 0
            );

            const total = Number(
                item.total_questions ?? item.total ?? 5
            );

            return {
                className: item.class_name || item.class || "",
                subject: item.subject || "",
                topic: item.topic || "",
                score: correct,
                total: total,
                accuracy: Number(
                    item.accuracy ??
                    Math.round(correct / Math.max(total, 1) * 100)
                ),
                level: item.recommended_level || item.level || "Not available",
                date: item.created_at || item.date || "Recently"
            };
        });

    } catch (error) {
        console.log("Server progress unavailable:", error);

        history = getHistory();
        usingLocalHistory = true;
    }

    $("roundsValue").textContent = history.length;

    if (history.length === 0) {
        $("bestValue").textContent = "—";
        $("currentLevel").textContent = "Not started";
        list.textContent = "Complete a quiz to see your progress.";

        $("progressNote").textContent = usingLocalHistory
            ? "Showing this account's saved browser history."
            : "Your account does not have any quiz submissions yet.";

        return;
    }

    $("bestValue").textContent =
        Math.max(...history.map(item => item.accuracy)) + "%";

    $("currentLevel").textContent =
        history[0].level || "Not available";

    $("progressNote").textContent = usingLocalHistory
        ? "Showing this student's saved browser history while the server is unavailable."
        : "Showing submissions belonging to your logged-in student account.";

    list.innerHTML = "";

    history.slice(0, 10).forEach(item => {
        const row = document.createElement("div");
        row.className = "history-item";

        const details = document.createElement("div");

        const title = document.createElement("strong");
        title.textContent =
            `${item.className} · ${item.subject} · ${item.topic}`;

        const date = document.createElement("p");
        date.textContent =
            `${item.date} · Recommended: ${item.level}`;

        details.append(title, date);

        const result = document.createElement("span");
        result.className = "history-score";
        result.textContent =
            `${item.score}/${item.total} (${item.accuracy}%)`;

        row.append(details, result);
        list.appendChild(row);
    });
}

// ==================================================
// EVENT LISTENERS
// ==================================================

// Main navigation
document.querySelectorAll("[data-go]").forEach(button => {
  button.addEventListener("click", () => {
    const pageId = button.dataset.go;

    if (pageId === "topicsPage") {
      $("browseClass").value = currentClass;
      $("browseSubject").value = currentSubject;
      renderTopics();
    }

    showPage(pageId);
  });
});

// Home-page class and subject selection
$("classSelect").addEventListener("change", () => {
  populateTopics(
    $("classSelect").value,
    $("subjectSelect").value,
    "topicSelect"
  );
});

$("subjectSelect").addEventListener("change", () => {
  currentSubject = $("subjectSelect").value;

  populateTopics(
    $("classSelect").value,
    currentSubject,
    "topicSelect"
  );
});

// Start learning
$("startBtn").addEventListener("click", () => {
  const name = AUTH_USER?.name || $("studentName").value.trim();

  if (!name) {
    alert("Please log in with your student account.");
    window.location.replace("login.html");
    return;
  }

  try {
    localStorage.setItem("saathiStudentName", name);
    $("studentName").value = name;
  } catch {
    // Saving the name is optional.
  }

  openLesson(
    $("classSelect").value,
    $("subjectSelect").value,
    $("topicSelect").value
  );
});

// Topic browsing
$("browseClass").addEventListener("change", renderTopics);
$("browseSubject").addEventListener("change", renderTopics);

// Quiz controls
$("startQuizBtn").addEventListener("click", startQuiz);
$("hintBtn").addEventListener("click", showHint);
$("answerBtn").addEventListener("click", checkAnswer);
$("restartBtn").addEventListener("click", startQuiz);

// Choose another topic after results
$("resultTopicsBtn").addEventListener("click", () => {
  $("browseClass").value = currentClass;
  $("browseSubject").value = currentSubject;
  renderTopics();
  showPage("topicsPage");
});

// Restore the authenticated student's profile
if (AUTH_USER && AUTH_USER.role === "student") {
  $("studentName").value = AUTH_USER.name || "";
  $("studentName").readOnly = true;

  if (AUTH_USER.class_name) {
    currentClass = AUTH_USER.class_name;
    $("classSelect").value = currentClass;
    $("classSelect").disabled = true;
    $("browseClass").value = currentClass;
  }

  try {
    localStorage.setItem("saathiStudentName", AUTH_USER.name || "");
  } catch {
    // Browser storage is optional.
  }
} else {
  window.location.replace("login.html");
}

// ==================================================
// INITIALISE SAATHI
// ==================================================

populateTopics(currentClass, currentSubject, "topicSelect");
renderTopics();
renderProgress();
showPage("homePage");

// Try syncing any pending submissions on app startup.
syncPendingSubmissions();

// ==================================================
// STUDENT LOGOUT
// ==================================================

const studentLogoutButton = $("studentLogoutBtn");

if (studentLogoutButton) {
    studentLogoutButton.addEventListener("click", function () {

        const confirmLogout = confirm(
            "Are you sure you want to logout?"
        );

        if (!confirmLogout) return;

        localStorage.removeItem("saathiToken");
        localStorage.removeItem("saathiUser");
        localStorage.removeItem("saathiRole");
        localStorage.removeItem("saathiStudentName");

        window.location.replace("login.html");
    });
}