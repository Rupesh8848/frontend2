import { Web3Storage } from "web3.storage";

export function createClient() {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDY2NGIxYmM5M2I3QzEwMTkyZmM1Mjg5N2M1MWQ1QUY4N0EzRDVGNEEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzU0MzM5OTYzNDEsIm5hbWUiOiJ0ZXN0In0.9dzODdrxRqXyG_kt-4Uc5g_7Pu-ZOyfjq6YcqnehAh0";

  const client = new Web3Storage({ token });
  return client;
}
