import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  CalendarClock,
  CarTaxiFront,
  FileSearch,
  HandHeart,
  Hotel,
  Languages,
  MapPinned,
  WalletCards,
} from "lucide-react";

export type ServiceCoverageItem = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

export const serviceCoverageItems: ServiceCoverageItem[] = [
  {
    id: "medical-opinion-cost-assessment",
    title: "Medical opinion and cost assessment",
    description:
      "Receive early case guidance, treatment pathway clarity, and a more structured understanding of likely cost considerations.",
    icon: FileSearch,
  },
  {
    id: "pre-trip-tips",
    title: "Pre-trip tips",
    description:
      "Practical preparation support covering documents, travel timing, arrival readiness, and patient-family planning.",
    icon: MapPinned,
  },
  {
    id: "visa-support",
    title: "Visa support",
    description:
      "Guidance around medical travel paperwork and process coordination to reduce friction before departure.",
    icon: BadgeCheck,
  },
  {
    id: "money-exchange-assistance",
    title: "Money exchange assistance",
    description:
      "Helpful support for payment planning, currency exchange awareness, and smoother on-ground financial convenience.",
    icon: WalletCards,
  },
  {
    id: "translators-interpreters",
    title: "Translators and interpreters",
    description:
      "Language support options that improve clarity during appointments, consultations, and hospital communication.",
    icon: Languages,
  },
  {
    id: "transportation-assistance",
    title: "Transportation assistance",
    description:
      "Arrival transfers and local mobility coordination for patients and families moving between airport, stay, and hospital.",
    icon: CarTaxiFront,
  },
  {
    id: "accommodation-options",
    title: "Accommodation options",
    description:
      "Comfort-focused stay recommendations based on proximity, budget, and convenience during treatment journeys.",
    icon: Hotel,
  },
  {
    id: "reception-appointment-pharmaceutical-coordination",
    title: "Reception, appointment & pharmaceutical coordination",
    description:
      "Support with scheduling, reception logistics, and medication-related coordination when hospital processes become complex.",
    icon: CalendarClock,
  },
  {
    id: "private-nursing-support",
    title: "Private nursing support",
    description:
      "Additional care support options for patients who need closer bedside attention and daily recovery assistance.",
    icon: HandHeart,
  },
];
