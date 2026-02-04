import { cn } from "@/lib/utils";
import { AlertTriangle, XCircle } from "lucide-react";

interface AlertProps {
    title: string;
    description?: string;
    variant?: "destructive" | "warning";
    className?: string;
}

export function Alert({ title, description, variant = "destructive", className }: AlertProps) {
    const isDestructive = variant === "destructive";

    return (
        <div
            className={cn(
                "rounded-xl p-4 flex gap-4 items-start border shadow-sm animate-in fade-in slide-in-from-top-2",
                isDestructive
                    ? "bg-rose-50 border-rose-200 text-rose-900"
                    : "bg-amber-50 border-amber-200 text-amber-900",
                className
            )}
        >
            <div className={cn("mt-0.5 shrink-0", isDestructive ? "text-rose-600" : "text-amber-600")}>
                {isDestructive ? <XCircle className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
            </div>

            <div className="flex-1">
                <h5 className="font-bold mb-1 leading-none tracking-tight">{title}</h5>
                {description && <div className="text-sm opacity-90 leading-relaxed">{description}</div>}
            </div>
        </div>
    );
}
