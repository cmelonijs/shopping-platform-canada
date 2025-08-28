import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import ShippingForm from './ShippingForm';
import BreadcrumbBoard from '@/components/share/breadcrumbBoard';

const ShippingAddressPage = async (props: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) => {
  const session = await auth();

  // If user is NOT authenticated, redirect to login
  if (!session) {
    return redirect(`/auth/signin?callbackUrl=/shipping-address`);
  }

  return (
    <>
      <BreadcrumbBoard step='shipping' />
      <div className='max-w-2xl mx-auto p-6 h-screen'>
        <h1 className="text-3xl font-bold mb-6 ">Shipping Address</h1>
        <ShippingForm />
      </div>
    </>
  );
};

export default ShippingAddressPage;