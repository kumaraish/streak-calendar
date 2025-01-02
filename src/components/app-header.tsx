"use client";

import { locales } from "@/i18n/settings";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { XLogo } from "./ui/x-logo";

/**
 * AppHeader Component
 *
 * A responsive navigation header component that includes:
 * - Logo and brand name
 * - Navigation links (desktop)
 * - Mobile menu toggle
 * - Theme toggle
 * - Authentication-based actions (Sign in/User button)
 */

export function AppHeader() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const redirectedPathname = (path: string) => {
    if (!pathname) return "/";

    const segments = pathname.split("/").filter(Boolean);
    const currentLocale = segments[0];
    const isLocaleSegment = locales.includes(currentLocale as (typeof locales)[number]);

    return `${isLocaleSegment ? `/${currentLocale}` : ""}${path}`;
  };

  return (
    <header className="border-b border-border">
      <div className="container mx-auto px-3 md:px-4">
        <div className="relative flex h-14 items-center justify-between md:h-16">
          {/* Logo */}
          <div className="flex shrink-0 items-center">
            <Link href="/" className="flex items-center gap-1.5 text-lg font-bold md:gap-2 md:text-xl">
              <XLogo className="h-5 w-5 flex-shrink-0 fill-red-500 drop-shadow-lg md:h-6 md:w-6" />
              <span className="whitespace-nowrap text-primary drop-shadow-lg">{t("app.name")}</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden flex-1 items-center justify-center gap-4 px-4 md:flex md:gap-6">
            <Link
              href={redirectedPathname("/about")}
              className="text-xs font-medium hover:text-muted-foreground md:text-sm"
            >
              {t("about")}
            </Link>
            <Link
              href={redirectedPathname("/calendars")}
              className="text-xs font-medium hover:text-muted-foreground md:text-sm"
            >
              {t("calendar")}
            </Link>
            <Link
              href={redirectedPathname("/pricing")}
              className="text-xs font-medium hover:text-muted-foreground md:text-sm"
            >
              {t("pricing")}
            </Link>
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-1.5 md:gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-9 w-9 md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
            <ThemeToggle />
            <SignedOut>
              <Button asChild size="sm" className="h-8 text-xs md:h-9 md:text-sm">
                <Link href={redirectedPathname("/pricing")}>{t("getStarted")}</Link>
              </Button>
            </SignedOut>
            <div className="flex scale-90 md:mx-2 md:scale-110">
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-b bg-background md:hidden">
            <div className="flex flex-col gap-3 py-3 md:gap-4 md:py-4">
              <Link
                href={redirectedPathname("/about")}
                className="text-xs font-medium hover:text-muted-foreground md:text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("about")}
              </Link>
              <Link
                href={redirectedPathname("/calendars")}
                className="text-xs font-medium hover:text-muted-foreground md:text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("calendar")}
              </Link>
              <Link
                href={redirectedPathname("/pricing")}
                className="text-xs font-medium hover:text-muted-foreground md:text-sm"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("pricing")}
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
