import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useBuilderStore } from "@/store/useBuilderStore";
import { products, colleges, WHATSAPP_NUMBER } from "@/data";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

const checkoutSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().regex(/^[0-9]{10}$/, "Enter a valid 10-digit phone number"),
  moveInDate: z.string().min(1, "Move-in date is required"),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export function CheckoutStep() {
  const { collegeId, cart, getTotal, getItemPrice } = useBuilderStore();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

  const generateWhatsAppMessage = (data: CheckoutForm) => {
    const college = colleges.find((c) => c.id === collegeId);
    const total = getTotal();

    const itemsList = cart.map((ci) => {
      const prod = products.find((p) => p.id === ci.productId);
      if (!prod) return "";
      const variant = ci.variantId && prod.variants
        ? prod.variants.find((v) => v.id === ci.variantId)
        : null;
      const variantLabel = variant ? ` (${variant.label})` : "";
      const qty = ci.quantity > 1 ? ` × ${ci.quantity}` : "";
      const price = getItemPrice(ci);
      return `- ${prod.name}${variantLabel}${qty} — ₹${price.toLocaleString("en-IN")}`;
    }).join("%0A");

    const message = `*New Order — Wisor Move-In*%0A%0A*Name:* ${data.name}%0A*Phone:* ${data.phone}%0A*College:* ${college?.name}%0A*Move-in Date:* ${data.moveInDate}%0A%0A*Selected Items:*%0A${itemsList}%0A%0A*Total:* ₹${total.toLocaleString("en-IN")}%0A%0AHi, I'd like to confirm this order.`;
    
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  };

  const onSubmit = (data: CheckoutForm) => {
    const link = generateWhatsAppMessage(data);
    window.open(link, "_blank");
  };

  return (
    <div>
      <p className="text-[0.9375rem] text-secondary mb-7">
        We complete all orders over WhatsApp to ensure delivery coordinates are perfect.
      </p>

      <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div>
          <label htmlFor="name" className="block text-[0.8125rem] font-medium text-primary mb-1.5">Full Name</label>
          <input
            id="name"
            {...register("name")}
            className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-[0.9375rem] focus:outline-none focus:border-accent focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent transition-colors"
            placeholder="Arjun Kumar"
          />
          {errors.name && <p className="text-red-500 text-[0.75rem] mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-[0.8125rem] font-medium text-primary mb-1.5">WhatsApp Number</label>
          <div className="flex">
            <div className="px-4 py-3 bg-bg border border-border border-r-0 rounded-l-lg text-[0.9375rem] text-secondary">
              +91
            </div>
            <input
              id="phone"
              {...register("phone")}
              type="tel"
              className="w-full px-4 py-3 bg-surface border border-border rounded-r-lg text-[0.9375rem] focus:outline-none focus:border-accent focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent transition-colors"
              placeholder="99999 99999"
            />
          </div>
          {errors.phone && <p className="text-red-500 text-[0.75rem] mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <label htmlFor="moveInDate" className="block text-[0.8125rem] font-medium text-primary mb-1.5">Expected Move-in Date</label>
          <input
            id="moveInDate"
            {...register("moveInDate")}
            type="date"
            className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-[0.9375rem] focus:outline-none focus:border-accent focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent transition-colors"
          />
          {errors.moveInDate && <p className="text-red-500 text-[0.75rem] mt-1">{errors.moveInDate.message}</p>}
        </div>

        <div className="mt-4 p-4 bg-accent/5 border border-accent/20 rounded-lg text-accent text-[0.875rem] leading-[1.6]">
          Clicking below will open WhatsApp with your order details pre-filled. We'll reply to confirm your hostel block and coordinate delivery.
        </div>

        <Button variant="whatsapp" size="lg" className="w-full mt-2 !rounded-lg" type="submit">
          <MessageCircle size={18} />
          Complete Order on WhatsApp
        </Button>
      </form>
    </div>
  );
}
