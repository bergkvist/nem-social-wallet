# SoW (SocialWallet) for NEM
A Social NEM-wallet. Submission for the NEM Hackathon. Sign in with facebook, and send XEM to your facebook friends.

## Requirements for running the web-server:
- NodeJs 9 (https://nodejs.org/en/)
- PostgreSQL 10 (https://www.postgresql.org/)

## Setting up the server on your local machine:
### Clone the repository
- Navigate to the folder where you wish to place the project folder in your terminal.
- **Alternative 1** - Clone using GitHub username and password:  
`$ git clone https://github.com/bergkvist/nem-social-wallet.git`
- **Alternative 2** - Clone using an SSH-key linked to your GitHub account:  
`$ git clone git@github.com:bergkvist/nem-social-wallet.git`

### Installing all required packages
1. Open the project folder in your terminal.
2. Install required node packages:  
`$ npm install`

### Configuring database connection
1. Navigate to the folder server/config in your terminal.
2. Create your own database connection file  
`$ cp dbconfig.default.js dbconfig.js`
3. Edit the newly created file with your PostgreSQL authentication information.  
4. **NOTE:** this new file (`dbconfig.js`) is ignored by git, so you won't have to worry about pushing your database information.
