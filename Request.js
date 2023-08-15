import axios from "axios";
import 'dotenv/config';

async function testspace() {
    
    const url = "https://spaces.nexudus.com/api/apps/marketplaceApplications/feed?marketplace_id=f29c7517-543f-4aa2-a17b-2de4b24b9869";
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          authorization: process.env.API_TOKEN
        }
      };
    const response = await axios
    .get(url, options)
    .then((response) =>{
        console.log(response);
    })
    .then((err) =>{
        console.log(err);
    })
}
testspace();

