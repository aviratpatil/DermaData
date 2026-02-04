import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function cleanText(text: string): string {
    if (!text) return "";

    return text
        // 1. Remove Headers (e.g. "Ingredients:", "Each 100 ml contains:")
        .replace(/^(ingredients|composition|each 100 ml contains)[:\s]*/i, "")
        // 2. Remove Content in Parentheses (e.g. "Water (Aqua)" -> "Water")
        .replace(/\s*\([^)]*\)/g, "")
        // 3. Remove Percentages/Numbers/Dosages (e.g. "1.5%", "60 mg", "150mg")
        .replace(/\b\d+(\.\d+)?\s*(%|mg|ml|g|gm|ppm)\b/gi, "")
        // 4. Remove "q.s." (Quantum Satis) and other filler words
        .replace(/\b(q\.s\.|excipients|preservatives|colourants)[:\.]?/gi, "")
        // 5. Standardize Separators: Newlines/Bullets/Periods -> Comma
        // We replace dots with commas ONLY if they look like separators (not inside words)
        .replace(/[\n•]/g, ",")
        .replace(/\.(?=\s|[A-Z]|$)/g, ",")
        // 6. Clean up multiple spaces and trailing commas
        .replace(/\s+/g, " ")
        .replace(/,+/g, ",")
        .replace(/^,+|,+$/g, "")
        .trim();
}
