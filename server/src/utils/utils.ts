import axios from "axios";
import { THE_GRAPH_TOKEN, THE_GRAPH_URL, DEFAULT_IMAGE } from "./env";

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

export const LdummyData = {
  leaderboard: [
    {
      price: "0.01",
      pfp: DEFAULT_IMAGE,
      username: "senpai",
      totalStreams: "9",
      epicStreams: "56.7K",
      arrow: "up",
      topHolders: [
        { holderAddress: "0xabc...wxyz", symbol: "senpai", percentage: "20%", tokenAmount: "7.9M" },
        { holderAddress: "0xdef...abcd", symbol: "senpai", percentage: "15%", tokenAmount: "5.6M" },
        { holderAddress: "0xghi...efgh", symbol: "senpai", percentage: "12%", tokenAmount: "4.3M" },
        { holderAddress: "0xjkl...ijkl", symbol: "senpai", percentage: "8%", tokenAmount: "2.9M" }
      ],
      mcap: "45M"
    },
    {
      price: "0.05",
      pfp: DEFAULT_IMAGE,
      username: "shogun",
      totalStreams: "12",
      epicStreams: "65.4K",
      arrow: "down",
      topHolders: [
        { holderAddress: "0xaaa...1111", symbol: "shogun", percentage: "18%", tokenAmount: "6.8M" },
        { holderAddress: "0xbbb...2222", symbol: "shogun", percentage: "14%", tokenAmount: "5.2M" },
        { holderAddress: "0xccc...3333", symbol: "shogun", percentage: "10%", tokenAmount: "3.9M" },
        { holderAddress: "0xddd...4444", symbol: "shogun", percentage: "7%", tokenAmount: "2.7M" }
      ],
      mcap: "60M"
    },
    {
      price: "0.12",
      pfp: DEFAULT_IMAGE,
      username: "kitsune",
      totalStreams: "15",
      epicStreams: "80.2K",
      arrow: "up",
      topHolders: [
        { holderAddress: "0xeee...5555", symbol: "kitsune", percentage: "22%", tokenAmount: "9.5M" },
        { holderAddress: "0xfff...6666", symbol: "kitsune", percentage: "16%", tokenAmount: "7.1M" },
        { holderAddress: "0xggg...7777", symbol: "kitsune", percentage: "12%", tokenAmount: "5.4M" },
        { holderAddress: "0xhhh...8888", symbol: "kitsune", percentage: "9%", tokenAmount: "4.1M" }
      ],
      mcap: "85M"
    },
    {
      price: "0.08",
      pfp: DEFAULT_IMAGE,
      username: "ronin",
      totalStreams: "11",
      epicStreams: "50.1K",
      arrow: "down",
      topHolders: [
        { holderAddress: "0xiii...9999", symbol: "ronin", percentage: "19%", tokenAmount: "8.2M" },
        { holderAddress: "0xjjj...aaaa", symbol: "ronin", percentage: "14%", tokenAmount: "6.0M" },
        { holderAddress: "0xkkk...bbbb", symbol: "ronin", percentage: "11%", tokenAmount: "4.5M" },
        { holderAddress: "0xlll...cccc", symbol: "ronin", percentage: "8%", tokenAmount: "3.3M" }
      ],
      mcap: "70M"
    },
    {
      price: "0.25",
      pfp: DEFAULT_IMAGE,
      username: "ninja",
      totalStreams: "18",
      epicStreams: "95.3K",
      arrow: "up",
      topHolders: [
        { holderAddress: "0xmmm...dddd", symbol: "ninja", percentage: "23%", tokenAmount: "12.1M" },
        { holderAddress: "0xnnn...eeee", symbol: "ninja", percentage: "17%", tokenAmount: "8.9M" },
        { holderAddress: "0xooo...ffff", symbol: "ninja", percentage: "13%", tokenAmount: "6.5M" },
        { holderAddress: "0xppp...gggg", symbol: "ninja", percentage: "9%", tokenAmount: "4.2M" }
      ],
      mcap: "120M"
    },
    {
      price: "0.03",
      pfp: DEFAULT_IMAGE,
      username: "samurai",
      totalStreams: "14",
      epicStreams: "60.8K",
      arrow: "up",
      topHolders: [
        { holderAddress: "0xqqq...hhhh", symbol: "samurai", percentage: "20%", tokenAmount: "10.0M" },
        { holderAddress: "0xrrr...iiii", symbol: "samurai", percentage: "15%", tokenAmount: "7.5M" },
        { holderAddress: "0xsss...jjjj", symbol: "samurai", percentage: "12%", tokenAmount: "5.0M" },
        { holderAddress: "0xttt...kkkk", symbol: "samurai", percentage: "8%", tokenAmount: "3.5M" }
      ],
      mcap: "90M"
    },
    {
      price: "0.09",
      pfp: DEFAULT_IMAGE,
      username: "shuriken",
      totalStreams: "13",
      epicStreams: "75.9K",
      arrow: "down",
      topHolders: [
        { holderAddress: "0xuuu...llll", symbol: "shuriken", percentage: "19%", tokenAmount: "8.4M" },
        { holderAddress: "0xvvv...mmmm", symbol: "shuriken", percentage: "14%", tokenAmount: "6.2M" },
        { holderAddress: "0xwww...nnnn", symbol: "shuriken", percentage: "10%", tokenAmount: "4.5M" },
        { holderAddress: "0xxx...oooo", symbol: "shuriken", percentage: "7%", tokenAmount: "3.1M" }
      ],
      mcap: "68M"
    },
    {
      price: "0.07",
      pfp: DEFAULT_IMAGE,
      username: "oni",
      totalStreams: "20",
      epicStreams: "110.2K",
      arrow: "up",
      topHolders: [
        { holderAddress: "0xyyy...pppp", symbol: "oni", percentage: "21%", tokenAmount: "9.9M" },
        { holderAddress: "0xzzz...qqqq", symbol: "oni", percentage: "15%", tokenAmount: "7.0M" },
        { holderAddress: "0x111...rrrr", symbol: "oni", percentage: "11%", tokenAmount: "5.1M" },
        { holderAddress: "0x222...ssss", symbol: "oni", percentage: "8%", tokenAmount: "3.6M" }
      ],
      mcap: "100M"
    },
    {
      price: "0.14",
      pfp: DEFAULT_IMAGE,
      username: "tengu",
      totalStreams: "17",
      epicStreams: "85.7K",
      arrow: "down",
      topHolders: [
        { holderAddress: "0x333...tttt", symbol: "tengu", percentage: "22%", tokenAmount: "10.2M" },
        { holderAddress: "0x444...uuuu", symbol: "tengu", percentage: "16%", tokenAmount: "7.4M" },
        { holderAddress: "0x555...vvvv", symbol: "tengu", percentage: "12%", tokenAmount: "5.6M" },
        { holderAddress: "0x666...wwww", symbol: "tengu", percentage: "9%", tokenAmount: "4.3M" }
      ],
      mcap: "95M"
    },
    {
      price: "0.04",
      pfp: DEFAULT_IMAGE,
      username: "hannya",
      totalStreams: "10",
      epicStreams: "48.6K",
      arrow: "up",
      topHolders: [
        { holderAddress: "0x777...xxxx", symbol: "hannya", percentage: "18%", tokenAmount: "7.8M" },
        { holderAddress: "0x888...yyyy", symbol: "hannya", percentage: "14%", tokenAmount: "6.0M" },
        { holderAddress: "0x999...zzzz", symbol: "hannya", percentage: "10%", tokenAmount: "4.2M" },
        { holderAddress: "0xaaa...bbbb", symbol: "hannya", percentage: "7%", tokenAmount: "3.0M" }
      ],
      mcap: "64M"
    },
    {
      price: "0.01",
      pfp: DEFAULT_IMAGE,
      username: "senpai",
      totalStreams: "9",
      epicStreams: "56.7K",
      arrow: "up",
      topHolders: [
        { holderAddress: "0xabc...wxyz", symbol: "senpai", percentage: "20%", tokenAmount: "7.9M" },
        { holderAddress: "0xdef...abcd", symbol: "senpai", percentage: "15%", tokenAmount: "5.6M" },
        { holderAddress: "0xghi...efgh", symbol: "senpai", percentage: "12%", tokenAmount: "4.3M" },
        { holderAddress: "0xjkl...ijkl", symbol: "senpai", percentage: "8%", tokenAmount: "2.9M" }
      ],
      mcap: "45M"
    },
    {
      price: "0.05",
      pfp: DEFAULT_IMAGE,
      username: "shogun",
      totalStreams: "12",
      epicStreams: "65.4K",
      arrow: "down",
      topHolders: [
        { holderAddress: "0xaaa...1111", symbol: "shogun", percentage: "18%", tokenAmount: "6.8M" },
        { holderAddress: "0xbbb...2222", symbol: "shogun", percentage: "14%", tokenAmount: "5.2M" },
        { holderAddress: "0xccc...3333", symbol: "shogun", percentage: "10%", tokenAmount: "3.9M" },
        { holderAddress: "0xddd...4444", symbol: "shogun", percentage: "7%", tokenAmount: "2.7M" }
      ],
      mcap: "60M"
    },
    {
      price: "0.12",
      pfp: DEFAULT_IMAGE,
      username: "kitsune",
      totalStreams: "15",
      epicStreams: "80.2K",
      arrow: "up",
      topHolders: [
        { holderAddress: "0xeee...5555", symbol: "kitsune", percentage: "22%", tokenAmount: "9.5M" },
        { holderAddress: "0xfff...6666", symbol: "kitsune", percentage: "16%", tokenAmount: "7.1M" },
        { holderAddress: "0xggg...7777", symbol: "kitsune", percentage: "12%", tokenAmount: "5.4M" },
        { holderAddress: "0xhhh...8888", symbol: "kitsune", percentage: "9%", tokenAmount: "4.1M" }
      ],
      mcap: "85M"
    },
    {
      price: "0.08",
      pfp: DEFAULT_IMAGE,
      username: "ronin",
      totalStreams: "11",
      epicStreams: "50.1K",
      arrow: "down",
      topHolders: [
        { holderAddress: "0xiii...9999", symbol: "ronin", percentage: "19%", tokenAmount: "8.2M" },
        { holderAddress: "0xjjj...aaaa", symbol: "ronin", percentage: "14%", tokenAmount: "6.0M" },
        { holderAddress: "0xkkk...bbbb", symbol: "ronin", percentage: "11%", tokenAmount: "4.5M" },
        { holderAddress: "0xlll...cccc", symbol: "ronin", percentage: "8%", tokenAmount: "3.3M" }
      ],
      mcap: "70M"
    },
    {
      price: "0.25",
      pfp: DEFAULT_IMAGE,
      username: "ninja",
      totalStreams: "18",
      epicStreams: "95.3K",
      arrow: "up",
      topHolders: [
        { holderAddress: "0xmmm...dddd", symbol: "ninja", percentage: "23%", tokenAmount: "12.1M" },
        { holderAddress: "0xnnn...eeee", symbol: "ninja", percentage: "17%", tokenAmount: "8.9M" },
        { holderAddress: "0xooo...ffff", symbol: "ninja", percentage: "13%", tokenAmount: "6.5M" },
        { holderAddress: "0xppp...gggg", symbol: "ninja", percentage: "9%", tokenAmount: "4.2M" }
      ],
      mcap: "120M"
    },
    {
      price: "0.03",
      pfp: DEFAULT_IMAGE,
      username: "samurai",
      totalStreams: "14",
      epicStreams: "60.8K",
      arrow: "up",
      topHolders: [
        { holderAddress: "0xqqq...hhhh", symbol: "samurai", percentage: "20%", tokenAmount: "10.0M" },
        { holderAddress: "0xrrr...iiii", symbol: "samurai", percentage: "15%", tokenAmount: "7.5M" },
        { holderAddress: "0xsss...jjjj", symbol: "samurai", percentage: "12%", tokenAmount: "5.0M" },
        { holderAddress: "0xttt...kkkk", symbol: "samurai", percentage: "8%", tokenAmount: "3.5M" }
      ],
      mcap: "90M"
    },
    {
      price: "0.09",
      pfp: DEFAULT_IMAGE,
      username: "shuriken",
      totalStreams: "13",
      epicStreams: "75.9K",
      arrow: "down",
      topHolders: [
        { holderAddress: "0xuuu...llll", symbol: "shuriken", percentage: "19%", tokenAmount: "8.4M" },
        { holderAddress: "0xvvv...mmmm", symbol: "shuriken", percentage: "14%", tokenAmount: "6.2M" },
        { holderAddress: "0xwww...nnnn", symbol: "shuriken", percentage: "10%", tokenAmount: "4.5M" },
        { holderAddress: "0xxx...oooo", symbol: "shuriken", percentage: "7%", tokenAmount: "3.1M" }
      ],
      mcap: "68M"
    },
    {
      price: "0.07",
      pfp: DEFAULT_IMAGE,
      username: "oni",
      totalStreams: "20",
      epicStreams: "110.2K",
      arrow: "up",
      topHolders: [
        { holderAddress: "0xyyy...pppp", symbol: "oni", percentage: "21%", tokenAmount: "9.9M" },
        { holderAddress: "0xzzz...qqqq", symbol: "oni", percentage: "15%", tokenAmount: "7.0M" },
        { holderAddress: "0x111...rrrr", symbol: "oni", percentage: "11%", tokenAmount: "5.1M" },
        { holderAddress: "0x222...ssss", symbol: "oni", percentage: "8%", tokenAmount: "3.6M" }
      ],
      mcap: "100M"
    },
    {
      price: "0.14",
      pfp: DEFAULT_IMAGE,
      username: "tengu",
      totalStreams: "17",
      epicStreams: "85.7K",
      arrow: "down",
      topHolders: [
        { holderAddress: "0x333...tttt", symbol: "tengu", percentage: "22%", tokenAmount: "10.2M" },
        { holderAddress: "0x444...uuuu", symbol: "tengu", percentage: "16%", tokenAmount: "7.4M" },
        { holderAddress: "0x555...vvvv", symbol: "tengu", percentage: "12%", tokenAmount: "5.6M" },
        { holderAddress: "0x666...wwww", symbol: "tengu", percentage: "9%", tokenAmount: "4.3M" }
      ],
      mcap: "95M"
    },
    {
      price: "0.04",
      pfp: DEFAULT_IMAGE,
      username: "hannya",
      totalStreams: "10",
      epicStreams: "48.6K",
      arrow: "up",
      topHolders: [
        { holderAddress: "0x777...xxxx", symbol: "hannya", percentage: "18%", tokenAmount: "7.8M" },
        { holderAddress: "0x888...yyyy", symbol: "hannya", percentage: "14%", tokenAmount: "6.0M" },
        { holderAddress: "0x999...zzzz", symbol: "hannya", percentage: "10%", tokenAmount: "4.2M" },
        { holderAddress: "0xaaa...bbbb", symbol: "hannya", percentage: "7%", tokenAmount: "3.0M" }
      ],
      mcap: "64M"
    }
  ]
};

export const FdummyData = {
  live: [
    {
      status: "Live",
      streamer: "beardless",
      thumbnails: DEFAULT_IMAGE,
      creatorToken: "0xabc123...001",
      pfp: DEFAULT_IMAGE,
      roomId: "room-001",
      title: "Exploring the Metaverse",
      viewers: 125,
    },
    {
      status: "Live",
      streamer: "cryptobabe",
      thumbnails: DEFAULT_IMAGE,
      creatorToken: "0xabc123...002",
      pfp: DEFAULT_IMAGE,
      roomId: "room-002",
      title: "NFT Art Auction",
      viewers: 890,
    },
    {
      status: "Live",
      streamer: "gamefi_guru",
      thumbnails: DEFAULT_IMAGE,
      creatorToken: "0xabc123...003",
      pfp: DEFAULT_IMAGE,
      roomId: "room-003",
      title: "Play-to-Earn Tips",
      viewers: 432,
    },
    {
      status: "Live",
      streamer: "defi_dan",
      thumbnails: DEFAULT_IMAGE,
      creatorToken: "0xabc123...004",
      pfp: DEFAULT_IMAGE,
      roomId: "room-004",
      title: "DeFi Yield Farming",
      viewers: 210,
    },
    {
      status: "Live",
      streamer: "meta_mary",
      thumbnails: DEFAULT_IMAGE,
      creatorToken: "0xabc123...005",
      pfp: DEFAULT_IMAGE,
      roomId: "room-005",
      title: "Virtual Fashion Show",
      viewers: 654,
    },
    {
      status: "Live",
      streamer: "token_tom",
      thumbnails: DEFAULT_IMAGE,
      creatorToken: "0xabc123...006",
      pfp: DEFAULT_IMAGE,
      roomId: "room-006",
      title: "Crypto Market Updates",
      viewers: 134,
    },
    {
      status: "Live",
      streamer: "dao_daisy",
      thumbnails: DEFAULT_IMAGE,
      creatorToken: "0xabc123...007",
      pfp: DEFAULT_IMAGE,
      roomId: "room-007",
      title: "DAO Governance Talk",
      viewers: 98,
    },
    {
      status: "Live",
      streamer: "pixel_pete",
      thumbnails: DEFAULT_IMAGE,
      creatorToken: "0xabc123...008",
      pfp: DEFAULT_IMAGE,
      roomId: "room-008",
      title: "Pixel Art Speedrun",
      viewers: 756,
    },
    {
      status: "Live",
      streamer: "web3_wanda",
      thumbnails: DEFAULT_IMAGE,
      creatorToken: "0xabc123...009",
      pfp: DEFAULT_IMAGE,
      roomId: "room-009",
      title: "Intro to Web3",
      viewers: 215,
    },
    {
      status: "Live",
      streamer: "minter_mike",
      thumbnails: DEFAULT_IMAGE,
      creatorToken: "0xabc123...010",
      pfp: DEFAULT_IMAGE,
      roomId: "room-010",
      title: "Minting Live!",
      viewers: 411,
    },
    {
      status: "Live",
      streamer: "vr_val",
      thumbnails: DEFAULT_IMAGE,
      creatorToken: "0xabc123...011",
      pfp: DEFAULT_IMAGE,
      roomId: "room-011",
      title: "VR Game Night",
      viewers: 600,
    },
    {
      status: "Live",
      streamer: "streamer_sam",
      thumbnails: DEFAULT_IMAGE,
      creatorToken: "0xabc123...012",
      pfp: DEFAULT_IMAGE,
      roomId: "room-012",
      title: "Chill Crypto Chat",
      viewers: 350,
    },
    {
      status: "Live",
      streamer: "alpha_amy",
      thumbnails: DEFAULT_IMAGE,
      creatorToken: "0xabc123...013",
      pfp: DEFAULT_IMAGE,
      roomId: "room-013",
      title: "Alpha Calls",
      viewers: 480,
    },
    {
      status: "Live",
      streamer: "blockchain_bob",
      thumbnails: DEFAULT_IMAGE,
      creatorToken: "0xabc123...014",
      pfp: DEFAULT_IMAGE,
      roomId: "room-014",
      title: "Blockchain Basics",
      viewers: 205,
    },
    {
      status: "Live",
      streamer: "nft_nancy",
      thumbnails: DEFAULT_IMAGE,
      creatorToken: "0xabc123...015",
      pfp: DEFAULT_IMAGE,
      roomId: "room-015",
      title: "NFT Collection Launch",
      viewers: 950,
    },
    {
      status: "Live",
      streamer: "gameplay_gary",
      thumbnails: DEFAULT_IMAGE,
      creatorToken: "0xabc123...016",
      pfp: DEFAULT_IMAGE,
      roomId: "room-016",
      title: "Web3 Gaming Marathon",
      viewers: 774,
    },
    {
      status: "Live",
      streamer: "crypto_claire",
      thumbnails: DEFAULT_IMAGE,
      creatorToken: "0xabc123...017",
      pfp: DEFAULT_IMAGE,
      roomId: "room-017",
      title: "Crypto 101",
      viewers: 123,
    },
    {
      status: "Live",
      streamer: "metaverse_moe",
      thumbnails: DEFAULT_IMAGE,
      creatorToken: "0xabc123...018",
      pfp: DEFAULT_IMAGE,
      roomId: "room-018",
      title: "Metaverse Building",
      viewers: 342,
    },
    {
      status: "Live",
      streamer: "artist_ava",
      thumbnails: DEFAULT_IMAGE,
      creatorToken: "0xabc123...019",
      pfp: DEFAULT_IMAGE,
      roomId: "room-019",
      title: "NFT Art Creation",
      viewers: 515,
    },
    {
      status: "Live",
      streamer: "whale_will",
      thumbnails: DEFAULT_IMAGE,
      creatorToken: "0xabc123...020",
      pfp: DEFAULT_IMAGE,
      roomId: "room-020",
      title: "Whale Market Moves",
      viewers: 1100,
    },
  ]
};
