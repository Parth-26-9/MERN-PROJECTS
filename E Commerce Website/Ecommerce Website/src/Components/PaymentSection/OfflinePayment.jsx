import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const OfflinePayment = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [to, setTo] = useState("");
  const [status, setStatus] = useState(null);
  const [products, setProducts] = useState([]);
  const [address, setAddress] = useState({});
  const componentPDF = useRef();
  const [showPDF, setShowPDF] = useState(false);

  const styles = StyleSheet.create({
    page: {
      padding: 20,
      fontFamily: "Helvetica",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 20,
    },
    text: {
      marginBottom: 10,
    },
    tableRow: {
      flexDirection: "row",
      borderBottom: "1px solid black",
      padding: 5,
    },
    tableCell: {
      flex: 1,
      padding: 5,
    },
  });

  const PDFDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>User Information</Text>
        <View style={styles.text}>
          <Text>ID: {address._id}</Text>
          <Text>
            Name: {address.firstName} {address.lastName}
          </Text>
          <Text>
            Address: {address.street}, {address.city}, {address.state},{" "}
            {address.country}, {address.pincode}
          </Text>
          <Text>Created At: {address.createdAt}</Text>
          <Text>Updated At: {address.updatedAt}</Text>
        </View>
        <View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Product Name</Text>
            <Text style={styles.tableCell}>Price</Text>
          </View>
          {products.map((product) => (
            <View key={product._id} style={styles.tableRow}>
              <Text style={styles.tableCell}>{product.productName}</Text>
              <Text style={styles.tableCell}>
                {product.Price.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </Text>
            </View>
          ))}
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Total</Text>
            <Text style={styles.tableCell}>
              {products
                .reduce((total, product) => total + product.Price, 0)
                .toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );

  const generatePDF = () => {
    setShowPDF(true);
  };

  async function getData() {
    try {
      const response = await axios.get("http://localhost:4000/cart/cartItem");
      setProducts(response.data.cart);
    } catch (error) {
      console.error(error);
    }
  }

  async function getAddressData() {
    try {
      const response = await axios.get("http://localhost:4000/address/address");
      setAddress(response.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
    getAddressData();
  }, []);
  async function handleClick() {
    if (!products.length) {
      setStatus("Error: Please wait while cart details are loading ...");
      return;
    }

    const productDetails = products
      .map((product) => {
        const formattedPrice = product.Price.toLocaleString("en-IN", {
          style: "currency",
          currency: "INR",
        });
        return `Product Name :- ${product.productName}  ||   Product Price :-  ${formattedPrice}`;
      })
      .join(", ");

    const totalAmount = products
      .reduce((total, product) => total + product.Price, 0)
      .toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });

    const productMessage = `Product Details: ${productDetails} || Total Amount: ${totalAmount}`;

    generatePDF();

    sendSMS(productMessage);

    toast.success("Address details generated successfully!", {
      position: "top-center",
      autoClose: 3000,
    });
  }

  const sendSMS = async (storeMessage) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/sendMessage/whatsApp",
        {
          message: storeMessage,
          to,
        }
      );
      setStatus(response.data.msg);
    } catch (error) {
      setStatus(error.response);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="to"
            >
              Get Your Cart Details!
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="to"
              type="tel"
              placeholder="Enter mobile number"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleClick}
            >
              Generate Address
            </button>
            {showPDF && (
              <PDFDownloadLink
                document={<PDFDocument />}
                fileName="user-info.pdf"
              >
                {({ blob, url, loading, error }) =>
                  loading ? "Loading document..." : "Download PDF"
                }
              </PDFDownloadLink>
            )}
          </div>
          {status && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4 text-sm"
              role="alert"
            >
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline">{status}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
