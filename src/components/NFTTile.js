import { BrowserRouter as Router, Link } from "react-router-dom";
import { GetIpfsUrlFromPinata } from "../utils";
import "./NFTTitle.css";

function NFTTile(data) {
  const newTo = {
    pathname: "/nftPage/" + data.data.tokenId,
  };

  const IPFSUrl = GetIpfsUrlFromPinata(data.data.image);

  return (
    //   <div className="border-2 ml-12 mt-5 mb-12 flex flex-col items-center rounded-lg w-48 md:w-72 shadow-2xl">
    //     <img
    //       src={IPFSUrl}
    //       alt=""
    //       className="w-72 h-80 rounded-lg object-cover"
    //       crossOrigin="anonymous"
    //     />
    //     <div className="text-white w-full p-2 bg-gradient-to-t from-[#454545] to-transparent rounded-lg pt-5 -mt-20">
    //       <strong className="text-xl">{data.data.name}</strong>
    //       <p className="display-inline">{data.data.description}</p>
    //     </div>
    //   </div>
    <div className="grid-item">
      <div className="item-style">
        <div className="thumb">
          <Link to={newTo}>
            <img src={IPFSUrl} alt="" />
          </Link>
          <button className="reaction-btn">
            <i className="ri-heart-fill"></i>

            <span>NFT</span>
          </button>
        </div>

        <div className="content">
          <h3 className="title">
            <a href="#">
              <strong>{data.data.name}</strong>
            </a>
          </h3>

          <div className="profile d-flex-center">
            <i className="ri-shield-check-fill"></i>
          </div>

          <div className="product-owner d-flex-center">
            <span className="bid-owner">{data.data.description}</span>
            <span className="biding-price d-flex-between">
              <i className="ri-arrow-up-line"></i>
            </span>
          </div>

          <div className="product-buy d-flex-between">
            <a href="#" className="btn">
              <span>
                <i className="ri-time-line"></i>{" "}
                <strong className="text-slate-100">
                  {data.data.price} ETH
                </strong>
              </span>
            </a>
            <a href="#" className="btn btn-cart btn-outline">
              <Link to={newTo}>
                <a>Buy</a>
              </Link>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NFTTile;
