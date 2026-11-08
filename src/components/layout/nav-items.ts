import {
  BarChart3,
  CalendarCheck,
  CalendarOff,
  FileText,
  HandCoins,
  LayoutDashboard,
  Calculator,
  Settings,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  title: string;
  url:
    | "/"
    | "/employees"
    | "/attendance"
    | "/leave"
    | "/payroll"
    | "/payslips"
    | "/insurance-tax"
    | "/loans"
    | "/reports"
    | "/settings";
  icon: LucideIcon;
  badge?: string;
  permission?: string;
};

export const navGroups: { label: string; items: NavItem[] }[] = [
  {
    label: "عمومی",
    items: [
      { title: "داشبورد", url: "/", icon: LayoutDashboard, permission: "dashboard" },
      { title: "کارکنان", url: "/employees", icon: Users, permission: "personnel" },
      { title: "حضور و غیاب", url: "/attendance", icon: CalendarCheck },
      { title: "مرخصی‌ها", url: "/leave", icon: CalendarOff, badge: "۳" },
    ],
  },
  {
    label: "حقوق و دستمزد",
    items: [
      { title: "محاسبه حقوق", url: "/payroll", icon: Calculator },
      { title: "فیش‌های حقوقی", url: "/payslips", icon: FileText, permission: "slips" },
      { title: "بیمه و مالیات", url: "/insurance-tax", icon: ShieldCheck },
      { title: "وام و مساعده", url: "/loans", icon: HandCoins, permission: "loans" },
    ],
  },
  {
    label: "مدیریت",
    items: [
      { title: "گزارش‌ها", url: "/reports", icon: BarChart3, permission: "reports" },
      { title: "تنظیمات", url: "/settings", icon: Settings, permission: "settings" },
    ],
  },
];
