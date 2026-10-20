"use client";

import { House, MapIcon, MessageCircle, Repeat } from "lucide-react";
import TabBarItem, { type TabBarItemType } from "./tab-item";
import { usePathname } from "next/navigation";
import formatDate from "@/lib/utils/format-date";

const ITEMS: TabBarItemType[] = [
  {
    url: "/",
    text: "Oggi",
    Icon: House,
  },
  {
    url: "/paths",
    text: "Percorsi",
    Icon: MapIcon,
  },
  {
    url: "/review",
    text: "Ripasso",
    Icon: Repeat,
  },
  {
    url: "/ask",
    text: "Chiedi",
    Icon: MessageCircle,
  },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return href === pathname;
  }

  return pathname.startsWith(href);
}

export default function TabBar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navigazione principale"
      className="sticky bottom-0 flex border-t border-ink/10 bg-white"
    >
      {ITEMS.map((item) => {
        const active = isActive(pathname, item.url);
        return <TabBarItem key={item.url} {...item} active={active} />;
      })}
    </nav>
  );
}
