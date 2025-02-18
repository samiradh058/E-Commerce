import Link from "next/link";

export default function Login_Singup() {
  return (
    <ul className="list-style-none flex gap-6 pr-2 items-center font-semibold text-[20px]">
      <li className="p-2 hover:scale-110 hover:border-b-green-400 border-2">
        <Link href="/login">Login</Link>
      </li>
      <li className="p-2 hover:scale-110 hover:border-b-green-400 border-2">
        <Link href="/signup">Signup</Link>
      </li>
    </ul>
  );
}
