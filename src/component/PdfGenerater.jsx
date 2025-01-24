import React from 'react';
import { Document, Page, Text, Image, StyleSheet, View } from '@react-pdf/renderer';
import { Font } from '@react-pdf/renderer';
import './style.css'

// Register the font
Font.register({
  family: 'Playwrite',
  // E:\First Project\project\public\fonts\PlaywriteIN-Regular.ttf
  src: '/fonts/PlaywriteIN-Regular.ttf',
});

// Create styles for the PDF
const styles = StyleSheet.create({
  horizontalLine: {
    height: ' 1',
    backgroundColor: 'black',
    marginVertical: '10', // Adjust spacing around the line
  },
  page: {
    // padding: 30,
    fontSize: '12',
    // border: '1px solid blue',
    // width:'40%',
    margin: 'auto',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  content: {
    marginBottom: 5,
  },
  headers: {
    flexDirection: 'column',
    marginBottom: '4%',
  },
  one: {
    flexDirection: 'row',          // Align children horizontally
    borderWidth: '1',                // Border width
    borderColor: 'black',          // Border color
    borderStyle: 'solid',          // Border style
    justifyContent: 'space-around', // Space items evenly with equal space around
    width: '100%',                 // Full width of the container
  },
  imageContainer: {
    border: '1px solid red',
    width: '100%',
    height: '100%',
  },
  li: {
    listStyle: 'none',
    padding: '5px 10px',
  },
  td: {
    border: ' 1px solid black',
    /* width: 100%, */
  },

  tr: {
    width: '100%',
  },

  table: {
    borderCollapse: 'collapse',
  },

  input: {
    outline: 'none',
    border: 'none',
    width: '100%',
    /* border: 1px solid red, */
    padding: ' 9px 0px',
  },

  greet: {
    // fontFamily: 'Playwrite IN, serif !important',
  },

  footer: {

    display: 'flex',
    flexDirection: 'row',
    justifyContent: ' space-between',
    marginTop: '30px',
    backgroundColor: '#8b3a131c',
    padding: ' 30px',
    columnGap: '10%',

  },
  view: {
    display: 'flex',
    flexDirection: "row",
    columnGap: '5px',
  },

  doc_page: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    padding: '2%',
  },
  main_view_container: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '1%',
  },
  first_div: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  img_cont: {
    width: '150px',
    height: '150px',
    border: '1px solid red',
  },
  invoice_header: {
    display: 'flex',
    flexDirection: 'column',
    // padding: 'right',

  },
  second: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  invoice_cont: {
    display: 'flex',
    flexDirection: 'column',
  },
  prd_table_container: {
    display: 'flex',
    justifyontent: 'space-between',
    // borderBottom: '1px solid black',
    padding: '10px 0px',
    letterSpacing: '1px',
    fonWeight: '400',
    width: '100%',
  },
  Image: {
    width: '150px',
    height: '150px',
  },
  Items: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Text: {
    lineHeight: "20px",
  }
});

const PdfGenerater = ({ data}) => {

  // const calculateTotal=()=>{
  //   const sum=0;
  //   data.map((item,index)=>(
  //     sum=item.price+sum
  //   ))
  // }
  return (

    <Document style={{ width: '100%' }}>
      <Page size="A4" style={{ ...styles.page, ...styles.doc_page, marginRight: '5%', marginLeft: '5%', marginTop: '5%', width: '90%' }}>

        <View style={{ width: '90%', ...styles.main_view_container, marginRight: '5%', marginLeft: '5%', marginTop: '5%', marginBottom: '10px' }}>
          {/* first div */}
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', columnGap: '25%', marginBottom: '20px' }}>
            <View className="img-cont" style={{ ...styles.img_cont }}>
              {data[1]?.logo ? (
                <Image style={{ width: '150px', height: '150px' }} src={data[1]?.logo} />
              ) : (
                <Text>No Logo Available</Text>
              )}            
                {/* <Image style={{ width: '150px', height: '150px' }} src={data[1]?.logo} ></Image> */}
            </View>

            <View style={{ ...styles.invoice_header, display: 'flex', flexDirection: 'column', rowGap: '2%' }} >
              <Text style={{ letterSpacing: '10px', fontWeight: '500' }}>INVOICE</Text>
              <Text style={{ fontWeight: '500', letterSpacing: '2px' }}>{data[1]?.name || "Not Mentioned"}</Text>
              <Text>{data[1]?.address || "Not Mentioned"}</Text>
              <Text>{data[1]?.phno || "Not Mentioned"}</Text>
              <Text>{data[1]?.email || "Not Mentioned"}</Text>
            </View>

          </View>

          {/* Second div */}
          <View class="second" style={{ display: 'flex', flexDirection: 'row', ...styles.second }} >

            <View style={{ display: 'flex', flexDirection: 'column', }}>
              <View style={{ ...styles.view }}>
                <Text style={{ fontWeight: '400', ...styles.Text }}>ISSUE TO:</Text>
                <Text style={{ ...styles.Text }}>{data[1]?.name || "Not Mentioned"}</Text>
                {/* <Text>name</Text>  */}
                {/* <Text style={styles.p}>Client Details: {data[0]?.clientDetail || 'N/A'}</Text>  */}

              </View>
              <View style={{ ...styles.view }}>
                <Text style={{ ...styles.Text }}>Client Name:</Text>
                <Text style={{ ...styles.Text }}>{data[0]?.cname || "Not Mentioned"}</Text>
              </View>
              <View style={{ ...styles.view }}>
                <Text style={{ ...styles.Text }}>Addres Line :</Text>
                <Text style={{ ...styles.Text }}>{data[0]?.address1 || "Not Mentioned"}</Text>
              </View>

              <View style={{ ...styles.view }}>
                <Text style={{ ...styles.Text }}>Addres Line :</Text>
                <Text style={{ ...styles.Text }}>{data[0]?.address2 || "Not Mentioned"}</Text>
              </View>
              <View style={{ ...styles.view }}>
                <Text style={{ ...styles.Text }}>Email Address:</Text>
                <Text style={{ ...styles.Text }}>{data[0]?.mail || "Not Mentioned"}</Text>
              </View>
            </View>

            <View className="invoice-cont" style={{ ...styles.invoice_cont }} >
              <View style={{ ...styles.view }}>
                <Text style={{ ...styles.Text }}>INVOICE NO:</Text>
                <Text style={{ ...styles.Text }}>{data[2]?.invoiceNo || "Not Mentioned"}</Text>
              </View>
              <View style={{ ...styles.view }}>
                <Text style={{ ...styles.Text }}>Issue Date:</Text>
                <Text style={{ ...styles.Text }}>{data[2]?.issueDate || "Not Mentioned"}</Text>
              </View>
              <View style={{ ...styles.view }}>
                <Text style={{ ...styles.Text }}>Due Date:</Text>
                <Text style={{ ...styles.Text }}>{data[2]?.dueDate || "Not Mentioned"}</Text>
              </View>
            </View>
          </View>
          <View style={{ ...styles.prd_table_container }}>
            <View className="prd-table-container" style={{ ...styles.view, ...styles.Items, borderBottom: '1px solid black', paddingBottom: '10px' }}>
              <Text>DESCRIPTION</Text>
              <Text>AMOUNT</Text>
            </View>
            {Array.isArray(data[3]) && data[3].map((item, index) => (
              <View key={index} style={{ ...styles.Items }}>
                <Text style={{ ...styles.li, ...styles.Text }}>{item?.product || "Not Mentioned"}</Text>
                <Text style={{ ...styles.li, ...styles.Text }}>{item?.price || "Not Mentioned"}</Text >
              </View>
            ))
            }

            {/* <View style={{...styles.Items}}>
    <Text  style={{...styles.li,...styles.Text}}>item1</Text >
    <Text  style={{...styles.li,...styles.Text}}>100</Text >
  </View>
  <View style={{...styles.Items}}>
    <Text  style={{...styles.li,...styles.Text}} >item1</Text >
    <Text  style={{...styles.li,...styles.Text}}>100</Text >
  </View>
  <View style={{...styles.Items}}>
    <Text  style={{...styles.li,...styles.Text}}>item1</Text >
    <Text  style={{...styles.li,...styles.Text}}>100</Text >
  </View>
  <View style={{...styles.Items}}>
    <Text  style={{...styles.li,...styles.Text}}>item1</Text >
    <Text  style={{...styles.li,...styles.Text}}>100</Text >
  </View> */}
          </View>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderTop: ' 1px solid black',
            borderBottom: ' 1px solid black',
            padding: ' 10px 10px',
            ...styles.Items
          }}>
            <Text style={{ ...styles.Text }}>Total</Text>
            <Text style={{ ...styles.Text }}>{data[4]?.total || "Not Mentioned"}</Text>
          </View>
          <View style={{marginLeft:"auto"}}>
            <div className="total-amount" style={{ ...styles.Items }}>
              <Text style={{ ...styles.li, ...styles.Text }}>TOTAL</Text >
              <Text style={{ ...styles.li, ...styles.Text }}>{data[4]?.total || "Not Mentioned"}₹</Text >
            </div>₹
            <div className="total-amount" style={{ ...styles.Items }}>
              <Text style={{ ...styles.li, ...styles.Text }}>TAX</Text >
              <Text style={{ ...styles.li, ...styles.Text }}>{data[5]?.tax  || "Not Mentioned"} %</Text >
            </div>
            <div className="total-amount" style={{ ...styles.Items }}>
              <Text style={{ ...styles.li, ...styles.Text }}>AMOUNT DUE</Text >
              <Text style={{ ...styles.li, ...styles.Text }}>{data[6]?.totalDue || "Not Mentioned"}₹</Text >
            </div>
          </View>
          <View className="footer" style={{ ...styles.footer, position: 'relative', height: 'auto', width: '100%', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <View style={{ maxWidth: '60%' }}>
              <Text style={{ fontWeight: '500', ...styles.Text }}>BANK DETAILS</Text>
              <Text style={{ ...styles.Text }}>Bank Name:{data[7]?.bname || "Not Mentioned"}</Text>
              <Text style={{ ...styles.Text }}>Account Holder's Name :{data[7]?.achname || "Not Mentioned"}</Text>
              <Text style={{ ...styles.Text }}>Account No:{data[7]?.acno}</Text>
            </View>
            <View>
              <View style={{ width: '30%', alignContent: 'baseline', margin: 0 }}>
                <Text className='greet' style={{
                  fontFamily: 'Playwrite', fontWeight: 100,
                  fontStyle: 'normal', fontSize: '30px', tra6nsform: 'rotate(-15deg)', ...styles.Text
                }}>Thank   </Text>

                <Text className='greet' style={{
                  fontFamily: 'Playwrite', marginTop: '20px',
                  fontWeight: 100, fontStyle: 'normal', fontSize: '30px', transform: 'rotate(-15deg)', ...styles.Text
                }}>You..! </Text>
              </View>
            </View>

          </View>
        </View>

        {/* <Text style={styles.title}>Hello, !</Text> 
        <Text style={styles.content}>This is a dynamically generated PDF.</Text>  */}
      </Page>
    </Document>
  )
}



export default PdfGenerater;