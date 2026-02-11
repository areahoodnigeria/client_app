import React from "react";

export const Card = ({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`glass-panel overflow-hidden ${className}`} {...props}>
    {children}
  </div>
);

export const CardHeader = ({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-6 border-b border-white/20 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = "", ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={`text-xl font-black tracking-tight ${className}`} {...props}>
    {children}
  </h3>
);

export const CardDescription = ({ children, className = "", ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={`text-sm font-bold text-muted-foreground mt-1 uppercase tracking-widest ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent = ({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-6 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`p-6 border-t border-white/20 ${className}`} {...props}>
    {children}
  </div>
);
