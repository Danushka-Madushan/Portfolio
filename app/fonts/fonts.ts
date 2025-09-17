import { Pacifico, Roboto } from "next/font/google";

export const FontRoboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})
