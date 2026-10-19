import TabBarItem, { TabBarItemType } from "./_components/tab-item";

const ITEMS: TabBarItemType[] = [
    {
        url: "/",
        text: "Oggi"
    },
    {
        url: "/paths",
        text: "Percorsi"
    },
    {
        url: "/review",
        text: "Ripasso"
    },
    {
        url: "/ask",
        text: "Chiedi"
    }
]

export default function TabsLayout({ children }: LayoutProps<"/">) {
    return (
        <>
            <main className="pb-10.25">{children}</main>
            <nav aria-label="Navigazione principale" className="flex fixed bottom-0 w-full bg-white border-t">
                {ITEMS.map((item) => <TabBarItem key={item.url} {...item} />)}
            </nav>
        </>

    )
}