// provider remains the same
const provider = new ethers.providers.Web3Provider(window.ethereum);

// Diamond contract address
const contractAddress = "0x232765be70a5f0b49e2d72eee9765813894c1fc4";

// Replace with the correct Diamond Contract ABI
const contractABI = [{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"components":[{"internalType":"address","name":"diamondCutFacet","type":"address"},{"internalType":"address","name":"diamondLoupeFacet","type":"address"},{"internalType":"address","name":"erc165Facet","type":"address"},{"internalType":"address","name":"erc173Facet","type":"address"}],"internalType":"struct Diamond.CoreFacets","name":"_coreFacets","type":"tuple"},{"components":[{"internalType":"address","name":"facetAddress","type":"address"},{"internalType":"enum IDiamondCut.FacetCutAction","name":"action","type":"uint8"},{"internalType":"bytes4[]","name":"functionSelectors","type":"bytes4[]"}],"internalType":"struct IDiamondCut.FacetCut[]","name":"_facets","type":"tuple[]"},{"components":[{"internalType":"address","name":"initContract","type":"address"},{"internalType":"bytes","name":"initData","type":"bytes"}],"internalType":"struct Diamond.Initialization[]","name":"_initializations","type":"tuple[]"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"facet","type":"address"},{"internalType":"bytes4","name":"selector","type":"bytes4"}],"name":"ErrDiamondFacetAlreadyExists","type":"error"},{"stateMutability":"payable","type":"fallback"},{"inputs":[{"internalType":"bytes[]","name":"data","type":"bytes[]"}],"name":"multicall","outputs":[{"internalType":"bytes[]","name":"results","type":"bytes[]"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];  
let userAddress;

document.getElementById("connectBtn").addEventListener("click", async () => {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    userAddress = accounts[0];
    document.getElementById("walletAddress").innerText = "Wallet Address: " + userAddress;
});

document.getElementById("verifyBtn").addEventListener("click", async () => {
    const contract = new ethers.Contract(contractAddress, contractABI, provider);
    const tokenId = 6;

    // Call balanceOf function using Diamond Standard contract
    const balance = await contract.balanceOf(userAddress, tokenId);

    if (balance.toNumber() > 0) {
        document.getElementById("verificationMessage").innerText = "Token Verified!";
        document.getElementById("hiddenMessage").innerText = "We start at zero...";
    } else {
        document.getElementById("verificationMessage").innerText = "Error: Token not found in this wallet!";
    }
});
