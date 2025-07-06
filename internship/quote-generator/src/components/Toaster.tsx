"use client";
import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      position="top-center"
      richColors
      closeButton
      duration={3000}
      toastOptions={{
        style: {
          background: 'hsl(var(--background))',
          color: 'hsl(var(--foreground))',
          border: '1px solid hsl(var(--border))',
          borderRadius: '12px',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          fontSize: '14px',
          fontWeight: '500',
        },
        className: 'glass backdrop-blur-sm',
        success: {
          style: {
            background: 'hsl(var(--success) / 0.1)',
            border: '1px solid hsl(var(--success) / 0.3)',
            color: 'hsl(var(--success))',
          },
          iconTheme: {
            primary: 'hsl(var(--success))',
            secondary: 'hsl(var(--success) / 0.1)',
          },
        },
        error: {
          style: {
            background: 'hsl(var(--destructive) / 0.1)',
            border: '1px solid hsl(var(--destructive) / 0.3)',
            color: 'hsl(var(--destructive))',
          },
          iconTheme: {
            primary: 'hsl(var(--destructive))',
            secondary: 'hsl(var(--destructive) / 0.1)',
          },
        },
        loading: {
          style: {
            background: 'hsl(var(--primary) / 0.1)',
            border: '1px solid hsl(var(--primary) / 0.3)',
            color: 'hsl(var(--primary))',
          },
        },
      }}
    />
  );
} 