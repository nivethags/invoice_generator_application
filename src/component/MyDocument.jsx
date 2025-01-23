import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Define styles
const styles = StyleSheet.create({
  page: { flexDirection: "column", padding: 30 },
  section: { marginBottom: 10, padding: 10, border: "1px solid black" },
  title: { fontSize: 18, marginBottom: 10 },
});

// Define the document structure
const MyDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Dynamically Generated PDF</Text>
      {data.map((item, index) => (
        <View key={index} style={styles.section}>
          <Text>{item}</Text>
        </View>
      ))}
    </Page>
  </Document>
);

export default MyDocument;
