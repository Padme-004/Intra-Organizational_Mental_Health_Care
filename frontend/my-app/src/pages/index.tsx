import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight, MoreVertical } from "lucide-react";
import "@/styles/globals.css";
import Navbar from "@/components/navbar/Navbar2";
import Footer from "@/components/footer/Footer";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useState, useEffect } from "react";
import { fetchAdmins } from "@/service/adminProfile/getAllAdmin";

type Admin = {
  adminId: number;
  fullName: string;
  adminNotes: string;
  contactNumber: string;
  avatar?: string; // Optionally include an avatar image
};

export default function Component() {
  const token = useSelector((state: RootState) => state.auth.accessToken) || "";
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAdmins() {
      if (!token) return; // Skip fetching if the token is not available
      try {
        const data = await fetchAdmins(token);
        setAdmins(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    }
    loadAdmins();
  }, [token]);

  return (
    <div>
      <Navbar />
      <section className="relative">
            <div className="absolute inset-0">
              <Image
                src="/Home1.jpg"
                alt="Support Group Background"
                fill
                className="object-cover brightness-50"
                priority
              />
            </div>
            <div className="flex justify-center px-4 sm:px-6 lg:px-8">
              <div className="relative container py-24 text-center text-white">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Find Support Here
                </h1>
                <p className="mx-auto mt-4 max-w-[700px] text-lg text-gray-200">
                  A Safe Place to Connect
                </p>
                <Button size="lg" className="mt-6">
                  Join Now
                </Button>
                <p className="mx-auto mt-4 max-w-[800px] text-sm text-gray-200">
                  At SerenitySphere, we provide a secure and personalized platform for patients and families to connect.
                  Our Support Group is designed to streamline the registration process for patients through phone number
                  verification and OTP, allowing them to create their accounts securely. All members must complete a
                  thorough verification process and be verified by an admin before granting access.
                </p>
              </div>
            </div>
          </section>
          {/* Motivation Section */}
<section className="w-full bg-gray-100 py-12 md:py-24 mb-0"> {/* Add mb-0 to remove the bottom margin */}
  <div className="container mx-auto grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
    <div className="flex justify-center">
      <Image
        src="/Motivation1.webp"
        alt="Motivation Group"
        width={600}
        height={400}
        className="rounded-lg object-cover"
      />
    </div>
    <div className="space-y-4 text-center lg:text-left">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">OUR MOTIVATION</h2>
      <p className="text-gray-500 md:text-xl lg:text-base xl:text-xl">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat.
      </p>
      <Link href="/signin">
        <Button className="group flex">
          Learn More
          <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </Link>
    </div>
  </div>
</section>

{/* Centered Container */}
<div className="flex m-4 item-center justify-center">
  <main className="flex w-full max-w-7xl px-4 sm:px-6 lg:px-8">      
    {/* Verified Admins Section (Visible Only When Logged In) */}
    {token && (
      <section className="container mb-0"> {/* Removed m-2 margin */}
        <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl">Verified Admins</h2>
        <div className="grid gap-6 mt-6 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
          {admins.length > 0 ? (
            admins.map((admin) => (
              <div
                key={admin.adminId}
                className="w-full max-w-sm bg-white rounded-3xl shadow-xl overflow-hidden relative"
              >
                {/* Header Placeholder */}
                <div className="h-24 bg-gradient-to-r from-purple-200 via-pink-200 to-blue-300"></div>

                {/* More Options Button */}
                <button className="absolute top-4 right-4 p-2 text-white hover:bg-black/10 rounded-full transition-colors">
                  <MoreVertical className="w-6 h-6" />
                </button>

                {/* Avatar */}
                <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-12">
                  <div className="w-20 h-20 rounded-full bg-white p-1.5 shadow-lg">
                    <img
                      src={admin.avatar || "/images/Lady1.jpg"}
                      alt={admin.fullName}
                      className="w-full h-full rounded-full bg-white"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="pt-12 pb-8 px-8">
                  <div className="text-center mb-8">
                    <h2 className="text-xl font-bold text-gray-800">{admin.fullName}</h2>
                    <p className="text-sm text-gray-600">{admin.adminNotes}</p>
                  </div>
                  <p className="text-sm text-gray-500 text-center">Contact: {admin.contactNumber}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">
              {error ? error : "No admins available at the moment."}
            </p>
          )}
        </div>
      </section>
    )}
  </main>
</div>

      <Footer />
    </div>
  );
}
