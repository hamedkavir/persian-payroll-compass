import { useEffect, useState } from "react";
import { Bell, CalendarDays, ChevronDown, LogOut, Search, Settings, User } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { currentUser, notifications } from "@/lib/demo-data";
import { jalaliLong } from "@/lib/format";

export function AppHeader() {
  const [today, setToday] = useState<string>("");
  useEffect(() => setToday(jalaliLong(new Date())), []);
  const unread = notifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border/70 bg-card/90 px-4 backdrop-blur md:px-6">
      <SidebarTrigger className="size-9 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground [&_svg]:rotate-180" />

      <div className="relative hidden max-w-md flex-1 sm:block">
        <Search className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="جستجوی کارمند، کد پرسنلی یا فیش حقوقی…"
          className="h-10 rounded-xl border-border bg-muted/60 pr-10 text-sm shadow-none placeholder:text-muted-foreground/80 focus-visible:bg-card"
        />
      </div>

      <div className="mr-auto flex items-center gap-1.5 md:gap-3">
        <div className="hidden items-center gap-2 rounded-xl border border-border/70 px-3 py-2 text-sm text-muted-foreground lg:flex">
          <CalendarDays className="size-4 text-teal" />
          <span className="min-w-36">{today || "\u00a0"}</span>
        </div>

        <button
          type="button"
          aria-label="جستجو"
          className="flex size-10 items-center justify-center rounded-xl text-muted-foreground hover:bg-muted sm:hidden"
        >
          <Search className="size-[18px]" />
        </button>

        <DropdownMenu dir="rtl">
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label="اعلان‌ها"
              className="relative flex size-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Bell className="size-[18px]" />
              {unread > 0 && (
                <span className="absolute left-2 top-2 size-2 rounded-full bg-teal ring-2 ring-card" />
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 rounded-xl p-0">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <span className="text-sm font-semibold">اعلان‌ها</span>
              <span className="rounded-full bg-teal-soft px-2 py-0.5 text-xs text-accent-foreground">
                {unread.toLocaleString("fa-IR")} خوانده‌نشده
              </span>
            </div>
            <div className="py-1">
              {notifications.map((n) => (
                <DropdownMenuItem key={n.title} className="flex items-start gap-3 px-4 py-2.5">
                  <span
                    className={`mt-1.5 size-2 shrink-0 rounded-full ${n.unread ? "bg-teal" : "bg-border"}`}
                  />
                  <div className="min-w-0">
                    <p className="text-sm leading-6 text-foreground">{n.title}</p>
                    <p className="text-xs text-muted-foreground">{n.time}</p>
                  </div>
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="mx-1 hidden h-8 w-px bg-border md:block" />

        <DropdownMenu dir="rtl">
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-2.5 rounded-xl p-1 pl-2 transition-colors hover:bg-muted"
            >
              <Avatar className="size-9 rounded-xl">
                <AvatarFallback className="rounded-xl bg-primary text-xs font-semibold text-primary-foreground">
                  {currentUser.initials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden text-right md:block">
                <p className="text-sm font-semibold leading-5">{currentUser.name}</p>
                <p className="text-xs text-muted-foreground">{currentUser.role}</p>
              </div>
              <ChevronDown className="hidden size-4 text-muted-foreground md:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60 rounded-xl">
            <DropdownMenuLabel className="font-normal">
              <p className="text-sm font-semibold">{currentUser.name}</p>
              <p className="truncate text-xs text-muted-foreground" dir="ltr">
                {currentUser.email}
              </p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2">
              <User className="size-4" /> پروفایل کاربری
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <Settings className="size-4" /> تنظیمات حساب
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
              <LogOut className="size-4" /> خروج از سامانه
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
