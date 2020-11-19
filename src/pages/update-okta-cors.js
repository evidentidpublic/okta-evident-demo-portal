var axios = require('axios');
var {oktaUrl, oktaApiToken} = require('./Config')

async function createOktaCorsUpdateRequest() {
  var d = new Date();
  return axios({
    method: 'POST',
    url: oktaUrl + '/api/v1/trustedOrigins',
    data: {
      "name": "Standard Office Evident Demo App - " + d.toDateString(),
      "origin": "http://localhost:3000",
      "scopes": [
        {
          "type": "CORS"
        },
        {
          "type": "REDIRECT"
        }
      ]
    },
    headers: {
      'Authorization': 'SSWS ' + oktaApiToken,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  })
  .then(response => {
    if (response.status === 200) {
      console.log('Succesfully added "http://localhost:3000" to Okta CORS')
    }
    else {
      console.log('Error setting OKTA CORS with "http://localhost:3000" URL. Error: ', response.data)
    }
  }).catch(err => {
    console.log('Error updating Okta CORS: ', err.response.status, err.response.data)
  })
  }

async function main(){
  await createOktaCorsUpdateRequest()
}

(async () => {
  await main();
})().catch(e => {
    console.log('Uncaught error in script update-okta-cors: ', e)
});
