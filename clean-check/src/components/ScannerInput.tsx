"use client";

import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Sparkles, Search, AlertCircle, Camera, Loader2, ScanBarcode } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ResultsView } from "./ResultsView";
import { AnalysisResult } from "@/types";
import { extractTextFromImage } from "@/lib/ocr";
import { cleanText } from "@/lib/utils";

export function ScannerInput() {
    const [input, setInput] = useState("");
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [isBarcodeLoading, setIsBarcodeLoading] = useState(false);
    const [result, setResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAnalyze = async () => {
        if (!input.trim()) return;

        setIsAnalyzing(true);
        setError("");

        try {
            const response = await fetch("/api/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: input }),
            });

            if (!response.ok) throw new Error("Analysis failed");

            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsScanning(true);
        setError("");

        try {
            const tempText = await extractTextFromImage(file);
            const clean = cleanText(tempText);
            setInput((prev) => prev ? prev + ", " + clean : clean);
        } catch (err) {
            setError("Could not read text from image. Please try a clearer photo.");
        } finally {
            setIsScanning(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleBarcodeSimulate = async () => {
        setIsBarcodeLoading(true);
        setError("");

        try {
            // Simulate scanning a popular product (Pantene Pro-V via OpenFoodFacts)
            const response = await fetch("https://world.openfoodfacts.org/api/v0/product/5410076753386.json");

            if (!response.ok) throw new Error("Failed to fetch product data");

            const data = await response.json();

            if (data.status === 1 && data.product && data.product.ingredients_text) {
                const rawIngredients = data.product.ingredients_text;
                const clean = cleanText(rawIngredients);
                setInput((prev) => prev ? prev + ", " + clean : clean);
            } else {
                throw new Error("Product ingredients not found");
            }

        } catch (err) {
            setError("Could not fetch barcode data. Try again.");
        } finally {
            setIsBarcodeLoading(false);
        }
    };

    const handleReset = () => {
        setResult(null);
        setInput("");
    };

    if (result) {
        return <ResultsView result={result} onReset={handleReset} />;
    }

    return (
        <section className="w-full max-w-3xl mx-auto px-4 -mt-10 relative z-20 pb-20">
            <AnimatePresence mode="wait">
                <motion.div
                    key="input-form"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Card className="border-0 shadow-2xl shadow-emerald-900/10 bg-white/80 backdrop-blur-xl">
                        <CardContent className="p-0">
                            <div className="flex flex-col gap-4 p-6 sm:p-8">
                                <div className="flex items-center justify-between mb-2">
                                    <label
                                        htmlFor="ingredients"
                                        className="text-sm font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2"
                                    >
                                        <Search className="w-4 h-4" />
                                        Paste Ingredients List
                                    </label>
                                    <span className="text-xs text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                                        Supports comma-separated text
                                    </span>
                                </div>

                                <textarea
                                    id="ingredients"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Example: Water, Sodium Lauryl Sulfate, Parabens, Fragrance..."
                                    className="w-full h-40 p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all resize-none text-base leading-relaxed"
                                    spellCheck={false}
                                    disabled={isScanning || isBarcodeLoading}
                                />

                                {/* Hidden File Input */}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />

                                {error && (
                                    <div className="flex items-center gap-2 text-rose-600 text-sm font-medium">
                                        <AlertCircle className="w-4 h-4" />
                                        {error}
                                    </div>
                                )}

                                <div className="flex flex-col sm:flex-row gap-3 justify-end pt-2">
                                    {/* Scan Label Button */}
                                    <Button
                                        variant="outline"
                                        onClick={() => fileInputRef.current?.click()}
                                        disabled={isScanning || isAnalyzing || isBarcodeLoading}
                                        className="w-full sm:w-auto"
                                    >
                                        {isScanning ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin mr-2" /> OCR...
                                            </>
                                        ) : (
                                            <>
                                                <Camera className="w-4 h-4 mr-2" /> Scan Label
                                            </>
                                        )}
                                    </Button>

                                    {/* Barcode Button (New) */}
                                    <Button
                                        variant="outline"
                                        onClick={handleBarcodeSimulate}
                                        disabled={isScanning || isAnalyzing || isBarcodeLoading}
                                        className="w-full sm:w-auto"
                                    >
                                        {isBarcodeLoading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin mr-2" /> Fetching...
                                            </>
                                        ) : (
                                            <>
                                                <ScanBarcode className="w-4 h-4 mr-2" /> Scan Barcode
                                            </>
                                        )}
                                    </Button>

                                    {/* Analyze Button */}
                                    <Button
                                        size="lg"
                                        className="w-full sm:w-auto"
                                        onClick={handleAnalyze}
                                        disabled={!input.trim() || isAnalyzing || isScanning || isBarcodeLoading}
                                    >
                                        {isAnalyzing ? (
                                            <span className="flex items-center gap-2">
                                                <Sparkles className="w-4 h-4 animate-spin" /> Analyzing...
                                            </span>
                                        ) : (
                                            "Analyze Safety Profile"
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </AnimatePresence>
        </section>
    );
}
