import React from 'react';
import { motion } from 'framer-motion';

const SafetyGauge = ({ score }) => {
    // Determine color
    let color = "text-red-500";
    let strokeColor = "#EF4444"; // red-500

    if (score >= 80) {
        color = "text-primary";
        strokeColor = "#10B981"; // emerald-500
    } else if (score >= 50) {
        color = "text-warning";
        strokeColor = "#F59E0B"; // amber-500
    }

    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
        <div className="flex flex-col items-center justify-center relative">
            <div className="relative w-48 h-48 flex items-center justify-center">
                {/* Background Circle */}
                <svg className="transform -rotate-90 w-full h-full">
                    <circle
                        cx="96"
                        cy="96"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="transparent"
                        className="text-gray-800"
                    />
                    {/* Progress Circle */}
                    <motion.circle
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        cx="96"
                        cy="96"
                        r={radius}
                        stroke={strokeColor}
                        strokeWidth="12"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute flex flex-col items-center">
                    <span className={`text-5xl font-bold ${color}`}>
                        {Math.round(score)}%
                    </span>
                    <span className="text-gray-400 text-sm mt-1">Safety Score</span>
                </div>
            </div>
        </div>
    );
};

export default SafetyGauge;
