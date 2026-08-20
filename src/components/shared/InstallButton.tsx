"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download } from "lucide-react";

/**
 * PWA Install Button
 *
 * HOW IT WORKS (important PWA concept!):
 * ──────────────────────────────────────
 * 1. When the browser detects that your site meets PWA criteria (manifest + service worker + HTTPS),
 *    it fires a special event called "beforeinstallprompt".
 *
 * 2. We CAPTURE that event and save it in state. This is the only way to trigger the install dialog later.
 *
 * 3. When the user clicks our custom "Install App" button, we call event.prompt() which
 *    opens the native browser install dialog.
 *
 * 4. After installation, we hide the button since the app is already installed.
 *
 * NOTE: This button will ONLY appear when:
 *   - The site is served over HTTPS (or localhost)
 *   - The manifest.json is valid
 *   - A service worker is registered
 *   - The browser supports PWA installation (Chrome, Edge, Samsung Internet, etc.)
 *   - The app is NOT already installed
 */

// We need to extend the global type because TypeScript doesn't include 
// BeforeInstallPromptEvent by default — it's a non-standard browser API
interface BeforeInstallPromptEvent extends Event {
    prompt(): Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallButton() {
    // We store the browser's install prompt event here
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [isInstalled, setIsInstalled] = useState(false);

    useEffect(() => {
        // Step 1: Listen for the browser's "beforeinstallprompt" event
        const handleBeforeInstall = (e: Event) => {
            // Prevent the browser's default mini install bar from showing
            e.preventDefault();
            // Save the event so we can trigger it later from our custom button
            setDeferredPrompt(e as BeforeInstallPromptEvent);
        };

        // Step 2: Detect if the app is already installed
        const handleAppInstalled = () => {
            setDeferredPrompt(null);
            setIsInstalled(true);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstall);
        window.addEventListener("appinstalled", handleAppInstalled);

        // Check if already running as an installed PWA (standalone mode)
        if (window.matchMedia("(display-mode: standalone)").matches) {
            setIsInstalled(true);
        }

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
            window.removeEventListener("appinstalled", handleAppInstalled);
        };
    }, []);

    // Step 3: Handle the install button click
    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        // Show the browser's native install dialog
        await deferredPrompt.prompt();

        // Wait for the user's response
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") {
            setDeferredPrompt(null);
            setIsInstalled(true);
        }
    };

    // Don't show anything if: already installed OR browser hasn't offered the prompt yet
    if (isInstalled || !deferredPrompt) return null;

    return (
        <AnimatePresence>
            <motion.button
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={handleInstallClick}
                aria-label="Install App"
                title="Install App"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--cyan)]/30 bg-[var(--cyan)]/10 text-[var(--cyan)] transition-all duration-200 hover:border-[var(--cyan)]/60 hover:bg-[var(--cyan)]/20"
            >
                <Download className="h-4 w-4" />
            </motion.button>
        </AnimatePresence>
    );
}
