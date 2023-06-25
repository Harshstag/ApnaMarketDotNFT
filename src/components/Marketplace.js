import Navbar from "./Navbar";
import NFTTile from "./NFTTile";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState } from "react";
import { GetIpfsUrlFromPinata } from "../utils";
import "./navbar.css";

export default function Marketplace() {
  const sampleData = [
    {
      name: "NFT#1",
      description: "Alchemy's First NFT ",
      website: "http://axieinfinity.io",
      image:
        "https://gateway.pinata.cloud/ipfs/QmR9MT1NL91GyzGoZe9oaxNSxBY3wPPXme2kgLWwkHWEUZ?_gl=1*11q06r1*rs_ga*MzA5YTc3MTgtZjUxZi00NzlhLTgzOWMtYzEwZTRlZWU3ZmZl*rs_ga_5RMPXG14TE*MTY4MzMxOTgxNy40LjEuMTY4MzMyMDU0MC42MC4wLjA.",
      price: "0.003ETH",
      currentlySelling: "True",
      address: "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
      name: "NFT#2",
      description: "Alchemy's Second NFT",
      website: "http://axieinfinity.io",
      image:
        "https://gateway.pinata.cloud/ipfs/Qmahx4CtVqf9AvEJPwVR6oeE395QKk881Xkemt49SJMBbN?_gl=1*11q06r1*rs_ga*MzA5YTc3MTgtZjUxZi00NzlhLTgzOWMtYzEwZTRlZWU3ZmZl*rs_ga_5RMPXG14TE*MTY4MzMxOTgxNy40LjEuMTY4MzMyMDU0MC42MC4wLjA.",

      price: "0.03ETH",
      currentlySelling: "True",
      address: "0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
      name: "NFT#3",
      description: "Alchemy's Third NFT",
      website: "http://axieinfinity.io",
      image:
        "https://gateway.pinata.cloud/ipfs/QmR9MT1NL91GyzGoZe9oaxNSxBY3wPPXme2kgLWwkHWEUZ?_gl=1*11q06r1*rs_ga*MzA5YTc3MTgtZjUxZi00NzlhLTgzOWMtYzEwZTRlZWU3ZmZl*rs_ga_5RMPXG14TE*MTY4MzMxOTgxNy40LjEuMTY4MzMyMDU0MC42MC4wLjA.",
      price: "0.03ETH",
      currentlySelling: "True",
      address: "0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
    },
   ];
  const [data, updateData] = useState(sampleData);
  const [dataFetched, updateFetched] = useState(false);

  async function getAllNFTs() {
    const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(
      MarketplaceJSON.address,
      MarketplaceJSON.abi,
      signer
    );
    //create an NFT Token
    let transaction = await contract.getAllNFTs();

    //Fetch all the details of every NFT from the contract and display
    const items = await Promise.all(
      transaction.map(async (i) => {
        var tokenURI = await contract.tokenURI(i.tokenId);
        console.log("getting this tokenUri", tokenURI);
        tokenURI = GetIpfsUrlFromPinata(tokenURI);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.image,
          name: meta.name,
          description: meta.description,
        };
        return item;
      })
    );

    updateFetched(true);
    updateData(items);
  }

  if (!dataFetched) getAllNFTs();

  return (
    <div>
      <Navbar></Navbar>
      <div className="flex flex-col place-items-center mt-10 ">
        <div className="md:text-xl font-bold text-white">Top NFTs</div>
        <div className="items-list">
          {data.map((value, index) => {
            return <NFTTile data={value} key={index}></NFTTile>;
          })}
        </div>
      </div>
    </div>
  );
}
