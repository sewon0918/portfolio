export default function Duration({ from, to }: { from: string; to: string }) {
  return (
    <div>
      {from}
      <p css={{ display: "inline", padding: "0 2px" }}>-</p>
      {to}
    </div>
  );
}
