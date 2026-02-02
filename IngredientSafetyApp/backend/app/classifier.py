import re

def predict_ingredient_safety(name: str):
    """
    Predicts safety score and details for an unknown ingredient using keyword heuristics.
    Returns a dict with hazard_score, description, concerns, and is_restricted.
    """
    name_lower = name.lower()
    
    # DEFAULT SAFE (0-2)
    if any(x in name_lower for x in ['water', 'aqua', 'extract', 'juice', 'oil', 'butter', 'seed', 'protein', 'vitamin', 'glucoside', 'stearate', 'palmitate']):
        return {
            "hazard_score": 1,
            "description": "Likely safe, plant-derived or mild ingredient.",
            "concerns": "None detected based on name analysis.",
            "is_restricted": False
        }

    # MODERATE HAZARD (3-6)
    if any(x in name_lower for x in ['sulfate', 'peg-', '-eth', 'acid', 'hydroxide', 'alcohol', 'salicylate', 'benzoate', 'dimethicone', 'cone', 'siloxane']):
        score = 4
        concerns = "Potential irritant or contamination concern."
        
        if 'sulfate' in name_lower:
            concerns = "Surfactant. Can be drying/irritating (e.g., SLS)."
        elif 'peg-' in name_lower or '-eth' in name_lower:
            concerns = "Ethoxylated ingredient. Concern of 1,4-dioxane contamination."
        elif 'alcohol' in name_lower and not 'cetyl' in name_lower and not 'stearyl' in name_lower:
             concerns = "Drying alcohol."

        return {
            "hazard_score": score,
            "description": "Functional ingredient (surfactant/solvent). Moderate safety concern.",
            "concerns": concerns,
            "is_restricted": False
        }

    # HIGH HAZARD / RESTRICTED (7-10)
    if any(x in name_lower for x in ['paraben', 'fragrance', 'parfum', 'isothiazolinone', 'triclosan', 'formaldehyde', 'dea', 'mea', 'retinyl', 'oxybenzone']):
        score = 8
        concerns = "High concern ingredient."
        is_restricted = False
        
        if 'paraben' in name_lower:
            concerns = "Preservative. Potential endocrine disruptor. Banned in EU for some types."
            is_restricted = True
        elif 'fragrance' in name_lower or 'parfum' in name_lower:
            concerns = "Undisclosed mixture. High allergen risk. restricted if allergens exceed limits."
        elif 'isothiazolinone' in name_lower:
             concerns = "Preservative. Known strong allergen (banned in leave-on products in EU)."
             is_restricted = True
        elif 'dea' in name_lower:
            concerns = "Carcinogen suspect. Restricted presence."
            is_restricted = True

        return {
            "hazard_score": score,
            "description": "Hazardous or restricted ingredient.",
            "concerns": concerns,
            "is_restricted": is_restricted
        }

    # FALLBACK FOR UNKNOWN CHEMICALS
    return {
        "hazard_score": 5,
        "description": "Unclassified chemical ingredient.",
        "concerns": "Insufficient data to determine specific safety. Use with caution.",
        "is_restricted": False
    }
