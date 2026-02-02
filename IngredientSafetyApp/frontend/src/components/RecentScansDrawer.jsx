import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, X, ChevronRight } from 'lucide-react';

const RecentScansDrawer = ({ isOpen, onClose, scans, onLoadScan }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 20 }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-slate-900 border-l border-white/10 shadow-2xl z-50 p-6 overflow-y-auto"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                <Clock className="text-primary" />
                                Recent Scans
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X size={20} className="text-gray-400" />
                            </button>
                        </div>

                        {scans.length === 0 ? (
                            <div className="text-center text-gray-500 mt-10">
                                <p>No recent scans found.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {scans.map((scan, index) => (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            onLoadScan(scan);
                                            onClose();
                                        }}
                                        className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-primary/30 cursor-pointer transition-all group"
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <span className={`text-lg font-bold ${scan.overall_safety_score >= 80 ? 'text-primary' :
                                                    scan.overall_safety_score >= 50 ? 'text-warning' : 'text-danger'
                                                }`}>
                                                {scan.overall_safety_score}% Safety
                                            </span>
                                            <ChevronRight size={16} className="text-gray-600 group-hover:text-white transition-colors" />
                                        </div>

                                        <p className="text-sm text-gray-400 line-clamp-2">
                                            {scan.ingredients_breakdown.map(i => i.name).join(', ')}
                                        </p>

                                        <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                                            <span>{scan.timestamp || 'Just now'}</span>
                                            <span>•</span>
                                            <span>{scan.risk_level}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default RecentScansDrawer;
