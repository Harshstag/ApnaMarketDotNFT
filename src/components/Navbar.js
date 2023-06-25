import logo from "../logo_3.png";
import fullLogo from "../full_logo.png";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";

import React from "react";
import "./navbar.css";

function Navbar() {
  const [Mobile, setMobile] = useState(false);

  const [connected, toggleConnect] = useState(false);
  const location = useLocation();
  const [currAddress, updateAddress] = useState("0x");

  async function getAddress() {
    const ethers = require("ethers");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    updateAddress(addr);
  }

  function updateButton() {
    const ethereumButton = document.querySelector(".enableEthereumButton");
    if (currAddress === "0x") {
      ethereumButton.textContent = "Not Connected...";
    } else {
      ethereumButton.textContent =
        "Connected to " + currAddress.substring(0, 15) + "...";
    }
  }

  async function connectWebsite() {
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    if (chainId !== "0x13881") {
      //alert('Incorrect network! Switch your metamask network to Rinkeby');
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x13881" }],
      });
    }
    await window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then(() => {
        updateButton();
        console.log("here");

        getAddress();
        window.location.replace(location.pathname);
      });
  }

  useEffect(() => {
    if (window.ethereum === undefined) return;
    let val = 1;
    if (val) {
      console.log("here");
      getAddress();
      toggleConnect(val);
      updateButton();
    }

    window.ethereum.on("accountsChanged", function (accounts) {
      window.location.replace(location.pathname);
    });
  });

  return (
    <>
      <nav className="navbar">
        <h2 className="mb-1 text-xl font-extrabold text-gray-900 dark:text-white ">
          <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            ApnaMarket.NFT
          </span>
        </h2>
        {/*
        if large screen ma xa bhane Mobile add huxa
        if mobile screen ma xa bhane nav-links-mobile add huxa
        */}
        <ul
          className={Mobile ? "nav-links-mobile" : "nav-links"}
          onClick={() => setMobile(false)}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "bg-purple-700 rounded-3xl text-white "
                : "text-slate-300 rounded-3xl "
            }
          >
            <li>Marketplace</li>
          </NavLink>
          <NavLink
            to="/SellNFT"
            className={({ isActive }) =>
              isActive
                ? "bg-purple-700 rounded-3xl text-white "
                : "text-slate-300 rounded-3xl "
            }
          >
            <li>Sell My NFT</li>
          </NavLink>
          <NavLink
            to="/Profile"
            className={({ isActive }) =>
              isActive
                ? "bg-purple-700 rounded-3xl text-white "
                : "text-slate-300 rounded-3xl "
            }
          >
            <li>Profile</li>
          </NavLink>

          <button className="enableEthereumButton" onClick={connectWebsite}>
            Connect Wallet
          </button>
        </ul>

        {/* 
        whenever we click on button = setMobile(!Mobile) ==  is mobile oppsite to setMobile 
        */}
      </nav>
      {/* <div className="text-white text-bold text-right mr-10 text-sm">
        {currAddress !== "0x" ? "Connected to" : "Not Connected..."}{" "}
        {currAddress !== "0x" ? currAddress.substring(0, 15) + "..." : ""}
      </div> */}
    </>
  );
}

export default Navbar;
