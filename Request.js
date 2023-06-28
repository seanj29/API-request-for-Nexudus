import axios from "axios";
const apiurl = "https://xyz.spaces.nexudus.com/en?_depth=1";
const username = prompt("Username");
const password = prompt("Password");
const auth = "Basic " + Buffer.from(username + ":" + password, "base64");
const ProdName = prompt("Name For Product you wish to sell");
const options = {
    headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: auth,
    },
};
const ProdData = {
    Tariffs: [0],
    Description: "Product Description",
    BusinessId: 1414974955,
    Name: ProdName,
    DisplayOrder: 0,
    Price: 10,
    CurrencyId: 3005,
    TaxRateId: 1415056663,
    ReducedTaxRateId: 0,
    ExemptTaxRateId: 0,
    FinancialAccountId: 0,
    AvailableAs: "RecurrentOrOneOff",
};
const CustomerEmail = prompt("Customer Email");

async function checkProductExists(product) {
    const url =
        apiurl +
        "/billing/products?Product_Name=" +
        encodeURIComponent(product.Name);

    const response = await axios.get(url, options).catch((error) => {
        console.log(error);
    });
    if (response.data.Records?.length) {
        return response.data.Records[0];
    }

    return false;
}

async function main() {
    const Id = await ProductWrapper();
    const response = await locateAndSell(Id);
    if (response == 200) {
        console.log("Successfully Sold Product");
    }
}
main();
