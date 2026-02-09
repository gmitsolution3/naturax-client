import { getBrandInfo } from "@/lib/social";
import { toast } from "sonner";

export const handleWhatsApp = async (quantity: string | Number = "0") => {
  const brandInfo: any = await getBrandInfo();


  if(!brandInfo.data.phone){
    toast.error("What's app Number is require!!")
  }

  const phoneNumber = brandInfo.data.phone;
  const message = `I want to order ${quantity} item(s)`;

  window.open(
    `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
    "_blank",
  );
};
