interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <div
      style={{
        viewTransitionName: "page-content",
      }}
    >
      {children}
    </div>
  );
}

