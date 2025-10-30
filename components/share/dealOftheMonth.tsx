"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { EXPIRATION_DEAL_DATE } from "@/lib/constants";


export default function DealOfTheMonth({
  images,
  product,
}: {
  images: string;
  product: { slug: string };
}) {
    const [endOfDeal, setEndOfDeal] = useState(false);
    const now = new Date();
    const diff = EXPIRATION_DEAL_DATE.getTime() - now.getTime();

    const setDays = (diff: number) => Math.floor(diff / (1000 * 60 * 60 * 24));
    const setHours = (diff: number) => Math.floor((diff / (1000 * 60 * 60)) % 24);
    const setMinutes = (diff: number) => Math.floor((diff / (1000 * 60)) % 60);
    const setSeconds = (diff: number) => Math.floor((diff / 1000) % 60);
        
    const [hasMounted, setHasMounted] = useState(false);
    const [count, setCount] = useState({
        days: setDays(diff),
        hours: setHours(diff),
        minutes: setMinutes(diff),
        seconds: setSeconds(diff),
    });

    useEffect(() => {
         setHasMounted(true);
        const interval = setInterval(() => {
            const now = new Date();
            const diff = EXPIRATION_DEAL_DATE.getTime() - now.getTime();

  useEffect(() => {
    // const targetDate = new Date(Date.now() + 0.25 * 60 * 1000);
    const targetDate = new Date("2025-10-31T23:59:59.000Z");
    const interval = setInterval(() => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

            const days = setDays(diff);
            const hours = setHours(diff);
            const minutes = setMinutes(diff);
            const seconds = setSeconds(diff);

            setCount({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(interval);
    }, []);
      if (!hasMounted) return null;
    return (
        <div className="font-bold">
            {endOfDeal ? (
                <div className="flex flex-row gap-5">
                    <h1 className="text-2xl mb-2">Deal ended!</h1>
                    <Button asChild variant="secondary">
                        <Link href={`/search`}>view all products</Link>
                    </Button>
                </div>
            ) : (
                <div className="flex items-center justify-center">
                    <div className="flex flex-col md:flex-row items-center gap-8 p-6">
                        <div className="flex flex-col text-sm  max-w-xl">
                            <h1 className="text-2xl  mb-2">Deal of the month</h1>

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-bold">
      {endOfDeal ? (
        <div className="flex flex-row gap-5">
          <h1 className="text-2xl mb-2">Deal ended!</h1>
          <Button asChild variant="secondary">
            <Link href={`/search`}>view all products</Link>
          </Button>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <div className="flex flex-col md:flex-row items-center gap-8 p-6">
            <div className="flex flex-col text-sm  max-w-xl">
              <h1 className="text-2xl  mb-2">Deal of the month</h1>

              <h2 className="mb-4 font-normal">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Exercitationem quidem laborum sequi ullam maxime expedita
                doloremque deleniti eos hic voluptatem! Qui, tempore in quaerat
                error dolor consequatur saepe vitae iste.
              </h2>

              <div className="flex gap-10 justify-start mt-4">
                <div className="flex flex-col items-center">
                  <span className="text-2xl">{count.days}</span>
                  <span className="text-xs">days</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl">{count.hours}</span>
                  <span className="text-xs">hours</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl">{count.minutes}</span>
                  <span className="text-xs">minutes</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl">{count.seconds}</span>
                  <span className="text-xs">seconds</span>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0">
              <Image
                src={images}
                alt="product image"
                width={240}
                height={240}
                className="rounded-lg "
              />
            </div>
            <Button asChild variant="secondary">
              <Link href={`/product/${product.slug}`}>view product</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
