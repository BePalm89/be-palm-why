import TabBarItem, { type TabBarItemType } from "./_components/tab-item";
import { House, MapIcon, Repeat, MessageCircle} from "lucide-react";

const ITEMS: TabBarItemType[] = [
    {
        url: "/",
        text: "Oggi",
        Icon: House
    },
    {
        url: "/paths",
        text: "Percorsi",
        Icon: MapIcon
    },
    {
        url: "/review",
        text: "Ripasso",
        Icon: Repeat
    },
    {
        url: "/ask",
        text: "Chiedi",
        Icon: MessageCircle
    }
]

export default function TabsLayout({ children }: LayoutProps<"/">) {
    return (
        <div className="flex flex-col mx-auto w-full min-h-dvh max-w-md">
            <main className="flex-1">{children}</main>
            <nav aria-label="Navigazione principale" className="flex sticky bottom-0 bg-white border-ink/10">
                {ITEMS.map((item) => <TabBarItem key={item.url} {...item} />)}
            </nav>
        </div>

    )
}