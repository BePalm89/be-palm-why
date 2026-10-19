import Link from "next/link";

export type TabBarItemType = {
    url: string;
    icon?: string;
    text: string;
}

export default function TabBarItem({url, icon, text}: TabBarItemType) {
    return (
       <Link href={url} className="flex-1 text-center py-2">{text}</Link>
    )
}
