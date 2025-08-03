import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { FormData } from "../app/types/index";


const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#f3f4f6",
    fontFamily: "Helvetica",
  },
  container: {
    width: "100%",
    padding: 24,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    border: "1px solid #e5e7eb",
    boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    color: "#1f2937",
  },
  section: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottom: "1px solid #e5e7eb",
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  lastSection: {
    marginBottom: 0,
    paddingBottom: 0,
    borderBottom: "none",
  },
  label: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#374151",
    textTransform: "capitalize",
  },
  value: {
    fontSize: 12,
    color: "#4b5563",
    lineHeight: 1.5,
  },
});

const PDFDocument = (props: FormData) => {
  const entries = Object.entries(props);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          <Text style={styles.title}>Personal Details</Text>

          {entries.map(([label, value], index) => (
            <View
              key={label}
              style={
                index === entries.length - 1
                  ? styles.lastSection
                  : styles.section
              }
            >
              <Text style={styles.label}>
                {label === "phone"
                  ? "Phone Number"
                  : label.charAt(0).toUpperCase() + label.slice(1)}
              </Text>
              <Text style={styles.value}>{value?.trim() || "Not provided"}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument;
