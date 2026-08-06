import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function StatsGrid({
  children,
}: Props) {
  return (
    <div
      className="
        mt-8
        grid
        gap-5
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-4
      "
    >
      {children}
    </div>
  );
}