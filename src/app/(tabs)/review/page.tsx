export default function ReviewPage() {
    return (
        <div>
            <h1>Ripasso page</h1>
            {Array.from({ length: 50 }, (_, i) => (
                <section key={i} className="py-4 border-b border-muted/20">
                    <h2 className="text-lg">Section {i + 1}</h2>
                    <p className="text-muted">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </section>
            ))}
        </div>
    )
}
