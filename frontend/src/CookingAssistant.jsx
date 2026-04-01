import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Camera,
  Clock,
  ChefHat,
  Check,
  ArrowRight,
  Mic,
  Play,
  Pause,
  Home,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Eye,
  Zap,
  AlertCircle,
  Star,
  Globe,
  Search,
  Filter,
  Flame,
  X,
  ChevronDown,
  BookOpen,
  Award,
  Leaf,
  Fish,
  Beef,
  Soup,
  Coffee,
  Heart,
  TrendingUp,
  Utensils,
  Menu,
} from "lucide-react";

const REGIONS = [
  {
    id: "east-asia",
    name: "East Asia",
    emoji: "🍜",
    color: "#e11d48",
    gradient: "from-rose-600 to-red-700",
    cuisines: ["Japanese", "Chinese", "Korean"],
  },
  {
    id: "southeast-asia",
    name: "Southeast Asia",
    emoji: "🌿",
    color: "#059669",
    gradient: "from-emerald-600 to-teal-700",
    cuisines: ["Thai", "Vietnamese", "Indonesian"],
  },
  {
    id: "south-asia",
    name: "South Asia",
    emoji: "🫙",
    color: "#d97706",
    gradient: "from-amber-600 to-orange-700",
    cuisines: ["Indian", "Pakistani", "Sri Lankan"],
  },
  {
    id: "middle-east",
    name: "Middle East",
    emoji: "🫓",
    color: "#7c3aed",
    gradient: "from-violet-600 to-purple-700",
    cuisines: ["Lebanese", "Turkish", "Persian"],
  },
  {
    id: "mediterranean",
    name: "Mediterranean",
    emoji: "🫒",
    color: "#0284c7",
    gradient: "from-sky-600 to-blue-700",
    cuisines: ["Italian", "Greek", "Spanish"],
  },
  {
    id: "western-europe",
    name: "Western Europe",
    emoji: "🥖",
    color: "#92400e",
    gradient: "from-yellow-700 to-amber-800",
    cuisines: ["French", "German", "British"],
  },
  {
    id: "latin-america",
    name: "Latin America",
    emoji: "🌶️",
    color: "#dc2626",
    gradient: "from-red-600 to-orange-700",
    cuisines: ["Mexican", "Brazilian", "Peruvian"],
  },
  {
    id: "north-africa",
    name: "North Africa",
    emoji: "🏺",
    color: "#c2410c",
    gradient: "from-orange-700 to-red-800",
    cuisines: ["Moroccan", "Egyptian", "Tunisian"],
  },
  {
    id: "sub-saharan",
    name: "Sub-Saharan Africa",
    emoji: "🌍",
    color: "#15803d",
    gradient: "from-green-700 to-emerald-800",
    cuisines: ["Ethiopian", "Nigerian", "South African"],
  },
  {
    id: "north-america",
    name: "North America",
    emoji: "🍔",
    color: "#1d4ed8",
    gradient: "from-blue-700 to-indigo-800",
    cuisines: ["American", "Cajun", "Canadian"],
  },
];

const getRegionById = (regionId) => REGIONS.find((region) => region.id === regionId);
const getRecipeCuisine = (recipe) => recipe?.cuisine || getRegionById(recipe?.region)?.cuisines?.[0] || "Global";

const RECIPES = [

  // EAST ASIA
  {
    id: 1,
    region: "east-asia",
    name: "Tonkotsu Ramen",
    image: "https://source.unsplash.com/800x600/?tonkotsu+ramen+japanese",
    time: "45 min",
    difficulty: "Hard",
    rating: 4.9,
    calories: 620,
    tags: ["Noodles", "Soup", "Pork"],
    description: "Rich creamy pork bone broth with chashu and soft-boiled eggs",
    ingredients: [
      { name: "pork bones", amount: "1 kg", prep: "Blanch in boiling water 5 min, rinse thoroughly to remove impurities" },
      { name: "pork belly (chashu)", amount: "400g", prep: "Roll tightly, tie with twine, sear all sides until golden" },
      { name: "ramen noodles", amount: "2 portions", prep: "Keep dried or fresh — cook to order, do not pre-cook" },
      { name: "soft-boiled eggs", amount: "2", prep: "Boil 6.5 min, ice bath immediately, peel and marinate in soy + mirin 2–4 hrs" },
      { name: "nori sheets", amount: "2 sheets", prep: "Cut into rectangles, keep dry until serving" },
      { name: "bamboo shoots", amount: "100g", prep: "Rinse canned shoots, slice thin, simmer in soy + sugar 10 min" },
      { name: "scallions", amount: "3 stalks", prep: "Slice thinly on diagonal, keep in cold water until serving" },
      { name: "miso paste", amount: "3 tbsp", prep: "No prep — dissolve into broth off heat to preserve enzymes" },
      { name: "garlic", amount: "6 cloves", prep: "Crush with flat of knife, no need to peel for broth" },
      { name: "ginger", amount: "50g", prep: "Slice into coins, char cut side on dry pan until blackened" },
    ],
    steps: [
      {
        text: "Fill a large stockpot with cold water and add 1 kg of pork bones. Bring to a rolling boil over high heat and blanch for exactly 5 minutes — you'll see grey impurities rising to the surface. Drain completely, then rinse each bone thoroughly under cold running water. This step is non-negotiable for a clean, white broth.",
        duration: 10,
        visualCues: ["grey foam rising", "bones rinsed clean"],
        checkpoints: ["water runs clear", "bones clean"],
      },
      {
        text: "Return the cleaned bones to the pot with 3 litres of fresh cold water. Add 6 cloves of crushed garlic and 50g of ginger sliced into coins. Bring to a fierce boil, then maintain a vigorous simmer — not gentle, you want the agitation to turn the broth milky white. Cook for 30 minutes, skimming any foam that rises.",
        duration: 30,
        visualCues: ["milky white broth", "vigorous simmer", "steam rising"],
        checkpoints: ["broth milky white", "no grey foam"],
      },
      {
        text: "While the broth simmers, slice your 400g chashu pork belly into 1.5cm rounds. Halve the 2 marinated soft-boiled eggs, cut your nori sheets into rectangles, drain the 100g bamboo shoots, and slice 3 scallion stalks diagonally. Arrange everything at your station — assembly moves fast.",
        duration: 5,
        visualCues: ["uniform pork slices", "colourful toppings arranged"],
        checkpoints: ["all toppings prepped", "eggs halved cleanly"],
      },
      {
        text: "Bring a separate pot of water to a rolling boil. Cook your ramen noodles for exactly 2 minutes — they should be tender but still have a slight bite, because they'll continue cooking in the hot broth. Drain immediately and divide between your bowls.",
        duration: 3,
        visualCues: ["noodles separating", "slight al dente"],
        checkpoints: ["noodles just tender", "not overcooked"],
      },
      {
        text: "Strain your broth through a fine sieve directly into the serving bowls. Whisk 3 tablespoons of miso paste into the broth until fully dissolved — do this off the heat to preserve the miso's probiotic complexity. Season with 2 tablespoons of soy sauce and a teaspoon of sesame oil. Taste for salt.",
        duration: 2,
        visualCues: ["clear golden broth", "miso dissolving"],
        checkpoints: ["no miso lumps", "seasoned to taste"],
      },
      {
        text: "Ladle the hot broth over the noodles. Working quickly, lay 3 slices of chashu pork to one side, place the halved egg cut-side up in the centre, tuck in a sheet of nori at the edge, arrange the bamboo shoots, and finish with a generous scatter of scallions. Serve immediately — ramen waits for no one.",
        duration: 3,
        visualCues: ["steaming bowl", "toppings arranged artfully"],
        checkpoints: ["broth steaming hot", "beautiful presentation"],
      },
    ],
  },
  {
    id: 2,
    region: "east-asia",
    name: "Peking Duck Pancakes",
    image: "https://source.unsplash.com/800x600/?peking+duck+chinese",
    time: "90 min",
    difficulty: "Hard",
    rating: 4.8,
    calories: 480,
    tags: ["Duck", "Roasted"],
    description: "Crispy lacquered duck with thin pancakes and hoisin sauce",
    ingredients: [
      { name: "whole duck", amount: "1 (about 2kg)", prep: "Air-dry uncovered in fridge 24 hrs on a rack — skin must be completely dry" },
      { name: "hoisin sauce", amount: "4 tbsp", prep: "No prep — serve at room temperature in a small bowl" },
      { name: "spring onions", amount: "6 stalks", prep: "Trim roots, slice into 6cm batons, shred lengthwise into fine strips" },
      { name: "cucumber", amount: "1 whole", prep: "Deseed, cut into matchstick batons 6cm long, keep chilled" },
      { name: "mandarin pancakes", amount: "20", prep: "Steam in bamboo basket 3 min just before serving, keep covered" },
      { name: "five-spice powder", amount: "2 tsp", prep: "Mix with salt and sugar for dry rub" },
      { name: "maltose syrup", amount: "3 tbsp", prep: "Warm gently to loosen, mix with soy sauce and vinegar for glaze" },
      { name: "Shaoxing wine", amount: "2 tbsp", prep: "No prep — add to glaze mixture" },
    ],
    steps: [
      {
        text: "Score the entire surface of your 2kg duck skin in a crosshatch pattern, cutting through the fat but not into the flesh. In a small bowl, combine 2 teaspoons of five-spice powder, 1 teaspoon of salt, and a pinch of sugar — rub this mixture all over the bird, working it into every cavity and crevice.",
        duration: 10,
        visualCues: ["scored skin pattern", "spice rub coating"],
        checkpoints: ["skin fully scored", "even spice coverage"],
      },
      {
        text: "Combine 3 tablespoons of maltose syrup with 2 tablespoons of Shaoxing wine and 1 tablespoon of soy sauce, warming gently until the maltose loosens. Brush this glaze evenly over the entire duck. Place on a wire rack over a tray and refrigerate uncovered for a minimum of 1 hour — the skin needs to feel completely dry and tacky to the touch.",
        duration: 60,
        visualCues: ["glossy glazed skin", "skin drying"],
        checkpoints: ["skin dry and tacky", "glaze set"],
      },
      {
        text: "Preheat your oven to 220°C. Place the duck breast-side up on a roasting rack. Roast for 30 minutes without opening the oven door — the skin needs consistent, fierce heat to lacquer properly. You're looking for a deep mahogany colour, almost the shade of dark caramel.",
        duration: 30,
        visualCues: ["mahogany skin colour", "fat rendering", "sizzling"],
        checkpoints: ["deep mahogany colour", "skin crispy and crackling"],
      },
      {
        text: "Rest the duck for 10 minutes before carving — this is essential. Using a sharp cleaver or boning knife, slice paper-thin pieces ensuring every slice has a portion of that precious crispy skin attached to the flesh. This is the heart of the dish.",
        duration: 10,
        visualCues: ["thin carved slices", "crispy skin intact"],
        checkpoints: ["skin stays attached", "thin uniform slices"],
      },
      {
        text: "Steam your 20 mandarin pancakes in a bamboo basket for 3 minutes until soft and pliable — keep them covered so they don't dry out. Set out your 4 tablespoons of hoisin sauce in a small dish, the spring onion batons, and the cucumber matchsticks. Let your guests build their own parcels: pancake, hoisin, duck, vegetables, then fold and eat immediately.",
        duration: 5,
        visualCues: ["pliable warm pancakes", "garnishes laid out"],
        checkpoints: ["pancakes pliable and warm", "hoisin at room temperature"],
      },
    ],
  },
  {
    id: 3,
    region: "east-asia",
    name: "Korean Bibimbap",
    image: "https://source.unsplash.com/800x600/?bibimbap+korean+rice",
    time: "35 min",
    difficulty: "Medium",
    rating: 4.7,
    calories: 520,
    tags: ["Rice", "Vegetables"],
    description:
      "Colorful mixed rice bowl with sautéed vegetables and gochujang",
    ingredients: [
      { name: "short-grain white rice", amount: "2 cups", prep: "Rinse 3 times until water runs clear, soak 30 min, cook in rice cooker" },
      { name: "beef sirloin", amount: "200g", prep: "Slice paper-thin against grain, marinate in soy + sesame + sugar 30 min" },
      { name: "spinach", amount: "200g", prep: "Blanch 1 min in salted water, squeeze completely dry, season with sesame oil + garlic" },
      { name: "carrots", amount: "1 large", prep: "Julienne into matchsticks, sauté with garlic 2 min until just softened" },
      { name: "zucchini", amount: "1 medium", prep: "Julienne, salt and rest 10 min, squeeze out water, sauté briefly" },
      { name: "shiitake mushrooms", amount: "100g", prep: "Remove stems, slice, sauté in sesame oil until softened" },
      { name: "bean sprouts", amount: "150g", prep: "Blanch 1 min, drain, season with sesame oil and salt" },
      { name: "gochujang", amount: "3 tbsp", prep: "Mix with sesame oil, sugar, vinegar, and water to make bibimbap sauce" },
      { name: "eggs", amount: "2", prep: "Fry sunny-side up in very hot oil — whites crispy, yolk runny" },
      { name: "sesame oil", amount: "2 tbsp", prep: "No prep — drizzle over finished bowl" },
    ],
    steps: [
      {
        text: "Rinse 2 cups of short-grain rice three times until the water runs completely clear — this removes excess starch that would make it gluey. Soak for 30 minutes, then cook in your rice cooker or pot with 2.25 cups of water. Once done, keep it covered for 10 minutes to finish steaming.",
        duration: 40,
        visualCues: ["fluffy cooked rice", "no clumping"],
        checkpoints: ["rice fluffy and separate", "no sticking"],
      },
      {
        text: "Slice 200g of beef sirloin paper-thin against the grain — partially freezing the meat for 20 minutes makes this much easier. In a bowl, combine 2 tablespoons soy sauce, 1 tablespoon sesame oil, 1 teaspoon sugar, and 2 minced garlic cloves. Toss the beef in this marinade and set aside for 30 minutes minimum.",
        duration: 10,
        visualCues: ["thin beef strips", "dark marinade coating"],
        checkpoints: ["evenly coated", "marinating"],
      },
      {
        text: "Now prepare each vegetable separately — this is what makes a great bibimbap. Blanch 200g spinach in well-salted boiling water for 1 minute, then squeeze out every drop of water. Season with 1 teaspoon sesame oil, a pinch of salt, and half a teaspoon of minced garlic. Julienne 1 large carrot and sauté in a teaspoon of oil with garlic for 2 minutes until just softened. Do the same with the sliced zucchini and shiitake mushrooms, seasoning each individually.",
        duration: 20,
        visualCues: ["vibrant separate vegetables", "colourful mise en place"],
        checkpoints: ["spinach completely dry", "vegetables retaining colour"],
      },
      {
        text: "In the same pan over high heat, cook your marinated beef, stirring constantly for 3–4 minutes until caramelised and cooked through. Remove and set aside. In the same pan, fry 2 eggs sunny-side up in a touch of oil — you want the whites crispy at the edges and the yolk still brilliantly runny.",
        duration: 7,
        visualCues: ["caramelised beef", "runny yolk egg"],
        checkpoints: ["beef fully cooked", "yolk still runny"],
      },
      {
        text: "Warm a large bowl or stone pot. Add the rice, then arrange your vegetables in neat separate sections radiating from the centre — this presentation is called 'gujeolpan style'. Place the beef in one section and crown the entire bowl with the fried egg. Mix 3 tablespoons of gochujang with 1 tablespoon sesame oil, 1 teaspoon sugar, and a splash of water for the sauce. Serve on the side, drizzle sesame oil over everything, and scatter sesame seeds. Mix vigorously at the table.",
        duration: 5,
        visualCues: ["colourful arranged bowl", "egg centred on top"],
        checkpoints: ["beautiful colour arrangement", "sauce on side"],
      },
    ],
  },
  {
    id: 4,
    region: "east-asia",
    name: "Xiao Long Bao",
    image: "https://source.unsplash.com/800x600/?xiao+long+bao+soup+dumplings",
    time: "60 min",
    difficulty: "Hard",
    rating: 4.9,
    calories: 380,
    tags: ["Dumplings", "Steamed"],
    description:
      "Delicate soup dumplings with seasoned pork and rich savory broth",
    ingredients: [
      { name: "ground pork", amount: "300g", prep: "Mix vigorously with seasoning until sticky — fat content 20–30% essential" },
      { name: "pork skin", amount: "200g", prep: "Simmer in water 2 hrs, blend smooth, refrigerate overnight to form aspic jelly" },
      { name: "ginger", amount: "20g", prep: "Mince very finely, squeeze juice into filling, discard fibres" },
      { name: "scallions", amount: "3 stalks", prep: "Mince finely, mix into pork filling" },
      { name: "Shaoxing rice wine", amount: "2 tbsp", prep: "No prep — mix directly into filling" },
      { name: "all-purpose flour", amount: "300g", prep: "Mix with boiling water (70%) and cold water (30%), knead 10 min, rest 30 min covered" },
      { name: "soy sauce", amount: "2 tbsp", prep: "No prep — season filling" },
      { name: "sesame oil", amount: "1 tsp", prep: "No prep — finish filling" },
      { name: "black rice vinegar", amount: "3 tbsp", prep: "Serve in small dipping dishes alongside ginger julienne" },
      { name: "ginger (for dipping)", amount: "30g", prep: "Julienne into very fine thin strips" },
    ],
    steps: [
      {
        text: "The day before, make your aspic. Simmer 200g of pork skin in water to cover for 2 hours until very soft. Remove, blend with 300ml of the cooking liquid until completely smooth, season with 2 tablespoons of soy sauce and 1 tablespoon of Shaoxing wine. Strain into a shallow tray and refrigerate overnight until firmly set. Cut into small cubes — this is your soup.",
        duration: 30,
        visualCues: ["clear set jelly", "firm cubes"],
        checkpoints: ["aspic firmly set", "cuts cleanly into cubes"],
      },
      {
        text: "Combine 300g of ground pork with 20g of very finely minced ginger, 3 minced scallions, 2 tablespoons of soy sauce, 1 tablespoon of Shaoxing wine, and 1 teaspoon of sesame oil. Mix vigorously in one direction for 3 full minutes until the mixture becomes sticky and elastic — this develops the protein structure. Gently fold in the aspic cubes. Refrigerate for 30 minutes.",
        duration: 35,
        visualCues: ["sticky elastic filling", "aspic cubes visible"],
        checkpoints: ["filling holds together", "aspic distributed evenly"],
      },
      {
        text: "For the dough, combine 300g of all-purpose flour with 160ml of just-boiled water and 30ml of cold water. Mix immediately with a chopstick, then knead for 10 minutes until completely smooth. Cover and rest for 30 minutes — the hot water partially cooks the starch, making it more pliable.",
        duration: 15,
        visualCues: ["smooth elastic dough", "no dry patches"],
        checkpoints: ["smooth and pliable", "not sticky"],
      },
      {
        text: "Divide the dough into small balls of about 12g each. Roll each into a thin circle, roughly 9cm in diameter, thinner at the edges than the centre. Place a heaped teaspoon of filling in the centre. Now pleat — using your thumb and index finger, make at least 12 small folds around the edge, twisting the top closed tightly. The pleating takes practice; aim for uniformity.",
        duration: 20,
        visualCues: ["thin wrappers", "12+ pleats per dumpling"],
        checkpoints: ["12+ visible pleats", "sealed at top with no gaps"],
      },
      {
        text: "Line your bamboo steamer with parchment paper and arrange the dumplings with at least 2cm of space between each. Steam over vigorously boiling water for exactly 8 minutes. The wrappers should turn translucent and you should see the broth moving inside. Serve immediately in the steamer with black rice vinegar and fine julienned ginger for dipping. Bite a tiny hole first and sip the soup — then eat the whole dumpling.",
        duration: 8,
        visualCues: ["translucent wrappers", "broth visible inside"],
        checkpoints: ["wrappers translucent", "broth intact when lifted"],
      },
    ],
  },
  {
    id: 5,
    region: "east-asia",
    name: "Japanese Yakitori",
    image: "https://source.unsplash.com/800x600/?yakitori+japanese+skewers",
    time: "30 min",
    difficulty: "Easy",
    rating: 4.6,
    calories: 340,
    tags: ["Grilled", "Chicken"],
    description:
      "Charcoal-grilled chicken skewers with sweet-savory tare sauce",
    ingredients: [
      { name: "chicken thighs", amount: "600g (boneless)", prep: "Remove excess fat, cut into 3cm cubes — keep skin on for flavour" },
      { name: "scallions", amount: "8 stalks", prep: "Cut into 3cm pieces, alternate with chicken on skewers" },
      { name: "soy sauce", amount: "100ml", prep: "Combine with mirin, sake, and sugar — simmer 10 min to make tare sauce" },
      { name: "mirin", amount: "100ml", prep: "Add to tare sauce — reduces to sticky glaze" },
      { name: "sake", amount: "50ml", prep: "Add to tare — evaporates off alcohol during reduction" },
      { name: "sugar", amount: "2 tbsp", prep: "Dissolve into tare sauce while simmering" },
      { name: "bamboo skewers", amount: "12", prep: "Soak in cold water 30 min to prevent burning on grill" },
      { name: "sesame seeds", amount: "1 tbsp", prep: "Toast in dry pan until golden, set aside for garnish" },
    ],
    steps: [
      {
        text: "Make your tare sauce first — this is the soul of yakitori. Combine 100ml of soy sauce, 100ml of mirin, 50ml of sake, and 2 tablespoons of sugar in a small saucepan. Bring to a simmer over medium heat and reduce for 10 minutes, stirring occasionally, until the sauce coats the back of a spoon with a glossy, syrupy consistency. Set aside to cool.",
        duration: 12,
        visualCues: ["glossy syrupy sauce", "coating the spoon"],
        checkpoints: ["coats spoon cleanly", "reduced by half"],
      },
      {
        text: "Cut 600g of boneless chicken thighs into 3cm pieces — keep the skin on, it protects the meat and renders beautifully on the grill. Cut 8 scallion stalks into 3cm pieces. Thread the chicken and scallion alternately onto pre-soaked bamboo skewers, starting and ending with chicken. Press firmly so they hold their shape.",
        duration: 10,
        visualCues: ["evenly sized pieces", "alternating pattern on skewers"],
        checkpoints: ["pieces even size", "securely skewered"],
      },
      {
        text: "Get your grill or grill pan screaming hot — yakitori needs intense direct heat. Grill the skewers for 2 minutes per side until golden with char marks forming. Do not move them constantly — let each side develop properly.",
        duration: 8,
        visualCues: ["grill marks forming", "sizzling fat"],
        checkpoints: ["clear char marks", "golden colour on all sides"],
      },
      {
        text: "In the final 2 minutes of cooking, brush the skewers generously with the tare sauce on all sides. The sugar in the tare will caramelise quickly — this is what gives yakitori its characteristic lacquered glaze. Apply 2–3 coats, allowing each to caramelise before the next. Finish with a sprinkle of 1 tablespoon of toasted sesame seeds.",
        duration: 3,
        visualCues: ["lacquered glaze", "caramelising surface"],
        checkpoints: ["deep glossy glaze", "no burning"],
      },
    ],
  },
  {
    id: 6,
    region: "east-asia",
    name: "Kimchi Jjigae",
    image: "https://source.unsplash.com/800x600/?kimchi+jjigae+korean+stew",
    time: "30 min",
    difficulty: "Easy",
    rating: 4.8,
    calories: 420,
    tags: ["Stew", "Spicy"],
    description: "Hearty kimchi stew with pork belly, tofu, and aged kimchi",
    ingredients: [
      { name: "aged kimchi", amount: "300g", prep: "Use kimchi that is at least 2–3 weeks old — cut into bite-sized pieces" },
      { name: "pork belly", amount: "200g", prep: "Slice into 3cm pieces, no marinade needed — pork fat carries flavour" },
      { name: "firm tofu", amount: "300g", prep: "Drain, cut into 2cm cubes — add near end of cooking to keep shape" },
      { name: "gochugaru (chili flakes)", amount: "2 tbsp", prep: "No prep — add directly to stew" },
      { name: "garlic", amount: "4 cloves", prep: "Mince finely" },
      { name: "onion", amount: "1 medium", prep: "Slice into thin wedges" },
      { name: "kimchi juice", amount: "3 tbsp", prep: "Reserve from kimchi jar — adds depth to broth" },
      { name: "scallions", amount: "3 stalks", prep: "Slice diagonally — add at finish as garnish" },
      { name: "sesame oil", amount: "1 tsp", prep: "Drizzle at end — do not cook, just finish" },
    ],
    steps: [
      {
        text: "Cut 200g of pork belly into 3cm pieces — do not trim the fat, it is essential for richness. In a heavy pot over medium-high heat, cook the pork belly pieces for 5 minutes, stirring occasionally, until lightly browned and the fat begins to render. The rendered pork fat will become the flavour base for everything that follows.",
        duration: 5,
        visualCues: ["rendered fat", "lightly browned pork"],
        checkpoints: ["fat translucent", "slight browning"],
      },
      {
        text: "Add 300g of aged kimchi cut into bite-sized pieces directly to the pork fat. Stir and cook for 5 minutes — you want the kimchi to caramelise slightly in that rendered fat. Add 3 tablespoons of kimchi juice from the jar, 2 tablespoons of gochugaru, and 4 cloves of minced garlic. Stir everything together.",
        duration: 5,
        visualCues: ["sizzling kimchi", "deep red colour"],
        checkpoints: ["kimchi slightly caramelised", "deeply fragrant"],
      },
      {
        text: "Pour in 600ml of water and bring to a vigorous rolling boil. Add 1 sliced onion. Let it boil hard for 10 minutes — this is what develops the depth of the broth. You want a lively, bubbling, vibrant red soup.",
        duration: 10,
        visualCues: ["red broth rolling boil", "vigorous bubbling"],
        checkpoints: ["broth vibrant red", "full rolling boil"],
      },
      {
        text: "Gently add 300g of firm tofu cut into 2cm cubes. Reduce to a steady simmer and cook for 10 more minutes to allow the tofu to absorb the broth and the flavours to meld. Taste the broth — it should be intensely savoury, spicy, and slightly sour. Adjust with a little more kimchi juice if it needs more acidity.",
        duration: 10,
        visualCues: ["tofu cubes absorbing broth", "deep complex broth"],
        checkpoints: ["tofu heated through", "broth deeply flavoured"],
      },
      {
        text: "Remove from the heat and finish with 1 teaspoon of sesame oil and a generous scatter of diagonally sliced scallions. Serve in the pot — kimchi jjigae is always eaten bubbling at the table, with steamed white rice on the side to cool each spoonful.",
        duration: 2,
        visualCues: ["oil sheen on surface", "scallion garnish"],
        checkpoints: ["sesame oil added", "served immediately"],
      },
    ],
  },
  {
    id: 7,
    region: "east-asia",
    name: "Chinese Mapo Tofu",
    image: "https://source.unsplash.com/800x600/?mapo+tofu+sichuan",
    time: "25 min",
    difficulty: "Medium",
    rating: 4.8,
    calories: 390,
    tags: ["Tofu", "Sichuan", "Spicy"],
    description:
      "Silken tofu in fiery Sichuan sauce with fermented black beans",
    ingredients: [
      { name: "silken tofu", amount: "400g", prep: "Cut into 2cm cubes, blanch in salted water 2 min to firm up slightly, drain gently" },
      { name: "ground pork", amount: "150g", prep: "No marinade — cook directly until browned into small crumbles" },
      { name: "doubanjiang (chili bean paste)", amount: "3 tbsp", prep: "Fry in oil 2 min until oil turns bright red — this is the base" },
      { name: "fermented black beans", amount: "2 tbsp", prep: "Rinse and roughly chop to release flavour" },
      { name: "Sichuan peppercorns", amount: "1 tsp", prep: "Toast dry in pan until fragrant, grind to powder — add at the very end" },
      { name: "garlic", amount: "4 cloves", prep: "Mince very finely" },
      { name: "ginger", amount: "20g", prep: "Mince very finely" },
      { name: "chicken stock", amount: "200ml", prep: "No prep — pour in to build sauce" },
      { name: "cornstarch", amount: "2 tsp", prep: "Mix with cold water to make slurry — thickens sauce at end" },
      { name: "scallions", amount: "2 stalks", prep: "Slice thin rings — garnish only" },
    ],
    steps: [
      {
        text: "The foundation of mapo tofu is your spice preparation. In a dry wok over medium heat, toast 1 teaspoon of Sichuan peppercorns for 2 minutes until fragrant and slightly darkened — you'll smell them before you see the colour change. Grind to a coarse powder and set aside. This will go on at the very end.",
        duration: 4,
        visualCues: ["toasted peppercorns", "fragrant smoke"],
        checkpoints: ["fragrant aroma", "slightly darkened colour"],
      },
      {
        text: "Cut 400g of silken tofu into 2cm cubes. To firm them slightly and season them throughout, slide them gently into a pot of well-salted simmering water for 2 minutes. Remove carefully with a slotted spoon and set aside. Blanching prevents the tofu from falling apart when you stir the final dish.",
        duration: 4,
        visualCues: ["tofu cubes holding shape", "lightly firmed"],
        checkpoints: ["tofu holds shape", "seasoned throughout"],
      },
      {
        text: "Heat 3 tablespoons of oil in a wok over high heat until smoking. Add 3 tablespoons of doubanjiang and fry, stirring constantly, for exactly 2 minutes until the oil turns a brilliant, deep red colour — this is called hong you, and it's the heart of the dish. Add 2 tablespoons of rinsed and roughly chopped fermented black beans, 4 cloves of minced garlic, and 20g of minced ginger. Stir-fry for 1 more minute.",
        duration: 4,
        visualCues: ["brilliant red oil", "fragrant paste sizzling"],
        checkpoints: ["oil vivid red", "paste very fragrant"],
      },
      {
        text: "Add 150g of ground pork and break it into tiny crumbles with your spoon, cooking for 4 minutes until no pink remains. Pour in 200ml of chicken stock and bring to a simmer. Slide the tofu cubes in gently — do not stir aggressively or you'll break them. Instead, shake the wok gently and use a spatula to baste the tofu with the sauce. Simmer for 5 minutes.",
        duration: 10,
        visualCues: ["tiny meat crumbles", "tofu simmering in sauce"],
        checkpoints: ["pork fully cooked", "tofu intact"],
      },
      {
        text: "Mix 2 teaspoons of cornstarch with 2 tablespoons of cold water. Pour this slurry around the edges of the wok and stir gently — the sauce will thicken almost immediately. Transfer to your serving bowl and top generously with the reserved Sichuan pepper powder and 2 sliced scallions. The numbing heat builds slowly — serve with plain white rice.",
        duration: 3,
        visualCues: ["thickened glossy sauce", "pepper powder on top"],
        checkpoints: ["sauce coats tofu", "peppercorn powder on top"],
      },
    ],
  },
  {
    id: 8,
    region: "east-asia",
    name: "Japchae Glass Noodles",
    image: "https://source.unsplash.com/800x600/?japchae+korean+noodles",
    time: "40 min",
    difficulty: "Medium",
    rating: 4.6,
    calories: 450,
    tags: ["Noodles", "Stir-fry"],
    description: "Silky sweet potato noodles with vegetables and tender beef",
    ingredients: [
      { name: "glass noodles (dangmyeon)", amount: "200g", prep: "Soak in warm water 30 min until pliable, drain — do not over-soak" },
      { name: "beef sirloin", amount: "150g", prep: "Slice very thin against grain, marinate in soy + sesame + sugar + garlic 20 min" },
      { name: "spinach", amount: "150g", prep: "Blanch 30 sec, immediately ice bath, squeeze completely dry, season with sesame oil" },
      { name: "carrots", amount: "1 medium", prep: "Julienne thin, sauté separately in oil 2 min" },
      { name: "shiitake mushrooms", amount: "100g", prep: "Rehydrate dried mushrooms in warm water 20 min, slice, sauté with soy" },
      { name: "yellow bell pepper", amount: "1", prep: "Julienne, sauté quickly 1 min — keep slight crunch" },
      { name: "onion", amount: "1 medium", prep: "Slice thin half-moons, sauté until translucent" },
      { name: "soy sauce", amount: "4 tbsp", prep: "Mix with sugar, sesame oil for final seasoning" },
      { name: "sesame oil", amount: "2 tbsp", prep: "Reserve half for finish" },
      { name: "sesame seeds", amount: "1 tbsp", prep: "Toast lightly — garnish only" },
    ],
    steps: [
      {
        text: "Soak 200g of dangmyeon glass noodles in warm water for exactly 30 minutes — they should become pliable and slightly translucent but still have firmness. Do not over-soak or they will become mushy when stir-fried. Drain, then cut the noodles with scissors into 15cm lengths for easier eating.",
        duration: 30,
        visualCues: ["translucent noodles", "pliable but firm"],
        checkpoints: ["pliable not mushy", "15cm lengths"],
      },
      {
        text: "Slice 150g of beef sirloin paper-thin against the grain. Combine 2 tablespoons of soy sauce, 1 tablespoon of sesame oil, 1 teaspoon of sugar, and 3 cloves of minced garlic. Marinate the beef in this mixture for 20 minutes minimum. Prepare all your vegetables: julienne 1 medium carrot, slice the shiitake mushrooms, slice the yellow bell pepper, and thinly slice 1 onion.",
        duration: 25,
        visualCues: ["thin marinated beef strips", "colourful vegetable julienne"],
        checkpoints: ["beef evenly coated", "vegetables uniform size"],
      },
      {
        text: "Now sauté each ingredient separately — this is what separates professional japchae from amateur versions. Heat a wok over high heat with a teaspoon of oil. Cook each vegetable individually for 1–2 minutes until just tender, removing each to a large mixing bowl. Blanch 150g of spinach for 30 seconds, squeeze completely dry, season with sesame oil. Cook the beef last until caramelised.",
        duration: 15,
        visualCues: ["vibrant separate vegetables", "caramelised beef"],
        checkpoints: ["each vegetable separately cooked", "colours vivid"],
      },
      {
        text: "Add the drained noodles to the wok with 3 tablespoons of soy sauce, 2 tablespoons of sesame oil, and 1 tablespoon of sugar. Stir-fry over high heat for 3 minutes until the noodles absorb the sauce and turn glistening and dark. Add all the cooked vegetables and beef and toss everything together thoroughly.",
        duration: 5,
        visualCues: ["glistening dark noodles", "combined ingredients"],
        checkpoints: ["noodles absorbed sauce", "evenly mixed"],
      },
      {
        text: "Season to taste, adding more soy sauce if needed. Transfer to a serving platter, drizzle over 1 more tablespoon of sesame oil, and finish with a generous scatter of 1 tablespoon of toasted sesame seeds. Japchae can be served warm or at room temperature — it is considered celebratory food in Korea.",
        duration: 2,
        visualCues: ["glistening plated noodles", "sesame seed garnish"],
        checkpoints: ["well seasoned", "sesame seeds on top"],
      },
    ],
  },
  {
    id: 9,
    region: "east-asia",
    name: "Har Gow Shrimp Dumplings",
    image: "https://source.unsplash.com/800x600/?har+gow+dim+sum+dumplings",
    time: "50 min",
    difficulty: "Hard",
    rating: 4.9,
    calories: 280,
    tags: ["Dumplings", "Shrimp", "Dim Sum"],
    description: "Crystal-skin steamed shrimp dumplings with 7+ elegant pleats",
    ingredients: [
      { name: "raw shrimp", amount: "300g", prep: "Peel, devein, pat dry — roughly chop 2/3, mince remaining 1/3 to bind" },
      { name: "bamboo shoots", amount: "80g", prep: "Rinse canned, mince finely, pat dry with paper towel" },
      { name: "wheat starch", amount: "150g", prep: "Sift, combine with tapioca starch — pour boiling water and knead immediately" },
      { name: "tapioca starch", amount: "50g", prep: "Mix with wheat starch — gives translucent skin" },
      { name: "sesame oil", amount: "1 tsp", prep: "Mix into shrimp filling at end" },
      { name: "white pepper", amount: "1/4 tsp", prep: "Grind fresh — season filling" },
      { name: "salt", amount: "1 tsp", prep: "Add to filling and toss shrimp vigorously until sticky" },
      { name: "lard or vegetable oil", amount: "1 tbsp", prep: "Add to dough for pliability" },
    ],
    steps: [
      {
        text: "For the crystal skin dough, weigh out 150g of wheat starch and 50g of tapioca starch. Add a pinch of salt. Bring 230ml of water to a rolling boil and pour it all at once over the starch mixture. Immediately stir vigorously with a chopstick — the starch will cook instantly. Add 1 tablespoon of lard or oil, then knead while still warm for 5 minutes until completely smooth. Cover tightly with plastic wrap.",
        duration: 15,
        visualCues: ["translucent smooth dough", "no dry patches"],
        checkpoints: ["smooth and elastic", "slightly translucent"],
      },
      {
        text: "Peel and devein 300g of raw shrimp. Roughly chop two-thirds and mince the remaining third to a paste — this creates texture variation. Rinse and mince 80g of bamboo shoots finely, then pat dry with kitchen paper. Combine the shrimp with the bamboo shoots, 1 teaspoon of sesame oil, 1/4 teaspoon of white pepper, and 1 teaspoon of salt. Toss vigorously until the mixture becomes sticky.",
        duration: 10,
        visualCues: ["sticky shrimp filling", "pink chunky texture"],
        checkpoints: ["sticky cohesive texture", "bamboo distributed evenly"],
      },
      {
        text: "Divide the dough into small balls of about 10g each. Using a cleaver or flat spatula, press and roll each ball into a very thin circle about 8cm wide — thinner at the edges than the centre. The skin should be almost translucent when held up to the light.",
        duration: 15,
        visualCues: ["near-translucent skin circles", "thin at edges"],
        checkpoints: ["very thin at edges", "no tearing"],
      },
      {
        text: "Place 1 teaspoon of filling just off-centre on each wrapper. Fold one side over and begin pleating from right to left — at least 7 fan pleats on the curved side only, leaving the back straight. Press firmly to seal. The shape should be a half-moon with a distinctive ridged curve on top.",
        duration: 20,
        visualCues: ["7+ fan pleats", "half-moon shape"],
        checkpoints: ["7+ pleats visible", "completely sealed"],
      },
      {
        text: "Line your bamboo steamer with perforated parchment. Place har gow with space between each. Steam over vigorously boiling water for exactly 7–8 minutes. When ready, the skins will turn completely translucent and you'll see the pink shrimp glowing through. Serve immediately — har gow are only perfect for about 3 minutes after coming off the steam.",
        duration: 8,
        visualCues: ["translucent skins", "pink shrimp visible inside"],
        checkpoints: ["skins fully translucent", "shrimp pink through skin"],
      },
    ],
  },
  {
    id: 10,
    region: "east-asia",
    name: "Japanese Mochi Ice Cream",
    image: "https://source.unsplash.com/800x600/?mochi+ice+cream+japanese",
    time: "40 min",
    difficulty: "Medium",
    rating: 4.7,
    calories: 210,
    tags: ["Dessert", "Sweet"],
    description: "Pillowy rice cake wrapped around creamy ice cream",
    ingredients: [
      { name: "glutinous rice flour (shiratamako)", amount: "150g", prep: "Sift into bowl — no lumps" },
      { name: "sugar", amount: "80g", prep: "Dissolve into water before adding to flour" },
      { name: "water", amount: "180ml", prep: "Mix with sugar first, then add to flour in batches" },
      { name: "ice cream (any flavour)", amount: "500ml", prep: "Scoop into golf-ball portions, refreeze on parchment 2 hrs until very firm" },
      { name: "potato starch", amount: "50g", prep: "Dust work surface generously — prevents sticking" },
      { name: "food coloring (optional)", amount: "few drops", prep: "Add to batter before cooking if desired" },
      { name: "cornstarch", amount: "2 tbsp", prep: "Dust hands when handling hot mochi" },
    ],
    steps: [
      {
        text: "Scoop your ice cream into portions of about 40g each — roughly golf ball sized. Place on a parchment-lined tray and refreeze for a minimum of 2 hours until rock solid. They need to be completely frozen so you have enough time to wrap them in the warm mochi before they melt.",
        duration: 5,
        visualCues: ["uniform ice cream balls", "placed on parchment"],
        checkpoints: ["perfectly round", "going in freezer"],
      },
      {
        text: "Whisk 150g of glutinous rice flour with 80g of sugar and 180ml of water until completely smooth with absolutely no lumps. Pour into a microwave-safe bowl and microwave on high for 2 minutes. Remove and stir vigorously. Return and microwave for another 1–2 minutes — the mochi is ready when it has turned from white and opaque to translucent and glossy.",
        duration: 8,
        visualCues: ["translucent glossy paste", "stretchy texture"],
        checkpoints: ["translucent not white", "very sticky and stretchy"],
      },
      {
        text: "Generously dust your work surface and hands with 50g of potato starch — do not skip this or the mochi will stick to everything. Scrape the hot mochi out and knead gently for 3 minutes until smooth and elastic. Divide into portions of about 35g each and flatten each into a thin circle on the starch-dusted surface.",
        duration: 10,
        visualCues: ["smooth elastic discs", "heavily dusted surface"],
        checkpoints: ["smooth no tears", "thin but not torn"],
      },
      {
        text: "Work quickly — mochi firms as it cools. Take a frozen ice cream ball from the freezer and place it in the centre of a mochi disc. Stretch the mochi up and around the ice cream, pleating and pinching tightly at the base to seal completely. The seal must be airtight or the ice cream will leak out. Place seam-side down on fresh parchment.",
        duration: 15,
        visualCues: ["sealed mochi ball", "smooth round shape"],
        checkpoints: ["fully sealed no gaps", "ice cream not melting through"],
      },
      {
        text: "Dust the finished mochi with more potato starch and place immediately in the freezer for at least 30 minutes before serving. They will keep for up to a week in an airtight container. Remove from the freezer 2–3 minutes before serving — mochi should be soft and chewy, not frozen solid.",
        duration: 5,
        visualCues: ["white dusted mochi balls", "firm to touch"],
        checkpoints: ["fully sealed", "back in freezer"],
      },
    ],
  },

  // SOUTHEAST ASIA
  {
    id: 11,
    region: "southeast-asia",
    name: "Authentic Pad Thai",
    image: "https://source.unsplash.com/800x600/?pad+thai+noodles+thai",
    time: "25 min",
    difficulty: "Medium",
    rating: 4.8,
    calories: 540,
    tags: ["Noodles", "Street Food"],
    description:
      "Classic Thai street food with perfect sweet-sour-savory balance",
    ingredients: [
      { name: "dried rice noodles (3mm)", amount: "200g", prep: "Soak in room-temperature water 30 min until pliable but still firm — not fully soft" },
      { name: "raw shrimp", amount: "200g", prep: "Peel and devein, pat completely dry — moisture kills wok heat" },
      { name: "firm tofu", amount: "150g", prep: "Press dry 20 min, cut into 1cm cubes, fry in oil until golden before adding" },
      { name: "eggs", amount: "2", prep: "Crack into bowl, scramble lightly — push noodles aside and cook in wok" },
      { name: "bean sprouts", amount: "150g", prep: "Rinse and drain — add raw at end for crunch" },
      { name: "tamarind paste", amount: "3 tbsp", prep: "Dissolve block tamarind in warm water, strain — or use concentrate" },
      { name: "fish sauce", amount: "3 tbsp", prep: "Mix with tamarind and sugar into sauce before cooking" },
      { name: "palm sugar", amount: "2 tbsp", prep: "Shave or chop — dissolves into sauce" },
      { name: "dried shrimp", amount: "2 tbsp", prep: "Soak in water 5 min, drain — add to wok with garlic" },
      { name: "roasted peanuts", amount: "60g", prep: "Roughly crush — garnish at table" },
      { name: "lime", amount: "2", prep: "Cut into wedges — serve alongside" },
      { name: "scallions", amount: "3 stalks", prep: "Slice into 2cm pieces — add at end" },
    ],
    steps: [
      {
        text: "Soak 200g of dried rice noodles in a bowl of room-temperature water — not hot — for exactly 30 minutes. They should become flexible but still noticeably firm, almost like thick cooked pasta. Drain thoroughly. Critical rule: a wet wok means no caramelisation, so dry the noodles well and have everything else prepped before turning on the heat.",
        duration: 30,
        visualCues: ["pliable but firm noodles", "draining"],
        checkpoints: ["flexible not mushy", "well drained"],
      },
      {
        text: "Make your pad thai sauce by combining 3 tablespoons of tamarind paste with 3 tablespoons of fish sauce and 2 tablespoons of palm sugar. Stir until the sugar dissolves completely. This sweet-sour-salty balance is the soul of the dish — taste it and adjust: it should hit all three notes simultaneously.",
        duration: 5,
        visualCues: ["dark glossy sauce", "sugar dissolved"],
        checkpoints: ["sugar fully dissolved", "balanced sweet-sour-salty"],
      },
      {
        text: "Get your wok ripping hot — it should be smoking before any oil goes in. Add 2 tablespoons of oil and fry 3 cloves of minced garlic for 10 seconds. Add 200g of dried shrimp if using, then the shrimp. Push everything to one side and crack 2 eggs into the empty space. Scramble them partially, then begin mixing with the rest.",
        duration: 5,
        visualCues: ["smoking wok", "golden garlic", "eggs scrambling"],
        checkpoints: ["wok smoking hot", "garlic golden not burnt"],
      },
      {
        text: "Add the drained noodles and pour the sauce over everything. Using tongs or chopsticks, toss constantly over maximum heat for 4 minutes. The noodles should absorb the sauce and start to caramelise at the edges — this is the characteristic smoky flavour called 'wok hei'. If the noodles stick, add 1–2 tablespoons of water, not oil.",
        duration: 4,
        visualCues: ["glossy noodles", "slight caramelisation"],
        checkpoints: ["noodles absorbed sauce", "edges slightly caramelised"],
      },
      {
        text: "Add 150g of bean sprouts and the cut scallions, tossing for just 30 seconds — they should wilt slightly but retain some crunch. Plate immediately and garnish with 60g of roughly crushed roasted peanuts, a wedge of lime, dried chilli flakes, and extra fish sauce on the side. Pad Thai is always finished at the table by the diner.",
        duration: 2,
        visualCues: ["wilted sprouts with crunch", "fully garnished plate"],
        checkpoints: ["sprouts still slightly crunchy", "peanuts and lime on side"],
      },
    ],
  },
  {
    id: 12,
    region: "southeast-asia",
    name: "Vietnamese Pho Bo",
    image: "https://source.unsplash.com/800x600/?pho+vietnamese+beef+noodle",
    time: "60 min",
    difficulty: "Medium",
    rating: 4.9,
    calories: 450,
    tags: ["Soup", "Beef", "Noodles"],
    description:
      "Aromatic beef broth with charred ginger and rare beef over rice noodles",
    ingredients: [
      { name: "beef bones (knuckle + marrow)", amount: "2 kg", prep: "Blanch in boiling water 5 min, rinse under cold water — removes cloudiness" },
      { name: "beef brisket", amount: "500g", prep: "Keep whole for simmering — slice thin against grain when cooked" },
      { name: "sirloin (for raw slices)", amount: "200g", prep: "Freeze 30 min, slice paper-thin against grain — heat of broth cooks it" },
      { name: "onion", amount: "2 large", prep: "Halve, char cut side directly on flame or under broiler until blackened" },
      { name: "ginger", amount: "100g", prep: "Halve lengthwise, char cut side until blackened — gives smoky depth" },
      { name: "star anise", amount: "5 pods", prep: "Toast in dry pan 2 min until fragrant" },
      { name: "cinnamon stick", amount: "1 large", prep: "Toast alongside star anise" },
      { name: "cloves", amount: "5", prep: "Toast with other spices" },
      { name: "fish sauce", amount: "4 tbsp", prep: "Season broth at end — add in stages and taste" },
      { name: "rice noodles (pho)", amount: "400g", prep: "Soak in cold water 30 min, blanch in boiling water 30 sec just before serving" },
      { name: "bean sprouts", amount: "200g", prep: "Keep raw — serve at table for guests to add" },
      { name: "Thai basil", amount: "1 bunch", prep: "Separate leaves — serve fresh at table" },
      { name: "hoisin sauce", amount: "to taste", prep: "Serve in small side dish at table" },
    ],
    steps: [
      {
        text: "Char your aromatics first — this step is non-negotiable for authentic pho. Halve 2 large onions and a 100g piece of ginger. Place them directly on a dry cast-iron pan or gas flame until completely blackened on the cut side — around 5 minutes. The charring creates the distinctive smoky sweetness of true pho broth.",
        duration: 8,
        visualCues: ["blackened onion and ginger", "fragrant smoke"],
        checkpoints: ["deeply charred cut sides", "fragrant smoke rising"],
      },
      {
        text: "Toast 5 star anise, 1 cinnamon stick, and 5 cloves in a dry pan for 2 minutes until fragrant. Blanch 2kg of beef bones in boiling water for 5 minutes, drain, and rinse thoroughly. Return to a clean pot with 4 litres of water, the charred aromatics, the toasted spices, and 500g of whole beef brisket. Bring to a simmer.",
        duration: 15,
        visualCues: ["clear broth developing", "spices floating", "gentle bubbles"],
        checkpoints: ["clear not cloudy broth", "gentle not violent simmer"],
      },
      {
        text: "Simmer for 45 minutes, skimming any foam that rises to the surface every 10 minutes. After 45 minutes, remove the brisket and set aside to cool — it will be sliced for topping. Continue simmering the bones for another 30 minutes. The broth should be clear, deeply aromatic, and golden.",
        duration: 75,
        visualCues: ["clear golden broth", "brisket tender"],
        checkpoints: ["brisket tender when pierced", "broth clear and golden"],
      },
      {
        text: "Strain the broth through a fine-mesh sieve. Season with 4 tablespoons of fish sauce, adding in stages and tasting — it should be savoury but not aggressively salty. Bring back to a boil. Meanwhile, slice the cooked brisket very thin against the grain, and slice 200g of raw sirloin paper-thin — partially freeze for 20 minutes to make this easier.",
        duration: 10,
        visualCues: ["clear strained broth", "paper-thin beef slices"],
        checkpoints: ["well-seasoned broth", "very thin raw beef slices"],
      },
      {
        text: "Blanch 400g of pho noodles in boiling water for 30 seconds, drain and portion into your bowls. Add sliced brisket and the paper-thin raw sirloin on top. Ladle the boiling broth over everything — the heat of the broth will cook the raw beef in seconds, turning it from pink to grey. Serve immediately with a plate of bean sprouts, fresh Thai basil, sliced chilli, lime wedges, and hoisin on the side.",
        duration: 5,
        visualCues: ["raw beef turning grey in broth", "steaming bowl"],
        checkpoints: ["broth boiling hot", "raw beef changing colour"],
      },
    ],
  },
  {
    id: 13,
    region: "southeast-asia",
    name: "Nasi Goreng",
    image: "https://source.unsplash.com/800x600/?nasi+goreng+indonesian+fried+rice",
    time: "20 min",
    difficulty: "Easy",
    rating: 4.7,
    calories: 580,
    tags: ["Rice", "Fried"],
    description: "Indonesian fried rice with kecap manis and crispy fried egg",
    ingredients: [
      { name: "day-old cooked rice", amount: "4 cups", prep: "Must be cold and dry — refrigerate overnight, break up any clumps before cooking" },
      { name: "shrimp", amount: "200g", prep: "Peel and devein, pat dry" },
      { name: "kecap manis (sweet soy sauce)", amount: "4 tbsp", prep: "No prep — pour into wok with rice" },
      { name: "shrimp paste (terasi)", amount: "1 tsp", prep: "Toast wrapped in foil in dry pan 2 min to reduce pungency" },
      { name: "shallots", amount: "6", prep: "Peel and roughly chop for spice paste" },
      { name: "garlic", amount: "4 cloves", prep: "Roughly chop for spice paste" },
      { name: "red chilies", amount: "3", prep: "Remove seeds for less heat, roughly chop" },
      { name: "eggs", amount: "2", prep: "Fry separately sunny-side up with crispy edges — place on top of finished rice" },
      { name: "cucumber", amount: "1/2", prep: "Slice thin — serve raw alongside" },
      { name: "prawn crackers", amount: "handful", prep: "Deep fry in hot oil just before serving or use pre-fried" },
    ],
    steps: [
      {
        text: "The secret to perfect nasi goreng starts the day before: cook your rice, spread it on a tray and refrigerate overnight. Day-old cold rice fries instead of steaming — it's the difference between restaurant-quality and home quality. Break up any clumps before you begin.",
        duration: 2,
        visualCues: ["dry separated rice grains", "no clumping"],
        checkpoints: ["rice completely dry", "no clumps"],
      },
      {
        text: "Make your spice paste: blend together 6 shallots, 4 garlic cloves, 3 red chillies (seeds removed for medium heat), and 1 teaspoon of roasted shrimp paste. The paste should be completely smooth — process for at least 2 minutes. Heat 3 tablespoons of oil in a wok over high heat and fry the paste for 3–4 minutes, stirring constantly, until it turns a deep, brick red and the oil separates around the edges.",
        duration: 8,
        visualCues: ["deep red fragrant paste", "oil separating"],
        checkpoints: ["paste deep red", "oil has separated", "very fragrant"],
      },
      {
        text: "Add 200g of peeled, deveined shrimp to the paste and stir-fry for 2 minutes until pink. Add the 4 cups of cold rice all at once. Spread it across the wok and press down with a spatula — let it sit undisturbed for 30 seconds to develop the crust, then break up and toss. Repeat this press-and-toss technique for 5 minutes total.",
        duration: 7,
        visualCues: ["rice sizzling", "no clumps", "slight crust forming"],
        checkpoints: ["no clumps", "evenly coated with paste"],
      },
      {
        text: "Pour 4 tablespoons of kecap manis around the edges of the wok — it will sizzle and caramelise against the hot metal. Toss everything together vigorously for 2 minutes until the rice is uniformly dark, glossy, and fragrant. Season with salt if needed — the kecap manis and shrimp paste are already quite salty.",
        duration: 3,
        visualCues: ["dark glossy rice", "caramelising edges"],
        checkpoints: ["uniformly dark and glossy", "fragrant"],
      },
      {
        text: "In a separate pan, fry 2 eggs in hot oil sunny-side up until the whites are fully set with slightly crispy edges and the yolk remains brilliantly runny. Plate the nasi goreng, slide a fried egg on top, and serve with sliced cucumber and prawn crackers alongside. The contrast between the crispy egg whites and silky yolk is essential.",
        duration: 5,
        visualCues: ["crispy white egg", "runny yolk", "plated nasi goreng"],
        checkpoints: ["whites fully set", "yolk still runny"],
      },
    ],
  },
  {
    id: 14,
    region: "southeast-asia",
    name: "Tom Yum Goong",
    image: "https://source.unsplash.com/800x600/?tom+yum+soup+thai+shrimp",
    time: "20 min",
    difficulty: "Easy",
    rating: 4.8,
    calories: 280,
    tags: ["Soup", "Spicy", "Shrimp"],
    description: "Hot and sour soup with shrimp, lemongrass, and galangal",
    ingredients: [
      { name: "large shrimp", amount: "300g", prep: "Peel, devein — keep shells and heads for stock base" },
      { name: "lemongrass", amount: "3 stalks", prep: "Trim ends, bruise with back of knife, cut into 5cm pieces" },
      { name: "galangal", amount: "40g", prep: "Slice into thin coins — do not substitute with regular ginger" },
      { name: "kaffir lime leaves", amount: "8 leaves", prep: "Tear in half, bruise to release oils — do not eat" },
      { name: "Thai bird's eye chilies", amount: "5–10", prep: "Bruise with knife — more for spicier soup" },
      { name: "oyster mushrooms", amount: "200g", prep: "Tear into pieces by hand rather than cutting" },
      { name: "fish sauce", amount: "3 tbsp", prep: "Season broth — add in stages" },
      { name: "lime juice", amount: "4 tbsp", prep: "Squeeze fresh — add off heat to preserve brightness" },
      { name: "cilantro", amount: "1 bunch", prep: "Roughly chop — garnish only, add at serving" },
      { name: "coconut milk (optional)", amount: "100ml", prep: "For Tom Kha version — stir in at end, do not boil" },
    ],
    steps: [
      {
        text: "Begin by preparing your aromatics: take 3 stalks of lemongrass and bruise the bottom third firmly with the back of a heavy knife — you'll hear it crack and release its fragrant oils. Cut into 5cm pieces. Slice 40g of galangal into thin coins. Tear 8 kaffir lime leaves in half and bruise them between your fingers. Bruise 5–10 bird's eye chillies. These are the essential flavour backbone.",
        duration: 5,
        visualCues: ["bruised lemongrass", "galangal sliced", "torn lime leaves"],
        checkpoints: ["aromatics bruised and releasing oils", "fragrant when handled"],
      },
      {
        text: "Bring 800ml of water to a boil in a medium saucepan. Add all the bruised aromatics and simmer for 5 minutes. Your kitchen should smell intensely of lemongrass and galangal. The broth will turn pale yellow. Taste it — it should already be fragrant and slightly spicy.",
        duration: 5,
        visualCues: ["pale yellow fragrant broth", "aromatics releasing flavour"],
        checkpoints: ["clearly aromatic broth", "pale golden colour"],
      },
      {
        text: "Add 200g of torn oyster mushrooms and the bruised chillies. Cook for 3 minutes. Add 300g of large peeled, deveined shrimp and cook for exactly 2–3 minutes until they curl into a 'C' shape and turn completely pink — overcooked shrimp become rubbery and tough. Remove from heat immediately.",
        duration: 6,
        visualCues: ["pink curled shrimp", "C-shape curl"],
        checkpoints: ["shrimp fully pink", "C-shape curl achieved"],
      },
      {
        text: "Season decisively: add 3 tablespoons of fish sauce and taste. Then add the juice of 4 limes — add it off the heat to preserve the brightness. The soup should hit all four notes clearly: sour from the lime, salty from the fish sauce, spicy from the chillies, and aromatic from the lemongrass. Adjust each element until all four are in balance.",
        duration: 3,
        visualCues: ["vibrant coloured soup", "clear broth"],
        checkpoints: ["balanced sour, salty, spicy, aromatic", "clear broth"],
      },
      {
        text: "Serve immediately in warmed bowls with a generous scatter of fresh cilantro leaves — they should float on the surface and wilt gently in the heat. Tom yum is eaten as a communal dish in Thailand; it should be served in the cooking pot at the table. Do not eat the lemongrass, galangal, or lime leaves — they are aromatics only.",
        duration: 2,
        visualCues: ["cilantro floating", "steaming clear soup"],
        checkpoints: ["served piping hot", "cilantro on top"],
      },
    ],
  },
  {
    id: 15,
    region: "southeast-asia",
    name: "Malaysian Laksa",
    image: "https://source.unsplash.com/800x600/?laksa+malaysian+noodle+soup",
    time: "40 min",
    difficulty: "Medium",
    rating: 4.8,
    calories: 620,
    tags: ["Noodles", "Coconut", "Spicy"],
    description: "Spicy coconut noodle soup with tofu puffs and fresh herbs",
    ingredients: [
      { name: "laksa paste", amount: "4 tbsp", prep: "Fry in oil 5 min stirring constantly until oil separates — essential step" },
      { name: "coconut milk", amount: "400ml", prep: "Shake can, add to paste — do not boil vigorously or it splits" },
      { name: "rice vermicelli", amount: "300g", prep: "Soak in boiling water 3 min, drain, portion into bowls" },
      { name: "large shrimp", amount: "200g", prep: "Peel and devein, add raw to simmering broth 3 min" },
      { name: "tofu puffs", amount: "150g", prep: "Halve diagonally — they absorb broth beautifully" },
      { name: "bean sprouts", amount: "150g", prep: "Blanch 30 sec — or serve raw for crunch" },
      { name: "hard-boiled eggs", amount: "2", prep: "Boil 10 min, peel and halve" },
      { name: "fish balls", amount: "150g", prep: "Add to broth and heat through 3 min" },
      { name: "fresh laksa leaves (Vietnamese mint)", amount: "handful", prep: "Whole leaves — top of bowl at serving" },
      { name: "sambal", amount: "to taste", prep: "Serve on side for heat adjustment" },
    ],
    steps: [
      {
        text: "Heat 3 tablespoons of oil in a deep pot over medium-high heat. Add the full 4 tablespoons of laksa paste and fry, stirring constantly — this is non-negotiable. Cook the paste for a full 5 minutes until the colour deepens to a rich orange-red and you can see the oil beginning to separate from the paste at the edges. Under-frying the paste is the most common mistake in laksa.",
        duration: 6,
        visualCues: ["deep orange paste", "oil separating at edges"],
        checkpoints: ["colour darkened", "oil has separated", "extremely fragrant"],
      },
      {
        text: "Pour in 400ml of coconut milk (shaking the can first) and 600ml of chicken or prawn stock. Stir to combine and bring to a gentle simmer — do not boil hard or the coconut milk will split and become grainy. Add 150g of halved tofu puffs and simmer for 5 minutes so they absorb the broth.",
        duration: 8,
        visualCues: ["creamy orange broth", "gentle bubbles", "tofu puffs plumping"],
        checkpoints: ["not boiling hard", "creamy consistency", "tofu puffs absorbing broth"],
      },
      {
        text: "Add 200g of peeled deveined shrimp and any fish balls you are using. Cook for 3 minutes until the shrimp are fully pink and curled. Hard-boil 2 eggs in a separate pot — 10 minutes, then peel and halve. Season the broth with salt, fish sauce, or more laksa paste to taste — it should be rich, spicy, and deeply aromatic.",
        duration: 5,
        visualCues: ["pink shrimp", "creamy spiced broth"],
        checkpoints: ["shrimp cooked through", "broth well seasoned"],
      },
      {
        text: "Place 300g of pre-soaked, par-blanched rice vermicelli into your serving bowls. Ladle the hot laksa broth generously over the noodles. Top with bean sprouts, the halved eggs, fresh laksa leaves, and a spoon of sambal on the side. The richness of laksa demands a balance of textures — crunchy sprouts against silky noodles against plump shrimp.",
        duration: 3,
        visualCues: ["layered bowl", "vibrant colourful toppings"],
        checkpoints: ["all toppings present", "broth generous"],
      },
    ],
  },
  {
    id: 16,
    region: "southeast-asia",
    name: "Vietnamese Bánh Mì",
    image: "https://source.unsplash.com/800x600/?banh+mi+vietnamese+sandwich",
    time: "20 min",
    difficulty: "Easy",
    rating: 4.7,
    calories: 490,
    tags: ["Sandwich", "Street Food"],
    description:
      "Crispy baguette with charcuterie, pickled daikon, and jalapeños",
    ingredients: [
      { name: "Vietnamese baguette", amount: "2 loaves", prep: "Bake or toast in oven 5 min until crust crackles — must be airy and crisp" },
      { name: "daikon radish", amount: "100g", prep: "Julienne thin, pickle in rice vinegar + sugar + salt 30 min minimum" },
      { name: "carrots", amount: "2 medium", prep: "Julienne thin, pickle with daikon" },
      { name: "char siu pork or pâté", amount: "200g", prep: "Slice thin — room temperature" },
      { name: "Vietnamese pâté (gan)", amount: "4 tbsp", prep: "Spread on inside of bread while still warm" },
      { name: "mayonnaise", amount: "4 tbsp", prep: "Spread on opposite side of bread from pâté" },
      { name: "jalapeño", amount: "2", prep: "Slice thin rings — seeds in for heat" },
      { name: "cucumber", amount: "1/2", prep: "Slice lengthwise into thin strips" },
      { name: "cilantro", amount: "1 bunch", prep: "Keep stems and leaves — layer generously inside" },
      { name: "Maggi seasoning", amount: "few drops", prep: "Drizzle inside bread — secret umami layer" },
    ],
    steps: [
      {
        text: "Prepare your pickles first — they need 30 minutes minimum. Julienne 100g of daikon radish and 2 carrots into fine matchsticks. Combine 4 tablespoons of rice vinegar, 2 tablespoons of sugar, and 1 teaspoon of salt. Pour over the vegetables and leave at room temperature for at least 30 minutes until they soften slightly and turn lightly sour.",
        duration: 30,
        visualCues: ["pickling vegetables", "brine turning slightly orange"],
        checkpoints: ["vegetables slightly softened", "brine tangy"],
      },
      {
        text: "Heat your 2 Vietnamese baguettes in a 200°C oven for 5 minutes until the crust crackles audibly when you tap it. This step is critical — a bánh mì is only as good as its bread. The crust must be light, crispy, and shattering while the inside stays soft and airy.",
        duration: 5,
        visualCues: ["crackling crust", "airy interior visible when cut"],
        checkpoints: ["crust shatters when pressed", "inside soft and airy"],
      },
      {
        text: "Working while the bread is still warm, split each baguette lengthwise. Spread 2 tablespoons of pâté on one side and 2 tablespoons of mayonnaise on the other — both should go all the way to the edges. Add a few drops of Maggi seasoning sauce over the pâté if you have it — this is the secret ingredient of great bánh mì stalls.",
        duration: 3,
        visualCues: ["pâté and mayo layers", "even spread to edges"],
        checkpoints: ["both condiments applied", "reached to bread ends"],
      },
      {
        text: "Layer in your filling: start with slices of 200g of char siu pork or cold cuts, then drain and add your pickled vegetables, followed by sliced jalapeños, cucumber batons, and a generous handful of fresh cilantro — stems and all. Press the sandwich closed and cut in half on the diagonal. Eat immediately while the bread is still warm and crackling.",
        duration: 4,
        visualCues: ["colourful layered filling", "sandwich pressed closed"],
        checkpoints: ["all layers present", "bread still warm"],
      },
    ],
  },
  {
    id: 17,
    region: "southeast-asia",
    name: "Beef Rendang",
    image: "https://source.unsplash.com/800x600/?beef+rendang+indonesian",
    time: "120 min",
    difficulty: "Hard",
    rating: 4.9,
    calories: 580,
    tags: ["Beef", "Slow-cooked"],
    description:
      "Slow-cooked beef dry-fried in coconut and spice paste until caramelized",
    ingredients: [
      { name: "beef chuck", amount: "1 kg", prep: "Cut into 5cm chunks — against grain, fat marbling essential for final texture" },
      { name: "coconut milk", amount: "800ml (2 cans)", prep: "Reserve thick cream from top of one can separately" },
      { name: "lemongrass", amount: "3 stalks", prep: "Bruise bottom third, tie in knot — remove before serving" },
      { name: "kaffir lime leaves", amount: "6", prep: "Tear, add whole to pot" },
      { name: "turmeric leaf", amount: "2", prep: "Tear and add to pot — substitute with extra galangal if unavailable" },
      { name: "shallots", amount: "8", prep: "Roughly chop for spice paste, blend with other paste ingredients" },
      { name: "garlic", amount: "6 cloves", prep: "Add to paste blend" },
      { name: "galangal", amount: "40g", prep: "Slice and add to paste blend" },
      { name: "fresh turmeric", amount: "30g", prep: "Peel and add to paste — or 2 tsp powder" },
      { name: "dried red chilies", amount: "12", prep: "Soak in hot water 15 min, drain — adjust for heat preference" },
      { name: "toasted coconut (kerisik)", amount: "80g", prep: "Toast desiccated coconut in dry pan until deep golden, blend to paste" },
    ],
    steps: [
      {
        text: "Make the spice paste: combine 8 shallots, 6 garlic cloves, 40g of galangal, 30g of fresh turmeric, and 12 soaked dried red chillies in a blender. Process for 3 minutes until completely smooth — there should be no visible fibres remaining. Heat 3 tablespoons of oil in a heavy wok and fry the paste over medium heat for 5 minutes until it turns a deeper orange and the raw smell transforms to something complex and fragrant.",
        duration: 10,
        visualCues: ["smooth spice paste", "deepening colour"],
        checkpoints: ["fully smooth paste", "colour deepened", "fragrant not raw"],
      },
      {
        text: "Cut 1 kg of beef chuck into 5cm chunks against the grain — the fat marbling is essential, do not trim it. Add the beef to the wok and turn to coat every surface in the paste. Brown the beef in batches over high heat for 3 minutes per side until you see a deep, dark sear forming. This caramelisation creates layers of flavour that the long braise will develop.",
        duration: 15,
        visualCues: ["deep brown sear on beef", "paste coating every piece"],
        checkpoints: ["deep sear visible", "all surfaces browned"],
      },
      {
        text: "Add both cans of coconut milk (800ml total), 3 bruised lemongrass stalks, 6 kaffir lime leaves, and 80g of toasted coconut paste (kerisik). Bring to a boil, then reduce to a steady simmer. Cook uncovered for 90 minutes, stirring every 10 minutes. The sauce will gradually reduce and deepen in colour — from pale to amber to chocolate brown.",
        duration: 90,
        visualCues: ["sauce reducing and darkening", "beef tenderising"],
        checkpoints: ["sauce noticeably thickened", "beef very tender"],
      },
      {
        text: "After 90 minutes, the sauce should be almost entirely evaporated. Continue cooking and stirring more frequently — the beef will now start to fry in the remaining fat rather than simmer in liquid. This is the critical stage: the beef caramelises, turns very dark, and the aroma shifts from coconut to something almost smoky and caramelised. This takes another 20–30 minutes of careful attention.",
        duration: 25,
        visualCues: ["dark caramelised coating", "beef frying in fat", "no liquid remaining"],
        checkpoints: ["completely dry", "deep dark caramelised coating", "beef sizzling not simmering"],
      },
    ],
  },
  {
    id: 18,
    region: "southeast-asia",
    name: "Pad See Ew",
    image: "https://source.unsplash.com/800x600/?pad+see+ew+thai+noodles",
    time: "20 min",
    difficulty: "Easy",
    rating: 4.6,
    calories: 520,
    tags: ["Noodles", "Wok-fired"],
    description: "Smoky flat rice noodles with Chinese broccoli and sweet soy",
    ingredients: [
      { name: "wide rice noodles (sen yai)", amount: "400g", prep: "If fresh — separate by hand gently, room temp. If dried — soak 20 min" },
      { name: "chicken breast or pork", amount: "200g", prep: "Slice very thin against grain, marinate in oyster sauce + soy 15 min" },
      { name: "Chinese broccoli (gai lan)", amount: "200g", prep: "Separate stems and leaves — stems go in first, leaves follow" },
      { name: "eggs", amount: "2", prep: "Break into wok, scramble quickly — mix with noodles while still soft" },
      { name: "dark soy sauce", amount: "3 tbsp", prep: "Mix with oyster sauce and sugar into sauce before cooking" },
      { name: "oyster sauce", amount: "2 tbsp", prep: "Part of sauce mixture" },
      { name: "light soy sauce", amount: "1 tbsp", prep: "Balance the dark soy" },
      { name: "sugar", amount: "1 tsp", prep: "Dissolve into sauce" },
      { name: "garlic", amount: "4 cloves", prep: "Mince very finely — goes in first in screaming hot wok" },
    ],
    steps: [
      {
        text: "If using dried wide rice noodles, soak in room-temperature water for 20 minutes until pliable but still firm. If using fresh sen yai noodles, separate them gently by hand at room temperature. The key with flat rice noodles is to never wash them before stir-frying — you need the surface starch for the sauce to cling.",
        duration: 20,
        visualCues: ["pliable flat noodles", "separated gently"],
        checkpoints: ["flexible but not mushy", "not washed"],
      },
      {
        text: "Make your sauce: combine 3 tablespoons of dark soy sauce, 2 tablespoons of oyster sauce, 1 tablespoon of light soy sauce, and 1 teaspoon of sugar. Set aside. Slice 200g of chicken thinly against the grain and marinate briefly in oyster sauce for 10 minutes. Separate the stems and leaves of 200g of Chinese broccoli.",
        duration: 12,
        visualCues: ["dark sauce mixture", "marinating chicken"],
        checkpoints: ["sauce combined", "broccoli stems separated from leaves"],
      },
      {
        text: "Get your wok violently hot — hold your hand a foot above it and you should feel intense heat. Add 2 tablespoons of oil, then mince 4 garlic cloves directly into the wok. It should sizzle immediately and furiously. Add the chicken and press it flat against the hot wok surface — do not stir for 45 seconds, then flip. Total chicken cooking time: 3 minutes.",
        duration: 4,
        visualCues: ["immediate violent sizzle", "char on chicken"],
        checkpoints: ["garlic golden not burnt", "chicken with char marks"],
      },
      {
        text: "Push the chicken aside and crack 2 eggs into the empty space. Let them sit for 15 seconds until the whites just begin to set, then scramble gently and mix with the chicken. Add the broccoli stems first, then 30 seconds later the noodles. Pour the sauce around the edges of the wok — it will sizzle and create steam. Toss everything with tongs for 3 minutes.",
        duration: 4,
        visualCues: ["eggs scrambled with noodles", "glossy dark noodles"],
        checkpoints: ["noodles dark and glossy", "eggs mixed through"],
      },
      {
        text: "Add the broccoli leaves in the last 30 seconds — they wilt almost instantly. Taste and adjust: more oyster sauce for sweetness, dark soy for colour, a pinch of sugar if too salty. Plate immediately — the wok hei (breath of the wok) dissipates within minutes of leaving the heat.",
        duration: 2,
        visualCues: ["wilted bright green leaves", "glossy dark noodles"],
        checkpoints: ["leaves wilted but still green", "well seasoned"],
      },
    ],
  },
  {
    id: 19,
    region: "southeast-asia",
    name: "Mango Sticky Rice",
    image: "https://source.unsplash.com/800x600/?mango+sticky+rice+thai+dessert",
    time: "30 min",
    difficulty: "Easy",
    rating: 4.9,
    calories: 390,
    tags: ["Dessert", "Tropical"],
    description: "Sweet glutinous rice with coconut cream and ripe mango",
    ingredients: [
      { name: "glutinous rice", amount: "2 cups", prep: "Soak in cold water 4–8 hrs or overnight — essential for proper texture" },
      { name: "ripe mango (Ataulfo or Nam Dok Mai)", amount: "2", prep: "Peel and slice lengthwise in flat slices — serve at room temperature" },
      { name: "coconut milk", amount: "400ml", prep: "Divide into 2 portions — one for cooking rice, one for sauce" },
      { name: "sugar", amount: "4 tbsp", prep: "Divide between rice mixture and sauce" },
      { name: "salt", amount: "1 tsp", prep: "Add pinch to both rice mixture and sauce" },
      { name: "pandan leaves", amount: "2", prep: "Tie in knot, steep in coconut milk while warm for fragrance" },
      { name: "mung beans (split)", amount: "2 tbsp", prep: "Toast in dry pan until golden — sprinkle on top as garnish" },
      { name: "sesame seeds", amount: "1 tsp", prep: "Toast lightly — additional garnish" },
    ],
    steps: [
      {
        text: "The night before: wash 2 cups of glutinous rice until the water runs completely clear, then soak in cold water for a minimum of 4 hours — overnight is ideal. Glutinous rice will not cook properly without soaking; the water needs to penetrate the dense starch granules.",
        duration: 5,
        visualCues: ["rice soaking in clear water"],
        checkpoints: ["water clear after washing", "rice soaking"],
      },
      {
        text: "Drain the soaked rice and transfer to a bamboo steamer lined with cheesecloth. Steam over vigorously boiling water for 25–30 minutes, turning once halfway. The rice is ready when every grain has turned translucent and sticks together without being mushy. Properly steamed sticky rice should pull apart in satisfying elastic clumps.",
        duration: 30,
        visualCues: ["translucent sticky grains", "elastic pulling apart"],
        checkpoints: ["every grain translucent", "sticky but not mushy"],
      },
      {
        text: "While the rice steams, make your coconut sauce. Combine 300ml of coconut milk with 3 tablespoons of sugar and 1/2 teaspoon of salt in a saucepan. Warm over medium heat, stirring until the sugar dissolves completely. Do not boil. Add 2 torn pandan leaves and steep off the heat for 10 minutes for fragrance.",
        duration: 12,
        visualCues: ["creamy coconut sauce", "sugar dissolved"],
        checkpoints: ["sugar fully dissolved", "gently fragrant"],
      },
      {
        text: "Transfer the hot rice to a bowl and pour the warm coconut sauce over it immediately — hot rice absorbs the sauce much more effectively than cool rice. Stir gently, then cover and rest for 15 minutes. The rice will absorb the coconut milk completely, becoming glossy, sweet, and fragrant.",
        duration: 16,
        visualCues: ["rice absorbing coconut sauce", "glossy glistening grains"],
        checkpoints: ["sauce fully absorbed", "rice glossy and fragrant"],
      },
      {
        text: "Peel your 2 ripe Ataulfo or Nam Dok Mai mangoes and slice lengthwise in broad flat slices. Arrange alongside a moulded portion of sticky rice. For the finishing sauce, warm 100ml of coconut milk with a pinch of salt and drizzle over. Sprinkle 2 tablespoons of toasted split mung beans for crunch. The sweetness of the mango, richness of the coconut rice, and the crunchy beans must all be eaten together.",
        duration: 5,
        visualCues: ["mango slices alongside rice", "sauce drizzle", "mung beans scattered"],
        checkpoints: ["mango ripe and sweet", "beautiful presentation"],
      },
    ],
  },
  {
    id: 20,
    region: "southeast-asia",
    name: "Chicken Satay",
    image: "https://source.unsplash.com/800x600/?chicken+satay+peanut+sauce",
    time: "30 min",
    difficulty: "Easy",
    rating: 4.7,
    calories: 380,
    tags: ["Grilled", "Chicken", "Peanut"],
    description: "Turmeric-marinated chicken skewers with peanut dipping sauce",
    ingredients: [
      { name: "chicken thighs (boneless)", amount: "600g", prep: "Slice lengthwise into 2cm wide strips — thighs stay juicier than breast" },
      { name: "lemongrass", amount: "2 stalks", prep: "Use white part only, mince very finely for marinade" },
      { name: "turmeric", amount: "1 tsp", prep: "Fresh grated or powder — gives yellow colour" },
      { name: "galangal", amount: "20g", prep: "Mince finely for marinade" },
      { name: "garlic", amount: "3 cloves", prep: "Mince for marinade" },
      { name: "palm sugar", amount: "2 tbsp", prep: "Shave or grate — dissolves into marinade" },
      { name: "roasted peanuts", amount: "200g", prep: "Blend coarsely — foundation of satay sauce" },
      { name: "coconut milk", amount: "200ml", prep: "Add to peanut sauce, simmer to desired consistency" },
      { name: "tamarind paste", amount: "2 tbsp", prep: "Dissolve in warm water, strain — adds sourness to sauce" },
      { name: "bamboo skewers", amount: "20", prep: "Soak in cold water 30 min to prevent burning" },
    ],
    steps: [
      {
        text: "Make your marinade: in a blender, combine 2 stalks of minced lemongrass white parts, 20g of galangal, 3 garlic cloves, 1 teaspoon of turmeric, and 2 tablespoons of palm sugar. Blend to a smooth paste. Cut 600g of boneless chicken thighs into long 2cm-wide strips — thighs stay succulent, breast dries out. Coat the chicken thoroughly in the marinade and refrigerate for a minimum of 2 hours.",
        duration: 10,
        visualCues: ["chicken strips evenly coated", "yellow marinade"],
        checkpoints: ["evenly coated", "marinating minimum 2 hours"],
      },
      {
        text: "For the satay sauce, blend 200g of roasted peanuts to a coarse texture with some chunks remaining — never a smooth paste, texture is everything. In a saucepan, fry 2 minced shallots in oil for 2 minutes. Add 2 tablespoons of tamarind paste, 2 tablespoons of palm sugar, 200ml of coconut milk, and the blended peanuts. Simmer for 10 minutes, stirring constantly, until thickened. Season with salt and a squeeze of lime.",
        duration: 15,
        visualCues: ["thick peanut sauce", "some texture visible"],
        checkpoints: ["sauce thick and coating spoon", "some peanut texture remaining"],
      },
      {
        text: "Thread the marinated chicken strips lengthwise onto soaked bamboo skewers — weave the skewer through the meat 3–4 times so it lies flat and cooks evenly. This technique ensures the chicken doesn't spin on the skewer and allows both sides to cook at the same rate.",
        duration: 10,
        visualCues: ["flat threaded skewers", "even meat distribution"],
        checkpoints: ["meat lies flat on skewer", "evenly threaded"],
      },
      {
        text: "Grill over high direct heat for 3–4 minutes per side without moving. You want defined char marks and a caramelised exterior while the interior stays juicy. In the last minute, brush lightly with the remaining marinade thinned with a little oil for a glossy finish.",
        duration: 8,
        visualCues: ["clear char marks", "golden caramelised surface"],
        checkpoints: ["char marks on both sides", "juices run clear"],
      },
      {
        text: "Serve the skewers on a bed of sliced cucumber and shallots with the warm peanut sauce on the side for dipping. Authentic satay is always accompanied by compressed rice cakes (ketupat) and a fresh cucumber relish. The sauce should be poured generously — satay without abundant sauce is not satay.",
        duration: 3,
        visualCues: ["plated skewers", "peanut sauce alongside"],
        checkpoints: ["sauce warm and pourable", "cucumber and shallot garnish present"],
      },
    ],
  },

  // SOUTH ASIA
  {
    id: 21,
    region: "south-asia",
    name: "Butter Chicken",
    image: "https://source.unsplash.com/800x600/?butter+chicken+indian+curry",
    time: "45 min",
    difficulty: "Medium",
    rating: 4.9,
    calories: 520,
    tags: ["Chicken", "Curry", "Rich"],
    description: "Tender chicken in velvety tomato and butter cream sauce",
    ingredients: [
      { name: "chicken thighs", amount: "800g", prep: "Cut into large chunks, score deeply — marinate in yogurt + spices 4 hrs minimum, overnight ideal" },
      { name: "full-fat yogurt", amount: "150ml", prep: "Mix with spices for first marinade — tenderises chicken" },
      { name: "kashmiri chili powder", amount: "2 tsp", prep: "Adds red colour without heat — mix into marinade" },
      { name: "tomatoes", amount: "400g", prep: "Quarter and blend smooth, or use crushed canned tomatoes" },
      { name: "butter", amount: "60g", prep: "Use cold butter and add in cubes at end for glossy sauce" },
      { name: "heavy cream", amount: "150ml", prep: "Add at very end off heat — stir in gently" },
      { name: "onion", amount: "2 large", prep: "Slice thin, caramelise in oil 20 min until deep golden — base of sauce" },
      { name: "garlic", amount: "6 cloves", prep: "Grate on microplane or mince very fine" },
      { name: "ginger", amount: "40g", prep: "Grate on microplane — equal amount to garlic" },
      { name: "garam masala", amount: "2 tsp", prep: "Add half at start, half at finish — layering spice depth" },
      { name: "fenugreek leaves (kasuri methi)", amount: "2 tbsp", prep: "Crush between palms before adding — releases more aroma" },
      { name: "cashews", amount: "50g", prep: "Soak in hot water 20 min, blend with tomato for creamier sauce" },
    ],
    steps: [
      {
        text: "First marinade: combine 150ml of full-fat yogurt with 2 teaspoons of Kashmiri chilli powder, 1 teaspoon of turmeric, 1 teaspoon of garam masala, the juice of 1 lemon, and 2 teaspoons of salt. Score 800g of chicken thighs deeply with a knife and coat in this marinade. Refrigerate for a minimum of 4 hours — overnight develops extraordinary depth.",
        duration: 10,
        visualCues: ["deeply red marinade", "scored chicken thoroughly coated"],
        checkpoints: ["deep scoring", "evenly coated in red marinade"],
      },
      {
        text: "Char the chicken: in a very hot pan with 2 tablespoons of oil, cook the marinated chicken in batches for 3–4 minutes per side until deeply charred at the edges — almost burnt. This char is intentional; it creates the complex, smoky backbone of butter chicken. Set aside.",
        duration: 15,
        visualCues: ["charred edges", "smoky surface"],
        checkpoints: ["deep char on all sides", "not burnt through"],
      },
      {
        text: "In a wide pan, melt 40g of butter over medium heat. Add 2 large onions sliced thin and cook, stirring every 5 minutes, for 20 full minutes until they reach a deep, jammy golden brown. Add 6 cloves of grated garlic and 40g of grated ginger. Cook for 3 more minutes. Add 1 teaspoon of garam masala, 2 teaspoons of Kashmiri chilli, and 1 teaspoon of cumin — let the spices cook in the butter for 1 minute.",
        duration: 25,
        visualCues: ["deep golden onions", "aromatic spiced butter"],
        checkpoints: ["onions deep golden brown not pale", "spices bloomed in butter"],
      },
      {
        text: "Add 400g of blended tomatoes or passata. Cook over medium-high heat for 10 minutes, stirring frequently, until the sauce darkens and the oil begins to separate at the edges — this is called the 'bhunao' technique and it concentrates the flavours intensely. Add 50g of blended, soaked cashews if using.",
        duration: 12,
        visualCues: ["darkened sauce", "oil separating at edges"],
        checkpoints: ["sauce noticeably darker", "oil separating", "concentrated aroma"],
      },
      {
        text: "Add the charred chicken pieces and 150ml of warm water. Simmer for 15 minutes. Remove from heat and stir in 150ml of heavy cream, the remaining 20g of cold butter in small cubes, and 2 tablespoons of crushed kasuri methi (fenugreek leaves) — crush them between your palms to release maximum aroma. Stir until the butter melts into a glossy, velvety sauce. Do not boil again after adding cream.",
        duration: 17,
        visualCues: ["glossy velvety sauce", "butter melting in"],
        checkpoints: ["sauce glossy and velvety", "cream fully incorporated"],
      },
    ],
  },
  {
    id: 22,
    region: "south-asia",
    name: "Hyderabadi Biryani",
    image: "https://source.unsplash.com/800x600/?biryani+indian+rice",
    time: "90 min",
    difficulty: "Hard",
    rating: 4.9,
    calories: 640,
    tags: ["Rice", "Lamb", "Festive"],
    description: "Fragrant layered rice with marinated lamb and saffron",
    ingredients: [
      { name: "bone-in mutton or chicken", amount: "1 kg", prep: "Marinate in yogurt + spices + fried onions + lemon juice minimum 4 hrs, overnight best" },
      { name: "basmati rice", amount: "3 cups", prep: "Wash 5 times, soak 30 min, parboil 70% in heavily salted spiced water — must be al dente" },
      { name: "onions", amount: "4 large", prep: "Slice very thin, deep fry in batches until deep golden brown (birista) — drain on paper" },
      { name: "full-fat yogurt", amount: "200ml", prep: "Whisk smooth, add to meat marinade" },
      { name: "saffron", amount: "generous pinch", prep: "Soak in 4 tbsp warm milk 20 min — drizzle over top rice layer" },
      { name: "mint leaves", amount: "large bunch", prep: "Separate leaves — layer between rice and meat" },
      { name: "ghee", amount: "4 tbsp", prep: "Drizzle over each rice layer" },
      { name: "whole spices (bay, cardamom, clove, star anise)", amount: "mixed", prep: "Toast briefly in hot ghee at start to bloom" },
      { name: "lemon", amount: "2", prep: "Juice over marinating meat and over rice layers" },
      { name: "rose water", amount: "2 tbsp", prep: "Sprinkle over top of sealed pot before dum cooking" },
    ],
    steps: [
      {
        text: "Begin 4 hours ahead for the marinade. Combine 200ml of yogurt, 1 tablespoon of garam masala, 2 teaspoons of red chilli powder, 1 teaspoon of turmeric, the juice of 2 lemons, half of the deep-fried onions (birista), a handful of mint leaves, and 2 teaspoons of salt. Coat 1 kg of bone-in mutton or chicken pieces thoroughly. The longer it marinates, the more tender and flavourful.",
        duration: 15,
        visualCues: ["deep red marinating meat", "yogurt coating"],
        checkpoints: ["fully coated", "marinating at least 4 hours"],
      },
      {
        text: "Fry 4 large thinly sliced onions in batches in hot oil — each batch takes 12–15 minutes over medium-high heat until a deep golden brown, almost mahogany. Spread on kitchen paper immediately to crisp up. These birista onions are used in the marinade, layered into the biryani, and scattered on top. They are the signature ingredient.",
        duration: 45,
        visualCues: ["deep golden crispy onions", "draining on paper"],
        checkpoints: ["deep mahogany colour", "crispy not soggy"],
      },
      {
        text: "Parboil 3 cups of washed, soaked basmati rice in 4 litres of boiling water seasoned with whole spices (2 bay leaves, 4 cardamom pods, 1 cinnamon stick), salt, and 2 tablespoons of lemon juice. Cook for exactly 7 minutes — the rice should be 70% cooked, al dente with a visible white core in the centre of each grain. Drain immediately.",
        duration: 10,
        visualCues: ["70% cooked rice", "white core visible in grains"],
        checkpoints: ["white core still visible", "grain not soft"],
      },
      {
        text: "In a heavy-bottomed pot, spread the marinated meat as the bottom layer. Add a layer of half the parboiled rice, then scatter mint leaves, fried onions, and a drizzle of ghee. Add the remaining rice as the second layer. Soak a generous pinch of saffron in 4 tablespoons of warm milk and drizzle over the top layer. Cover tightly with foil, then the lid.",
        duration: 15,
        visualCues: ["layered biryani", "saffron yellow rice on top"],
        checkpoints: ["sealed pot", "saffron drizzled on top layer"],
      },
      {
        text: "Place the sealed pot over high heat for 3 minutes to build steam, then reduce to the lowest possible heat. Cook for 25–30 minutes — this is the dum technique, cooking in its own steam. The rice and meat finish cooking together, absorbing each other's aromatics. Rest for 10 minutes before opening. Serve by mixing layers together gently to distribute the saffron colour.",
        duration: 35,
        visualCues: ["steam escaping edges", "saffron yellow and white rice"],
        checkpoints: ["meat cooked through", "rice fluffy and separate"],
      },
    ],
  },
  {
    id: 23,
    region: "south-asia",
    name: "Dal Makhani",
    image: "https://source.unsplash.com/800x600/?dal+makhani+indian+lentils",
    time: "60 min",
    difficulty: "Medium",
    rating: 4.8,
    calories: 420,
    tags: ["Lentils", "Vegetarian"],
    description: "Slow-simmered black lentils in buttery tomato gravy",
    ingredients: [
      { name: "whole black lentils (urad dal)", amount: "200g", prep: "Soak overnight in cold water — they should nearly double in size" },
      { name: "kidney beans", amount: "50g", prep: "Soak overnight with lentils — or use canned, rinsed" },
      { name: "butter", amount: "80g", prep: "Cold, cut into cubes — stir in at end for richness" },
      { name: "tomatoes", amount: "3 large", prep: "Blanch, peel, and blend smooth — or use passata" },
      { name: "onion", amount: "1 large", prep: "Mince very fine, fry until golden brown" },
      { name: "garlic", amount: "8 cloves", prep: "Mince or grate — fry in butter with ginger" },
      { name: "ginger", amount: "40g", prep: "Grate fine — equal to garlic" },
      { name: "heavy cream", amount: "100ml", prep: "Stir in final 10 min — do not boil after adding" },
      { name: "garam masala", amount: "1 tsp", prep: "Add at end only — preserve aromatic freshness" },
      { name: "kashmiri chili powder", amount: "1 tsp", prep: "Adds colour more than heat" },
    ],
    steps: [
      {
        text: "Drain and rinse the overnight-soaked 200g of black lentils and 50g of kidney beans. Place in a pressure cooker with 1.5 litres of water and cook for 20 minutes at high pressure, or simmer in a regular pot for 60–90 minutes. The lentils should be completely soft — when you press one between your fingers, it should mash effortlessly with no resistance whatsoever.",
        duration: 25,
        visualCues: ["completely soft lentils", "mashable between fingers"],
        checkpoints: ["mashes with no resistance", "tender throughout"],
      },
      {
        text: "In a separate heavy pan, melt 40g of butter over medium heat and fry 1 large finely diced onion for 12 minutes until deeply golden. Add 8 cloves of grated garlic and 40g of grated ginger — fry for 3 more minutes. Add 1 teaspoon of Kashmiri chilli powder and 1 teaspoon of cumin powder, stir for 1 minute, then add 400ml of blended tomatoes. Cook for 15 minutes until the tomato base is thick and the butter separates at the edges.",
        duration: 32,
        visualCues: ["golden onion base", "tomato sauce thickened"],
        checkpoints: ["onions deeply golden", "butter separating from tomato"],
      },
      {
        text: "Add the cooked lentils and their cooking liquid to the tomato base. The consistency should be thick — if too thin, cook uncovered over medium heat. Dal makhani is traditionally simmered for 3–4 hours on very low heat; the longer it cooks, the more complex it becomes. Taste: it should be earthy, rich, and deeply satisfying.",
        duration: 60,
        visualCues: ["thick dark lentil sauce", "slow gentle bubbling"],
        checkpoints: ["thick creamy consistency", "very flavourful"],
      },
      {
        text: "In the final 10 minutes, stir in 100ml of heavy cream and the remaining 40g of cold butter in cubes. Stir until the butter melts completely into a glossy, silky sauce. Add 1 teaspoon of garam masala — add it now, at the end, to preserve its fragrance. Do not boil after adding the cream. Season with salt. Finish with a swirl of cream and a cube of cold butter on top.",
        duration: 12,
        visualCues: ["glossy cream-enriched dal", "butter melting on surface"],
        checkpoints: ["butter fully melted", "glossy not dull surface"],
      },
    ],
  },
  {
    id: 24,
    region: "south-asia",
    name: "Saag Paneer",
    image: "https://source.unsplash.com/800x600/?saag+paneer+indian+spinach",
    time: "35 min",
    difficulty: "Easy",
    rating: 4.6,
    calories: 380,
    tags: ["Vegetarian", "Spinach"],
    description: "Silky blended spinach with golden paneer cubes",
    ingredients: [
      { name: "fresh spinach", amount: "600g", prep: "Blanch 2 min in salted water, immediately ice bath, squeeze completely dry, blend smooth" },
      { name: "paneer", amount: "300g", prep: "Cut 2cm cubes, pan fry in ghee until golden on all sides — keeps shape in curry" },
      { name: "onion", amount: "2 medium", prep: "Mince fine, fry until golden brown — base of masala" },
      { name: "garlic", amount: "5 cloves", prep: "Mince or grate fine" },
      { name: "ginger", amount: "30g", prep: "Grate fine" },
      { name: "tomato", amount: "2 medium", prep: "Blend or chop fine — cook until oil separates" },
      { name: "heavy cream", amount: "4 tbsp", prep: "Swirl in at end for richness" },
      { name: "fenugreek leaves", amount: "1 tbsp", prep: "Crush and add with spinach" },
      { name: "whole spices (cardamom, bay, cumin seeds)", amount: "mixed", prep: "Temper in hot ghee first — 30 sec until fragrant" },
      { name: "ghee", amount: "3 tbsp", prep: "For frying paneer and tempering spices" },
    ],
    steps: [
      {
        text: "Bring a large pot of well-salted water to a rolling boil. Add 600g of fresh spinach and blanch for exactly 2 minutes until wilted and bright green. Transfer immediately to a bowl of iced water — this preserves the vivid green colour and stops further cooking. Once cold, gather the spinach and squeeze out every drop of water with both hands. Blend until completely smooth.",
        duration: 10,
        visualCues: ["vivid green spinach puree", "no visible water"],
        checkpoints: ["brilliant green colour", "completely smooth", "no water remaining"],
      },
      {
        text: "Cut 300g of paneer into 2cm cubes. In a pan, heat 2 tablespoons of ghee over medium-high heat until shimmering. Fry the paneer cubes in a single layer without touching for 2 minutes, then turn and fry all remaining sides until golden. Remove to a plate — the golden crust prevents the paneer from disintegrating in the curry.",
        duration: 8,
        visualCues: ["golden paneer cubes", "crispy exterior"],
        checkpoints: ["golden on all sides", "holds shape"],
      },
      {
        text: "In the same pan, temper 3 cardamom pods, 1 bay leaf, and 1 teaspoon of cumin seeds in 1 tablespoon of ghee for 30 seconds until they splutter. Add 2 finely diced onions and cook for 12 minutes until golden. Add 5 minced garlic cloves and 30g of grated ginger — 3 more minutes. Add 2 diced tomatoes and cook until completely broken down and the oil separates.",
        duration: 20,
        visualCues: ["golden masala base", "oil separating"],
        checkpoints: ["onions golden brown", "tomatoes completely dissolved"],
      },
      {
        text: "Add the spinach puree, 1 teaspoon of fenugreek leaves, and season with salt. Stir everything together and simmer for 5 minutes. If the colour is dull, you haven't blanched and ice-bathed correctly — the green should be bright and vivid. Stir in 4 tablespoons of heavy cream for richness.",
        duration: 7,
        visualCues: ["vivid green creamy sauce"],
        checkpoints: ["vivid green not dull", "creamy consistency"],
      },
      {
        text: "Gently fold in the fried paneer cubes and heat through for 3 minutes — do not stir aggressively or the paneer will break. Serve with a small piece of cold butter placed on top to melt at the table, alongside hot naan or roti.",
        duration: 4,
        visualCues: ["paneer cubes intact in green sauce"],
        checkpoints: ["paneer holds shape", "sauce coating each cube"],
      },
    ],
  },
  {
    id: 25,
    region: "south-asia",
    name: "Lamb Rogan Josh",
    image: "https://source.unsplash.com/800x600/?rogan+josh+kashmiri+lamb",
    time: "75 min",
    difficulty: "Medium",
    rating: 4.8,
    calories: 560,
    tags: ["Lamb", "Curry"],
    description:
      "Aromatic Kashmiri lamb curry with deep red chilies and yogurt",
    ingredients: [
      { name: "bone-in lamb shoulder", amount: "1 kg", prep: "Cut into large chunks — bone adds flavour, do not remove" },
      { name: "full-fat yogurt", amount: "200ml", prep: "Whisk until smooth, add in 3 stages to prevent curdling" },
      { name: "kashmiri dried red chilies", amount: "8", prep: "Deseed, soak in hot water 15 min, blend to paste — gives deep red color" },
      { name: "fennel seeds", amount: "2 tsp", prep: "Toast and grind fresh — key aromatic in Kashmiri cooking" },
      { name: "dried ginger powder (sonth)", amount: "1 tsp", prep: "Kashmiri spice — use dried not fresh for authentic flavour" },
      { name: "onion", amount: "2 large", prep: "Slice thin, deep fry until crispy golden brown" },
      { name: "garlic", amount: "6 cloves", prep: "Mince — add after onion is fried" },
      { name: "whole spices (cardamom, cloves, bay, cinnamon)", amount: "mixed", prep: "Toast in hot oil first until they sputter" },
      { name: "ghee", amount: "4 tbsp", prep: "Use ghee not oil — authentic fat for this dish" },
    ],
    steps: [
      {
        text: "Soak 8 Kashmiri dried red chillies — deseeded — in hot water for 15 minutes. Blend with 2 tablespoons of water to a smooth, deep red paste. Kashmiri chillies provide colour far more than heat; this paste is what gives rogan josh its extraordinary colour without being fiery.",
        duration: 18,
        visualCues: ["deep red smooth paste"],
        checkpoints: ["completely smooth paste", "deep vivid red"],
      },
      {
        text: "Heat 4 tablespoons of ghee in a heavy pot over high heat. Add 1 cinnamon stick, 4 cardamom pods, 4 cloves, and 2 bay leaves — let them spit and splutter for 30 seconds. Add 2 large thinly sliced onions and fry for 15 minutes over medium heat until deeply golden and fragrant.",
        duration: 18,
        visualCues: ["sputtering whole spices", "golden onions"],
        checkpoints: ["spices fragrant and sputtering", "onions deep golden"],
      },
      {
        text: "Add 6 cloves of minced garlic and fry 2 more minutes. Add the Kashmiri chilli paste and 1 teaspoon of dried ginger powder (sonth) — this dried ginger is the authentic Kashmiri ingredient, not fresh. Stir and fry for 3 minutes until the paste darkens slightly and the ghee takes on a deep red hue.",
        duration: 6,
        visualCues: ["deep red spiced ghee", "fragrant paste"],
        checkpoints: ["ghee turned deep red", "very fragrant"],
      },
      {
        text: "Add 1 kg of bone-in lamb shoulder pieces and turn to coat every surface in the spiced paste. Brown over high heat for 5 minutes per side. Add 2 teaspoons of fennel seed powder and toast 1 more minute. Then add 200ml of yogurt in 3 stages — add one third, stir until absorbed, repeat. This staging prevents the yogurt from curdling.",
        duration: 20,
        visualCues: ["lamb coated in deep red paste", "yogurt absorbed in stages"],
        checkpoints: ["lamb browned", "yogurt fully incorporated not curdled"],
      },
      {
        text: "Add enough water to barely cover the lamb. Bring to a boil, then simmer covered for 60 minutes until the lamb is yielding and beginning to pull from the bones. Remove the lid and reduce the sauce for 10 minutes until it coats the meat thickly. The oil from the ghee will rise to the surface when the sauce is ready — this is a traditional indicator.",
        duration: 70,
        visualCues: ["oil rising to surface", "thick coating sauce"],
        checkpoints: ["lamb pulling from bones", "oil visible on surface", "thick sauce"],
      },
    ],
  },
  {
    id: 26,
    region: "south-asia",
    name: "Chole Bhature",
    image: "https://source.unsplash.com/800x600/?chole+bhature+indian+chickpea",
    time: "40 min",
    difficulty: "Medium",
    rating: 4.7,
    calories: 580,
    tags: ["Chickpeas", "Street Food", "Fried Bread"],
    description: "Spiced chickpeas with puffed deep-fried bread",
    ingredients: [
      { name: "dried chickpeas", amount: "250g", prep: "Soak overnight with 1 tsp baking soda — they should be very soft when cooked" },
      { name: "onion", amount: "3 large", prep: "2 blended to paste for gravy, 1 finely chopped for tempering" },
      { name: "tomatoes", amount: "3 large", prep: "Blend smooth with soaked dried red chilies" },
      { name: "tea bags", amount: "2", prep: "Boil chickpeas with tea bags — gives dark colour without any tea flavour" },
      { name: "all-purpose flour", amount: "300g", prep: "Mix with yogurt, baking soda, oil, salt — knead 10 min, rest covered 2 hrs" },
      { name: "full-fat yogurt", amount: "100ml", prep: "Mix into bhature dough — makes it puff and stay soft" },
      { name: "pomegranate powder (anardana)", amount: "1 tsp", prep: "Grind dried pomegranate seeds — adds tangy sourness" },
      { name: "dried mango powder (amchur)", amount: "1 tsp", prep: "Mix with other spices for chole masala" },
      { name: "oil", amount: "for deep frying", prep: "Heat to 180°C — bhature should puff within seconds of entering oil" },
    ],
    steps: [
      {
        text: "Drain 250g of overnight-soaked chickpeas. Place in a pot with 1 litre of water and 2 tea bags — the tannins in the tea will darken the chickpeas to that characteristic deep brown colour without any tea flavour. Add 1 teaspoon of baking soda. Bring to a boil and cook for 45–60 minutes until completely tender — a chickpea should mash with no resistance.",
        duration: 60,
        visualCues: ["dark brown tender chickpeas", "mashing easily"],
        checkpoints: ["deep brown colour", "mashes completely with no resistance"],
      },
      {
        text: "For the masala, blend 2 onions with 3 tomatoes and 2 dried red chillies into a smooth paste. In a pan, heat 3 tablespoons of oil and fry this paste over high heat for 15 minutes, stirring frequently, until it darkens significantly and the oil begins to separate. This long frying of the masala paste is where the depth of chole comes from.",
        duration: 18,
        visualCues: ["deep dark masala", "oil separating"],
        checkpoints: ["masala significantly darkened", "oil separating at edges"],
      },
      {
        text: "Add 1 teaspoon of amchur (dried mango powder), 1 teaspoon of anardana (pomegranate powder), 2 teaspoons of chole masala, and the cooked chickpeas with their cooking liquid. Simmer for 20 minutes, mashing a few chickpeas against the side of the pot to naturally thicken the gravy. It should be thick and dark.",
        duration: 22,
        visualCues: ["thick dark gravy", "some chickpeas mashed"],
        checkpoints: ["thick sauce", "some chickpeas broken down for body"],
      },
      {
        text: "For the bhature, combine 300g of flour, 100ml of yogurt, 1/2 teaspoon of baking soda, 2 tablespoons of oil, and 1 teaspoon of salt. Knead for 8 minutes until smooth. Rest covered for 2 hours minimum. Divide into balls, roll each into an oval about 3mm thick. Fry in oil at 180°C — it should puff dramatically within 5 seconds.",
        duration: 130,
        visualCues: ["puffed golden bhature", "dramatic puffing in oil"],
        checkpoints: ["puffs within 5 seconds of entering oil", "golden not pale"],
      },
    ],
  },
  {
    id: 27,
    region: "south-asia",
    name: "Sri Lankan Fish Curry",
    image: "https://source.unsplash.com/800x600/?fish+curry+sri+lankan",
    time: "30 min",
    difficulty: "Easy",
    rating: 4.7,
    calories: 340,
    tags: ["Fish", "Coconut", "Spicy"],
    description:
      "Tangy coconut fish curry with Goraka and roasted curry powder",
    ingredients: [
      { name: "firm white fish (kingfish or tuna)", amount: "600g", prep: "Cut into 5cm steaks, rub with turmeric and salt, rest 15 min" },
      { name: "coconut milk", amount: "400ml", prep: "Shake well — reserve thick part for finishing" },
      { name: "goraka (gamboge)", amount: "3 pieces", prep: "Soak in hot water 10 min — gives sour notes, substitute with tamarind" },
      { name: "roasted Sri Lankan curry powder", amount: "2 tbsp", prep: "Toast raw spice blend in dry pan until very dark — roasted version is essential" },
      { name: "pandan leaf", amount: "2", prep: "Tie in knot — infuses flavour, remove before serving" },
      { name: "curry leaves", amount: "20 leaves", prep: "Add fresh — fry in oil first until crisp" },
      { name: "onion", amount: "2 medium", prep: "Slice thin half-moons" },
      { name: "green chilies", amount: "3", prep: "Slit lengthwise, leave whole" },
      { name: "tomatoes", amount: "2", prep: "Quarter — cook until broken down into sauce" },
    ],
    steps: [
      {
        text: "Cut 600g of firm white fish into 5cm steaks. In a bowl, combine 1 teaspoon of turmeric, 1 teaspoon of salt, and a splash of water. Rub this over every surface of the fish and set aside for 15 minutes. The turmeric protects the fish from falling apart and adds its characteristic earthy note.",
        duration: 18,
        visualCues: ["yellow turmeric coating on fish", "fish resting"],
        checkpoints: ["evenly coated in yellow", "15 minutes rest"],
      },
      {
        text: "In a wide pan, heat 2 tablespoons of coconut oil over medium heat. Add 20 fresh curry leaves — they will spit violently, stand back. Fry for 1 minute until crispy. Add 2 sliced onions, 2 knotted pandan leaves, and 3 green chillies. Cook for 8 minutes until the onions soften.",
        duration: 10,
        visualCues: ["crispy curry leaves", "fragrant coconut oil base"],
        checkpoints: ["curry leaves crispy", "onions softened"],
      },
      {
        text: "Add 2 tablespoons of roasted Sri Lankan curry powder — roasted, not raw. Fry in the oil for 1 minute. Add 2 quartered tomatoes and 3 pieces of goraka (or 1 tablespoon of tamarind paste). Cook until the tomatoes break down. Pour in 400ml of coconut milk and bring to a gentle simmer.",
        duration: 12,
        visualCues: ["dark orange curry sauce", "tomatoes broken down"],
        checkpoints: ["tomatoes dissolved", "curry deeply coloured"],
      },
      {
        text: "Gently lower the turmeric-coated fish pieces into the simmering curry. Spoon the sauce over the top of each piece. Cover and cook for 10 minutes at a steady simmer — do not stir or the fish will break apart. The fish is ready when it flakes easily at the thickest point. Season with salt and serve with steamed white rice.",
        duration: 10,
        visualCues: ["fish intact in curry", "sauce coating fish"],
        checkpoints: ["fish flakes at thickest point", "not falling apart"],
      },
    ],
  },
  {
    id: 28,
    region: "south-asia",
    name: "Gulab Jamun",
    image: "https://source.unsplash.com/800x600/?gulab+jamun+indian+dessert",
    time: "35 min",
    difficulty: "Medium",
    rating: 4.9,
    calories: 340,
    tags: ["Dessert", "Sweet", "Deep-fried"],
    description: "Soft milk-solid dumplings soaked in rose and cardamom syrup",
    ingredients: [
      { name: "khoya (dried whole milk)", amount: "250g", prep: "Grate or crumble fine — if too hard, microwave 20 sec to soften" },
      { name: "all-purpose flour", amount: "40g", prep: "Sift — just enough to bind, too much makes them hard" },
      { name: "baking powder", amount: "1/4 tsp", prep: "Mix with flour — creates slight puff" },
      { name: "milk", amount: "2–3 tbsp", prep: "Add gradually — dough should just come together, not sticky" },
      { name: "sugar", amount: "400g", prep: "Dissolve in 400ml water, bring to 1-thread consistency syrup" },
      { name: "cardamom pods", amount: "6", prep: "Crack open, use seeds only — grind and add to syrup" },
      { name: "rose water", amount: "2 tbsp", prep: "Add to syrup off heat — evaporates if added while hot" },
      { name: "saffron strands", amount: "pinch", prep: "Soak in 1 tbsp warm water — add to syrup for colour" },
      { name: "oil", amount: "for deep frying", prep: "Medium-low heat 160°C — balls must cook slowly to cook through" },
    ],
    steps: [
      {
        text: "Make the sugar syrup first so it has time to cool to warm temperature. Combine 400g of sugar with 400ml of water in a saucepan. Bring to a boil, stirring until the sugar dissolves completely, then simmer for 8 minutes to a one-thread consistency — dip a spoon, let a drop fall, stretch it between two fingers and it should form a single thread. Remove from heat, add 6 crushed cardamom seeds and 2 tablespoons of rose water.",
        duration: 12,
        visualCues: ["clear syrup forming thread", "rose water added"],
        checkpoints: ["one-thread consistency achieved", "syrup warm not hot"],
      },
      {
        text: "Grate or finely crumble 250g of khoya into a bowl. Add 40g of sifted flour, 1/4 teaspoon of baking powder, and a pinch of cardamom. Add milk by the teaspoon — usually 2–3 tablespoons — until the mixture just comes together into a soft, non-sticky dough. Do not overwork it. The dough should feel like soft plasticine.",
        duration: 8,
        visualCues: ["soft smooth dough", "no cracking"],
        checkpoints: ["soft but not sticky", "no cracks when rolled"],
      },
      {
        text: "Divide into equal portions and roll each between your palms into perfectly smooth balls with no cracks — any cracks will cause the gulab jamun to break apart in the oil. Smooth them with a light touch of oil on your palms if needed.",
        duration: 8,
        visualCues: ["perfectly smooth balls", "no surface cracks"],
        checkpoints: ["completely smooth surface", "uniform size"],
      },
      {
        text: "Heat oil to 160°C — medium-low. This is critical: too high and they brown outside while remaining raw inside. Fry a small batch, turning gently with a slotted spoon in constant slow circular motion for 8 minutes until a deep, even mahogany colour all over. Remove and drain briefly.",
        duration: 10,
        visualCues: ["deep mahogany brown balls", "even colour all over"],
        checkpoints: ["deep mahogany not dark brown", "even colour all over"],
      },
      {
        text: "Drop the hot gulab jamun immediately into the warm syrup. They will hiss and absorb the syrup rapidly — let them soak for a minimum of 20 minutes until plumped. They should nearly double in size as the syrup permeates every cell. Serve warm, with a spoonful of syrup poured over, topped with a strand of saffron.",
        duration: 22,
        visualCues: ["swelling plumped balls", "syrup absorbed"],
        checkpoints: ["visibly plumped and swollen", "syrup absorbed throughout"],
      },
    ],
  },
  {
    id: 29,
    region: "south-asia",
    name: "Seekh Kebab",
    image: "https://source.unsplash.com/800x600/?seekh+kebab+pakistani+grilled",
    time: "30 min",
    difficulty: "Medium",
    rating: 4.8,
    calories: 390,
    tags: ["Lamb", "Grilled", "BBQ"],
    description: "Juicy minced lamb kebabs with spices grilled over charcoal",
    ingredients: [
      { name: "minced lamb (20% fat)", amount: "500g", prep: "Refrigerate 1 hr before using — cold fat holds shape better on skewer" },
      { name: "onion", amount: "1 medium", prep: "Grate, squeeze all water out completely — moisture causes kebabs to fall off skewers" },
      { name: "ginger", amount: "30g", prep: "Grate fine, mix into meat" },
      { name: "garlic", amount: "4 cloves", prep: "Grate fine, mix into meat" },
      { name: "green chilies", amount: "2", prep: "Mince very fine, remove seeds if preferred" },
      { name: "fresh cilantro", amount: "handful", prep: "Mince fine — do not add too much or it makes mixture wet" },
      { name: "garam masala", amount: "2 tsp", prep: "Mix all spices together first" },
      { name: "cumin powder", amount: "1 tsp", prep: "Mix with garam masala" },
      { name: "egg", amount: "1", prep: "Bind the mixture — refrigerate assembled kebabs 30 min before grilling" },
      { name: "flat metal skewers", amount: "8", prep: "Metal flat skewers essential — bamboo won't hold the meat shape" },
    ],
    steps: [
      {
        text: "Grate 1 medium onion on a box grater, then wrap in a clean cloth and squeeze out every drop of liquid — this is absolutely critical. Even a small amount of moisture will prevent the kebab from binding to the skewer and it will fall into the coals. The squeezed onion should form a dry ball in your hand.",
        duration: 5,
        visualCues: ["dry compressed grated onion", "no dripping liquid"],
        checkpoints: ["completely dry", "no moisture dripping"],
      },
      {
        text: "In a large bowl, combine 500g of cold minced lamb (20% fat minimum), the dry grated onion, 30g of finely grated ginger, 4 minced garlic cloves, 2 minced green chillies, a handful of minced cilantro, 2 teaspoons of garam masala, 1 teaspoon of cumin, and 1 egg. Mix using your hands, but crucially in one direction only for 3 minutes — this aligns the protein fibres and creates the binding structure. Refrigerate for 30 minutes.",
        duration: 35,
        visualCues: ["sticky uniform meat mixture", "cohesive texture"],
        checkpoints: ["mixture sticks to hand", "no visible separation"],
      },
      {
        text: "Wet your hands with cold water. Take 80g of mixture and mould it around a flat metal skewer, squeezing firmly and pressing into an elongated sausage shape about 15cm long. Wet hands throughout — the cold water prevents sticking and helps shape. Press any cracks shut. Refrigerate the shaped kebabs for 30 minutes — they firm up and hold better on the grill.",
        duration: 15,
        visualCues: ["uniform elongated sausage shape", "smooth surface"],
        checkpoints: ["even thickness throughout", "no cracks on surface"],
      },
      {
        text: "Grill over high, direct heat — ideally charcoal for authentic flavour. Grill for 4 minutes on the first side without moving until you see a crust forming, then turn carefully and cook all remaining sides for 2–3 minutes each. Total time approximately 10–12 minutes. The exterior should be charred with visible grill marks; the interior should remain juicy and just cooked through.",
        duration: 12,
        visualCues: ["charred exterior", "grill marks visible", "glistening interior"],
        checkpoints: ["char marks on all sides", "juicy interior when pressed"],
      },
    ],
  },
  {
    id: 30,
    region: "south-asia",
    name: "Mango Lassi",
    image: "https://source.unsplash.com/800x600/?mango+lassi+indian+drink",
    time: "5 min",
    difficulty: "Easy",
    rating: 4.8,
    calories: 220,
    tags: ["Drink", "Sweet", "Mango"],
    description: "Thick chilled yogurt drink blended with ripe Alphonso mango",
    ingredients: [
      { name: "ripe Alphonso mango", amount: "2 large", prep: "Peel and cube, freeze 1 hr for thicker lassi — or use fresh at room temp" },
      { name: "full-fat yogurt", amount: "300ml", prep: "Use very cold yogurt straight from fridge" },
      { name: "cold milk", amount: "100ml", prep: "Adjust quantity for desired thickness" },
      { name: "sugar", amount: "3 tbsp", prep: "Taste mango first — Alphonso may need less" },
      { name: "cardamom", amount: "1/4 tsp", prep: "Grind pods fresh — pre-ground loses fragrance" },
      { name: "rose water", amount: "1 tsp", prep: "Add last — evaporates if blended too long" },
      { name: "ice cubes", amount: "handful", prep: "Blend with drink for thicker consistency" },
      { name: "saffron", amount: "pinch", prep: "Soak in 1 tbsp warm milk 10 min — swirl on top as garnish" },
    ],
    steps: [
      {
        text: "If your mangoes are not fully ripe — deeply golden-yellow and yielding to gentle pressure — your lassi will be disappointing. Peel 2 large ripe Alphonso mangoes and cut all the flesh from the stone. Place in a blender with 300ml of full-fat cold yogurt, 100ml of cold milk, 3 tablespoons of sugar (taste first — ripe Alphonso may need none), and 1/4 teaspoon of freshly ground cardamom. Blend on high for 90 seconds until completely smooth and frothy.",
        duration: 5,
        visualCues: ["thick orange frothy lassi", "no fibre visible"],
        checkpoints: ["completely smooth with no fibres", "vivid orange colour"],
      },
      {
        text: "Taste critically: the lassi should be thick enough to coat a spoon but still pourable, naturally sweet from the mango with the yogurt's sourness providing balance, and fragrant with cardamom. Adjust: add more milk if too thick, more sugar if the mango was underripe, more cardamom for aroma.",
        duration: 2,
        visualCues: ["coating spoon", "vibrant orange"],
        checkpoints: ["coats spoon", "balanced sweetness and sourness"],
      },
      {
        text: "Soak a pinch of saffron in 1 tablespoon of warm milk for 5 minutes until it turns a deep golden orange. Pour the lassi into tall, chilled glasses — mango lassi must be drunk very cold. Drizzle the saffron milk in a swirl on the surface and add a single crushed cardamom pod as garnish. Serve immediately — never let the froth subside.",
        duration: 7,
        visualCues: ["saffron swirl on top", "frothy surface"],
        checkpoints: ["saffron swirl visible", "glasses chilled", "served immediately"],
      },
    ],
  },

  // MIDDLE EAST
  {
    id: 31,
    region: "middle-east",
    name: "Beirut-Style Hummus",
    image: "https://source.unsplash.com/800x600/?hummus+lebanese+chickpea+dip",
    time: "20 min",
    difficulty: "Easy",
    rating: 4.8,
    calories: 220,
    tags: ["Dip", "Vegetarian"],
    description: "Ultra-silky chickpea puree — the way they make it in Beirut",
    ingredients: [
      { name: "dried chickpeas", amount: "250g", prep: "Soak 12 hrs, cook with baking soda 45–60 min until completely soft — mushy is ideal" },
      { name: "tahini (high quality)", amount: "120ml", prep: "Stir jar well before measuring — oil separation is normal" },
      { name: "lemon juice", amount: "80ml", prep: "Freshly squeezed only — bottled won't work" },
      { name: "garlic", amount: "2 cloves", prep: "Mince to paste with pinch of salt using flat of knife" },
      { name: "ice water", amount: "4–6 tbsp", prep: "Very cold — blend in gradually while machine runs 4 min until silk-smooth" },
      { name: "extra virgin olive oil", amount: "4 tbsp", prep: "Good quality — drizzle on finished hummus only" },
      { name: "paprika", amount: "1/2 tsp", prep: "Sprinkle over olive oil pool on serving plate" },
      { name: "fresh parsley", amount: "small bunch", prep: "Mince fine — scatter over top" },
      { name: "whole cooked chickpeas", amount: "handful", prep: "Reserve from batch — scatter on top for texture" },
    ],
    steps: [
      {
        text: "Drain 250g of overnight-soaked chickpeas. Cover with fresh water and add 1 teaspoon of baking soda — this helps them cook softer than normal. Simmer for 45–60 minutes until they are completely tender; you should be able to mash one effortlessly between two fingers with zero resistance. Reserve the cooking liquid. The mushy, over-cooked quality that would be wrong in every other context is exactly right here.",
        duration: 60,
        visualCues: ["extremely soft chickpeas", "mashing effortlessly"],
        checkpoints: ["mashes with no resistance", "slightly beyond al dente"],
      },
      {
        text: "While still warm, place the chickpeas in a food processor with 120ml of high-quality tahini and 80ml of freshly squeezed lemon juice. Process for 2 full minutes — longer than you think necessary. The mixture will look thick and dry at first. Then, with the machine running, add 4–6 tablespoons of ice-cold water one tablespoon at a time. Ice water is essential — it lightens and aerates the hummus.",
        duration: 8,
        visualCues: ["pale creamy paste forming", "lightening colour"],
        checkpoints: ["significantly paler than started", "very smooth"],
      },
      {
        text: "Continue processing for a total of 4 minutes — this extended blending is what creates the silk-smooth texture of great Beirut hummus. Add 2 cloves of garlic mashed to a paste with salt. Season generously. The hummus should be lighter in colour than the raw chickpeas, airy, and completely smooth — no graininess whatsoever.",
        duration: 4,
        visualCues: ["pale airy hummus", "falls slowly from spoon"],
        checkpoints: ["no graininess", "pale colour", "falls slowly from spoon"],
      },
      {
        text: "To serve, swirl the hummus into a wide shallow bowl with the back of a spoon, creating a well in the centre. Pour a generous pool of your best extra virgin olive oil into the well. Dust lightly with smoked paprika, scatter a few whole chickpeas, and add a small pile of minced fresh parsley. Room temperature is correct — never refrigerate hummus you intend to eat today.",
        duration: 3,
        visualCues: ["olive oil pool in centre", "paprika dusting", "parsley scattered"],
        checkpoints: ["generous olive oil pool", "room temperature serving"],
      },
    ],
  },
  {
    id: 32,
    region: "middle-east",
    name: "Lamb Shawarma",
    image: "https://source.unsplash.com/800x600/?lamb+shawarma+middle+eastern",
    time: "50 min",
    difficulty: "Medium",
    rating: 4.9,
    calories: 480,
    tags: ["Lamb", "Street Food"],
    description: "Spiced marinated lamb in flatbread with garlic sauce",
    ingredients: [
      { name: "lamb shoulder", amount: "1 kg", prep: "Slice into 1cm flat pieces, pound slightly — marinate minimum 4 hrs or overnight" },
      { name: "yogurt", amount: "150ml", prep: "Mix all marinade spices into yogurt, coat every slice" },
      { name: "shawarma spice mix (cumin, coriander, turmeric, cinnamon, allspice)", amount: "3 tbsp total", prep: "Toast whole spices, grind fresh for best flavour" },
      { name: "lemon", amount: "2", prep: "Juice into marinade" },
      { name: "garlic", amount: "6 cloves", prep: "Mince into marinade" },
      { name: "pita bread", amount: "4", prep: "Warm on dry pan or directly on flame for 30 sec each side" },
      { name: "garlic sauce (toum)", amount: "generous", prep: "Blend garlic + lemon + oil + ice water into thick white sauce" },
      { name: "tomatoes", amount: "2", prep: "Dice medium" },
      { name: "pickles", amount: "handful", prep: "Slice thin — essential for acidity in wrap" },
      { name: "parsley", amount: "large bunch", prep: "Roughly chop — inside the wrap" },
    ],
    steps: [
      {
        text: "Slice 1 kg of lamb shoulder into flat 1cm-thick pieces. Make your marinade: combine 3 tablespoons of shawarma spice mix, 150ml of yogurt, the juice of 2 lemons, and 6 minced garlic cloves. Massage the marinade thoroughly into each lamb slice, ensuring every surface is coated. Layer the slices in a bowl, cover, and refrigerate overnight — 24 hours gives the most tender result.",
        duration: 15,
        visualCues: ["every slice coated in spiced yogurt", "stacking in layers"],
        checkpoints: ["every surface coated", "marinating overnight"],
      },
      {
        text: "Preheat a cast iron griddle or grill pan over the highest heat possible for 5 minutes. Wipe with a little oil. Cook the lamb slices in batches without crowding — each slice needs 4 minutes per side. You want charred edges and caramelised surfaces, not steamed grey meat. The char is the flavour.",
        duration: 20,
        visualCues: ["charred caramelised edges", "dark grill marks"],
        checkpoints: ["char marks present", "caramelised not grey"],
      },
      {
        text: "Rest the lamb for 5 minutes, then slice into thin strips with a sharp knife against the grain. For the garlic sauce (toum), blend 6 garlic cloves with 1 teaspoon of salt until paste-like. With the blender running, slowly drizzle in 100ml of neutral oil, then alternate tablespoons of lemon juice and oil until you have a thick, white, fluffy sauce.",
        duration: 10,
        visualCues: ["thin lamb strips", "white fluffy garlic sauce"],
        checkpoints: ["thin strips", "toum is thick and white"],
      },
      {
        text: "Warm 4 pita breads directly on an open flame or in a dry pan for 30 seconds per side. Spread a generous layer of toum on each. Pile on the lamb, then add diced tomatoes, sliced pickles, and a handful of roughly chopped fresh parsley. Roll tightly in foil if eating on the go, or serve open-faced on a plate.",
        duration: 5,
        visualCues: ["filled pita", "generous toum layer"],
        checkpoints: ["bread warm and pliable", "generous filling"],
      },
    ],
  },
  {
    id: 33,
    region: "middle-east",
    name: "Turkish Köfte",
    image: "https://source.unsplash.com/800x600/?kofte+turkish+meatball",
    time: "30 min",
    difficulty: "Easy",
    rating: 4.7,
    calories: 420,
    tags: ["Beef", "Grilled"],
    description: "Juicy grilled beef and lamb meatballs with Turkish spices",
    ingredients: [
      { name: "ground beef (20% fat)", amount: "300g", prep: "Do not over-handle — mix just until combined or becomes tough" },
      { name: "ground lamb", amount: "200g", prep: "Blend with beef — lamb adds flavour, beef adds structure" },
      { name: "onion", amount: "1 medium", prep: "Grate on coarse grater, squeeze all liquid out — wet onion causes köfte to fall apart" },
      { name: "stale bread", amount: "1 slice", prep: "Soak in milk 5 min, squeeze dry — acts as binder" },
      { name: "flat-leaf parsley", amount: "large handful", prep: "Mince very fine" },
      { name: "cumin", amount: "2 tsp", prep: "Use ground — toast and grind whole seeds for best flavour" },
      { name: "allspice", amount: "1 tsp", prep: "Mix with cumin and cinnamon" },
      { name: "cinnamon", amount: "1/2 tsp", prep: "Just a hint — don't overdo" },
      { name: "flat metal skewers", amount: "8", prep: "Oil lightly before molding köfte on them" },
    ],
    steps: [
      {
        text: "Grate 1 medium onion on the fine side of a box grater. This turns the onion to a wet pulp — take it in your hands and squeeze every drop of liquid out over the sink. Soak 1 slice of stale white bread in milk for 3 minutes, then squeeze completely dry. Both the dry grated onion and the bread are binders that keep köfte juicy without falling apart.",
        duration: 8,
        visualCues: ["completely dry grated onion", "dry squeezed bread"],
        checkpoints: ["no moisture dripping from onion", "bread squeezed dry"],
      },
      {
        text: "Combine 300g of ground beef, 200g of ground lamb, the dry onion, squeezed bread, a large handful of minced flat-leaf parsley, 2 teaspoons of ground cumin, 1 teaspoon of allspice, 1/2 teaspoon of cinnamon, and 2 teaspoons of salt. Mix with your hands for 2 minutes until just combined — do not over-mix. Refrigerate for 20 minutes to firm up.",
        duration: 25,
        visualCues: ["uniform spiced meat mixture"],
        checkpoints: ["combined but not over-worked", "holds shape when pressed"],
      },
      {
        text: "Wet your hands and shape the meat into oval logs around lightly oiled flat metal skewers, about 12cm long and 3cm wide. Roll each gently to smooth the surface. Alternatively, shape into flattened oval patties 2cm thick. Any surface cracks should be smoothed with wet fingers.",
        duration: 10,
        visualCues: ["uniform oval shapes", "smooth surfaces"],
        checkpoints: ["uniform size and shape", "smooth surface"],
      },
      {
        text: "Grill over high heat for 3–4 minutes on each side — do not move them before the first turn or they will stick and tear. You want clear char marks and a caramelised, slightly crusty exterior while the interior remains just cooked through and juicy. Serve immediately on warm flatbread with tomatoes, onion salad, and sumac.",
        duration: 8,
        visualCues: ["char marks both sides", "caramelised surface"],
        checkpoints: ["char marks clear", "juicy when pressed lightly"],
      },
    ],
  },
  {
    id: 34,
    region: "middle-east",
    name: "Persian Ghormeh Sabzi",
    image: "https://source.unsplash.com/800x600/?ghormeh+sabzi+persian+herb+stew",
    time: "90 min",
    difficulty: "Medium",
    rating: 4.8,
    calories: 480,
    tags: ["Lamb", "Herbs", "Stew"],
    description: "Fragrant herb and kidney bean stew with dried limes",
    ingredients: [
      { name: "lamb shoulder", amount: "600g", prep: "Cut into 4cm chunks, brown in batches in hot oil — don't rush this" },
      { name: "flat-leaf parsley", amount: "300g", prep: "Mince very fine, fry in oil on low heat 20–30 min until very dark green and dry" },
      { name: "fenugreek leaves", amount: "100g", prep: "Mince fine, fry with other herbs — essential herb" },
      { name: "spinach or coriander", amount: "100g", prep: "Mince and fry with parsley and fenugreek" },
      { name: "dried kidney beans", amount: "150g", prep: "Soak overnight, par-cook 30 min before adding to stew" },
      { name: "dried Persian limes (limu omani)", amount: "4", prep: "Pierce each lime with knife in 3–4 spots so flavour releases into stew" },
      { name: "turmeric", amount: "2 tsp", prep: "Add to meat when browning — coats and colours" },
      { name: "saffron", amount: "large pinch", prep: "Grind with sugar cube, dissolve in 2 tbsp hot water — add to stew" },
      { name: "onion", amount: "2 large", prep: "Dice fine, fry until golden before browning meat" },
    ],
    steps: [
      {
        text: "The herbs are the entire identity of this dish. Mince 300g of flat-leaf parsley, 100g of fenugreek leaves, and 100g of spinach or coriander as finely as possible. In a wide pan with 3 tablespoons of oil over low-medium heat, fry the herbs stirring frequently for 25–30 minutes until they turn very dark green, almost black, and completely dry. The volume will reduce by 80%. This concentrates the flavour to an extraordinary intensity.",
        duration: 30,
        visualCues: ["very dark green dried herbs", "volume massively reduced"],
        checkpoints: ["very dark colour", "completely dry", "volume reduced by 80%"],
      },
      {
        text: "Dice 2 large onions finely and fry in 3 tablespoons of oil until golden, about 12 minutes. Add 600g of lamb shoulder cut in 4cm chunks. Brown deeply in batches for 3–4 minutes per side — good colour here means good flavour later. Add 2 teaspoons of turmeric and stir for 1 minute.",
        duration: 20,
        visualCues: ["deeply browned lamb", "golden onion base"],
        checkpoints: ["deep sear on lamb", "onions golden not pale"],
      },
      {
        text: "Add the fried herbs to the pot. Pierce 4 dried Persian limes (limu omani) in 4 places each with a knife — this allows the distinctive sour, floral flavour to permeate the stew. Add the limes whole. Pour in 500ml of water and bring to a simmer. Cover and cook for 60 minutes over low heat.",
        duration: 62,
        visualCues: ["dark herb stew", "dried limes floating"],
        checkpoints: ["lamb very tender", "deeply flavoured broth"],
      },
      {
        text: "Add the par-cooked kidney beans (150g dried, soaked overnight and parboiled for 30 minutes). Simmer uncovered for 20 more minutes until the sauce reduces to a thick, almost dry consistency. Dissolve a generous pinch of saffron in 2 tablespoons of hot water and stir in. Season generously — ghormeh sabzi needs salt to express itself. Serve over white rice.",
        duration: 22,
        visualCues: ["thick dark concentrated stew", "saffron golden notes"],
        checkpoints: ["very thick consistency", "lamb falling apart"],
      },
    ],
  },
  {
    id: 35,
    region: "middle-east",
    name: "Falafel with Tahini",
    image: "https://source.unsplash.com/800x600/?falafel+tahini+middle+eastern",
    time: "30 min",
    difficulty: "Medium",
    rating: 4.7,
    calories: 320,
    tags: ["Vegetarian", "Fried", "Chickpeas"],
    description: "Crispy herb-packed chickpea fritters with tahini sauce",
    ingredients: [
      { name: "dried chickpeas (RAW only)", amount: "250g", prep: "Soak 12 hrs — NEVER use canned, they are too wet and fall apart when fried" },
      { name: "fresh parsley", amount: "large bunch", prep: "Roughly chop — blend with chickpeas" },
      { name: "fresh cilantro", amount: "large bunch", prep: "Roughly chop — blend with chickpeas" },
      { name: "onion", amount: "1 medium", prep: "Quarter and add to processor" },
      { name: "garlic", amount: "4 cloves", prep: "Add whole to processor" },
      { name: "cumin", amount: "2 tsp", prep: "Toast whole seeds, grind fresh" },
      { name: "coriander", amount: "1 tsp", prep: "Toast and grind with cumin" },
      { name: "baking soda", amount: "1/2 tsp", prep: "Add just before frying — creates lighter interior" },
      { name: "tahini", amount: "100ml", prep: "Thin with lemon juice and cold water — sauce should drizzle easily" },
      { name: "oil", amount: "for deep frying", prep: "Heat to 175°C — too cold makes them greasy, too hot burns outside" },
    ],
    steps: [
      {
        text: "Drain the 250g of overnight-soaked raw chickpeas — canned chickpeas are absolutely forbidden here; they have too much moisture and will make your falafel fall apart in the oil and turn dense instead of light. Process the raw chickpeas in a food processor with 1 large bunch each of parsley and cilantro, 1 quartered onion, 4 garlic cloves, 2 teaspoons of cumin, 1 teaspoon of coriander, and 1 teaspoon of salt. Pulse to a coarse, sandy texture — not a smooth paste. It must hold together when squeezed but have visible texture.",
        duration: 8,
        visualCues: ["coarse textured green mixture", "holds when squeezed"],
        checkpoints: ["coarse not smooth", "holds shape when pressed", "green herb flecks visible"],
      },
      {
        text: "Refrigerate the mixture for 30 minutes minimum to firm up — this helps enormously with shaping. Just before frying, add 1/2 teaspoon of baking soda and mix through — this creates the characteristic crispy exterior and light interior. Shape using a falafel scoop or two spoons into rounds of about 35g each.",
        duration: 35,
        visualCues: ["firm shaped rounds", "green flecked exterior"],
        checkpoints: ["holds shape without cracking", "baking soda mixed through"],
      },
      {
        text: "Heat your deep-frying oil to exactly 175°C — use a thermometer. Too cool and they absorb oil and collapse; too hot and they burn outside while remaining raw inside. Lower falafel in carefully and fry for 4–5 minutes until a deep, even golden-brown all over. They should float to the surface and rotate gently when ready.",
        duration: 8,
        visualCues: ["deep golden brown falafel", "floating and rotating"],
        checkpoints: ["deep golden not pale", "floating means cooked through"],
      },
      {
        text: "For the tahini sauce, whisk 100ml of tahini with the juice of 2 lemons, 2 grated garlic cloves, 1/2 teaspoon of salt, and 4–6 tablespoons of ice-cold water until the sauce becomes pale, fluffy, and drizzle-able. It will initially seize and become very thick — keep whisking and adding water and it will loosen dramatically. Serve falafel immediately — they lose their crunch within 15 minutes.",
        duration: 5,
        visualCues: ["pale fluffy tahini sauce", "drizzle consistency"],
        checkpoints: ["pale not dark", "pourable consistency", "falafel served immediately"],
      },
    ],
  },
  {
    id: 36,
    region: "middle-east",
    name: "Shakshuka",
    image: "https://source.unsplash.com/800x600/?shakshuka+eggs+tomato",
    time: "25 min",
    difficulty: "Easy",
    rating: 4.8,
    calories: 290,
    tags: ["Eggs", "Vegetarian", "One-pan"],
    description: "Eggs poached in spiced tomato and pepper sauce",
    ingredients: [
      { name: "eggs", amount: "4–6", prep: "Crack each into small bowl first to check for shells — slip into wells in sauce" },
      { name: "canned crushed tomatoes", amount: "2 x 400g cans", prep: "Use good quality — they are the base of the dish" },
      { name: "red bell peppers", amount: "2", prep: "Deseed and dice medium — sauté until very soft" },
      { name: "onion", amount: "1 large", prep: "Dice medium, caramelise 8–10 min until sweet" },
      { name: "garlic", amount: "5 cloves", prep: "Slice thin — bloom in oil before adding peppers" },
      { name: "harissa paste", amount: "2 tbsp", prep: "Fry in oil with spices 1 min before adding tomatoes" },
      { name: "cumin", amount: "2 tsp", prep: "Toast whole seeds in oil first" },
      { name: "smoked paprika", amount: "2 tsp", prep: "Add with cumin when frying" },
      { name: "feta cheese", amount: "100g", prep: "Crumble generously over top when eggs are set" },
      { name: "fresh parsley or cilantro", amount: "handful", prep: "Scatter leaves over top at serving — add at last moment" },
    ],
    steps: [
      {
        text: "In a 28cm cast iron skillet over medium heat, warm 3 tablespoons of olive oil. Add 1 large diced onion and 2 deseeded, diced red bell peppers. Cook, stirring occasionally, for 10 minutes until very soft and the onion is beginning to caramelise at the edges — this long softening builds sweetness that balances the tomatoes.",
        duration: 12,
        visualCues: ["soft caramelised peppers and onion", "beginning to brown at edges"],
        checkpoints: ["completely soft", "slight caramelisation beginning"],
      },
      {
        text: "Add 5 thinly sliced garlic cloves and cook 1 minute. Add 2 tablespoons of harissa paste, 2 teaspoons of smoked paprika, and 2 teaspoons of cumin. Fry the spices in the oil for exactly 1 minute — you'll hear them sizzle. Add both cans of crushed tomatoes and stir everything together. Bring to a simmer and cook for 10–12 minutes until the sauce thickens significantly and the oil rises to the surface.",
        duration: 15,
        visualCues: ["thick vivid red sauce", "oil sheen on surface"],
        checkpoints: ["thick enough to hold wells", "oil visible on surface"],
      },
      {
        text: "Using a spoon, create 4–6 deep wells in the sauce — press all the way to the bottom of the pan. Crack 1 egg into each well carefully. Increase heat slightly to establish a gentle simmer. Cover the pan with a lid or foil. Cook for 5–7 minutes — the whites should be completely opaque and set while the yolks remain bright orange and just trembling.",
        duration: 7,
        visualCues: ["whites set opaque", "yolks still trembling"],
        checkpoints: ["whites fully opaque", "yolks still trembling not set"],
      },
      {
        text: "Remove from heat. Crumble 100g of feta cheese generously over the surface — not mixed in, just scattered. Tear fresh parsley or cilantro leaves over the top. Drizzle with a thread of olive oil. Bring the skillet directly to the table — shakshuka is always served in its cooking vessel, with warm crusty bread for scooping up every drop of sauce.",
        duration: 2,
        visualCues: ["white feta against red sauce", "herb scatter", "olive oil drizzle"],
        checkpoints: ["feta crumbled generously", "served in skillet at table"],
      },
    ],
  },
  {
    id: 37,
    region: "middle-east",
    name: "Mujaddara",
    image: "https://source.unsplash.com/800x600/?mujaddara+lentils+rice+middle+eastern",
    time: "45 min",
    difficulty: "Easy",
    rating: 4.7,
    calories: 380,
    tags: ["Lentils", "Vegetarian"],
    description:
      "Comforting lentils and rice topped with crispy caramelized onions",
    ingredients: [
      { name: "green or brown lentils", amount: "300g", prep: "Pick over for stones, rinse well — no soaking required" },
      { name: "long-grain white rice", amount: "200g", prep: "Rinse until water runs clear, add when lentils are half-cooked" },
      { name: "onions", amount: "4 large", prep: "Slice into very thin half-rings — this is the star, take 20–25 min to truly caramelise" },
      { name: "olive oil", amount: "100ml", prep: "Use generous amount — onions absorb it as they caramelise" },
      { name: "cumin seeds", amount: "2 tsp", prep: "Toast in oil with onions — whole seeds preferred" },
      { name: "cinnamon", amount: "1 tsp", prep: "Add to cooking liquid for lentils" },
      { name: "allspice", amount: "1/2 tsp", prep: "Add with cinnamon" },
      { name: "yogurt", amount: "to serve", prep: "Serve cold alongside as cooling contrast" },
      { name: "lemon", amount: "1", prep: "Squeeze over finished dish" },
    ],
    steps: [
      {
        text: "Simmer lentils with cumin, add rice, cook until absorbed",
        duration: 30,
        visualCues: ["lentils and rice cooking", "water absorbed"],
        checkpoints: ["rice fluffy", "lentils tender"],
      },
      {
        text: "Fry sliced onions in generous olive oil on medium-high",
        duration: 20,
        visualCues: ["browning onions", "caramelizing"],
        checkpoints: ["deep golden", "crispy at edges"],
      },
      {
        text: "Continue until onions very dark and crispy",
        duration: 10,
        visualCues: ["very dark onions", "crispy texture"],
        checkpoints: ["very dark and crispy"],
      },
      {
        text: "Top lentil rice with crispy onions and olive oil drizzle",
        duration: 1,
        visualCues: ["onions on rice", "oil drizzle"],
        checkpoints: ["beautiful presentation"],
      },
    ],
  },
  {
    id: 38,
    region: "middle-east",
    name: "Turkish Baklava",
    image: "https://source.unsplash.com/800x600/?baklava+turkish+pastry+pistachio",
    time: "60 min",
    difficulty: "Hard",
    rating: 4.9,
    calories: 420,
    tags: ["Dessert", "Pastry", "Sweet"],
    description: "Layers of crispy phyllo, pistachios, and rose water syrup",
    ingredients: [
      { name: "phyllo pastry sheets", amount: "500g (about 40 sheets)", prep: "Thaw overnight in fridge, bring to room temperature 1 hr before use — keep covered with damp cloth" },
      { name: "unsalted butter", amount: "250g", prep: "Clarify by melting and skimming foam — only use golden liquid, discard white solids" },
      { name: "unsalted pistachios", amount: "300g", prep: "Pulse in processor to coarse crumb — some texture essential, not powder" },
      { name: "sugar", amount: "400g", prep: "Combine with water and lemon in pan for syrup — bring to boil, simmer 10 min" },
      { name: "water", amount: "300ml", prep: "Add to sugar for syrup" },
      { name: "lemon juice", amount: "2 tbsp", prep: "Add to syrup — prevents crystallisation" },
      { name: "rose water", amount: "2 tbsp", prep: "Add to cooled syrup only — evaporates if hot" },
      { name: "cinnamon", amount: "1 tsp", prep: "Mix with ground pistachios" },
    ],
    steps: [
      {
        text: "Finely chop pistachios with cinnamon and sugar",
        duration: 5,
        visualCues: ["finely chopped nuts", "green color"],
        checkpoints: ["finely but not dusty"],
      },
      {
        text: "Layer 8 sheets of buttered phyllo in pan",
        duration: 15,
        visualCues: ["buttered phyllo", "translucent sheets"],
        checkpoints: ["each sheet buttered"],
      },
      {
        text: "Add nut layer, continue with 8 more buttered phyllo sheets",
        duration: 10,
        visualCues: ["nut layer", "phyllo on top"],
        checkpoints: ["nut layer even"],
      },
      {
        text: "Cut diamond pattern, bake 180°C 40 minutes until golden",
        duration: 40,
        visualCues: ["diamond pattern", "golden pastry"],
        checkpoints: ["deep golden", "crispy"],
      },
      {
        text: "Pour cooled syrup over hot baklava for crispiness",
        duration: 5,
        visualCues: ["sizzling syrup", "glistening top"],
        checkpoints: ["syrup absorbed"],
      },
    ],
  },
  {
    id: 39,
    region: "middle-east",
    name: "Za'atar Manakeesh",
    image: "https://source.unsplash.com/800x600/?manakeesh+zaatar+lebanese+flatbread",
    time: "25 min",
    difficulty: "Easy",
    rating: 4.6,
    calories: 340,
    tags: ["Bread", "Vegetarian", "Breakfast"],
    description: "Pillowy flatbread topped with fragrant za'atar and olive oil",
    ingredients: [
      { name: "all-purpose flour", amount: "400g", prep: "Mix with yeast, water, oil, salt — knead 8 min, rise 1 hr until doubled" },
      { name: "instant yeast", amount: "7g", prep: "Dissolve in warm water with pinch of sugar — wait 5 min until foamy" },
      { name: "za'atar mix", amount: "4 tbsp", prep: "Mix with olive oil to make thick paste — should be spreadable" },
      { name: "extra virgin olive oil", amount: "6 tbsp", prep: "Mix 4 tbsp with za'atar, reserve 2 tbsp for dough" },
      { name: "sesame seeds", amount: "2 tbsp", prep: "Toast lightly in dry pan until golden" },
      { name: "warm water", amount: "250ml", prep: "Body-warm temperature, not hot" },
      { name: "salt", amount: "1 tsp", prep: "Add to flour directly, not to yeast" },
    ],
    steps: [
      {
        text: "Mix za'atar: dried thyme, sumac, sesame seeds, olive oil into paste",
        duration: 3,
        visualCues: ["green herb paste", "fragrant"],
        checkpoints: ["paste consistency"],
      },
      {
        text: "Roll flatbread dough thin into rounds",
        duration: 5,
        visualCues: ["thin round dough", "even thickness"],
        checkpoints: ["thin and even"],
      },
      {
        text: "Spread za'atar generously over surface",
        duration: 2,
        visualCues: ["green herb coating", "oil glistening"],
        checkpoints: ["evenly coated to edges"],
      },
      {
        text: "Bake 230°C 8-10 minutes until edges golden",
        duration: 10,
        visualCues: ["golden edges", "crispy crust"],
        checkpoints: ["golden edges", "crispy"],
      },
    ],
  },
  {
    id: 40,
    region: "middle-east",
    name: "Lamb Kabsa",
    image: "https://source.unsplash.com/800x600/?kabsa+saudi+rice+lamb",
    time: "90 min",
    difficulty: "Hard",
    rating: 4.8,
    calories: 680,
    tags: ["Lamb", "Rice", "Arabian"],
    description:
      "Fragrant Arabian rice with slow-cooked lamb, raisins and almonds",
    ingredients: [
      { name: "bone-in lamb pieces", amount: "1.5 kg", prep: "Large pieces — brown deeply on all sides in hot oil before braising" },
      { name: "basmati rice", amount: "3 cups", prep: "Rinse 5 times, soak 30 min, cook in reserved lamb broth" },
      { name: "onion", amount: "3 large", prep: "One diced for frying, two quartered for broth" },
      { name: "tomatoes", amount: "4", prep: "Grate on box grater — skin discards naturally" },
      { name: "tomato paste", amount: "3 tbsp", prep: "Fry in oil with spices 2 min" },
      { name: "kabsa spice mix (loomi, cardamom, cinnamon, black lime)", amount: "3 tbsp", prep: "Toast whole spices, grind fresh — dried black lime (loomi) is key" },
      { name: "dried black limes (loomi)", amount: "4", prep: "Pierce with knife in 3 spots, add to broth whole" },
      { name: "raisins", amount: "80g", prep: "Plump in warm water 10 min — toss with toasted nuts on top of finished dish" },
      { name: "toasted almonds or cashews", amount: "100g", prep: "Toast in dry pan or fry in ghee until golden" },
      { name: "cilantro", amount: "large bunch", prep: "Roughly chop — garnish only" },
    ],
    steps: [
      {
        text: "Brown lamb in ghee, add onions until golden",
        duration: 15,
        visualCues: ["browned lamb", "golden onions"],
        checkpoints: ["lamb seared"],
      },
      {
        text: "Add tomatoes, spices, dried limes, water — simmer 60 minutes",
        duration: 60,
        visualCues: ["simmering stew", "dried limes floating"],
        checkpoints: ["lamb very tender"],
      },
      {
        text: "Add washed rice to broth, cook 20 minutes until absorbed",
        duration: 20,
        visualCues: ["rice in broth", "absorbing liquid"],
        checkpoints: ["rice fully cooked"],
      },
      {
        text: "Rest covered, plate with lamb on top, garnish with raisins and almonds",
        duration: 5,
        visualCues: ["fluffy rice", "golden almonds"],
        checkpoints: ["beautiful plating"],
      },
    ],
  },

  // MEDITERRANEAN
  {
    id: 41,
    region: "mediterranean",
    name: "Spaghetti Carbonara",
    image: "https://source.unsplash.com/800x600/?spaghetti+carbonara+italian+pasta",
    time: "20 min",
    difficulty: "Medium",
    rating: 4.9,
    calories: 580,
    tags: ["Pasta", "Classic", "Roman"],
    description:
      "True Roman carbonara — silky egg and Pecorino, no cream, with guanciale",
    ingredients: [
      { name: "spaghetti or rigatoni", amount: "400g", prep: "Cook in well-salted boiling water — reserve 200ml pasta water before draining" },
      { name: "guanciale (cured pork cheek)", amount: "200g", prep: "Cut into lardons or strips — no oil needed, renders its own fat" },
      { name: "eggs", amount: "4 whole + 2 yolks", prep: "Room temperature — whisk with cheese before using" },
      { name: "Pecorino Romano", amount: "80g", prep: "Finely grate on microplane — mix into egg mixture" },
      { name: "Parmigiano Reggiano", amount: "40g", prep: "Finely grate and mix with Pecorino" },
      { name: "black pepper", amount: "2 tsp", prep: "Coarsely crack — toast briefly in dry pan with guanciale fat" },
      { name: "sea salt", amount: "for pasta water", prep: "Water should taste like the sea — 10g per litre" },
    ],
    steps: [
      {
        text: "Bring 5 litres of water to a rolling boil and add 50g of salt — the water should taste like the sea. This is the only salting opportunity: there is no salt in the sauce. Add 400g of spaghetti and cook 2 minutes less than the packet says — it will finish cooking in the residual heat of the sauce.",
        duration: 9,
        visualCues: ["rolling boil", "spaghetti submerging"],
        checkpoints: ["water properly salted", "pasta 2 minutes under done"],
      },
      {
        text: "In a cold pan, add 200g of guanciale cut into lardons. Place over medium heat — starting cold renders the fat slowly and evenly. Cook for 8–10 minutes until the fat is rendered and the meat is golden and slightly crispy. Remove the guanciale to a plate but leave every drop of the rendered fat in the pan.",
        duration: 12,
        visualCues: ["golden crispy guanciale", "clear rendered fat in pan"],
        checkpoints: ["fat fully rendered", "guanciale golden and slightly crispy"],
      },
      {
        text: "In a bowl, whisk together 4 whole eggs and 2 extra yolks until fully combined. Add 80g of finely grated Pecorino Romano and 40g of Parmigiano-Reggiano. Add 2 teaspoons of coarsely cracked black pepper — freshly cracked, not pre-ground. Whisk until you have a thick, paste-like sauce. This mixture must be at room temperature.",
        duration: 5,
        visualCues: ["thick egg and cheese paste", "pepper visible"],
        checkpoints: ["thick paste not runny", "all cheese incorporated"],
      },
      {
        text: "When the pasta is ready, reserve 200ml of the starchy pasta water before draining — this is the key to a silky, not scrambled, carbonara. Drain and immediately add the spaghetti to the guanciale pan off the heat. Add the guanciale back in. Pour the egg mixture over and toss vigorously, adding pasta water splash by splash until the sauce coats every strand in glossy, creamy ribbons.",
        duration: 4,
        visualCues: ["glossy sauce coating every strand", "no visible egg curds"],
        checkpoints: ["no scrambled egg visible", "glossy coating", "sauce flows not sticks"],
      },
      {
        text: "The finished carbonara should flow slowly when tilted — never stiff, never wet. Serve immediately in warm bowls, with more Pecorino grated tableside and an aggressive amount of freshly cracked pepper. There is no cream in carbonara — the creaminess comes entirely from the emulsification of the eggs, cheese, pasta water, and rendered fat.",
        duration: 2,
        visualCues: ["flowing glossy carbonara", "pepper-dusted surface"],
        checkpoints: ["flows on plate", "served immediately while hot"],
      },
    ],
  },
  {
    id: 42,
    region: "mediterranean",
    name: "Greek Moussaka",
    image: "https://source.unsplash.com/800x600/?moussaka+greek+eggplant",
    time: "90 min",
    difficulty: "Hard",
    rating: 4.8,
    calories: 540,
    tags: ["Baked", "Lamb", "Eggplant"],
    description: "Layered baked eggplant with spiced lamb ragù and béchamel",
    ingredients: [
      { name: "eggplant", amount: "3 large", prep: "Slice 1cm thick, salt generously both sides, rest 30 min, rinse, pat dry, grill or fry until golden" },
      { name: "potatoes", amount: "3 medium", prep: "Slice 5mm thin, parboil 5 min, drain and dry — layer at bottom of dish" },
      { name: "ground lamb or beef", amount: "600g", prep: "Brown in batches — do not crowd pan or it steams instead of browns" },
      { name: "onion", amount: "2 medium", prep: "Fine dice, cook until golden before adding meat" },
      { name: "cinnamon", amount: "1 tsp", prep: "Key Greek spice — add to meat sauce" },
      { name: "allspice", amount: "1/2 tsp", prep: "Mix with cinnamon" },
      { name: "red wine", amount: "150ml", prep: "Add after browning meat — deglaze and reduce" },
      { name: "crushed tomatoes", amount: "400g", prep: "Add after wine reduces" },
      { name: "full-fat milk", amount: "600ml", prep: "Warm before adding to roux for béchamel — prevents lumps" },
      { name: "butter", amount: "60g", prep: "Make roux with flour for béchamel" },
      { name: "eggs", amount: "2", prep: "Beat into cooled béchamel before pouring over — sets the top layer" },
      { name: "kefalotiri or Parmesan", amount: "100g", prep: "Grate finely — mix half into béchamel, sprinkle rest on top" },
    ],
    steps: [
      {
        text: "Slice 3 large eggplants into 1cm rounds. Lay in a single layer on trays, salt both sides generously, and rest for 30 minutes — you'll see beads of moisture forming. Rinse, then pat completely dry with kitchen paper. Brush both sides with olive oil and roast at 200°C for 20 minutes until golden, soft, and slightly caramelised. Roasting, not frying, produces a less greasy result.",
        duration: 55,
        visualCues: ["golden caramelised eggplant rounds", "no excess oil"],
        checkpoints: ["golden on both sides", "soft when pressed", "not oil-soaked"],
      },
      {
        text: "For the meat sauce, brown 600g of ground lamb in batches in a hot pan — crowd it and it steams. When all the lamb is deeply browned, add 2 finely diced onions and cook 5 minutes. Add 3 minced garlic cloves, 1 teaspoon of cinnamon, 1/2 teaspoon of allspice, and 150ml of red wine. Let the wine reduce completely, then add 400g of crushed tomatoes. Simmer 20 minutes until thick and almost dry.",
        duration: 35,
        visualCues: ["thick dark meat sauce", "wine reduced"],
        checkpoints: ["sauce very thick almost paste-like", "no liquid pooling"],
      },
      {
        text: "For the béchamel, melt 60g of butter in a saucepan, add 60g of flour and cook, stirring, for 2 minutes. Warm 600ml of milk separately. Add the warm milk to the roux in a steady stream, whisking constantly and vigorously to prevent lumps. Cook for 5 minutes until thick. Remove from heat. Beat in 2 eggs and half the grated cheese — this sets the béchamel into a solid layer during baking.",
        duration: 12,
        visualCues: ["thick smooth béchamel", "no lumps"],
        checkpoints: ["no lumps", "coats spoon thickly", "eggs whisked in off heat"],
      },
      {
        text: "Layer in a large baking dish: sliced potatoes on the bottom, half the eggplant, all the meat sauce, remaining eggplant, then the béchamel poured and spread evenly on top. Scatter the remaining 50g of grated cheese. Bake at 180°C for 45–50 minutes until the top is deeply golden and the edges bubble. Rest for 20 minutes before cutting — it needs time to set so it cuts cleanly.",
        duration: 70,
        visualCues: ["golden béchamel top", "bubbling edges"],
        checkpoints: ["deep golden not pale", "rested 20 minutes before cutting"],
      },
    ],
  },
  {
    id: 43,
    region: "mediterranean",
    name: "Paella Valenciana",
    image: "https://source.unsplash.com/800x600/?paella+valenciana+spanish+rice",
    time: "45 min",
    difficulty: "Hard",
    rating: 4.9,
    calories: 580,
    tags: ["Rice", "Chicken", "One-pan"],
    description:
      "Original Valencian paella with chicken, rabbit, and socarrat crust",
    ingredients: [
      { name: "paella rice (Bomba or Calasparra)", amount: "400g", prep: "Do not rinse — surface starch helps absorb broth correctly" },
      { name: "chicken thighs", amount: "500g", prep: "Bone-in, cut into 4 pieces each, season generously with salt" },
      { name: "rabbit", amount: "500g", prep: "Cut into pieces — or substitute with more chicken" },
      { name: "green beans (flat Romano)", amount: "200g", prep: "Cut into 5cm pieces" },
      { name: "butter beans (garrafon)", amount: "150g", prep: "Canned, rinsed — add with rice" },
      { name: "ripe tomatoes", amount: "2 large", prep: "Grate on box grater, discard skin" },
      { name: "smoked paprika", amount: "2 tsp", prep: "Add to sofrito — stir quickly, burns in seconds" },
      { name: "saffron", amount: "generous pinch", prep: "Toast in dry pan 30 sec, dissolve in hot stock" },
      { name: "chicken stock", amount: "1.2 litres", prep: "Hot — ratio is approximately 2.5:1 stock to rice for Bomba" },
      { name: "rosemary", amount: "2 sprigs", prep: "Add in last 5 min, remove before serving" },
    ],
    steps: [
      {
        text: "Heat 4 tablespoons of olive oil in a wide, shallow paella pan (46cm) over high heat. Season 500g of chicken pieces and 500g of rabbit generously with salt. Brown the meat in batches for 4 minutes per side without moving — you want a deep, mahogany sear. Push the meat to the edges and begin building the sofrito in the centre.",
        duration: 20,
        visualCues: ["deep brown sear on meat", "fat rendering"],
        checkpoints: ["deep mahogany sear", "not grey or steamed"],
      },
      {
        text: "In the centre of the pan, add 200g of flat green beans and 150g of butter beans. Fry 2 minutes. Push aside and add 2 grated ripe tomatoes — they will sizzle violently. Stir in 2 teaspoons of smoked paprika immediately and keep moving it for 20 seconds only — it burns in a flash. Add a pinch of saffron dissolved in 3 tablespoons of warm water.",
        duration: 8,
        visualCues: ["sizzling tomato sofrito", "paprika blooming in oil"],
        checkpoints: ["paprika bloomed not burnt", "saffron colour appearing"],
      },
      {
        text: "Pour in 1.2 litres of hot chicken or rabbit stock. Taste the stock now — it should be highly seasoned, because the rice will absorb it all. Bring to a vigorous boil over the highest heat. Spread 400g of Bomba rice evenly across the pan — never stir again after this point. Boil hard for exactly 8 minutes.",
        duration: 10,
        visualCues: ["rice spread evenly", "vigorous boiling"],
        checkpoints: ["rice spread level", "vigorous boil maintained", "DO NOT STIR"],
      },
      {
        text: "Reduce to medium heat and cook for 8 more minutes — the liquid will gradually absorb. In the final 2 minutes, increase heat to high and listen: you will hear a crackling sound as the bottom of the rice forms the socarrat — the prized caramelised crust. Smell for toasting rice, not burning. Remove from heat.",
        duration: 10,
        visualCues: ["liquid absorbed", "crackling sound from bottom"],
        checkpoints: ["crackling sound audible", "surface looks dry", "toasted not burnt smell"],
      },
      {
        text: "Add 2 sprigs of rosemary and cover the pan tightly with foil or newspaper for exactly 5 minutes rest. This resting step is non-negotiable — it finishes the rice by steaming from the residual heat. Remove the cover and serve directly from the pan at the table, scraping up the socarrat for each portion.",
        duration: 5,
        visualCues: ["resting covered", "socarrat visible when scraped"],
        checkpoints: ["5 minute rest", "socarrat golden not black at bottom"],
      },
    ],
  },
  {
    id: 44,
    region: "mediterranean",
    name: "Mushroom Risotto",
    image: "https://source.unsplash.com/800x600/?mushroom+risotto+italian+creamy",
    time: "35 min",
    difficulty: "Medium",
    rating: 4.8,
    calories: 480,
    tags: ["Pasta", "Vegetarian", "Creamy"],
    description: "Creamy Arborio rice with earthy porcini and Parmesan",
    ingredients: [
      { name: "Arborio or Carnaroli rice", amount: "350g", prep: "Do not rinse — starch is essential for creaminess" },
      { name: "mixed mushrooms (porcini, cremini, shiitake)", amount: "400g", prep: "Slice, sauté in batches in very hot pan until golden — remove to bowl before making risotto" },
      { name: "dried porcini mushrooms", amount: "30g", prep: "Soak in 300ml warm water 20 min — strain and add soaking liquid to stock" },
      { name: "shallots", amount: "4", prep: "Mince very fine — soften fully before adding rice" },
      { name: "garlic", amount: "3 cloves", prep: "Mince — add after shallots are soft" },
      { name: "dry white wine", amount: "150ml", prep: "Room temperature — first liquid added to toasted rice" },
      { name: "vegetable or chicken stock", amount: "1.2 litres", prep: "Keep warm in separate pan — cold stock shocks the rice and breaks the starch" },
      { name: "butter", amount: "80g", prep: "Cold cubes — whipped in at end (mantecatura) for final creaminess" },
      { name: "Parmigiano Reggiano", amount: "80g", prep: "Finely grate — stir in with butter off heat" },
      { name: "fresh thyme", amount: "4 sprigs", prep: "Add leaves only when frying mushrooms" },
    ],
    steps: [
      {
        text: "Soak 30g of dried porcini mushrooms in 300ml of warm water for 20 minutes. Lift the porcini out carefully — leaving any grit behind — and squeeze gently. Strain the soaking liquid through a fine cloth and add it to your warm stock. This soaking liquid is liquid gold; it carries an extraordinary depth of umami that defines porcini-based risotto.",
        duration: 22,
        visualCues: ["deeply coloured soaking liquid", "rehydrated porcini"],
        checkpoints: ["liquid deeply coloured", "porcini soft and rehydrated"],
      },
      {
        text: "In a wide heavy pan, heat 2 tablespoons of olive oil over high heat until smoking. Add 400g of mixed mushrooms in a single layer — do not overcrowd or they will steam instead of brown. Do not stir for 2 minutes. Flip and cook 2 more minutes. Season with salt only after browning — salt draws out water and prevents caramelisation. Remove to a bowl.",
        duration: 10,
        visualCues: ["deeply caramelised mushrooms", "golden brown colour"],
        checkpoints: ["deep golden caramelisation", "not pale or steamed"],
      },
      {
        text: "In the same pan, melt 30g of butter over medium heat. Add 4 finely minced shallots and cook for 5 minutes until soft and translucent — no colour. Add 3 minced garlic cloves for 1 minute. Add 350g of Arborio or Carnaroli rice and toast, stirring, for 2 minutes until the edges turn translucent and you smell a faint nutty aroma — this seals the starch.",
        duration: 9,
        visualCues: ["translucent rice edges", "slight nutty aroma"],
        checkpoints: ["rice edges turning translucent", "nutty smell present"],
      },
      {
        text: "Add 150ml of dry white wine and stir constantly until completely absorbed — you'll hear the sizzle turn from frantic to gentle as the alcohol cooks off. Now add the warm stock one 150ml ladleful at a time, stirring constantly and waiting until each addition is almost fully absorbed before adding the next. This patient, continuous stirring coaxes the starch out of the rice to create creaminess. Total cooking time: 18–20 minutes.",
        duration: 20,
        visualCues: ["creamy flowing risotto", "rice swelling gradually"],
        checkpoints: ["rice tender with slight resistance", "flowing not stiff", "wave motion when shaken"],
      },
      {
        text: "When the rice is al dente — tender but with a barely perceptible firmness at the very centre — remove from heat. Add the caramelised mushrooms and the rehydrated porcini. Drop in 80g of cold butter cubed and 80g of finely grated Parmigiano-Reggiano. Beat vigorously with a wooden spoon for 2 minutes — this is the mantecatura, the emulsification that creates the signature gloss and creaminess. Rest 2 minutes, then serve.",
        duration: 5,
        visualCues: ["glossy flowing risotto", "waves when plate shaken"],
        checkpoints: ["flows slowly when plate tilted", "glossy sheen", "creamy not stodgy"],
      },
    ],
  },
  {
    id: 45,
    region: "mediterranean",
    name: "Greek Spanakopita",
    image: "https://source.unsplash.com/800x600/?spanakopita+greek+spinach+pie",
    time: "60 min",
    difficulty: "Medium",
    rating: 4.7,
    calories: 380,
    tags: ["Pastry", "Vegetarian"],
    description: "Flaky phyllo pie with spinach, feta, and fresh dill",
    ingredients: [
      { name: "fresh spinach", amount: "1 kg", prep: "Wash, wilt in pan until just collapsed, squeeze out ALL water — wet spinach makes soggy pie" },
      { name: "feta cheese", amount: "400g", prep: "Crumble by hand into large pieces — not too fine" },
      { name: "phyllo pastry", amount: "500g", prep: "Thaw overnight in fridge, room temp 1 hr before — keep covered, dries out in minutes" },
      { name: "eggs", amount: "3", prep: "Beat lightly — binds filling" },
      { name: "onion", amount: "2 medium", prep: "Dice and sauté until very soft before mixing with spinach" },
      { name: "scallions", amount: "6", prep: "Slice and add to filling with onion" },
      { name: "fresh dill", amount: "large bunch", prep: "Mince fine — essential aromatic" },
      { name: "butter", amount: "150g", prep: "Melt, brush between every phyllo layer" },
      { name: "nutmeg", amount: "1/4 tsp", prep: "Grate fresh into filling" },
    ],
    steps: [
      {
        text: "Sauté onions, add spinach until wilted, squeeze out ALL moisture",
        duration: 10,
        visualCues: ["wilted spinach", "no water"],
        checkpoints: ["very dry"],
      },
      {
        text: "Mix spinach with feta, dill, beaten eggs",
        duration: 3,
        visualCues: ["mixed filling", "feta chunks visible"],
        checkpoints: ["feta chunky"],
      },
      {
        text: "Layer 6 buttered phyllo sheets, add filling",
        duration: 10,
        visualCues: ["layered phyllo", "filling spread"],
        checkpoints: ["each sheet buttered"],
      },
      {
        text: "Top with 6 more buttered sheets, score surface, brush egg wash",
        duration: 8,
        visualCues: ["scored surface", "egg wash sheen"],
        checkpoints: ["scored"],
      },
      {
        text: "Bake 45 minutes until deep golden and crispy",
        duration: 45,
        visualCues: ["golden pastry", "flaky layers"],
        checkpoints: ["very crispy"],
      },
    ],
  },
  {
    id: 46,
    region: "mediterranean",
    name: "Spanish Gazpacho",
    image: "https://source.unsplash.com/800x600/?gazpacho+spanish+cold+soup",
    time: "15 min",
    difficulty: "Easy",
    rating: 4.6,
    calories: 180,
    tags: ["Soup", "Cold", "Vegetarian"],
    description:
      "Silky chilled tomato soup with sherry vinegar — summer in a bowl",
    ingredients: [
      { name: "ripe Roma tomatoes", amount: "1 kg", prep: "Core and quarter — must be very ripe, flavour depends on it" },
      { name: "cucumber", amount: "1 large", prep: "Peel, deseed, roughly chop — reserve small dice for garnish" },
      { name: "red bell pepper", amount: "1", prep: "Deseed and roughly chop" },
      { name: "garlic", amount: "2 cloves", prep: "Raw — just 1–2 cloves, can overpower" },
      { name: "day-old bread", amount: "2 thick slices", prep: "Tear and soak in cold water 5 min, squeeze — thickens and enriches" },
      { name: "sherry vinegar", amount: "3 tbsp", prep: "Add gradually and taste — acidity brightens flavours" },
      { name: "extra virgin olive oil", amount: "80ml", prep: "Best quality — blends in as you pour into running blender" },
      { name: "ice water", amount: "200ml", prep: "Add for desired consistency after blending" },
      { name: "salt", amount: "to taste", prep: "Season well — cold dulls salt perception" },
    ],
    steps: [
      {
        text: "Soak bread in water until soft, squeeze dry",
        duration: 3,
        visualCues: ["soaked bread", "squeezed dry"],
        checkpoints: ["fully soft"],
      },
      {
        text: "Blend all vegetables with bread until completely smooth",
        duration: 3,
        visualCues: ["red smooth puree", "vibrant color"],
        checkpoints: ["completely smooth"],
      },
      {
        text: "Strain through fine sieve, season with sherry vinegar and salt",
        duration: 5,
        visualCues: ["silky texture", "no pulp"],
        checkpoints: ["silky smooth"],
      },
      {
        text: "Chill 2 hours, serve cold with olive oil and garnish",
        duration: 120,
        visualCues: ["very cold soup", "olive oil pool"],
        checkpoints: ["very cold"],
      },
    ],
  },
  {
    id: 47,
    region: "mediterranean",
    name: "Italian Tiramisù",
    image: "https://source.unsplash.com/800x600/?tiramisu+italian+dessert",
    time: "30 min",
    difficulty: "Medium",
    rating: 4.9,
    calories: 440,
    tags: ["Dessert", "No-bake"],
    description:
      "Classic layered dessert with espresso-soaked ladyfingers and mascarpone",
    ingredients: [
      { name: "egg yolks", amount: "6 large", prep: "Separate carefully — no white contamination, room temperature" },
      { name: "egg whites", amount: "4", prep: "Room temperature — whip to stiff peaks, fold gently into mascarpone mixture" },
      { name: "caster sugar", amount: "150g", prep: "Whisk into yolks until ribbon stage — very pale and thick" },
      { name: "mascarpone", amount: "500g", prep: "Room temperature — fold into yolk mixture, lumps make it grainy" },
      { name: "Savoiardi ladyfingers", amount: "300g", prep: "Dip quickly in espresso — 1–2 seconds each side, not soaked through" },
      { name: "strong espresso", amount: "300ml", prep: "Brew strong, cool completely, mix with dark rum or marsala" },
      { name: "dark rum or marsala", amount: "3 tbsp", prep: "Mix into cooled espresso" },
      { name: "high-quality cocoa powder", amount: "3 tbsp", prep: "Dust generously on top using fine sieve — just before serving" },
    ],
    steps: [
      {
        text: "Whisk together 6 egg yolks and 150g of caster sugar in a heatproof bowl set over a pot of barely simmering water — do not let the bowl touch the water. Whisk constantly for 8 minutes until the mixture turns very pale, increases in volume by half, and falls from the whisk in a thick, continuous ribbon. This is the sabayon stage and it's crucial for food safety and texture.",
        duration: 10,
        visualCues: ["very pale thick ribbon falling from whisk", "increased volume"],
        checkpoints: ["pale yellow not golden", "ribbon stage achieved", "holds shape briefly when dropped"],
      },
      {
        text: "Remove the bowl from the heat and whisk for 2 more minutes to cool slightly. Fold in 500g of room-temperature mascarpone using a large rubber spatula — fold gently in broad strokes to prevent deflating the sabayon. Stop the moment it is smooth. In a separate spotlessly clean bowl, whisk 4 egg whites to stiff, glossy peaks. Fold gently into the mascarpone in 3 additions.",
        duration: 12,
        visualCues: ["light airy mascarpone cream", "stiff white peaks"],
        checkpoints: ["smooth and airy", "no visible egg white streaks", "stiff peaks on whites"],
      },
      {
        text: "Brew 300ml of very strong espresso and cool completely. Add 3 tablespoons of dark rum or marsala and stir. Dip each Savoiardi biscuit for exactly 1–2 seconds per side — hold them by the end and dip once, flip, remove. They should be moist but hold their shape; if they turn soggy and start to disintegrate, you've dipped too long.",
        duration: 8,
        visualCues: ["moist biscuits holding shape", "not crumbling"],
        checkpoints: ["moist throughout", "holds shape", "not soggy or disintegrating"],
      },
      {
        text: "Lay the dipped biscuits in a single layer in a 30x20cm dish. Pour exactly half the mascarpone cream over and spread level with a palette knife. Add a second layer of dipped biscuits. Top with the remaining cream, spread perfectly flat. Cover and refrigerate for a minimum of 4 hours — overnight is ideal. The cream must be completely set before serving.",
        duration: 15,
        visualCues: ["flat even cream layers", "biscuits arranged neatly"],
        checkpoints: ["perfectly level surface", "going in fridge immediately"],
      },
      {
        text: "Just before serving, dust the surface generously through a fine sieve with high-quality unsweetened cocoa powder — not drinking chocolate, not compound. The cocoa layer should be thick enough to be opaque. Cut into portions with a sharp knife dipped in hot water. The layers should be clearly visible: biscuit, cream, biscuit, cream, cocoa.",
        duration: 3,
        visualCues: ["opaque cocoa layer", "clean cut portions", "visible layers"],
        checkpoints: ["cocoa fully opaque", "distinct layers visible when cut"],
      },
    ],
  },
  {
    id: 48,
    region: "mediterranean",
    name: "Grilled Octopus",
    image: "https://source.unsplash.com/800x600/?grilled+octopus+greek+seafood",
    time: "60 min",
    difficulty: "Medium",
    rating: 4.8,
    calories: 280,
    tags: ["Seafood", "Grilled"],
    description: "Charred tender octopus with lemon-oregano dressing",
    ingredients: [
      { name: "whole octopus", amount: "1.5 kg", prep: "Tenderise by freezing overnight then thawing — breaks down muscle fibres" },
      { name: "garlic", amount: "4 cloves", prep: "Add to poaching water whole" },
      { name: "bay leaves", amount: "3", prep: "Add to poaching water" },
      { name: "red wine", amount: "200ml", prep: "Add to poaching liquid for depth" },
      { name: "extra virgin olive oil", amount: "80ml", prep: "Dress hot octopus immediately after grilling" },
      { name: "lemon", amount: "2", prep: "Juice half over grilled octopus, serve remainder in wedges" },
      { name: "dried oregano", amount: "2 tsp", prep: "Rub on before grilling — blooms in heat" },
      { name: "red wine vinegar", amount: "2 tbsp", prep: "Mix into dressing with olive oil and lemon" },
      { name: "capers", amount: "2 tbsp", prep: "Rinse salt-packed capers, or drain brine-packed" },
      { name: "fresh parsley", amount: "handful", prep: "Roughly chop — scatter over plated octopus" },
    ],
    steps: [
      {
        text: "Simmer octopus in water for 45 minutes until easily pierced",
        duration: 45,
        visualCues: ["tentacles curled", "purple-red color"],
        checkpoints: ["easily pierced", "tentacles curled"],
      },
      {
        text: "Grill on high heat 5 minutes per side until charred",
        duration: 10,
        visualCues: ["charred octopus", "crispy skin"],
        checkpoints: ["crispy char"],
      },
      {
        text: "Slice and drizzle with olive oil, lemon, oregano and vinegar",
        duration: 2,
        visualCues: ["sliced pieces", "dressing drizzled"],
        checkpoints: ["beautifully plated"],
      },
    ],
  },
  {
    id: 49,
    region: "mediterranean",
    name: "Bouillabaisse",
    image: "https://source.unsplash.com/800x600/?bouillabaisse+french+seafood+stew",
    time: "60 min",
    difficulty: "Hard",
    rating: 4.8,
    calories: 420,
    tags: ["Seafood", "Stew", "French"],
    description: "Marseille saffron seafood stew with rouille croutons",
    ingredients: [
      { name: "mixed firm fish (monkfish, red mullet, John Dory)", amount: "1 kg", prep: "Cut into large chunks — add firmer fish first, delicate fish last" },
      { name: "mussels", amount: "500g", prep: "Scrub, debeard — discard any open ones that don't close when tapped" },
      { name: "raw shrimp (shell on)", amount: "300g", prep: "Remove heads to fry separately for stock — adds deep shellfish flavour" },
      { name: "fennel", amount: "2 bulbs", prep: "Slice thin — reserve fronds for garnish" },
      { name: "onion", amount: "2 large", prep: "Rough chop for base" },
      { name: "tomatoes", amount: "400g", prep: "Roughly chop — cook until completely broken down" },
      { name: "saffron", amount: "generous pinch", prep: "Dissolve in 3 tbsp hot water, add to broth" },
      { name: "orange peel", amount: "3 strips", prep: "Peel with peeler, avoiding white pith — add to simmering broth" },
      { name: "rouille", amount: "to serve", prep: "Blend garlic + egg yolk + saffron + olive oil + breadcrumbs into mayonnaise" },
      { name: "baguette", amount: "1 loaf", prep: "Slice 1cm, toast until golden — spread rouille on top" },
    ],
    steps: [
      {
        text: "Sweat fennel, onion, celery, garlic until very soft",
        duration: 10,
        visualCues: ["translucent vegetables", "very soft"],
        checkpoints: ["very soft"],
      },
      {
        text: "Add tomatoes, saffron, orange peel, stock — simmer 20 minutes",
        duration: 20,
        visualCues: ["golden saffron broth", "aromatic"],
        checkpoints: ["golden and aromatic"],
      },
      {
        text: "Add firm fish (3 min) then delicate fish and shellfish",
        duration: 8,
        visualCues: ["mussels opening", "shrimp curling"],
        checkpoints: ["all shellfish open"],
      },
      {
        text: "Toast baguette, spread rouille, ladle stew over",
        duration: 5,
        visualCues: ["golden croutons", "rouille spread"],
        checkpoints: ["croutons golden"],
      },
    ],
  },
  {
    id: 50,
    region: "mediterranean",
    name: "Panna Cotta",
    image: "https://source.unsplash.com/800x600/?panna+cotta+italian+dessert+berries",
    time: "20 min",
    difficulty: "Easy",
    rating: 4.7,
    calories: 320,
    tags: ["Dessert", "No-bake"],
    description:
      "Silky cooked cream dessert with vanilla that trembles on the plate",
    ingredients: [
      { name: "heavy cream", amount: "600ml", prep: "No prep — heat gently until just steaming" },
      { name: "whole milk", amount: "200ml", prep: "Add to cream for lighter texture" },
      { name: "gelatin sheets (silver grade)", amount: "5", prep: "Soak in cold water 5 min until floppy — squeeze completely before adding to warm cream" },
      { name: "caster sugar", amount: "80g", prep: "Dissolve into cream while warming" },
      { name: "vanilla bean", amount: "1", prep: "Split and scrape seeds into cream, add pod too — remove before pouring" },
      { name: "lemon zest", amount: "1 tsp", prep: "Fine grate — optional, brightens flavour" },
      { name: "mixed berries", amount: "300g", prep: "For coulis: cook half with sugar and strain; serve other half fresh" },
      { name: "sugar (for coulis)", amount: "3 tbsp", prep: "Cook with half the berries until syrupy" },
    ],
    steps: [
      {
        text: "Bloom gelatin sheets in cold water 5 minutes",
        duration: 5,
        visualCues: ["soft gelatin sheets"],
        checkpoints: ["sheets pliable"],
      },
      {
        text: "Heat cream, milk, sugar and vanilla until just steaming",
        duration: 5,
        visualCues: ["steaming cream", "not boiling"],
        checkpoints: ["just steaming"],
      },
      {
        text: "Whisk in squeezed gelatin until dissolved",
        duration: 2,
        visualCues: ["gelatin dissolved", "smooth cream"],
        checkpoints: ["completely dissolved"],
      },
      {
        text: "Pour into molds, chill 4 hours",
        duration: 240,
        visualCues: ["set cream", "gentle wobble"],
        checkpoints: ["wobbles gently"],
      },
      {
        text: "Unmold and serve with fresh berries and coulis",
        duration: 2,
        visualCues: ["unmolded", "berry topping"],
        checkpoints: ["holds shape", "trembles"],
      },
    ],
  },

  // WESTERN EUROPE
  {
    id: 51,
    region: "western-europe",
    name: "Beef Bourguignon",
    image: "https://source.unsplash.com/800x600/?beef+bourguignon+french+stew",
    time: "180 min",
    difficulty: "Hard",
    rating: 4.9,
    calories: 620,
    tags: ["Beef", "Braised", "French"],
    description: "Julia Child's legendary braised beef in Burgundy wine",
    ingredients: [
      { name: "beef chuck", amount: "1.5 kg", prep: "Cut into 5cm chunks, pat absolutely dry — wet beef won't brown" },
      { name: "Burgundy or Pinot Noir", amount: "750ml (1 bottle)", prep: "Marinate beef overnight with vegetables, drain and reserve liquid before browning" },
      { name: "lardons (thick-cut bacon)", amount: "200g", prep: "Blanch 5 min to remove excess salt, pat dry, render in Dutch oven first" },
      { name: "pearl onions", amount: "300g", prep: "Blanch 1 min, peel — brown in butter in separate pan until golden" },
      { name: "cremini mushrooms", amount: "300g", prep: "Quarter, sauté in butter separately until golden — add only at end" },
      { name: "carrots", amount: "3 large", prep: "Cut thick coins — large cuts withstand 2.5 hr braise" },
      { name: "garlic", amount: "6 cloves", prep: "Crushed whole — mellow and sweet after long cooking" },
      { name: "tomato paste", amount: "2 tbsp", prep: "Fry in pan after browning meat — caramelises, adds depth" },
      { name: "fresh thyme", amount: "6 sprigs", prep: "Tie in bouquet garni with bay and parsley stems" },
      { name: "all-purpose flour", amount: "3 tbsp", prep: "Dust meat before browning — thickens sauce" },
    ],
    steps: [
      {
        text: "The day before: cut 1.5 kg of beef chuck into 5cm chunks and pat completely dry — wet beef cannot brown. Marinate overnight in 750ml of Burgundy wine with 3 crushed garlic cloves, sliced carrots, a bouquet garni, and black pepper. The next day, remove the beef and pat dry again. Strain and reserve the marinade.",
        duration: 15,
        visualCues: ["beef drying after marinade", "reserved marinade liquid"],
        checkpoints: ["beef completely dry", "marinade strained and reserved"],
      },
      {
        text: "In your Dutch oven, render 200g of blanched lardons over medium heat until golden and crispy. Remove. Increase heat to high and brown the beef in small batches — 4 minutes per side, absolutely no crowding. The beef must sear, not steam. Each batch should produce a rich brown crust with dark fond forming on the bottom of the pot.",
        duration: 30,
        visualCues: ["deep brown crust on beef", "rich fond on pot bottom"],
        checkpoints: ["deep brown not grey", "rich dark fond forming"],
      },
      {
        text: "Add 2 large diced onions to the fat and cook 5 minutes until softened. Add 3 tablespoons of flour and stir 2 minutes to make a light roux. Pour in the reserved marinade wine and bring to a boil, scraping up every last bit of the dark fond from the bottom — this is pure flavour. Add 2 tablespoons of tomato paste. Return the beef and lardons.",
        duration: 12,
        visualCues: ["fond dissolving into wine", "dark wine sauce"],
        checkpoints: ["all fond scraped up", "no dry flour taste"],
      },
      {
        text: "Bring to a simmer, then cover and transfer to a 160°C oven for 2.5 hours. The oven's all-around heat creates a gentler, more even braise than the stovetop. After 90 minutes, the kitchen should smell extraordinary. The beef is ready when it yields without any resistance to a fork. Meanwhile, brown 300g of quartered mushrooms and 300g of pearl onions separately in butter until golden.",
        duration: 150,
        visualCues: ["fork-tender beef", "rich dark sauce"],
        checkpoints: ["fork slides in with no resistance", "sauce glossy and thickened"],
      },
      {
        text: "Remove the beef and strain the sauce through a fine sieve into a saucepan. Skim the fat from the surface and reduce over high heat for 10 minutes if needed until it coats a spoon richly. Return the beef, add the browned mushrooms and pearl onions. Simmer together 10 minutes to marry the flavours. Garnish with fresh thyme and serve with crusty bread, egg noodles, or mashed potato.",
        duration: 22,
        visualCues: ["glossy reduced sauce", "mushrooms and onions added"],
        checkpoints: ["sauce coats spoon thickly", "all components combined"],
      },
    ],
  },
  {
    id: 52,
    region: "western-europe",
    name: "German Sauerbraten",
    image: "https://source.unsplash.com/800x600/?sauerbraten+german+pot+roast",
    time: "120 min",
    difficulty: "Hard",
    rating: 4.7,
    calories: 540,
    tags: ["Beef", "German"],
    description: "Vinegar-marinated pot roast with gingersnap-thickened gravy",
    ingredients: [
      { name: "beef bottom round or rump", amount: "1.5 kg", prep: "Marinate 3–5 days in vinegar brine in fridge — turns the tough cut tender" },
      { name: "red wine vinegar", amount: "250ml", prep: "Combine with water, onion, spices for marinade" },
      { name: "red wine", amount: "250ml", prep: "Add to marinade for colour and depth" },
      { name: "onion", amount: "3 large", prep: "Slice for marinade and for braising" },
      { name: "carrots", amount: "2", prep: "Large chunks for braising" },
      { name: "celery", amount: "2 stalks", prep: "Large chunks for braising base" },
      { name: "gingersnap cookies", amount: "8–10", prep: "Crumble into gravy at end — traditional thickener and sweetener" },
      { name: "raisins", amount: "80g", prep: "Add to gravy with gingersnaps" },
      { name: "bay leaves", amount: "4", prep: "Add to marinade and braising liquid" },
      { name: "juniper berries", amount: "8", prep: "Crush slightly — add to marinade" },
    ],
    steps: [
      {
        text: "Marinate beef in vinegar, wine, aromatics in fridge 3 days",
        duration: 30,
        visualCues: ["beef in marinade", "submerged"],
        checkpoints: ["fully submerged"],
      },
      {
        text: "Remove beef, pat dry, brown deeply on all sides",
        duration: 15,
        visualCues: ["very dark crust", "fond forming"],
        checkpoints: ["deep dark crust"],
      },
      {
        text: "Add strained marinade, braise 90 minutes",
        duration: 90,
        visualCues: ["fork tender beef", "rich liquid"],
        checkpoints: ["yields to fork"],
      },
      {
        text: "Crumble gingersnap cookies into liquid to thicken gravy",
        duration: 10,
        visualCues: ["cookies dissolving", "sauce thickening"],
        checkpoints: ["smooth thick gravy"],
      },
    ],
  },
  {
    id: 53,
    region: "western-europe",
    name: "Beef Wellington",
    image: "https://source.unsplash.com/800x600/?beef+wellington+british",
    time: "120 min",
    difficulty: "Hard",
    rating: 4.9,
    calories: 680,
    tags: ["Beef", "Pastry", "Showstopper"],
    description:
      "Tenderloin in mushroom duxelles and prosciutto, wrapped in puff pastry",
    ingredients: [
      { name: "beef tenderloin (centre cut)", amount: "1 kg", prep: "Tie with string to even cylindrical shape, sear all sides in very hot oil, brush with English mustard, refrigerate 30 min" },
      { name: "prosciutto di Parma", amount: "12 slices", prep: "Lay overlapping on cling film — forms moisture barrier for pastry" },
      { name: "mushroom duxelles", amount: "400g mushrooms", prep: "Blitz mushrooms fine, cook in butter until completely dry — must have no moisture" },
      { name: "English mustard", amount: "3 tbsp", prep: "Brush over seared beef — creates flavour and helps prosciutto stick" },
      { name: "puff pastry (all-butter)", amount: "500g", prep: "Keep cold until last moment — warm pastry won't hold structure" },
      { name: "egg yolks", amount: "2", prep: "Mix with 1 tsp cream for egg wash — apply twice with 15 min rest between" },
      { name: "Dijon mustard", amount: "2 tbsp", prep: "Mix with English mustard for beef coating" },
      { name: "shallots", amount: "4", prep: "Mince fine — cook into duxelles" },
      { name: "thyme", amount: "4 sprigs", prep: "Add leaves to duxelles while cooking" },
    ],
    steps: [
      {
        text: "Tie the 1 kg beef tenderloin at 3cm intervals with kitchen twine to create a perfectly uniform cylinder. Season extremely generously with salt and pepper. In a screaming hot pan with 2 tablespoons of oil, sear all surfaces — top, bottom, and both ends — for 45 seconds per side until a deeply browned crust forms everywhere. Brush immediately all over with 3 tablespoons of English mustard. Refrigerate for 30 minutes to chill and firm up.",
        duration: 40,
        visualCues: ["deep brown sear all over", "mustard-glazed surface"],
        checkpoints: ["sear covers all surfaces including ends", "mustard coating even"],
      },
      {
        text: "For the duxelles, blitz 400g of mixed mushrooms with 4 shallots in a processor until very finely minced. Cook in 30g of butter over high heat, stirring constantly, for 15–20 minutes until every drop of moisture has evaporated and the mixture is completely dry — it should look like dark, dense paste and leave no moisture when pressed on kitchen paper. Season with fresh thyme, salt and pepper.",
        duration: 22,
        visualCues: ["completely dry dark mushroom paste", "no moisture when pressed"],
        checkpoints: ["completely dry", "leaves no moisture on paper towel"],
      },
      {
        text: "Lay 12 overlapping slices of prosciutto on cling film, forming a rectangle large enough to wrap the beef. Spread the duxelles in an even layer over the prosciutto. Place the cold beef at the near edge and use the cling film to roll tightly into a log. Twist the ends firmly and refrigerate 30 minutes. The prosciutto keeps the duxelles against the beef and creates a moisture barrier for the pastry.",
        duration: 35,
        visualCues: ["tight prosciutto and mushroom cylinder", "uniform shape"],
        checkpoints: ["tight cylinder with no air pockets", "uniform thickness"],
      },
      {
        text: "Unwrap the beef cylinder onto a sheet of cold all-butter puff pastry. Brush the pastry edges with egg wash. Roll tightly, pressing firmly to seal — no air pockets. Trim excess pastry. Brush the outside with egg wash. Score the top with the back of a knife in a diagonal pattern without cutting through. Refrigerate 15 minutes.",
        duration: 20,
        visualCues: ["sealed pastry roll", "egg wash coating"],
        checkpoints: ["sealed with no gaps", "well-chilled before baking"],
      },
      {
        text: "Apply a second egg wash just before baking. Place on a cold baking tray and roast at 220°C for 25–30 minutes. Use a meat thermometer: 52°C for rare, 57°C for medium-rare. The pastry must be deeply golden and crispy — if it browns too fast, cover loosely with foil. Rest for 10 minutes before slicing into 3cm rounds with a sharp serrated knife.",
        duration: 40,
        visualCues: ["deeply golden pastry", "thermometer at correct temperature"],
        checkpoints: ["internal temperature 52-57°C", "pastry deeply golden all over"],
      },
    ],
  },
  {
    id: 54,
    region: "western-europe",
    name: "French Onion Soup",
    image: "https://source.unsplash.com/800x600/?french+onion+soup+gratin",
    time: "60 min",
    difficulty: "Medium",
    rating: 4.8,
    calories: 380,
    tags: ["Soup", "Onion", "French"],
    description:
      "Deeply caramelized onion soup with Gruyère-smothered croutons",
    ingredients: [
      { name: "onions", amount: "1.5 kg", prep: "Slice very thin half-rings — minimum 45 min caramelisation, stirring every 5 min" },
      { name: "butter", amount: "60g", prep: "Start onions in butter + oil combination — pure butter burns" },
      { name: "dry white wine or dry vermouth", amount: "150ml", prep: "Deglaze after onions are deep golden — scrape up all fond" },
      { name: "beef stock", amount: "1.5 litres", prep: "Good quality essential — homemade or good carton, not cubes" },
      { name: "fresh thyme", amount: "6 sprigs", prep: "Add to simmering soup — remove stems before serving" },
      { name: "bay leaves", amount: "2", prep: "Add with thyme, remove before serving" },
      { name: "brandy or cognac", amount: "3 tbsp", prep: "Add after wine reduces — optional but adds depth" },
      { name: "Gruyère cheese", amount: "200g", prep: "Grate coarsely — must be room temperature for even melting" },
      { name: "baguette", amount: "1 loaf", prep: "Slice 2cm thick, toast in oven until completely dry and hard — prevents getting soggy" },
    ],
    steps: [
      {
        text: "Cook sliced onions in butter 40-45 minutes until deeply caramelized jam",
        duration: 45,
        visualCues: ["deep caramel color", "reduced volume"],
        checkpoints: ["very dark", "jam-like"],
      },
      {
        text: "Deglaze with cognac and wine, scraping fond",
        duration: 3,
        visualCues: ["deglazed pan", "fond lifting"],
        checkpoints: ["fond dissolved"],
      },
      {
        text: "Add beef stock and thyme, simmer 20 minutes",
        duration: 20,
        visualCues: ["rich brown broth", "aromatic"],
        checkpoints: ["deeply flavored"],
      },
      {
        text: "Top with baguette slice and generous Gruyère in oven-safe bowls",
        duration: 3,
        visualCues: ["soup in bowl", "cheese mound"],
        checkpoints: ["cheese generous"],
      },
      {
        text: "Broil until cheese deeply browned and bubbling",
        duration: 5,
        visualCues: ["bubbling cheese", "golden brown"],
        checkpoints: ["very brown and bubbling"],
      },
    ],
  },
  {
    id: 55,
    region: "western-europe",
    name: "Belgian Moules Frites",
    image: "https://source.unsplash.com/800x600/?moules+frites+mussels+fries",
    time: "25 min",
    difficulty: "Easy",
    rating: 4.7,
    calories: 480,
    tags: ["Seafood", "Fries"],
    description:
      "Mussels steamed in white wine with double-fried Belgian fries",
    ingredients: [
      { name: "fresh mussels", amount: "2 kg", prep: "Scrub shells, pull off beards — discard any that stay open after tapping" },
      { name: "Belgian ale or dry white wine", amount: "300ml", prep: "No prep — main steaming liquid" },
      { name: "shallots", amount: "4 large", prep: "Mince fine — sweat in butter until very soft before adding mussels" },
      { name: "celery", amount: "3 stalks", prep: "Mince fine — cook with shallots" },
      { name: "butter", amount: "80g", prep: "Cold, cubed — swirl in at end for richness" },
      { name: "garlic", amount: "3 cloves", prep: "Mince — add after shallots and celery are soft" },
      { name: "bay leaves", amount: "3", prep: "Add to pot with wine" },
      { name: "fresh parsley", amount: "large bunch", prep: "Chop stems separately for cooking, leaves for garnish" },
      { name: "Maris Piper or Russet potatoes (for fries)", amount: "1 kg", prep: "Cut 1cm thick batons, double fry — first at 140°C, second at 190°C" },
      { name: "heavy cream", amount: "100ml", prep: "Stir into mussels at end for creamy version" },
    ],
    steps: [
      {
        text: "Scrub and debeard mussels, discard any that won't close",
        duration: 10,
        visualCues: ["cleaned mussels", "beards removed"],
        checkpoints: ["all cleaned"],
      },
      {
        text: "Sauté shallots and celery, add wine, bring to full boil",
        duration: 5,
        visualCues: ["softened aromatics", "boiling liquid"],
        checkpoints: ["at full boil"],
      },
      {
        text: "Add mussels, cover, steam 3-4 minutes until ALL open",
        duration: 4,
        visualCues: ["mussels opening", "shells open"],
        checkpoints: ["ALL open"],
      },
      {
        text: "Add cream and parsley, serve with crispy fries",
        duration: 2,
        visualCues: ["cream added", "fries alongside"],
        checkpoints: ["served hot"],
      },
    ],
  },
  {
    id: 56,
    region: "western-europe",
    name: "Crêpes Suzette",
    image: "https://source.unsplash.com/800x600/?crepes+suzette+french+dessert",
    time: "30 min",
    difficulty: "Medium",
    rating: 4.8,
    calories: 340,
    tags: ["Dessert", "French", "Flambéed"],
    description: "Thin crêpes flambéed with buttery orange Grand Marnier sauce",
    ingredients: [
      { name: "all-purpose flour", amount: "150g", prep: "Sift into bowl to remove lumps" },
      { name: "eggs", amount: "3 large", prep: "Room temperature — whisk into flour first before adding milk" },
      { name: "whole milk", amount: "350ml", prep: "Add gradually while whisking to avoid lumps" },
      { name: "butter", amount: "50g (for batter)", prep: "Melt and cool slightly — add to batter, rest 30 min" },
      { name: "oranges", amount: "3 large", prep: "Zest 2 finely, juice all 3 — zest goes in sauce, juice for deglazing" },
      { name: "lemon", amount: "1", prep: "Zest and juice — adds brightness to orange sauce" },
      { name: "unsalted butter (for sauce)", amount: "100g", prep: "Room temperature — cream with sugar and orange zest" },
      { name: "caster sugar", amount: "80g", prep: "Caramelise in pan before adding butter" },
      { name: "Grand Marnier or Cointreau", amount: "80ml", prep: "Room temperature for flambé — warm spirits catch flame better" },
    ],
    steps: [
      {
        text: "Blend crêpe batter until smooth, rest 30 minutes",
        duration: 30,
        visualCues: ["smooth thin batter", "no lumps"],
        checkpoints: ["smooth", "no lumps"],
      },
      {
        text: "Cook thin lacy crêpes in buttered pan",
        duration: 10,
        visualCues: ["lacy crêpes", "golden spots"],
        checkpoints: ["lacy holes", "golden spots"],
      },
      {
        text: "Make orange butter sauce with zest and sugar",
        duration: 5,
        visualCues: ["golden orange sauce", "butter emulsified"],
        checkpoints: ["sauce golden"],
      },
      {
        text: "Fold crêpes in quarters in sauce, add Grand Marnier and flambé",
        duration: 5,
        visualCues: ["blue flames", "alcohol burning"],
        checkpoints: ["flames visible", "alcohol off"],
      },
    ],
  },
  {
    id: 57,
    region: "western-europe",
    name: "Wiener Schnitzel",
    image: "https://source.unsplash.com/800x600/?wiener+schnitzel+austrian+veal",
    time: "25 min",
    difficulty: "Medium",
    rating: 4.7,
    calories: 520,
    tags: ["Veal", "Breaded", "Classic"],
    description: "Veal cutlet pounded thin with soufflé-like crispy breading",
    ingredients: [
      { name: "veal leg cutlets", amount: "4 (150g each)", prep: "Pound between plastic wrap to 3mm uniform thickness — even pounding essential" },
      { name: "all-purpose flour", amount: "100g", prep: "Season with salt — first coating station" },
      { name: "eggs", amount: "3", prep: "Beat well with 1 tbsp milk — second coating station" },
      { name: "fresh white breadcrumbs", amount: "200g", prep: "Day-old white bread, remove crusts, pulse in processor — fresh not dried" },
      { name: "clarified butter or lard", amount: "400ml", prep: "Heat to 160–170°C in wide shallow pan — must be at least 3cm deep" },
      { name: "lemons", amount: "2", prep: "Cut into wedges — traditional garnish" },
      { name: "capers", amount: "2 tbsp", prep: "Drain — garnish on top" },
      { name: "anchovy fillets", amount: "4", prep: "Optional traditional garnish" },
      { name: "parsley", amount: "small bunch", prep: "Flat-leaf, roughly chop — garnish" },
    ],
    steps: [
      {
        text: "Pound veal to 3-4mm between plastic wrap, season",
        duration: 5,
        visualCues: ["very thin cutlet", "even thickness"],
        checkpoints: ["very thin"],
      },
      {
        text: "Bread: flour, egg wash, breadcrumbs — do NOT press down",
        duration: 5,
        visualCues: ["loose airy coating", "not compressed"],
        checkpoints: ["loose coating, NOT pressed"],
      },
      {
        text: "Fry in generous clarified butter at 170°C, swirling pan constantly",
        duration: 4,
        visualCues: ["puffed soufflé crust", "golden color"],
        checkpoints: ["puffed from meat", "golden"],
      },
      {
        text: "Drain and serve immediately with lemon",
        duration: 1,
        visualCues: ["crispy puffed coating", "lemon alongside"],
        checkpoints: ["crispy and puffed"],
      },
    ],
  },
  {
    id: 58,
    region: "western-europe",
    name: "Scottish Cullen Skink",
    image: "https://source.unsplash.com/800x600/?cullen+skink+scottish+smoked+haddock+soup",
    time: "30 min",
    difficulty: "Easy",
    rating: 4.6,
    calories: 380,
    tags: ["Soup", "Fish", "Scottish"],
    description: "Creamy smoked haddock chowder with leeks and potatoes",
    ingredients: [
      { name: "smoked haddock (undyed)", amount: "500g", prep: "Poach in milk 8 min until just flaking — reserve milk, flake fish removing all bones" },
      { name: "whole milk", amount: "500ml", prep: "Poach fish in this, then use as soup base" },
      { name: "potatoes (floury variety)", amount: "500g", prep: "Peel and dice 2cm, cook separately in stock until tender" },
      { name: "onion", amount: "2 large", prep: "Dice fine, sweat in butter until very soft — no colour" },
      { name: "butter", amount: "50g", prep: "For sweating onion and finishing soup" },
      { name: "double cream", amount: "150ml", prep: "Stir in at end — do not boil after adding" },
      { name: "bay leaves", amount: "2", prep: "Add to milk when poaching fish" },
      { name: "fresh chives", amount: "small bunch", prep: "Snip fine — garnish at serving" },
      { name: "white pepper", amount: "to taste", prep: "White not black — doesn't show in pale soup" },
    ],
    steps: [
      {
        text: "Poach smoked haddock in milk with bay leaf 10 minutes",
        duration: 10,
        visualCues: ["fish in milk", "flaking edges"],
        checkpoints: ["flakes easily"],
      },
      {
        text: "Remove fish and flake large, reserve milk",
        duration: 3,
        visualCues: ["flaked fish", "no bones"],
        checkpoints: ["no bones", "large flakes"],
      },
      {
        text: "Sauté leeks and onion, add diced potatoes and reserved milk",
        duration: 15,
        visualCues: ["soft leeks", "potatoes simmering"],
        checkpoints: ["potatoes tender"],
      },
      {
        text: "Partially mash some potatoes, add fish flakes and cream",
        duration: 3,
        visualCues: ["thickened soup", "fish visible"],
        checkpoints: ["slightly thickened"],
      },
    ],
  },
  {
    id: 59,
    region: "western-europe",
    name: "Spanish Churros",
    image: "https://source.unsplash.com/800x600/?churros+spanish+chocolate+dipping",
    time: "20 min",
    difficulty: "Easy",
    rating: 4.7,
    calories: 360,
    tags: ["Dessert", "Fried", "Spanish"],
    description:
      "Crispy ridged fried pastry with cinnamon sugar and chocolate sauce",
    ingredients: [
      { name: "water", amount: "250ml", prep: "Bring to boil with butter, salt, and sugar before adding flour" },
      { name: "all-purpose flour", amount: "150g", prep: "Sift — add all at once to boiling liquid, beat vigorously off heat" },
      { name: "butter", amount: "30g", prep: "Add to water before boiling" },
      { name: "eggs", amount: "2", prep: "Beat in one at a time after dough cools slightly — dough should be pipeable" },
      { name: "oil", amount: "for deep frying", prep: "Heat to 180°C — churros sink then rise when ready to fry" },
      { name: "dark chocolate", amount: "200g (70%)", prep: "Chop finely for quick even melting" },
      { name: "heavy cream", amount: "200ml", prep: "Heat until just simmering — pour over chopped chocolate" },
      { name: "cinnamon sugar", amount: "100g sugar + 2 tsp cinnamon", prep: "Mix and spread on plate — roll hot churros immediately" },
      { name: "piping bag with star nozzle (1cm)", amount: "1", prep: "Fill with dough, pipe directly into hot oil in 10–12cm lengths" },
    ],
    steps: [
      {
        text: "Boil water with salt and oil, add flour, stir until smooth dough",
        duration: 5,
        visualCues: ["smooth thick dough", "pulling from sides"],
        checkpoints: ["smooth", "pulls cleanly"],
      },
      {
        text: "Fill piping bag with star tip",
        duration: 2,
        visualCues: ["filled bag", "star tip attached"],
        checkpoints: ["tip secured"],
      },
      {
        text: "Pipe into 180°C oil, cut, fry until deep golden",
        duration: 5,
        visualCues: ["golden ridged churros", "bubbling oil"],
        checkpoints: ["deep golden"],
      },
      {
        text: "Toss in cinnamon sugar immediately, serve with chocolate sauce",
        duration: 2,
        visualCues: ["sugar coated", "chocolate alongside"],
        checkpoints: ["evenly coated"],
      },
    ],
  },
  {
    id: 60,
    region: "western-europe",
    name: "Welsh Cawl",
    image: "https://source.unsplash.com/800x600/?cawl+welsh+lamb+stew",
    time: "120 min",
    difficulty: "Easy",
    rating: 4.6,
    calories: 460,
    tags: ["Lamb", "Soup", "Traditional"],
    description:
      "Traditional Welsh broth with lamb, leeks, potatoes, and root vegetables",
    ingredients: [
      { name: "bone-in lamb neck or shoulder", amount: "1 kg", prep: "No trimming — fat and bone create the rich stock" },
      { name: "leeks", amount: "4 large", prep: "Reserve green tops for stock, slice white parts 2cm thick — add in last 30 min" },
      { name: "potatoes (waxy)", amount: "600g", prep: "Peel and cut into large chunks — they should be nearly falling apart by end" },
      { name: "carrots", amount: "4", prep: "Cut into large chunks — large size withstands long cooking" },
      { name: "swede (rutabaga)", amount: "1/2 medium", prep: "Peel and cut large chunks — essential Welsh root vegetable" },
      { name: "parsnips", amount: "2", prep: "Peel and cut large chunks" },
      { name: "onion", amount: "2", prep: "Quarter — for stock base" },
      { name: "bay leaves", amount: "3", prep: "Add to pot with lamb" },
      { name: "fresh thyme", amount: "6 sprigs", prep: "Tie together and add to pot" },
      { name: "fresh parsley", amount: "large bunch", prep: "Stir in just before serving" },
    ],
    steps: [
      {
        text: "Simmer lamb neck with aromatics in water 60 minutes",
        duration: 60,
        visualCues: ["simmering broth", "lamb visible"],
        checkpoints: ["lamb tender", "broth forming"],
      },
      {
        text: "Remove lamb, cool broth, skim fat from surface",
        duration: 15,
        visualCues: ["clear broth", "fat skimmed"],
        checkpoints: ["fat removed"],
      },
      {
        text: "Add all root vegetables to broth, simmer 30 minutes",
        duration: 30,
        visualCues: ["vegetables in broth", "tender vegetables"],
        checkpoints: ["all vegetables tender"],
      },
      {
        text: "Return shredded lamb, add leeks, cook final 10 minutes",
        duration: 10,
        visualCues: ["leeks wilted", "complete soup"],
        checkpoints: ["leeks wilted", "soup ready"],
      },
    ],
  },

  // LATIN AMERICA
  {
    id: 61,
    region: "latin-america",
    name: "Birria Tacos",
    image: "https://source.unsplash.com/800x600/?birria+tacos+mexican+beef",
    time: "180 min",
    difficulty: "Hard",
    rating: 4.9,
    calories: 560,
    tags: ["Tacos", "Beef", "Street Food"],
    description:
      "Braised chili beef with consommé for dipping — the viral taco",
    ingredients: [
      { name: "beef chuck or short ribs", amount: "1.5 kg", prep: "Cut large chunks, marinate overnight in chili paste" },
      { name: "dried guajillo chilies", amount: "8", prep: "Toast in dry pan 30 sec, soak in hot water 20 min, blend with other chilies" },
      { name: "dried ancho chilies", amount: "3", prep: "Toast, soak, blend with guajillo" },
      { name: "dried chipotle chilies", amount: "2", prep: "Toast, soak, blend — adds smokiness" },
      { name: "garlic", amount: "8 cloves", prep: "Char in dry pan until blackened on outside — blend into chili paste" },
      { name: "onion", amount: "2 large", prep: "Char half for paste, dice other half raw for serving" },
      { name: "cumin", amount: "2 tsp", prep: "Toast whole seeds, grind fresh" },
      { name: "cinnamon stick", amount: "1 small", prep: "Add whole to braise" },
      { name: "corn tortillas", amount: "16", prep: "Dip in birria fat (consome), fry in pan until crispy on outside" },
      { name: "Oaxacan cheese or mozzarella", amount: "200g", prep: "Shred — layer inside tacos when frying" },
      { name: "cilantro and white onion", amount: "generous", prep: "Mince fine — classic topping" },
    ],
    steps: [
      {
        text: "Toast, soak and blend dried chilies into smooth red sauce",
        duration: 15,
        visualCues: ["dark red sauce", "smooth blended"],
        checkpoints: ["smooth sauce", "deep red"],
      },
      {
        text: "Marinate beef in chili sauce overnight or 4 hours",
        duration: 30,
        visualCues: ["red coated beef"],
        checkpoints: ["fully coated"],
      },
      {
        text: "Braise beef in seasoned broth 3 hours until fall-apart tender",
        duration: 180,
        visualCues: ["very tender beef", "rich red broth"],
        checkpoints: ["shreds effortlessly"],
      },
      {
        text: "Dip tortillas in broth fat, fry on comal with cheese and beef",
        duration: 5,
        visualCues: ["red tortillas", "melting cheese"],
        checkpoints: ["crispy tortilla", "cheese melted"],
      },
      {
        text: "Serve with consommé for dipping, onions, cilantro, lime",
        duration: 2,
        visualCues: ["tacos in consommé", "herbs", "lime"],
        checkpoints: ["consommé hot"],
      },
    ],
  },
  {
    id: 62,
    region: "latin-america",
    name: "Brazilian Feijoada",
    image: "https://source.unsplash.com/800x600/?feijoada+brazilian+black+bean+stew",
    time: "180 min",
    difficulty: "Hard",
    rating: 4.8,
    calories: 680,
    tags: ["Black Beans", "Pork", "Brazilian"],
    description:
      "Brazil's national dish: black bean stew with smoked and cured pork",
    ingredients: [
      { name: "dried black beans", amount: "500g", prep: "Soak overnight — change water once, they nearly double in size" },
      { name: "pork ribs", amount: "300g", prep: "Salt and refrigerate overnight for flavour — or use smoked ribs" },
      { name: "cured pork sausage (linguiça)", amount: "300g", prep: "Slice 1cm coins — brown before adding to beans" },
      { name: "smoked pork belly or bacon", amount: "200g", prep: "Cube and render in pot first — fat base for everything" },
      { name: "salt pork or cured pork ear/tail", amount: "200g", prep: "Soak in water overnight to remove excess salt — change water twice" },
      { name: "onion", amount: "3 large", prep: "Dice fine, fry deeply golden in pork fat" },
      { name: "garlic", amount: "8 cloves", prep: "Mince — fry after onion" },
      { name: "bay leaves", amount: "5", prep: "Add to pot — essential aromatic" },
      { name: "orange", amount: "2", prep: "Slice into rounds, place on top of feijoada while cooking — cuts through richness" },
      { name: "white rice", amount: "400g", prep: "Cook separately — serve alongside" },
      { name: "collard greens", amount: "300g", prep: "Remove stems, roll and slice very thin (chiffonade), fry with garlic just before serving" },
    ],
    steps: [
      {
        text: "Soak beans overnight, pre-cook meats to remove excess salt",
        duration: 30,
        visualCues: ["soaked beans", "simmering meats"],
        checkpoints: ["beans soaked"],
      },
      {
        text: "Combine beans and all meats with aromatics, simmer 2 hours",
        duration: 120,
        visualCues: ["black beans and meat", "dark broth"],
        checkpoints: ["beans very tender", "broth rich"],
      },
      {
        text: "Make sofrito: golden garlic and onion, add to beans",
        duration: 8,
        visualCues: ["golden sofrito", "thickening stew"],
        checkpoints: ["sofrito added"],
      },
      {
        text: "Serve with white rice, farofa, collard greens and orange slices",
        duration: 5,
        visualCues: ["complete plate", "orange slices", "all accompaniments"],
        checkpoints: ["all components ready"],
      },
    ],
  },
  {
    id: 63,
    region: "latin-america",
    name: "Peruvian Ceviche",
    image: "https://source.unsplash.com/800x600/?ceviche+peruvian+seafood+lime",
    time: "20 min",
    difficulty: "Easy",
    rating: 4.9,
    calories: 220,
    tags: ["Seafood", "Raw", "Peruvian"],
    description:
      "Fresh fish in citrus with ají amarillo and red onion — pure Peruvian perfection",
    ingredients: [
      { name: "very fresh white fish (sea bass, halibut, corvina)", amount: "500g", prep: "Cut into 2cm cubes, refrigerate until ice cold — freshness is everything" },
      { name: "limes", amount: "8–10", prep: "Juice just before using — pre-squeezed becomes bitter" },
      { name: "red onion", amount: "1 large", prep: "Slice paper-thin half-rings, soak in iced salted water 10 min to remove harshness, drain" },
      { name: "ají amarillo paste", amount: "2 tbsp", prep: "Mix into leche de tigre — gives Peruvian signature heat and colour" },
      { name: "garlic", amount: "2 cloves", prep: "Grate fine — add to leche de tigre" },
      { name: "ginger", amount: "10g", prep: "Grate fine — small amount in leche de tigre" },
      { name: "fresh cilantro", amount: "large bunch", prep: "Leaves only — add at last moment before serving" },
      { name: "corn (choclo)", amount: "1 cob", prep: "Boil until tender, cut into rounds — serve alongside" },
      { name: "sweet potato", amount: "1 large", prep: "Boil whole until tender, peel, slice — classic accompaniment" },
      { name: "ice cubes", amount: "handful", prep: "Add to fish while marinating — keeps temperature cold for food safety" },
    ],
    steps: [
      {
        text: "Cut fish into 2cm cubes, season with salt 5 minutes",
        duration: 5,
        visualCues: ["cubed fish", "salted"],
        checkpoints: ["even cubes"],
      },
      {
        text: "Make leche de tigre: blend lime with ginger, garlic and chili",
        duration: 3,
        visualCues: ["cloudy citrus liquid"],
        checkpoints: ["smooth marinade"],
      },
      {
        text: "Pour over fish with onion — marinate EXACTLY 3 minutes",
        duration: 3,
        visualCues: ["fish opacifying at edges", "color changing"],
        checkpoints: ["3 minutes only", "edges opaque"],
      },
      {
        text: "Add ají amarillo paste and cilantro, plate with sweet potato",
        duration: 2,
        visualCues: ["yellow chili mixed", "colorful plate"],
        checkpoints: ["served immediately"],
      },
    ],
  },
  {
    id: 64,
    region: "latin-america",
    name: "Oaxacan Mole Negro",
    image: "https://source.unsplash.com/800x600/?mole+negro+mexican+sauce+chocolate",
    time: "180 min",
    difficulty: "Hard",
    rating: 4.9,
    calories: 480,
    tags: ["Chicken", "Mexican", "Complex"],
    description:
      "Complex Oaxacan mole with chilies, Mexican chocolate, and 30+ ingredients",
    ingredients: [
      { name: "chicken pieces", amount: "1.5 kg", prep: "Poach in water with onion and garlic 20 min — reserve broth for mole" },
      { name: "mulato dried chilies", amount: "6", prep: "Remove seeds and veins — toast briefly in dry pan, soak in hot water 20 min" },
      { name: "ancho dried chilies", amount: "4", prep: "Toast and soak with mulato" },
      { name: "pasilla dried chilies", amount: "3", prep: "Toast and soak with others" },
      { name: "chihuacle negro dried chilies", amount: "4", prep: "Toast and soak — essential for Negro mole" },
      { name: "sesame seeds", amount: "4 tbsp", prep: "Toast until golden — blend into mole paste" },
      { name: "pumpkin seeds (pepitas)", amount: "4 tbsp", prep: "Toast until popping — blend into paste" },
      { name: "dark chocolate (70%)", amount: "60g", prep: "Chop — adds depth, not sweetness" },
      { name: "plantain (ripe)", amount: "1", prep: "Fry in oil until deeply golden — blend into mole" },
      { name: "stale tortillas", amount: "3", prep: "Fry until crispy — blend to thicken mole" },
      { name: "tomatoes", amount: "3", prep: "Char on dry comal until blackened — blend into mole" },
    ],
    steps: [
      {
        text: "Toast and soak all dried chilies, separately toast spices",
        duration: 20,
        visualCues: ["rehydrated chilies", "fragrant spices"],
        checkpoints: ["chilies soft", "spices fragrant"],
      },
      {
        text: "Char tomatoes, tomatillos, garlic on flame",
        duration: 10,
        visualCues: ["charred vegetables", "blackened skin"],
        checkpoints: ["good char"],
      },
      {
        text: "Blend all elements in batches until smooth",
        duration: 15,
        visualCues: ["dark paste", "smooth texture"],
        checkpoints: ["completely smooth"],
      },
      {
        text: "Fry mole paste in lard until very dark and thick",
        duration: 20,
        visualCues: ["frying paste", "darkening"],
        checkpoints: ["very dark"],
      },
      {
        text: "Add broth gradually, simmer 45 min, finish with chocolate",
        duration: 45,
        visualCues: ["smooth thick sauce", "chocolate melted"],
        checkpoints: ["chocolate integrated", "deep black color"],
      },
    ],
  },
  {
    id: 65,
    region: "latin-america",
    name: "Argentine Empanadas",
    image: "https://source.unsplash.com/800x600/?empanadas+argentinian+baked",
    time: "60 min",
    difficulty: "Medium",
    rating: 4.7,
    calories: 380,
    tags: ["Pastry", "Beef", "Street Food"],
    description:
      "Flaky pastry with beef, olives, raisins and the repulgue fold",
    ingredients: [
      { name: "all-purpose flour", amount: "500g", prep: "Mix with lard/butter, salt, egg — add water gradually, knead 5 min, rest 30 min" },
      { name: "lard or butter", amount: "120g", prep: "Cold and cubed — rub into flour for flaky pastry" },
      { name: "ground beef (20% fat)", amount: "400g", prep: "Do not pre-cook for baked version — raw beef finishes cooking in oven" },
      { name: "onion", amount: "2 large", prep: "Dice fine — soften in oil before mixing with raw meat" },
      { name: "spring onions", amount: "4", prep: "Slice — mix into filling" },
      { name: "hard-boiled eggs", amount: "2", prep: "Boil 10 min, cool, peel and chop — fold into filling" },
      { name: "green olives", amount: "80g", prep: "Pit and roughly chop — fold into filling" },
      { name: "cumin", amount: "2 tsp", prep: "Toast and grind fresh — key Argentine spice" },
      { name: "smoked paprika", amount: "1 tsp", prep: "Mix with cumin" },
      { name: "raisins", amount: "50g", prep: "Soak in hot water 10 min, drain — fold into filling (traditional)" },
      { name: "egg", amount: "1", prep: "Beat for egg wash — brush before baking" },
    ],
    steps: [
      {
        text: "Sauté onions, cook beef through, add olives and raisins",
        duration: 10,
        visualCues: ["cooked beef", "olive pieces", "raisins"],
        checkpoints: ["beef cooked", "not too wet"],
      },
      {
        text: "Cool filling completely before assembling",
        duration: 20,
        visualCues: ["cooled filling"],
        checkpoints: ["fully cooled"],
      },
      {
        text: "Fill, add egg slice, fold and seal with repulgue braiding",
        duration: 20,
        visualCues: ["braided edge", "sealed empanadas"],
        checkpoints: ["fully sealed", "decorative braid"],
      },
      {
        text: "Egg wash, bake 200°C 20 min until golden",
        duration: 20,
        visualCues: ["golden pastry", "shiny from egg wash"],
        checkpoints: ["deep golden", "no leaks"],
      },
    ],
  },
  {
    id: 66,
    region: "latin-america",
    name: "Colombian Arepas",
    image: "https://source.unsplash.com/800x600/?arepas+colombian+corn+cake",
    time: "20 min",
    difficulty: "Easy",
    rating: 4.6,
    calories: 290,
    tags: ["Corn", "Vegetarian", "Street Food"],
    description: "Griddled corn cakes stuffed with melty mozzarella cheese",
    ingredients: [
      { name: "pre-cooked white cornmeal (masarepa)", amount: "2 cups", prep: "Mix with warm water, salt, and butter until soft dough — rest 5 min" },
      { name: "warm water", amount: "2 cups", prep: "Add gradually to cornmeal — consistency should be like soft playdough" },
      { name: "butter", amount: "2 tbsp", prep: "Melt into dough for richness" },
      { name: "salt", amount: "1 tsp", prep: "Mix into dry cornmeal first" },
      { name: "white cheese (queso blanco)", amount: "200g", prep: "Crumble or grate — mix into dough for cheese arepas" },
      { name: "milk", amount: "4 tbsp", prep: "Add to dough for softer texture — optional" },
      { name: "butter (for cooking)", amount: "2 tbsp", prep: "Cook arepas in butter on medium — golden crust on each side" },
    ],
    steps: [
      {
        text: "Mix masarepa with warm water and salt into smooth pliable dough",
        duration: 3,
        visualCues: ["smooth dough", "no cracks", "holds shape"],
        checkpoints: ["smooth and pliable"],
      },
      {
        text: "Form balls and flatten into 1.5cm thick rounds",
        duration: 3,
        visualCues: ["round arepas", "even thickness"],
        checkpoints: ["even thickness", "no edge cracks"],
      },
      {
        text: "Cook on hot griddle 4-5 min per side until golden crusted",
        duration: 10,
        visualCues: ["golden crust", "sounds hollow"],
        checkpoints: ["golden on both sides"],
      },
      {
        text: "Split and fill with mozzarella, grill until cheese melts",
        duration: 3,
        visualCues: ["melting cheese", "oozing edges"],
        checkpoints: ["fully melted", "oozing"],
      },
    ],
  },
  {
    id: 67,
    region: "latin-america",
    name: "Peruvian Lomo Saltado",
    image: "https://source.unsplash.com/800x600/?lomo+saltado+peruvian+stir+fry",
    time: "20 min",
    difficulty: "Easy",
    rating: 4.7,
    calories: 540,
    tags: ["Beef", "Stir-fry", "Fusion"],
    description:
      "Chinese-Peruvian stir-fry with sirloin, tomatoes, peppers over fries",
    ingredients: [
      { name: "beef sirloin or tenderloin", amount: "600g", prep: "Slice into thick strips 1.5cm — must be very dry, marinate briefly in soy + vinegar" },
      { name: "yellow potatoes", amount: "400g", prep: "Cut into thick fries, deep fry at 180°C until golden and crispy" },
      { name: "red onion", amount: "2 large", prep: "Cut into thick wedges — they should retain texture in high-heat wok" },
      { name: "tomatoes", amount: "3 large", prep: "Cut into wedges — add at end of wok cooking" },
      { name: "ají amarillo", amount: "2 fresh or 3 tbsp paste", prep: "Seed and slice if fresh — essential Peruvian pepper" },
      { name: "soy sauce", amount: "4 tbsp", prep: "Mix with oyster sauce for stir-fry sauce" },
      { name: "red wine vinegar", amount: "2 tbsp", prep: "Add when flambéing — creates steam and sauce" },
      { name: "garlic", amount: "4 cloves", prep: "Mince — add first to screaming hot wok" },
      { name: "fresh cilantro", amount: "large bunch", prep: "Roughly chop — stir in at end" },
      { name: "white rice", amount: "400g", prep: "Cook separately — serve alongside" },
    ],
    steps: [
      {
        text: "Cut beef into strips, season with cumin and garlic",
        duration: 3,
        visualCues: ["seasoned beef strips"],
        checkpoints: ["even strips"],
      },
      {
        text: "Sear in screaming hot wok in batches for charred edges",
        duration: 4,
        visualCues: ["charred beef", "wok smoke"],
        checkpoints: ["charred exterior"],
      },
      {
        text: "Add onion and ají amarillo, stir-fry 2 min — still with texture",
        duration: 2,
        visualCues: ["wilted onion", "sizzling wok"],
        checkpoints: ["slightly wilted only"],
      },
      {
        text: "Add tomatoes, soy, vinegar, add cilantro",
        duration: 3,
        visualCues: ["tomatoes softening", "sauce coating"],
        checkpoints: ["tomatoes softened"],
      },
      {
        text: "Toss in fries, serve immediately",
        duration: 1,
        visualCues: ["fries in stir-fry"],
        checkpoints: ["served hot"],
      },
    ],
  },
  {
    id: 68,
    region: "latin-america",
    name: "Venezuelan Pabellón",
    image: "https://source.unsplash.com/800x600/?pabellon+criollo+venezuelan+rice+beans",
    time: "60 min",
    difficulty: "Medium",
    rating: 4.7,
    calories: 580,
    tags: ["Beef", "Black Beans", "Plantain"],
    description:
      "Venezuela's national dish: shredded beef, black beans, fried plantains and rice",
    ingredients: [
      { name: "beef flank steak", amount: "600g", prep: "Boil whole with onion, garlic, cumin 1.5 hrs until very tender, shred by hand" },
      { name: "black beans", amount: "400g dried", prep: "Soak overnight, boil 1.5 hrs until very soft — season at end" },
      { name: "white rice", amount: "400g", prep: "Cook in broth from beef for extra flavour" },
      { name: "ripe plantains", amount: "2", prep: "Must be very ripe (black skin) — slice diagonally, fry in oil until caramelised" },
      { name: "onion", amount: "2 large", prep: "Dice fine — soften in oil for both the beef sauce and beans" },
      { name: "red bell pepper", amount: "2", prep: "Dice fine — cook with onion as sofrito base" },
      { name: "garlic", amount: "6 cloves", prep: "Mince — add to sofrito" },
      { name: "tomatoes", amount: "3", prep: "Dice — cook into sofrito until sauce-like" },
      { name: "cumin", amount: "2 tsp", prep: "Season both beef sauce and beans" },
    ],
    steps: [
      {
        text: "Boil flank steak with aromatics 45 min, then shred into long strands",
        duration: 45,
        visualCues: ["tender beef", "shredding easily", "long strands"],
        checkpoints: ["shreds effortlessly"],
      },
      {
        text: "Simmer black beans with garlic, onion and seasoning until thick",
        duration: 20,
        visualCues: ["thick bean broth", "dark color"],
        checkpoints: ["beans thick"],
      },
      {
        text: "Sauté shredded beef with tomatoes and peppers until well seasoned",
        duration: 10,
        visualCues: ["seasoned beef", "tomato coating"],
        checkpoints: ["well sauced"],
      },
      {
        text: "Fry ripe plantain slices until golden and caramelized",
        duration: 6,
        visualCues: ["caramelized plantains", "golden edges"],
        checkpoints: ["deep golden"],
      },
      {
        text: "Plate all four components separately with rice central",
        duration: 2,
        visualCues: ["four components", "colorful plate"],
        checkpoints: ["all present"],
      },
    ],
  },
  {
    id: 69,
    region: "latin-america",
    name: "Mexican Pozole Rojo",
    image: "https://source.unsplash.com/800x600/?pozole+rojo+mexican+hominy+soup",
    time: "120 min",
    difficulty: "Medium",
    rating: 4.8,
    calories: 480,
    tags: ["Soup", "Pork", "Mexican"],
    description:
      "Hearty hominy and pork stew in guajillo broth with crunchy garnishes",
    ingredients: [
      { name: "hominy (dried maize/cacahuazintle)", amount: "500g", prep: "Soak overnight, cook 3–4 hrs until kernels bloom and open like flowers" },
      { name: "pork shoulder", amount: "1 kg", prep: "Cut into large chunks, simmer with hominy — pork should be falling apart" },
      { name: "dried guajillo chilies", amount: "8", prep: "Toast, soak 20 min, blend for red broth base" },
      { name: "dried ancho chilies", amount: "3", prep: "Toast, soak, blend with guajillo" },
      { name: "garlic", amount: "8 cloves", prep: "Half charred for broth, half raw for garnish" },
      { name: "onion", amount: "2 large", prep: "Half with pork for cooking, half raw diced for garnish table" },
      { name: "dried oregano (Mexican)", amount: "2 tsp", prep: "Crumble between fingers — add to chili sauce" },
      { name: "cabbage", amount: "1/2 head", prep: "Shred very fine — fresh garnish at table" },
      { name: "radishes", amount: "8", prep: "Slice thin — fresh garnish at table" },
      { name: "tostadas", amount: "8", prep: "Bake or fry tortillas until completely crispy — serve alongside" },
      { name: "limes", amount: "4", prep: "Cut wedges — squeeze at table" },
    ],
    steps: [
      {
        text: "Simmer pork in water with garlic and onion until very tender, 90 min",
        duration: 90,
        visualCues: ["tender pork", "good broth"],
        checkpoints: ["pork very tender"],
      },
      {
        text: "Toast and blend guajillo chilies into smooth sauce, strain",
        duration: 10,
        visualCues: ["dark red sauce", "strained smooth"],
        checkpoints: ["smooth chili sauce"],
      },
      {
        text: "Add hominy and chili sauce to broth, simmer 20 minutes",
        duration: 20,
        visualCues: ["red broth with hominy", "bloomed corn"],
        checkpoints: ["hominy bloomed", "broth red"],
      },
      {
        text: "Serve with shredded pork and garnishes: radish, cabbage, oregano, lime",
        duration: 3,
        visualCues: ["colorful garnishes", "complete bowl"],
        checkpoints: ["all garnishes"],
      },
    ],
  },
  {
    id: 70,
    region: "latin-america",
    name: "Dulce de Leche Churros",
    image: "https://source.unsplash.com/800x600/?churros+dulce+de+leche+latin+dessert",
    time: "25 min",
    difficulty: "Easy",
    rating: 4.8,
    calories: 420,
    tags: ["Dessert", "Fried", "Sweet"],
    description: "Buenos Aires churros filled with warm dulce de leche",
    ingredients: [
      { name: "water", amount: "250ml", prep: "Bring to boil with butter and salt" },
      { name: "all-purpose flour", amount: "150g", prep: "Sift — add all at once to boiling water" },
      { name: "butter", amount: "50g", prep: "Add to water before boiling" },
      { name: "eggs", amount: "2", prep: "Beat in one at a time after dough cools — dough should fall slowly from spoon" },
      { name: "dulce de leche", amount: "400g (1 tin)", prep: "Warm gently in pan to dipping consistency — or boil unopened condensed milk tin 3 hrs" },
      { name: "oil", amount: "for deep frying", prep: "Heat to 180°C — use thermometer for consistent results" },
      { name: "cinnamon sugar", amount: "150g sugar + 2 tbsp cinnamon", prep: "Spread on tray — roll hot churros immediately" },
    ],
    steps: [
      {
        text: "Make choux dough: boil water with oil and salt, add flour and beat smooth",
        duration: 5,
        visualCues: ["thick smooth dough", "pulling from pan"],
        checkpoints: ["smooth and thick"],
      },
      {
        text: "Pipe long straight churros into hot oil, fry until deep golden",
        duration: 6,
        visualCues: ["long churros", "golden color", "ridged texture"],
        checkpoints: ["deep golden"],
      },
      {
        text: "Drain, roll in cinnamon-sugar immediately",
        duration: 2,
        visualCues: ["sugar-coated", "glistening"],
        checkpoints: ["evenly coated"],
      },
      {
        text: "Fill with warm dulce de leche using piping bag",
        duration: 3,
        visualCues: ["dulce oozing", "caramel inside"],
        checkpoints: ["filled center", "warm"],
      },
    ],
  },

  // NORTH AFRICA
  {
    id: 71,
    region: "north-africa",
    name: "Moroccan Lamb Tagine",
    image: "https://source.unsplash.com/800x600/?moroccan+lamb+tagine+clay+pot",
    time: "120 min",
    difficulty: "Medium",
    rating: 4.9,
    calories: 560,
    tags: ["Lamb", "Moroccan", "Slow-cooked"],
    description:
      "Slow-cooked lamb with preserved lemon, olives, and Ras el Hanout",
    ingredients: [
      { name: "bone-in lamb shoulder", amount: "1.2 kg", prep: "Cut into large chunks, rub with spice mix, rest 30 min minimum" },
      { name: "preserved lemons", amount: "2", prep: "Rinse salt off, scrape out flesh, slice peel into strips — add at start and end" },
      { name: "Moroccan spice mix (ras el hanout)", amount: "3 tbsp", prep: "Toast whole spices, grind fresh — or use quality pre-mixed" },
      { name: "onion", amount: "3 medium", prep: "Grate 2 into tagine base, slice 1 for texture" },
      { name: "garlic", amount: "6 cloves", prep: "Mince into spice paste with ginger" },
      { name: "ginger", amount: "40g", prep: "Grate fresh into spice paste" },
      { name: "saffron", amount: "generous pinch", prep: "Dissolve in warm water — add to tagine" },
      { name: "green olives", amount: "150g", prep: "Rinse, add in last 20 min of cooking" },
      { name: "cilantro", amount: "large bunch", prep: "Stems cook with tagine, leaves torn over at serving" },
      { name: "flat-leaf parsley", amount: "bunch", prep: "Stems cook in, leaves torn fresh at end" },
      { name: "honey", amount: "2 tbsp", prep: "Drizzle in last 10 min for sweet-savoury balance" },
    ],
    steps: [
      {
        text: "Mix your spice paste: combine 3 tablespoons of ras el hanout, 2 teaspoons of ground cumin, 1 teaspoon of turmeric, a generous pinch of saffron dissolved in warm water, 6 minced garlic cloves, and 40g of grated fresh ginger. Rub this paste thoroughly into 1.2 kg of bone-in lamb shoulder pieces. Leave for at least 1 hour — overnight is better.",
        duration: 10,
        visualCues: ["spice-coated lamb", "golden saffron colour"],
        checkpoints: ["every surface coated", "resting 1 hour minimum"],
      },
      {
        text: "Heat 3 tablespoons of olive oil in the base of a tagine or wide heavy pan. Add 3 grated onions and cook for 10 minutes until softened and just beginning to colour. Add the marinated lamb and brown on all sides over high heat — 3–4 minutes per side. You want colour on the meat.",
        duration: 18,
        visualCues: ["browned lamb", "golden onion base"],
        checkpoints: ["lamb browned on all sides", "onions soft and beginning to colour"],
      },
      {
        text: "Add 1 tin of crushed tomatoes, 200ml of water, and 2 strips of preserved lemon peel (rinsed, flesh removed). Add the lamb back in. Bring to a simmer, then cover tightly — if using a tagine, the conical lid creates a circular condensation system that bastes the meat continuously. Cook on the lowest possible heat for 1.5 hours.",
        duration: 92,
        visualCues: ["simmering in tagine", "steam cycling under lid"],
        checkpoints: ["very gentle simmer", "lamb beginning to tender"],
      },
      {
        text: "In the final 20 minutes, add 150g of rinsed green olives, 2 tablespoons of honey, and the remaining preserved lemon strips. Taste the sauce — it should be complex with floral, sour, sweet, and spicy notes all present. If too sharp, add more honey; if too sweet, add more lemon. The lamb should be completely tender and pulling away from the bone.",
        duration: 22,
        visualCues: ["glossy sauce", "lamb falling from bone"],
        checkpoints: ["lamb falling from bone", "sauce thickened and glossy"],
      },
      {
        text: "Tear a large handful each of cilantro and flat-leaf parsley. Scatter over the tagine just before serving — they wilt slightly in the steam and perfume the entire dish. Serve directly at the table with warm flatbread or couscous. The sauce should be abundant — it is meant to soak into the bread.",
        duration: 3,
        visualCues: ["herb-scattered tagine", "abundant glossy sauce"],
        checkpoints: ["herbs scattered", "abundant sauce for bread"],
      },
    ],
  },
  {
    id: 72,
    region: "north-africa",
    name: "Egyptian Koshari",
    image: "https://source.unsplash.com/800x600/?koshari+egyptian+rice+lentils",
    time: "45 min",
    difficulty: "Medium",
    rating: 4.7,
    calories: 520,
    tags: ["Vegan", "Street Food"],
    description:
      "Cairo's beloved street food: lentils, rice, macaroni and spiced tomato sauce",
    ingredients: [
      { name: "brown lentils", amount: "200g", prep: "Pick over, rinse, cook in water until just tender — do not overcook" },
      { name: "long-grain rice", amount: "300g", prep: "Rinse until clear, par-cook separately" },
      { name: "pasta (ditalini or elbows)", amount: "200g", prep: "Cook separately in well-salted water, drain" },
      { name: "onions", amount: "4 large", prep: "Slice very thin — deep fry in batches until very dark and crispy (crispy fried onions are the star)" },
      { name: "crushed tomatoes", amount: "2 x 400g cans", prep: "Cook down with garlic, vinegar, cumin into thick tomato sauce" },
      { name: "garlic", amount: "8 cloves", prep: "Mince 4 into tomato sauce, fry 4 in oil for garlic vinegar sauce" },
      { name: "white wine vinegar", amount: "4 tbsp", prep: "Add to tomato sauce and garlic sauce" },
      { name: "cumin", amount: "2 tsp", prep: "Toast and grind — season tomato sauce" },
      { name: "coriander", amount: "1 tsp", prep: "Add to tomato sauce" },
      { name: "hot sauce (shatta)", amount: "to serve", prep: "Blend roasted red chilies, garlic, vinegar — serve on side" },
    ],
    steps: [
      {
        text: "Cook lentils, rice and macaroni separately in salted water",
        duration: 25,
        visualCues: ["three separate pots", "each cooked"],
        checkpoints: ["each properly cooked"],
      },
      {
        text: "Deep fry sliced onions until very dark and crispy",
        duration: 20,
        visualCues: ["very dark onions", "crispy texture"],
        checkpoints: ["very dark crispy"],
      },
      {
        text: "Make spiced tomato sauce with garlic, cumin, coriander, cayenne",
        duration: 15,
        visualCues: ["spiced red sauce", "thick"],
        checkpoints: ["thick sauce"],
      },
      {
        text: "Make dakka: garlic, cumin, vinegar and salt",
        duration: 3,
        visualCues: ["tangy sauce", "garlic pieces"],
        checkpoints: ["balanced tang"],
      },
      {
        text: "Layer: lentil rice, macaroni, chickpeas, tomato sauce, crispy onions",
        duration: 3,
        visualCues: ["layered bowl", "crispy top"],
        checkpoints: ["all layers visible"],
      },
    ],
  },
  {
    id: 73,
    region: "north-africa",
    name: "Tunisian Brik",
    image: "https://source.unsplash.com/800x600/?brik+tunisian+egg+pastry",
    time: "15 min",
    difficulty: "Easy",
    rating: 4.7,
    calories: 320,
    tags: ["Pastry", "Egg", "Street Food"],
    description:
      "Crispy fried pastry triangle with egg, tuna, capers and harissa",
    ingredients: [
      { name: "malsouka or brick pastry sheets", amount: "4 large", prep: "Handle carefully — tears easily, keep covered with damp cloth" },
      { name: "eggs", amount: "4", prep: "One per brik — crack very carefully into the folded pastry so yolk stays whole" },
      { name: "canned tuna", amount: "1 can (160g)", prep: "Drain well, break into flakes" },
      { name: "capers", amount: "2 tbsp", prep: "Drain and roughly chop" },
      { name: "fresh parsley", amount: "handful", prep: "Mince fine — mix into filling" },
      { name: "harissa", amount: "2 tsp", prep: "Mix into filling for heat" },
      { name: "onion", amount: "1 small", prep: "Mince very fine, cook in oil until soft, cool completely before filling" },
      { name: "lemon", amount: "1", prep: "Squeeze over fried brik at serving" },
      { name: "oil", amount: "for shallow frying", prep: "Medium-high heat — brik fries in 1–2 min per side" },
    ],
    steps: [
      {
        text: "Mix tuna with capers, parsley, and small amount of harissa",
        duration: 2,
        visualCues: ["tuna mixture", "capers visible"],
        checkpoints: ["well mixed", "not too wet"],
      },
      {
        text: "Place filling off-center, make well for egg",
        duration: 2,
        visualCues: ["filling placed", "well for egg"],
        checkpoints: ["ready for egg"],
      },
      {
        text: "Crack egg into well without breaking yolk, fold and seal quickly",
        duration: 1,
        visualCues: ["intact yolk", "sealed triangle"],
        checkpoints: ["yolk intact", "fully sealed"],
      },
      {
        text: "Deep fry in hot oil until golden with runny yolk inside",
        duration: 3,
        visualCues: ["golden triangle", "crispy pastry"],
        checkpoints: ["golden and crispy"],
      },
    ],
  },
  {
    id: 74,
    region: "north-africa",
    name: "Moroccan Bastilla",
    image: "https://source.unsplash.com/800x600/?bastilla+moroccan+pigeon+pie",
    time: "90 min",
    difficulty: "Hard",
    rating: 4.8,
    calories: 540,
    tags: ["Pastry", "Chicken", "Sweet-Savory"],
    description: "Pigeon pie in warqa pastry with almonds and cinnamon sugar",
    ingredients: [
      { name: "chicken (or pigeon) pieces", amount: "1 kg", prep: "Braise in spiced onion sauce until very tender, shred meat from bones" },
      { name: "eggs", amount: "6", prep: "Scramble into braising sauce after removing chicken — forms creamy egg layer" },
      { name: "onion", amount: "3 large", prep: "Slice thin, cook down 30 min in spiced butter until very soft" },
      { name: "blanched almonds", amount: "200g", prep: "Deep fry until golden, drain, blend with sugar and cinnamon into almond layer" },
      { name: "phyllo or warqa pastry", amount: "20 sheets", prep: "Work quickly — brush each sheet with smen (Moroccan butter)" },
      { name: "smen or clarified butter", amount: "150g", prep: "Melt and use to brush every pastry layer" },
      { name: "ras el hanout", amount: "2 tsp", prep: "Toast and add to chicken braising liquid" },
      { name: "cinnamon", amount: "2 tsp", prep: "Mix with almonds and sugar for sweet layer, also season chicken" },
      { name: "powdered sugar", amount: "4 tbsp", prep: "Dust generously on top with cinnamon — savoury-sweet contrast" },
      { name: "saffron", amount: "generous pinch", prep: "Dissolve in warm water, add to chicken braise for colour" },
    ],
    steps: [
      {
        text: "Slow cook chicken in spiced broth until very tender",
        duration: 45,
        visualCues: ["tender chicken", "fragrant broth"],
        checkpoints: ["shreds easily"],
      },
      {
        text: "Shred chicken, scramble eggs into reduced sauce",
        duration: 10,
        visualCues: ["shredded chicken", "thick filling"],
        checkpoints: ["filling thick"],
      },
      {
        text: "Fry almonds golden, grind with cinnamon and sugar",
        duration: 5,
        visualCues: ["golden almonds", "fragrant"],
        checkpoints: ["almonds golden"],
      },
      {
        text: "Layer buttered warqa, meat filling, almond layer, seal with more pastry",
        duration: 15,
        visualCues: ["layered pie", "sealed"],
        checkpoints: ["layers even"],
      },
      {
        text: "Bake until golden, dust with powdered sugar and cinnamon pattern",
        duration: 20,
        visualCues: ["golden crust", "sugar pattern"],
        checkpoints: ["golden crust", "beautiful pattern"],
      },
    ],
  },
  {
    id: 75,
    region: "north-africa",
    name: "Algerian Chorba",
    image: "https://source.unsplash.com/800x600/?chorba+algerian+soup+lamb",
    time: "45 min",
    difficulty: "Easy",
    rating: 4.6,
    calories: 380,
    tags: ["Soup", "Lamb", "Ramadan"],
    description: "Fragrant Ramadan lamb soup with chickpeas and coriander",
    ingredients: [
      { name: "lamb shoulder", amount: "600g", prep: "Cut small chunks, brown in oil before adding water" },
      { name: "chickpeas", amount: "200g", prep: "Soak overnight — or use canned, rinsed" },
      { name: "vermicelli pasta", amount: "100g", prep: "Add in last 8 min — it cooks quickly" },
      { name: "tomatoes", amount: "4", prep: "Grate on box grater, discarding skins" },
      { name: "celery with leaves", amount: "3 stalks", prep: "Slice stalks, reserve leaves for garnish" },
      { name: "onion", amount: "2", prep: "Dice fine — cook with lamb" },
      { name: "ras el hanout", amount: "2 tsp", prep: "Toast and grind fresh" },
      { name: "fresh cilantro and mint", amount: "large bunch each", prep: "Stems into soup, leaves at serving" },
      { name: "lemon", amount: "2", prep: "Juice — squeeze at table" },
    ],
    steps: [
      {
        text: "Brown lamb, add diced tomatoes and onions, cook 10 minutes",
        duration: 10,
        visualCues: ["browned lamb", "tomatoes softening"],
        checkpoints: ["lamb seared", "tomatoes broken down"],
      },
      {
        text: "Add chickpeas, broth, ras el hanout — simmer 30 minutes",
        duration: 30,
        visualCues: ["chickpeas in broth", "simmering"],
        checkpoints: ["chickpeas tender"],
      },
      {
        text: "Add vermicelli and celery in final 5 minutes",
        duration: 5,
        visualCues: ["pasta in soup", "vermicelli softening"],
        checkpoints: ["pasta cooked"],
      },
      {
        text: "Finish with fresh coriander and lemon juice",
        duration: 1,
        visualCues: ["herb garnish", "bright finish"],
        checkpoints: ["fresh herbs added"],
      },
    ],
  },
  {
    id: 76,
    region: "north-africa",
    name: "Moroccan Harira",
    image: "https://source.unsplash.com/800x600/?harira+moroccan+tomato+soup+lentils",
    time: "60 min",
    difficulty: "Medium",
    rating: 4.8,
    calories: 380,
    tags: ["Soup", "Legumes", "Ramadan"],
    description:
      "Traditional Moroccan soup with lentils, chickpeas, tomatoes and cinnamon",
    ingredients: [
      { name: "lamb chunks", amount: "300g", prep: "Small pieces — or skip for vegetarian version" },
      { name: "dried chickpeas", amount: "150g", prep: "Soak overnight — they should be tender after long simmering" },
      { name: "green lentils", amount: "100g", prep: "Rinse, no soaking required" },
      { name: "tomatoes", amount: "500g", prep: "Blend smooth — or use passata" },
      { name: "onion", amount: "2 large", prep: "Grate on box grater — nearly dissolves into soup" },
      { name: "celery", amount: "3 stalks with leaves", prep: "Mince fine" },
      { name: "fresh cilantro", amount: "large bunch", prep: "Chop with parsley — add half at start, half at end" },
      { name: "flat-leaf parsley", amount: "large bunch", prep: "Chop with cilantro" },
      { name: "flour or cornstarch", amount: "3 tbsp", prep: "Make slurry with cold water — stir in to thicken (tadouira)" },
      { name: "lemon", amount: "2", prep: "Squeeze into soup at end for brightness" },
      { name: "smen (Moroccan butter)", amount: "2 tbsp", prep: "Stir in at end — distinctive sour-butter flavour" },
    ],
    steps: [
      {
        text: "Simmer lamb with tomatoes, celery, onion and spices 30 minutes",
        duration: 30,
        visualCues: ["simmering broth", "lamb visible"],
        checkpoints: ["lamb tender"],
      },
      {
        text: "Add lentils and chickpeas, cook 20 more minutes",
        duration: 20,
        visualCues: ["lentils in soup", "thickening"],
        checkpoints: ["lentils tender", "chickpeas soft"],
      },
      {
        text: "Whisk flour with water, stir in gradually to thicken",
        duration: 5,
        visualCues: ["soup thickening", "smooth"],
        checkpoints: ["well thickened"],
      },
      {
        text: "Add fresh herbs and lemon juice, serve",
        duration: 2,
        visualCues: ["herb garnish", "lemon"],
        checkpoints: ["fresh herbs"],
      },
    ],
  },
  {
    id: 77,
    region: "north-africa",
    name: "Egyptian Ful Medames",
    image: "https://source.unsplash.com/800x600/?ful+medames+egyptian+fava+beans",
    time: "20 min",
    difficulty: "Easy",
    rating: 4.6,
    calories: 290,
    tags: ["Beans", "Breakfast", "Vegan"],
    description: "Cairo's beloved breakfast of fava beans with lemon and cumin",
    ingredients: [
      { name: "dried fava beans (ful)", amount: "400g", prep: "Soak overnight — or use canned, they save hours" },
      { name: "garlic", amount: "8 cloves", prep: "Mash half to paste for cooking, slice half for topping" },
      { name: "lemon", amount: "3", prep: "Juice generously — very important acid balance" },
      { name: "extra virgin olive oil", amount: "6 tbsp", prep: "Drizzle over finished dish generously" },
      { name: "cumin", amount: "2 tsp", prep: "Toast whole seeds, grind — half cooked in, half sprinkled over" },
      { name: "parsley", amount: "large bunch", prep: "Mince fine — scatter generously on top" },
      { name: "tomatoes", amount: "3", prep: "Dice small — garnish on top" },
      { name: "boiled eggs", amount: "2 per person", prep: "Boil 8 min for jammy yolk — peel and halve" },
      { name: "chili flakes", amount: "1 tsp", prep: "Sprinkle over as garnish" },
    ],
    steps: [
      {
        text: "Warm fava beans in pan with water until heated through",
        duration: 5,
        visualCues: ["warm beans", "steaming"],
        checkpoints: ["beans heated"],
      },
      {
        text: "Mash roughly — some whole beans, some broken",
        duration: 2,
        visualCues: ["chunky texture", "some whole beans"],
        checkpoints: ["chunky not smooth"],
      },
      {
        text: "Season with cumin, garlic, salt, generous lemon juice",
        duration: 2,
        visualCues: ["seasoned beans", "bright lemon"],
        checkpoints: ["well seasoned"],
      },
      {
        text: "Serve with olive oil, tomato, egg and fresh bread",
        duration: 2,
        visualCues: ["oil drizzle", "egg quartered", "bread beside"],
        checkpoints: ["beautiful presentation"],
      },
    ],
  },
  {
    id: 78,
    region: "north-africa",
    name: "Tunisian Merguez Couscous",
    image: "https://source.unsplash.com/800x600/?couscous+merguez+tunisian",
    time: "45 min",
    difficulty: "Medium",
    rating: 4.7,
    calories: 580,
    tags: ["Couscous", "Sausage"],
    description:
      "Fragrant steamed couscous with harissa-spiced merguez sausages",
    ingredients: [
      { name: "merguez sausage", amount: "500g", prep: "Grill on high heat — skin should blister and char" },
      { name: "couscous (medium grain)", amount: "400g", prep: "Pour boiling salted water (1:1.2 ratio), cover 5 min, fluff with fork, steam over stew" },
      { name: "chickpeas", amount: "400g canned", prep: "Rinse well, add to vegetable broth" },
      { name: "turnips", amount: "2", prep: "Peel and quarter — add to broth" },
      { name: "carrots", amount: "3", prep: "Large chunks — add to broth" },
      { name: "zucchini", amount: "2", prep: "Halve lengthwise — add in last 15 min" },
      { name: "harissa paste", amount: "3 tbsp", prep: "Dissolve in ladle of broth — serve on side so guests adjust heat" },
      { name: "tomato paste", amount: "3 tbsp", prep: "Add to broth with harissa" },
      { name: "ras el hanout", amount: "2 tsp", prep: "Toast and stir into broth" },
      { name: "butter", amount: "50g", prep: "Toss into finished couscous for richness" },
    ],
    steps: [
      {
        text: "Brown merguez sausages on all sides until cooked through",
        duration: 8,
        visualCues: ["browned sausages", "char marks"],
        checkpoints: ["cooked through"],
      },
      {
        text: "Make stew: onions, tomato paste, harissa, vegetables, broth",
        duration: 20,
        visualCues: ["red spiced broth", "vegetables softening"],
        checkpoints: ["vegetables tender"],
      },
      {
        text: "Steam couscous until fluffy, fluff with fork and butter",
        duration: 10,
        visualCues: ["fluffy couscous", "separate grains"],
        checkpoints: ["fluffy, separate"],
      },
      {
        text: "Serve couscous with broth poured over and sausages on top",
        duration: 2,
        visualCues: ["complete dish", "broth absorbed"],
        checkpoints: ["beautifully plated"],
      },
    ],
  },
  {
    id: 79,
    region: "north-africa",
    name: "Libyan Sharba",
    image: "https://source.unsplash.com/800x600/?sharba+libyan+lamb+soup",
    time: "40 min",
    difficulty: "Easy",
    rating: 4.5,
    calories: 350,
    tags: ["Soup", "Lamb", "Traditional"],
    description: "Spiced tomato lamb soup with orzo, turmeric, and fresh mint",
    ingredients: [
      { name: "lamb shoulder", amount: "500g", prep: "Cut small, brown on all sides" },
      { name: "orzo or rice", amount: "100g", prep: "Add in last 15 min of cooking" },
      { name: "tomato paste", amount: "4 tbsp", prep: "Fry in oil 2 min until darkened" },
      { name: "onion", amount: "2 large", prep: "Grate — dissolves into base" },
      { name: "garlic", amount: "6 cloves", prep: "Mince fine" },
      { name: "turmeric", amount: "2 tsp", prep: "Fry with onion at start" },
      { name: "cinnamon", amount: "1 tsp", prep: "Add to spice base" },
      { name: "cilantro", amount: "bunch", prep: "Chop, add half at start, half at end" },
      { name: "lemon", amount: "1", prep: "Squeeze at serving" },
    ],
    steps: [
      {
        text: "Sauté onions until golden, add lamb and brown briefly",
        duration: 8,
        visualCues: ["golden onions", "browned lamb"],
        checkpoints: ["lamb seared"],
      },
      {
        text: "Add tomatoes, turmeric, cumin, water — simmer 25 minutes",
        duration: 25,
        visualCues: ["orange broth", "lamb tendering"],
        checkpoints: ["lamb tender"],
      },
      {
        text: "Add orzo, cook until just al dente",
        duration: 8,
        visualCues: ["orzo in soup", "swelling pasta"],
        checkpoints: ["orzo al dente"],
      },
      {
        text: "Finish with mint and lemon juice, serve hot",
        duration: 1,
        visualCues: ["mint added", "bright finish"],
        checkpoints: ["fresh mint"],
      },
    ],
  },
  {
    id: 80,
    region: "north-africa",
    name: "Moroccan Chicken Pastilla",
    image: "https://source.unsplash.com/800x600/?chicken+pastilla+moroccan+pie",
    time: "70 min",
    difficulty: "Hard",
    rating: 4.8,
    calories: 490,
    tags: ["Chicken", "Pastry"],
    description:
      "Individual phyllo parcels with chicken, eggs, almonds and cinnamon sugar",
    ingredients: [
      { name: "chicken thighs", amount: "1 kg", prep: "Braise in spiced onion-saffron sauce until falling off bone, shred finely" },
      { name: "eggs", amount: "5", prep: "Scramble directly into reduced braising sauce after removing chicken — fold to create creamy egg filling" },
      { name: "onion", amount: "4 large", prep: "Slice thin, cook down 30 min in butter with all spices until caramelised" },
      { name: "blanched almonds", amount: "200g", prep: "Toast in oven until golden, pulse with cinnamon and sugar for almond layer" },
      { name: "phyllo pastry", amount: "16 sheets", prep: "Keep covered — brush each layer with melted smen or butter" },
      { name: "smen or butter", amount: "150g", prep: "Melt for brushing pastry layers" },
      { name: "saffron", amount: "pinch", prep: "Dissolve in warm water, add to braising liquid" },
      { name: "ginger", amount: "1 tsp ground", prep: "Add to spice mix for chicken" },
      { name: "cinnamon", amount: "2 tsp", prep: "Half in chicken, half in almond layer and top dusting" },
      { name: "powdered sugar", amount: "3 tbsp", prep: "Dust top with cinnamon in zigzag pattern" },
    ],
    steps: [
      {
        text: "Poach chicken in spiced broth until tender, shred finely",
        duration: 30,
        visualCues: ["tender chicken", "fine shreds"],
        checkpoints: ["fine shreds"],
      },
      {
        text: "Reduce broth, scramble in beaten eggs to thicken filling",
        duration: 5,
        visualCues: ["thick filling", "eggs in sauce"],
        checkpoints: ["filling thick"],
      },
      {
        text: "Toast almonds, grind with cinnamon and sugar",
        duration: 5,
        visualCues: ["golden almonds", "fragrant"],
        checkpoints: ["almonds golden"],
      },
      {
        text: "Layer buttered phyllo, add chicken filling, almond layer, fold into parcels",
        duration: 15,
        visualCues: ["sealed parcels", "compact shape"],
        checkpoints: ["sealed well"],
      },
      {
        text: "Bake until golden, dust with cinnamon sugar geometric pattern",
        duration: 20,
        visualCues: ["golden parcels", "sugar pattern"],
        checkpoints: ["golden", "sugar dusted"],
      },
    ],
  },

  // SUB-SAHARAN AFRICA
  {
    id: 81,
    region: "sub-saharan",
    name: "Injera with Doro Wat",
    image: "https://source.unsplash.com/800x600/?injera+doro+wat+ethiopian+chicken",
    time: "120 min",
    difficulty: "Hard",
    rating: 4.9,
    calories: 520,
    tags: ["Chicken", "Ethiopian"],
    description:
      "Spiced chicken stew in berbere sauce served on fermented teff flatbread",
    ingredients: [
      { name: "teff flour", amount: "500g", prep: "Mix with water, ferment at room temperature 2–3 days until sour and bubbly" },
      { name: "chicken thighs (bone-in)", amount: "1 kg", prep: "Score deeply with knife, marinate in lemon juice and salt 30 min" },
      { name: "hard-boiled eggs", amount: "6", prep: "Boil 10 min, peel, pierce all over with fork so sauce penetrates" },
      { name: "red onions", amount: "5 large", prep: "Grate or process fine — dry-fry (without oil) stirring constantly 20 min until very dark and dry" },
      { name: "berbere spice blend", amount: "6 tbsp", prep: "Toast whole spices, grind fresh — berbere is the foundation of doro wat" },
      { name: "niter kibbeh (spiced clarified butter)", amount: "100g", prep: "Infuse ghee with onion, garlic, ginger, cardamom, turmeric — strain and use" },
      { name: "garlic", amount: "8 cloves", prep: "Mince — add after onion is dry-fried" },
      { name: "ginger", amount: "50g", prep: "Grate fine — add with garlic" },
    ],
    steps: [
      {
        text: "Dry-fry very finely chopped onions 20 minutes until very dark and reduced",
        duration: 20,
        visualCues: [
          "very dark onions",
          "reduced to 1/4 volume",
          "dry texture",
        ],
        checkpoints: ["very dark", "dry not oily"],
      },
      {
        text: "Add niter kibbeh and berbere, cook 10 minutes until deep red",
        duration: 10,
        visualCues: ["deep red sauce", "very fragrant"],
        checkpoints: ["very fragrant", "deep red"],
      },
      {
        text: "Add chicken, coat well, add water and simmer 45 minutes",
        duration: 45,
        visualCues: ["chicken in red sauce", "sauce thickening"],
        checkpoints: ["chicken fully cooked"],
      },
      {
        text: "Add scored hard-boiled eggs in final 10 minutes",
        duration: 10,
        visualCues: ["eggs in sauce", "colored by sauce"],
        checkpoints: ["eggs colored"],
      },
      {
        text: "Serve on injera with multiple stews",
        duration: 2,
        visualCues: ["communal spread", "injera base", "colorful stews"],
        checkpoints: ["beautiful presentation"],
      },
    ],
  },
  {
    id: 82,
    region: "sub-saharan",
    name: "West African Jollof Rice",
    image: "https://source.unsplash.com/800x600/?jollof+rice+west+african",
    time: "60 min",
    difficulty: "Medium",
    rating: 4.9,
    calories: 480,
    tags: ["Rice", "Nigerian", "One-pot"],
    description:
      "Legendary one-pot tomato rice with scotch bonnet and smoky crust",
    ingredients: [
      { name: "long-grain parboiled rice", amount: "3 cups", prep: "Rinse once only — parboiled needs less washing, holds shape better" },
      { name: "ripe tomatoes", amount: "6 large", prep: "Blend smooth with bell pepper and Scotch bonnet — this is the base" },
      { name: "red bell pepper", amount: "2", prep: "Blend with tomatoes" },
      { name: "Scotch bonnet pepper", amount: "1–2", prep: "Blend with tomatoes — adjust for heat tolerance" },
      { name: "onion", amount: "3 large", prep: "Blend half into sauce, slice other half and fry until golden" },
      { name: "chicken or beef stock", amount: "500ml", prep: "Add to blended tomato base — rice absorbs both" },
      { name: "tomato paste", amount: "3 tbsp", prep: "Fry in oil 3 min before adding blended tomatoes" },
      { name: "bay leaves", amount: "3", prep: "Add to rice while cooking" },
      { name: "thyme", amount: "2 tsp dried", prep: "Add to tomato base" },
      { name: "curry powder (optional)", amount: "1 tsp", prep: "West African addition — adds earthiness" },
      { name: "foil", amount: "for sealing", prep: "Cover pot tightly with foil before lid — traps steam for party jollof smoky bottom" },
    ],
    steps: [
      {
        text: "Blend 6 large ripe tomatoes, 2 red bell peppers, 1–2 Scotch bonnet peppers (to taste), and 2 onions (half of the total) into a completely smooth purée. This is the base of all jollof. Pour into a wide, heavy pot with 3 tablespoons of oil and cook over high heat for 20 minutes, stirring frequently, until the purée reduces by half and the raw tomato smell transforms to a rich, concentrated tomato fragrance.",
        duration: 25,
        visualCues: ["reduced tomato base", "colour deepened"],
        checkpoints: ["reduced by half", "colour deepened to orange-red", "raw tomato smell gone"],
      },
      {
        text: "Add 3 tablespoons of tomato paste and fry in the reduced sauce for 3 more minutes. Add 500ml of chicken stock, 3 bay leaves, 2 teaspoons of dried thyme, and season generously with salt. Bring to a boil. Taste the liquid carefully — it must be noticeably over-seasoned at this point because the rice will absorb the salt.",
        duration: 6,
        visualCues: ["deep red cooking liquid", "stock incorporated"],
        checkpoints: ["over-seasoned to account for rice absorption", "liquid level correct"],
      },
      {
        text: "Rinse 3 cups of parboiled long-grain rice once only and add to the boiling tomato stock. Stir once to combine, then place a tight-fitting lid on the pot. Cook over medium-high heat for 5 minutes, then reduce to the lowest heat and cook for 20 more minutes. Do not lift the lid during this time.",
        duration: 27,
        visualCues: ["rice absorbing liquid", "steam escaping edges"],
        checkpoints: ["lid tight", "DO NOT LIFT LID", "low heat maintained"],
      },
      {
        text: "After 20 minutes, lift the lid quickly — if all the liquid has absorbed and the rice looks dry, place a sheet of foil over the pot before replacing the lid and cook for 5 more minutes on the lowest heat. This creates 'party jollof' — the prized slightly smoky, caramelised bottom called 'party rice'. You're listening for a very subtle crackling sound.",
        duration: 7,
        visualCues: ["dry rice surface", "crackling sound", "steam building"],
        checkpoints: ["liquid absorbed", "crackling sound audible", "smoky aroma developing"],
      },
      {
        text: "Fluff the rice gently with a fork, scraping up the caramelised bottom (it's the most fought over part). Add the remaining sliced fried onions. Serve immediately with fried plantains, grilled chicken, or braised beef. Jollof rice is never served alone — it is always the accompaniment to a celebration.",
        duration: 5,
        visualCues: ["orange-stained fluffy rice", "caramelised bottom scraped up"],
        checkpoints: ["fluffy and separated", "some caramelised bottom incorporated"],
      },
    ],
  },
  {
    id: 83,
    region: "sub-saharan",
    name: "South African Bunny Chow",
    image: "https://source.unsplash.com/800x600/?bunny+chow+south+african+curry+bread",
    time: "45 min",
    difficulty: "Easy",
    rating: 4.7,
    calories: 640,
    tags: ["Curry", "Bread", "Street Food"],
    description:
      "Durban curry in a hollowed bread loaf — the ultimate street food",
    ingredients: [
      { name: "white bread loaf (unsliced)", amount: "1 large", prep: "Cut loaf in half or quarters, hollow out inside leaving 2cm walls — reserve bread lid" },
      { name: "chicken thighs (bone-in)", amount: "1 kg", prep: "Cut into large pieces — bone-in essential for flavour" },
      { name: "onion", amount: "3 large", prep: "Dice fine, fry until deep golden — 15 min" },
      { name: "fresh tomatoes", amount: "4", prep: "Dice — cook until broken down" },
      { name: "garlic", amount: "5 cloves", prep: "Mince fine" },
      { name: "ginger", amount: "30g", prep: "Grate fine — equal to garlic" },
      { name: "curry powder (Durban style)", amount: "4 tbsp", prep: "Fry in oil 1 min after onion and tomato — blooms spices" },
      { name: "potatoes", amount: "3 medium", prep: "Cube 2cm — absorb curry sauce and thicken naturally" },
      { name: "fresh curry leaves", amount: "10 leaves", prep: "Add with garlic — essential for Durban curry flavour" },
      { name: "coconut milk (optional)", amount: "200ml", prep: "Adds creaminess — stir in at end" },
    ],
    steps: [
      {
        text: "Make Durban curry: sauté onions, garlic, ginger with curry leaves and spices",
        duration: 8,
        visualCues: ["fragrant masala", "curry leaf aroma"],
        checkpoints: ["fragrant", "onions golden"],
      },
      {
        text: "Add meat or beans with tomatoes, cook until tender and thick",
        duration: 25,
        visualCues: ["thick curry", "tender meat"],
        checkpoints: ["meat tender", "thick sauce"],
      },
      {
        text: "Hollow quarter loaf from top, keep bread lid",
        duration: 3,
        visualCues: ["hollowed bread", "walls intact"],
        checkpoints: ["cavity made"],
      },
      {
        text: "Fill cavity with curry, place bread lid on top",
        duration: 2,
        visualCues: ["curry filling bread", "sauce soaking in"],
        checkpoints: ["well filled"],
      },
    ],
  },
  {
    id: 84,
    region: "sub-saharan",
    name: "Ghanaian Groundnut Soup",
    image: "https://source.unsplash.com/800x600/?groundnut+soup+ghanaian+peanut",
    time: "60 min",
    difficulty: "Medium",
    rating: 4.7,
    calories: 520,
    tags: ["Peanut", "Chicken", "Stew"],
    description: "Rich peanut-based stew with chicken and scotch bonnet",
    ingredients: [
      { name: "chicken pieces", amount: "1.5 kg", prep: "Season with salt, fry until golden — reserve frying oil for soup base" },
      { name: "raw groundnuts (peanuts)", amount: "400g", prep: "Roast in oven 15 min until golden, blend with water into smooth paste" },
      { name: "tomatoes", amount: "500g", prep: "Blend smooth with onion and peppers" },
      { name: "onion", amount: "3 large", prep: "Blend half into tomato base, chop half for frying" },
      { name: "scotch bonnet peppers", amount: "2–3", prep: "Blend into tomato base — adjust for heat" },
      { name: "tomato paste", amount: "3 tbsp", prep: "Fry in oil before adding blended tomatoes" },
      { name: "garlic", amount: "4 cloves", prep: "Blend with tomatoes" },
      { name: "ground crayfish", amount: "2 tbsp", prep: "Add to soup — traditional umami seasoning" },
      { name: "smoked fish", amount: "200g", prep: "Flake, removing bones — adds smoky depth" },
    ],
    steps: [
      {
        text: "Season and brown chicken pieces until golden",
        duration: 10,
        visualCues: ["golden chicken", "crispy skin"],
        checkpoints: ["golden all over"],
      },
      {
        text: "Blend tomatoes, scotch bonnet, onion — fry 15 minutes until oil separates",
        duration: 15,
        visualCues: ["deep red paste", "oil separating"],
        checkpoints: ["oil separating"],
      },
      {
        text: "Whisk peanut butter with hot water, add to tomato base",
        duration: 5,
        visualCues: ["orange-red color", "thick base"],
        checkpoints: ["smooth integration"],
      },
      {
        text: "Add chicken, simmer 30 minutes until oil rises and sauce is very rich",
        duration: 30,
        visualCues: ["oil at surface", "rich thick sauce"],
        checkpoints: ["oil rising"],
      },
    ],
  },
  {
    id: 85,
    region: "sub-saharan",
    name: "Kenyan Nyama Choma",
    image: "https://source.unsplash.com/800x600/?nyama+choma+kenyan+grilled+meat",
    time: "45 min",
    difficulty: "Easy",
    rating: 4.7,
    calories: 580,
    tags: ["Goat", "Grilled"],
    description:
      "Simply seasoned charcoal-grilled goat with cornmeal ugali and kachumbari",
    ingredients: [
      { name: "goat or beef ribs", amount: "2 kg", prep: "Cut into large pieces — minimal marinade, the meat speaks for itself" },
      { name: "salt", amount: "generous", prep: "Rub all over meat — simple seasoning is traditional" },
      { name: "garlic", amount: "4 cloves", prep: "Crush and rub into meat with salt" },
      { name: "lemon", amount: "2", prep: "Squeeze over meat while grilling and at serving" },
      { name: "onion", amount: "3 large", prep: "For kachumbari salad — dice very fine" },
      { name: "tomatoes", amount: "4", prep: "For kachumbari — dice small, mix with onion, chili, lemon, cilantro" },
      { name: "cilantro", amount: "bunch", prep: "Chop for kachumbari and garnish" },
      { name: "scotch bonnet", amount: "1", prep: "Mince for kachumbari — seeds out for moderate heat" },
      { name: "ugali (maize meal)", amount: "400g", prep: "Stir into boiling salted water continuously 10 min until very stiff — serve hot" },
    ],
    steps: [
      {
        text: "Season goat generously with salt, rest 30 minutes",
        duration: 30,
        visualCues: ["salted meat", "salt crystals"],
        checkpoints: ["well seasoned", "rested"],
      },
      {
        text: "Grill over charcoal on high heat, turning frequently",
        duration: 15,
        visualCues: ["char marks", "glistening meat"],
        checkpoints: ["char marks", "cooked through"],
      },
      {
        text: "Make ugali: boil water, add cornmeal gradually, stir to very stiff",
        duration: 15,
        visualCues: ["stiff ugali", "pulling from pot"],
        checkpoints: ["very stiff", "no lumps"],
      },
      {
        text: "Make kachumbari: tomato, onion, chili, cilantro, lemon",
        duration: 3,
        visualCues: ["colorful salsa", "fresh herbs"],
        checkpoints: ["fresh and bright"],
      },
    ],
  },
  {
    id: 86,
    region: "sub-saharan",
    name: "Senegalese Thieboudienne",
    image: "https://source.unsplash.com/800x600/?thieboudienne+senegalese+fish+rice",
    time: "90 min",
    difficulty: "Hard",
    rating: 4.8,
    calories: 620,
    tags: ["Fish", "Rice"],
    description: "Senegal's national dish: fish and rice in rich tomato broth",
    ingredients: [
      { name: "firm white fish (grouper or snapper)", amount: "1.5 kg", prep: "Score deeply, fill cuts with yett stuffing (parsley, garlic, chili, netetou)" },
      { name: "parboiled rice (broken)", amount: "500g", prep: "Rinse once — cooks in the fish broth, absorbs everything" },
      { name: "tomato paste", amount: "4 tbsp", prep: "Fry in oil until darkened 5 min — base of sauce" },
      { name: "onion", amount: "3 large", prep: "Mince fine — fry with tomato paste" },
      { name: "cassava", amount: "300g", prep: "Peel and cut into large chunks — add to broth" },
      { name: "eggplant", amount: "2", prep: "Cut into quarters — add to broth" },
      { name: "carrots", amount: "3", prep: "Large chunks — add to broth" },
      { name: "sweet potato", amount: "2", prep: "Peel and halve — add to broth" },
      { name: "netetou (fermented locust beans)", amount: "2 tbsp", prep: "Blend into stuffing — essential umami, substitute miso if unavailable" },
      { name: "scotch bonnet", amount: "2", prep: "Leave whole in broth — removes with less heat, pierce for more" },
      { name: "tamarind paste", amount: "3 tbsp", prep: "Add to cooking liquid for sourness" },
    ],
    steps: [
      {
        text: "Stuff fish with herb paste (parsley, garlic, fermented locust beans)",
        duration: 10,
        visualCues: ["stuffed fish", "herb visible", "scored sides"],
        checkpoints: ["well stuffed"],
      },
      {
        text: "Fry fish until golden on both sides, set aside",
        duration: 10,
        visualCues: ["golden fried fish", "crispy skin"],
        checkpoints: ["golden both sides"],
      },
      {
        text: "Fry tomato paste with onions until very dark and fragrant",
        duration: 20,
        visualCues: ["dark paste", "oil separating"],
        checkpoints: ["very dark", "oil separated"],
      },
      {
        text: "Add stock, vegetables, cook until tender",
        duration: 20,
        visualCues: ["vegetables in broth", "colorful"],
        checkpoints: ["vegetables tender"],
      },
      {
        text: "Add broken rice, cook until absorbed, fish on top to finish",
        duration: 20,
        visualCues: ["rice in broth", "fish on top"],
        checkpoints: ["rice cooked", "fish warm"],
      },
    ],
  },
  {
    id: 87,
    region: "sub-saharan",
    name: "Nigerian Egusi Soup",
    image: "https://source.unsplash.com/800x600/?egusi+soup+nigerian+melon+seed",
    time: "60 min",
    difficulty: "Medium",
    rating: 4.7,
    calories: 520,
    tags: ["Seeds", "Goat", "Soup"],
    description:
      "Rich melon seed soup with goat meat, stockfish and leafy greens",
    ingredients: [
      { name: "ground egusi (melon seeds)", amount: "300g", prep: "Mix with small amount of water into thick paste — fry paste in oil until golden and fragrant" },
      { name: "assorted meats (beef, goat, tripe)", amount: "800g", prep: "Season and boil separately until tender — reserve all cooking stock" },
      { name: "stockfish", amount: "100g", prep: "Soak in hot water 30 min to soften, debone and flake" },
      { name: "smoked catfish", amount: "100g", prep: "Debone carefully, break into chunks" },
      { name: "palm oil", amount: "100ml", prep: "Heat until just liquid — do not smoke or overheat" },
      { name: "onion", amount: "2 large", prep: "Blend half into pepper base, chop half for frying" },
      { name: "scotch bonnet peppers", amount: "3", prep: "Blend with tomatoes and onion into pepper base" },
      { name: "tomatoes", amount: "3", prep: "Blend into pepper base" },
      { name: "ground crayfish", amount: "3 tbsp", prep: "Add to soup — umami foundation" },
      { name: "leafy greens (bitter leaf or spinach)", amount: "200g", prep: "Wash bitter leaf in salted water, wring out — add in last 5 min" },
      { name: "iru (locust beans)", amount: "1 tbsp", prep: "Add for depth — optional but authentic" },
    ],
    steps: [
      {
        text: "Boil goat meat and stockfish until tender and seasoned",
        duration: 30,
        visualCues: ["tender meat", "good broth"],
        checkpoints: ["meat tender"],
      },
      {
        text: "Fry scotch bonnet and crayfish in palm oil until very fragrant",
        duration: 8,
        visualCues: ["red palm oil", "fragrant"],
        checkpoints: ["oil red and fragrant"],
      },
      {
        text: "Add ground egusi, stir into oil, fry until it clumps",
        duration: 10,
        visualCues: ["egusi clumps", "toasty aroma"],
        checkpoints: ["egusi in clumps"],
      },
      {
        text: "Add meat broth, simmer 15 minutes until thick",
        duration: 15,
        visualCues: ["thick egusi soup", "orange-red"],
        checkpoints: ["thick consistency"],
      },
      {
        text: "Add meat, greens, simmer 5 minutes until greens wilt",
        duration: 5,
        visualCues: ["wilted greens", "meat in soup"],
        checkpoints: ["greens wilted"],
      },
    ],
  },
  {
    id: 88,
    region: "sub-saharan",
    name: "Cape Malay Bobotie",
    image: "https://source.unsplash.com/800x600/?bobotie+south+african+spiced+mince",
    time: "60 min",
    difficulty: "Medium",
    rating: 4.7,
    calories: 480,
    tags: ["Beef", "Baked", "Cape Malay"],
    description: "Spiced ground beef bake with egg custard top and apricot jam",
    ingredients: [
      { name: "ground beef or lamb", amount: "600g", prep: "Brown in batches — do not crowd, meat must brown not steam" },
      { name: "onion", amount: "3 large", prep: "Dice fine, sauté until golden before adding meat" },
      { name: "garlic", amount: "3 cloves", prep: "Mince fine" },
      { name: "Cape Malay curry powder", amount: "3 tbsp", prep: "Fry in oil with onion 1 min to bloom" },
      { name: "bread", amount: "2 thick slices", prep: "Soak in milk, squeeze — binds filling and adds texture" },
      { name: "eggs", amount: "3", prep: "Beat 2 with remaining milk for custard topping, 1 mixes into filling" },
      { name: "full-fat milk", amount: "200ml", prep: "Use for soaking bread and custard topping" },
      { name: "raisins", amount: "80g", prep: "No prep — fold into meat filling" },
      { name: "chutney (Mrs. Balls)", amount: "3 tbsp", prep: "Mix into meat filling" },
      { name: "apricot jam", amount: "2 tbsp", prep: "Mix into filling — sweet-savoury is key to bobotie" },
      { name: "turmeric", amount: "2 tsp", prep: "Add to custard topping — gives yellow colour" },
      { name: "bay leaves", amount: "4", prep: "Place on top before baking — decorative and aromatic" },
      { name: "lemon juice", amount: "2 tbsp", prep: "Add to meat mixture for acidity" },
    ],
    steps: [
      {
        text: "Sauté onions golden, add curry powder and turmeric until fragrant",
        duration: 8,
        visualCues: ["golden spiced onions", "yellow tinge"],
        checkpoints: ["golden and fragrant"],
      },
      {
        text: "Add beef, cook through, add jam, chutney, raisins",
        duration: 10,
        visualCues: ["cooked beef", "sweet-spiced aroma"],
        checkpoints: ["beef cooked", "sweet aroma"],
      },
      {
        text: "Transfer to baking dish, smooth, tuck in bay leaves",
        duration: 3,
        visualCues: ["filled dish", "smooth surface", "bay leaves"],
        checkpoints: ["even surface"],
      },
      {
        text: "Pour egg and milk custard over top, bake 35 min until set",
        duration: 35,
        visualCues: ["golden custard top", "set egg layer"],
        checkpoints: ["custard set", "golden top"],
      },
    ],
  },
  {
    id: 89,
    region: "sub-saharan",
    name: "Zimbabwean Sadza",
    image: "https://source.unsplash.com/800x600/?sadza+zimbabwean+cornmeal+beef+stew",
    time: "45 min",
    difficulty: "Easy",
    rating: 4.5,
    calories: 540,
    tags: ["Corn", "Beef", "Traditional"],
    description: "Thick white corn porridge with braised beef in tomato sauce",
    ingredients: [
      { name: "white maize meal (mealie meal)", amount: "400g", prep: "Mix small amount with cold water into smooth paste first — prevents lumps" },
      { name: "water", amount: "1 litre", prep: "Bring to rolling boil before adding maize paste" },
      { name: "beef stew meat", amount: "600g", prep: "Cut small chunks, marinate in salt, garlic, onion 1 hr" },
      { name: "onion", amount: "2 large", prep: "For stew — dice and fry until golden" },
      { name: "tomatoes", amount: "4", prep: "For stew — dice and cook until broken down" },
      { name: "garlic", amount: "4 cloves", prep: "Mince for stew" },
      { name: "dried thyme", amount: "1 tsp", prep: "Season stew" },
      { name: "collard greens or spinach", amount: "300g", prep: "Shred fine, sauté briefly with garlic and tomato" },
    ],
    steps: [
      {
        text: "Brown beef with onions and garlic until well colored",
        duration: 10,
        visualCues: ["browned beef", "golden onions"],
        checkpoints: ["beef browned"],
      },
      {
        text: "Add tomatoes and curry powder, simmer 30 minutes until thick sauce",
        duration: 30,
        visualCues: ["thick sauce", "tender beef"],
        checkpoints: ["sauce thick", "beef tender"],
      },
      {
        text: "Boil water, add cornmeal gradually stirring constantly",
        duration: 10,
        visualCues: ["thickening porridge", "stirring vigorously"],
        checkpoints: ["thick and smooth"],
      },
      {
        text: "Stir over medium heat until very thick and pulling from pot",
        duration: 5,
        visualCues: ["very stiff sadza", "pulling from sides"],
        checkpoints: ["very stiff"],
      },
    ],
  },
  {
    id: 90,
    region: "sub-saharan",
    name: "Ethiopian Tibs",
    image: "https://source.unsplash.com/800x600/?tibs+ethiopian+sauteed+meat",
    time: "20 min",
    difficulty: "Easy",
    rating: 4.7,
    calories: 420,
    tags: ["Beef", "Ethiopian", "Quick"],
    description:
      "Spiced sautéed beef with onions, jalapeños, and rosemary in niter kibbeh",
    ingredients: [
      { name: "beef sirloin or lamb", amount: "600g", prep: "Cut into 3cm cubes — must be very dry before hitting the pan" },
      { name: "onion", amount: "3 large", prep: "Quarter into wedges — cook until caramelised and slightly charred" },
      { name: "jalapeño or serrano peppers", amount: "4", prep: "Slice into rings — leave seeds for heat" },
      { name: "garlic", amount: "4 cloves", prep: "Slice thin — add with butter" },
      { name: "ginger", amount: "30g", prep: "Slice thin" },
      { name: "niter kibbeh (spiced butter)", amount: "80g", prep: "Melt in pan first — base for frying tibs" },
      { name: "berbere paste", amount: "2 tbsp", prep: "Stir into meat while frying" },
      { name: "rosemary", amount: "2 sprigs", prep: "Fry with meat — unusual but traditional in some regions" },
      { name: "injera", amount: "to serve", prep: "Serve tibs directly on injera — sauce soaks in" },
    ],
    steps: [
      {
        text: "Heat niter kibbeh until very hot in pan or clay pot",
        duration: 3,
        visualCues: ["hot niter kibbeh", "shimmering"],
        checkpoints: ["butter very hot"],
      },
      {
        text: "Sear beef cubes quickly until browned on outside",
        duration: 4,
        visualCues: ["browned beef cubes", "searing sound", "golden edges"],
        checkpoints: ["browned exterior", "still juicy"],
      },
      {
        text: "Add onions, jalapeños, garlic — sauté 3 minutes",
        duration: 3,
        visualCues: ["wilted onions", "peppers visible"],
        checkpoints: ["onions wilted"],
      },
      {
        text: "Add berbere and rosemary, finish with diced tomatoes",
        duration: 3,
        visualCues: ["spiced beef", "tomato added", "aromatic"],
        checkpoints: ["spices aromatic", "tomatoes softened"],
      },
    ],
  },

  // NORTH AMERICA
  {
    id: 91,
    region: "north-america",
    name: "Louisiana Gumbo",
    image: "https://source.unsplash.com/800x600/?louisiana+gumbo+southern+seafood+stew",
    time: "120 min",
    difficulty: "Hard",
    rating: 4.9,
    calories: 580,
    tags: ["Cajun", "Shrimp", "Stew"],
    description:
      "Dark roux-based stew with andouille, shrimp and okra over rice",
    ingredients: [
      { name: "all-purpose flour", amount: "150g", prep: "Cook with equal weight of oil in heavy pan 45–60 min stirring constantly until chocolate brown — this is the roux, the soul of gumbo" },
      { name: "vegetable oil", amount: "150ml", prep: "Combine with flour for dark roux — use neutral oil, not butter" },
      { name: "andouille sausage", amount: "400g", prep: "Slice 1cm coins, brown in heavy pan — reserve fat for cooking" },
      { name: "chicken thighs", amount: "600g", prep: "Season generously with Cajun spice, brown deeply in sausage fat" },
      { name: "raw shrimp", amount: "400g", prep: "Peel and devein — add only in last 5 min or they overcook" },
      { name: "okra", amount: "300g", prep: "Slice 1cm — add early to help thicken, or roast first to reduce sliminess" },
      { name: "onion (the Trinity)", amount: "2 large", prep: "Dice fine — cook in roux first" },
      { name: "celery (the Trinity)", amount: "4 stalks", prep: "Dice fine — cook with onion" },
      { name: "green bell pepper (the Trinity)", amount: "2", prep: "Dice fine — cook with onion and celery" },
      { name: "garlic", amount: "6 cloves", prep: "Mince — add after Trinity softens" },
      { name: "chicken stock", amount: "2 litres", prep: "Hot — add gradually to roux stirring constantly" },
      { name: "filé powder", amount: "2 tsp", prep: "Stir into gumbo off heat at end — thickens and adds flavour" },
    ],
    steps: [
      {
        text: "The dark roux is the absolute foundation of gumbo and requires your full, undivided attention. In a heavy cast iron pot, combine 150g of all-purpose flour with 150ml of vegetable oil over medium heat. Stir constantly with a long wooden spoon — every second, without stopping — for 45–60 minutes until the roux reaches the colour of dark chocolate or black coffee. The smell will be nutty, almost like popcorn. One moment of inattention will burn it — burnt roux must be discarded and started over.",
        duration: 60,
        visualCues: ["chocolate-dark brown roux", "nutty popcorn aroma"],
        checkpoints: ["chocolate brown colour", "nutty not burnt smell", "smooth and glossy"],
      },
      {
        text: "Remove the pot from the heat and immediately add the Holy Trinity: 2 diced onions, 4 diced celery stalks, and 2 diced green bell peppers. Stir vigorously — the vegetables will sizzle violently in the hot roux and lower its temperature. This step stops the roux from burning. Return to medium heat and cook the vegetables in the roux for 8 minutes until softened.",
        duration: 12,
        visualCues: ["vegetables sizzling in dark roux", "softening trinity"],
        checkpoints: ["roux temperature dropped", "vegetables softened"],
      },
      {
        text: "Add 6 minced garlic cloves, 400g of sliced andouille sausage that has been pre-browned, and 600g of pre-browned chicken thigh pieces. Pour in 2 litres of hot chicken stock gradually, stirring constantly to prevent lumps. Add 3 bay leaves, 2 teaspoons of dried thyme, and 1 tablespoon of Cajun seasoning. Bring to a simmer.",
        duration: 10,
        visualCues: ["dark rich broth", "stock incorporating smoothly"],
        checkpoints: ["no lumps", "stock fully incorporated", "simmering steadily"],
      },
      {
        text: "Simmer uncovered for 45 minutes, skimming any fat that rises. Add 300g of sliced okra in the last 15 minutes — okra both thickens and flavours the gumbo. In the very last 5 minutes, add 400g of peeled, deveined shrimp. They cook in 3 minutes and will become rubbery if overdone. Stir in 2 teaspoons of filé powder off the heat.",
        duration: 50,
        visualCues: ["thick rich dark gumbo", "okra thickening"],
        checkpoints: ["shrimp just pink", "C-shaped not O-shaped", "thick consistency"],
      },
      {
        text: "Taste and adjust seasoning — gumbo needs salt, black pepper, and often more Cajun spice. Serve over a mound of white rice in deep bowls. The rice should sit as an island in the centre of the gumbo, not mixed in. Garnish with sliced scallions and filé powder. Gumbo is always richer and deeper the next day.",
        duration: 3,
        visualCues: ["rice island in dark gumbo", "scallion garnish"],
        checkpoints: ["well seasoned", "rice island centred"],
      },
    ],
  },
  {
    id: 92,
    region: "north-america",
    name: "New England Clam Chowder",
    image: "https://source.unsplash.com/800x600/?clam+chowder+new+england+creamy",
    time: "35 min",
    difficulty: "Easy",
    rating: 4.8,
    calories: 420,
    tags: ["Soup", "Clams", "Creamy"],
    description: "Creamy potato and clam soup with bacon in a bread bowl",
    ingredients: [
      { name: "fresh clams (littleneck or cherrystone)", amount: "2 kg", prep: "Scrub clean, steam open in dry pot — reserve every drop of liquid (clam liquor)" },
      { name: "thick-cut bacon", amount: "200g", prep: "Dice, render in pot until crispy — reserve fat for sweating vegetables" },
      { name: "onion", amount: "2 large", prep: "Dice medium — sweat in bacon fat until very soft" },
      { name: "celery", amount: "4 stalks", prep: "Dice medium — cook with onion" },
      { name: "potatoes (Yukon Gold)", amount: "600g", prep: "Peel and cut 2cm cubes — cook in clam liquor + stock until just tender" },
      { name: "all-purpose flour", amount: "4 tbsp", prep: "Sprinkle over cooked vegetables, stir 2 min — light roux to thicken" },
      { name: "whole milk", amount: "400ml", prep: "Warm before adding — prevents curdling" },
      { name: "heavy cream", amount: "200ml", prep: "Stir in at very end — do not boil after adding" },
      { name: "bay leaves", amount: "2", prep: "Simmer in soup, remove before serving" },
      { name: "fresh thyme", amount: "4 sprigs", prep: "Add with bay leaves, remove before serving" },
      { name: "oyster crackers", amount: "to serve", prep: "Float on top at serving — traditional accompaniment" },
    ],
    steps: [
      {
        text: "Scrub 2 kg of fresh clams under cold running water. Place in a pot with 1 cup of water, cover tightly, and steam over high heat for 5–7 minutes until the clams just open. Remove immediately — overcooked clams are rubbery. Strain the briny, mineral-rich clam liquor through a cloth to remove any grit. Remove clam meat from shells and roughly chop. You should have approximately 300g of meat and 500ml of liquor.",
        duration: 12,
        visualCues: ["open clams", "clear strained liquor"],
        checkpoints: ["all clams opened", "liquor clear of grit", "clam meat roughly chopped"],
      },
      {
        text: "Dice 200g of thick-cut bacon into lardons. Render in a heavy pot over medium heat until golden and crispy, 8 minutes. Remove the bacon but leave 2 tablespoons of the rendered fat. In this fat, soften 2 large diced onions and 4 diced celery stalks over medium heat for 8 minutes until very soft. Sprinkle over 4 tablespoons of flour and stir for 2 minutes.",
        duration: 20,
        visualCues: ["golden crispy bacon", "soft transparent vegetables", "roux forming"],
        checkpoints: ["bacon golden and crispy", "vegetables very soft", "roux cooked 2 minutes"],
      },
      {
        text: "Add the strained clam liquor and 300ml of additional fish or clam stock. Bring to a simmer, whisking to prevent lumps. Add 600g of diced Yukon Gold potatoes. Simmer for 15 minutes until the potatoes are tender but still holding their shape. Add the bacon back in.",
        duration: 18,
        visualCues: ["thick developing chowder", "potato cubes holding shape"],
        checkpoints: ["potatoes tender but intact", "no lumps"],
      },
      {
        text: "Add 400ml of warmed whole milk and 200ml of heavy cream. Add the clam meat. Stir gently and heat through for 3 minutes — do not boil after adding the dairy or the cream will curdle and the clams will toughen. Season with white pepper and taste for salt — the clam liquor is already quite salty.",
        duration: 5,
        visualCues: ["creamy white chowder", "clam meat visible"],
        checkpoints: ["NOT boiling", "cream fully incorporated", "clams just heated through"],
      },
      {
        text: "Serve in warmed deep bowls with a generous scatter of the crispy bacon on top, a few oyster crackers floating on the surface, and a small parsley sprig. The chowder should be thick enough to coat a spoon but still flow when the bowl is tilted — never stiff like paste. A proper chowder is finished with a small knob of butter swirled in at the last moment.",
        duration: 3,
        visualCues: ["creamy thick chowder", "bacon and crackers on top"],
        checkpoints: ["pourable not stiff", "bacon crispy on top", "served in warmed bowls"],
      },
    ],
  },
  {
    id: 93,
    region: "north-america",
    name: "Texas BBQ Brisket",
    image: "https://source.unsplash.com/800x600/?texas+bbq+brisket+smoked",
    time: "720 min",
    difficulty: "Hard",
    rating: 4.9,
    calories: 580,
    tags: ["Beef", "Smoked", "BBQ"],
    description: "Post Oak-smoked whole brisket with bark and pink smoke ring",
    ingredients: [
      { name: "whole packer brisket (flat + point)", amount: "5–6 kg", prep: "Trim fat cap to 6mm — leave all fat on bottom, score fat cap" },
      { name: "coarse kosher salt", amount: "4 tbsp", prep: "Apply to all surfaces 12–24 hrs before smoking — dry brine" },
      { name: "coarse black pepper", amount: "4 tbsp", prep: "Apply with salt — Texas rub is just salt and pepper, nothing else" },
      { name: "oak wood chunks", amount: "large supply", prep: "No soaking — dry wood produces cleaner smoke" },
      { name: "beef tallow", amount: "4 tbsp", prep: "Apply during rest — pour over wrapped brisket in butcher paper" },
      { name: "yellow mustard (binder)", amount: "3 tbsp", prep: "Thin coat on brisket before rub — helps rub adhere" },
      { name: "apple cider vinegar", amount: "spray bottle", prep: "Spritz every hour after first 3 hrs of smoke — keeps bark moist" },
      { name: "pink butcher paper", amount: "large sheet", prep: "Wrap brisket at 165°F internal — allows breathing unlike foil" },
    ],
    steps: [
      {
        text: "Trim the fat cap on your 5–6 kg whole packer brisket to exactly 6mm — thick enough to baste the meat during the cook but thin enough to render fully. Apply 4 tablespoons of coarse kosher salt and 4 tablespoons of coarsely cracked black pepper as your rub — this is the Texas way, nothing more. Apply at least 12 hours before smoking, or ideally the night before.",
        duration: 20,
        visualCues: ["trimmed fat cap", "salt and pepper crust coating"],
        checkpoints: ["6mm fat cap", "rub on all surfaces 12+ hours ahead"],
      },
      {
        text: "Set up your smoker to maintain 225–250°F (107–121°C). Add oak wood chunks — dry, not soaked — for a clean, steady smoke. Place the brisket fat-side up on the grate. The first 3 hours: do not open, do not spritz, do not touch. Let the smoke work.",
        duration: 180,
        visualCues: ["thin blue smoke from smoker", "brisket taking on colour"],
        checkpoints: ["thin blue smoke not white billowing", "temperature steady 225-250°F"],
      },
      {
        text: "After 3 hours, begin spritzing with apple cider vinegar every 45 minutes to keep the bark moist and encourage smoke penetration. Continue smoking until the internal temperature reaches 165°F (74°C) — typically 6–8 total hours. At this point, wrap tightly in pink butcher paper with 2 tablespoons of beef tallow, which will baste the meat internally.",
        duration: 300,
        visualCues: ["dark mahogany bark forming", "internal temp climbing"],
        checkpoints: ["dark mahogany bark", "internal temperature 165°F", "wrapped tightly"],
      },
      {
        text: "Continue cooking wrapped until the internal temperature reaches 203°F (95°C) and — critically — a metal probe slides into the thickest point of the flat with zero resistance, like sliding into warm butter. This is the 'probe test' and it is more important than the temperature reading. Rest wrapped in a cooler for a minimum of 1 hour — 2–4 hours is better.",
        duration: 180,
        visualCues: ["probe slides in with no resistance", "resting wrapped"],
        checkpoints: ["zero resistance on probe test", "internal temp 203°F", "resting minimum 1 hour"],
      },
      {
        text: "Unwrap and slice against the grain with a long sharp knife — first slice the flat at 1cm thickness, then separate the point and slice it 1.5cm thick. The flat should be moist and tender; the point should be gelatinous, fatty, and deeply flavoured. Serve immediately with only white bread, pickles, and raw onion — nothing more.",
        duration: 10,
        visualCues: ["smoke ring visible in cross section", "juicy slices", "grain perpendicular to cut"],
        checkpoints: ["pink smoke ring visible", "slices hold together but are tender", "cut against grain"],
      },
    ],
  },
  {
    id: 94,
    region: "north-america",
    name: "Eggs Benedict",
    image: "https://source.unsplash.com/800x600/?eggs+benedict+hollandaise+brunch",
    time: "25 min",
    difficulty: "Medium",
    rating: 4.8,
    calories: 490,
    tags: ["Brunch", "Eggs", "Classic"],
    description: "Poached eggs on Canadian bacon with silky hollandaise",
    ingredients: [
      { name: "eggs", amount: "4 + 2 yolks", prep: "Extra fresh eggs for poaching — add 1 tsp vinegar to simmering water, create whirlpool" },
      { name: "Canadian bacon or ham", amount: "8 slices", prep: "Warm in pan until lightly crisped — just needs heat through" },
      { name: "English muffins", amount: "2", prep: "Split and toast until golden — must be warm when serving" },
      { name: "egg yolks (for hollandaise)", amount: "3", prep: "Whisk over double boiler until thick ribbons — temperature 60–65°C, do not scramble" },
      { name: "clarified butter", amount: "200g", prep: "Clarify by melting slowly, skim foam, pour off golden liquid — must be warm (not hot) for hollandaise" },
      { name: "lemon juice", amount: "2 tbsp", prep: "Add to hollandaise gradually — brightens and balances richness" },
      { name: "cayenne pepper", amount: "pinch", prep: "Season hollandaise — traditional" },
      { name: "white wine vinegar", amount: "2 tsp", prep: "Add to poaching water and to hollandaise reduction" },
      { name: "fresh chives or parsley", amount: "handful", prep: "Mince fine — sprinkle over finished dish" },
    ],
    steps: [
      {
        text: "Begin with the hollandaise. In a small saucepan, combine 2 tablespoons of white wine vinegar with 1 tablespoon of cold water and reduce by half. Cool. In a heatproof bowl set over barely simmering water, whisk together 3 egg yolks and the reduced vinegar until thick and pale — the mixture should triple in volume and fall from the whisk in thick ribbons. Remove from heat.",
        duration: 10,
        visualCues: ["thick pale ribbon from whisk", "tripled in volume"],
        checkpoints: ["ribbon stage", "pale not yellow", "very thick"],
      },
      {
        text: "Whisk 200g of warm clarified butter into the egg yolk mixture drop by drop at first, then in a slow, steady stream — exactly as you would make mayonnaise. The sauce will emulsify and thicken dramatically. Add the juice of 1 lemon, a pinch of cayenne, and season generously with salt. If it becomes too thick, whisk in a teaspoon of warm water. Keep warm by leaving the bowl over warm water, not heat.",
        duration: 12,
        visualCues: ["thick glossy hollandaise", "coats spoon heavily"],
        checkpoints: ["thick enough to coat a spoon", "no separation", "served warm not hot"],
      },
      {
        text: "Poach the eggs: bring 1.5 litres of water to a gentle simmer in a wide saucepan — barely trembling, no big bubbles. Add 2 teaspoons of white wine vinegar. Crack each egg into a small cup first. Create a gentle swirl in the water with a spoon and slip the egg into the centre. Cook for exactly 3 minutes for a runny yolk. Remove with a slotted spoon and drain on kitchen paper.",
        duration: 8,
        visualCues: ["oval shaped poached egg", "white fully set", "yolk moving inside"],
        checkpoints: ["white fully opaque", "yolk visible through white", "oval compact shape"],
      },
      {
        text: "While the eggs poach, heat 8 slices of Canadian bacon in a pan for 2 minutes until lightly crisped and warm. Split and toast 2 English muffins until golden — they need to be crispy enough to support the egg without going soggy immediately. Warm your serving plates.",
        duration: 5,
        visualCues: ["golden toasted muffins", "warm Canadian bacon"],
        checkpoints: ["muffins golden and crispy", "bacon warmed through"],
      },
      {
        text: "Assemble immediately and serve at once — eggs Benedict cannot wait. Place muffin halves on warmed plates. Top with 2 slices of Canadian bacon each. Lay a poached egg on each. Spoon 3 tablespoons of hollandaise generously over each egg, letting it cascade down the sides. Finish with a pinch of paprika and snipped chives. The yolk should run when cut.",
        duration: 3,
        visualCues: ["cascading hollandaise", "paprika dusting"],
        checkpoints: ["hollandaise generous", "served on warmed plates", "egg yolk runs when cut"],
      },
    ],
  },
  {
    id: 95,
    region: "north-america",
    name: "Maple Pecan Pie",
    image: "https://source.unsplash.com/800x600/?pecan+pie+maple+american+dessert",
    time: "65 min",
    difficulty: "Medium",
    rating: 4.7,
    calories: 520,
    tags: ["Dessert", "Canadian", "Baked"],
    description: "Buttery pastry with gooey maple syrup and pecan filling",
    ingredients: [
      { name: "pecans", amount: "350g", prep: "Toast lightly in oven 8 min at 160°C — enhances flavour, prevents soggy texture" },
      { name: "pure maple syrup", amount: "200ml", prep: "Use dark amber or Grade B for stronger flavour" },
      { name: "light corn syrup", amount: "100ml", prep: "Mix with maple syrup — prevents crystallisation" },
      { name: "eggs", amount: "3 large", prep: "Room temperature — beat lightly with sugar before adding syrups" },
      { name: "brown sugar", amount: "100g", prep: "Mix with eggs until dissolved" },
      { name: "butter", amount: "60g", prep: "Melt and cool to room temperature before mixing in" },
      { name: "vanilla extract", amount: "2 tsp", prep: "Add to filling" },
      { name: "bourbon (optional)", amount: "2 tbsp", prep: "Mix into filling — rounds out sweetness" },
      { name: "shortcrust pastry", amount: "250g", prep: "Blind bake shell at 180°C 15 min with weights — prevents soggy base" },
      { name: "sea salt flakes", amount: "generous pinch", prep: "Sprinkle on top before baking — salt and maple is perfect" },
    ],
    steps: [
      {
        text: "Blind bake pie crust at 190°C 15 min with weights",
        duration: 15,
        visualCues: ["pale golden crust", "weights removed"],
        checkpoints: ["lightly golden"],
      },
      {
        text: "Toast pecans until fragrant and slightly darkened",
        duration: 5,
        visualCues: ["toasted pecans", "fragrant"],
        checkpoints: ["fragrant", "not burned"],
      },
      {
        text: "Whisk eggs, maple syrup, brown sugar, butter, vanilla together",
        duration: 3,
        visualCues: ["smooth custard", "no streaks"],
        checkpoints: ["well combined"],
      },
      {
        text: "Arrange pecans in shell, pour filling, bake 180°C 45 minutes",
        duration: 45,
        visualCues: ["pecans floating", "golden top", "set custard"],
        checkpoints: ["center just set", "golden top"],
      },
    ],
  },
  {
    id: 96,
    region: "north-america",
    name: "New England Lobster Roll",
    image: "https://source.unsplash.com/800x600/?lobster+roll+new+england+sandwich",
    time: "25 min",
    difficulty: "Medium",
    rating: 4.8,
    calories: 520,
    tags: ["Lobster", "Seafood", "Classic"],
    description:
      "Chilled lobster salad in toasted split-top rolls — New England summer",
    ingredients: [
      { name: "fresh live lobsters", amount: "2 (about 700g each)", prep: "Steam 12 min until bright red, cool completely — remove claw, knuckle, and tail meat" },
      { name: "top-split hot dog buns", amount: "4", prep: "Butter the flat sides heavily, toast in pan until golden — New England style" },
      { name: "butter", amount: "80g", prep: "For Connecticut style — melt and toss with warm lobster and lemon" },
      { name: "mayonnaise", amount: "4 tbsp", prep: "For Maine cold style — bind with celery and lemon" },
      { name: "celery", amount: "2 stalks", prep: "Dice very fine — only in Maine style cold roll" },
      { name: "lemon", amount: "1", prep: "Juice and zest — add regardless of style" },
      { name: "fresh tarragon or chives", amount: "small bunch", prep: "Mince fine — fold into lobster" },
      { name: "sea salt", amount: "to taste", prep: "Season lightly — lobster is naturally sweet and salty" },
      { name: "celery salt", amount: "pinch", prep: "Classic New England seasoning for Maine-style" },
    ],
    steps: [
      {
        text: "Remove lobster meat from shells, chop into generous chunks",
        duration: 10,
        visualCues: ["chunky lobster", "pink-red flesh"],
        checkpoints: ["large chunks", "no shell"],
      },
      {
        text: "Mix gently with mayo, lemon, celery, chives — dress lightly",
        duration: 3,
        visualCues: ["lightly dressed", "mayo coating"],
        checkpoints: ["just coated", "not over-dressed"],
      },
      {
        text: "Butter and toast split-top rolls until golden on cut side",
        duration: 3,
        visualCues: ["golden toasted roll", "buttery surface"],
        checkpoints: ["golden on cut side"],
      },
      {
        text: "Pile lobster salad generously into toasted rolls",
        duration: 2,
        visualCues: ["overflowing lobster", "generous filling"],
        checkpoints: ["generously filled"],
      },
    ],
  },
  {
    id: 97,
    region: "north-america",
    name: "Nashville Hot Chicken",
    image: "https://source.unsplash.com/800x600/?nashville+hot+chicken+spicy",
    time: "45 min",
    difficulty: "Medium",
    rating: 4.8,
    calories: 620,
    tags: ["Chicken", "Spicy", "Fried"],
    description:
      "Cayenne-paste-painted fried chicken on white bread with pickles",
    ingredients: [
      { name: "chicken pieces (legs and thighs)", amount: "1.5 kg", prep: "Marinate in buttermilk + hot sauce + salt overnight — 24 hrs ideal" },
      { name: "buttermilk", amount: "500ml", prep: "Season with hot sauce, garlic powder, onion powder for marinade" },
      { name: "all-purpose flour", amount: "300g", prep: "Season with salt, pepper, garlic powder, onion powder, cayenne" },
      { name: "eggs", amount: "2", prep: "Beat with remaining buttermilk for dipping" },
      { name: "cayenne pepper (for hot paste)", amount: "4 tbsp", prep: "This is the heat — blend with brown sugar, paprika, garlic powder, and frying oil" },
      { name: "brown sugar", amount: "2 tbsp", prep: "Adds slight sweetness to hot paste — balances extreme heat" },
      { name: "smoked paprika", amount: "2 tbsp", prep: "Adds colour and smokiness to hot paste" },
      { name: "oil (frying)", amount: "2 litres", prep: "Heat to 175°C — 3–4 tbsp removed and added to hot paste" },
      { name: "white bread slices", amount: "8", prep: "Serve chicken on top — soaks up hot paste" },
      { name: "dill pickles", amount: "handful", prep: "Slice thin — serve on top, cooling contrast" },
    ],
    steps: [
      {
        text: "Marinate 1.5 kg of chicken pieces in 500ml of buttermilk seasoned with 2 tablespoons of hot sauce, 1 teaspoon each of garlic powder, onion powder, and salt. Refrigerate for a minimum of 8 hours — 24 hours is ideal. The buttermilk's lactic acid tenderises the meat while the brine seasons it throughout.",
        duration: 15,
        visualCues: ["chicken submerged in buttermilk", "even coating"],
        checkpoints: ["fully submerged", "marinating 8+ hours"],
      },
      {
        text: "Season 300g of flour thoroughly with 2 teaspoons of salt, 1 teaspoon each of garlic powder, onion powder, black pepper, and 1 teaspoon of cayenne. Remove chicken from buttermilk — let excess drip off but do not shake off all the coating. Dredge in seasoned flour, pressing firmly into every crevice. Double-dip by briefly dipping back in buttermilk and back in flour for an extra-thick crust.",
        duration: 15,
        visualCues: ["thick floury coating", "every crevice covered"],
        checkpoints: ["thick even crust on all surfaces", "no bare spots"],
      },
      {
        text: "Heat 2 litres of oil to 175°C in a large, deep pot. Fry the chicken in batches — do not overcrowd. Maintain the oil temperature throughout; each batch will drop the temperature, so allow it to return to 175°C between batches. Fry for 14–16 minutes until deeply golden and the internal temperature reads 75°C. Drain on a wire rack, not kitchen paper — the rack keeps the crust crispy.",
        duration: 35,
        visualCues: ["deep golden fried chicken", "bubbling steadily in oil"],
        checkpoints: ["deep golden crust", "internal temperature 75°C", "draining on rack not paper"],
      },
      {
        text: "Make the hot paste immediately: whisk together 4 tablespoons of cayenne pepper, 2 tablespoons of brown sugar, 2 teaspoons of smoked paprika, 1 teaspoon of garlic powder, and 3–4 tablespoons of the hot frying oil removed from the pot. The oil should be hot — this blooms the spices and creates the characteristic Nashville sheen. Brush liberally over the hot chicken immediately.",
        duration: 5,
        visualCues: ["glistening red-orange chicken", "spice paste coating"],
        checkpoints: ["hot paste brushed while chicken still hot", "vivid orange-red coating"],
      },
      {
        text: "Serve on 2 slices of plain white sandwich bread — the bread is there to catch the dripping hot paste and fat, and to cool your mouth between bites. Top with 6–8 dill pickle slices. Nashville hot chicken must be eaten immediately while searingly hot — the contrast between the burning heat of the paste and the cooling tang of the pickles is the entire experience.",
        duration: 3,
        visualCues: ["glistening chicken on white bread", "pickle slices on top"],
        checkpoints: ["served immediately while hot", "pickles placed on top"],
      },
    ],
  },
  {
    id: 98,
    region: "north-america",
    name: "Canadian Poutine",
    image: "https://source.unsplash.com/800x600/?poutine+canadian+fries+cheese+gravy",
    time: "30 min",
    difficulty: "Easy",
    rating: 4.8,
    calories: 680,
    tags: ["Fries", "Canadian", "Comfort Food"],
    description:
      "Quebec's sacred trinity: crispy fries, squeaky cheese curds, and rich gravy",
    ingredients: [
      { name: "Russet potatoes", amount: "1 kg", prep: "Cut 1cm batons, soak in cold water 30 min, dry completely — double fry: 130°C then 190°C" },
      { name: "cheese curds (fresh)", amount: "300g", prep: "Room temperature — they should squeak when you bite them, do not substitute with other cheese" },
      { name: "butter", amount: "60g", prep: "For roux base of gravy" },
      { name: "all-purpose flour", amount: "60g", prep: "Equal to butter for roux — cook 2 min until golden" },
      { name: "beef stock", amount: "500ml", prep: "Rich, good quality — the gravy must be deeply flavourful" },
      { name: "chicken stock", amount: "500ml", prep: "Mix with beef stock for lighter colour but full body" },
      { name: "Worcestershire sauce", amount: "2 tsp", prep: "Add to gravy — depth and umami" },
      { name: "apple cider vinegar", amount: "1 tsp", prep: "Add to gravy — tiny amount brightens" },
      { name: "black pepper", amount: "generous", prep: "Season gravy heavily" },
    ],
    steps: [
      {
        text: "Cut 1 kg of Russet potatoes into 1cm batons — do not peel, the skin adds texture. Soak in cold water for 30 minutes to remove excess starch. Drain and dry thoroughly with kitchen towels — any moisture will cause dangerous oil splatter. First fry at 130°C for 6 minutes until cooked through but barely coloured. Drain and freeze for 30 minutes or refrigerate for 1 hour.",
        duration: 60,
        visualCues: ["pale cooked fries", "no colour yet"],
        checkpoints: ["cooked through but pale", "no browning yet"],
      },
      {
        text: "For the gravy, make a roux by melting 60g of butter and whisking in 60g of flour over medium heat for 2 minutes until golden. Add 500ml of good beef stock and 500ml of chicken stock gradually, whisking constantly. Bring to a simmer and cook for 10 minutes until thickened enough to coat a spoon. Season with Worcestershire sauce, salt, and generous black pepper. Keep warm.",
        duration: 15,
        visualCues: ["thick glossy brown gravy", "coats spoon"],
        checkpoints: ["lump-free", "thick enough to coat spoon", "deeply flavoured"],
      },
      {
        text: "Second fry: heat oil to 190°C and fry the par-cooked, chilled fries in batches for 3–4 minutes until deeply golden and crispy. They should be golden brown, rigid, and make a tapping sound when knocked against the bowl. Season immediately with salt while still hot — salt does not stick to cold fries.",
        duration: 8,
        visualCues: ["deep golden crispy fries", "rigid not floppy"],
        checkpoints: ["deep golden colour", "rigid when picked up", "salted while hot"],
      },
      {
        text: "Working quickly — everything must be hot — pile the fries into warmed bowls. Scatter 300g of fresh cheese curds generously over the hot fries. The curds must be at room temperature and the fries must be screaming hot so the curds begin to soften and melt slightly without becoming fully melted. Pour the piping hot gravy over the top immediately.",
        duration: 3,
        visualCues: ["cheese curds softening on hot fries", "gravy cascading over"],
        checkpoints: ["curds softening but still distinct", "gravy poured immediately while hot", "eaten within 2 minutes of assembly"],
      },
    ],
  },
  {
    id: 99,
    region: "north-america",
    name: "Southern Biscuits and Gravy",
    image: "https://source.unsplash.com/800x600/?biscuits+and+gravy+southern+american",
    time: "30 min",
    difficulty: "Easy",
    rating: 4.7,
    calories: 540,
    tags: ["Breakfast", "Southern", "Comfort Food"],
    description:
      "Flaky buttermilk biscuits smothered in creamy sausage pan gravy",
    ingredients: [
      { name: "all-purpose flour", amount: "300g", prep: "Chill in freezer 10 min — cold flour makes flakier biscuits" },
      { name: "cold butter", amount: "100g", prep: "Freeze 30 min, grate on box grater — must be ice cold for flaky layers" },
      { name: "cold buttermilk", amount: "200ml", prep: "Cold from fridge — add gradually until dough just comes together" },
      { name: "baking powder", amount: "2 tsp", prep: "Sift with flour, salt, and baking soda" },
      { name: "baking soda", amount: "1/2 tsp", prep: "Sift with other dry ingredients" },
      { name: "pork breakfast sausage", amount: "400g", prep: "Remove from casing, crumble and brown in cast iron — do not drain all fat" },
      { name: "all-purpose flour (for gravy)", amount: "4 tbsp", prep: "Sprinkle over sausage in pan, stir 2 min to cook out raw flour" },
      { name: "whole milk", amount: "500ml", prep: "Add gradually while stirring — scrape bottom to prevent sticking" },
      { name: "black pepper", amount: "generous", prep: "Crack coarsely — gravy needs lots of pepper" },
      { name: "sea salt", amount: "to taste", prep: "Season gravy at end — sausage is already salty" },
    ],
    steps: [
      {
        text: "Cut cold butter into flour until pea-sized, add buttermilk just until combined",
        duration: 5,
        visualCues: ["butter chunks visible", "shaggy dough"],
        checkpoints: ["butter pieces visible", "not overworked"],
      },
      {
        text: "Pat out (not roll) and cut biscuits, bake 220°C 12-15 minutes",
        duration: 15,
        visualCues: ["tall risen biscuits", "golden top", "flaky layers"],
        checkpoints: ["tall and risen", "flaky layers visible"],
      },
      {
        text: "Brown breakfast sausage until fully cooked, leave fat in pan",
        duration: 5,
        visualCues: ["browned sausage", "fat in pan"],
        checkpoints: ["fully cooked"],
      },
      {
        text: "Add flour to fat, make roux, whisk in milk until thick pepper gravy",
        duration: 5,
        visualCues: ["thick white gravy", "sausage visible", "pepper flecks"],
        checkpoints: ["thick and creamy", "well peppered"],
      },
    ],
  },
  {
    id: 100,
    region: "north-america",
    name: "Maple Glazed Salmon",
    image: "https://source.unsplash.com/800x600/?maple+glazed+salmon+canadian",
    time: "20 min",
    difficulty: "Easy",
    rating: 4.7,
    calories: 380,
    tags: ["Salmon", "Glazed", "Quick"],
    description: "Wild salmon with maple syrup, Dijon mustard, and soy glaze",
    ingredients: [
      { name: "salmon fillets (skin-on)", amount: "4 (180g each)", prep: "Pat completely dry with paper towels — moisture prevents caramelisation" },
      { name: "pure maple syrup", amount: "4 tbsp", prep: "Mix with soy, Dijon, garlic for glaze" },
      { name: "soy sauce", amount: "3 tbsp", prep: "Add to glaze — salt and umami" },
      { name: "Dijon mustard", amount: "2 tbsp", prep: "Mix into glaze — emulsifies and adds bite" },
      { name: "garlic", amount: "3 cloves", prep: "Mince or grate fine — mix into glaze" },
      { name: "fresh ginger", amount: "15g", prep: "Grate fine — optional, adds warmth to glaze" },
      { name: "lemon", amount: "1", prep: "Zest into glaze, cut remaining into wedges for serving" },
      { name: "fresh dill", amount: "small bunch", prep: "Chop roughly — scatter over finished fish" },
      { name: "sesame seeds", amount: "2 tbsp", prep: "Toast lightly — sprinkle at serving" },
    ],
    steps: [
      {
        text: "Mix maple syrup, Dijon, soy sauce and garlic into glaze",
        duration: 2,
        visualCues: ["golden glaze", "smooth mixture"],
        checkpoints: ["well combined"],
      },
      {
        text: "Pat salmon dry, sear skin-side down 4 minutes until crispy",
        duration: 4,
        visualCues: ["crispy skin", "golden color"],
        checkpoints: ["skin crispy"],
      },
      {
        text: "Flip, brush generously with glaze, cook 3 more minutes",
        duration: 3,
        visualCues: ["glazed salmon", "caramelizing"],
        checkpoints: ["glaze caramelizing"],
      },
      {
        text: "Rest 2 minutes, serve with lemon and roasted vegetables",
        duration: 2,
        visualCues: ["rested salmon", "glossy glaze"],
        checkpoints: ["flakes easily"],
      },
    ],
  },
];

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:3001").replace(/\/$/, "");

const VOICE_PROFILES = {
  classic:  { rate: 0.92, pitch: 0.88, label: "🎙️ Chef Marcus (Deep & Warm)", elevenId: "TxGEqnHWrfWFTfGW9XjX" },
  friendly: { rate: 1.0,  pitch: 1.0,  label: "🎙️ Chef Sofia (Clear & Warm)", elevenId: "EXAVITQu4vr4xnSDxMaL" },
  intense:  { rate: 0.9,  pitch: 0.85, label: "🎙️ Chef James (Authoritative)", elevenId: "VR6AewLTigWG4xSOukaG" },
};

// ElevenLabs TTS — realistic voices
let elevenAudioCache = {};
let currentAudio = null;

// ─── VISION PIPELINE CONSTANTS ──────────────────────────────────────
// Sample a frame every 4s — Claude processes discrete images, not video
const VISION_ANALYSIS_INTERVAL = 4000;
// Target resolution for frame sent to API: enough detail, minimal tokens
const FRAME_TARGET_SIZE = 1000;
// JPEG quality — 0.8 is the sweet spot (good quality, small payload)
const FRAME_JPEG_QUALITY = 0.8;
// Blur threshold: skip frames where motion blur is too high
const BLUR_THRESHOLD = 120;
// Change threshold: skip API call if frame hasn't changed enough (0–255 scale, per pixel avg)
const CHANGE_THRESHOLD = 8;
// Fallback timeout: if API takes longer than this, show local hint
const API_TIMEOUT_MS = 4000;

// ─── FRAME PROCESSING UTILITIES ─────────────────────────────────────

/**
 * Resize + compress a canvas frame to FRAME_TARGET_SIZE × FRAME_TARGET_SIZE
 * and return base64 JPEG at FRAME_JPEG_QUALITY.
 * This cuts token cost drastically vs raw 4K frames.
 */
function processFrame(sourceCanvas) {
  const out = document.createElement("canvas");
  const sw = sourceCanvas.width;
  const sh = sourceCanvas.height;
  // Maintain aspect ratio, fit within FRAME_TARGET_SIZE
  const scale = Math.min(FRAME_TARGET_SIZE / sw, FRAME_TARGET_SIZE / sh, 1);
  out.width = Math.round(sw * scale);
  out.height = Math.round(sh * scale);
  const ctx = out.getContext("2d");
  // Boost brightness/contrast to handle dim kitchens
  ctx.filter = "brightness(1.08) contrast(1.05)";
  ctx.drawImage(sourceCanvas, 0, 0, out.width, out.height);
  return out.toDataURL("image/jpeg", FRAME_JPEG_QUALITY).split(",")[1];
}

/**
 * Laplacian-variance blur detection.
 * Returns a variance score — lower = blurrier. < BLUR_THRESHOLD = skip.
 */
function measureBlur(canvas) {
  const ctx = canvas.getContext("2d");
  const { width, height } = canvas;
  const imageData = ctx.getImageData(0, 0, width, height);
  const d = imageData.data;
  // Sample a centre strip for speed
  const cx = Math.floor(width / 2);
  const cy = Math.floor(height / 2);
  const r = Math.min(cx, cy, 80);
  let sum = 0, count = 0;
  for (let y = cy - r; y < cy + r; y += 2) {
    for (let x = cx - r; x < cx + r; x += 2) {
      const i = (y * width + x) * 4;
      const gray = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
      sum += gray;
      count++;
    }
  }
  const mean = sum / count;
  let variance = 0;
  for (let y = cy - r; y < cy + r; y += 2) {
    for (let x = cx - r; x < cx + r; x += 2) {
      const i = (y * width + x) * 4;
      const gray = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
      variance += (gray - mean) ** 2;
    }
  }
  return variance / count;
}

/**
 * Returns the average per-pixel difference between two base64 JPEG strings.
 * Used for change detection — if the frame hasn't changed much, skip the API call.
 */
function measureFrameChange(prevB64, currCanvas) {
  if (!prevB64) return 255; // first frame always processes
  try {
    const ctx = currCanvas.getContext("2d");
    const curr = ctx.getImageData(0, 0, Math.min(currCanvas.width, 160), Math.min(currCanvas.height, 90));
    // We can't easily decode the prev b64 back; use a lightweight pixel sample instead
    // Store the last sampled pixels in a module-level ref — handled in the component
    return 255;
  } catch {
    return 255;
  }
}
const DIFFICULTY_COLORS = {
  Easy: {
    bg: "bg-emerald-900/30",
    text: "text-emerald-400",
    border: "border-emerald-700/50",
    dot: "bg-emerald-400",
  },
  Medium: {
    bg: "bg-amber-900/30",
    text: "text-amber-400",
    border: "border-amber-700/50",
    dot: "bg-amber-400",
  },
  Hard: {
    bg: "bg-rose-900/30",
    text: "text-rose-400",
    border: "border-rose-700/50",
    dot: "bg-rose-400",
  },
};

// ─── Image System (Wikipedia API - CORS safe, free, no auth) ────────────────
// Wikipedia's REST API returns CORS-safe image URLs for any food article
// Format: https://en.wikipedia.org/api/rest_v1/page/summary/{term}

const WIKI_SEARCH_TERMS = {
  "Tonkotsu Ramen":"Tonkotsu_ramen",
  "Peking Duck Pancakes":"Peking_duck",
  "Korean Bibimbap":"Bibimbap",
  "Xiao Long Bao":"Xiaolongbao",
  "Japanese Yakitori":"Yakitori",
  "Kimchi Jjigae":"Kimchi-jjigae",
  "Chinese Mapo Tofu":"Mapo_tofu",
  "Japchae Glass Noodles":"Japchae",
  "Har Gow Shrimp Dumplings":"Har_gow",
  "Japanese Mochi Ice Cream":"Mochi_ice_cream",
  "Authentic Pad Thai":"Pad_thai",
  "Vietnamese Pho Bo":"Pho",
  "Nasi Goreng":"Nasi_goreng",
  "Tom Yum Goong":"Tom_yum",
  "Malaysian Laksa":"Laksa",
  "Vietnamese Bánh Mì":"Bánh_mì",
  "Beef Rendang":"Rendang",
  "Pad See Ew":"Pad_see_ew",
  "Mango Sticky Rice":"Mango_sticky_rice",
  "Chicken Satay":"Satay",
  "Butter Chicken":"Butter_chicken",
  "Hyderabadi Biryani":"Hyderabadi_biryani",
  "Dal Makhani":"Dal_makhani",
  "Saag Paneer":"Saag_paneer",
  "Lamb Rogan Josh":"Rogan_josh",
  "Chole Bhature":"Chole_bhature",
  "Sri Lankan Fish Curry":"Sri_Lankan_cuisine",
  "Gulab Jamun":"Gulab_jamun",
  "Seekh Kebab":"Seekh_kebab",
  "Mango Lassi":"Lassi",
  "Beirut-Style Hummus":"Hummus",
  "Lamb Shawarma":"Shawarma",
  "Turkish Köfte":"Köfte",
  "Persian Ghormeh Sabzi":"Ghormeh_sabzi",
  "Falafel with Tahini":"Falafel",
  "Shakshuka":"Shakshouka",
  "Mujaddara":"Mujaddara",
  "Turkish Baklava":"Baklava",
  "Za'atar Manakeesh":"Manakish",
  "Lamb Kabsa":"Kabsa",
  "Spaghetti Carbonara":"Carbonara",
  "Greek Moussaka":"Moussaka",
  "Paella Valenciana":"Paella",
  "Mushroom Risotto":"Risotto",
  "Greek Spanakopita":"Spanakopita",
  "Spanish Gazpacho":"Gazpacho",
  "Italian Tiramisù":"Tiramisu",
  "Grilled Octopus":"Octopus_as_food",
  "Bouillabaisse":"Bouillabaisse",
  "Panna Cotta":"Panna_cotta",
  "Beef Bourguignon":"Beef_bourguignon",
  "German Sauerbraten":"Sauerbraten",
  "Beef Wellington":"Beef_Wellington",
  "French Onion Soup":"French_onion_soup",
  "Belgian Moules Frites":"Moules-frites",
  "Crêpes Suzette":"Crêpes_Suzette",
  "Wiener Schnitzel":"Wiener_Schnitzel",
  "Scottish Cullen Skink":"Cullen_skink",
  "Spanish Churros":"Churros",
  "Welsh Cawl":"Cawl",
  "Birria Tacos":"Birria",
  "Brazilian Feijoada":"Feijoada",
  "Peruvian Ceviche":"Ceviche",
  "Oaxacan Mole Negro":"Mole_sauce",
  "Argentine Empanadas":"Empanada",
  "Colombian Arepas":"Arepa",
  "Peruvian Lomo Saltado":"Lomo_saltado",
  "Venezuelan Pabellón":"Pabellón_criollo",
  "Mexican Pozole Rojo":"Pozole",
  "Dulce de Leche Churros":"Dulce_de_leche",
  "Moroccan Lamb Tagine":"Tajine",
  "Egyptian Koshari":"Kushari",
  "Tunisian Brik":"Brik_(food)",
  "Moroccan Bastilla":"Bastilla",
  "Algerian Chorba":"Chorba",
  "Moroccan Harira":"Harira",
  "Egyptian Ful Medames":"Ful_medames",
  "Tunisian Merguez Couscous":"Couscous",
  "Libyan Sharba":"Harira",
  "Moroccan Chicken Pastilla":"Bastilla",
  "Injera with Doro Wat":"Doro_wat",
  "West African Jollof Rice":"Jollof_rice",
  "South African Bunny Chow":"Bunny_chow",
  "Ghanaian Groundnut Soup":"Groundnut_soup",
  "Kenyan Nyama Choma":"Nyama_choma",
  "Senegalese Thieboudienne":"Thieboudienne",
  "Nigerian Egusi Soup":"Egusi",
  "Cape Malay Bobotie":"Bobotie",
  "Zimbabwean Sadza":"Ugali",
  "Ethiopian Tibs":"Tibs",
  "Louisiana Gumbo":"Gumbo",
  "New England Clam Chowder":"Clam_chowder",
  "Texas BBQ Brisket":"Brisket",
  "Eggs Benedict":"Eggs_Benedict",
  "Maple Pecan Pie":"Pecan_pie",
  "New England Lobster Roll":"Lobster_roll",
  "Nashville Hot Chicken":"Nashville_hot_chicken",
  "Canadian Poutine":"Poutine",
  "Southern Biscuits and Gravy":"Biscuits_and_gravy",
  "Maple Glazed Salmon":"Salmon_as_food",
};

const REGION_GRADIENTS = {
  "east-asia":      "linear-gradient(135deg,#7f1d1d 0%,#1c1917 100%)",
  "southeast-asia": "linear-gradient(135deg,#14532d 0%,#1c1917 100%)",
  "south-asia":     "linear-gradient(135deg,#78350f 0%,#1c1917 100%)",
  "middle-east":    "linear-gradient(135deg,#4c1d95 0%,#1c1917 100%)",
  "mediterranean":  "linear-gradient(135deg,#1e3a5f 0%,#1c1917 100%)",
  "western-europe": "linear-gradient(135deg,#3b1f0a 0%,#1c1917 100%)",
  "latin-america":  "linear-gradient(135deg,#7f1d1d 0%,#1c1917 100%)",
  "north-africa":   "linear-gradient(135deg,#7c2d12 0%,#1c1917 100%)",
  "sub-saharan":    "linear-gradient(135deg,#14532d 0%,#1c1917 100%)",
  "north-america":  "linear-gradient(135deg,#1e3a5f 0%,#1c1917 100%)",
};

const wikiCache = {};
const wikiPending = {};

function fetchWikiImage(recipeName) {
  if (wikiCache[recipeName] !== undefined) return Promise.resolve(wikiCache[recipeName]);
  if (wikiPending[recipeName]) return wikiPending[recipeName];
  const term = WIKI_SEARCH_TERMS[recipeName];
  if (!term) { wikiCache[recipeName] = null; return Promise.resolve(null); }
  const p = fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(term)}`,
    { headers: { Accept: "application/json" } }
  )
    .then(r => r.json())
    .then(d => {
      const url = d?.thumbnail?.source || d?.originalimage?.source || null;
      // Upgrade to larger size
      const big = url ? url.replace(/\/\d+px-/, "/600px-") : null;
      wikiCache[recipeName] = big;
      return big;
    })
    .catch(() => { wikiCache[recipeName] = null; return null; });
  wikiPending[recipeName] = p;
  return p;
}

function getTagEmoji(recipe) {
  const t = [...(recipe.tags||[]), getRecipeCuisine(recipe)].join(" ").toLowerCase();
  if (t.includes("ramen")||t.includes("noodle")||t.includes("pasta")) return "🍜";
  if (t.includes("soup")||t.includes("stew")||t.includes("chowder")) return "🍲";
  if (t.includes("rice")||t.includes("biryani")||t.includes("risotto")) return "🍚";
  if (t.includes("taco")||t.includes("wrap")) return "🌮";
  if (t.includes("sandwich")||t.includes("roll")||t.includes("bun")) return "🥪";
  if (t.includes("dessert")||t.includes("sweet")||t.includes("pie")||t.includes("baklava")||t.includes("mochi")) return "🍰";
  if (t.includes("dumpling")||t.includes("dim sum")) return "🥟";
  if (t.includes("seafood")||t.includes("fish")||t.includes("shrimp")||t.includes("lobster")) return "🦞";
  if (t.includes("chicken")||t.includes("satay")||t.includes("yakitori")) return "🍗";
  if (t.includes("beef")||t.includes("steak")||t.includes("brisket")) return "🥩";
  if (t.includes("lamb")||t.includes("kebab")||t.includes("shawarma")) return "🍖";
  if (t.includes("vegetarian")||t.includes("falafel")) return "🥗";
  if (t.includes("bread")||t.includes("pastry")||t.includes("churro")) return "🥖";
  if (t.includes("egg")) return "🍳";
  if (t.includes("drink")||t.includes("lassi")) return "🥤";
  if (t.includes("curry")||t.includes("masala")) return "🍛";
  if (t.includes("bbq")||t.includes("grilled")||t.includes("smoked")) return "🍖";
  return "🍽️";
}

function RecipeImage({ recipe, style, onMouseEnter, onMouseLeave }) {
  const [src, setSrc] = React.useState(() => wikiCache[recipe.name] ?? "loading");
  const [imgError, setImgError] = React.useState(false);

  React.useEffect(() => {
    let live = true;
    if (wikiCache[recipe.name] !== undefined) { setSrc(wikiCache[recipe.name]); return; }
    setSrc("loading"); setImgError(false);
    fetchWikiImage(recipe.name).then(url => { if (live) setSrc(url); });
    return () => { live = false; };
  }, [recipe.name]);

  const gradient = REGION_GRADIENTS[recipe.region] || "linear-gradient(135deg,#292524,#1c1917)";

  if (src === "loading") {
    return (
      <div style={{ ...style, background: gradient, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <div style={{
          width:30, height:30,
          border:"2px solid rgba(255,255,255,0.08)",
          borderTopColor:"rgba(255,255,255,0.45)",
          borderRadius:"50%",
          animation:"wikiSpin 0.75s linear infinite",
        }}/>
      </div>
    );
  }

  if (!src || imgError) {
    return (
      <div style={{ ...style, background: gradient, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:8 }}>
        <span style={{ fontSize:54, filter:"drop-shadow(0 4px 12px rgba(0,0,0,0.6))" }}>{getTagEmoji(recipe)}</span>
        <span style={{ fontSize:10, color:"rgba(255,255,255,0.28)", letterSpacing:"0.14em", textTransform:"uppercase" }}>{getRecipeCuisine(recipe)}</span>
      </div>
    );
  }

  return (
    <img src={src} alt={recipe.name} style={style}
      onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}
      onError={() => { wikiCache[recipe.name] = null; setImgError(true); }}
    />
  );
}

// Inject spinner CSS once
(() => {
  if (document.getElementById("wiki-img-spin")) return;
  const s = document.createElement("style");
  s.id = "wiki-img-spin";
  s.textContent = "@keyframes wikiSpin{to{transform:rotate(360deg)}}";
  document.head.appendChild(s);
})();

// ── Phone Camera Streamer Page (shown when ?peer=ID in URL) ─────────────────
function PhoneCameraStreamer({ peerId }) {
  const videoRef = React.useRef(null);
  const [status, setStatus] = React.useState("loading");
  const [errMsg, setErrMsg] = React.useState("");

  React.useEffect(() => {
    let peer;
    const init = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        });
        if (videoRef.current) { videoRef.current.srcObject = stream; videoRef.current.play().catch(()=>{}); }
        const loadPeer = () => {
          peer = new window.Peer(undefined, { host: "0.peerjs.com", port: 443, secure: true, path: "/" });
          peer.on("open", () => {
            setStatus("connecting");
            const call = peer.call(peerId, stream);
            call.on("stream", () => setStatus("streaming"));
            call.on("close", () => { setStatus("error"); setErrMsg("Laptop disconnected."); });
            call.on("error", () => { setStatus("error"); setErrMsg("Connection lost."); });
            setStatus("streaming");
          });
          peer.on("error", (e) => { setStatus("error"); setErrMsg(e.message); });
        };
        if (window.Peer) { loadPeer(); return; }
        const s = document.createElement("script");
        s.src = "https://unpkg.com/peerjs@1.5.4/dist/peerjs.min.js";
        s.onload = loadPeer;
        s.onerror = () => { setStatus("error"); setErrMsg("Failed to load connection library."); };
        document.head.appendChild(s);
      } catch { setStatus("error"); setErrMsg("Camera access denied. Please allow camera permissions."); }
    };
    init();
    return () => { peer?.destroy(); };
  }, [peerId]);

  const statusConfig = {
    loading:    { color: "#78716c", dot: "#78716c", msg: "Starting camera..." },
    connecting: { color: "#f59e0b", dot: "#f59e0b", msg: "Connecting to laptop..." },
    streaming:  { color: "#22c55e", dot: "#22c55e", msg: "Live — streaming to laptop. Keep screen on!" },
    error:      { color: "#f87171", dot: "#f87171", msg: errMsg || "Something went wrong." },
  }[status] || {};

  return (
    <div style={{ minHeight:"100vh", background:"#0c0a09", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"2rem", fontFamily:"Georgia,serif", color:"#fff", textAlign:"center" }}>
      <div style={{ fontSize:"1.6rem", fontWeight:700, marginBottom:"0.4rem" }}>ChefAI <span style={{color:"#f59e0b"}}>Vision</span></div>
      <div style={{ fontSize:"0.8rem", color:"#57534e", marginBottom:"2rem", letterSpacing:"0.1em", textTransform:"uppercase" }}>Phone Camera</div>
      <div style={{ width:"100%", maxWidth:380, borderRadius:16, overflow:"hidden", border:`2px solid ${statusConfig.dot}44`, marginBottom:"1.5rem", background:"#000", minHeight:200 }}>
        <video ref={videoRef} autoPlay playsInline muted style={{ width:"100%", display:"block" }} />
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:8, fontSize:"0.85rem", color:statusConfig.color, marginBottom:"1rem" }}>
        <div style={{ width:10, height:10, borderRadius:"50%", background:statusConfig.dot, flexShrink:0, ...(status==="connecting"||status==="streaming" ? {animation:"pulse 1.5s infinite"} : {}) }} />
        {statusConfig.msg}
      </div>
      {status === "streaming" && (
        <div style={{ fontSize:"0.72rem", color:"#44403c", maxWidth:300, lineHeight:1.7 }}>
          Keep this tab open and your phone pointed at the cooking area.<br/>Your laptop app is analyzing the feed in real time.
        </div>
      )}
      {status === "error" && (
        <div style={{ fontSize:"0.75rem", color:"#57534e", marginTop:"0.5rem" }}>Close this tab and scan the QR code again from the laptop.</div>
      )}
    </div>
  );
}

export default function CookingAssistant() {
  const urlPeer = new URLSearchParams(window.location.search).get("peer");
  if (urlPeer) return <PhoneCameraStreamer peerId={urlPeer} />;

  // Detect mobile device
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;

  const [view, setView] = useState("home");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [activeRegion, setActiveRegion] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [visionEnabled, setVisionEnabled] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [visionInsights, setVisionInsights] = useState([]);
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [detectedIngredients, setDetectedIngredients] = useState([]);
  const [cookingState, setCookingState] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState("");
  const [voiceCommand, setVoiceCommand] = useState("");
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [micListening, setMicListening] = useState(false);
  const [micError, setMicError] = useState("");
  const [lastHeard, setLastHeard] = useState("");
  const recognitionRef = React.useRef(null);
  const [selectedVoice, setSelectedVoice] = useState("classic");
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  // Camera source state: "phone" | "laptop" | "wifi"
  const [cameraSource, setCameraSource] = useState("phone");
  const [wifiCameras, setWifiCameras] = useState([
    { id: 1, name: "Kitchen Cam", url: "", active: false },
  ]);
  const [activeWifiCam, setActiveWifiCam] = useState(null);
  const [showCameraManager, setShowCameraManager] = useState(false);
  const [wifiCamError, setWifiCamError] = useState("");
  const [newCamName, setNewCamName] = useState("");
  const [newCamUrl, setNewCamUrl] = useState("");
  // Phone camera (WebRTC peer) state
  const [phoneConnected, setPhoneConnected] = useState(false);
  const [phonePeerId, setPhonePeerId] = useState("");   // laptop's own peer ID (for QR)
  const [showQR, setShowQR] = useState(false);
  const [phoneStatus, setPhoneStatus] = useState("idle"); // idle | waiting | connected | error
  const peerInstanceRef = useRef(null);
  const phoneStreamRef = useRef(null);

  // Streaming + context state
  const [streamingText, setStreamingText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [backendStatus, setBackendStatus] = useState({
    loading: true,
    connected: false,
    anthropicConfigured: false,
    elevenLabsConfigured: false,
    error: "",
  });


  useEffect(() => {
    let cancelled = false;

    const checkBackend = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/health`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (!cancelled) {
          setBackendStatus({
            loading: false,
            connected: true,
            anthropicConfigured: Boolean(data?.services?.anthropicConfigured),
            elevenLabsConfigured: Boolean(data?.services?.elevenLabsConfigured),
            error: "",
          });
        }
      } catch (error) {
        if (!cancelled) {
          setBackendStatus({
            loading: false,
            connected: false,
            anthropicConfigured: false,
            elevenLabsConfigured: false,
            error: error?.message || "Unable to reach backend.",
          });
        }
      }
    };

    checkBackend();
    return () => {
      cancelled = true;
    };
  }, []);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const analysisIntervalRef = useRef(null);
  const lastAnalysisRef = useRef(0);
  const wifiImgRef = useRef(null);
  const phoneVideoRef = useRef(null);  // <video> that shows phone stream on laptop
  // Pixel fingerprint of last frame for change detection
  const lastPixelSampleRef = useRef(null);
  // AbortController for in-flight API calls
  const abortControllerRef = useRef(null);

  // Initialize PeerJS and wait for phone to call in (laptop mode)
  const initPhonePeer = useCallback(() => {
    if (peerInstanceRef.current) return;
    const loadPeer = () => {
      const peer = new window.Peer(undefined, {
        host: "0.peerjs.com", port: 443, secure: true, path: "/",
      });
      peerInstanceRef.current = peer;
      peer.on("open", (id) => {
        setPhonePeerId(id);
        setPhoneStatus("waiting");
      });
      peer.on("call", (call) => {
        call.answer(); // answer with no stream — we only receive
        call.on("stream", (remoteStream) => {
          if (phoneVideoRef.current) {
            phoneVideoRef.current.srcObject = remoteStream;
            phoneVideoRef.current.play().catch(() => {});
          }
          phoneStreamRef.current = remoteStream;
          setPhoneConnected(true);
          setPhoneStatus("connected");
          setCameraActive(true);
          setCameraError("");
        });
        call.on("close", () => {
          setPhoneConnected(false);
          setPhoneStatus("waiting");
          setCameraActive(false);
        });
      });
      peer.on("error", () => setPhoneStatus("error"));
    };
    if (window.Peer) { loadPeer(); return; }
    const s = document.createElement("script");
    s.src = "https://unpkg.com/peerjs@1.5.4/dist/peerjs.min.js";
    s.onload = loadPeer;
    document.head.appendChild(s);
  }, []);

  const startCamera = useCallback(async () => {
    if (cameraSource === "phone") {
      if (isMobile) {
        // On mobile: use phone camera directly — no WebRTC needed
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: { ideal: "environment" }, width: { ideal: 1280 }, height: { ideal: 720 } },
            audio: false,
          });
          if (phoneVideoRef.current) {
            phoneVideoRef.current.srcObject = stream;
            phoneVideoRef.current.play().catch(() => {});
          }
          setCameraActive(true);
          setCameraError("");
        } catch {
          setCameraError("Camera access denied. Please allow camera permissions.");
          setCameraActive(false);
        }
      } else {
        // On desktop: stream phone TO laptop via WebRTC QR pairing
        setShowQR(true);
        initPhonePeer();
      }
      return;
    }
    if (cameraSource === "wifi") {
      if (!activeWifiCam) {
        setCameraError("No WiFi camera selected. Add one below.");
        return;
      }
      setCameraActive(true);
      setCameraError("");
      return;
    }
    // "laptop" — use laptop's own webcam
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
        setCameraError("");
      }
    } catch {
      setCameraError("Camera access denied. Allow permissions to enable AI vision.");
      setCameraActive(false);
    }
  }, [cameraSource, activeWifiCam, initPhonePeer]);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
    if (phoneVideoRef.current?.srcObject) {
      phoneVideoRef.current.srcObject.getTracks().forEach((t) => t.stop());
      phoneVideoRef.current.srcObject = null;
    }
    if (peerInstanceRef.current) {
      peerInstanceRef.current.destroy();
      peerInstanceRef.current = null;
    }
    // Stop mic when leaving cooking — use stopMicListening so the intentional-stop
    // flag is set and onend does NOT trigger an unwanted restart
    stopMicListening();
    setPhoneConnected(false);
    setPhoneStatus("idle");
    setShowQR(false);
    setCameraActive(false);
    setVisionEnabled(false);
  }, []);

  const connectWifiCamera = useCallback((cam) => {
    setActiveWifiCam(cam);
    setCameraSource("wifi");
    setWifiCamError("");
    setCameraActive(true);
    setCameraError("");
  }, []);

  const addWifiCamera = useCallback(() => {
    if (!newCamName.trim() || !newCamUrl.trim()) {
      setWifiCamError("Please enter both a name and a stream URL.");
      return;
    }
    const newCam = { id: Date.now(), name: newCamName.trim(), url: newCamUrl.trim(), active: false };
    setWifiCameras((prev) => [...prev, newCam]);
    setNewCamName("");
    setNewCamUrl("");
    setWifiCamError("");
    connectWifiCamera(newCam);
  }, [newCamName, newCamUrl, connectWifiCamera]);

  const removeWifiCamera = useCallback((id) => {
    setWifiCameras((prev) => prev.filter((c) => c.id !== id));
    if (activeWifiCam?.id === id) {
      setActiveWifiCam(null);
      setCameraActive(false);
      setVisionEnabled(false);
    }
  }, [activeWifiCam]);

  // ─── CAPTURE: draw video/wifi/phone frame into hidden canvas ───────
  const captureFrame = useCallback(() => {
    if (!canvasRef.current) return null;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (cameraSource === "wifi" && wifiImgRef.current) {
      const img = wifiImgRef.current;
      canvas.width = img.naturalWidth || 640;
      canvas.height = img.naturalHeight || 360;
      try { ctx.drawImage(img, 0, 0, canvas.width, canvas.height); }
      catch { return null; }
    } else if (cameraSource === "phone" && phoneVideoRef.current) {
      const video = phoneVideoRef.current;
      if (!video.videoWidth) return null;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    } else if (videoRef.current) {
      const video = videoRef.current;
      if (!video.videoWidth) return null;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    } else {
      return null;
    }
    return canvas;
  }, [cameraSource]);

  // ─── PIXEL SAMPLE for cheap change detection ────────────────────────
  const samplePixels = useCallback((canvas) => {
    const ctx = canvas.getContext("2d");
    const step = Math.max(1, Math.floor(canvas.width / 32));
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const samples = [];
    for (let y = 0; y < canvas.height; y += step * 4) {
      for (let x = 0; x < canvas.width; x += step) {
        const i = (y * canvas.width + x) * 4;
        samples.push((data[i] + data[i+1] + data[i+2]) / 3);
      }
    }
    return samples;
  }, []);

  // ─── MAIN VISION ANALYSIS with streaming SSE ────────────────────────
  const analyzeCurrentFrame = useCallback(async () => {
    if (!visionEnabled || !cameraActive || !selectedRecipe) return;
    const now = Date.now();
    if (now - lastAnalysisRef.current < VISION_ANALYSIS_INTERVAL) return;
    lastAnalysisRef.current = now;

    // 1. Capture raw frame into canvas
    const rawCanvas = captureFrame();
    if (!rawCanvas) return;

    // 2. Blur detection — skip blurry/motion frames
    const blurScore = measureBlur(rawCanvas);
    if (blurScore < BLUR_THRESHOLD) {
      console.log(`[Vision] Skipping blurry frame (score: ${blurScore.toFixed(0)})`);
      return;
    }

    // 3. Change detection — skip if scene hasn't changed enough
    const currentSample = samplePixels(rawCanvas);
    if (lastPixelSampleRef.current) {
      const diff = currentSample.reduce((acc, v, i) =>
        acc + Math.abs(v - lastPixelSampleRef.current[i]), 0) / currentSample.length;
      if (diff < CHANGE_THRESHOLD) {
        console.log(`[Vision] Skipping unchanged frame (diff: ${diff.toFixed(1)})`);
        return;
      }
    }
    lastPixelSampleRef.current = currentSample;

    // 4. Pre-process: resize to ≤1000px, JPEG @ 80%
    const base64Data = processFrame(rawCanvas);

    setIsAnalyzing(true);
    setIsStreaming(true);
    setStreamingText("");

    const step = selectedRecipe.steps[currentStep];

    // 5. Build system prompt with cache_control (stable across calls in same session)
    const systemPrompt = `You are a calm, expert kitchen coach watching cooking in real-time via camera.
You are helping cook: ${selectedRecipe.name} (${getRecipeCuisine(selectedRecipe)} cuisine)
Total steps: ${selectedRecipe.steps.length}
Ingredients: ${selectedRecipe.ingredients?.map(i => typeof i === 'object' ? `${i.amount} ${i.name}` : i).join(", ")}

RESPONSE FORMAT — always respond in exactly this structure, no extra prose:
OBSERVATION: [one sentence describing exactly what you see in the image]
STATE: [current cooking state in 3-5 words, e.g. "onions turning translucent"]
STATUS: [ON_TRACK | NEEDS_ATTENTION | ADJUST_NOW]
ACTION: [single specific instruction, max 12 words]
WARNING: [safety issue if any, or "none"]

Be concise — the user has their hands full and will hear this via text-to-speech.
Always prioritize safety over completion speed.`;

    // 6. Build user message with image FIRST (Anthropic best practice)
    const userMessage = {
      role: "user",
      content: [
        {
          type: "image",
          source: { type: "base64", media_type: "image/jpeg", data: base64Data },
        },
        {
          type: "text",
          text: `Step ${currentStep + 1}/${selectedRecipe.steps.length}: ${step.text}
Target appearance: ${step.visualCues?.join(", ")}
Checkpoints to reach: ${step.checkpoints?.join(", ")}
Step time elapsed: ${Math.round((Date.now() - lastAnalysisRef.current) / 1000)}s

What do you see? Am I on track for this step?`,
        },
      ],
    };

    // 7. Include last 2 turns for context continuity
    const historySlice = conversationHistory.slice(-4); // last 2 user+assistant pairs

    // 8. Local fallback: if API takes > API_TIMEOUT_MS, show a helpful hint
    const fallbackHint = step.checkpoints?.[0]
      ? `Keep going — watching for: ${step.checkpoints[0]}`
      : step.text;

    const fallbackTimer = setTimeout(() => {
      if (isAnalyzing) {
        setStreamingText(fallbackHint);
        setAiSuggestion(fallbackHint);
        if (voiceEnabled) speakText(fallbackHint);
      }
    }, API_TIMEOUT_MS);

    // 9. Cancel any previous in-flight request
    if (abortControllerRef.current) abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();

    let fullResponse = "";

    try {
      const response = await fetch(`${API_BASE_URL}/api/vision/analyze`, {
        method: "POST",
        signal: abortControllerRef.current.signal,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          max_tokens: 300,
          stream: true,
          // Prompt caching — system prompt is stable per session; cache it
          system: [
            {
              type: "text",
              text: systemPrompt,
              cache_control: { type: "ephemeral" },
            },
          ],
          messages: [
            ...historySlice,
            userMessage,
          ],
        }),
      });

      clearTimeout(fallbackTimer);

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`API error ${response.status}: ${errText}`);
      }

      // 10. Stream SSE — pipe tokens to UI as they arrive
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") break;
          try {
            const evt = JSON.parse(json);
            if (evt.type === "content_block_delta" && evt.delta?.type === "text_delta") {
              fullResponse += evt.delta.text;
              setStreamingText(fullResponse);
            }
          } catch { /* partial JSON, continue */ }
        }
      }

      // 11. Parse the completed response
      parseAIResponse(fullResponse);
      setCurrentAnalysis({ timestamp: new Date().toISOString(), step: currentStep, response: fullResponse });
      setVisionInsights((prev) => [
        { time: new Date().toLocaleTimeString(), step: currentStep + 1, analysis: fullResponse },
        ...prev.slice(0, 9),
      ]);

      // 12. Update conversation history (keep last 2 pairs = 4 messages)
      setConversationHistory((prev) => [
        ...prev.slice(-3),
        userMessage,
        { role: "assistant", content: fullResponse },
      ]);

    } catch (err) {
      clearTimeout(fallbackTimer);
      if (err.name === "AbortError") return;
      console.error("[Vision] API error:", err);
      // Show local fallback on error
      setStreamingText(fallbackHint);
      setAiSuggestion(fallbackHint);
      if (voiceEnabled) speakText(fallbackHint);
    } finally {
      setIsAnalyzing(false);
      setIsStreaming(false);
    }
  }, [visionEnabled, cameraActive, selectedRecipe, currentStep, captureFrame, samplePixels,
      conversationHistory, voiceEnabled]);

  const parseAIResponse = (text) => {
    // OBSERVATION: what the model sees
    const m0 = text.match(/OBSERVATION:\s*(.+?)(?=STATE:|$)/is);
    // STATE: cooking state
    const m2 = text.match(/STATE:\s*(.+?)(?=STATUS:|$)/is);
    if (m2) setCookingState(m2[1].trim());
    // ACTION: the key instruction (was NEXT/RECOMMENDATION)
    const m3 = text.match(/ACTION:\s*(.+?)(?=WARNING:|$)/is);
    if (m3) {
      const s = m3[1].trim();
      setAiSuggestion(s);
      if (voiceEnabled && s) speakText(s);
    }
    // STATUS: ON_TRACK | NEEDS_ATTENTION | ADJUST_NOW
    const statusMatch = text.match(/STATUS:\s*(ON_TRACK|NEEDS_ATTENTION|ADJUST_NOW)/i);
    // WARNING: safety alerts
    const m4 = text.match(/WARNING:\s*(.+?)$/is);
    if (m4 && m4[1].toLowerCase() !== "none" && m4[1].length > 3 && voiceEnabled)
      speakText(`Warning: ${m4[1].trim()}`);
    // Legacy support for old INGREDIENTS format
    const m1 = text.match(/INGREDIENTS?:\s*(.+?)(?=STATE:|OBSERVATION:|$)/is);
    if (m1) setDetectedIngredients(m1[1].trim().split(",").map((i) => i.trim()));
    return statusMatch?.[1] || null;
  };

  useEffect(() => {
    if (visionEnabled && cameraActive) {
      analysisIntervalRef.current = setInterval(
        analyzeCurrentFrame,
        VISION_ANALYSIS_INTERVAL,
      );
      analyzeCurrentFrame();
    }
    return () => {
      if (analysisIntervalRef.current)
        clearInterval(analysisIntervalRef.current);
    };
  }, [visionEnabled, cameraActive, analyzeCurrentFrame]);

  useEffect(() => {
    let interval;
    if (timerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setTimerActive(false);
            if (voiceEnabled) speakText("Timer complete!");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeRemaining, voiceEnabled]);

  const startTimer = (minutes) => {
    setTimeRemaining(minutes * 60);
    setTimerActive(true);
  };
  const formatTime = (seconds) =>
    `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, "0")}`;

  const speakText = (text, forceSpeak = false) => {
    if (!voiceEnabled && !forceSpeak) return;
    if (!text) return;

    // Stop any currently playing audio
    if (currentAudio) { currentAudio.pause(); currentAudio = null; }
    window.speechSynthesis?.cancel();

    const profile = VOICE_PROFILES[selectedVoice] || VOICE_PROFILES["classic"];

    if (backendStatus.elevenLabsConfigured && profile.elevenId) {
      const cacheKey = profile.elevenId + ":" + text.slice(0, 60);
      if (elevenAudioCache[cacheKey]) {
        const audio = new Audio(elevenAudioCache[cacheKey]);
        currentAudio = audio;
        audio.play().catch(() => fallbackSpeak(text, profile));
        return;
      }
      fetch(`${API_BASE_URL}/api/voice/tts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          voiceId: profile.elevenId,
        }),
      })
        .then(r => r.ok ? r.blob() : Promise.reject())
        .then(blob => {
          const url = URL.createObjectURL(blob);
          elevenAudioCache[cacheKey] = url;
          const audio = new Audio(url);
          currentAudio = audio;
          audio.play().catch(() => fallbackSpeak(text, profile));
        })
        .catch(() => fallbackSpeak(text, profile));
      return;
    }
    fallbackSpeak(text, profile);
  };

  const fallbackSpeak = (text, profile) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    setTimeout(() => {
      const u = new SpeechSynthesisUtterance(text);
      u.rate = profile?.rate || 0.92;
      u.pitch = profile?.pitch || 0.9;
      u.volume = 1;
      const keepAlive = setInterval(() => {
        if (window.speechSynthesis.paused) window.speechSynthesis.resume();
        if (!window.speechSynthesis.speaking) clearInterval(keepAlive);
      }, 5000);
      u.onend = () => clearInterval(keepAlive);
      u.onerror = () => clearInterval(keepAlive);
      window.speechSynthesis.speak(u);
    }, 100);
  };

  const handleVoiceCommand = (cmd) => {
    const c = cmd.toLowerCase().trim();
    setVoiceCommand("");
    setLastHeard(cmd);

    // Natural language matching — understands variations, not just exact keywords
    const matches = (patterns) => patterns.some(p => c.includes(p));

    if (matches(["next step", "next", "continue", "go on", "move on", "what's next", "whats next", "proceed"])) {
      handleNextStep();
      speakText("Moving to the next step.", true);
    }
    else if (matches(["go back", "back", "previous", "last step", "before", "undo"])) {
      handlePreviousStep();
      speakText("Going back to the previous step.", true);
    }
    else if (matches(["repeat", "again", "say that again", "what did you say", "can you repeat", "one more time", "replay", "didn't hear", "didn't catch"])) {
      if (selectedRecipe) speakText(selectedRecipe.steps[currentStep].text, true);
    }
    else if (matches(["start timer", "set timer", "timer", "time it", "start the clock", "begin timer"])) {
      if (selectedRecipe?.steps[currentStep]?.duration) {
        startTimer(selectedRecipe.steps[currentStep].duration);
        speakText(`Timer started for ${selectedRecipe.steps[currentStep].duration} minutes.`, true);
      } else {
        speakText("No timer set for this step.", true);
      }
    }
    else if (matches(["start vision", "start camera", "enable vision", "turn on camera", "activate vision", "watch my cooking"])) {
      if (!cameraActive) startCamera();
      setVisionEnabled(true);
      speakText("Vision analysis activated. I'm watching your cooking.", true);
    }
    else if (matches(["stop vision", "stop camera", "disable vision", "turn off camera"])) {
      setVisionEnabled(false);
      speakText("Vision analysis stopped.", true);
    }
    else if (matches(["analyze", "analyse", "check", "how does it look", "what do you see", "look at this"])) {
      analyzeCurrentFrame();
      speakText("Analysing your cooking now.", true);
    }
    else if (matches(["what step", "which step", "where am i", "what are we doing", "current step"])) {
      if (selectedRecipe) {
        speakText(`You are on step ${currentStep + 1} of ${selectedRecipe.steps.length}. ${selectedRecipe.steps[currentStep].text}`, true);
      }
    }
    else if (matches(["ingredients", "what do i need", "what ingredients", "shopping list"])) {
      if (selectedRecipe) {
        const ingList = selectedRecipe.ingredients.map(i => typeof i === "object" ? `${i.amount} ${i.name}` : i).join(", ");
        speakText(`For ${selectedRecipe.name} you need: ${ingList}`, true);
      }
    }
    else if (matches(["how long", "how much time", "time left", "minutes left", "duration"])) {
      if (selectedRecipe?.steps[currentStep]?.duration) {
        speakText(`This step takes approximately ${selectedRecipe.steps[currentStep].duration} minutes.`, true);
      } else {
        speakText("No specific time for this step — use your judgement.", true);
      }
    }
    else if (matches(["home", "go home", "stop cooking", "exit", "quit", "cancel"])) {
      speakText("Returning to the recipe list.", true);
      setTimeout(() => { setView("home"); stopCamera(); setVisionEnabled(false); }, 1500);
    }
    else if (matches(["help", "what can you do", "commands", "what can i say"])) {
      speakText("You can say: next step, go back, repeat, start timer, check my cooking, what step am I on, how long does this take, or go home.", true);
    }
    else if (c.length > 2) {
      // Unknown command — give helpful feedback
      speakText(`I didn't understand "${cmd}". Try saying: next, repeat, go back, start timer, or help.`, true);
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // ALWAYS-ON MICROPHONE  —  production pattern from the guide
  //
  //   START once → LISTEN forever → RESTART only if ended
  //   NOT: START → STOP → START → STOP (loop)
  //
  // Key insight that makes this work:
  //   • recognitionRef holds the ONE instance. Clearing it to null IS the stop signal.
  //   • onresult NEVER calls stop()/start() — that's what caused the loop.
  //   • onend checks the ref: still set? restart. cleared? stay stopped.
  //   • handleVoiceCmdRef keeps handleVoiceCommand fresh inside onresult without
  //     re-creating the recognition object on every render (fixes stale closure).
  // ─────────────────────────────────────────────────────────────────────────

  // Ref that always points to the latest handleVoiceCommand.
  // This is the fix for the stale-closure problem: useCallback([], []) would
  // freeze the function at first-render values; the ref always has current state.
  const handleVoiceCmdRef = useRef(null);
  useEffect(() => {
    handleVoiceCmdRef.current = handleVoiceCommand;
  }); // no dep array — runs after every render so the ref is always fresh

  const startMicListening = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMicError("Voice recognition not supported in this browser. Use Chrome or Safari.");
      return;
    }

    // ✅ Fix #4 — ONE instance only. If ref exists, we're already listening.
    if (recognitionRef.current) return;

    const recognition = new SpeechRecognition();

    // ✅ Fix #1 — continuous: true keeps the mic alive through silence
    recognition.continuous = true;
    recognition.interimResults = false; // final transcripts only — no partial noise
    recognition.lang = "en-US";
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setMicListening(true);
      setMicError("");
    };

    // ✅ Fix #3 — onend auto-restarts ONLY when the ref is still set.
    // stopMicListening() clears the ref first, so onend sees null and stays stopped.
    // This is the entire stop/restart logic — no extra flags needed.
    recognition.onend = () => {
      setMicListening(false);
      if (recognitionRef.current) {
        setTimeout(() => {
          // Double-check: ref may have been cleared during the timeout window
          if (recognitionRef.current) {
            try {
              recognitionRef.current.start();
            } catch (_) {
              // "already started" — safe to ignore, browser is already running
            }
          }
        }, 300);
      }
    };

    recognition.onerror = (e) => {
      // "no-speech" — browser paused for silence, onend will restart. Normal.
      if (e.error === "no-speech" || e.error === "aborted") return;

      if (e.error === "not-allowed") {
        setMicError("Microphone access denied. Please allow mic permissions and refresh.");
        // Clear ref so onend does NOT restart after a hard permissions block
        recognitionRef.current = null;
        setMicListening(false);
        return;
      }

      // All other transient errors (network, audio-capture, service-not-allowed):
      // leave the ref alone and let onend handle the restart naturally.
    };

    // ✅ Fix #2 — onresult ONLY reads the transcript.
    // NEVER call stop() or start() here — that's the classic loop bug.
    // We use handleVoiceCmdRef.current instead of handleVoiceCommand directly
    // so we always call the freshest version without ever recreating recognition.
    recognition.onresult = (event) => {
      const result = event.results[event.results.length - 1];
      if (result.isFinal) {
        const transcript = result[0].transcript.trim();
        if (transcript && handleVoiceCmdRef.current) {
          handleVoiceCmdRef.current(transcript);
        }
      }
    };

    // Store ref BEFORE start() — onend can fire synchronously in some browsers
    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch (_) {
      recognitionRef.current = null; // failed to start — clear so next call can retry
    }
  }, []); // stable: recognition object is created once, never recreated on re-render

  const stopMicListening = useCallback(() => {
    if (recognitionRef.current) {
      // ✅ Fix #5 — Clear ref FIRST. This is the stop signal onend checks.
      // Calling rec.stop() after means onend fires with null ref → no restart.
      const rec = recognitionRef.current;
      recognitionRef.current = null;
      try { rec.stop(); } catch (_) { /* already stopped — safe to ignore */ }
    }
    setMicListening(false);
  }, []);

  const toggleMic = () => {
    // Use both state AND ref: ref is ground truth, state can lag one render cycle
    if (micListening || recognitionRef.current) stopMicListening();
    else startMicListening();
  };

  const handleStartRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setCurrentStep(0);
    setCompletedSteps([]);
    setVisionInsights([]);
    setCurrentAnalysis(null);
    setAiSuggestion("");
    setStreamingText("");
    setConversationHistory([]);
    lastPixelSampleRef.current = null;
    setVoiceEnabled(true);
    setView("cooking");
    if (recipe.steps[0]?.duration > 0)
      setTimeRemaining(recipe.steps[0].duration * 60);
    if (recipe.steps[0]?.text) {
      setTimeout(() => {
        const intro = `Welcome. Starting ${recipe.name}. Step one: ${recipe.steps[0].text}. Say "help" at any time for voice commands.`;
        speakText(intro, true);
        // Start mic after a short delay so it doesn't pick up the TTS audio
        setTimeout(() => startMicListening(), 2500);
      }, 800);
    }
  };

  const handleNextStep = () => {
    if (!selectedRecipe) return;
    setCompletedSteps((prev) => [...prev, currentStep]);
    if (currentStep < selectedRecipe.steps.length - 1) {
      const next = currentStep + 1;
      setCurrentStep(next);
      setTimerActive(false);
      setStreamingText("");
      lastPixelSampleRef.current = null; // new step = new change baseline
      if (selectedRecipe.steps[next]?.duration > 0)
        setTimeRemaining(selectedRecipe.steps[next].duration * 60);
      if (voiceEnabled) speakText(selectedRecipe.steps[next].text);
    } else {
      setView("complete");
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((p) => p - 1);
      setTimerActive(false);
    }
  };
  const toggleFavorite = (id) =>
    setFavoriteRecipes((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id],
    );

  const filteredRecipes = RECIPES.filter((r) => {
    const search =
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getRecipeCuisine(r).toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const diff =
      difficultyFilter === "all" || r.difficulty === difficultyFilter;
    const region = !activeRegion || r.region === activeRegion;
    return search && diff && region;
  });

  const currentRegion = activeRegion
    ? REGIONS.find((r) => r.id === activeRegion)
    : null;

  // ── HOME SCREEN ──────────────────────────────────────
  if (view === "home")
    return (
      <div
        style={{
          fontFamily: "'Georgia', 'Times New Roman', serif",
          background: "#0c0a09",
          minHeight: "100vh",
          color: "#fff",
        }}
      >
        {/* Header */}
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            background: "rgba(12,10,9,0.85)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            padding: "0 1rem",
          }}
        >
          <div
            style={{
              maxWidth: 1400,
              margin: "0 auto",
              padding: "1rem 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 14,
                  background: "linear-gradient(135deg, #f59e0b, #ea580c)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 20px rgba(234,88,12,0.35)",
                }}
              >
                <ChefHat size={22} color="white" />
              </div>
              <div>
                <div
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                  }}
                >
                  ChefAI <span style={{ color: "#f59e0b" }}>Vision</span>
                </div>
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "#78716c",
                    lineHeight: 1,
                  }}
                >
                  AI-Powered Cooking Guide
                </div>
              </div>
            </div>

            <div
              style={{
                flex: 1,
                maxWidth: 400,
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                background: "rgba(255,255,255,0.05)",
                borderRadius: 50,
                padding: "0.55rem 1.1rem",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <Search size={15} color="#78716c" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 100 recipes by name, cuisine, or tag..."
                style={{
                  background: "none",
                  border: "none",
                  outline: "none",
                  color: "#e7e5e4",
                  fontSize: "0.85rem",
                  width: "100%",
                }}
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.55rem 1.1rem",
                borderRadius: 50,
                border: "1px solid",
                borderColor: showFilters ? "#f59e0b" : "rgba(255,255,255,0.1)",
                background: showFilters
                  ? "rgba(245,158,11,0.15)"
                  : "rgba(255,255,255,0.05)",
                color: showFilters ? "#f59e0b" : "#a8a29e",
                fontSize: "0.82rem",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              <Filter size={14} /> Filters
            </button>
          </div>

          {showFilters && (
            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.06)",
                padding: "0.75rem 0",
              }}
            >
              <div
                style={{
                  maxWidth: 1400,
                  margin: "0 auto",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    color: "#78716c",
                    fontSize: "0.8rem",
                    marginRight: "0.3rem",
                  }}
                >
                  Difficulty:
                </span>
                {["all", "Easy", "Medium", "Hard"].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDifficultyFilter(d)}
                    style={{
                      padding: "0.3rem 0.9rem",
                      borderRadius: 50,
                      border: "1px solid",
                      borderColor:
                        difficultyFilter === d
                          ? "#f59e0b"
                          : "rgba(255,255,255,0.1)",
                      background:
                        difficultyFilter === d
                          ? "rgba(245,158,11,0.2)"
                          : "transparent",
                      color: difficultyFilter === d ? "#f59e0b" : "#a8a29e",
                      fontSize: "0.8rem",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {d === "all" ? "All Levels" : d}
                  </button>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* Hero */}
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            padding: "4rem 1.5rem 2rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              background: "rgba(245,158,11,0.1)",
              border: "1px solid rgba(245,158,11,0.25)",
              borderRadius: 50,
              padding: "0.45rem 1.1rem",
              marginBottom: "1.5rem",
            }}
          >
            <Eye size={14} color="#f59e0b" />
            <span
              style={{ color: "#fcd34d", fontSize: "0.8rem", fontWeight: 600 }}
            >
              Real-Time AI Vision Cooking Assistant
            </span>
          </div>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)",
              fontWeight: 800,
              marginBottom: "1rem",
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
            }}
          >
            100 Recipes from
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #f59e0b, #ea580c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              10 World Regions
            </span>
          </h1>
          <p
            style={{
              color: "#a8a29e",
              fontSize: "1.05rem",
              maxWidth: 540,
              margin: "0 auto 2rem",
              lineHeight: 1.6,
            }}
          >
            AI watches you cook, identifies ingredients, and guides you in
            real-time through every step.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "1.5rem",
            }}
          >
            {[
              ["🌍", "10 Regions"],
              ["📖", "100 Recipes"],
              ["📷", "Vision AI"],
              ["🎤", "Voice Guide"],
              ["⭐", "Step-by-Step"],
            ].map(([icon, label]) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  color: "#78716c",
                  fontSize: "0.85rem",
                }}
              >
                <span>{icon}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Regions */}
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            padding: "0 1.5rem 1.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              marginBottom: "1rem",
            }}
          >
            <Globe size={16} color="#f59e0b" />
            <span
              style={{ fontWeight: 600, color: "#d6d3d1", fontSize: "0.95rem" }}
            >
              Browse by Region
            </span>
          </div>
          <div
            style={{
              display: "flex",
              gap: "0.6rem",
              overflowX: "auto",
              paddingBottom: "0.5rem",
            }}
          >
            <button
              onClick={() => setActiveRegion(null)}
              style={{
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.6rem 1.2rem",
                borderRadius: 12,
                border: "1px solid",
                borderColor: !activeRegion
                  ? "#f59e0b"
                  : "rgba(255,255,255,0.08)",
                background: !activeRegion
                  ? "rgba(245,158,11,0.15)"
                  : "rgba(255,255,255,0.03)",
                color: !activeRegion ? "#f59e0b" : "#a8a29e",
                fontSize: "0.82rem",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s",
              }}
            >
              🌍 All Regions
            </button>
            {REGIONS.map((r) => (
              <button
                key={r.id}
                onClick={() =>
                  setActiveRegion(activeRegion === r.id ? null : r.id)
                }
                style={{
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.6rem 1.2rem",
                  borderRadius: 12,
                  border: "1px solid",
                  borderColor:
                    activeRegion === r.id
                      ? "rgba(255,255,255,0.3)"
                      : "rgba(255,255,255,0.08)",
                  background:
                    activeRegion === r.id
                      ? `linear-gradient(135deg, ${r.color}44, ${r.color}22)`
                      : "rgba(255,255,255,0.03)",
                  color: activeRegion === r.id ? "#fff" : "#a8a29e",
                  fontSize: "0.82rem",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s",
                  fontWeight: activeRegion === r.id ? 600 : 400,
                }}
              >
                <span>{r.emoji}</span>
                <span>{r.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recipe Grid */}
        <div
          style={{ maxWidth: 1400, margin: "0 auto", padding: "0 1.5rem 4rem" }}
        >
          {currentRegion && (
            <div
              style={{
                marginBottom: "1.5rem",
                padding: "1rem 1.5rem",
                borderRadius: 16,
                background: `linear-gradient(135deg, ${currentRegion.color}22, ${currentRegion.color}11)`,
                border: `1px solid ${currentRegion.color}33`,
              }}
            >
              <div style={{ fontWeight: 700, fontSize: "1.2rem" }}>
                {currentRegion.emoji} {currentRegion.name}
              </div>
              <div
                style={{
                  color: "#a8a29e",
                  fontSize: "0.83rem",
                  marginTop: "0.25rem",
                }}
              >
                {currentRegion.cuisines.join(" · ")} · {filteredRecipes.length}{" "}
                recipes
              </div>
            </div>
          )}

          {!currentRegion && (
            <div
              style={{
                color: "#78716c",
                fontSize: "0.83rem",
                marginBottom: "1rem",
              }}
            >
              {filteredRecipes.length} of 100 recipes
            </div>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {filteredRecipes.map((recipe) => {
              const region = REGIONS.find((r) => r.id === recipe.region);
              const diff =
                DIFFICULTY_COLORS[recipe.difficulty] || DIFFICULTY_COLORS.Easy;
              const isFav = favoriteRecipes.includes(recipe.id);
              return (
                <div
                  key={recipe.id}
                  style={{
                    background: "#1c1917",
                    borderRadius: 20,
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.07)",
                    cursor: "pointer",
                    transition: "all 0.25s",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.18)";
                    e.currentTarget.style.boxShadow =
                      "0 20px 40px rgba(0,0,0,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.07)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ position: "relative", overflow: "hidden" }}>
                    <RecipeImage
                      recipe={recipe}
                      style={{
                        width: "100%",
                        height: 180,
                        objectFit: "cover",
                        display: "block",
                        transition: "transform 0.4s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.05)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top, rgba(28,25,23,0.6) 0%, transparent 60%)",
                      }}
                    />

                    <div
                      style={{
                        position: "absolute",
                        top: 10,
                        left: 10,
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        background: region?.color + "dd",
                        backdropFilter: "blur(8px)",
                        borderRadius: 50,
                        padding: "3px 10px",
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        color: "#fff",
                      }}
                    >
                      {region?.emoji} {getRecipeCuisine(recipe)}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(recipe.id);
                      }}
                      style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        width: 32,
                        height: 32,
                        borderRadius: 50,
                        border: "none",
                        background: isFav ? "#e11d48" : "rgba(0,0,0,0.5)",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <Heart size={14} fill={isFav ? "white" : "none"} />
                    </button>
                  </div>

                  <div style={{ padding: "1rem" }}>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: "0.95rem",
                        color: "#e7e5e4",
                        marginBottom: "0.5rem",
                        lineHeight: 1.3,
                      }}
                    >
                      {recipe.name}
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        marginBottom: "0.6rem",
                        flexWrap: "wrap",
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          padding: "2px 8px",
                          borderRadius: 50,
                          background: diff.bg,
                          border: `1px solid`,
                          borderColor: diff.border,
                          color: diff.text,
                          fontSize: "0.72rem",
                          fontWeight: 600,
                        }}
                      >
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: diff.dot,
                            display: "inline-block",
                          }}
                        />
                        {recipe.difficulty}
                      </span>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 3,
                          color: "#78716c",
                          fontSize: "0.75rem",
                        }}
                      >
                        <Clock size={11} /> {recipe.time}
                      </span>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 3,
                          color: "#f59e0b",
                          fontSize: "0.75rem",
                          marginLeft: "auto",
                        }}
                      >
                        <Star size={11} fill="#f59e0b" /> {recipe.rating}
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "0.35rem",
                        flexWrap: "wrap",
                        marginBottom: "0.8rem",
                      }}
                    >
                      {recipe.tags?.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            color: "#a8a29e",
                            fontSize: "0.68rem",
                            padding: "2px 7px",
                            borderRadius: 50,
                            border: "1px solid rgba(255,255,255,0.07)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => handleStartRecipe(recipe)}
                      style={{
                        width: "100%",
                        padding: "0.6rem",
                        borderRadius: 12,
                        border: "none",
                        background: `linear-gradient(135deg, ${region?.color || "#f59e0b"}, ${region?.color + "aa" || "#ea580c"})`,
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: "0.85rem",
                        cursor: "pointer",
                        transition: "opacity 0.2s",
                        fontFamily: "inherit",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.opacity = "0.85")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.opacity = "1")
                      }
                    >
                      Start Cooking →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredRecipes.length === 0 && (
            <div style={{ textAlign: "center", padding: "5rem 0" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🍽️</div>
              <div
                style={{
                  fontSize: "1.2rem",
                  color: "#d6d3d1",
                  marginBottom: "0.5rem",
                }}
              >
                No recipes found
              </div>
              <div style={{ color: "#78716c", marginBottom: "1.5rem" }}>
                Try adjusting your search or filters
              </div>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setDifficultyFilter("all");
                  setActiveRegion(null);
                }}
                style={{
                  padding: "0.6rem 1.5rem",
                  borderRadius: 50,
                  border: "none",
                  background: "#f59e0b",
                  color: "#1c1917",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    );

  // ── COMPLETE SCREEN ──────────────────────────────────
  if (view === "complete")
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0c0a09",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          fontFamily: "Georgia, serif",
          color: "#fff",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: 420 }}>
          <div style={{ fontSize: "5rem", marginBottom: "1.5rem" }}>🎉</div>
          <div
            style={{
              fontSize: "2rem",
              fontWeight: 800,
              color: "#f59e0b",
              marginBottom: "0.5rem",
            }}
          >
            {selectedRecipe?.name}
          </div>
          <div style={{ color: "#a8a29e", marginBottom: "2rem" }}>
            Recipe complete! Bon appétit! 👨‍🍳
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1rem",
              marginBottom: "2rem",
            }}
          >
            {[
              ["✅", selectedRecipe?.steps.length + " Steps", "Completed"],
              ["⏱️", selectedRecipe?.time, "Total Time"],
              ["⭐", selectedRecipe?.rating, "Rating"],
            ].map(([icon, val, label]) => (
              <div
                key={label}
                style={{
                  background: "#1c1917",
                  borderRadius: 16,
                  padding: "1rem",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div style={{ fontSize: "1.5rem", marginBottom: "0.3rem" }}>
                  {icon}
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    marginBottom: "0.2rem",
                  }}
                >
                  {val}
                </div>
                <div style={{ color: "#78716c", fontSize: "0.75rem" }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              setView("home");
              stopCamera();
              setVisionEnabled(false);
            }}
            style={{
              width: "100%",
              padding: "1rem",
              borderRadius: 16,
              border: "none",
              background: "linear-gradient(135deg, #f59e0b, #ea580c)",
              color: "#fff",
              fontWeight: 800,
              fontSize: "1.05rem",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            ← Back to All Recipes
          </button>
        </div>
      </div>
    );

  // ── COOKING SCREEN ───────────────────────────────────
  if (view === "cooking" && selectedRecipe) {
    const region = REGIONS.find((r) => r.id === selectedRecipe.region);
    const totalSteps = selectedRecipe.steps.length;
    const progress = (currentStep / totalSteps) * 100;

    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0c0a09",
          color: "#fff",
          fontFamily: "Georgia, serif",
        }}
      >
        <canvas ref={canvasRef} style={{ display: "none" }} />

        {/* Cooking Header */}
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            background: region?.color + "ee",
            backdropFilter: "blur(20px)",
          }}
        >
          <div
            style={{
              maxWidth: 1400,
              margin: "0 auto",
              padding: "0.75rem 1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <button
              onClick={() => {
                setView("home");
                stopCamera();
                setVisionEnabled(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                background: "rgba(255,255,255,0.15)",
                border: "none",
                color: "#fff",
                padding: "0.4rem 0.8rem",
                borderRadius: 50,
                cursor: "pointer",
                fontSize: "0.8rem",
                fontFamily: "inherit",
              }}
            >
              <Home size={14} /> Recipes
            </button>
            <div style={{ flex: 1, textAlign: "center" }}>
              <div style={{ fontWeight: 700, fontSize: "1rem" }}>
                {selectedRecipe.name}
              </div>
              <div style={{ fontSize: "0.72rem", opacity: 0.8 }}>
                {region?.emoji} {selectedRecipe.cuisine} · Step{" "}
                {currentStep + 1} of {totalSteps}
              </div>
            </div>
            <button
              onClick={() => {
                const newVal = !voiceEnabled;
                setVoiceEnabled(newVal);
                if (newVal && selectedRecipe?.steps[currentStep]?.text) {
                  setTimeout(() => speakText(selectedRecipe.steps[currentStep].text, true), 150);
                } else {
                  if (currentAudio) { currentAudio.pause(); currentAudio = null; }
                  window.speechSynthesis?.cancel();
                }
              }}
              style={{
                background: voiceEnabled ? "#fff" : "rgba(255,255,255,0.15)",
                border: "none",
                color: voiceEnabled ? region?.color || "#000" : "#fff",
                width: 36,
                height: 36,
                borderRadius: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              {voiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
          </div>
          <div style={{ background: "rgba(0,0,0,0.2)", height: 3 }}>
            <div
              style={{
                height: "100%",
                background: "#fff",
                width: `${progress}%`,
                transition: "width 0.5s",
              }}
            />
          </div>
        </header>

        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            padding: isMobile ? "0.75rem" : "1.5rem",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 340px",
            gap: isMobile ? "0.75rem" : "1.5rem",
          }}
        >
          {/* Main area */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
          >
            {/* Camera panel */}
            {/* Camera panel */}
            <div
              style={{
                background: "#1c1917",
                borderRadius: 20,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* ── Camera Source Selector ── */}
              <div style={{ padding: "0.75rem 1rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: "0.7rem", color: "#57534e", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.6rem" }}>Camera Source</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  {[
                    { id: "phone",  num: "1", icon: "📱",
                      label: isMobile ? "This Phone's Camera" : "Phone Camera",
                      sub: isMobile ? "Use your phone's rear camera directly" : "Scan QR — use your phone as the kitchen camera" },
                    { id: "laptop", num: "2", icon: "💻",
                      label: isMobile ? "Front Camera / Tablet" : "Laptop / Tablet Stream",
                      sub: isMobile ? "Use the front-facing camera on this device" : "Stream from this device's built-in webcam" },
                    { id: "wifi",   num: "3", icon: "📡", label: "External WiFi Camera",   sub: "Connect a network or IP camera via URL" },
                  ].map(({ id, num, icon, label, sub }) => (
                    <button key={id} onClick={() => { if (cameraActive) stopCamera(); setCameraSource(id); setShowQR(false); }}
                      style={{
                        display: "flex", alignItems: "center", gap: "0.75rem",
                        padding: "0.6rem 0.85rem", borderRadius: 12, border: "1px solid",
                        borderColor: cameraSource === id ? (region?.color + "88" || "rgba(245,158,11,0.5)") : "rgba(255,255,255,0.06)",
                        background: cameraSource === id ? (region?.color + "18" || "rgba(245,158,11,0.1)") : "rgba(255,255,255,0.03)",
                        cursor: "pointer", fontFamily: "inherit", textAlign: "left", transition: "all 0.2s", width: "100%",
                      }}>
                      <div style={{
                        minWidth: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                        background: cameraSource === id ? (region?.color || "#f59e0b") : "rgba(255,255,255,0.08)",
                        fontSize: "0.65rem", fontWeight: 800, color: cameraSource === id ? "#fff" : "#57534e",
                      }}>{num}</div>
                      <span style={{ fontSize: "1rem" }}>{icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "0.8rem", fontWeight: 700, color: cameraSource === id ? "#e7e5e4" : "#78716c" }}>{label}</div>
                        <div style={{ fontSize: "0.68rem", color: "#44403c", marginTop: 1 }}>{sub}</div>
                      </div>
                      {cameraSource === id && <div style={{ width: 7, height: 7, borderRadius: "50%", background: region?.color || "#f59e0b", flexShrink: 0 }} />}
                    </button>
                  ))}
                </div>
                {cameraSource === "wifi" && (
                  <button onClick={() => setShowCameraManager(v => !v)}
                    style={{
                      marginTop: "0.6rem", width: "100%", padding: "0.4rem", borderRadius: 8,
                      border: "1px solid rgba(255,255,255,0.1)", background: showCameraManager ? "rgba(255,255,255,0.07)" : "transparent",
                      color: "#78716c", fontSize: "0.75rem", cursor: "pointer", fontFamily: "inherit",
                      fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 5,
                    }}>
                    <Globe size={13} /> {showCameraManager ? "Hide" : "Manage"} WiFi Cameras
                  </button>
                )}
              </div>

              {/* ── Phone Camera QR Panel ── */}
              {cameraSource === "phone" && showQR && (
                <div style={{ padding: "1rem", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.2)" }}>
                  <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#a8a29e", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: 6 }}>
                    📱 Connect Your Phone
                  </div>
                  {phoneStatus === "waiting" && phonePeerId && (
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "0.75rem", color: "#78716c", marginBottom: "0.75rem", lineHeight: 1.5 }}>
                        1. Open your phone camera<br/>
                        2. Scan this QR code<br/>
                        3. Allow camera access on your phone<br/>
                        4. Point your phone at the cooking area
                      </div>
                      {/* QR Code rendered as SVG via Google Charts API */}
                      <div style={{ background: "#fff", borderRadius: 12, padding: 10, display: "inline-block", marginBottom: "0.75rem" }}>
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(window.location.origin + window.location.pathname + '?peer=' + phonePeerId)}`}
                          alt="QR Code"
                          style={{ width: 160, height: 160, display: "block" }}
                        />
                      </div>
                      <div style={{ fontSize: "0.68rem", color: "#44403c", lineHeight: 1.5 }}>
                        Or open this URL on your phone:<br/>
                        <span style={{ color: "#78716c", wordBreak: "break-all" }}>
                          {window.location.origin}{window.location.pathname}?peer={phonePeerId}
                        </span>
                      </div>
                      <div style={{ marginTop: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, fontSize: "0.75rem", color: "#78716c" }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b", animation: "pulse 1.5s infinite" }} />
                        Waiting for phone to connect...
                      </div>
                    </div>
                  )}
                  {phoneStatus === "connected" && (
                    <div style={{ textAlign: "center", color: "#22c55e", fontSize: "0.82rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} />
                      Phone connected — streaming live
                    </div>
                  )}
                  {phoneStatus === "idle" && (
                    <div style={{ fontSize: "0.75rem", color: "#57534e", textAlign: "center" }}>Click "Start Camera" to generate the QR code.</div>
                  )}
                  {phoneStatus === "error" && (
                    <div style={{ fontSize: "0.75rem", color: "#f87171", textAlign: "center" }}>Connection error. Try refreshing and scanning again.</div>
                  )}
                </div>
              )}

              {/* ── WiFi Camera Manager Panel ── */}
              {cameraSource === "wifi" && showCameraManager && (
                <div style={{
                  padding: "1rem", borderBottom: "1px solid rgba(255,255,255,0.06)",
                  background: "rgba(0,0,0,0.2)",
                }}>
                  <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#a8a29e", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: 6 }}>
                    <Globe size={14} /> WiFi / Network Cameras
                  </div>

                  {/* Saved Cameras List */}
                  {wifiCameras.map((cam) => (
                    <div key={cam.id} style={{
                      display: "flex", alignItems: "center", gap: "0.5rem",
                      padding: "0.5rem 0.75rem", borderRadius: 12, marginBottom: "0.4rem",
                      background: activeWifiCam?.id === cam.id ? "rgba(34,197,94,0.1)" : "rgba(255,255,255,0.04)",
                      border: `1px solid ${activeWifiCam?.id === cam.id ? "#22c55e44" : "rgba(255,255,255,0.06)"}`,
                    }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: "0.8rem", fontWeight: 600, color: activeWifiCam?.id === cam.id ? "#22c55e" : "#e7e5e4", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {cam.name}
                        </div>
                        <div style={{ fontSize: "0.68rem", color: "#57534e", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {cam.url || "No URL set"}
                        </div>
                      </div>
                      {activeWifiCam?.id === cam.id ? (
                        <span style={{ fontSize: "0.68rem", color: "#22c55e", fontWeight: 700, background: "rgba(34,197,94,0.15)", padding: "2px 8px", borderRadius: 50 }}>● LIVE</span>
                      ) : (
                        <button onClick={() => cam.url && connectWifiCamera(cam)} disabled={!cam.url}
                          style={{
                            padding: "0.3rem 0.75rem", borderRadius: 50, border: "none",
                            background: cam.url ? (region?.color || "#f59e0b") : "rgba(255,255,255,0.05)",
                            color: cam.url ? "#fff" : "#44403c", fontSize: "0.72rem", cursor: cam.url ? "pointer" : "not-allowed",
                            fontWeight: 600, fontFamily: "inherit",
                          }}>
                          Connect
                        </button>
                      )}
                      <button onClick={() => removeWifiCamera(cam.id)} style={{
                        background: "none", border: "none", color: "#57534e", cursor: "pointer", padding: "0.2rem", display: "flex",
                      }}>
                        <X size={14} />
                      </button>
                    </div>
                  ))}

                  {/* Add New WiFi Camera */}
                  <div style={{ marginTop: "0.75rem", background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: "0.75rem", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "#78716c", marginBottom: "0.5rem" }}>Add Network Camera</div>
                    <input
                      value={newCamName}
                      onChange={(e) => setNewCamName(e.target.value)}
                      placeholder="Camera name (e.g. Kitchen Cam)"
                      style={{
                        width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 8, padding: "0.5rem 0.75rem", color: "#e7e5e4", fontSize: "0.78rem",
                        outline: "none", fontFamily: "inherit", marginBottom: "0.4rem", boxSizing: "border-box",
                      }}
                    />
                    <input
                      value={newCamUrl}
                      onChange={(e) => setNewCamUrl(e.target.value)}
                      placeholder="Stream URL (e.g. http://192.168.1.100/video or rtsp://...)"
                      style={{
                        width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: 8, padding: "0.5rem 0.75rem", color: "#e7e5e4", fontSize: "0.78rem",
                        outline: "none", fontFamily: "inherit", marginBottom: "0.4rem", boxSizing: "border-box",
                      }}
                    />
                    {wifiCamError && <div style={{ fontSize: "0.72rem", color: "#f87171", marginBottom: "0.4rem" }}>{wifiCamError}</div>}
                    <button onClick={addWifiCamera} style={{
                      width: "100%", padding: "0.5rem", borderRadius: 8, border: "none",
                      background: region?.color || "#f59e0b", color: "#fff", fontWeight: 700,
                      fontSize: "0.78rem", cursor: "pointer", fontFamily: "inherit",
                    }}>
                      + Add & Connect
                    </button>
                    <div style={{ fontSize: "0.68rem", color: "#44403c", marginTop: "0.5rem", lineHeight: 1.4 }}>
                      Supports MJPEG streams (http://ip/video), IP camera web interfaces, and any direct image URL. RTSP streams require a local proxy.
                    </div>
                  </div>
                </div>
              )}

              <div style={{ position: "relative" }}>
                {/* Phone camera stream (direct on mobile / WebRTC on desktop) */}
                <video
                  ref={phoneVideoRef}
                  autoPlay
                  playsInline
                  muted
                  style={{
                    width: "100%",
                    aspectRatio: isMobile ? "4/3" : "16/9",
                    objectFit: "cover",
                    display: cameraActive && cameraSource === "phone" ? "block" : "none",
                    background: "#000",
                  }}
                />
                {/* Laptop/device webcam video element */}
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  style={{
                    width: "100%",
                    aspectRatio: "16/9",
                    objectFit: "cover",
                    display: cameraActive && cameraSource === "laptop" ? "block" : "none",
                    background: "#000",
                  }}
                />

                {/* WiFi camera img element (MJPEG stream or snapshot) */}
                {cameraActive && cameraSource === "wifi" && activeWifiCam && (
                  <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: "#000", overflow: "hidden" }}>
                    <img
                      ref={wifiImgRef}
                      src={activeWifiCam.url}
                      alt="WiFi Camera Feed"
                      crossOrigin="anonymous"
                      onError={() => setWifiCamError("Cannot load stream. Check the URL or ensure the camera is on the same network.")}
                      onLoad={() => setWifiCamError("")}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                    <div style={{
                      position: "absolute", bottom: 8, left: 8,
                      background: "rgba(0,0,0,0.65)", borderRadius: 8, padding: "3px 8px",
                      fontSize: "0.68rem", color: "#a8a29e", display: "flex", alignItems: "center", gap: 5,
                    }}>
                      <Globe size={11} /> {activeWifiCam.name}
                    </div>
                    {wifiCamError && (
                      <div style={{
                        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.85)",
                        color: "#f87171", fontSize: "0.8rem", textAlign: "center", padding: "1rem", gap: "0.5rem",
                      }}>
                        <AlertCircle size={24} />
                        <div>{wifiCamError}</div>
                        <button onClick={() => setShowCameraManager(true)} style={{
                          marginTop: "0.5rem", padding: "0.4rem 1rem", borderRadius: 50, border: "none",
                          background: region?.color || "#f59e0b", color: "#fff", fontSize: "0.75rem", cursor: "pointer", fontFamily: "inherit",
                        }}>Edit Camera Settings</button>
                      </div>
                    )}
                  </div>
                )}

                {!cameraActive && (
                  <div
                    style={{
                      aspectRatio: "16/9",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "1rem",
                      background: "#161412",
                    }}
                  >
                    <div
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: 20,
                        background: "rgba(255,255,255,0.05)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {cameraSource === "wifi" ? <Globe size={28} color="#57534e" /> : cameraSource === "phone" ? <span style={{fontSize:28}}>📱</span> : <Camera size={28} color="#57534e" />}
                    </div>
                    <div style={{ color: "#57534e", textAlign: "center" }}>
                      <div style={{ marginBottom: "0.25rem", fontSize: "0.9rem" }}>
                        {cameraSource === "phone" ? "Phone Camera" : cameraSource === "wifi" ? "WiFi Camera" : "Laptop Camera"} off
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "#44403c" }}>
                        {cameraSource === "phone"
                          ? "Start to get a QR code — scan with your phone"
                          : cameraSource === "wifi"
                            ? activeWifiCam ? `Ready: ${activeWifiCam.name}` : "Add a WiFi camera below"
                            : "Uses this device's built-in webcam"}
                      </div>
                    </div>
                    {cameraError && (
                      <div style={{ color: "#f87171", fontSize: "0.78rem", textAlign: "center", maxWidth: 280 }}>
                        {cameraError}
                      </div>
                    )}
                    {cameraSource === "wifi" && !activeWifiCam ? (
                      <button onClick={() => setShowCameraManager(true)}
                        style={{ padding: "0.6rem 1.5rem", borderRadius: 50, border: "none", background: region?.color || "#f59e0b", color: "#fff", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", fontSize: "0.85rem" }}>
                        📡 Add WiFi Camera
                      </button>
                    ) : (
                      <button onClick={startCamera}
                        style={{ padding: "0.6rem 1.5rem", borderRadius: 50, border: "none", background: region?.color || "#f59e0b", color: "#fff", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", fontSize: "0.85rem" }}>
                        {cameraSource === "phone" ? "📱 Generate QR Code" : cameraSource === "wifi" ? "📡 Connect Camera" : "💻 Start Webcam"}
                      </button>
                    )}
                  </div>
                )}
                {cameraActive && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      pointerEvents: "none",
                      border: visionEnabled
                        ? `2px solid #22c55e`
                        : "2px solid transparent",
                      borderRadius: 0,
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        display: "flex",
                        gap: "0.5rem",
                        pointerEvents: "auto",
                      }}
                    >
                      {visionEnabled && (
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            background: "#16a34a",
                            color: "#fff",
                            fontSize: "0.72rem",
                            padding: "4px 10px",
                            borderRadius: 50,
                            fontWeight: 600,
                          }}
                        >
                          <span
                            style={{
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              background: "#fff",
                              animation: "pulse 2s infinite",
                            }}
                          />
                          Vision Active
                        </span>
                      )}
                      {(isAnalyzing || isStreaming) && (
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            background: isStreaming ? "rgba(99,102,241,0.85)" : "#2563eb",
                            color: "#fff",
                            fontSize: "0.72rem",
                            padding: "4px 10px",
                            borderRadius: 50,
                          }}
                        >
                          <Zap size={11} /> {isStreaming ? "Streaming..." : "Analyzing..."}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {cameraActive && (
                <div
                  style={{
                    padding: "0.75rem 1rem",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    display: "flex",
                    gap: "0.6rem",
                    alignItems: "center",
                  }}
                >
                  <button
                    onClick={() => setVisionEnabled(!visionEnabled)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      padding: "0.5rem 1rem",
                      borderRadius: 50,
                      border: "none",
                      background: visionEnabled
                        ? "#16a34a"
                        : region?.color || "#f59e0b",
                      color: "#fff",
                      fontWeight: 600,
                      cursor: "pointer",
                      fontSize: "0.82rem",
                      fontFamily: "inherit",
                    }}
                  >
                    <Eye size={14} />{" "}
                    {visionEnabled ? "Vision ON" : "Vision OFF"}
                  </button>
                  <button
                    onClick={stopCamera}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      padding: "0.5rem 0.9rem",
                      borderRadius: 50,
                      border: "1px solid rgba(255,255,255,0.1)",
                      background: "transparent",
                      color: "#a8a29e",
                      cursor: "pointer",
                      fontSize: "0.82rem",
                      fontFamily: "inherit",
                    }}
                  >
                    <X size={13} /> Stop
                  </button>
                  {!visionEnabled && (
                    <button
                      onClick={analyzeCurrentFrame}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        padding: "0.5rem 0.9rem",
                        borderRadius: 50,
                        border: "none",
                        background: "#2563eb",
                        color: "#fff",
                        cursor: "pointer",
                        fontSize: "0.82rem",
                        fontFamily: "inherit",
                        marginLeft: "auto",
                      }}
                    >
                      <Zap size={13} /> Analyze Now
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* AI Analysis panel — streams tokens live, shows structured output */}
            {(currentAnalysis || isAnalyzing || isStreaming || streamingText) && (
              <div
                style={{
                  background: "#1c1917",
                  borderRadius: 20,
                  padding: "1.25rem",
                  border: isStreaming
                    ? "1px solid rgba(99,102,241,0.5)"
                    : "1px solid rgba(99,102,241,0.2)",
                  transition: "border-color 0.3s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 700, fontSize: "0.85rem", color: "#818cf8" }}>
                    <Eye size={15} /> AI Vision Analysis
                  </div>
                  {isStreaming && (
                    <span style={{
                      display: "flex", alignItems: "center", gap: 5,
                      background: "rgba(99,102,241,0.15)", color: "#818cf8",
                      fontSize: "0.7rem", padding: "3px 10px", borderRadius: 50, fontWeight: 600,
                    }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#818cf8",
                        animation: "pulse 1s infinite" }} />
                      Streaming
                    </span>
                  )}
                </div>

                {/* Status badge from structured response */}
                {(() => {
                  const statusMatch = (streamingText || currentAnalysis?.response || "").match(/STATUS:\s*(ON_TRACK|NEEDS_ATTENTION|ADJUST_NOW)/i);
                  const status = statusMatch?.[1]?.toUpperCase();
                  if (!status) return null;
                  const cfg = {
                    ON_TRACK: { bg: "rgba(34,197,94,0.12)", border: "rgba(34,197,94,0.3)", color: "#4ade80", label: "✓ On Track" },
                    NEEDS_ATTENTION: { bg: "rgba(251,191,36,0.12)", border: "rgba(251,191,36,0.3)", color: "#fbbf24", label: "⚡ Needs Attention" },
                    ADJUST_NOW: { bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.3)", color: "#f87171", label: "⚠ Adjust Now" },
                  }[status] || null;
                  if (!cfg) return null;
                  return (
                    <div style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, borderRadius: 10, padding: "0.5rem 0.85rem", marginBottom: "0.75rem", display: "inline-flex", alignItems: "center", gap: 6 }}>
                      <span style={{ color: cfg.color, fontWeight: 700, fontSize: "0.82rem" }}>{cfg.label}</span>
                    </div>
                  );
                })()}

                {/* Observation */}
                {(() => {
                  const txt = streamingText || currentAnalysis?.response || "";
                  const m = txt.match(/OBSERVATION:\s*(.+?)(?=STATE:|STATUS:|ACTION:|WARNING:|$)/is);
                  return m ? (
                    <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: "0.7rem 0.85rem", marginBottom: "0.6rem" }}>
                      <div style={{ fontSize: "0.68rem", color: "#57534e", marginBottom: "0.25rem", letterSpacing: "0.05em" }}>OBSERVATION</div>
                      <div style={{ color: "#a8a29e", fontSize: "0.83rem", lineHeight: 1.5 }}>{m[1].trim()}</div>
                    </div>
                  ) : null;
                })()}

                {/* State */}
                {cookingState && (
                  <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "0.7rem 0.85rem", marginBottom: "0.6rem" }}>
                    <div style={{ fontSize: "0.68rem", color: "#57534e", marginBottom: "0.25rem", letterSpacing: "0.05em" }}>CURRENT STATE</div>
                    <div style={{ color: "#d6d3d1", fontSize: "0.85rem" }}>{cookingState}</div>
                  </div>
                )}

                {/* Action — the key instruction */}
                {aiSuggestion && (
                  <div style={{
                    background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)",
                    borderRadius: 12, padding: "0.8rem 0.9rem", marginBottom: "0.6rem",
                  }}>
                    <div style={{ fontSize: "0.68rem", color: "#818cf8", marginBottom: "0.3rem", letterSpacing: "0.05em" }}>ACTION</div>
                    <div style={{ color: "#c7d2fe", fontSize: "0.92rem", fontWeight: 600, lineHeight: 1.4 }}>
                      {aiSuggestion}
                      {isStreaming && <span style={{ animation: "pulse 1s infinite", marginLeft: 4, opacity: 0.6 }}>|</span>}
                    </div>
                  </div>
                )}

                {/* Warning */}
                {(() => {
                  const txt = streamingText || currentAnalysis?.response || "";
                  const m = txt.match(/WARNING:\s*(.+?)$/is);
                  if (!m || m[1].toLowerCase() === "none" || m[1].length < 4) return null;
                  return (
                    <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: 12, padding: "0.7rem 0.85rem" }}>
                      <div style={{ fontSize: "0.68rem", color: "#f87171", marginBottom: "0.25rem", letterSpacing: "0.05em" }}>⚠ WARNING</div>
                      <div style={{ color: "#fca5a5", fontSize: "0.83rem" }}>{m[1].trim()}</div>
                    </div>
                  );
                })()}
              </div>
            )}

            {!backendStatus.connected && !currentAnalysis && (
              <div style={{
                background: "#1c1917", borderRadius: 20, padding: "1.25rem",
                border: "1px solid rgba(251,191,36,0.2)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 700, fontSize: "0.85rem", color: "#fbbf24", marginBottom: "0.75rem" }}>
                  <Zap size={15} /> Backend Required
                </div>
                <p style={{ fontSize: "0.8rem", color: "#78716c", marginBottom: "0.75rem", lineHeight: 1.5 }}>
                  Live vision coaching now runs through your backend. Start the server and set OPENAI_API_KEY in backend/.env.
                </p>
                <div style={{ fontSize: "0.72rem", color: "#57534e", lineHeight: 1.6 }}>
                  API URL: {API_BASE_URL}<br />
                  Status: {backendStatus.loading ? "Checking..." : (backendStatus.error || "Offline")}
                </div>
              </div>
            )}

            {backendStatus.connected && !backendStatus.anthropicConfigured && !currentAnalysis && (
              <div style={{
                background: "#1c1917", borderRadius: 20, padding: "1.25rem",
                border: "1px solid rgba(251,191,36,0.2)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 700, fontSize: "0.85rem", color: "#fbbf24", marginBottom: "0.75rem" }}>
                  <Zap size={15} /> OpenAI Key Missing On Server
                </div>
                <p style={{ fontSize: "0.8rem", color: "#78716c", marginBottom: "0.25rem", lineHeight: 1.5 }}>
                  The frontend is connected, but your backend has no OPENAI_API_KEY yet.
                </p>
                <div style={{ fontSize: "0.72rem", color: "#57534e" }}>
                  Add it to backend/.env, then restart the backend.
                </div>
              </div>
            )}

            {/* Ingredients & Prep Panel */}
            {selectedRecipe.ingredients?.length > 0 && (
              <div style={{ background: "#1c1917", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{
                  padding: "0.85rem 1rem",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}>
                  <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "#78716c", letterSpacing: "0.1em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 6 }}>
                    <Utensils size={13} /> Ingredients & Prep
                  </div>
                  <span style={{ fontSize: "0.68rem", color: "#44403c" }}>
                    {selectedRecipe.ingredients.length} items
                  </span>
                </div>
                <div style={{ padding: "0.75rem", display: "flex", flexDirection: "column", gap: "0.4rem", maxHeight: 340, overflowY: "auto" }}>
                  {selectedRecipe.ingredients.map((ing, idx) => {
                    const isObj = typeof ing === "object";
                    return (
                      <div key={idx} style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: 12,
                        padding: "0.65rem 0.85rem",
                        display: "flex", flexDirection: "column", gap: 3,
                      }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 8 }}>
                          <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "#e7e5e4" }}>
                            {isObj ? ing.name : ing}
                          </span>
                          {isObj && ing.amount && (
                            <span style={{
                              fontSize: "0.7rem", fontWeight: 700, color: region?.color || "#f59e0b",
                              background: (region?.color || "#f59e0b") + "22",
                              padding: "1px 8px", borderRadius: 50, whiteSpace: "nowrap", flexShrink: 0,
                            }}>
                              {ing.amount}
                            </span>
                          )}
                        </div>
                        {isObj && ing.prep && (
                          <div style={{ fontSize: "0.73rem", color: "#78716c", lineHeight: 1.5 }}>
                            ✂️ {ing.prep}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Steps */}
            <div>
              <div
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#78716c",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "0.75rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <Utensils size={13} /> Recipe Steps
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                }}
              >
                {selectedRecipe.steps.map((step, idx) => {
                  const isActive = idx === currentStep;
                  const isDone = completedSteps.includes(idx);
                  return (
                    <div
                      key={idx}
                      style={{
                        position: "relative",
                        borderRadius: 16,
                        padding: "1rem 1.25rem",
                        border: "1px solid",
                        borderColor: isActive
                          ? region?.color + "66"
                          : isDone
                            ? "rgba(255,255,255,0.04)"
                            : "rgba(255,255,255,0.06)",
                        background: isActive
                          ? region?.color + "22"
                          : isDone
                            ? "rgba(255,255,255,0.02)"
                            : "rgba(255,255,255,0.03)",
                        opacity: isDone ? 0.55 : 1,
                        transition: "all 0.3s",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          gap: "0.75rem",
                          alignItems: "flex-start",
                        }}
                      >
                        <div
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: 50,
                            border: "2px solid",
                            borderColor: isActive
                              ? region?.color || "#f59e0b"
                              : isDone
                                ? "#22c55e"
                                : "rgba(255,255,255,0.15)",
                            background: isDone
                              ? "#22c55e22"
                              : isActive
                                ? region?.color + "33"
                                : "transparent",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          {isDone ? (
                            <Check size={13} color="#22c55e" />
                          ) : (
                            <span
                              style={{
                                fontSize: "0.72rem",
                                fontWeight: 700,
                                color: isActive
                                  ? region?.color || "#f59e0b"
                                  : "#78716c",
                              }}
                            >
                              {idx + 1}
                            </span>
                          )}
                        </div>
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              fontSize: "0.9rem",
                              color: isActive ? "#e7e5e4" : "#a8a29e",
                              lineHeight: 1.5,
                              marginBottom: isActive ? "0.6rem" : 0,
                            }}
                          >
                            {step.text}
                          </div>
                          {isActive && step.duration > 0 && (
                            <button
                              onClick={() => {
                                startTimer(step.duration);
                              }}
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "0.4rem",
                                padding: "0.35rem 0.9rem",
                                borderRadius: 50,
                                border: "none",
                                background: region?.color + "33",
                                color: region?.color || "#f59e0b",
                                fontWeight: 600,
                                cursor: "pointer",
                                fontSize: "0.78rem",
                                fontFamily: "inherit",
                              }}
                            >
                              <Clock size={12} /> Start {step.duration}m Timer
                            </button>
                          )}
                        </div>
                      </div>
                      {isActive && (
                        <div
                          style={{
                            position: "absolute",
                            top: 10,
                            right: 12,
                            background: region?.color || "#f59e0b",
                            color: "#fff",
                            fontSize: "0.65rem",
                            fontWeight: 700,
                            padding: "2px 8px",
                            borderRadius: 50,
                          }}
                        >
                          Current
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "0.5rem",
              }}
            >
              <button
                onClick={() => {
                  setView("home");
                  stopCamera();
                  setVisionEnabled(false);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  padding: "0.6rem 1.2rem",
                  borderRadius: 50,
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "transparent",
                  color: "#a8a29e",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: "0.85rem",
                }}
              >
                <Home size={14} /> All Recipes
              </button>
              <div style={{ display: "flex", gap: "0.6rem" }}>
                {currentStep > 0 && (
                  <button
                    onClick={handlePreviousStep}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      padding: "0.6rem 1.2rem",
                      borderRadius: 50,
                      border: "1px solid rgba(255,255,255,0.1)",
                      background: "transparent",
                      color: "#a8a29e",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      fontSize: "0.85rem",
                    }}
                  >
                    <SkipBack size={14} /> Previous
                  </button>
                )}
                <button
                  onClick={handleNextStep}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.6rem 1.5rem",
                    borderRadius: 50,
                    border: "none",
                    background:
                      region?.color ||
                      "linear-gradient(135deg, #f59e0b, #ea580c)",
                    color: "#fff",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontSize: "0.9rem",
                  }}
                >
                  {currentStep < totalSteps - 1 ? (
                    <>
                      <span>Next Step</span>
                      <ArrowRight size={15} />
                    </>
                  ) : (
                    <>
                      <span>Finish!</span>
                      <Check size={15} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {/* Timer */}
            <div
              style={{
                background: "#1c1917",
                borderRadius: 20,
                padding: "1.25rem",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  color: "#a8a29e",
                  marginBottom: "1rem",
                }}
              >
                <Clock size={15} /> Timer
              </div>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontSize: "3.5rem",
                    fontWeight: 800,
                    color: timerActive ? region?.color || "#f59e0b" : "#44403c",
                    letterSpacing: "-0.04em",
                    marginBottom: "0.75rem",
                  }}
                >
                  {formatTime(timeRemaining)}
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "0.5rem",
                    justifyContent: "center",
                  }}
                >
                  {timerActive ? (
                    <button
                      onClick={() => setTimerActive(false)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        padding: "0.5rem 1.2rem",
                        borderRadius: 50,
                        border: "none",
                        background: region?.color || "#f59e0b",
                        color: "#fff",
                        cursor: "pointer",
                        fontFamily: "inherit",
                        fontWeight: 600,
                        fontSize: "0.82rem",
                      }}
                    >
                      <Pause size={13} /> Pause
                    </button>
                  ) : timeRemaining > 0 ? (
                    <button
                      onClick={() => setTimerActive(true)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem",
                        padding: "0.5rem 1.2rem",
                        borderRadius: 50,
                        border: "none",
                        background: region?.color || "#f59e0b",
                        color: "#fff",
                        cursor: "pointer",
                        fontFamily: "inherit",
                        fontWeight: 600,
                        fontSize: "0.82rem",
                      }}
                    >
                      <Play size={13} /> Resume
                    </button>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Voice Commands — Always-On Mic */}
            <div style={{
              background: "#1c1917",
              borderRadius: 20,
              overflow: "hidden",
              border: micListening
                ? `1px solid ${region?.color || "#f59e0b"}66`
                : "1px solid rgba(255,255,255,0.08)",
              transition: "border-color 0.3s",
              boxShadow: micListening
                ? `0 0 0 3px ${region?.color || "#f59e0b"}18`
                : "none",
            }}>
              {/* Header */}
              <div style={{
                padding: "0.85rem 1.1rem",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 700, fontSize: "0.85rem", color: "#a8a29e" }}>
                  <Mic size={15} color={micListening ? (region?.color || "#f59e0b") : "#a8a29e"} />
                  Always-On Voice
                </div>
                {/* Status pill */}
                <div style={{
                  display: "flex", alignItems: "center", gap: 5,
                  padding: "3px 10px", borderRadius: 50, fontSize: "0.68rem", fontWeight: 700,
                  background: micListening ? (region?.color || "#f59e0b") + "22" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${micListening ? (region?.color || "#f59e0b") + "44" : "rgba(255,255,255,0.08)"}`,
                  color: micListening ? (region?.color || "#f59e0b") : "#57534e",
                  transition: "all 0.3s",
                }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
                    background: micListening ? (region?.color || "#f59e0b") : "#3f3f3f",
                    animation: micListening ? "micPulse 1.2s ease-in-out infinite" : "none",
                  }} />
                  {micListening ? "LIVE" : "OFF"}
                </div>
              </div>

              <div style={{ padding: "0.9rem 1.1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>

                {/* Big toggle button */}
                <button onClick={toggleMic} style={{
                  width: "100%", padding: "0.75rem", borderRadius: 14, border: "none",
                  background: micListening
                    ? `linear-gradient(135deg, ${region?.color || "#f59e0b"}, ${region?.color || "#ea580c"}cc)`
                    : "rgba(255,255,255,0.06)",
                  color: micListening ? "#fff" : "#78716c",
                  fontWeight: 700, fontSize: "0.88rem", cursor: "pointer",
                  fontFamily: "inherit", transition: "all 0.25s",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  boxShadow: micListening ? `0 4px 16px ${region?.color || "#f59e0b"}44` : "none",
                }}>
                  <span style={{
                    width: 10, height: 10, borderRadius: "50%",
                    background: micListening ? "#fff" : "#44403c",
                    animation: micListening ? "micPulse 1.2s ease-in-out infinite" : "none",
                    flexShrink: 0,
                  }} />
                  {micListening ? "🎤 Listening — tap to stop" : "🎤 Start Always-On Mic"}
                </button>

                {/* Error */}
                {micError && (
                  <div style={{
                    padding: "0.5rem 0.75rem", borderRadius: 10,
                    background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)",
                    fontSize: "0.73rem", color: "#f87171", lineHeight: 1.4,
                  }}>
                    ⚠ {micError}
                  </div>
                )}

                {/* Last heard transcript */}
                {lastHeard && (
                  <div style={{
                    padding: "0.55rem 0.75rem", borderRadius: 10,
                    background: (region?.color || "#f59e0b") + "12",
                    border: `1px solid ${region?.color || "#f59e0b"}28`,
                    fontSize: "0.75rem", color: "#a8a29e",
                    display: "flex", alignItems: "flex-start", gap: 6,
                  }}>
                    <span style={{ color: region?.color || "#f59e0b", fontWeight: 700, flexShrink: 0 }}>Heard:</span>
                    <span style={{ fontStyle: "italic" }}>"{lastHeard}"</span>
                  </div>
                )}

                {/* How it works — collapsed hint */}
                <div style={{
                  padding: "0.5rem 0.75rem", borderRadius: 10,
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)",
                  fontSize: "0.68rem", color: "#44403c", lineHeight: 1.6,
                }}>
                  <span style={{ color: "#57534e", fontWeight: 600 }}>How it works: </span>
                  Mic stays on continuously. If the browser pauses for silence it
                  auto-restarts — you don't need to tap anything between commands.
                </div>

                {/* Type-to-test fallback */}
                <div style={{ display: "flex", gap: "0.4rem" }}>
                  <input
                    value={voiceCommand}
                    onChange={(e) => setVoiceCommand(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && voiceCommand.trim() && handleVoiceCommand(voiceCommand)}
                    placeholder="Or type a command + Enter"
                    style={{
                      flex: 1, background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10,
                      padding: "0.5rem 0.75rem", color: "#e7e5e4",
                      fontSize: "0.78rem", outline: "none", fontFamily: "inherit",
                    }}
                  />
                  <button
                    onClick={() => voiceCommand.trim() && handleVoiceCommand(voiceCommand)}
                    style={{
                      padding: "0.5rem 0.75rem", borderRadius: 10, border: "none",
                      background: region?.color || "#f59e0b", color: "#fff",
                      fontWeight: 700, cursor: "pointer", fontFamily: "inherit", fontSize: "0.78rem",
                    }}
                  >Go</button>
                </div>

                {/* Quick-tap command chips */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                  {[
                    ["next step", "⏭"],
                    ["go back", "⏮"],
                    ["repeat", "🔁"],
                    ["start timer", "⏱"],
                    ["how long", "⏳"],
                    ["check my cooking", "👁"],
                    ["what step am I on", "📍"],
                    ["list ingredients", "📋"],
                    ["help", "❓"],
                    ["go home", "🏠"],
                  ].map(([cmd, emoji]) => (
                    <span key={cmd} onClick={() => handleVoiceCommand(cmd)}
                      title={`Say "${cmd}" or click`}
                      style={{
                        background: "rgba(255,255,255,0.04)", color: "#6b6560",
                        fontSize: "0.68rem", padding: "3px 9px", borderRadius: 50,
                        cursor: "pointer", border: "1px solid rgba(255,255,255,0.06)",
                        transition: "all 0.15s", userSelect: "none",
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#e7e5e4"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.color = "#6b6560"; }}
                    >
                      {emoji} {cmd}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Voice Profile */}
            <div
              style={{
                background: "#1c1917",
                borderRadius: 20,
                padding: "1.25rem",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  color: "#a8a29e",
                  marginBottom: "0.75rem",
                }}
              >
                <Volume2 size={15} /> Voice Profile
              </div>
              <div style={{ marginBottom: "0.75rem", padding: "0.6rem 0.75rem", background: "rgba(255,255,255,0.03)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: "0.68rem", color: "#57534e", marginBottom: "0.4rem", display: "flex", justifyContent: "space-between" }}>
                  <span>🎙️ ElevenLabs Voice (Realistic)</span>
                  {backendStatus.elevenLabsConfigured ? <span style={{ color: "#22c55e" }}>● Active</span> : <span>Server fallback</span>}
                </div>
                <div style={{ fontSize: "0.68rem", color: backendStatus.elevenLabsConfigured ? "#22c55e" : "#78716c", lineHeight: 1.5 }}>
                  {backendStatus.elevenLabsConfigured
                    ? "Realistic voice is enabled through your backend."
                    : "No ELEVENLABS_API_KEY found on the backend, so the app will use your browser voice instead."}
                </div>
              </div>
              {Object.entries(VOICE_PROFILES).map(([key, profile]) => (
                <button
                  key={key}
                  onClick={() => setSelectedVoice(key)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "0.5rem 0.75rem",
                    borderRadius: 10,
                    border: "1px solid",
                    borderColor:
                      selectedVoice === key
                        ? region?.color + "66" || "rgba(245,158,11,0.4)"
                        : "rgba(255,255,255,0.05)",
                    background:
                      selectedVoice === key
                        ? region?.color + "22" || "rgba(245,158,11,0.1)"
                        : "transparent",
                    color: selectedVoice === key ? "#e7e5e4" : "#78716c",
                    cursor: "pointer",
                    fontSize: "0.82rem",
                    marginBottom: "0.35rem",
                    fontFamily: "inherit",
                    transition: "all 0.2s",
                  }}
                >
                  {profile.label}
                </button>
              ))}
            </div>

            {/* Analysis History */}
            {visionInsights.length > 0 && (
              <div
                style={{
                  background: "#1c1917",
                  borderRadius: 20,
                  padding: "1.25rem",
                  border: "1px solid rgba(255,255,255,0.08)",
                  maxHeight: 280,
                  overflowY: "auto",
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    color: "#818cf8",
                    marginBottom: "0.75rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <Eye size={15} /> Analysis Log
                </div>
                {visionInsights.map((insight, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "0.6rem",
                      borderRadius: 10,
                      background: "rgba(255,255,255,0.03)",
                      marginBottom: "0.4rem",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "0.25rem",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: 600,
                          color: "#818cf8",
                        }}
                      >
                        Step {insight.step}
                      </span>
                      <span style={{ fontSize: "0.7rem", color: "#57534e" }}>
                        {insight.time}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "#78716c",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {insight.analysis}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
