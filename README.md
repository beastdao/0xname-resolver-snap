# 0xname-resolver-snap

Metamask Snap for resolving web3 names issued via app.0xname.foo. 0xNAME is a public good platform built by BEAST DAO to provide web3 users with free personal names. 

This Metamask Snap, adds to your Metamsk wallet the ability to resolve any 0xNAME with any suffix like ```alice@eth``` or ```bob@yourdao``` etc. to their respective Ethereum addresses.

<img src= "https://github.com/user-attachments/assets/df9146f1-0fce-4cf3-9fba-28bf5769ef2a" height="350">


## Local development:

- ```yarn install```

- ```yarn start```

The Snap will be available with snapID : ```local:http://localhost:8080```

## FAQ and Knowledge Base

- #### How to install the Snap?
To use this snap, ensure you have the MetaMask browser extension installed. Visit the MetaMask Snap public directory and search for “0xname Resolver Snap” to add it to your MetaMask. Once installed, it will be added as a plugin (snap) to your wallet.
- #### What does the Snap do?
This Snap empowered by the official Snap SDK enhances your MetaMask wallet with a single functionality: to seamlessly resolve any 0xNAME web3 names with any custom suffix like ```alice@eth```, ```yulia@beast``` or ```bob@yourdao``` etc. to their respective Ethereum addresses.
- #### How to use Snap's features?
Simply type any 0xname like yulia@beast in the MetaMask send flow instead of long, complex wallet addresses. The Snap will seamlessly resolve any name to their respective Ethereum address.   
- #### Which name formats are supported?
Any web3 personal name issued with app.0xname.foo follows the same format: yourname@projectname. So, please type it the same way in your MetaMask, for example: ```alice@eth```, ```yulia@beast``` or ```bob@yourdao``` etc.
- #### Which blockchain networks are supported?
The Snap currently supports the Ethereum mainnet only.
- #### Is the Snap free to use?
Yes, the Snap is free to use.
- #### Can I resolve an addresses back to a name?
No, currently the Snap only supports forward resolution (0xnames to addresses) and does not support reverse resolution.

### Troubleshooting

- #### What should I do if name resolution fails?
If a name resolution fails:
1. Check if your MetaMask is using a supported “Ethereum Mainnet" network
2. Check that the name is correctly formatted like ```yulia@beast```
3. Ensure you have a stable internet connection
4. Try refreshing MetaMask or restart your browser

If the name resolution still fails, it could be because no such name was registered yet via app.0xname.foo.

- #### How do I reach out if I need further support regarding the Snap?
For support and detailed guidance, please join our community on Discord, you can also create an issue on GitHub.
