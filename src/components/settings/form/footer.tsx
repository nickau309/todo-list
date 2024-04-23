import type { ReactNode } from "react";

type FooterProps = {
  children: ReactNode;
};

export default function Footer({ children }: FooterProps) {
  return (
    <>
      <hr className="border-divider-secondary" />
      <footer className="flex flex-wrap justify-end gap-3 p-3">
        {children}
      </footer>
    </>
  );
}
