import axios from "axios";

async function testspace() {
    
    const url = "https://spaces.nexudus.com/api/apps/marketplaceApplications/feed?marketplace_id=f29c7517-543f-4aa2-a17b-2de4b24b9869n";
    const headers = {
        accept: 'application/json',
        authorization: 'Bearer NDMN8z-my_6Sl8UT4kg9UdY2c3k8s8I6'
      }

    const response = await axios
    .get(url, headers)
    .catch(err => {

    console.error(err.info)})

    .then((response) =>{

    console.info(response)

})

}
testspace();

