import { Button } from "@/components/ui/button";
import { bebas, karla } from "@/lib/font";


const Homepage = () => {
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <Button className="text-xl">Push the button</Button>
      <h1 className={`${bebas.className} text-2xl`}>Bebas font testing</h1>
      <h2 className={`${karla.className} text-2xl`}>Karla font testing</h2>
    </div>
  );
};

export default Homepage;
