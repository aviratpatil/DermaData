from sqlalchemy.orm import Session
from .utils import find_best_match
from .calculator import calculate_safety_score
from .models import Ingredient
from app.classifier import predict_ingredient_safety
import re

def analyze_ingredients_text(text: str, db: Session):
    # 1. Parse text
    # Remove common prefixes
    text = re.sub(r'^(Ingredients:|Contains:)\s*', '', text, flags=re.IGNORECASE)
    
    # Remove content inside parentheses (often chemical names or sources) to simplify matching
    # e.g., "Aqua (Water)" become "Aqua "
    # We might want to keep synonyms, but for fuzzy match, the main name is usually first.
    text = re.sub(r'\([^)]*\)', '', text)

    # Split by common delimiters (comma, newline, bullet points)
    # The regex splits by comma or newline. We DO NOT split by hyphen to preserve names like "TEA-Dodecyl..."
    raw_items = [x.strip() for x in re.split(r'[,\n•]+', text) if x.strip()]
    
    analyzed_ingredients = []
    missing_ingredients = []

    for item in raw_items:
        match = find_best_match(item, db)
        if match:
            analyzed_ingredients.append(match)
        else:
            # INTEGRATE AI CLASSIFIER HERE
            # 1. Predict safety
            prediction = predict_ingredient_safety(item)
            
            # 2. Save to DB (Learn it for next time)
            new_ing = Ingredient(
                name=item, # Use original name
                hazard_score=prediction['hazard_score'],
                description=prediction['description'],
                concerns=prediction['concerns'],
                is_restricted=prediction['is_restricted'],
                common_names=item.lower()
            )
            try:
                db.add(new_ing)
                db.commit() # Save learning
                db.refresh(new_ing)
                analyzed_ingredients.append(new_ing)
            except Exception:
                # Fallback if save fails (e.g. race condition), just use prediction
                db.rollback()
                # Create temp object
                temp_ing = Ingredient(**prediction, name=item)
                analyzed_ingredients.append(temp_ing)

    # 2. Calculate Score
    result = calculate_safety_score(analyzed_ingredients)
    
    # 3. Format Breakdown for serialization
    breakdown = []
    for ing in analyzed_ingredients:
        breakdown.append({
            "name": ing.name,
            "hazard_score": ing.hazard_score,
            "description": ing.description,
            "is_restricted": getattr(ing, "is_restricted", False)
        })

    result["ingredients_breakdown"] = breakdown
    result["missing_ingredients"] = missing_ingredients
    
    return result
