import { Bebas_Neue, Karla } from "next/font/google";

const bebas = Bebas_Neue({
    subsets: ["latin"],
    variable: "--font-bebas-neue",
    display: "swap",
    weight: "400",
})

const karla = Karla ({
    subsets: ["latin"],
    variable: "--font-karla",
    display: "swap",
    weight: "400",
})

export { bebas, karla };