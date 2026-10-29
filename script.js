
function q(question, options, answer, explanation) {
  return { question, options, answer, explanation };
}

function topic(name, icon, lesson, example, questions) {
  return { name, icon, lesson, example, questions };
}

const content = {
  // MATHEMATICS
  fractions: topic("Fractions", "➗",
    "A fraction represents a part of a whole. The numerator is on top and the denominator is below.",
    "1/2 + 1/2 = 1. Two halves make one whole.",
    [
      q("What is 1/2 + 1/2?", ["1/4", "1", "1/2", "2"], 1, "Two halves make one whole."),
      q("What is the numerator in 3/5?", ["3", "5", "8", "2"], 0, "The numerator is the top number."),
      q("What is 1/4 + 2/4?", ["3/4", "3/8", "2/4", "1/2"], 0, "Add the numerators and keep the denominator."),
      q("Which fraction equals 1/2?", ["1/3", "3/4", "2/4", "2/3"], 2, "2/4 simplifies to 1/2."),
      q("What is half of 12?", ["4", "6", "8", "10"], 1, "12 divided by 2 is 6.")
    ]),

  decimals: topic("Decimals", "🔢",
    "Decimals represent parts of a whole using a decimal point. The first place after the point represents tenths.",
    "0.5 + 0.5 = 1.0.",
    [
      q("What is 0.5 + 0.5?", ["0.10", "1.0", "0.5", "1.5"], 1, "Five tenths plus five tenths equals one."),
      q("Which number is greatest?", ["0.25", "0.5", "0.35", "0.15"], 1, "0.50 is the greatest."),
      q("What is 2.5 + 1.2?", ["3.7", "3.2", "4.7", "2.7"], 0, "2.5 + 1.2 = 3.7."),
      q("What is 1 - 0.25?", ["0.25", "0.50", "0.75", "1.25"], 2, "1.00 - 0.25 = 0.75."),
      q("What is 0.2 × 10?", ["0.02", "2", "20", "0.2"], 1, "Multiplying 0.2 by 10 gives 2.")
    ]),

  integers: topic("Integers", "🔢",
    "Integers include negative whole numbers, zero, and positive whole numbers.",
    "-3 + 5 = 2.",
    [
      q("What is -3 + 5?", ["-8", "-2", "2", "8"], 2, "Starting at -3 and moving 5 steps right gives 2."),
      q("What is -4 - 2?", ["-6", "-2", "6", "2"], 0, "Subtracting 2 from -4 gives -6."),
      q("Which number is greatest?", ["-7", "-2", "-9", "-10"], 1, "-2 is closest to zero."),
      q("What is -2 × 3?", ["6", "-6", "5", "-5"], 1, "A negative multiplied by a positive is negative."),
      q("What is the additive inverse of 8?", ["8", "0", "1", "-8"], 3, "8 + (-8) = 0.")
    ]),

  rational: topic("Rational Numbers", "➗",
    "A rational number can be written as p/q, where p and q are integers and q is not zero.",
    "1/2 and -3/4 are rational numbers.",
    [
      q("Which is a rational number?", ["√2", "π", "3/4", "√3"], 2, "3/4 is a ratio of two integers."),
      q("What is 1/2 + 1/2?", ["1", "1/4", "2", "1/2"], 0, "One half plus one half equals one."),
      q("What is the reciprocal of 3/4?", ["3/4", "4/3", "7/4", "1/3"], 1, "Swap the numerator and denominator."),
      q("Which is greater?", ["-3/4", "-1/2", "They are equal", "Cannot compare"], 1, "-1/2 is greater because it is closer to zero."),
      q("What is 0.25 as a fraction?", ["1/2", "1/3", "1/4", "2/5"], 2, "0.25 = 25/100 = 1/4.")
    ]),

  algebra: topic("Algebra", "📐",
    "Algebra uses letters to represent unknown numbers. We solve equations to find the unknown value.",
    "If x + 3 = 7, then x = 4.",
    [
      q("If x + 3 = 7, what is x?", ["3", "4", "5", "10"], 1, "Subtract 3 from both sides."),
      q("If y = 4, what is 2y?", ["2", "4", "6", "8"], 3, "2 × 4 = 8."),
      q("Simplify 3x + 2x.", ["5", "5x", "6x", "x"], 1, "Add the like terms: 3x + 2x = 5x."),
      q("If x - 5 = 2, what is x?", ["3", "5", "7", "10"], 2, "Add 5 to both sides."),
      q("Which is an algebraic expression?", ["5 + 3", "x + 4", "8 × 2", "9 - 1"], 1, "x + 4 contains a variable.")
    ]),

  geometry: topic("Geometry", "📐",
    "Geometry studies shapes, lines, angles, and their properties.",
    "The angles inside a triangle add up to 180 degrees.",
    [
      q("How many sides does a triangle have?", ["2", "3", "4", "5"], 1, "A triangle has three sides."),
      q("What is a right angle?", ["45°", "60°", "90°", "180°"], 2, "A right angle measures 90 degrees."),
      q("How many degrees are in a straight angle?", ["90°", "120°", "180°", "360°"], 2, "A straight angle measures 180 degrees."),
      q("What is the perimeter of a square with side 4 cm?", ["8 cm", "12 cm", "16 cm", "20 cm"], 2, "Perimeter = 4 × side = 16 cm."),
      q("How many sides does a hexagon have?", ["5", "6", "7", "8"], 1, "A hexagon has six sides.")
    ]),

  quadratic: topic("Quadratic Equations", "📈",
    "A quadratic equation has the highest power of its variable equal to 2. One form is ax² + bx + c = 0.",
    "x² - 5x + 6 = 0 has roots 2 and 3.",
    [
      q("What is the degree of a quadratic equation?", ["1", "2", "3", "4"], 1, "A quadratic equation has degree 2."),
      q("Which is a quadratic equation?", ["x + 2 = 0", "x³ + 1 = 0", "x² + 3x + 2 = 0", "2x = 8"], 2, "The highest power of x is 2."),
      q("What are the roots of x² - 5x + 6 = 0?", ["1 and 6", "2 and 3", "-2 and -3", "0 and 6"], 1, "(x - 2)(x - 3) = 0."),
      q("What is the discriminant?", ["b² - 4ac", "b² + 4ac", "a² - bc", "2a + b"], 0, "The discriminant is b² - 4ac."),
      q("What are the roots of x² = 9?", ["Only 3", "Only -3", "0 and 9", "3 and -3"], 3, "Both 3 and -3 have square 9.")
    ]),

  // SCIENCE
  food: topic("Components of Food", "🥗",
    "Food gives us energy and helps us grow. Nutrients include carbohydrates, proteins, fats, vitamins, and minerals.",
    "Carbohydrates provide energy. Proteins help the body grow and repair itself.",
    [
      q("Which nutrient helps growth and repair?", ["Fats", "Proteins", "Water", "Carbohydrates"], 1, "Proteins help the body grow and repair tissues."),
      q("Which food is a source of vitamin C?", ["Rice", "Butter", "Orange", "Salt"], 2, "Oranges contain vitamin C."),
      q("Which nutrient is a major energy source?", ["Carbohydrates", "Vitamins", "Minerals", "Water"], 0, "Carbohydrates provide energy."),
      q("What is a balanced diet?", ["Only fruits", "Only rice", "Only milk", "A suitable mix of needed nutrients"], 3, "A balanced diet provides essential nutrients."),
      q("Which mineral helps build strong bones?", ["Iron", "Calcium", "Sodium", "Iodine"], 1, "Calcium is important for bones and teeth.")
    ]),

  plants: topic("Plants and Photosynthesis", "🌱",
    "Green plants make food through photosynthesis using sunlight, water, and carbon dioxide.",
    "Roots absorb water, while leaves capture sunlight for photosynthesis.",
    [
      q("What is the process by which plants make food?", ["Digestion", "Respiration", "Photosynthesis", "Evaporation"], 2, "Plants make food through photosynthesis."),
      q("Which pigment captures light?", ["Chlorophyll", "Haemoglobin", "Melanin", "Keratin"], 0, "Chlorophyll absorbs light."),
      q("Which gas do plants use during photosynthesis?", ["Oxygen", "Carbon dioxide", "Hydrogen", "Nitrogen"], 1, "Plants use carbon dioxide to make food."),
      q("Which part mainly absorbs water?", ["Flower", "Fruit", "Leaf", "Roots"], 3, "Roots absorb water from the soil."),
      q("Which gas is released during photosynthesis?", ["Oxygen", "Nitrogen", "Methane", "Hydrogen"], 0, "Oxygen is released during photosynthesis.")
    ]),

  force: topic("Force and Pressure", "🚀",
    "Force is a push or pull. Pressure describes how much force acts on a given area.",
    "A sharp pin has a small tip, so the same force creates greater pressure.",
    [
      q("What is force?", ["A colour", "A temperature", "A push or pull", "A sound"], 2, "A force is a push or pull."),
      q("How is pressure calculated?", ["Area ÷ force", "Force ÷ area", "Force × time", "Mass ÷ volume"], 1, "Pressure equals force divided by area."),
      q("What is the SI unit of pressure?", ["Pascal", "Metre", "Newton", "Joule"], 0, "Pressure is measured in pascals."),
      q("Friction generally opposes what?", ["Light", "Sound", "Mass", "Relative motion"], 3, "Friction opposes relative motion between surfaces."),
      q("How can pressure be reduced for the same force?", ["Decrease area", "Increase area", "Increase force", "Remove the object"], 1, "Increasing the area reduces pressure.")
    ]),

  motion: topic("Motion", "🏃",
    "Motion is a change in an object's position over time. Speed tells us how much distance is travelled per unit of time.",
    "Speed = distance ÷ time. Travelling 100 metres in 20 seconds gives 5 m/s.",
    [
      q("How is speed calculated?", ["Distance ÷ time", "Time ÷ distance", "Distance × time", "Distance + time"], 0, "Speed equals distance divided by time."),
      q("What is the SI unit of speed?", ["Kilogram", "Metre per second", "Newton", "Second"], 1, "Speed is measured in metres per second."),
      q("What is the speed for 100 m in 20 s?", ["2 m/s", "4 m/s", "5 m/s", "10 m/s"], 2, "100 divided by 20 equals 5."),
      q("What is acceleration?", ["Total distance", "Time taken", "Object's mass", "Rate of change of velocity"], 3, "Acceleration is the rate of change of velocity."),
      q("Uniform motion covers:", ["Equal distances in equal time intervals", "Different distances in equal intervals", "No distance", "Only curved paths"], 0, "Uniform motion covers equal distances in equal time intervals.")
    ]),

  cells: topic("Cells", "🔬",
    "A cell is the basic structural and functional unit of living organisms. Some organisms have one cell, while others have many.",
    "The nucleus controls many cell activities. The cell membrane surrounds the cell.",
    [
      q("What is the basic unit of life?", ["Organ", "Cell", "Tissue", "Bone"], 1, "The cell is the basic unit of life."),
      q("Which part controls many cell activities?", ["Nucleus", "Cell wall", "Vacuole", "Cytoplasm only"], 0, "The nucleus contains genetic material and helps control cell activities."),
      q("Which structure surrounds an animal cell?", ["Chlorophyll", "Root", "Cell membrane", "Flower"], 2, "The cell membrane surrounds the cell."),
      q("Which structure is present in plant cells but not animal cells?", ["Nucleus", "Cytoplasm", "Cell membrane", "Cell wall"], 3, "Plant cells have a cell wall."),
      q("An organism made of one cell is called:", ["Unicellular", "Multicellular", "Non-living", "A tissue"], 0, "Unicellular organisms consist of one cell.")
    ]),

  chemical: topic("Chemical Reactions", "🧪",
    "A chemical reaction changes substances into new substances. Starting substances are reactants and substances formed are products.",
    "Rusting of iron is a chemical change involving iron, oxygen, and moisture.",
    [
      q("What are starting substances called?", ["Reactants", "Products", "Mixtures", "Solutions"], 0, "Reactants are present at the start."),
      q("Why should an equation be balanced?", ["To change substances", "To remove atoms", "To keep each type of atom equal on both sides", "To increase mass"], 2, "Atoms are conserved in a chemical reaction."),
      q("Rusting of iron is an example of:", ["Freezing", "Oxidation", "Melting", "Boiling"], 1, "Rusting involves oxidation."),
      q("An exothermic reaction generally:", ["Absorbs heat", "Stops motion", "Creates matter", "Releases energy"], 3, "Exothermic reactions release energy."),
      q("What are products?", ["Starting substances", "Substances formed in a reaction", "Measuring tools", "Forces"], 1, "Products are the substances formed.")
    ]),

  light: topic("Light", "💡",
    "Light allows us to see objects. Reflection occurs when light bounces off a surface.",
    "A plane mirror forms an upright image that appears as far behind the mirror as the object is in front.",
    [
      q("What is reflection?", ["Bending of sound", "Absorption of all light", "Bouncing of light from a surface", "Production of heat"], 2, "Reflection is the bouncing back of light."),
      q("Which surface is a good reflector?", ["Rough cloth", "A polished mirror", "Paper tissue", "Soil"], 1, "A polished mirror reflects light well."),
      q("What kind of image does a plane mirror form?", ["Always inverted vertically", "Always smaller", "Always larger", "Upright and virtual"], 3, "A plane mirror forms an upright virtual image."),
      q("Which object emits its own light?", ["The Sun", "The Moon", "A mirror", "A book"], 0, "The Sun produces its own light."),
      q("A shadow forms when an object:", ["Creates water", "Blocks light", "Makes sound", "Changes its mass"], 1, "An opaque object blocks light and can form a shadow.")
    ]),

  // SOCIAL STUDIES
  maps: topic("Maps and Directions", "🗺️",
    "A map represents a place on a flat surface. Maps use symbols, directions, and scales to show information.",
    "North is commonly shown at the top of a map. A map key explains its symbols.",
    [
      q("What does a map key explain?", ["The weather", "Map symbols", "The population only", "Time"], 1, "A map key explains the symbols used on a map."),
      q("Which direction is opposite to north?", ["East", "West", "South", "North-east"], 2, "South is opposite to north."),
      q("What does a map scale show?", ["The relationship between map distance and real distance", "The map's colour", "The date only", "The temperature"], 0, "A scale compares map distance with real distance."),
      q("Which tool shows directions?", ["Compass", "Thermometer", "Clock", "Ruler only"], 0, "A compass helps identify directions."),
      q("Which map commonly shows mountains and rivers?", ["Political map only", "Route timetable", "Population list", "Physical map"], 3, "A physical map shows natural features.")
    ]),

  earth: topic("Earth and Its Movements", "🌍",
    lessonEarth(),
    "Earth rotates on its axis and revolves around the Sun.",
    [
      q("What causes day and night?", ["Earth's rotation", "Earth's revolution alone", "The Moon's colour", "Clouds"], 0, "Earth's rotation causes day and night."),
      q("What does Earth revolve around?", ["The Moon", "The Sun", "Mars", "Jupiter"], 1, "Earth revolves around the Sun."),
      q("About how long does Earth take to rotate once?", ["One month", "One year", "One day", "One week"], 2, "One rotation takes about 24 hours."),
      q("What is Earth's natural satellite?", ["Mars", "Venus", "The Sun", "The Moon"], 3, "The Moon is Earth's natural satellite."),
      q("Which model represents Earth?", ["Globe", "Thermometer", "Compass", "Clock"], 0, "A globe is a model of Earth.")
    ]),

  resources: topic("Natural Resources", "🌳",
    "Natural resources come from nature. They include water, air, soil, sunlight, forests, and minerals.",
    "Saving water, planting trees, and recycling help conserve resources.",
    [
      q("Which is a renewable resource?", ["Coal", "Petroleum", "Sunlight", "Natural gas"], 2, "Sunlight is renewable."),
      q("Which resource is needed for breathing?", ["Plastic", "Air", "Iron", "Coal"], 1, "Humans need oxygen from air to breathe."),
      q("Which action helps conserve water?", ["Leaving taps open", "Washing roads with hoses", "Ignoring leaks", "Fixing leaking taps"], 3, "Fixing leaks prevents water waste."),
      q("Which is a fossil fuel?", ["Coal", "Sunlight", "Wind", "Flowing water"], 0, "Coal is a fossil fuel."),
      q("Why should forests be protected?", ["Only for decoration", "They support wildlife and help ecosystems", "They stop all rain", "They use no resources"], 1, "Forests support biodiversity and ecological balance.")
    ]),

  history: topic("History and Heritage", "🏛️",
    "History studies people, events, and societies of the past. Historians use written records, objects, and monuments as evidence.",
    "An inscription or an old coin can help us learn about the past.",
    [
      q("What does history study?", ["Only future events", "Weather forecasts", "People and events of the past", "Only mathematics"], 2, "History studies past people and events."),
      q("Which can be a historical source?", ["A new plastic bag", "An old inscription", "A blank page", "A modern calculator only"], 1, "Inscriptions provide evidence about the past."),
      q("Who studies historical evidence?", ["Historians", "Astronauts only", "Chefs only", "Pilots only"], 0, "Historians study evidence from the past."),
      q("What is heritage?", ["Only new buildings", "Only money", "A weather condition", "Things passed down from earlier generations"], 3, "Heritage includes inherited cultural and historical features."),
      q("Why preserve historical monuments?", ["To erase history", "To prevent people learning", "To protect cultural and historical heritage", "To change the past"], 2, "Preservation protects historical heritage.")
    ]),

  civics: topic("The Constitution", "⚖️",
    "A constitution establishes the basic rules and principles for governing a country and defines citizens' rights and government responsibilities.",
    "India's Constitution came into effect on 26 January 1950.",
    [
      q("When did India's Constitution come into effect?", ["15 August 1947", "26 January 1950", "2 October 1948", "26 November 1949"], 1, "It came into effect on 26 January 1950."),
      q("What does a constitution establish?", ["Rules and principles of governance", "Daily weather", "School lunch menus", "Sports scores"], 0, "It lays out the basic framework of government."),
      q("India is described as a:", ["Monarchy", "Military kingdom", "Democratic republic", "Colonial empire"], 2, "India is a sovereign democratic republic."),
      q("Which document protects constitutional rights?", ["A shopping list", "A timetable", "A map key", "The Constitution"], 3, "The Constitution establishes important rights and protections."),
      q("Who is the source of democratic political power in India?", ["The people", "One private company", "A foreign ruler", "A single family"], 0, "Democracy derives political authority from the people.")
    ]),

  democracy: topic("Democracy and Government", "🏛️",
    "Democracy is a system in which people participate in choosing their representatives. Elections allow voters to select leaders.",
    "Citizens vote in elections to choose their representatives.",
    [
      q("What is a key feature of democracy?", ["Rule by one unelected person forever", "Public participation in choosing representatives", "No laws", "No public voice"], 1, "Democracy involves people in choosing representatives."),
      q("What is an election used for?", ["Measuring rainfall", "Drawing maps", "Choosing representatives", "Making food"], 2, "Elections allow people to select representatives."),
      q("Who can vote in India's general elections if eligible?", ["Any tourist regardless of age", "Only teachers", "Only government employees", "Eligible citizens aged 18 or above"], 3, "Eligible Indian citizens can vote from age 18."),
      q("What is the role of a legislature?", ["Making laws", "Predicting earthquakes", "Growing crops", "Printing every book"], 0, "Legislatures make laws."),
      q("Why is voting important?", ["It removes all responsibilities", "It allows citizens to participate in choosing leaders", "It ends all disagreement", "It replaces courts"], 1, "Voting is one way citizens participate in democracy.")
    ]),

  // ENGLISH
  nouns: topic("Nouns and Pronouns", "📚",
    "A noun names a person, place, animal, or thing. A pronoun is used instead of a noun.",
    "Ravi is a boy. He is kind. Ravi is a noun and he is a pronoun.",
    [
      q("Find the noun: 'The cat sleeps.'", ["The", "Cat", "Sleeps", "None"], 1, "Cat names an animal."),
      q("Which word is a pronoun?", ["School", "Table", "She", "Book"], 2, "She is a pronoun."),
      q("What is the plural of book?", ["Books", "Bookes", "Bookies", "Book"], 0, "The plural is books."),
      q("Which is a proper noun?", ["City", "Girl", "River", "India"], 3, "India is the name of a specific country."),
      q("Choose the correct sentence.", ["He are happy.", "He is happy.", "He am happy.", "He be happy."], 1, "He is happy is grammatically correct.")
    ]),

  tenses: topic("Tenses", "✍️",
    "Tenses show when an action happens: in the past, present, or future.",
    "Past: played. Present: play. Future: will play.",
    [
      q("What is the past tense of eat?", ["Ate", "Eats", "Eating", "Eat"], 0, "The simple past tense is ate."),
      q("Choose the correct sentence.", ["She go to school.", "She going to school.", "She goes to school.", "She gone school."], 2, "She goes to school is correct."),
      q("'They are playing' is in which tense?", ["Simple past", "Present continuous", "Simple future", "Past perfect"], 1, "Are playing is present continuous."),
      q("Complete: 'I ___ help tomorrow.'", ["Did", "Am", "Was", "Will"], 3, "Will help expresses a future action."),
      q("Choose the correct sentence.", ["He have a book.", "He has a book.", "He having a book.", "He haves a book."], 1, "He has a book is correct.")
    ]),

  vocabulary: topic("Vocabulary", "📝",
    "Vocabulary means the words we know and use. Synonyms have similar meanings, while antonyms have opposite meanings.",
    "Happy and joyful are synonyms. Hot and cold are antonyms.",
    [
      q("What is a synonym of happy?", ["Sad", "Joyful", "Angry", "Tired"], 1, "Joyful means happy."),
      q("What is the opposite of ancient?", ["Old", "Historic", "Modern", "Past"], 2, "Modern is the opposite of ancient."),
      q("What does enormous mean?", ["Tiny", "Very large", "Very quiet", "Very quick"], 1, "Enormous means extremely large."),
      q("Choose a synonym for begin.", ["Start", "Finish", "Stop", "Close"], 0, "Start and begin have similar meanings."),
      q("What is the opposite of generous?", ["Kind", "Helpful", "Selfish", "Friendly"], 2, "Selfish is the opposite of generous.")
    ]),

  comprehension: topic("Reading Comprehension", "📖",
    "Reading comprehension means understanding a passage and answering questions using information from it.",
    "Passage: Mina waters her plants every morning. Question: What does Mina water? Answer: Her plants.",
    [
      q("What is reading comprehension?", ["Copying every word", "Understanding a passage", "Counting letters only", "Writing numbers"], 1, "Comprehension checks understanding of a text."),
      q("Passage: Ravi walks to school. How does Ravi travel?", ["By plane", "By boat", "On foot", "By train"], 2, "The passage says Ravi walks."),
      q("Where should you look for an answer about a passage?", ["In the passage", "Only in the title", "In a random book", "Nowhere"], 0, "Use information from the given passage."),
      q("What does a title usually help identify?", ["The author's age", "The number of pages", "The font size", "The main topic"], 3, "A title often indicates the main topic."),
      q("If a passage says 'It rained, so the match stopped', why did the match stop?", ["The players left early", "Because it rained", "It was night", "The ball was lost"], 1, "The passage states that rain stopped the match.")
    ]),

  voice: topic("Active and Passive Voice", "✍️",
    "In active voice, the subject performs the action. In passive voice, the subject receives the action.",
    "Active: Ram writes a letter. Passive: A letter is written by Ram.",
    [
      q("Choose the passive form of 'Ram writes a letter.'", ["A letter writes Ram.", "Ram is written by a letter.", "A letter is written by Ram.", "A letter was writing Ram."], 2, "The object becomes the subject in passive voice."),
      q("In active voice, who usually performs the action?", ["The subject", "The object only", "The punctuation mark", "The adjective"], 0, "The subject performs the action."),
      q("Choose the passive form of 'She cleaned the room.'", ["She was cleaned by the room.", "The room cleaned her.", "The room is cleaning.", "The room was cleaned by her."], 3, "The room receives the action."),
      q("Which sentence is active voice?", ["The cake was baked by Ana.", "Ana baked the cake.", "The cake is being baked.", "The work was done."], 1, "Ana is the subject performing the action."),
      q("Passive voice commonly uses a form of:", ["Only an adjective", "Only a noun", "Be + past participle", "Only a preposition"], 2, "Passive forms commonly use be and a past participle.")
    ]),

  // HINDI
  hindiNoun: topic("संज्ञा", "📚",
    "संज्ञा किसी व्यक्ति, स्थान, वस्तु या भाव के नाम को कहते हैं।",
    "राम, दिल्ली, पुस्तक और खुशी संज्ञा के उदाहरण हैं।",
    [
      q("संज्ञा किसे कहते हैं?", ["काम के नाम को", "व्यक्ति, स्थान, वस्तु या भाव के नाम को", "गुण बताने वाले शब्द को", "जोड़ने वाले शब्द को"], 1, "संज्ञा नाम बताने वाला शब्द है।"),
      q("'राम विद्यालय जाता है' में संज्ञा कौन है?", ["जाता", "है", "राम", "में"], 2, "राम व्यक्ति का नाम है।"),
      q("कौन-सा शब्द किसी स्थान का नाम है?", ["खेलना", "सुंदर", "जल्दी", "दिल्ली"], 3, "दिल्ली एक स्थान का नाम है।"),
      q("'पुस्तक' किसका नाम है?", ["वस्तु", "क्रिया", "गुण", "सर्वनाम"], 0, "पुस्तक एक वस्तु का नाम है।"),
      q("कौन-सा शब्द भाववाचक संज्ञा है?", ["किताब", "ईमानदारी", "मोहन", "शहर"], 1, "ईमानदारी एक भाव या गुण का नाम है।")
    ]),

  hindiPronoun: topic("सर्वनाम", "📝",
    "संज्ञा के स्थान पर प्रयोग होने वाले शब्द सर्वनाम कहलाते हैं।",
    "राम पढ़ता है। वह मेहनती है। यहाँ 'वह' सर्वनाम है।",
    [
      q("सर्वनाम किसके स्थान पर आता है?", ["क्रिया", "विशेषण", "संज्ञा", "विराम चिह्न"], 2, "सर्वनाम संज्ञा के स्थान पर आता है।"),
      q("कौन-सा शब्द सर्वनाम है?", ["सुंदर", "वह", "दौड़ना", "किताब"], 1, "वह एक सर्वनाम है।"),
      q("'मैं विद्यालय जाता हूँ' में सर्वनाम कौन है?", ["विद्यालय", "जाता", "हूँ", "मैं"], 3, "मैं बोलने वाले के लिए प्रयोग हुआ है।"),
      q("कौन-सा शब्द व्यक्ति की ओर संकेत कर सकता है?", ["वे", "पेड़", "लाल", "खेल"], 0, "वे एक सर्वनाम है।"),
      q("रिक्त स्थान भरें: ___ मेरी मित्र है।", ["खेल", "वह", "सुंदर", "दौड़"], 1, "वह मेरी मित्र है।")
    ]),

  hindiVerb: topic("क्रिया", "✍️",
    "जिस शब्द से किसी काम के करने या होने का पता चलता है, उसे क्रिया कहते हैं।",
    "खाना, पढ़ना और दौड़ना क्रिया के उदाहरण हैं।",
    [
      q("क्रिया क्या बताती है?", ["स्थान का नाम", "काम या होने की स्थिति", "व्यक्ति का नाम", "रंग का नाम"], 1, "क्रिया काम या स्थिति बताती है।"),
      q("कौन-सा शब्द क्रिया है?", ["किताब", "सुंदर", "दौड़ना", "नीला"], 2, "दौड़ना एक काम को बताता है।"),
      q("'सीमा गाना गाती है' में क्रिया कौन है?", ["सीमा", "गाना गाती है", "में", "कोई नहीं"], 1, "गाना गाती है काम को बताता है।"),
      q("रिक्त स्थान भरें: बच्चे मैदान में ___ हैं।", ["मीठा", "लाल", "किताब", "खेल रहे"], 3, "खेल रहे हैं क्रिया है।"),
      q("कौन-सा शब्द काम बताता है?", ["पढ़ना", "घर", "मेज़", "हरा"], 0, "पढ़ना एक काम है।")
    ]),

  hindiSynonym: topic("पर्यायवाची शब्द", "📖",
    "जिन शब्दों के अर्थ समान या मिलते-जुलते होते हैं, उन्हें पर्यायवाची शब्द कहते हैं।",
    "सूर्य के पर्यायवाची शब्दों में रवि और सूरज शामिल हैं।",
    [
      q("'सूर्य' का पर्यायवाची क्या है?", ["रात", "रवि", "जल", "धरती"], 1, "रवि सूर्य का पर्यायवाची है।"),
      q("'जल' का समान अर्थ वाला शब्द कौन-सा है?", ["आकाश", "अग्नि", "पानी", "वायु"], 2, "जल और पानी के अर्थ समान हैं।"),
      q("'पृथ्वी' का पर्यायवाची कौन-सा है?", ["धरती", "बादल", "तारा", "पर्वत"], 0, "धरती पृथ्वी का पर्यायवाची है।"),
      q("'वन' का समान अर्थ वाला शब्द कौन-सा है?", ["नगर", "घर", "विद्यालय", "जंगल"], 3, "वन और जंगल के अर्थ समान हैं।"),
      q("'मित्र' का पर्यायवाची कौन-सा है?", ["शत्रु", "दोस्त", "पथ", "वर्षा"], 1, "मित्र और दोस्त के अर्थ समान हैं।")
    ]),

  hindiAntonym: topic("विलोम शब्द", "📝",
    "जिन शब्दों के अर्थ एक-दूसरे के विपरीत होते हैं, उन्हें विलोम शब्द कहते हैं।",
    "दिन का विलोम रात है।",
    [
      q("'दिन' का विलोम क्या है?", ["सुबह", "शाम", "रात", "प्रकाश"], 2, "दिन का विलोम रात है।"),
      q("'अच्छा' का विलोम क्या है?", ["बुरा", "सुंदर", "साफ", "सही"], 0, "अच्छा का विलोम बुरा है।"),
      q("'ऊपर' का विलोम क्या है?", ["आगे", "पास", "दूर", "नीचे"], 3, "ऊपर का विलोम नीचे है।"),
      q("'सुख' का विलोम क्या है?", ["हँसी", "दुख", "आनंद", "प्रेम"], 1, "सुख का विलोम दुख है।"),
      q("'नया' का विलोम क्या है?", ["पुराना", "ताज़ा", "आधुनिक", "सुंदर"], 0, "नया का विलोम पुराना है।")
    ]),

  // TELUGU
  teluguNoun: topic("నామవాచకాలు", "📚",
    "వ్యక్తి, ప్రదేశం, వస్తువు లేదా భావం పేరును తెలిపే పదాన్ని నామవాచకం అంటారు.",
    "రాము, హైదరాబాద్, పుస్తకం నామవాచకాలకు ఉదాహరణలు.",
    [
      q("నామవాచకం అంటే ఏమిటి?", ["పని తెలిపే పదం", "పేరు తెలిపే పదం", "గుణం తెలిపే పదం", "కలిపే పదం"], 1, "పేరు తెలిపే పదాన్ని నామవాచకం అంటారు."),
      q("క్రింది వాటిలో వ్యక్తి పేరు ఏది?", ["పరుగెత్తు", "అందమైన", "రాము", "త్వరగా"], 2, "రాము ఒక వ్యక్తి పేరు."),
      q("ప్రదేశం పేరు ఏది?", ["హైదరాబాద్", "తిను", "నీలం", "మంచి"], 0, "హైదరాబాద్ ఒక ప్రదేశం పేరు."),
      q("'పుస్తకం' ఏది?", ["క్రియ", "విశేషణం", "సర్వనామం", "వస్తువు పేరు"], 3, "పుస్తకం ఒక వస్తువు పేరు."),
      q("భావాన్ని తెలిపే పదం ఏది?", ["చెట్టు", "ఆనందం", "పాఠశాల", "రాము"], 1, "ఆనందం ఒక భావాన్ని సూచిస్తుంది.")
    ]),

  teluguPronoun: topic("సర్వనామాలు", "📝",
    "నామవాచకానికి బదులుగా ఉపయోగించే పదాలను సర్వనామాలు అంటారు.",
    "రాము వచ్చాడు. అతను చదువుతున్నాడు. ఇక్కడ 'అతను' సర్వనామం.",
    [
      q("సర్వనామం దేనికి బదులుగా ఉపయోగిస్తారు?", ["క్రియకు", "విరామ చిహ్నానికి", "నామవాచకానికి", "గుణానికి"], 2, "సర్వనామం నామవాచకానికి బదులుగా వస్తుంది."),
      q("క్రింది వాటిలో సర్వనామం ఏది?", ["పుస్తకం", "అతను", "పరుగెత్తు", "మంచి"], 1, "అతను ఒక సర్వనామం."),
      q("'నేను పాఠశాలకు వెళ్తాను'లో సర్వనామం ఏది?", ["పాఠశాలకు", "వెళ్తాను", "లో", "నేను"], 3, "నేను మాట్లాడే వ్యక్తిని సూచిస్తుంది."),
      q("బహువచన సర్వనామం ఏది?", ["వారు", "చెట్టు", "ఆడు", "మంచిది"], 0, "వారు అనేకమందిని సూచించవచ్చు."),
      q("ఖాళీని పూరించండి: ___ నా స్నేహితుడు.", ["ఆడటం", "అతను", "పచ్చని", "పుస్తకం"], 1, "అతను నా స్నేహితుడు.")
    ]),

  teluguVerb: topic("క్రియలు", "✍️",
    "పని లేదా చర్యను తెలిపే పదాన్ని క్రియ అంటారు.",
    "చదవడం, ఆడడం, పరుగెత్తడం క్రియలకు ఉదాహరణలు.",
    [
      q("క్రియ ఏమి తెలియజేస్తుంది?", ["వ్యక్తి పేరు", "ప్రదేశం", "పని లేదా చర్య", "రంగు"], 2, "క్రియ పని లేదా చర్యను తెలియజేస్తుంది."),
      q("క్రియ పదం ఏది?", ["పుస్తకం", "చదవడం", "పచ్చని", "ఇల్లు"], 1, "చదవడం ఒక చర్య."),
      q("'రాము పరిగెడుతున్నాడు'లో క్రియ ఏది?", ["రాము", "లో", "ఏదీ కాదు", "పరిగెడుతున్నాడు"], 3, "పరిగెడుతున్నాడు చర్యను తెలియజేస్తుంది."),
      q("ఖాళీని పూరించండి: పిల్లలు మైదానంలో ___.", ["ఆడుతున్నారు", "నీలం", "పుస్తకం", "ఇల్లు"], 0, "ఆడుతున్నారు క్రియ."),
      q("చర్యను తెలిపే పదం ఏది?", ["చెట్టు", "ఆడటం", "ఎరుపు", "పాఠశాల"], 1, "ఆడటం ఒక చర్య.")
    ]),

  teluguSynonym: topic("పర్యాయపదాలు", "📖",
    "ఒకే అర్థాన్ని లేదా దగ్గర అర్థాన్ని తెలిపే పదాలను పర్యాయపదాలు అంటారు.",
    "సూర్యుడికి భానుడు అనే పర్యాయపదం ఉంది.",
    [
      q("సూర్యుడికి పర్యాయపదం ఏది?", ["చంద్రుడు", "రాత్రి", "భానుడు", "నీరు"], 2, "భానుడు సూర్యుడికి పర్యాయపదం."),
      q("నీటికి సమానార్థక పదం ఏది?", ["జలం", "అగ్ని", "గాలి", "నేల"], 0, "జలం, నీరు ఒకే అర్థంలో వాడతారు."),
      q("భూమికి పర్యాయపదం ఏది?", ["ఆకాశం", "వాయువు", "చంద్రుడు", "ధరణి"], 3, "ధరణి భూమికి పర్యాయపదం."),
      q("స్నేహితుడికి దగ్గర అర్థం ఇచ్చే పదం ఏది?", ["శత్రువు", "మిత్రుడు", "పర్వతం", "వర్షం"], 1, "మిత్రుడు స్నేహితుడికి సమానార్థక పదం."),
      q("అడవికి దగ్గర అర్థం ఇచ్చే పదం ఏది?", ["వనం", "నగరం", "పాఠశాల", "సముద్రం"], 0, "వనం అడవికి పర్యాయపదం.")
    ]),

  teluguAntonym: topic("వ్యతిరేక పదాలు", "📝",
    "వ్యతిరేక అర్థాలను తెలిపే పదాలను వ్యతిరేక పదాలు అంటారు.",
    "వెలుగు అనే పదానికి వ్యతిరేక పదం చీకటి.",
    [
      q("వెలుగుకు వ్యతిరేక పదం ఏది?", ["ఉదయం", "చీకటి", "సూర్యుడు", "దీపం"], 1, "వెలుగుకు వ్యతిరేక పదం చీకటి."),
      q("మంచికి వ్యతిరేక పదం ఏది?", ["సంతోషం", "అందం", "చెడు", "మంచితనం"], 2, "మంచికి వ్యతిరేక పదం చెడు."),
      q("పైనకు వ్యతిరేక పదం ఏది?", ["కింద", "ముందు", "వెనుక", "పక్క"], 0, "పైనకు వ్యతిరేక పదం కింద."),
      q("పెద్దకు వ్యతిరేక పదం ఏది?", ["ఎక్కువ", "విశాలం", "పొడవు", "చిన్న"], 3, "పెద్దకు వ్యతిరేక పదం చిన్న."),
      q("సుఖానికి వ్యతిరేక పదం ఏది?", ["ఆనందం", "దుఃఖం", "ప్రేమ", "శాంతి"], 1, "సుఖానికి వ్యతిరేక పదం దుఃఖం.")
    ])
};

// Choose which topics appear for each class and subject.
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
    Mathematics: ["decimals", "integers"],
    Science: ["plants", "force"],
    "Social Studies": ["maps", "resources"],
    English: ["nouns", "tenses"],
    Hindi: ["hindiNoun", "hindiVerb"],
    Telugu: ["teluguNoun", "teluguVerb"]
  },

  "Class 8": {
    Mathematics: ["integers", "rational", "algebra"],
    Science: ["force", "cells"],
    "Social Studies": ["earth", "resources", "history"],
    English: ["tenses", "vocabulary"],
    Hindi: ["hindiPronoun", "hindiSynonym"],
    Telugu: ["teluguPronoun", "teluguSynonym"]
  },

  "Class 9": {
    Mathematics: ["rational", "algebra", "geometry"],
    Science: ["motion", "cells"],
    "Social Studies": ["history", "civics"],
    English: ["voice", "comprehension"],
    Hindi: ["hindiSynonym", "hindiAntonym"],
    Telugu: ["teluguSynonym", "teluguAntonym"]
  },

  "Class 10": {
    Mathematics: ["algebra", "geometry", "quadratic"],
    Science: ["chemical", "light"],
    "Social Studies": ["civics", "democracy"],
    English: ["voice", "comprehension"],
    Hindi: ["hindiAntonym", "hindiVerb"],
    Telugu: ["teluguAntonym", "teluguVerb"]
  }
};

// A few extra Social Studies topics.
content.earth = topic("Earth and Its Movements", "🌍",
  "Earth rotates on its axis and revolves around the Sun.",
  "Earth's rotation causes day and night.",
  [
    q("What causes day and night?", ["Earth's rotation", "Clouds", "The Moon's colour", "Rain"], 0, "Earth's rotation causes day and night."),
    q("What does Earth revolve around?", ["The Moon", "The Sun", "Mars", "Jupiter"], 1, "Earth revolves around the Sun."),
    q("About how long does Earth take to rotate once?", ["One month", "One year", "One day", "One week"], 2, "Earth takes about 24 hours to rotate once."),
    q("What is Earth's natural satellite?", ["Mars", "Venus", "The Sun", "The Moon"], 3, "The Moon is Earth's natural satellite."),
    q("Which model represents Earth?", ["Globe", "Thermometer", "Clock", "Compass"], 0, "A globe represents Earth.")
  ]);

content.resources = topic("Natural Resources", "🌳",
  "Natural resources come from nature. They include water, air, soil, sunlight, forests, and minerals.",
  "Saving water, planting trees, and recycling help conserve resources.",
  [
    q("Which is a renewable resource?", ["Coal", "Petroleum", "Sunlight", "Natural gas"], 2, "Sunlight is renewable."),
    q("Which resource is needed for breathing?", ["Plastic", "Air", "Iron", "Coal"], 1, "Humans need oxygen from air."),
    q("Which action conserves water?", ["Leaving taps open", "Ignoring leaks", "Wasting clean water", "Fixing leaking taps"], 3, "Fixing leaks prevents water waste."),
    q("Which is a fossil fuel?", ["Coal", "Sunlight", "Wind", "Flowing water"], 0, "Coal is a fossil fuel."),
    q("Why protect forests?", ["Only for decoration", "They support wildlife and ecosystems", "They stop all rain", "They have no value"], 1, "Forests support wildlife and ecological balance.")
  ]);

content.history = topic("History and Heritage", "🏛️",
  "History studies people, events, and societies of the past. Historians use records, objects, and monuments as evidence.",
  "An old coin or an inscription can help us learn about the past.",
  [
    q("What does history study?", ["Only future events", "Weather only", "People and events of the past", "Only mathematics"], 2, "History studies the past."),
    q("Which can be a historical source?", ["A new plastic bag", "An old inscription", "A blank page", "A modern calculator"], 1, "Inscriptions provide evidence about the past."),
    q("Who studies historical evidence?", ["Historians", "Chefs only", "Pilots only", "Singers only"], 0, "Historians study evidence from the past."),
    q("What is heritage?", ["Only new buildings", "Only money", "A weather condition", "Things passed down from earlier generations"], 3, "Heritage is inherited from earlier generations."),
    q("Why preserve historical monuments?", ["To erase history", "To protect historical and cultural heritage", "To prevent learning", "To change the past"], 1, "Preservation protects historical heritage.")
  ]);

content.civics = topic("The Constitution", "⚖️",
  "A constitution establishes the basic rules for governing a country and defines citizens' rights and government responsibilities.",
  "India's Constitution came into effect on 26 January 1950.",
  [
    q("When did India's Constitution come into effect?", ["15 August 1947", "26 January 1950", "2 October 1948", "26 November 1949"], 1, "It came into effect on 26 January 1950."),
    q("What does a constitution establish?", ["Rules of governance", "Daily weather", "Lunch menus", "Sports scores"], 0, "It lays out the basic framework of government."),
    q("India is a:", ["Monarchy", "Colonial empire", "Democratic republic", "Private kingdom"], 2, "India is a democratic republic."),
    q("Which document establishes constitutional rights?", ["A shopping list", "A timetable", "A map key", "The Constitution"], 3, "The Constitution establishes important rights and protections."),
    q("In a democracy, political authority ultimately comes from:", ["The people", "One company", "A foreign ruler", "One family"], 0, "Democratic authority comes from the people.")
  ]);

content.democracy = topic("Democracy", "🏛️",
  "Democracy is a system in which people participate in choosing their representatives. Elections allow eligible voters to select leaders.",
  "Citizens vote in elections to choose their representatives.",
  [
    q("What is a key feature of democracy?", ["No laws", "People choose representatives", "No public voice", "Rule by a permanent unelected leader"], 1, "Democracy involves people in choosing representatives."),
    q("What are elections used for?", ["Measuring rainfall", "Drawing maps", "Choosing representatives", "Making food"], 2, "Elections allow voters to select representatives."),
    q("Who may vote in Indian general elections if eligible?", ["Any visitor", "Only teachers", "Only government workers", "Eligible citizens aged 18 or above"], 3, "Eligible Indian citizens can vote from age 18."),
    q("What does a legislature do?", ["Makes laws", "Predicts earthquakes", "Grows crops", "Prints every book"], 0, "Legislatures make laws."),
    q("Why is voting important?", ["It removes all duties", "It lets citizens participate in choosing leaders", "It ends every disagreement", "It replaces courts"], 1, "Voting is a way citizens participate in democracy.")
  ]);

// Hindi grammar and comprehension
content.hindiGrammar = topic("हिंदी व्याकरण", "📘",
  "व्याकरण भाषा को सही ढंग से बोलने और लिखने के नियम सिखाता है।",
  "सही वाक्य: बच्चे विद्यालय जाते हैं।",
  [
    q("व्याकरण किसमें सहायता करता है?", ["सही भाषा प्रयोग में", "गणना में ही", "चित्र बनाने में ही", "खेलने में ही"], 0, "व्याकरण सही भाषा प्रयोग में सहायता करता है।"),
    q("'सुंदर फूल' में विशेषण कौन-सा है?", ["फूल", "सुंदर", "में", "कोई नहीं"], 1, "सुंदर, फूल की विशेषता बताता है।"),
    q("रिक्त स्थान भरें: बच्चे विद्यालय ___ हैं।", ["जाता", "गई", "जाते", "जाता हूँ"], 2, "बच्चे विद्यालय जाते हैं सही वाक्य है।"),
    q("'और' किस प्रकार का शब्द है?", ["संज्ञा", "क्रिया", "विशेषण", "समुच्चयबोधक"], 3, "'और' शब्दों या विचारों को जोड़ता है।"),
    q("कौन-सा शब्द क्रिया है?", ["लिखना", "हरा", "मेज़", "विद्यालय"], 0, "लिखना एक क्रिया है।")
  ]);

content.hindiComprehension = topic("अपठित गद्यांश", "📖",
  "अपठित गद्यांश पढ़कर उसके अर्थ को समझना और उससे जुड़े प्रश्नों के उत्तर देना होता है।",
  "गद्यांश में दिए गए तथ्यों के आधार पर उत्तर ढूँढ़ें।",
  [
    q("अपठित गद्यांश का उद्देश्य क्या है?", ["केवल नकल करना", "पढ़कर समझना", "केवल गिनती करना", "चित्र बनाना"], 1, "इससे पढ़ने और समझने की क्षमता जाँची जाती है।"),
    q("गद्यांश में उत्तर कहाँ ढूँढ़ना चाहिए?", ["अनुमान से ही", "कहीं भी", "गद्यांश में", "उत्तर नहीं देना"], 2, "उत्तर के लिए गद्यांश की जानकारी पढ़ें।"),
    q("शीर्षक किसका संकेत देता है?", ["लेखक की उम्र", "पृष्ठ संख्या", "अक्षर का आकार", "मुख्य विषय"], 3, "शीर्षक अक्सर मुख्य विषय बताता है।"),
    q("यदि गद्यांश कहता है कि बारिश से मैच रुका, मैच क्यों रुका?", ["बारिश के कारण", "परीक्षा के कारण", "रात होने से", "किताब खोने से"], 0, "गद्यांश में बारिश का कारण दिया गया है।"),
    q("गद्यांश पढ़ते समय क्या करना चाहिए?", ["केवल पहली पंक्ति पढ़ना", "मुख्य विचार समझना", "हर शब्द भूल जाना", "केवल अक्षर गिनना"], 1, "मुख्य विचार समझने से उत्तर ढूँढ़ना आसान होता है।")
  ]);

// Telugu grammar and comprehension
content.teluguGrammar = topic("తెలుగు వ్యాకరణం", "📘",
  "వ్యాకరణం భాషను సరిగ్గా మాట్లాడటం, రాయటం నేర్పుతుంది.",
  "సరైన వాక్యం: పిల్లలు పాఠశాలకు వెళ్తారు.",
  [
    q("వ్యాకరణం దేనికి ఉపయోగపడుతుంది?", ["సరిగ్గా భాష వాడటానికి", "గణితం చేయడానికి మాత్రమే", "చిత్రాలు గీయడానికి", "ఆటలకు మాత్రమే"], 0, "వ్యాకరణం భాషను సరిగ్గా ఉపయోగించడంలో సహాయపడుతుంది."),
    q("'మంచి పుస్తకం'లో విశేషణం ఏది?", ["పుస్తకం", "మంచి", "లో", "ఏదీ కాదు"], 1, "మంచి అనే పదం పుస్తకం యొక్క గుణాన్ని చెబుతుంది."),
    q("ఖాళీని పూరించండి: పిల్లలు పాఠశాలకు ___.", ["వెళ్తాడు", "వెళ్లింది", "వెళ్తారు", "వెళ్లాను"], 2, "పిల్లలు పాఠశాలకు వెళ్తారు సరైన వాక్యం."),
    q("'మరియు' అనే పదం సాధారణంగా ఏమి చేస్తుంది?", ["పేరు చెబుతుంది", "చర్య చెబుతుంది", "రంగు చెబుతుంది", "పదాలను కలుపుతుంది"], 3, "మరియు పదాలను లేదా భావాలను కలుపుతుంది."),
    q("క్రియ పదం ఏది?", ["చదవడం", "పచ్చని", "బల్ల", "పాఠశాల"], 0, "చదవడం ఒక క్రియ.")
  ]);

content.teluguComprehension = topic("పఠన అవగాహన", "📖",
  "పఠన అవగాహన అంటే చదివిన విషయాన్ని అర్థం చేసుకుని ప్రశ్నలకు సమాధానాలు చెప్పడం.",
  "పాఠ్యంలో ఇచ్చిన సమాచారాన్ని ఉపయోగించి సమాధానం కనుగొనండి.",
  [
    q("పఠన అవగాహన అంటే ఏమిటి?", ["నకలు చేయడం", "చదివిన విషయాన్ని అర్థం చేసుకోవడం", "అక్షరాలు లెక్కించడం", "చిత్రం వేయడం"], 1, "చదివిన విషయాన్ని అర్థం చేసుకోవడమే పఠన అవగాహన."),
    q("సమాధానం కోసం ఎక్కడ చూడాలి?", ["అంచనాలో మాత్రమే", "ఎక్కడైనా", "పాఠ్యంలో", "చూడకూడదు"], 2, "పాఠ్యంలో ఉన్న సమాచారాన్ని ఉపయోగించాలి."),
    q("శీర్షిక ఏమి తెలియజేస్తుంది?", ["రచయిత వయస్సు", "పేజీ సంఖ్య", "అక్షర పరిమాణం", "ప్రధాన విషయం"], 3, "శీర్షిక సాధారణంగా ప్రధాన విషయాన్ని తెలియజేస్తుంది."),
    q("వర్షం వల్ల ఆట ఆగిందని పాఠ్యంలో ఉంటే ఆట ఎందుకు ఆగింది?", ["వర్షం వల్ల", "పరీక్ష వల్ల", "రాత్రి వల్ల", "పుస్తకం వల్ల"], 0, "పాఠ్యంలో వర్షం కారణంగా ఆట ఆగిందని ఉంది."),
    q("పాఠ్యం చదివేటప్పుడు ఏమి తెలుసుకోవాలి?", ["అక్షరాల సంఖ్య మాత్రమే", "ప్రధాన భావం", "మొదటి పదం మాత్రమే", "రంగు మాత్రమే"], 1, "ప్రధాన భావం అర్థం చేసుకోవడం ముఖ్యం.")
  ]);

// Add Hindi and Telugu grammar/comprehension to the catalogue.
content.hindiGrammar = content.hindiGrammar || content.hindiNoun;
content.hindiComprehension = content.hindiComprehension || content.hindiNoun;
content.teluguGrammar = content.teluguGrammar || content.teluguNoun;
content.teluguComprehension = content.teluguComprehension || content.teluguNoun;

// Add two useful language topics to older classes.
classTopics["Class 9"].Hindi.push("hindiGrammar");
classTopics["Class 10"].Hindi = ["hindiAntonym", "hindiGrammar", "hindiComprehension"];
classTopics["Class 9"].Telugu.push("teluguGrammar");
classTopics["Class 10"].Telugu = ["teluguAntonym", "teluguGrammar", "teluguComprehension"];
classTopics["Class 10"].English.push("voice");

// Navigation and quiz state
const pageIds = ["homePage", "topicsPage", "lessonPage", "quizPage", "resultPage", "progressPage"];
const HISTORY_KEY = "saathiSchoolQuizHistory";

let currentClass = "Class 6";
let currentSubject = "Mathematics";
let currentTopic = null;
let currentQuestion = 0;
let selectedAnswer = null;
let score = 0;
let checked = false;

function $(id) {
  return document.getElementById(id);
}

function getTopicIds(className, subject) {
  return classTopics[className]?.[subject] || [];
}

function getTopics(className, subject) {
  return getTopicIds(className, subject)
    .filter(id => content[id])
    .map(id => ({ id, ...content[id] }));
}

function getHistory() {
  try {
    const value = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function saveHistory(history) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch {
    // Progress saving is optional.
  }
}

function showPage(pageId) {
  pageIds.forEach(id => $(id).classList.toggle("hidden", id !== pageId));

  document.querySelectorAll("[data-go]").forEach(button => {
    button.classList.toggle("active", button.dataset.go === pageId);
  });

  if (pageId === "progressPage") renderProgress();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

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
  if (!item) return;

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
    container.textContent = "No sample topics are available for this selection yet.";
  }
}

function startQuiz() {
  currentQuestion = 0;
  selectedAnswer = null;
  score = 0;
  checked = false;

  $("quizTitle").textContent = `${currentClass} · ${currentTopic.name}`;
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

function checkAnswer() {
  const item = currentTopic.questions[currentQuestion];

  if (!checked) {
    if (selectedAnswer === null) return;

    checked = true;

    const correct = selectedAnswer === item.answer;
    if (correct) score++;

    document.querySelectorAll(".option").forEach((label, index) => {
      const radio = label.querySelector("input");
      radio.disabled = true;

      if (index === item.answer) label.classList.add("correct");
      else if (index === selectedAnswer && !correct) label.classList.add("wrong");
    });

    $("feedback").textContent =
      (correct ? "Correct! " : "Not quite. ") + item.explanation;

    $("feedback").style.color = correct ? "#16865c" : "#c44747";

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
    finishQuiz();
  }
}

function getRecommendation(finalScore) {
  if (finalScore <= 2) {
    return {
      level: "Foundation",
      title: "Let's revise the basics.",
      message: "Read the lesson again and try the questions once more.",
      reason: `You answered ${finalScore} out of 5 correctly. Revising the basics may help you understand the topic better.`
    };
  }

  if (finalScore === 3) {
    return {
      level: "Practice",
      title: "Let's practise a little more.",
      message: "Review the explanations and practise similar questions.",
      reason: "You answered 3 out of 5 correctly. More practice may strengthen your understanding."
    };
  }

  return {
    level: "Challenge",
    title: "Good work! Try a challenge.",
    message: "Try a harder example or move to another topic.",
    reason: `You answered ${finalScore} out of 5 correctly. You may be ready for a more challenging activity.`
  };
}

function finishQuiz() {
  const total = currentTopic.questions.length;
  const accuracy = Math.round((score / total) * 100);
  const recommendation = getRecommendation(score);

  $("progressBar").style.width = "100%";
  $("resultTitle").textContent =
    accuracy >= 80 ? "Excellent work!" :
    accuracy >= 60 ? "Good effort!" : "Keep practising!";

  $("resultMessage").textContent =
    `You completed ${currentTopic.name} for ${currentClass}.`;

  $("scoreValue").textContent = `${score}/${total}`;
  $("accuracyValue").textContent = `${accuracy}%`;
  $("recommendationTitle").textContent = recommendation.title;
  $("recommendationText").textContent = recommendation.message;
  $("reasonText").textContent = recommendation.reason;
  $("levelBadge").textContent = recommendation.level;

  const history = getHistory();
  history.unshift({
    className: currentClass,
    subject: currentSubject,
    topic: currentTopic.name,
    score,
    total,
    accuracy,
    level: recommendation.level,
    date: new Date().toLocaleString()
  });

  saveHistory(history.slice(0, 50));
  showPage("resultPage");
}

function renderProgress() {
  const history = getHistory();

  $("roundsValue").textContent = history.length;

  if (!history.length) {
    $("bestValue").textContent = "—";
    $("currentLevel").textContent = "Not started";
    $("historyList").textContent = "Complete a quiz to see your progress.";
    return;
  }

  $("bestValue").textContent =
    `${Math.max(...history.map(item => item.accuracy))}%`;

  $("currentLevel").textContent = history[0].level;

  const list = $("historyList");
  list.innerHTML = "";

  history.slice(0, 10).forEach(item => {
    const row = document.createElement("div");
    row.className = "history-item";

    const details = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent =
      `${item.className} · ${item.subject} · ${item.topic}`;

    const date = document.createElement("p");
    date.textContent = `${item.date} · Recommended: ${item.level}`;

    details.append(title, date);

    const result = document.createElement("span");
    result.className = "history-score";
    result.textContent = `${item.score}/${item.total} (${item.accuracy}%)`;

    row.append(details, result);
    list.appendChild(row);
  });
}

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

// Home dropdowns update the topic choices
$("classSelect").addEventListener("change", () => {
  populateTopics($("classSelect").value, $("subjectSelect").value, "topicSelect");
});

$("subjectSelect").addEventListener("change", () => {
  populateTopics($("classSelect").value, $("subjectSelect").value, "topicSelect");
});

// Start from the home page
$("startBtn").addEventListener("click", () => {
  const name = $("studentName").value.trim();

  try {
    if (name) localStorage.setItem("saathiStudentName", name);
  } catch {
    // Saving the name is optional.
  }

  openLesson(
    $("classSelect").value,
    $("subjectSelect").value,
    $("topicSelect").value
  );
});

$("browseClass").addEventListener("change", renderTopics);
$("browseSubject").addEventListener("change", renderTopics);

$("startQuizBtn").addEventListener("click", startQuiz);
$("answerBtn").addEventListener("click", checkAnswer);
$("restartBtn").addEventListener("click", startQuiz);

$("resultTopicsBtn").addEventListener("click", () => {
  $("browseClass").value = currentClass;
  $("browseSubject").value = currentSubject;
  renderTopics();
  showPage("topicsPage");
});

// Restore the saved student name, if available
try {
  const savedName = localStorage.getItem("saathiStudentName");
  if (savedName) $("studentName").value = savedName;
} catch {
  // The app still works if browser storage is unavailable.
}

// Initialise the app
populateTopics("Class 6", "Mathematics", "topicSelect");
renderTopics();
renderProgress();
showPage("homePage");

// Helper used in the Social Studies sample topic.
function lessonEarth() {
  return "Earth rotates on its axis and revolves around the Sun. These movements help explain day, night, and the year.";
}
