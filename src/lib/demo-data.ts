// Realistic demo data for the payroll dashboard (frontend only, no backend).
// Amounts are in Rial. Current payroll period: آبان ۱۴۰۵.

export const company = {
  name: "گروه صنعتی فناوران پارس",
  fiscalYear: "۱۴۰۵",
  currentPeriod: "آبان ۱۴۰۵",
};

export const currentUser = {
  name: "حامد علیخانی",
  role: "مدیر منابع انسانی",
  initials: "ح‌ع",
  email: "h.alikhani@fanavaranpars.ir",
};

export type StatTrend = "up" | "down";

export const payrollStats = {
  totalGross: 152_860_000_000,
  totalGrossChange: 4.2,
  totalNet: 115_420_000_000,
  activeEmployees: 412,
  newHires: 8,
  deductions: 37_440_000_000,
  deductionsChange: 3.1,
  averageNet: 280_140_000,
  averageNetChange: -0.8,
};

export const monthlyPayroll = [
  { month: "آذر", gross: 128.4, net: 97.1 },
  { month: "دی", gross: 129.1, net: 97.6 },
  { month: "بهمن", gross: 130.6, net: 98.8 },
  { month: "اسفند", gross: 158.2, net: 121.4 },
  { month: "فروردین", gross: 141.7, net: 106.9 },
  { month: "اردیبهشت", gross: 142.3, net: 107.3 },
  { month: "خرداد", gross: 143.9, net: 108.5 },
  { month: "تیر", gross: 144.6, net: 109.2 },
  { month: "مرداد", gross: 145.8, net: 110.0 },
  { month: "شهریور", gross: 146.7, net: 110.6 },
  { month: "مهر", gross: 146.7, net: 110.8 },
  { month: "آبان", gross: 152.9, net: 115.4 },
];

export const departments = [
  { name: "تولید و عملیات", count: 138, color: "var(--chart-1)" },
  { name: "فنی و مهندسی", count: 92, color: "var(--chart-2)" },
  { name: "فروش و بازاریابی", count: 64, color: "var(--chart-3)" },
  { name: "مالی و حسابداری", count: 41, color: "var(--chart-4)" },
  { name: "پشتیبانی و خدمات", count: 51, color: "var(--chart-5)" },
  { name: "منابع انسانی", count: 26, color: "var(--chart-6)" },
];

export const contractTypes = [
  { label: "رسمی (دائم)", count: 186 },
  { label: "قراردادی (موقت)", count: 152 },
  { label: "پیمانی", count: 47 },
  { label: "پاره‌وقت", count: 27 },
];

export type CycleStepStatus = "done" | "current" | "pending";

// Payroll workflow for the current period. Dates are ISO (Gregorian) and shown in Jalali.
export const payrollCycle: {
  title: string;
  owner: string;
  date: string;
  status: CycleStepStatus;
}[] = [
  { title: "ثبت کارکرد ماهانه", owner: "واحد منابع انسانی", date: "2026-10-31", status: "done" },
  { title: "محاسبه حقوق و مزایا", owner: "واحد حقوق و دستمزد", date: "2026-11-03", status: "done" },
  { title: "تأیید مدیر مالی", owner: "مدیریت مالی", date: "2026-11-11", status: "current" },
  { title: "ارسال لیست به بانک", owner: "خزانه‌داری", date: "2026-11-19", status: "pending" },
  { title: "صدور فیش حقوقی", owner: "واحد حقوق و دستمزد", date: "2026-11-20", status: "pending" },
];

export const deadlines = [
  { title: "ارسال لیست بیمه تأمین اجتماعی", date: "2026-11-21", daysLeft: 15, tone: "warning" as const },
  { title: "واریز مالیات حقوق مهر ماه", date: "2026-11-21", daysLeft: 15, tone: "warning" as const },
  { title: "پرداخت حقوق آبان ۱۴۰۵", date: "2026-11-19", daysLeft: 13, tone: "teal" as const },
  { title: "تمدید قراردادهای موقت آذر", date: "2026-11-26", daysLeft: 20, tone: "info" as const },
];

export type PayrollStatus = "paid" | "approval" | "processing" | "rejected";

export const recentPayroll: {
  id: number;
  name: string;
  department: string;
  position: string;
  period: string;
  net: number;
  /** ISO date, displayed in Jalali. */
  date: string;
  status: PayrollStatus;
}[] = [
  { id: 10247, name: "مریم احمدی", department: "مالی و حسابداری", position: "کارشناس ارشد حسابداری", period: "آبان ۱۴۰۵", net: 342_500_000, date: "2026-11-05", status: "approval" },
  { id: 10183, name: "علیرضا کریمی", department: "فنی و مهندسی", position: "مهندس نرم‌افزار", period: "آبان ۱۴۰۵", net: 418_900_000, date: "2026-11-05", status: "approval" },
  { id: 10312, name: "زهرا موسوی", department: "منابع انسانی", position: "کارشناس جذب و استخدام", period: "آبان ۱۴۰۵", net: 268_300_000, date: "2026-11-04", status: "processing" },
  { id: 10096, name: "محمدحسین رضایی", department: "تولید و عملیات", position: "سرپرست خط تولید", period: "آبان ۱۴۰۵", net: 295_700_000, date: "2026-11-04", status: "processing" },
  { id: 10258, name: "فاطمه حسینی", department: "فروش و بازاریابی", position: "مدیر فروش منطقه‌ای", period: "مهر ۱۴۰۵", net: 456_200_000, date: "2026-10-20", status: "paid" },
  { id: 10401, name: "امیر جعفری", department: "پشتیبانی و خدمات", position: "کارشناس پشتیبانی", period: "مهر ۱۴۰۵", net: 214_800_000, date: "2026-10-20", status: "paid" },
  { id: 10129, name: "سارا نوروزی", department: "فنی و مهندسی", position: "تحلیلگر داده", period: "مهر ۱۴۰۵", net: 372_400_000, date: "2026-10-20", status: "rejected" },
  { id: 10375, name: "رضا صادقی", department: "تولید و عملیات", position: "تکنسین تعمیرات", period: "مهر ۱۴۰۵", net: 238_600_000, date: "2026-10-19", status: "paid" },
];

export const notifications = [
  { title: "لیست حقوق آبان آماده تأیید است", time: "۱۵ دقیقه پیش", unread: true },
  { title: "۳ درخواست مرخصی جدید ثبت شد", time: "۱ ساعت پیش", unread: true },
  { title: "واریز حقوق سارا نوروزی برگشت خورد", time: "دیروز", unread: true },
  { title: "جدول معافیت مالیاتی ۱۴۰۵ به‌روزرسانی شد", time: "۲ روز پیش", unread: false },
];
