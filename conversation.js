// ------------------------------------------------------------------------------------------------
// Prototype Template Guide:
// https://gitlab.com/gratafy/messenger-prototype/wikis/templates
// ------------------------------------------------------------------------------------------------
// Chat config
const config = {
  pageName:`Pepsi`,
  pageType:'Food Company',
  pageLikes:'37M',
  pagePhoto:'images/logo.png',
  startPoint:'facebook-ad',
  cacheBreaker: 1 // use Date.now() for debugging
};
// User info (Optional)
// This is expandable as needed
var userData = {
  firstName:'Dylan',
  lastName:'McAdam',
};
// ------------------------------------------------------------------------------------------------
// Conversation
const conversation = {
    "facebook-ad":{
      type:"facebookAd",
      text:"EVERYONE CAN BE A WINNER! Find out how you can get reimbursed for your Pepsi Zero Sugar.",
      headline: "Chat with us to get started!",
      image:"images/fb-ad.jpg",
      target:"intro"
    },
  	"intro":{
  		user:"bot",
  		type:"quickReply",
  		text:"Okay {firstName} we 👀 you! Free Pepsi Zero Sugar after the game? We think yes.",
  		buttons:[
  					{
  						value:"Tell me more",
  						target:"intro-2"
            },
            {
  						value:"Customer Service",
  						target:"intro-2"
  					}
  			]
  		},
      "intro-2": {
        user:"bot",
        type:"botTextMessage",
        text:"2020 is all about zeros, so if the final score of either team ends in zero, we'll reimburse you up to $2.50 for your purchase of Pepsi Zero Sugar!",
        target:"intro-3",
        autoPlay: true,
      },
      "intro-3": {
        user:"bot",
        type:"quickReply",
        text:"Want a reminder? We have the memory of a can, so we feel you...",
        buttons:[
          {
            value:"Ummm, yes please!",
            target:"intro-4"
          }
      ]
      },
      "intro-4": {
        user:"bot",
        type:"botTextMessage",
        text:"Watch that score! Zero means zero. Get yourself reimbursed for a purchase of Pepsi Zero Sugar. But remember to act fast: Eligible purchase window is from February 2, 2020 - February 4, 2020.",
        target:"intro-5",
        autoPlay: true,
        delay: 3
      },
      "intro-5": {
        user:"bot",
        type:"quickReply",
        text:"Since the score ended in a ZERO, we are about to hook you up with your cost of a Pepsi Zero Sugar (up to 2.50) via PayPal or Venmo. Are you ready to get your offer?",
        buttons:[
          {
            value:"I'm ready!",
            target:"terms"
          }
      ]
      },
      "terms":{
        user:"bot",
        type:"buttonTemplate",
        text:"Of course terms and conditions apply.<br><br>Purchase must be made between 2/2/2020 and 2/4/2020. Max value $2.50.",
        target:"terms-2",
        buttons:[
    					{
    						value:"View Terms",
                response: "null",
    						target:"terms-webview"
    					}
    			],
        autoPlay: true,
        delay:0
      },
    	"terms-2":{
    		user:"bot",
    		type:"quickReply",
    		text:"You cool with that?",
    		buttons:[
    					{
    						value:"Sounds good",
    						target:"receipt-ask"
    					}
    			]
        },
        "terms-webview":{
          type:"webView",
          height:"tall", // full, tall, compact
          stylesheet:"css/terms.css", // path to stylesheet if needed
          title: "Terms & Conditions",
          html:`
          <div class="terms-buttons" style="width:100%; margin-right:-18px;">
            <span href="" class="button">Offer Terms</span>
            <span href="" class="button">Platform Terms</span>
            <span href="" class="button">Privacy Policy</span>
          </div>
          <img src="https://d3goqxivbd7qku.cloudfront.net/3e/3ee9a25f-42a0-4522-91fc-321913f48e61" class="gratafy-logo">`,
          target:"null"
        },
        "receipt-ask":{
          user:"bot",
          type:"botTextMessage",
          text:"All right. Send us a well-lit picture of your receipt showing the retailer's name, a date from 2/2/20 to 2/4/20, and that you purchased a Pepsi Zero Sugar with the price shown.📷",
          target:"receipt-show",
          delay:0,
          autoPlay:true
        },
        "receipt-show":{
          user:"bot",
          type:"botAttachment",
          image:"https://d3goqxivbd7qku.cloudfront.net/2b/2bc851b5-1422-40f7-8b06-41eb26b9a7bd",
          width: 600,
          height: "auto",
          target:"receipt-camera",
          autoPlay:true,
          delay: 5
        },
        "receipt-camera":{
            user: "human",
            type: "camera",
            image: "images/receipt.jpg",
            mode: "camera",
            target: "receipt-extra",
            autoPlay:true,
            delay: 2
        },
        "receipt-extra": {
          user:"bot",
          type:"quickReply",
          text:"Okay. I got that image. If you have another image, go ahead and send it. Otherwise let me know you are done by using the option below...",
          buttons:[
            {
              value:"I'm done",
              target:"receipt-processing"
            }
        ]
        },
        "receipt-processing": {
          user:"bot",
          type:"botTextMessage",
          text:"Thanks for sending us your receipt, {firstName}! We're validating it and will message you back once it's in the clear. Please be patient as this may take up to 24 hours.",
          target:"rebate-options",
          autoPlay: true,
          delay: 5,
        },
        "rebate-options":{
          user:"bot",
          type:"quickReply",
          text:"Good news, {firstName}, your receipt has been validated. How would you like to receive your rebate?",
          buttons:[
                {
                  value: "PayPal",
                  target: "paypal",
                },
                {
                  value: "Venmo",
                  target: "paypal",
                }
          ]
        },
        "paypal":{
          user:"bot",
          type:"quickReply",
          text:"Perfect. Now all we need is your email address.",
          buttons:[
                {
                  value:"joseph.smith85@gmail.com",
                  target:"email-confirmed",
                }
          ]
        },
        "email-confirmed": {
          user:"bot",
          type:"botTextMessage",
          text:"Perfect. We've just sent the money to your account.",
        },


  		"reset-prototype":{}

  }

  // ------------------------------------------------------------------------------------------------
  console.log("Conversation loaded...")
