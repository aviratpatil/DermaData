import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
}

export function Card({ children, className }: CardProps) {
    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-2xl border border-slate-200 bg-white/60 p-6 shadow-xl backdrop-blur-md transition-all hover:shadow-2xl hover:bg-white/80",
                className
            )}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
            <div className="relative z-10">{children}</div>
        </div>
    );
}

export function CardHeader({ children, className }: CardProps) {
    return <div className={cn("mb-4", className)}>{children}</div>;
}

export function CardTitle({ children, className }: CardProps) {
    return (
        <h3 className={cn("text-xl font-bold text-slate-900 tracking-tight", className)}>
            {children}
        </h3>
    );
}

export function CardContent({ children, className }: CardProps) {
    return <div className={cn("text-slate-600", className)}>{children}</div>;
}
