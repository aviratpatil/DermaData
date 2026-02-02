def calculate_safety_score(ingredients_list):
    """
    Calculates safety score based on Rank-Weighted Hazard Index.
    ingredients_list: List of objects (Ingredient models or dicts) with attributes:
                      - hazard_score (int)
                      - is_restricted (bool)
                      - name (str)
    """
    if not ingredients_list:
        return {
            "score": 0,
            "risk_level": "Unknown",
            "key_concerns": ["No ingredients provided"]
        }

    total_weighted_hazard = 0
    max_possible_weighted_hazard = 0
    has_restricted = False
    for i,ing in enumerate(ingredients_list):
        # Determine Weight (Position based)
        if i < 5:
            weight = 3.0
        elif i < 10:
            weight = 2.0
        else:
            weight = 1.0

        h_score = ing.hazard_score if ing.hazard_score is not None else 5 # Default 5 if missing
        
        # Check for restrictions
        if getattr(ing, "is_restricted", False):
            has_restricted = True
            if ing.name not in key_concerns:
                key_concerns.append(f"Restricted: {ing.name}")
        
        # Add to sums
        total_weighted_hazard += (h_score * weight)
        max_possible_weighted_hazard += (10 * weight)

    # Calculate base percentage
    if max_possible_weighted_hazard == 0:
        base_safety = 0
    else:
        hazard_ratio = total_weighted_hazard / max_possible_weighted_hazard
        base_safety = 100 - (hazard_ratio * 100)

    final_score = base_safety # No penalty subtraction
    final_score = max(0, final_score)
    final_score = min(100, final_score)

    # Risk Level
    if has_restricted:
        risk_level = "Not Recommended"
    elif final_score >= 80:
        risk_level = "Safe"
    elif final_score >= 50:
        risk_level = "Moderate"
    else:
        risk_level = "Hazardous"

    return {
        "overall_safety_score": round(final_score),
        "risk_level": risk_level,
        "key_concerns": key_concerns
    }
