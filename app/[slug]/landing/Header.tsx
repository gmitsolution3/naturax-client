import { getBrandInfo } from "@/lib/social";
import Image from "next/image";

export default async function Header() {
  const res = await getBrandInfo();

  const info = res?.data;
  return (
    <header className="text-center">
      <Image
        src={info.logo}
        height={500}
        width={500}
        alt="Landing logo"
        className="w-48 mx-auto"
      />
    </header>
  );
}
