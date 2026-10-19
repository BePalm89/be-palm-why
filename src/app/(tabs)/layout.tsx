import Link from "next/link";

export default function MainLayout({ children }: LayoutProps<"/">) {
    return (
        <div>
            <header>
                <nav className="flex gap-4">
                    <Link href="/">Lezioni</Link>
                    <Link href="/paths">Percorsi</Link>
                    <Link href="/review">Ripasso</Link>
                    <Link href="/ask">Chiedi</Link>
                </nav>

            </header>
            <main> {children}</main>
        </div>

    )
}