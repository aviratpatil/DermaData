# Ingredient Safety Analyzer 🧴

An intelligent web application that analyzes the safety of shampoo and cosmetic ingredients. It uses a **Rank-Weighted Hazard Index** algorithm to score products and provides detailed breakdowns of potential risks.

## 🚀 Features

*   **Smart Ingredient Analysis**: Instantly parses complex ingredient lists.
*   **AI Heuristic Classifier**: Automatically detects and scores unknown chemicals based on scientific naming conventions (e.g., "-sulfate", "-paraben", "-extract").
*   **Rank-Weighted Scoring**: Prioritizes the safety of the first 5 ingredients (which make up ~80% of the product volume).
*   **Restricted Substance Detection**: Immediately flags banned or restricted ingredients (Lilial, Formaldehyde, etc.) with a "Not Recommended" warning.
*   **Premium Glassmorphism UI**: A beautiful, responsive interface built with React and Tailwind CSS.
*   **History & Export**: Saves recent scans locally and allows PDF report generation.

## 🧪 Safety Score Formula & Logic

The application uses a **Rank-Weighted Hazard Index (RWHI)**. This logic is arguably more accurate than simple averaging because it accounts for concentration.

### 1. Ingredient Hazard Score (0-10)
Each ingredient is assigned a hazard score based on general scientific consensus (e.g., EWG/CIR data):
*   **0-2 (Safe)**: Water, Plant Extracts, Mild Surfactants (e.g., *Aloe Vera*, *Coco-Glucoside*).
*   **3-6 (Moderate)**: Strong Surfactants, Synthetic Emollients (e.g., *SLS*, *Dimethicone*).
*   **7-10 (High/Restricted)**: Parabens, Formaldehyde Releasers, Banned Substances (e.g., *Lilial*, *Methylisothiazolinone*).

### 2. Position Weighting
Ingredients listed first are in the highest concentration. We weight them accordingly:
*   **Ingredients 1-5**: Weight **3.0x** (High impact)
*   **Ingredients 6-10**: Weight **2.0x** (Moderate impact)
*   **Ingredients 11+**: Weight **1.0x** (Low impact)

### 3. The Calculation
The score is calculated as a safety percentage:
$$
Score = 100 - (\frac{\text{Total Weighted Hazards}}{\text{Maximum Possible Hazards}} \times 100)
$$

### 4. Restricted Ingredient Rule
If a product contains a **Banned** or **Restricted** ingredient (e.g., Lilial), the app:
1.  Calculates the numerical score normally (e.g., 65%).
2.  **OVERRIDES** the Risk Label to **"Not Recommended"**.
3.  Displays a prominent Red Warning.

*This ensures you see the nuance (it might be 90% safe otherwise) but are strictly warned about the one bad apple.*

## 🛠️ Tech Stack

*   **Backend**: Python, FastAPI, SQLAlchemy, SQLite.
*   **Frontend**: React, Vite, Tailwind CSS, Framer Motion.
*   **Data**: Custom SQLite database with seed data + AI Classifier for unknowns.

## 🔮 Future Roadmap

1.  **Optical Character Recognition (OCR)**: Allow users to take a photo of the bottle instead of pasting text.
2.  **Community Database**: Allow verified users to submit new ingredient data.
3.  **Barcode Scanning**: Integration with GS1/OpenBeautyFacts API for instant product lookup.
4.  **Personalized Alerts**: Users can flag specific allergens (e.g., "Warn me about Nuts/Gluten").

## 💿 How to Run

### Backend
```powershell
cd backend
.\venv\Scripts\Activate
uvicorn app.main:app --reload
```

### Frontend
```powershell
cd frontend
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) (or the port shown in terminal).
