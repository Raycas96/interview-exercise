"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { menuItems } from "./constants";
import Link from "next/link";

export function Header() {
  return (
    <Disclosure
      as="header"
      className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur hover:cursor-default"
    >
      {({ open }) => (
        <>
          <div className="mx-auto flex h-16 w-full max-w-5xl items-center justify-between px-4">
            <Link href="/" className="text-lg font-semibold text-brand">
              Recipe Recommender
            </Link>

            <nav className="hidden items-center gap-6 md:flex">
              {menuItems.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-brand"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <DisclosureButton
              className="rounded p-2 text-foreground transition-colors hover:text-brand md:hidden"
              aria-label="Toggle navigation"
            >
              {open ? (
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              )}
            </DisclosureButton>
          </div>

          <DisclosurePanel className="border-t border-border px-4 py-3 md:hidden">
            <div className="flex flex-col gap-3">
              {menuItems.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-brand"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
