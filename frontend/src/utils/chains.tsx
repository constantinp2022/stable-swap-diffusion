import { Chain } from 'wagmi'

// Load environment variables from .env file
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname+'/.env' });

// Import from .env
const SHIBUYA_RPC_URL = process.env.SHIBUYA_URL || 'https://evm.shibuya.astar.network';
const BSC_RPC_URL = process.env.BNB_RPC_URL || 'https://bsc-testnet.drpc.org';
const SEPOLIA_RPC_URL = process.env.SEPOLIA_URL || 'https://mainnet.infura.io/v3/'; // You need an Infura token

interface ExtendedChain extends Chain {
    iconUrl: string;
    iconBackground: string;
}

export const bscTestnet: ExtendedChain = {
    id: 97,
    name: 'BSC Testnet',
    network: 'bsc-testnet',
    iconUrl: 'https://testnet.bscscan.com/assets/bsc/images/svg/logos/logo-light.svg?v=25.1.3.1',
    iconBackground: '#f0b90b',
    nativeCurrency: {
        decimals: 18,
        name: 'Binance Coin',
        symbol: 'BNB',
    },
    rpcUrls: {
        default: {
            http: [BSC_RPC_URL],
        },
    },
    blockExplorers: {
        default: { name: 'BscScan', url: 'https://testnet.bscscan.com' },
    },
    testnet: true,
};

export const sepolia: ExtendedChain = {
    id: 11155111,
    name: 'Sepolia',
    network: 'sepolia',
    iconUrl: 'https://etherscan.io/images/brandassets/etherscan-logo-circle.svg',
    iconBackground: '#627eea',
    nativeCurrency: {
        name: 'SepoliaETH',
        symbol: 'SepoliaETH',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: [SEPOLIA_RPC_URL],
        },
    },
    blockExplorers: {
        default: { name: 'Etherscan', url: 'https://sepolia.etherscan.io' },
    },
    testnet: true,
};

export const shibuya: ExtendedChain = {
    id: 81,
    name: 'Shibuya',
    network: 'shibuya',
    iconUrl: 'https://shibuya.subscan.io/_next/image?url=%2Fchains%2Fshibuya%2Flogo-mini.png&w=96&q=75',
    iconBackground: '#ff4d4d',
    nativeCurrency: {
        name: 'SBY',
        symbol: 'SBY',
        decimals: 18,
    },
    rpcUrls: {
        default: {
            http: [SHIBUYA_RPC_URL],
        },
    },
    blockExplorers: {
        default: { name: 'Subscan', url: 'https://shibuya.blockscout.com/' },
    },
    testnet: true,
};


