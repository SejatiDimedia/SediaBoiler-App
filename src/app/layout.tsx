export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // This is a passthrough layout. The actual <html> and <body> are defined
    // in the [locale]/layout.tsx to support internationalization properly.
    // In Next.js App Router, only one layout should define html/body.
    return <>{children}</>;
}
