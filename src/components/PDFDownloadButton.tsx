"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFDocument from "./PDFDocument";
import { FormData } from "@/app/types";
import Image from "next/image";
import downloadIcon from "@/icons/Download.svg";

export default function PDFDownloadButton({ data }: { data: FormData }) {
  return (
    <PDFDownloadLink
      document={<PDFDocument {...data} />}
      fileName="details.pdf"
    >
      {({ loading }) => (
        <button className="w-full cursor-pointer bg-gradient-to-r from-[#064409] via-[#104812] to-[#527655] text-white px-4 py-3 rounded flex items-center justify-center gap-2 hover:from-[#527655] hover:via-[#527655] hover:to-[#527655] transition-all duration-200">
          {!loading && (
            <Image src={downloadIcon} alt="Download" width={20} height={20} />
          )}
          {loading ? "Loading..." : <span className="font-bold">Download PDF</span>}
        </button>
      )}
    </PDFDownloadLink>
  );
}
