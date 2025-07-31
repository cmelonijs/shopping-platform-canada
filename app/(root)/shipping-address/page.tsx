import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import ShippingForm from './ShippingForm';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

const ShippingAddressPage = async (props: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) => {
  const session = await auth();

  // If user is NOT authenticated, redirect to login
  if (!session) {
    return redirect(`/auth/signin?callbackUrl=/shipping-address`);
  }

  return (
    <div className='max-w-2xl mx-auto p-6 h-screen'>
      <Breadcrumb className="mb-4 text-lg">
        <BreadcrumbList className="gap-3">
          <BreadcrumbItem>
            <span>Home</span>
          </BreadcrumbItem>

          <BreadcrumbSeparator>
            <div className="h-px bg-gray-300 w-10" />
          </BreadcrumbSeparator>

          <BreadcrumbItem>
            <BreadcrumbPage className="text-md">Shipping AddressHello</BreadcrumbPage>
          </BreadcrumbItem>

          <BreadcrumbSeparator>
            <div className="h-px bg-gray-300 w-10" />
          </BreadcrumbSeparator>

          <BreadcrumbItem>
            <span>Payment Method</span>
          </BreadcrumbItem>

          <BreadcrumbSeparator>
            <div className="h-px bg-gray-300 w-10" />
          </BreadcrumbSeparator>
          
          <BreadcrumbItem>
            <span>Place Order</span>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-3xl font-bold mb-6">Shipping Address</h1>

      <ShippingForm />
    </div>
  );
};

export default ShippingAddressPage;