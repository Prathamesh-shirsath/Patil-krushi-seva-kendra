import { ReactNode } from "react";

interface ResponsiveTableProps {
  children: ReactNode;
}

export default function ResponsiveTable({
  children,
}: ResponsiveTableProps) {
  return (
    <div className="w-full overflow-x-auto rounded-2xl">
      {children}
    </div>
  );
}