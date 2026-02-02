from app.database import SessionLocal, engine
from app.models import Base, Ingredient

# Create tables
Base.metadata.create_all(bind=engine)

def seed_data():
    db = SessionLocal()
    
    ingredients_data = [
        # SOLVENTS & BASES
        {"name": "Water", "hazard_score": 0, "description": "Solvent.", "is_restricted": False},
        {"name": "Aqua", "hazard_score": 0, "description": "Water.", "is_restricted": False},
        {"name": "Glycerin", "hazard_score": 0, "description": "Moisturizer.", "is_restricted": False},
        {"name": "Aloe Barbadensis Leaf Juice", "hazard_score": 1, "description": "Soothing plant extract.", "is_restricted": False},
        
        # SURFACTANTS (CLEANSERS)
        {"name": "Sodium Lauryl Sulfate", "hazard_score": 4, "description": "Strong cleanser, skin irritant.", "is_restricted": False},
        {"name": "Sodium Laureth Sulfate", "hazard_score": 3, "description": "Cleanser, contamination concerns.", "is_restricted": False},
        {"name": "Cocamidopropyl Betaine", "hazard_score": 4, "description": "Mild cleanser, allergen.", "is_restricted": False},
        {"name": "Decyl Glucoside", "hazard_score": 1, "description": "Gentle plant-based cleanser.", "is_restricted": False},
        {"name": "Lauryl Glucoside", "hazard_score": 1, "description": "Gentle cleanser.", "is_restricted": False},
        {"name": "Coco-Glucoside", "hazard_score": 1, "description": "Gentle cleanser.", "is_restricted": False},
        {"name": "Sodium Cocoyl Isethionate", "hazard_score": 1, "description": "Mild cleanser from coconut.", "is_restricted": False},
        
        # CONDITIONING & SILICONES
        {"name": "Dimethicone", "hazard_score": 3, "description": "Silicone coat, traps impurities.", "is_restricted": False},
        {"name": "Amodimethicone", "hazard_score": 3, "description": "Silicone, builds up on hair.", "is_restricted": False},
        {"name": "Cyclopentasiloxane", "hazard_score": 5, "description": "Silicone, potential endocrine disruptor.", "is_restricted": False},
        {"name": "Panthenol", "hazard_score": 1, "description": "Vitamin B5, safe.", "is_restricted": False},
        {"name": "Guar Hydroxypropyltrimonium Chloride", "hazard_score": 1, "description": "Conditioning agent.", "is_restricted": False},
        {"name": "Polyquaternium-7", "hazard_score": 3, "description": "Anti-static, potential contamination.", "is_restricted": False},
        {"name": "Polyquaternium-10", "hazard_score": 1, "description": "Conditioning polymer.", "is_restricted": False},

        # PRESERVATIVES
        {"name": "Parabens", "hazard_score": 8, "description": "Endocrine disruptor.", "is_restricted": True},
        {"name": "Methylparaben", "hazard_score": 7, "description": "Preservative, hormonal link.", "is_restricted": True},
        {"name": "Propylparaben", "hazard_score": 9, "description": "Strong endocrine disruptor.", "is_restricted": True},
        {"name": "Phenoxyethanol", "hazard_score": 4, "description": "Preservative, skin irritant.", "is_restricted": False},
        {"name": "Sodium Benzoate", "hazard_score": 3, "description": "Preservative, safe in low dose.", "is_restricted": False},
        {"name": "Methylisothiazolinone", "hazard_score": 7, "description": "Strong allergen.", "is_restricted": True},
        {"name": "Methylchloroisothiazolinone", "hazard_score": 7, "description": "Strong allergen.", "is_restricted": True},
        {"name": "Benzyl Alcohol", "hazard_score": 5, "description": "Preservative and fragrance allergen.", "is_restricted": False},
        {"name": "DMDM Hydantoin", "hazard_score": 7, "description": "Formaldehyde releaser.", "is_restricted": True},

        # FRAGRANCE & OILS
        {"name": "Fragrance", "hazard_score": 8, "description": "Undisclosed chemicals, allergens.", "is_restricted": False},
        {"name": "Parfum", "hazard_score": 8, "description": "Synonym for Fragrance.", "is_restricted": False},
        {"name": "Limonene", "hazard_score": 6, "description": "Citrus scent, allergen.", "is_restricted": False},
        {"name": "Linalool", "hazard_score": 5, "description": "Floral scent, allergen.", "is_restricted": False},
        {"name": "Citronellol", "hazard_score": 5, "description": "Rose scent, allergen.", "is_restricted": False},
        {"name": "Argania Spinosa Kernel Oil", "hazard_score": 0, "description": "Argan oil, enriching.", "is_restricted": False},
        {"name": "Cocos Nucifera Oil", "hazard_score": 0, "description": "Coconut oil.", "is_restricted": False},
        {"name": "Butyrospermum Parkii Butter", "hazard_score": 0, "description": "Shea butter.", "is_restricted": False},

        # OTHERS
        {"name": "Citric Acid", "hazard_score": 2, "description": "pH adjuster.", "is_restricted": False},
        {"name": "Sodium Chloride", "hazard_score": 0, "description": "Salt, thickener.", "is_restricted": False},
        {"name": "Sodium Hydroxide", "hazard_score": 3, "description": "pH adjuster, irritant neat.", "is_restricted": False},
        {"name": "Tetrasodium EDTA", "hazard_score": 2, "description": "Chelating agent.", "is_restricted": False},
        {"name": "Disodium EDTA", "hazard_score": 2, "description": "Chelating agent.", "is_restricted": False},
        {"name": "Cocamide MEA", "hazard_score": 5, "description": "Foaming agent, contamination risk.", "is_restricted": False},
        {"name": "Cocamide DEA", "hazard_score": 7, "description": "Carcinogen suspect. California Prop 65 listed.", "is_restricted": True},
        {"name": "Propylene Glycol", "hazard_score": 3, "description": "Penetration enhancer.", "is_restricted": False},
        {"name": "Alcohol Denat", "hazard_score": 4, "description": "Drying alcohol.", "is_restricted": False},
        {"name": "Cetyl Alcohol", "hazard_score": 1, "description": "Fatty alcohol, good.", "is_restricted": False},
        {"name": "Stearyl Alcohol", "hazard_score": 1, "description": "Fatty alcohol, good.", "is_restricted": False},
        
        # MISSING ITEMS FROM SCREENSHOT
        {"name": "TEA-Dodecylbenzenesulfonate", "hazard_score": 3, "description": "Surfactant/Cleanser. Safe in rinse-off products.", "is_restricted": False},
        {"name": "Dodecylbenzenesulfonate", "hazard_score": 3, "description": "Surfactant/Cleanser.", "is_restricted": False},
        {"name": "TEA-Sulfate", "hazard_score": 4, "description": "Surfactant. Potential sensitizer.", "is_restricted": False},
        {"name": "Sodium Salicylate", "hazard_score": 3, "description": "Preservative/Anti-dandruff.", "is_restricted": False},
        {"name": "Laureth-7", "hazard_score": 3, "description": "Emulsifier. Contamination concern (1,4-dioxane).", "is_restricted": False},
        {"name": "PPG-9", "hazard_score": 3, "description": "Emollient/Solvent.", "is_restricted": False},
        {"name": "Carbomer", "hazard_score": 1, "description": "Thickener. Safe.", "is_restricted": False},
        {"name": "Mica", "hazard_score": 2, "description": "Mineral pigment.", "is_restricted": False},
        {"name": "Titanium Dioxide", "hazard_score": 3, "description": "Pigment/Sunscreen. Safe on skin.", "is_restricted": False},
        {"name": "CI 77891", "hazard_score": 3, "description": "Titanium Dioxide (Pigment).", "is_restricted": False},
        {"name": "Lysine HCl", "hazard_score": 0, "description": "Amino acid. Hair conditioning.", "is_restricted": False},
        {"name": "Zinc Gluconate", "hazard_score": 0, "description": "Skin conditioning.", "is_restricted": False},
        {"name": "Hydroxypropyl Methylcellulose", "hazard_score": 0, "description": "Thickener/Stabilizer.", "is_restricted": False},
        {"name": "Ehtylhexyl Methoxycinnamate", "hazard_score": 5, "description": "UV Filter. Endocrine disruption concern.", "is_restricted": False},
        {"name": "BHT", "hazard_score": 6, "description": "Antioxidant. Lung/Skin irritant.", "is_restricted": True},
        {"name": "Butylated Hydroxytoluene", "hazard_score": 6, "description": "Antioxidant (BHT).", "is_restricted": True},
        # SPECIFIC FRAGRANCE ALLERGENS & BANNED ITEMS
        {"name": "Benzyl Benzoate", "hazard_score": 5, "description": "Fragrance ingredient/Solvent. Known allergen.", "is_restricted": True},
        {"name": "Butylphenyl Methylpropional", "hazard_score": 10, "description": "Lilial. Reprotoxic. BANNED in EU & UK.", "is_restricted": True},
        {"name": "Coumarin", "hazard_score": 7, "description": "Fragrance. Strong allergen. Restricted concentration.", "is_restricted": True},
        {"name": "Hexyl Cinnamal", "hazard_score": 5, "description": "Fragrance. Known allergen.", "is_restricted": True},
        {"name": "Linalool", "hazard_score": 5, "description": "Fragrance. Common allergen (Lavender).", "is_restricted": True},
        {"name": "Amyl Cinnamal", "hazard_score": 5, "description": "Fragrance. Known allergen.", "is_restricted": True},
        {"name": "Citral", "hazard_score": 5, "description": "Fragrance. Known allergen (Citrus).", "is_restricted": True},
        {"name": "Eugenol", "hazard_score": 5, "description": "Fragrance. Known allergen (Clove).", "is_restricted": True},
        {"name": "Geraniol", "hazard_score": 5, "description": "Fragrance. Known allergen (Rose).", "is_restricted": True},
        {"name": "Benzyl Salicylate", "hazard_score": 5, "description": "Fragrance/UV absorber. Allergen.", "is_restricted": True},
        {"name": "Limonene", "hazard_score": 5, "description": "Fragrance (Citrus). Allergen.", "is_restricted": True},

        # HERBAL & ACTIVE INGREDIENTS
        {"name": "Amla", "hazard_score": 0, "description": "Indian Gooseberry. Hair tonic.", "is_restricted": False},
        {"name": "Emblica officinalis", "hazard_score": 0, "description": "Amla.", "is_restricted": False},
        {"name": "Hibiscus rosa-sinensis", "hazard_score": 0, "description": "Hibiscus. Hair growth promoter.", "is_restricted": False},
        {"name": "Reetha", "hazard_score": 0, "description": "Soapnut. Natural cleanser.", "is_restricted": False},
        {"name": "Sapindus trifoliatus", "hazard_score": 0, "description": "Reetha.", "is_restricted": False},
        {"name": "Methi", "hazard_score": 0, "description": "Fenugreek. Conditioning.", "is_restricted": False},
        {"name": "Trigonella foenum-graeceum", "hazard_score": 0, "description": "Fenugreek.", "is_restricted": False},
        {"name": "Henna", "hazard_score": 1, "description": "Natural dye/Conditioner. Safe.", "is_restricted": False},
        {"name": "Lawsonia inermis", "hazard_score": 1, "description": "Henna.", "is_restricted": False},
        {"name": "Badam", "hazard_score": 0, "description": "Almond.", "is_restricted": False},
        {"name": "Prunus amygdalus", "hazard_score": 0, "description": "Sweet Almond.", "is_restricted": False},
        {"name": "Mulethi", "hazard_score": 0, "description": "Licorice root. Soothing.", "is_restricted": False},
        {"name": "Glycyrrhiza glabra", "hazard_score": 0, "description": "Licorice.", "is_restricted": False},
        {"name": "Bhringraj", "hazard_score": 0, "description": "Hair growth herb.", "is_restricted": False},
        {"name": "Eclipta alba", "hazard_score": 0, "description": "Bhringraj.", "is_restricted": False},
        {"name": "Kumari", "hazard_score": 0, "description": "Aloe Vera.", "is_restricted": False},
        {"name": "Aloe barbadensis", "hazard_score": 0, "description": "Aloe Vera.", "is_restricted": False},
        {"name": "Rosemary Oil", "hazard_score": 1, "description": "Essential oil. Stimulates scalp.", "is_restricted": False},
        {"name": "Tea Tree Oil", "hazard_score": 2, "description": "Antimicrobial. Can irritate sensitive skin.", "is_restricted": False},
        {"name": "Menthol", "hazard_score": 2, "description": "Cooling agent. Irritant for eyes.", "is_restricted": False},
        {"name": "Salicylic Acid", "hazard_score": 4, "description": "Exfoliant/Preservative. Restricted in children's products.", "is_restricted": True},
        {"name": "Lactic Acid", "hazard_score": 2, "description": "AHA Exfoliant.", "is_restricted": False},
        {"name": "Zinc Pyrithione", "hazard_score": 6, "description": "Anti-dandruff. Restricted.", "is_restricted": True},
        {"name": "Climbazole", "hazard_score": 4, "description": "Anti-fungal preservative.", "is_restricted": False},

        # FUNCTIONAL CHEMICALS & EXCIPIENTS
        {"name": "Glycol Distearate", "hazard_score": 1, "description": "Pearlizing agent.", "is_restricted": False},
        {"name": "Sodium Citrate", "hazard_score": 0, "description": "pH buffer.", "is_restricted": False},
        {"name": "Sodium Xylenesulfonate", "hazard_score": 1, "description": "Surfactant/Thickener.", "is_restricted": False},
        {"name": "Guar Hydroxypropyltrimonium Chloride", "hazard_score": 1, "description": "Conditioning agent.", "is_restricted": False},
        {"name": "Polydimethylsiloxane", "hazard_score": 3, "description": "Dimethicone (Silicone).", "is_restricted": False},
        {"name": "Laureth-4", "hazard_score": 3, "description": "Emulsifier. Contamination risk.", "is_restricted": False},
        {"name": "Cocodimonium Hydroxypropyl Hydrolyzed Wheat Protein", "hazard_score": 0, "description": "Conditioning protein.", "is_restricted": False},
        {"name": "Dimethiconol", "hazard_score": 3, "description": "Silicone gum.", "is_restricted": False},
        {"name": "Sodium Lauroyl Isethionate", "hazard_score": 1, "description": "Mild surfactant.", "is_restricted": False},
        {"name": "Stearic Acid", "hazard_score": 0, "description": "Fatty acid/Thickener.", "is_restricted": False},
        {"name": "Sodium Palmitate", "hazard_score": 0, "description": "Cleansing agent (Soap).", "is_restricted": False},
        {"name": "Mineral Oil", "hazard_score": 1, "description": "Occlusive moisturizer.", "is_restricted": False},
        {"name": "Shea Oil", "hazard_score": 0, "description": "Moisturizer.", "is_restricted": False},
        {"name": "PPG-5-Ceteth-20", "hazard_score": 3, "description": "Emulsifier. Contamination risk.", "is_restricted": False},
        {"name": "2-Oleamido-1,3-Octadecanediol", "hazard_score": 0, "description": "Ceramide. Identical to skin lipids.", "is_restricted": False},

        # COLORS
        {"name": "CI 19140", "hazard_score": 3, "description": "Yellow 5. Artificial color.", "is_restricted": False},
        {"name": "CI 16035", "hazard_score": 3, "description": "Red 40. Artificial color.", "is_restricted": False},
        {"name": "Quinoline Yellow WS", "hazard_score": 4, "description": "Synthetic yellow dye.", "is_restricted": True},
        {"name": "Quinazarine Green SS", "hazard_score": 5, "description": "Synthetic dye.", "is_restricted": True},
        {"name": "Titanium Dioxide", "hazard_score": 2, "description": "Whitening pigment.", "is_restricted": False},
    ]

    for item in ingredients_data:
        # Check if exists
        exists = db.query(Ingredient).filter(Ingredient.name == item["name"]).first()
        if not exists:
            new_item = Ingredient(
                name=item["name"],
                hazard_score=item["hazard_score"],
                description=item["description"],
                concerns=item.get("description", ""), # Using description as concerns for now
                is_restricted=item["is_restricted"],
                common_names=item["name"].lower() # Simple default
            )
            db.add(new_item)
            print(f"Added {item['name']}")
        else:
            print(f"Skipped {item['name']} (already exists)")

    db.commit()
    db.close()

if __name__ == "__main__":
    seed_data()
