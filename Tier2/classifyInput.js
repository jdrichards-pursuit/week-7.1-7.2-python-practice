// Topics and keywords for classification
const topics = {
    //  checking for existence in a set is generally O(1) on average, while for an array, it is O(n).
    "Energy Conservation": new Set([
        "energy", "conservation", "efficiency", "electricity", "solar", "renewable", "wind", "hydropower", 
        "power saving", "solar panels", "geothermal", "battery storage", "energy management", "carbon footprint"
    ]),
    "Recycling and Waste Reduction": new Set([
        "recycle", "recycling", "waste", "compost", "plastic", "trash", "garbage", "landfill", "reuse", 
        "reduce", "sustainable packaging", "zero waste", "single-use", "waste diversion", "electronic waste", 
        "food waste", "upcycle", "biodegradable"
    ]),
    "Eco-Friendly Products": new Set([
        "eco-friendly", "sustainable", "green", "biodegradable", "organic", "natural", "non-toxic", 
        "reusable", "carbon-neutral", "environmentally friendly", "low-impact", "plant-based", 
        "bamboo", "recycled materials", "eco-products", "vegan products", "ethical sourcing", "fair trade"
    ]),
    "Climate Change": new Set([
        "climate", "global warming", "carbon", "emissions", "carbon dioxide", "fossil fuels", "greenhouse gases", 
        "methane", "CO2", "climate change", "temperature rise", "carbon footprint", "sea level rise", 
        "climate action", "deforestation", "ozone", "climate adaptation", "resilience", "ecosystem"
    ]),
    "Pollution": new Set([
        "pollution", "air quality", "water pollution", "soil pollution", "plastic waste", "toxic", 
        "contamination", "noise pollution", "light pollution", "microplastics", "industrial waste", 
        "ocean pollution", "oil spill", "chemical runoff", "pollutants", "smog", "heavy metals"
    ]),
    "Sustainable Agriculture": new Set([
        "agriculture", "sustainable farming", "organic farming", "regenerative agriculture", "pesticides", 
        "fertilizers", "crop rotation", "soil health", "agroforestry", "water management", "irrigation", 
        "farming practices", "carbon sequestration", "local food", "food miles", "permaculture"
    ]),
    "Water Conservation": new Set([
        "water conservation", "water-saving", "irrigation", "drought", "water scarcity", "groundwater", 
        "rainwater harvesting", "wastewater treatment", "water recycling", "drip irrigation", 
        "sustainable water management", "greywater", "freshwater", "water efficiency", "stormwater"
    ]),
    "Biodiversity and Conservation": new Set([
        "biodiversity", "conservation", "wildlife", "ecosystem", "habitat", "endangered species", 
        "preservation", "deforestation", "species protection", "natural reserves", "wildlife corridors", 
        "marine life", "forest conservation", "national parks", "habitat restoration", "flora and fauna"
    ]),
    "Sustainable Transportation": new Set([
        "transportation", "electric vehicle", "public transport", "cycling", "bike lanes", "carpooling", 
        "ride-sharing", "EV charging", "low-emission", "fuel efficiency", "mass transit", "walking", 
        "urban planning", "commuting", "carbon-neutral travel", "alternative fuels", "clean transport"
    ]),
    "Green Building and Architecture": new Set([
        "green building", "sustainable architecture", "energy-efficient design", "LEED", "insulation", 
        "solar heating", "natural lighting", "eco-friendly materials", "passive house", "sustainable construction", 
        "bioclimatic design", "rainwater management", "building materials", "retrofitting", "low-energy design"
    ]),
    "Environmental Policy and Legislation": new Set([
        "environmental policy", "climate policy", "emissions standards", "carbon tax", "clean energy mandate", 
        "regulation", "green new deal", "environmental law", "sustainable development goals", "SDGs", 
        "Paris Agreement", "biodiversity protection laws", "waste management policy", "legislation", 
        "conservation policy", "government initiatives", "environmental advocacy"
    ]),
    "Sustainable Fashion": new Set([
        "sustainable fashion", "eco-fashion", "ethical clothing", "fast fashion", "organic cotton", 
        "recycled fabrics", "secondhand clothing", "textile waste", "fashion industry impact", "biodegradable fibers", 
        "slow fashion", "carbon-neutral fashion", "upcycled clothing", "eco-friendly dyes", "conscious consumer"
    ])
};

export default function classifyInput(userInput) {
    // Lowercasing and removing extra chars like ! or ?
    const sanitizedInput = userInput.toLowerCase().replaceAll(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");

    const matchedTopics = [];

    for (const [topic, keywords] of Object.entries(topics)) {
        for (const keyword of keywords) {
            if (sanitizedInput.includes(keyword)) {
                matchedTopics.push(topic);
                break; // No need to check other keywords for the same topic, break from inner loop, parent keep looping
            }
        }
    }

    return matchedTopics.length > 0 ? matchedTopics : ["General"];
}
