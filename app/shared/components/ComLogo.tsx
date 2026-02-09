import { getBrandInfo } from "@/lib/social";
import Image from "next/image";
import Link from "next/link";

export const ComLogo =async () => {
   const brandInfoRaw = await getBrandInfo();

  return (
    <Link className="inline-block mx-auto" href="/">
      <div className="hover:cursor-pointer">
        <Image
          src={brandInfoRaw?.data?.logo || "/placeholder.svg"}
          alt={brandInfoRaw?.data?.name || "Crab fashion"}
          width={100}
          height={100}
        />
      </div>
    </Link>
  );
};
