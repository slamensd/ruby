// Establish connection to the provider.
let provider;
let userAddress;
let signer;

document.getElementById("connectBtn").addEventListener("click", async () => {
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        try {
            // Request account access
            await window.ethereum.enable();

            // Account access granted, get signer
            signer = provider.getSigner();

            // Get the user's address
            userAddress = await signer.getAddress();
            document.getElementById("walletAddress").innerText = `Wallet Address: ${userAddress}`;
        } catch (error) {
            console.error("User denied account access:", error);
            document.getElementById("walletAddress").innerText = "Error: User denied account access!";
        }
    } else {
        console.error("No Ethereum provider was found. Please install MetaMask.");
        document.getElementById("walletAddress").innerText = "Error: No Ethereum provider was found!";
    }
});

document.getElementById("verifyBtn").addEventListener("click", async () => {
    const facetAddress = "0xcd3decb28dbfa49579237928c1a7df2687d88881";
    const tokenId = 6;

    try {
        // Set up a call to the balanceOf function
        const data = ethers.utils.defaultAbiCoder.encode(
            ["address", "uint256"],
            [userAddress, tokenId]
        );

        const transaction = {
            to: facetAddress,
            data: "0x00fdd58e" + data.slice(2), // prepend function selector
        };

        console.log("Calling contract with transaction:", transaction);

        // Call balanceOf function using Diamond Standard contract
        const result = await provider.call(transaction);
        console.log("Received result from contract:", result);

        const balance = ethers.BigNumber.from(result);

        if (balance.gt(0)) {
            document.getElementById("verificationMessage").innerText = "Token Verified!";
            document.getElementById("hiddenMessage").innerText = "We start at zero, book one unfurled, Page one's second letter \"U\", into our world. To page three we turn, the fifth letter to peek, On this journey of ours, the clues we seek. Fast forward to eight, a letter to meet, Put them together, the word is complete. A three-letter puzzle, for your mind's keep, Seek, find, and unravel, in this mystery deep.";
        } else {
            document.getElementById("verificationMessage").innerText = "Error: Token not found in this wallet!";
        }
    } catch (error) {
        console.error("Error during token verification:", error);
    }
});
