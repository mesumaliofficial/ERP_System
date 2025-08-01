import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import base64Logo from '@/utils/base64Logo';
import { QuotationPDFProps } from '@/types/quotationTypes';

// Font registration
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxP.ttf', fontWeight: 'normal' },
    { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1MmEU9fBBc9.ttf', fontWeight: 'bold' },
  ],
});

const styles = StyleSheet.create({
  page: { paddingHorizontal: 30, paddingVertical: 20, fontSize: 10, fontFamily: 'Roboto', backgroundColor: '#fff', color: '#2d3748' },
  heading: { textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: '#2b6cb0', marginBottom: 15, fontFamily: 'Helvetica' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, borderBottomWidth: 2, borderBottomColor: '#2b6cb0', paddingBottom: 15 },
  companyInfo: { width: '55%' },
  logo: { width: 120, height: 90, marginBottom: 8, objectFit: 'contain' },
  companyTagline: { fontSize: 14, color: '#2b6cb0', fontWeight: 'bold', marginBottom: 6, fontFamily: 'Helvetica' },
  companyDetails: { fontSize: 9, color: '#4a5568', lineHeight: 1.5 },
  rightHeader: { top: 15, textAlign: 'right', width: '40%' },
  quotationInfoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25, padding: 15, backgroundColor: '#edf2f7', borderRadius: 6, borderWidth: 1, borderColor: '#2b6cb0' },
  quotationBox: { width: '48%' },
  boldLabel: { fontWeight: 'bold', color: '#2b6cb0', marginBottom: 6, fontSize: 12, fontFamily: 'Helvetica' },
  table: { width: '100%', marginTop: 0, borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 6, overflow: 'hidden' },
  tableRow: { flexDirection: 'row', backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#e2e8f0' },
  colNum: { flex: 0.2 }, colProduct: { flex: 5.5 }, colQty: { flex: 1 }, colRate: { flex: 1 }, colAmount: { flex: 1 },
  tableColHeader: { borderRightWidth: 1, borderRightColor: '#e2e8f0', backgroundColor: '#edf2f7', padding: 10, fontWeight: 'bold', textAlign: 'left', color: '#2b6cb0', fontFamily: 'Helvetica' },
  tableCol: { borderRightWidth: 1, borderRightColor: '#e2e8f0', padding: 10, textAlign: 'left', color: '#2d3748' },
  totalBox: { marginTop: 20, padding: 12, borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 6, width: '50%', maxWidth: 400, alignSelf: 'flex-end', backgroundColor: '#fff', gap: 8 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  label: { fontSize: 10, fontWeight: 600, color: '#1f2937' },
  valueBox: { fontSize: 10, fontWeight: 700, backgroundColor: '#f3f4f6', color: '#111827', paddingVertical: 2, paddingHorizontal: 6, borderRadius: 4 },
  grandLabel: { fontSize: 11, fontWeight: 700, color: '#1f2937' },
  grandValueBox: { fontSize: 11, fontWeight: 700, backgroundColor: '#1E90FF', color: '#fff', paddingVertical: 3, paddingHorizontal: 10, borderRadius: 4 },
  termsSection: { marginTop: 15, width: '70%', paddingHorizontal: 10, borderLeftWidth: 3, borderLeftColor: '#2b6cb0' },
  termsText: { fontSize: 9, color: '#4a5568', lineHeight: 1.6 },
  footerBottom: { position: 'absolute', bottom: 30, left: 0, right: 0, width: '100%' },
  footerContact: { textAlign: 'center', fontSize: 8.5, color: '#2b6cb0', backgroundColor: '#edf2f7', padding: 8, borderRadius: 6 },
});

const QuotationPDF = ({ data }: QuotationPDFProps) => {
  const totalItems = data?.items || [];
  const ROWS_PER_PAGE = 24;

  const ROWS_FIRST_PAGE = totalItems.length > 6 ? 6 : 20;

  const firstPageRows = totalItems.slice(0, ROWS_FIRST_PAGE);
  const remaining = totalItems.slice(ROWS_FIRST_PAGE);

  const middlePages: typeof totalItems[] = [];
  for (let i = 0; i < remaining.length; i += ROWS_PER_PAGE) {
    middlePages.push(remaining.slice(i, i + ROWS_PER_PAGE));
  }

  const company = {
    name: 'Solar Energy Solutions',
    address: 'Shop # 10, Near Quaid e Azam Square Plaza, Malir Cantt Karachi.',
    contact: '0321-8207290',
    email: 'sunnysolution90@gmail.com',
  };

  const renderTableHeader = () => (
    <View style={styles.tableRow}>
      <Text style={[styles.tableColHeader, styles.colNum]}>#</Text>
      <Text style={[styles.tableColHeader, styles.colProduct]}>Product Name</Text>
      <Text style={[styles.tableColHeader, styles.colQty]}>Quantity</Text>
      <Text style={[styles.tableColHeader, styles.colRate]}>Rate</Text>
      <Text style={[styles.tableColHeader, styles.colAmount]}>Amount</Text>
    </View>
  );

  const renderTableRows = (items: typeof totalItems, offset = 0) =>
    items.map((item, i) => (
      <View style={styles.tableRow} key={offset + i}>
        <Text style={[styles.tableCol, styles.colNum]}>{offset + i + 1}</Text>
        <Text style={[styles.tableCol, styles.colProduct]}>{item.itemName}</Text>
        <Text style={[styles.tableCol, styles.colQty]}>{item.itemQty}</Text>
        <Text style={[styles.tableCol, styles.colRate]}>{item.itemRate}</Text>
        <Text style={[styles.tableCol, styles.colAmount]}>{item.itemAmount}</Text>
      </View>
    ));

  const renderTotalsFooter = () => (
    <>
      <View style={styles.totalBox}>
        <View style={styles.rowBetween}>
          <Text style={styles.label}>Sub Total Amount:</Text>
          <Text style={styles.valueBox}>Rs. {data.totals.subTotal.toFixed(2)}</Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.label}>Tax {data.tax.percentage}:</Text>
          <Text style={styles.valueBox}>Rs. {data.tax.taxAmount}</Text>
        </View>
        <View style={[styles.rowBetween, { borderTopWidth: 1, borderTopColor: '#e5e7eb', paddingTop: 6 }]}>
          <Text style={styles.grandLabel}>Grand Total:</Text>
          <Text style={styles.grandValueBox}>Rs. {data.totals.grandTotal.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.termsSection}>
        <Text style={[styles.boldLabel, { textAlign: 'left', marginBottom: 8 }]}>Terms & Conditions</Text>
        <Text style={styles.termsText}>{data.quotationConditions}</Text>
      </View>

      <View style={styles.footerBottom}>
        <Text style={styles.footerContact}>
          Sunny Solutions | {company.contact} | {company.email}
        </Text>
      </View>
    </>
  );

  return (
    <Document>
      {/* First Page */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.heading}>{data.quotationHeading}</Text>

        <View style={styles.headerRow}>
          <View style={styles.companyInfo}>
            <Image style={styles.logo} src={base64Logo} />
            <Text style={styles.companyTagline}>{company.name}</Text>
            <Text style={styles.companyDetails}>
              {company.address}{'\n'}{company.contact} | {company.email}
            </Text>
          </View>
          <View style={styles.rightHeader}>
            <Text style={{ fontWeight: 'bold', color: '#2b6cb0' }}>Quotation No: {data.quotationNumber}</Text>
            <Text style={{ marginTop: 6 }}>Issue Date: {new Date(data.issueDate).toLocaleDateString()}</Text>
            <Text style={{ marginTop: 4 }}>Valid Till: {new Date(data.validTill).toLocaleDateString()}</Text>
          </View>
        </View>

        <View style={styles.quotationInfoRow}>
          <View style={styles.quotationBox}>
            <Text style={styles.boldLabel}>Quotation From:</Text>
            <Text>{company.name}</Text>
            <Text>{company.contact}</Text>
            <Text>{company.address}</Text>
          </View>
          <View style={styles.quotationBox}>
            <Text style={styles.boldLabel}>Quotation To:</Text>
            <Text>{data.client.name}</Text>
            <Text>{data.client.contact}</Text>
            <Text>{data.client.email}</Text>
          </View>
        </View>

        <View style={styles.table}>
          {renderTableHeader()}
          {renderTableRows(firstPageRows, 0)}
        </View>

        {middlePages.length === 0 && renderTotalsFooter()}
      </Page>

      {/* Remaining Pages */}
      {middlePages.map((chunk, idx) => {
        const isLast = idx === middlePages.length - 1;
        const offset = ROWS_FIRST_PAGE + idx * ROWS_PER_PAGE;
        return (
          <Page key={idx} size="A4" style={styles.page}>
            <View style={styles.table}>
              {renderTableHeader()}
              {renderTableRows(chunk, offset)}
            </View>
            {isLast && renderTotalsFooter()}
          </Page>
        );
      })}
    </Document>
  );
};

export default QuotationPDF;
