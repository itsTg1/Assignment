"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import backIcon from "@/icons/chevron-left.svg";
import downloadIcon from "@/icons/Download.svg";
import { FormData } from "@/app/types";
import dynamic from "next/dynamic";

// Dynamically import PDFDownloadButton without SSR (safe for ESM)
const PDFDownloadButton = dynamic(() => import("@/components/PDFDownloadButton"), {
  ssr: false,
});

export default function PreviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const data: FormData = JSON.parse(searchParams.get("data") || "{}");

  return (
    <main className="min-h-screen p-10 bg-gray-100 relative">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="absolute cursor-pointer top-6 left-6 text-xl hover:text-gray-800 transition-transform hover:scale-110 hover:shadow-md"
        aria-label="Go Back"
      >
        <Image src={backIcon} alt="Back" width={50} height={42} />
      </button>

      {/* Data Preview */}
      <div className="max-w-xl mx-auto bg-white p-6 shadow rounded text-sm border-2 border-black">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="mb-2">
            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
            {value}
          </div>
        ))}
      </div>

      {/* PDF Download Button */}
      <div className="max-w-xl mx-auto mt-4">
        <PDFDownloadButton data={data} />
      </div>
    </main>
  );
}
