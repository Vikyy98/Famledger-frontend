import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>FamLedger</h1>
      <Link href={"/login"}>Login</Link>
    </div>
  );
}
