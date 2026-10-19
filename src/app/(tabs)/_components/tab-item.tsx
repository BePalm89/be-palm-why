import type { LucideIcon } from "lucide-react";
import Link from "next/link";

export type TabBarItemType = {
    url: string;
    Icon: LucideIcon;
    text: string;
}

export default function TabBarItem({ url, Icon, text }: TabBarItemType) {
    return (
        <Link href={url} className="flex flex-col gap-1 flex-1 py-2 items-center" >
            <Icon size={24} />
            <span className="text-xs">{text}</span>
        </Link>
    )
}
