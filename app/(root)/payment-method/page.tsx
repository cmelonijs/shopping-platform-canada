import BreadcrumbBoard from "@/components/share/breadcrumbBoard";


export default function PaymentMethodPage() {
    return (
        <>
            <BreadcrumbBoard step='payment' />
            <div className='max-w-2xl mx-auto p-6 h-screen'>
                <h1 className="text-3xl font-bold mb-6">Payment Method</h1>
                <p className="text-sm text-muted-foreground">Please select the payment method</p>
            </div>
        </>
    );
}
