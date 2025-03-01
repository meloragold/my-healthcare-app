export function Card({ children }) {
  return <div className="rounded-lg shadow-lg p-4 bg-white">{children}</div>;
}

export function CardContent({ children }) {
  return <div className="p-4">{children}</div>;
}
