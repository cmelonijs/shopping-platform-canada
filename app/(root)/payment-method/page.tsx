import BreadcrumbBoard from "@/components/share/breadcrumbBoard";
import { getPaymentMethod } from "@/lib/actions/payment.actions";
import PaymentForm from "./PaymentForm";
import { PaymentMethod } from "@/types";

const PaymentMethodPage = async (props: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) => {
    const existingPaymentMethod = await getPaymentMethod();

  return (
    <>
      <BreadcrumbBoard step='payment method' />
      <div className='max-w-2xl mx-auto p-6 h-screen'>
        <h1 className="text-3xl font-bold mb-6 ">Payment Method</h1>
        <PaymentForm defaultValues={existingPaymentMethod as PaymentMethod} />
      </div>
    </>
  );
};

export default PaymentMethodPage;