import React from 'react';
import { AlertCircle, CheckCircle, ShieldAlert } from 'lucide-react';

const IngredientBreakdown = ({ ingredients }) => {
    return (
        <div className="glass-card p-6 mt-6">
            <h3 className="text-xl font-semibold mb-4 text-white">Ingredient Breakdown</h3>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {ingredients.map((ing, idx) => (
                    <div
                        key={idx}
                        className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                    >
                        {/* Icon based on hazard score */}
                        <div className="mt-1">
                            {ing.hazard_score >= 7 ? (
                                <ShieldAlert className="text-danger" size={24} />
                            ) : ing.hazard_score >= 4 ? (
                                <AlertCircle className="text-warning" size={24} />
                            ) : (
                                <CheckCircle className="text-primary" size={24} />
                            )}
                        </div>

                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h4 className="font-medium text-white">{ing.name}</h4>
                                <span
                                    className={`text-xs px-2 py-1 rounded-full font-bold
                    ${ing.hazard_score >= 7 ? 'bg-danger/20 text-danger' :
                                            ing.hazard_score >= 4 ? 'bg-warning/20 text-warning' :
                                                'bg-primary/20 text-primary'}
                  `}
                                >
                                    Hazard: {ing.hazard_score}/10
                                </span>
                            </div>
                            <p className="text-sm text-gray-400 mt-1">{ing.description}</p>
                            {ing.is_restricted && (
                                <p className="text-xs text-danger mt-1 font-semibold uppercase tracking-wider">
                                    Restricted / Banned
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IngredientBreakdown;
