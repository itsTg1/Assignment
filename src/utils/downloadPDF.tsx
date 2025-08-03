import { pdf } from "@react-pdf/renderer";
import PDFDocument from "../components/PDFDocument";

export async function downloadPDF(data: any) {
  const blob = await pdf(<PDFDocument {...data} />).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "details.pdf";
  link.click();
  URL.revokeObjectURL(url);
}
