import Link from "next/link";

export default function TabsLayout({ children }: LayoutProps<"/">) {
    return (
        <>
            <main>{children}</main>
            <nav aria-label="Navigazione principale" className="flex gap-4">
                <Link href="/">Oggi</Link>
                <Link href="/paths">Percorsi</Link>
                <Link href="/review">Ripasso</Link>
                <Link href="/ask">Chiedi</Link>
            </nav>
        </>

    )
}