import axios from "axios";
import 'dotenv/config';

async function testspace() {
    
    const url = "https://seandemo.spaces.nexudus.com/en/basket/previewInvoice";
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          body: process.env.BODY
        }
        }
    const response = await axios
    .get(url, options)
    .then((response) =>{
        console.log(response.data[0]);
    })
    .catch((err) =>{
        console.log(err);
    })
}
testspace();

