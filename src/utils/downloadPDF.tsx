import { pdf } from "@react-pdf/renderer";
import PDFDocument from "@/components/PDFDocument";
import { FormData } from "@/app/types";

export async function downloadPDF(data: FormData) {
  const blob = await pdf(<PDFDocument {...data} />).toBlob();
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "details.pdf";
  a.click();
  URL.revokeObjectURL(url);
}
