import { Ingredient, SynergyAlert } from "@/types";

export function detectSynergies(ingredients: Ingredient[]): { alerts: SynergyAlert[], scorePenalty: number } {
    const alerts: SynergyAlert[] = [];
    let scorePenalty = 0;

    // 1. Nitrosamine Formation Logic
    // Risk: Amines + Nitrates/Nitrosating Agents
    const amines = ingredients.filter(i =>
        i.names.some(n => /cocamide|ethanolamine|dea|mea|tea/i.test(n))
    );

    const nitrates = ingredients.filter(i =>
        i.names.some(n => /bronopol|nitrate|nitrite/i.test(n))
    );

    if (amines.length > 0 && nitrates.length > 0) {
        alerts.push({
            title: "Nitrosamine Formation Risk",
            description: `Detected simultaneous use of Amines (${amines.map(a => a.names[0]).join(", ")}) and Nitrosating Agents (${nitrates.map(n => n.names[0]).join(", ")}). This combination can form carcinogenic nitrosamines.`,
            severity: "High"
        });
        scorePenalty += 30; // Critical penalty
    }

    // 2. Cocktail Effect Logic
    // Risk: >3 Moderate Allergens (Score > 4)
    const allergens = ingredients.filter(i => i.scores.allergen_potential > 4);

    if (allergens.length > 3) {
        alerts.push({
            title: "Allergen Cocktail Effect",
            description: `Product contains ${allergens.length} high-potential allergens. The cumulative effect increases sensitization risk significantly.`,
            severity: "Medium"
        });
        // Increase hazard by 20% (simulated by dropping safety score penalty)
        scorePenalty += 15;
    }

    return { alerts, scorePenalty };
}
