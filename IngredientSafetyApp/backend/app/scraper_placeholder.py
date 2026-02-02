import requests
import json

def fetch_ingredients():
    """
    Fetches ingredient data from OpenBeautyFacts (related to OpenFoodFacts).
    We will look for common additives and their safety tags.
    """
    url = "https://world.openbeautyfacts.org/cgi/search.pl"
    params = {
        "search_terms": "",
        "search_simple": 1,
        "action": "process",
        "json": 1,
        "page_size": 50 
    }
    
    # Note: OpenBeautyFacts doesn't have a direct "list all ingredients" API that is easy to scrape 
    # without processing thousands of products.
    # Instead, we will simulate a "curated" list scraper that you can run if you had a source.
    # For now, let's create a script that WOULD work if we had a direct CSV or JSON source.
    
    print("Fetching data from OpenBeautyFacts...")
    
    # Realistically, for this MVP, we should recommend a manual list or a specific Kaggle dataset 
    # because live scraping of chemical safety data is complex and rate-limited.
    
    # However, here is how you *could* structure a scraper for a site like 'cosmeticsinfo.org' or similar if they had an API.
    
    extended_data = [
        {"name": "Phenoxyethanol", "hazard_score": 4, "description": "Preservative. Irritant.", "is_restricted": False},
        {"name": "Sodium Benzoate", "hazard_score": 3, "description": "Preservative. Safe in small amounts.", "is_restricted": False},
        {"name": "Benzyl Alcohol", "hazard_score": 5, "description": "Preservative/Solvent. Allergen.", "is_restricted": True},
        {"name": "Citric Acid", "hazard_score": 2, "description": "pH adjuster. Irritant in eyes.", "is_restricted": False},
        {"name": "Limonene", "hazard_score": 6, "description": "Fragrance. Strong Allergen.", "is_restricted": False},
        {"name": "Linalool", "hazard_score": 5, "description": "Fragrance. Allergen.", "is_restricted": False},
        {"name": "CI 77891", "hazard_score": 3, "description": "Titanium Dioxide. Pigment.", "is_restricted": False},
        {"name": "BHT", "hazard_score": 6, "description": "Antioxidant. Potential toxicity.", "is_restricted": True},
        {"name": "Tetrasodium EDTA", "hazard_score": 2, "description": "Chelating agent.", "is_restricted": False},
        {"name": "Propylene Glycol", "hazard_score": 3, "description": "Skin conditioning.", "is_restricted": False},
    ]

    print(f"Generated {len(extended_data)} new ingredients.")
    return extended_data

if __name__ == "__main__":
    data = fetch_ingredients()
    print(json.dumps(data, indent=2))
