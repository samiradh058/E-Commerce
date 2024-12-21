import Link from "next/link";

export default function Login_Singup() {
  return (
    <ul className="list-style-none flex gap-6 pr-2 items-center font-semibold text-[18px]">
      <li>
        <Link href="/login">Login</Link>
      </li>
      <li>
        <Link href="/signup">Signup</Link>
      </li>
    </ul>
  );
}
