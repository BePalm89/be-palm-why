import TabBar from "./_components/tab-bar";

export default function TabsLayout({ children }: LayoutProps<"/">) {

    return (
        <div className="flex flex-col mx-auto w-full min-h-dvh max-w-md">
            <main className="flex-1">{children}</main>
            <TabBar />
        </div>

    )
};