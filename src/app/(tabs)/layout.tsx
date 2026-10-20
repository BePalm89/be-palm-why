import TabBar from "./_components/tab-bar";

const TabsLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col">
      <main className="flex-1 px-5">{children}</main>
      <TabBar />
    </div>
  );
};

export default TabsLayout;
