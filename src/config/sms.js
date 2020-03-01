var TeleSignSDK = require("telesignsdk");

const customerId = "01819DF1-1489-4D4F-A2FD-2002021F4DC7";
const apiKey =
  "oXLPMnk4dHowNpu5eN+xsGGoqC0ZWoUE14CAswZNFfaQMiqchdVy5JS5GB8gqiNrUDrQCd3QwAtN4Lrb9qThTg==";
const rest_endpoint = "https://rest-api.telesign.com";
const timeout = 10 * 1000; // 10 secs

const client = new TeleSignSDK(
  customerId,
  apiKey,
  rest_endpoint,
  timeout // optional
  // userAgent
);

const phoneNumber = "6285367552759";
const message = "You're scheduled for a dentist appointment at 2:30PM.";
const messageType = "ARN";

console.log("## MessagingClient.message ##");

function messageCallback(error, responseBody) {
  if (error === null) {
    console.log(
      `Messaging response for messaging phone number: ${phoneNumber}` +
        ` => code: ${responseBody["status"]["code"]}` +
        `, description: ${responseBody["status"]["description"]}`
    );
  } else {
    console.error("Unable to send message. " + error);
  }
}
client.sms.message(messageCallback, phoneNumber, message, messageType);
