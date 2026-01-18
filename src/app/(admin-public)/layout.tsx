export default function AdminPublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // This layout has no auth check - it's for public admin pages like login
    return <>{children}</>;
}
