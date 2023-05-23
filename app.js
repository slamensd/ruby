const provider = new ethers.providers.Web3Provider(window.ethereum);
const contractAddress = "0x232765be70a5f0b49e2d72eee9765813894c1fc4";
const contractABI = [];  // Replace with the ERC-1155 contract ABI
let userAddress;

document.getElementById("connectBtn").addEventListener("click", async () => {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    userAddress = accounts[0];
    document.getElementById("walletAddress").innerText = "Wallet Address: " + userAddress;
});

document.getElementById("verifyBtn").addEventListener("click", async () => {
    const contract = new ethers.Contract(contractAddress, contractABI, provider);
    const tokenId = 6;

    const balance = await contract.balanceOf(userAddress, tokenId);

    if (balance.toNumber() > 0) {
        document.getElementById("verificationMessage").innerText = "Token Verified!";
        document.getElementById("hiddenMessage").innerText = "We start at zero...";
    } else {
        document.getElementById("verificationMessage").innerText = "Error: Token not found in this wallet!";
    }
});
