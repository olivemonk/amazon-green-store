export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-center py-4  h-full w-full">
      {children}
    </div>
  );
}
