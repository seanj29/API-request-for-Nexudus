import axios from "axios";
const apiurl = "https://spaces.nexudus.com/api";
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

async function locateCustomerByEmail(email) {
    const url =
        apiurl +
        "/spaces/coworkers?Coworker_Email=" +
        encodeURIComponent(email);
    const response = await axios.get(url, options);
    if (response.data.Records?.length) {
        return response.data.Records[0];
    }

    return false;
}

async function createProduct(product) {
    const url = apiurl + "/billing/products";
    const data = product;
    const response = await axios.post(url, data, options);
    return response.data.Value;
}

async function sellProduct(ProductNo, CoworkerNo) {
    const url = apiurl + "/billing/coworkerproducts";
    const data = {
        BusinessId: 1414974955,
        CoworkerId: CoworkerNo,
        ProductId: ProductNo,
        Quantity: 1,
        RepeatCycle: "PricePlan",
    };
    const response = await axios.post(url, data, options);
    return response.status;
}

async function locateAndSell(ProductId) {
    const EmailExists = await locateCustomerByEmail(CustomerEmail);
    if (EmailExists) {
        const CoworkerNo = await EmailExists.UserId;
        console.log(CoworkerNo);
        const ServerResponse = await sellProduct(ProductId, CoworkerNo).catch(
            (err) => {
                console.error(err.message);
            }
        );
        return ServerResponse;
    } else {
        throw new Error("Cannot locate specified customer email");
    }
}

async function ProductWrapper() {
    const ProductExists = await checkProductExists(ProdData);
    if (ProductExists) {
        const ProductIdNumber = await ProductExists.Id;
        console.log(ProductIdNumber);
        console.log("Product Already Existed");
        return ProductIdNumber;
    } else {
        const CreatedProduct = await createProduct(ProdData).catch((err) => {
            console.error(err.message);
        });
        const ProductIdNumber = CreatedProduct.Id;
        console.log(ProductIdNumber);
        console.log("Product Needed to be created");
        return ProductIdNumber;
    }
}
async function main() {
    const Id = await ProductWrapper();
    const response = await locateAndSell(Id);
    if (response == 200) {
        console.log("Successfully Sold Product");
    }
}
main();
