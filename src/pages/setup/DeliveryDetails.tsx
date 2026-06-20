import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useBuilderStore } from "@/store/useBuilderStore";
import { products, colleges, WHATSAPP_NUMBER } from "@/data";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { trackEvent } from "@/lib/analytics";

const checkoutSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  hostelBlock: z.enum(["Boys hostel", "Girls hostel"], { message: "Please select a hostel block" }),
  hostelDetails: z.string().min(1, "Hostel details are required"),
  deliveryDate: z.string().optional(),
  phone: z.string().regex(/^[0-9]{10}$/, "Enter a valid 10-digit phone number"),
  notes: z.string().optional(),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export function DeliveryDetails() {
  const { collegeId, cart, getTotal, getItemPrice } = useBuilderStore();
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      hostelBlock: undefined,
    }
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

    let message = `*New Order — Wisor Move-In*%0A%0A`;
    message += `*College:* ${college?.name}%0A`;
    message += `*Name:* ${data.name}%0A`;
    message += `*Hostel Block:* ${data.hostelBlock}%0A`;
    message += `*Hostel Details:* ${data.hostelDetails}%0A`;
    if (data.deliveryDate) {
      message += `*Delivery Date:* ${data.deliveryDate}%0A`;
    }
    message += `*Phone:* ${data.phone}%0A%0A`;
    message += `*Selected Items:*%0A${itemsList}%0A%0A`;
    message += `*Total:* ₹${total.toLocaleString("en-IN")}`;
    
    if (data.notes) {
      message += `%0A%0A*Additional Notes:*%0A${data.notes}`;
    }
    
    message += `%0A%0AHi, I'd like to confirm this order.`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  };

  const onSubmit = (data: CheckoutForm) => {
    trackEvent("whatsapp_checkout_clicked", { totalValue: getTotal() });
    const link = generateWhatsAppMessage(data);
    window.open(link, "_blank");
  };

  return (
    <div className="px-4 py-6 md:px-8 max-w-2xl mx-auto w-full pb-24">
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
            placeholder="As per hostel allotment letter"
          />
          {errors.name && <p className="text-red-500 text-[0.75rem] mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-[0.8125rem] font-medium text-primary mb-1.5">Hostel block</label>
          <Controller
            name="hostelBlock"
            control={control}
            render={({ field }) => (
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => field.onChange("Boys hostel")}
                  className={`py-3 rounded-lg border text-[0.9375rem] font-medium transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent outline-none ${
                    field.value === "Boys hostel"
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-surface text-secondary hover:border-primary/40"
                  }`}
                >
                  Boys hostel
                </button>
                <button
                  type="button"
                  onClick={() => field.onChange("Girls hostel")}
                  className={`py-3 rounded-lg border text-[0.9375rem] font-medium transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent outline-none ${
                    field.value === "Girls hostel"
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-surface text-secondary hover:border-primary/40"
                  }`}
                >
                  Girls hostel
                </button>
              </div>
            )}
          />
          {errors.hostelBlock && <p className="text-red-500 text-[0.75rem] mt-1">{errors.hostelBlock.message}</p>}
        </div>

        <div>
          <label htmlFor="hostelDetails" className="block text-[0.8125rem] font-medium text-primary mb-1.5">Hostel name & room no.</label>
          <input
            id="hostelDetails"
            {...register("hostelDetails")}
            className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-[0.9375rem] focus:outline-none focus:border-accent focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent transition-colors"
            placeholder="e.g. BH-3, Room 214"
          />
          {errors.hostelDetails && <p className="text-red-500 text-[0.75rem] mt-1">{errors.hostelDetails.message}</p>}
        </div>

        <div>
          <label htmlFor="deliveryDate" className="block text-[0.8125rem] font-medium text-primary mb-1.5">Preferred delivery date</label>
          <input
            id="deliveryDate"
            {...register("deliveryDate")}
            type="date"
            className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-[0.9375rem] focus:outline-none focus:border-accent focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent transition-colors"
          />
          <p className="text-[0.75rem] text-secondary mt-1.5">We'll coordinate the final delivery date with you over WhatsApp.</p>
          {errors.deliveryDate && <p className="text-red-500 text-[0.75rem] mt-1">{errors.deliveryDate.message}</p>}
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
          <label htmlFor="notes" className="block text-[0.8125rem] font-medium text-primary mb-1.5">Additional Notes (Optional)</label>
          <textarea
            id="notes"
            {...register("notes")}
            className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-[0.9375rem] focus:outline-none focus:border-accent focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent transition-colors resize-y min-h-[80px]"
            placeholder="Room not allotted yet / Arriving on reporting day"
          />
        </div>

        <div className="mt-4 p-4 bg-accent/5 border border-accent/20 rounded-lg text-accent text-[0.875rem] leading-[1.6]">
          Clicking below will open WhatsApp with your order details pre-filled. We'll confirm your final pricing and coordinate delivery before any payment is made.
        </div>

        <Button variant="whatsapp" size="lg" className="w-full mt-2 !rounded-lg" type="submit">
          <MessageCircle size={18} />
          Complete Order on WhatsApp
        </Button>
      </form>
    </div>
  );
}
