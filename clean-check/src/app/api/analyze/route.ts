import { NextRequest, NextResponse } from "next/server";
import ingredientsDb from "@/data/ingredients.json";
import { calculateSafety } from "@/lib/scoring";
import { Ingredient } from "@/types";

export async function POST(req: NextRequest) {
    try {
        const { text } = await req.json();

        if (!text || typeof text !== "string") {
            return NextResponse.json({ error: "Invalid input" }, { status: 400 });
        }

        // 1. Parse Input: simple comma split for MVP
        // Enhance: Removing formatting characters like dot points, numbers, parens
        const rawItems = text
            .split(/[,;\n]/) // Split by comma, semicolon, or newline
            .map((s) => s.trim())
            .filter((s) => s.length > 1); // Filter empty

        const matchedIngredients: Ingredient[] = [];
        const unknownIngredients: string[] = [];

        // 2. Lookup Logic (Text insensitive, partial match)
        rawItems.forEach((raw) => {
            const cleanRaw = raw.toLowerCase().replace(/\(.*\)/, "").trim(); // Remove parentheses content e.g. "Water (Aqua)" -> "Water"

            const found = ingredientsDb.find((dbIng) => {
                // Check if any of the DB names match the input string
                return dbIng.names.some(
                    (n) => n.toLowerCase() === cleanRaw || cleanRaw.includes(n.toLowerCase())
                );
            });

            if (found) {
                // Cast JSON data to strong Type
                matchedIngredients.push(found as unknown as Ingredient);
            } else {
                unknownIngredients.push(raw);
            }
        });

        // 3. Calculate Score
        const result = calculateSafety(matchedIngredients, unknownIngredients.length);

        // 4. Return Result
        return NextResponse.json({
            ...result,
            unknownIngredients,
        });

    } catch (error) {
        console.error("Analysis Error:", error);
        return NextResponse.json(
            { error: "Failed to process ingredients" },
            { status: 500 }
        );
    }
}
