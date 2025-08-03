"use client";

import { useSearchParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import { FormData } from "@/app/types";
import image from "@/icons/chevron-left.svg";
import Image from "next/image";
import download from "@/icons/Download.svg";


const PDFDocument = dynamic(() => import("@/components/PDFDocument"), {
  ssr: false,
});

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

export default function PreviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const data: FormData = JSON.parse(searchParams.get("data") || "{}");

  return (
    <main className="min-h-screen p-10 bg-gray-100 relative">

      <button
        onClick={() => router.back()}
        className="absolute cursor-pointer top-6 left-6 text-xl hover:text-gray-800 transition-transform hover:scale-110 hover:shadow-md"
        aria-label="Go Back"
      >
        <Image src={image} alt="Back" width={50} height={42} />
      </button>


      <div className="max-w-xl mx-auto bg-white p-6 shadow rounded text-sm border-2 border-black">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="mb-2">
            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
            {value}
          </div>
        ))}
      </div>


      <div className="max-w-xl mx-auto mt-4">
        <PDFDownloadLink
          document={<PDFDocument {...data} />}
          fileName="details.pdf"
        >
          {({ loading }) => (
            <button className="w-full cursor-pointer bg-gradient-to-r from-[#064409] via-[#104812] to-[#527655] text-white px-4 py-3 rounded flex items-center justify-center gap-2 hover:from-[#527655] hover:via-[#527655] hover:to-[#527655] transition-all duration-200">
              {!loading && (
                <Image src={download} alt="Download" width={20} height={20} />
              )}
              {loading ? "Loading..." : <span className="font-bold">Download PDF</span>}
            </button>
          )}
        </PDFDownloadLink>
      </div>
    </main>
  );
}
