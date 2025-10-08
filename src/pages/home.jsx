import Products from "@/components/products/products";
import { featuresData, teamData } from "@/data";
import { FeatureCard, TeamCard } from "@/widgets/cards";
import { Footer, PageTitle } from "@/widgets/layout";
import {
  Carousel,
  IconButton
} from "@material-tailwind/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export function Home() {
  return (
    <>
      <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
        <div className="absolute top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
              <Carousel transition={{ duration: 2 }} autoplay loop className="rounded-xl">
                <img
                  src="/img/1.svg"
                  alt="image 1"
                  className="h-full w-full object-cover"
                />
                <img
                  src="/img/2.svg"
                  alt="image 2"
                  className="h-full w-full object-cover"
                />
                <img
                  src="/img/3.svg"
                  alt="image 3"
                  className="h-full w-full object-cover"
                />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
      <section className="bg-white px-4 pb-20 pt-4">
        <div className="container mx-auto">
            <QueryClientProvider client={queryClient}>
              <Products />
            </QueryClientProvider>
        </div>
      </section>
      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default Home;
