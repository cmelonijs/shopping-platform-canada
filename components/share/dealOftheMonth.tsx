"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { EXPIRATION_DEAL_DATE } from "@/lib/constants";
import { useTranslations } from "next-intl";

export default function DealOfTheMonth({
    images,
    product,
}: {
    images: string;
    product: { slug: string };
}) {
    const t = useTranslations("deal");
    const [endOfDeal, setEndOfDeal] = useState(false);

    const setDays = (diff: number) => Math.floor(diff / (1000 * 60 * 60 * 24));
    const setHours = (diff: number) => Math.floor((diff / (1000 * 60 * 60)) % 24);
    const setMinutes = (diff: number) => Math.floor((diff / (1000 * 60)) % 60);
    const setSeconds = (diff: number) => Math.floor((diff / 1000) % 60);

    const [hasMounted, setHasMounted] = useState(false);
    const [count, setCount] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        setHasMounted(true);

        const updateCountdown = () => {
            const now = new Date();
            const diff = EXPIRATION_DEAL_DATE.getTime() - now.getTime();

            if (diff <= 0) {
                setEndOfDeal(true);
                setCount({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return false; // segnala che è finito
            }

            setCount({
                days: setDays(diff),
                hours: setHours(diff),
                minutes: setMinutes(diff),
                seconds: setSeconds(diff),
            });
            return true;
        };

        // aggiorna subito al mount
        const stillRunning = updateCountdown();

        if (!stillRunning) return;

        const interval = setInterval(() => {
            const running = updateCountdown();
            if (!running) clearInterval(interval);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (!hasMounted) return null;

    return (
        <div className="font-bold">
            {endOfDeal ? (
                <div className="flex flex-row gap-5">
                    <h1 className="text-2xl mb-2">{t("dealEnded")}</h1>
                        <Image
                            src={images}
                            alt="product image"
                            width={240}
                            height={240}
                            className="rounded-lg"
                        />
                    <Button asChild variant="secondary">
                        <Link href={`/search`}>{t("viewProducts")}</Link>
                    </Button>
                </div>
            ) : (
                <div className="flex items-center justify-center">
                    <div className="flex flex-col md:flex-row items-center gap-8 p-6">
                        <div className="flex flex-col text-sm max-w-xl">
                            <h1 className="text-2xl mb-2">{t("DealMonth")}</h1>
                            <h2 className="mb-4 font-normal">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                Exercitationem quidem laborum sequi ullam maxime expedita doloremque
                                deleniti eos hic voluptatem! Qui, tempore in quaerat error dolor
                                consequatur saepe vitae iste.
                            </h2>

                            <div className="flex gap-10 justify-start mt-4">
                                <div className="flex flex-col items-center">
                                    <span className="text-2xl">{count.days}</span>
                                    <span className="text-xs">{t("days")}</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-2xl">{count.hours}</span>
                                    <span className="text-xs">{t("hours")}</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-2xl">{count.minutes}</span>
                                    <span className="text-xs">{t("minutes")}</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-2xl">{count.seconds}</span>
                                    <span className="text-xs">{t("seconds")}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-shrink-0">
                            <Image
                                src={images}
                                alt="product image"
                                width={240}
                                height={240}
                                className="rounded-lg"
                            />
                        </div>
                        <Button asChild variant="secondary">
                            <Link href={`/product/${product.slug}`}>{t("viewProducts")}</Link>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}