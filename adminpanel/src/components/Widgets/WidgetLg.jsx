import React from "react";
import "./widgetlg.css";
import image from "../../images/images.jpeg";
import img from "../../images/img.jpeg";

const WidgetLg = () => {
  const Button = ({ type }) => {
    return <button className={"widgetlgButton " + type}>{type}</button>;
  };

  return (
    <div className="widgetlg p-3 ms-3">
      <h3 className="widgetlgTitle">Latest Orders</h3>
      <table className="widgetlgTable w-100">
        <thead>
          <tr className="widgetlgTr">
            <th className="widgetlgTh text-start">Customer</th>
            <th className="widgetlgTh text-start">Date</th>
            <th className="widgetlgTh text-start">Amount</th>
            <th className="widgetlgTh text-start">Order</th>
            <th className="widgetlgTh text-start">Status</th>
          </tr>
        </thead>

        <tbody>
          <tr className="widgetlgTr">
            <td className="widgetlgUser d-flex align-items-center">
              <img src={image} alt="user" className="widgetlgImage me-2" />
              <span className="widgetlgName">Susan Carol</span>
            </td>
            <td className="widgetlgDate">2 Jun 2022</td>
            <td className="widgetlgAmount">$122.00</td>
            <td className="widgetlgOrder">3 Items</td>
            <td className="widegtelgStatus">
              <Button type="Delivered" />{" "}
            </td>
          </tr>

          <tr className="widgetlgTr">
            <td className="widgetlgUser d-flex align-items-center">
              <img src={img} alt="user" className="widgetlgImage me-2" />
              <span className="widgetlgName">Jack Smith</span>
            </td>
            <td className="widgetlgDate">4 Feb 2022</td>
            <td className="widgetlgAmount">$100.00</td>
            <td className="widgetlgOrder">2 Items</td>
            <td className="widegtelgStatus">
              <Button type="Canceled" />{" "}
            </td>
          </tr>

          <tr className="widgetlgTr">
            <td className="widgetlgUser d-flex align-items-center">
              <img src={image} alt="user" className="widgetlgImage me-2" />
              <span className="widgetlgName">Harley Davidson</span>
            </td>
            <td className="widgetlgDate">20 May 2022</td>
            <td className="widgetlgAmount">$120.00</td>
            <td className="widgetlgOrder">3 Items</td>
            <td className="widegtelgStatus">
              <Button type="Pending" />{" "}
            </td>
          </tr>

          <tr className="widgetlgTr">
            <td className="widgetlgUser d-flex align-items-center">
              <img src={img} alt="user" className="widgetlgImage me-2" />
              <span className="widgetlgName">Mitsi Nohara</span>
            </td>
            <td className="widgetlgDate">2 Jan 2022</td>
            <td className="widgetlgAmount">$150.00</td>
            <td className="widgetlgOrder">4 Items</td>
            <td className="widegtelgStatus">
              <Button type="Delivered" />{" "}
            </td>
          </tr>

          <tr className="widgetlgTr">
            <td className="widgetlgUser d-flex align-items-center">
              <img src={image} alt="user" className="widgetlgImage me-2" />
              <span className="widgetlgName">Larry Kens</span>
            </td>
            <td className="widgetlgDate">21 May 2022</td>
            <td className="widgetlgAmount">$133.00</td>
            <td className="widgetlgOrder">2 Items</td>
            <td className="widegtelgStatus">
              <Button type="Pending" />{" "}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default WidgetLg;
