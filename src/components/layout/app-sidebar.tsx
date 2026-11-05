import { Link, useRouterState } from "@tanstack/react-router";
import { Wallet } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { company } from "@/lib/demo-data";
import { navGroups } from "./nav-items";

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <Sidebar side="right" collapsible="icon" className="border-sidebar-border">
      <SidebarHeader className="px-3 pb-2 pt-5 group-data-[collapsible=icon]:px-2">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground group-data-[collapsible=icon]:size-8">
            <Wallet className="size-5" strokeWidth={2.2} />
          </div>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-[15px] font-bold leading-tight text-sidebar-accent-foreground">
              حقوق‌یار
            </p>
            <p className="truncate text-xs text-sidebar-muted">سامانه حقوق و دستمزد</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-1 pt-3">
        {navGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="text-xs font-medium text-sidebar-muted">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {group.items.map((item) => {
                  const active = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton
                        asChild
                        isActive={active}
                        tooltip={{ children: item.title, side: "left" }}
                        className="h-10 rounded-lg text-sidebar-foreground/85 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:font-semibold data-[active=true]:text-sidebar-accent-foreground [&>svg]:size-[18px]"
                      >
                        <Link to={item.url} onClick={() => isMobile && setOpenMobile(false)}>
                          <item.icon
                            className={active ? "text-sidebar-primary" : "text-sidebar-muted"}
                          />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                      {item.badge && (
                        <SidebarMenuBadge className="left-2 right-auto rounded-full bg-sidebar-primary text-xs text-sidebar-primary-foreground peer-hover/menu-button:text-sidebar-primary-foreground peer-data-[active=true]/menu-button:text-sidebar-primary-foreground">
                          {item.badge}
                        </SidebarMenuBadge>
                      )}
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="p-3 group-data-[collapsible=icon]:hidden">
        <div className="rounded-xl border border-sidebar-border bg-sidebar-accent/60 p-3">
          <p className="truncate text-xs font-medium text-sidebar-accent-foreground">
            {company.name}
          </p>
          <p className="mt-0.5 text-xs text-sidebar-muted">
            سال مالی {company.fiscalYear} · نسخه ۴٫۲
          </p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
