import { useEffect, useRef, useState } from "react";
import { PaymentWidgetInstance, loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import { useLocation } from "react-router-dom";
import "./Form.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const selector = "#payment-widget";

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = nanoid();

interface Product {
  id: string;
  name: string;
  price: number;
}

interface User {
  id: string;
  nickname: string;
  email: string;
  phoneNumber: string;
}

interface Order {
  id: string;
  totalAmount: number;
  products: Product[];
}

function CheckoutPage() {
  const location = useLocation();
  const { totalPrice = 0, selectedOrders = [], selectedOrderIds = "" } = location.state || {};
  const { data: paymentWidget } = usePaymentWidget(clientKey, customerKey);
  const paymentMethodsWidgetRef = useRef<ReturnType<PaymentWidgetInstance["renderPaymentMethods"]> | null>(null);
  const [price] = useState(totalPrice);
  const [paymentMethodsWidgetReady, isPaymentMethodsWidgetReady] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:8081/api/users/${userId}`)
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error("Failed to fetch user data:", error);
        });
    }
  }, [userId]);

  useEffect(() => {
    if (paymentWidget == null) {
      return;
    }

    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      selector,
      { value: price },
      { variantKey: "DEFAULT" }
    );

    paymentWidget.renderAgreement("#agreement", { variantKey: "AGREEMENT" });

    paymentMethodsWidget.on("ready", () => {
      paymentMethodsWidgetRef.current = paymentMethodsWidget;
      isPaymentMethodsWidgetReady(true);
    });
  }, [paymentWidget]);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    paymentMethodsWidget.updateAmount(price);
  }, [price]);

  const calculateQuantity = (totalAmount: number, price: number) => {
    return totalAmount / price;
  };

  const getOrderName = (orders: Order[]) => {
    const allProducts = orders.flatMap(order => order.products);
    if (allProducts.length === 0) {
      return "No products";
    }
    if (allProducts.length === 1) {
      return allProducts[0].name;
    }
    return `${allProducts[0].name} 외 ${allProducts.length - 1}건`;
  };

  const formatPhoneNumber = (phoneNumber: string) => {
    return phoneNumber.replace(/\D/g, '');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR', {
      currency: 'KRW',
    }).format(price);
  };

  return (
    <div className="wrapper">
      <div className="box_section">
        <div id="payment-widget" />
        <div id="agreement" />
        <div>
          <h2 className="payh2">총 결제 금액: {formatPrice(price)}</h2>
          <ul className="payul">
            {selectedOrders.map((order: Order) => (
              <li key={order.id}>
                {order.products.map((product: Product) => (
                  <div key={product.id}>
                    {product.name} - {calculateQuantity(order.totalAmount, product.price)}개
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>
        <button
          className="payment-button"
          style={{ marginTop: "30px" }}
          disabled={!paymentMethodsWidgetReady}
          onClick={async () => {
            try {
              const formattedPhoneNumber = user?.phoneNumber ? formatPhoneNumber(user.phoneNumber) : null;
              if (!formattedPhoneNumber) {
                throw new Error("Invalid phone number format");
              }

              await paymentWidget?.requestPayment({
                orderId: nanoid(),
                orderName: getOrderName(selectedOrders),
                customerName: user?.nickname,
                customerEmail: user?.email,
                customerMobilePhone: formattedPhoneNumber,
                successUrl: `${window.location.origin}/success?orderIds=${selectedOrderIds}`,
                failUrl: `${window.location.origin}/fail`,
              });

            } catch (error) {
              console.error(error);
            }
          }}
        >
          결제하기
        </button>
      </div>
    </div>
  );
}

function usePaymentWidget(clientKey: string, customerKey: string) {
  return useQuery({
    queryKey: ["payment-widget", clientKey, customerKey],
    queryFn: () => {
      return loadPaymentWidget(clientKey, customerKey);
    },
  });
}

export default CheckoutPage;
