## Okta + Evident Integration: Developer Getting Started Guide
1. Create Okta API token for API access
	- Inside the Okta admin portal, Choose “API” -> “Tokens”
	- Hit “Create Token”
	- The token must have at minimum “Group Administrator” role (for the group consuming the integration). The integration requires “user profile read and write privilege” for basic operation.
	- Name the token “Evident API Token”
	- Copy the API token to send to your Evident contact via a secure channel (next step)
1. Follow this link to create tenant [still need to to create and add link]
	- In the form, please include all fields as well as the API token created in (1) and the URL for your Okta tenant
	- URL may look something like “https://dev-xyz.oktapreview.com” for a sandbox tenant or “https://evident.okta.com” for production
1. Add 2 new Evident attributes to the Okta User profile
	1. Inside the Okta admin portal, choose “Users” -> “Profile Editor”
	1. Find the App/Profile you want the integration to work with, and hit “Edit Profile”
	1. Under “Attributes”, hit “Add Attribute”
	1. Enter the following fields:
		1. Data Type: string
		1. Display Name: evidentid_verification
		1. Variable Name: evidentid_verification
		1. Description: EvidentID Verification Status
		1. Enum: (select checkbox)
		1. Attribute members: (format Display Name: Value)
			- Requested: requested
			- Not Requested: not_requested
			- Request Timeout: timeout 
			- Submission Complete: submissionComplete
			- Verified: true 
			- Not Verified: false 
	1. User permission: Read Only
	1. Hit “Save Attribute”
	1. Hit “Add Attribute” again to create the 2nd Evident Attribute
	1. Enter the following fields:
		1. Data Type: string
		1. Display Name: Verification Details
		1. Variable Name: evidentid_verification_details
		1. Description: EvidentID Verification Details
		1. Enum: No
		1. User permission: Read Only
	1. Hit “Save Attribute”
1. Wait for an email response from Evident. In this email, you will be provided with an Evident login, API URL and steps to retrieve your Evident API key. 
1. Pull GitHub repo found below and follow the steps in the README to test out the app! 
  - https://github.com/evidentid/okta-evident-demo-portal

