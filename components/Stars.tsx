export default function Stars({ n }: { n: number }) {
  const full = Math.round(n);
  return (
    <span className="stars" aria-label={`${n} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <i key={i} className={i <= full ? "on" : ""}>
          ★
        </i>
      ))}
    </span>
  );
}
