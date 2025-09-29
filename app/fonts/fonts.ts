import { Fira_Code, Pacifico, Roboto } from "next/font/google";

export const FontRoboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
})

export const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-fira-code",
})
