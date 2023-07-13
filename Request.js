import axios from "axios";

async function testspace() {
    
    const url = "https://core.spreedly.com/v1/gateways_options.json";

    const response = await axios.get(url).catch((error) => {
        console.log(error);
    });
    
 
    if (response.status == 200) {
    console.log("API Response obtained successfully");
       const gateways =  response.data.gateways;

       for (let i = 0; i <gateways.length; i++) {
        let paymentmethods =  gateways[i].payment_methods;
        console.info(`${gateways[i].name}

Accepted Countries: ${gateways[i].supported_countries}
  
Payment_methods:`);
        for (let j = 0; j < paymentmethods.length; j++){
            console.info(`${paymentmethods[j]}`);
        
}
console.info(`
`)
}
}
}
async function main() {
    const response = await testspace();

}
main();
