import { Ingredient, AnalysisResult, SafetyStatus } from "@/types";
import { detectSynergies } from "./synergy";

export function calculateSafety(ingredients: Ingredient[], unknownCount: number): AnalysisResult {
    if (ingredients.length === 0) {
        return {
            score: 0,
            status: "Avoid", // No data = unsafe assumption
            isBanned: false,
            bannedIngredients: [],
            analyzedIngredients: [],
            unknownIngredients: [],
            synergies: [],
        };
    }

    const bannedIngredients: string[] = [];
    let totalHazardScore = 0;
    let minAuthScore = 100;

    // 1. Iterate and Calculate Individual Hazards
    ingredients.forEach((ing) => {
        // Check for Ban
        if (ing.regulation.toLowerCase().includes("banned")) {
            bannedIngredients.push(ing.names[0]);
        }

        // Calculate Hazard Score (Max of individual risks)
        // Weights: Cancer(1.5), Hormone(1.2), Regulation(1.2), Allergen(0.8), Env(0.8)
        // Note: We don't have a numeric score for Regulation in the interface, 
        // so we assume Regulation is text. If "Restricted", we add a penalty to the other scores implicitly or treat it separately.
        // For this formula, we'll use the 4 numeric scores we have.

        const h = Math.max(
            ing.scores.carcinogenicity * 1.5,
            ing.scores.endocrine_disruption * 1.2,
            ing.scores.allergen_potential * 0.8,
            ing.scores.environmental_toxicity * 0.8
        );

        // Hazard (0-15ish) -> Safety (0-100)
        // Cap hazard at 10 for calculation stability
        const cappedHazard = Math.min(h, 10);
        const safetyScore = 100 - (cappedHazard * 10);

        totalHazardScore += safetyScore;
        if (safetyScore < minAuthScore) minAuthScore = safetyScore;
    });

    // 2. CRITICAL BANNED CHECK
    if (bannedIngredients.length > 0) {
        return {
            score: 0,
            status: "Banned",
            isBanned: true,
            bannedIngredients,
            analyzedIngredients: ingredients,
            unknownIngredients: [], // Handled by caller usually
            synergies: [],
        };
    }

    // 2.5 Cognitive Learning: Synergy Detection
    const { alerts, scorePenalty } = detectSynergies(ingredients);

    // 3. Base Average
    let averageScore = totalHazardScore / ingredients.length;

    // 4. Critical Penalty Factor (The "Weakest Link" Logic)
    // If the worst ingredient is really bad, dragging the average down isn't enough. We must slash the total.
    let cpf = 1.0;
    if (minAuthScore < 40) {
        cpf = 0.5; // Contains high hazard -> Slash by 50%
    } else if (minAuthScore < 60) {
        cpf = 0.8; // Contains moderate hazard -> Slash by 20%
    }

    let finalScore = Math.round(averageScore * cpf);

    // Apply Synergy Penalty
    finalScore = Math.max(0, finalScore - scorePenalty);

    // 5. Determine Status
    let status: SafetyStatus = "Safe";
    if (finalScore < 50) status = "Avoid";
    else if (finalScore < 80) status = "Caution";

    return {
        score: finalScore,
        status,
        isBanned: false,
        bannedIngredients: [],
        analyzedIngredients: ingredients,
        unknownIngredients: [],
        synergies: alerts,
    };
}
