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
        <>
            <main className="pb-20">{children}</main>
            <nav aria-label="Navigazione principale" className="flex fixed bottom-0 w-full bg-white border-t">
                {ITEMS.map((item) => <TabBarItem key={item.url} {...item} />)}
            </nav>
        </>

    )
}