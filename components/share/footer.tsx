
export default function Footer() {
  let date = new Date();
  let year = date.getFullYear();

  return (
    <div className="w-full border-t py-4 text-center text-sm">
        {year} SimpleShop | STORE. All right are reserved.
    </div>
  );
}