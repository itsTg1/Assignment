"use client";

import dynamic from "next/dynamic";
import { FormData } from "@/app/types";
import PDFDocument from "./PDFDocument";


const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  { ssr: false }
);

export default function PDFDownloadButton({ data }: { data: FormData }) {
  return (
    <PDFDownloadLink
      document={<PDFDocument {...data} />}
      fileName="details.pdf"
    >
      {({ loading }: { loading: boolean }) => (
        <button
          type="button"
          className="bg-green-700 text-white px-4 py-2 rounded"
        >
          {loading ? "Loading..." : "Download PDF"}
        </button>
      )}
    </PDFDownloadLink>
  );
}
