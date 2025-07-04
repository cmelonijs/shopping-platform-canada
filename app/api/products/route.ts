import client from "@/lib/client";

export async function GET() {
  try {
    const products = await client.product.findMany();
    return Response.json(products);
  }
  catch (error) {
    return Response.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
