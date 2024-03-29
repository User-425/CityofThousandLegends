
function isBrightColor(color) {
    const hexColor = color.slice(1);
    const r = parseInt(hexColor.slice(0, 2), 16);
    const g = parseInt(hexColor.slice(2, 4), 16);
    const b = parseInt(hexColor.slice(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128;
  }

  function setTextColorByBackgroundColor(backgroundColor) {
    const selectButton = document.getElementById("selectButton");
    const resultContainer = document.getElementById("result");
    const objectName = document.getElementById("objectName");
    const objectLore = document.getElementById("objectLore");
    const objectDescription = document.getElementById("objectDescription");

    if (isBrightColor(backgroundColor)) {

      selectButton.style.color = "#000";
      resultContainer.style.color = "#000";
      objectName.style.color = "#000";
      objectLore.style.color = "#000";
      objectDescription.style.color = "#000";
    } else {

      selectButton.style.color = "#fff";
      resultContainer.style.color = "#fff";
      objectName.style.color = "#fff";
      objectLore.style.color = "#fff";
      objectDescription.style.color = "#fff";
    }
  }

  const roles = [
    {
      id: 1,
      name: "The Destroyer",
      photo: "img/Destroyer.jpg",
      description: "Destroy something in your life that is holding you back. This could be a physical object, a relationship, or even a negative thought pattern.",
      lore: "Come at the end of an era to destroy the old and make way for the new",
      rarity: "Common",
      weight: 5,
      team: "Yin",
      color: "#37474f",
    },
    {
      id: 2,
      name: "The Phoenix",
      photo: "img/Phoenix.jpg",
      description: "Rise from the ashes of your failures and become stronger than ever before.",
      lore: "Emerge from the flames, wiser and more resilient",
      rarity: "Common",
      weight: 5,
      team: "Yin",
      color: "#f72307",
    },
    {
      id: 3,
      name: "The Rebel",
      photo: "img/Rebel.jpg",
      description: "Defy authority and fight for what you believe in.",
      lore: "In the midst of conformity, my convictions are my North Star",
      rarity: "Common",
      weight: 5,
      team: "Yin",
      color: "#810406",
    },
    {
      id: 4,
      name: "The Fearless Explorer",
      photo: "img/Explorer.jpg",
      description: "Embrace your fear of the unknown. Try a new hobby, visit an unfamiliar place, or learn something entirely outside your comfort zone.",
      lore: "Navigating the Waves of Uncertainty with Grace",
      rarity: "Rare",
      weight: 3,
      team: "Yang",
      color: "#3C7A89",
    },
    {
      id: 5,
      name: "The Charitable Hero",
      photo: "img/Hero.png",
      description: "Promote kindness and empathy. Volunteer your time, donate to a charity, or help a stranger in need.",
      lore: "Every Act, Every Heartbeat: Heroic",
      rarity: "Rare",
      weight: 3,
      team: "Yang",
      color: "#fef4cc",
    },
    {
      id: 6,
      name: "The Fitness Enthusiast",
      photo: "img/Fitness.jpg",
      description: "Prioritize physical health. Engage in a workout routine, try a new sport, or meet your fitness goals.",
      lore: "Sweat Today, Shine Tomorrow",
      rarity: "Common",
      weight: 5,
      team: "Yang",
      color: "#F05B4E",
    },
    {
      id: 7,
      name: "The Intellectual Scholar",
      photo: "img/Scholar.jpg",
      description: "Expand your knowledge. Read a challenging book, take a course, or engage in deep philosophical discussions.",
      lore: "Paint your mind with the colors of curiosity",
      rarity: "Common",
      weight: 5,
      team: "Yang",
      color: "#1f0d1d",
    },
    {
      id: 8,
      name: "The Artistic Visionary",
      photo: "img/Visionary.jpg",
      description: "Express yourself through art. Create a piece of art, write a poem, or learn a new creative skill.",
      lore: "Colors Speak Louder Than Words",
      rarity: "Uncommon",
      weight: 4,
      team: "Yang",
      color: "#6bc7ca",
    },
    {
      id: 9,
      name: "The Social Connector",
      photo: "img/Social.jpg",
      description: "Strengthen relationships. Reconnect with old friends, make new friends, or improve communication with loved ones.",
      lore: "Life's Puzzle - Connecting the Pieces",
      rarity: "Uncommon",
      weight: 4,
      team: "Yang",
      color: "#1086d6",
    },
    {
      id: 10,
        name: "The Eco-Warrior",
        photo: "img/Eco.jpg",
        description: "Protect the environment. Reduce your carbon footprint, practice sustainability, or support eco-friendly initiatives.",
        lore: "Hug trees, not trends. Be The Eco-Warrior",
      rarity: "Common",
      weight: 5,
      team: "Yang",
      color: "#95B64F",
    },
    {
      id: 11,
      name: "The Minimalist",
      photo: "img/Minimalist.jpg",
      description: "Simplify your life. Declutter your living space, reduce possessions, or cut back on non-essential spending.",
      lore: "Peeling away layers, revealing life's core",
      rarity: "Common",
      weight: 5,
      team: "Yang",
      color: "#F0E7E7",
    },
    {
      id: 12,
      name: "The Global Traveler",
      photo: "img/Traveler.jpg",
      description: "Embrace different cultures. Plan a trip to a foreign country, learn a new language, or cook international cuisine.",
      lore: "In diversity, I find unity",
      rarity: "Uncommon",
      weight: 4,
      team: "Yang",
      color: "#FFE051",
    },
    {
      id: 13,
      name: "The Financial Wizard",
      photo: "img/Wizard.jpg",
      description: "Gain financial literacy. Create a budget, invest, or start a side hustle.",
      lore: "Empower your wallet, empower your life",
      rarity: "Legendary",
      weight: 1,
      team: "Yang",
      color: "#5555FF",
    },
    {
      id: 14,
      name: "The Tech Innovator",
      photo: "img/Innovator.jpg",
      description: "Embrace modern technology. Learn a new tech skill, build a website, or create a useful app.",
      lore: "Code. Create. Conquer.",
      rarity: "Common",
      weight: 5,
      team: "Yang",
      color: "#77AAE7",
    },
    {
      id: 15,
      name: "The Spiritual Seeker",
      photo: "img/Spiritual.jpg",
      description: "Explore your inner self. Meditate, practice mindfulness, or engage in spiritual reading and self-reflection.",
      lore: "Seek your starlight within, for galaxies dwell in your soul",
      rarity: "Common",
      weight: 5,
      team: "Yang",
      color: "#FFD700",
    },
    {
      id: 16,
      name: "The Health Nut",
      photo: "img/Health.jpg",
      description: "Prioritize mental and emotional health. Seek therapy, practice stress management, or learn mindfulness techniques.",
      lore: "Have You Checked in on Your Mental Health Lately?",
      rarity: "Common",
      weight: 5,
      team: "Yang",
      color: "#3e2a63",
    },
  ];

  document.getElementById("selectButton").addEventListener("click", () => {

    const totalWeight = roles.reduce((acc, role) => acc + role.weight, 0);

    let count = 0;
    let timer;

    function selectRandomObject() {
      let randomValue = Math.random() * totalWeight;
      let selectedObject = null;

      for (const role of roles) {
        if (randomValue < role.weight) {
          selectedObject = role;
          break;
        }
        randomValue -= role.weight;
      }

      if (selectedObject) {
        const resultContainer = document.getElementById("result");
        resultContainer.style.backgroundColor = selectedObject.color;
        setTextColorByBackgroundColor(selectedObject.color);

        document.getElementById("objectImage").src = selectedObject.photo;
        document.getElementById("objectName").textContent = selectedObject.name;
        document.getElementById("objectDescription").textContent = selectedObject.description;
        document.getElementById("objectLore").textContent = selectedObject.lore;
      }

      count++;
      if (count >= 10) {
        clearInterval(timer);
      }
    }

    timer = setInterval(selectRandomObject, 100);
  });
