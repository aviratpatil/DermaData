"use client";

import { useState } from "react";
import { AnalysisResult, Ingredient } from "@/types";
import { safeRecommendations } from "@/data/recommendations";
import { Alert } from "./ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CheckCircle, AlertTriangle, XCircle, Info, ThumbsDown, ThumbsUp, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface ResultsViewProps {
    result: AnalysisResult;
    onReset: () => void;
}

export function ResultsView({ result, onReset }: ResultsViewProps) {
    const { score, status, isBanned, bannedIngredients, analyzedIngredients, unknownIngredients, synergies } = result;
    const [feedbackGiven, setFeedbackGiven] = useState(false);

    const handleFeedback = (reaction: boolean) => {
        if (reaction) {
            // Cognitive Learning: Store bad ingredients
            const current = JSON.parse(localStorage.getItem("user_sensitivities") || "[]");
            const names = analyzedIngredients.map(i => i.names[0]);
            const updated = Array.from(new Set([...current, ...names]));
            localStorage.setItem("user_sensitivities", JSON.stringify(updated));
        }
        setFeedbackGiven(true);
    };

    // Determine Color Scheme
    let color = "emerald";
    if (status === "Caution") color = "amber";
    if (status === "Avoid" || status === "Banned") color = "rose";

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* 1. CRITICAL BAN ALERT */}
            {isBanned && (
                <Alert
                    variant="destructive"
                    title="CRITICAL WARNING: BANNED SUBSTANCE DETECTED"
                    description={`This product contains ${bannedIngredients.join(", ")}, which are prohibited by safety regulations. Do not use.`}
                    className="border-2 border-rose-500 shadow-xl shadow-rose-100"
                />
            )}

            {/* 1.5 Synergy Alerts (Cognitive Learning) */}
            {synergies && synergies.length > 0 && (
                <div className="space-y-3">
                    {synergies.map((synergy, idx) => (
                        <div key={idx} className="rounded-xl border border-purple-200 bg-purple-50 p-4 flex gap-3 animate-in fade-in slide-in-from-top-4" style={{ animationDelay: `${idx * 150}ms` }}>
                            <AlertTriangle className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-bold text-purple-900 text-sm">{synergy.title}</h4>
                                <p className="text-purple-700 text-sm mt-1 leading-snug">{synergy.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* 2. Score Section */}
            <Card className="bg-white/80 backdrop-blur-xl border-slate-200">
                <CardContent className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-16">

                    {/* Circular Progress */}
                    <div className="relative w-48 h-48 flex items-center justify-center">
                        {/* Background Circle */}
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="96"
                                cy="96"
                                r="88"
                                fill="transparent"
                                stroke="currentColor"
                                strokeWidth="12"
                                className="text-slate-100"
                            />
                            {/* Progress Circle - Animated */}
                            <motion.circle
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: score / 100 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                cx="96"
                                cy="96"
                                r="88"
                                fill="transparent"
                                stroke="currentColor"
                                strokeWidth="12"
                                strokeLinecap="round"
                                className={`text-${color}-500`}
                                style={{ strokeDasharray: 565, strokeDashoffset: 0 }}
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className={`text-5xl font-extrabold text-${color}-600`}>{score}%</span>
                            <span className={`text-sm font-bold uppercase tracking-wide text-${color}-600/80`}>{status}</span>
                        </div>
                    </div>

                    <div className="flex-1 text-center md:text-left space-y-4">
                        <h2 className="text-3xl font-bold text-slate-800">Safety Analysis Report</h2>
                        <p className="text-slate-600 leading-relaxed">
                            We analyzed <strong>{analyzedIngredients.length} ingredients</strong>.
                            {isBanned
                                ? " Due to the presence of banned substances, this product receives an automatic failure rating."
                                : score > 79
                                    ? " This product appears largely clean and safe based on current toxicology data."
                                    : " Several ingredients raise potential health concerns. Review the breakdown below."
                            }
                        </p>
                        <button
                            onClick={onReset}
                            className="mt-4 text-sm font-semibold text-slate-500 hover:text-emerald-600 underline decoration-2 underline-offset-4 transition-colors"
                        >
                            Analyze Another Product
                        </button>
                    </div>
                </CardContent>
            </Card>

            {/* 2.5 Safe Recommendations (Phase 9 Revenue) */}
            {(status === "Avoid" || status === "Banned" || score < 50) && (
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-emerald-100 rounded-full text-emerald-600">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-emerald-900">Top Herbal Alternatives (India)</h3>
                            <p className="text-sm text-emerald-700">Safe, Ayurvedic options available on Amazon.in</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {safeRecommendations.map((rec) => (
                            <Card key={rec.id} className="bg-white border-emerald-100 hover:shadow-md transition-shadow">
                                <CardContent className="p-4 flex flex-col gap-3">
                                    <div className="bg-slate-100 w-full h-32 rounded-md flex items-center justify-center text-slate-400 text-xs">
                                        {/* Placeholder Image */}
                                        <img src={rec.image} alt={rec.name} className="w-full h-full object-cover rounded-md opacity-80 hover:opacity-100 transition-opacity" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 text-sm line-clamp-1">{rec.name}</h4>
                                        <p className="text-xs text-slate-500">{rec.brand}</p>
                                    </div>
                                    <div className="flex items-center justify-between mt-auto">
                                        <span className="text-emerald-600 font-bold text-sm">{rec.score}% Safe</span>
                                        <a href={rec.link} target="_blank" rel="noopener noreferrer" className="text-xs bg-slate-900 text-white px-3 py-1.5 rounded-full hover:bg-emerald-600 transition-colors">
                                            {rec.price}
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* 2.5 Cognitive Feedback Loop */}
            {!feedbackGiven ? (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <h4 className="font-semibold text-slate-800">Cognitive Learning</h4>
                        <p className="text-sm text-slate-500">
                            Did this product cause you an allergic reaction? We'll remember this for next time.
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => handleFeedback(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-rose-100 text-rose-700 rounded-lg hover:bg-rose-200 transition-colors text-sm font-medium"
                        >
                            <ThumbsDown className="w-4 h-4" /> Yes, reacted
                        </button>
                        <button
                            onClick={() => handleFeedback(false)}
                            className="flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors text-sm font-medium"
                        >
                            <ThumbsUp className="w-4 h-4" /> No, safe
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 text-center text-emerald-700 text-sm font-medium animate-in fade-in">
                    Thank you! Your sensitivity profile has been updated.
                </div>
            )}

            {/* 3. Ingredient Breakdown */}
            <h3 className="text-xl font-bold text-slate-900 px-2">Detailed Breakdown</h3>
            <div className="grid gap-4 md:grid-cols-2">
                {analyzedIngredients.map((ing) => (
                    <IngredientCard key={ing.id} ingredient={ing} />
                ))}
            </div>

            {/* 4. Unknown Ingredients */}
            {unknownIngredients && unknownIngredients.length > 0 && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-3">
                        <Info className="w-5 h-5 text-slate-400" />
                        <h3 className="font-semibold text-slate-700">Unverified Ingredients</h3>
                    </div>
                    <p className="text-sm text-slate-500 mb-3">
                        We could not analyze the following ingredients. They may be safe spelling variations or rare compounds not yet in our database.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {unknownIngredients.map((ing, i) => (
                            <span key={i} className="px-3 py-1 bg-slate-200 text-slate-600 rounded-full text-xs font-medium">
                                {ing}
                            </span>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
}

function IngredientCard({ ingredient }: { ingredient: Ingredient }) {
    const isToxic = ingredient.scores.carcinogenicity > 0 || ingredient.scores.endocrine_disruption > 0 || ingredient.regulation.includes("Banned");
    const isAllergen = ingredient.scores.allergen_potential > 5;

    return (
        <Card className={`transition-colors ${isToxic ? "border-rose-100 bg-rose-50/30" : "hover:border-emerald-200"}`}>
            <CardHeader className="flex flex-row items-start justify-between pb-2 mb-0">
                <div>
                    <CardTitle className="text-base text-slate-800">{ingredient.names[0]}</CardTitle>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mt-1">{ingredient.category}</p>
                </div>
                {isToxic ? (
                    <AlertTriangle className="w-5 h-5 text-rose-400" />
                ) : (
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                )}
            </CardHeader>

            <CardContent className="space-y-3 text-sm">
                <p className="text-slate-600 min-h-[40px]">{ingredient.description}</p>

                {/* Chips for Hazards */}
                <div className="flex flex-wrap gap-2 text-xs font-semibold">
                    {ingredient.scores.carcinogenicity > 0 && (
                        <span className="px-2 py-1 bg-rose-100 text-rose-700 rounded-md">Carcinogen Risk</span>
                    )}
                    {ingredient.scores.endocrine_disruption > 0 && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-md">Endocrine Disruptor</span>
                    )}
                    {isAllergen && (
                        <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-md">High Allergen</span>
                    )}
                    {ingredient.regulation !== "Safe" && (
                        <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-md border border-slate-200">{ingredient.regulation}</span>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
