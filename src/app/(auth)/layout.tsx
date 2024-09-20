export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-row m-0 p-0 items-center min-h-screen w-full">
            <div className="flex flex-col items-center justify-center min-h-screen w-1/2 bg-slate-900 border-r border-white/10">
                <div className="flex flex-col items-center justify-center min-h-screen w-1/2">
                    <h1 className="text-4xl font-bold text-white">Innosphere</h1>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center min-h-screen w-1/2">
                {children}
            </div>
        </div>
    )
}