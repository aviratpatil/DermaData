export interface IngredientScores {
    carcinogenicity: number;
    endocrine_disruption: number;
    allergen_potential: number;
    environmental_toxicity: number;
}

export interface Ingredient {
    id: string;
    names: string[];
    scores: IngredientScores;
    regulation: string;
    description: string;
    category: string;
}

export interface SynergyAlert {
    title: string;
    description: string;
    severity: "High" | "Medium" | "Low";
}

export type SafetyStatus = "Safe" | "Caution" | "Avoid" | "Banned";

export interface AnalysisResult {
    score: number; // 0-100
    status: SafetyStatus;
    isBanned: boolean;
    bannedIngredients: string[];
    analyzedIngredients: Ingredient[];
    unknownIngredients: string[];
    synergies: SynergyAlert[];
}
