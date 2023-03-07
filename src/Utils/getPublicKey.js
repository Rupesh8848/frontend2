import { bufferToHex } from "ethereumjs-util";
import { encrypt } from "@metamask/eth-sig-util";
import PrivateABI from "./PrivateABI.json";
import { Address } from "../Utils/ContractAddress";
import { ethers } from "ethers";

export async function getPublicKeyFromMetaMask() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];

      const publicKey = await window.ethereum.request({
        method: "eth_getEncryptionPublicKey",
        params: [account],
      });
      console.log(publicKey);
      return publicKey;
    } catch (error) {
      console.log({ error });
    }
  }
}

export async function encryptKeyIV(key, iv, encryptionPublicKey) {
  console.log(encryptionPublicKey);
  const encKey = bufferToHex(
    Buffer.from(
      JSON.stringify(
        encrypt({
          publicKey: encryptionPublicKey.toString(),
          data: key,
          version: "x25519-xsalsa20-poly1305",
        })
      ),
      "utf8"
    )
  );
  const encIV = bufferToHex(
    Buffer.from(
      JSON.stringify(
        encrypt({
          publicKey: encryptionPublicKey.toString(),
          data: iv.toString(),
          version: "x25519-xsalsa20-poly1305",
        })
      ),
      "utf8"
    )
  );
  console.log(encKey, encIV);
  return { encKey, encIV };
}

export async function decryptKeyIV(encKey, encIV) {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  const key = await window.ethereum.request({
    method: "eth_decrypt",
    params: [encKey, accounts[0]],
  });
  const iv = await window.ethereum.request({
    method: "eth_decrypt",
    params: [encIV, accounts[0]],
  });
  return { key, iv };
}

export async function getPublicKeyFromUserAccount(userAccount) {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    Address.privateupload[0],
    PrivateABI.abi,
    signer
  );
  console.log(`User Account: ${userAccount}`);
  let publicKey = await contract.getpublickey(userAccount);
  console.log(`Public key: ${publicKey}`);
  if (publicKey.length === 0) {
    publicKey = await getPublicKeyFromMetaMask();
    await contract.addpublickey(publicKey);
  }

  return publicKey;
}
