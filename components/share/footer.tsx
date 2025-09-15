export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="w-full border-t py-4 text-center text-sm">
      © {year} SimpleShop. All Rights Reserved.
    </div>
  );
}
