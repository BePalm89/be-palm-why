import Link from "next/link";

export default function TabsLayout({ children }: LayoutProps<"/">) {
    return (
        <div>
            <main> {children}</main>
            <nav aria-label="Navigazione principale">
                <Link href="/">Lezioni</Link>
                <Link href="/paths">Percorsi</Link>
                <Link href="/review">Ripasso</Link>
                <Link href="/ask">Chiedi</Link>
            </nav>
        </div>

    )
}