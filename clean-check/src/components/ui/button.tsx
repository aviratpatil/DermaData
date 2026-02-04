import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "destructive" | "outline";
    size?: "sm" | "md" | "lg";
}

// Combine standard button props with motion props
type CombinedProps = ButtonProps & HTMLMotionProps<"button">;

const Button = forwardRef<HTMLButtonElement, CombinedProps>(
    ({ className, variant = "primary", size = "md", children, ...props }, ref) => {

        const variants = {
            primary: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200/50",
            secondary: "bg-slate-900 text-white hover:bg-slate-800 shadow-md",
            destructive: "bg-rose-600 text-white hover:bg-rose-700 shadow-lg shadow-rose-200/50",
            outline: "border-2 border-slate-200 bg-transparent hover:bg-slate-50 text-slate-700",
        };

        const sizes = {
            sm: "px-3 py-1.5 text-xs",
            md: "px-6 py-3 text-sm",
            lg: "px-8 py-4 text-base",
        };

        return (
            <motion.button
                ref={ref}
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.02 }}
                className={cn(
                    "inline-flex items-center justify-center rounded-full font-semibold transition-colors disabled:opacity-50 disabled:pointer-events-none",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {children}
            </motion.button>
        );
    }
);

Button.displayName = "Button";

export { Button };
