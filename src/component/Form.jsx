import React, { useState, useEffect } from "react";
import { pdf, PDFViewer, StyleSheet } from "@react-pdf/renderer";
import './style.css'
import PdfGenerater from "./PdfGenerater";
const Form = ({ getData,setBlob }) => {
    const styles = StyleSheet.create({
        mainDiv: {
            display: 'flex', flexDirection: 'column', flexWrap: 'wrap', rowGap: '20px',
        },
        subDiv: {
            display: 'flex', columnGap: '10px', columnCount: '2', paddingLeft: '5%'
        },
        label: {
            display: 'inline-block',
            // minWidth: ' fit-content',
            width: '200px',
            textAlign: ' left',
            padding: ' 0px 5px 0px 0px',
            // border: '1px solid black'
        },
        form_data: {
            display: ' flex',
            columnGap: '10px',
            columnCount: '2',
            flexWrap: 'wrap',
            rowGap: '20px',
            width: '100%',
        },
        client_detail: {
            // border: ' 1px solid black',
            display: 'flex',
            flexWrap: 'wrap',
            rowGap: '20px',
            width: 'fit-content',
        },
        Table: {
            border: '1px solid black',
            borderCollapse: 'collapse',
            paddingLeft: '20px',
            textAlign: 'center',
            padding: '10px'
        },
        AddBtn: {
            padding: '10px 30px',
            float: 'right',
            display: 'flex',
            justifyContent: 'flex-end',
            marginRight: '15%'
        }

    })


    const [invoice, setInvoice] = useState({ invoiceNo: '', issueDate: '', dueDate: '' });
    const [business, setBusiness] = useState({ name: '', address: '', email: '', phno: '' ,logo:''});
    const [clientDetail, setClientDetail] = useState({ cname: '', mail: '', address1: '', address2: '' });
    const [accountDetail,setAccountDetail]=useState({bname:'',achname:'',acno:''})

    const [allItems, setAllItems] = useState([{ product: '', price: '' }, { product: '', price: '' }, { product: '', price: '' }, { product: '', price: '' }]);
    const [total, setTotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [totalDue, setTotalDue] = useState(0);

    const [data, setData] = useState([]);
    const [previewShow,setPreview]=useState(false);


    const handleData = (index, e) => {
        const { name, value } = e.target;
        const updatedItem = [...allItems];
        updatedItem[index][name] = value;
        setAllItems(updatedItem);
    }
    const AddItem = () => {
        setAllItems([...allItems, { product: '', price: '' }]);
    }
   
    
    const calculateTotalAmount = (total, tax) => {
        return total + (tax / 100) * total;
    };
    useEffect(() => {
        const calculateTotal = () => {
            return allItems.reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);
        }
        const totalAmount = calculateTotal();
        setTotal(totalAmount);
        setTotalDue(calculateTotalAmount(totalAmount, tax));
        
    }, [allItems, tax]);

    const handleClient = (e) => {
        const { name, value } = e.target;
        setClientDetail(prevClient => ({ ...prevClient, [name]: value }));
    }

    const handleBusiness = (e) => {
        const { name, value } = e.target;

        setBusiness(prevBusiness => ({ ...prevBusiness, [name]: value }));
    }
    const handleImageUpload=(e)=>{
        const file=e.target.files[0];
        const reader=new FileReader();
        reader.onloadend=()=>{
            setBusiness({...business,logo:reader.result})
            
        }
        if(file){
            reader.readAsDataURL(file);
        }
    }
    const handleBankDetail=(e)=>{
        const {name,value}=e.target;
        setAccountDetail(prevBankDetails=>({...prevBankDetails,[name]:value}));
    }
    const makeBill = () => {
        const Data = [clientDetail, business, invoice,allItems,{total:total},{tax:tax},{totalDue:totalDue},accountDetail];
        setData(Data);
        getData(Data);        
        generatePdfBlob();

    }

    const generatePdfBlob = async () => {
        const blob = await pdf(<PdfGenerater data={data}  />).toBlob();
        const url = URL.createObjectURL(blob);
        setBlob(url);
        
        setPreview(true);
    };

    return (
        <div style={{
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
            rowGap: '30px',
            padding: '4%',
        }}>

            <div className="invoice" style={{...styles.mainDiv,display:'relative'}}>
                <div className="title">
                    <h5>Invoice Details</h5>
                </div>
                <div className="form-data" style={{ ...styles.subDiv, ...styles.form_data }}>

                    <div className="form-group d-flex align-items-center">
                        <label htmlFor="" style={{ ...styles.label }}>Invice No:</label>
                        <input type="text" name="invoiceNo" id="" className="form-control" onChange={(e) => setInvoice({ ...invoice, invoiceNo: e.target.value })} />
                    </div>
                    <div className="form-group d-flex align-items-center">
                        <label htmlFor="" style={{ ...styles.label }}>Issue Date:</label>
                        <input type="date" name="issueDate" id="" className="form-control" onChange={(e) => setInvoice({ ...invoice, issueDate: e.target.value })} />
                    </div>
                    <div className="form-group d-flex align-items-center">
                        <label htmlFor="" style={{ ...styles.label }}>Due Date:</label>
                        <input type="date" name="dueDate" id="" className="form-control" onChange={(e) => setInvoice({ ...invoice, dueDate: e.target.value })} />
                    </div>
                </div>
            </div>

            <div className="bank-detail" style={{...styles.mainDiv,display:'relative'}}>
                <div className="title">
                    <h5>Bank Details</h5>
                </div>
                <div className="form-data" style={{ ...styles.subDiv, ...styles.form_data }}>

                    <div className="form-group d-flex align-items-center">
                        <label htmlFor="" style={{ ...styles.label }}>Bank Name:</label>
                        <input type="text" name="bname" id="" className="form-control" onChange={(e) =>handleBankDetail(e) } />
                    </div>
                    <div className="form-group d-flex align-items-center">
                        <label htmlFor="" style={{ ...styles.label }} className="holder">Account Holder's Name:</label>
                        <input type="text" name="achname" id="" className="form-control" onChange={(e) => handleBankDetail(e)} />
                    </div>
                    <div className="form-group d-flex align-items-center">
                        <label htmlFor="" style={{ ...styles.label }}>Account No:</label>
                        <input type="text" name="acno" id="" className="form-control" onChange={(e) =>handleBankDetail(e)} />
                    </div>
                </div>
            </div>
            <div  className="business-client" style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline' }}>


                <div className="about-company" style={{ ...styles.mainDiv, justifyContent: 'flex-end' }}>
                    <div className="title">
                        <h5>Business Details</h5>
                    </div>
                    <div className="form-data" style={{ ...styles.subDiv, ...styles.form_data }}>

                        <div className="form-group d-flex align-items-center logo" style={{ display: 'flex' }}>
                            <label htmlFor="" className="" style={{ ...styles.label }}>Business logo</label>
                            <input type="file" accept="image/*" className="form-control" name="logo" onChange={(e) => handleImageUpload(e)} />
                        </div>

                        <div className="form-group d-flex align-items-center name" style={{ display: 'flex' }}>
                            <label htmlFor="" className="" style={{ ...styles.label }}>Business Name</label>
                            <input type="text" className="form-control" name="name" onChange={(e) => handleBusiness(e)} />
                        </div>
                        <div className="form-group d-flex address">
                            <label htmlFor="" style={{ ...styles.label }}>Business Address</label>
                            <input type="text" className="form-control" name="address" onChange={e => handleBusiness(e)} />
                        </div>
                        <div className="form-group d-flex align-items-center phone">
                            <label htmlFor="" style={{ ...styles.label }}>Phone</label>
                            <input type="tel" className="form-control" name="phno" onChange={e => handleBusiness(e)} />
                        </div>
                        <div className="form-group d-flex align-items-center mail">
                            <label htmlFor="" style={{ ...styles.label }}>Email</label>
                            <input type="email" className="form-control" name="email" onChange={e => handleBusiness(e)} />
                        </div>
                    </div>
                </div>

                <div className="client-detail" style={{ ...styles.mainDiv, ...styles.client_detail }}>
                    <div className="title">
                        <h5>Client Details</h5>
                    </div>
                    <div className="form-data" style={{ ...styles.subDiv, ...styles.form_data }}>
                        {/* <div className="issued-to d-flex align-items-center">
                            <label htmlFor="" style={{ ...styles.label }}>Email</label>
                            <input type="email" className="form-control" />
                        </div> */}

                        <div className="client-name d-flex align-items-center">
                            <label htmlFor="" style={{ ...styles.label }}>Client Name:</label>
                            <input type="text" className="form-control" name="cname" onChange={(e) => handleClient(e)} />
                        </div>
                        <div className="address1 d-flex align-items-center">
                            <label htmlFor="" style={{ ...styles.label }}>Address line 1:</label>
                            <input type="text" className="form-control" name="address1" onChange={(e) => handleClient(e)} />
                        </div>
                        <div className="address2 d-flex align-items-center">
                            <label htmlFor="" style={{ ...styles.label }}>Adress Line 2:</label>
                            <input type="text" className="form-control" name="address2" onChange={(e) => handleClient(e)} />
                        </div>
                        <div className="client-email d-flex align-items-center">
                            <label htmlFor="" style={{ ...styles.label }}> Client Email:</label>
                            <input type="email" className="form-control" name="mail" onChange={(e) => handleClient(e)} />
                        </div>

                    </div>
                </div>
            </div>

            <div className="product-list" style={styles.mainDiv}>
                <div className="add-prd">
                    <button type="button" style={{ ...styles.AddBtn }} onClick={AddItem} >Add</button>
                </div>
                <div className="prd-list">

                    <table style={{ width: '70%', margin: 'auto', ...styles.Table }}>
                        <thead>
                            <tr>
                                <th style={{ ...styles.Table }}>item</th>
                                <th style={{ ...styles.Table }}>price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allItems.map((item, index) => (
                                    <tr key={index}>
                                        {/* <td onChange={(e)=>{setAllItems([...allItems,product=e.target.value])}}></td> */}
                                        <td><input type="text" name="product" id="" value={item.product} onChange={(e) => { handleData(index, e) }} /></td>
                                        <td><input type="number" name="price" id="" value={item.price} onChange={(e) => { handleData(index, e) }} /></td>
                                    </tr>
                                ))
                            }

                            <tr>
                                <td style={{ ...styles.Table }}> total</td>
                                <td style={{ ...styles.Table }}>{total}</td>
                            </tr>
                            <tr>
                                <td>Tax</td>
                                <td><input type="number" name="tax" id="" onChange={(e) => setTax(e.target.value)} /> </td>
                            </tr>
                            <tr >
                                <td style={{ ...styles.Table }}>Total Due</td>
                                <td style={{ ...styles.Table }}>{totalDue}</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
                <div className="sub-btn">
                    <button type="submit" className="btn btn-primary" onClick={makeBill}>Make Bill</button>
                </div>

            </div>
            { data  && previewShow && (
                    <div className="preview" style={{position:'absolute',top:'10%',left:'10%', width:'70vw',height:'70vh'}} >
                    <h3>Inline Viewer:</h3>
                    <PDFViewer width="100%" height="100%">
                        <PdfGenerater data={data}/>
                    </PDFViewer>
                    <a href="/" onClick={()=>setPreview(false)}>close</a>
                </div>
                )
            }
           


        </div>
    )

}
export default Form