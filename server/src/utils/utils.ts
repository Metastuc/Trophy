import axios from "axios";
import { THE_GRAPH_TOKEN, THE_GRAPH_URL } from "./env";

export const formatNumber = (num: string) => {
  const amount = Number(num);
  if (amount >= 1_000_000_000_000) return (amount / 1_000_000_000_000).toFixed(1).replace(/\.0$/, "") + "T";
  if (amount >= 1_000_000_000) return (amount / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  if (amount >= 1_000_000) return (amount / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (amount >= 1_000) return (amount / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return amount.toString();
}

export const getHolders = async (token: string) => {
  const { data: { data: holders }} = await axios.get(
    `${THE_GRAPH_URL}/holders/evm/${token}?network_id=base&orderby=value&orderDirection=desc&limit=4`,
    {
      headers: { Authorization: `Bearer ${THE_GRAPH_TOKEN}` }
    }
  );

  return holders;
}