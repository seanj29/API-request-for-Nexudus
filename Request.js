import axios from "axios";
;
// const username = prompt("Username");
// const password = prompt("Password");
// const auth = "Basic " + Buffer.from(username + ":" + password, "base64");
const options = {
    headers: {
        accept: "application/json",
        "content-type": "application/json",
    },
}

async function testspace(SpaceName) {
    
    const apiurl = `https://${SpaceName}.spaces.nexudus.com/en?_depth=1`
    const url = apiurl;

    const response = await axios.get(url, options).catch((error) => {
        console.log(error);
    });
    
        console.log(response.data);
}

async function main() {
    const response = await testspace("Seandemo");
    if (response == 200) {
        console.log("Successfully Sold Product");
    }
}
main();
