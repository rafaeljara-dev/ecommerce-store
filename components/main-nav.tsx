"use client";

import Link from "next/link"
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils"
import { Category } from "@/types";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

interface MainNavProps {
  data: Category[];
}

const MainNav: React.FC<MainNavProps> = ({
  data
}) => {
  const pathname = usePathname();

  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  return (
    <>
      <nav
        className="mx-6 flex items-center space-x-4 lg:space-x-6 hidden lg:block"
      >
        {routes.map((route) => (
          <>
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-black',
                route.active ? 'text-black' : 'text-neutral-500'
              )}
            >
              {route.label}
            </Link>
          </>
        ))}
      </nav>

      <Sheet>
        <SheetTrigger className="lg:hidden" asChild>
          <Button className="py-2">Menú</Button>
        </SheetTrigger>
        <SheetContent className="bg-white">
          <SheetHeader>
            <SheetTitle>Categorys</SheetTitle>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            {routes.map((route) => (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      'text-sm font-medium transition-colors hover:text-black sm:hidden',
                      route.active ? 'text-black' : 'text-neutral-500'
                    )}
                  >
                    {route.label}
                  </Link>
                </div>
              </>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
};

export default MainNav;