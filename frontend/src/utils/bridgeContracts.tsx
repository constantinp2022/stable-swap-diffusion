interface BridgeContracts {
  [networkId: number]: {
    [targetNetworkId: number]: {
      analog_id: number;
      address: string;
      enabled: boolean;
    };
  };
}

const bridgeContracts: BridgeContracts = {
  11155111: { // Sepolia
    97: { address: 'NOT_FOUND_SEPOLIA_TO_BSC', enabled: false, analog_id: 9 }, // BSC Testnet
    81: { address: '0xAe5740dC9A0e122b368704dE02cBEE60a207799A', enabled: true, analog_id: 7 }, // Shibuya
  },
  97: { // BSC Testnet
    11155111: { address: 'NOT_FOUND_BSC_TO_SEPOLIA', enabled: false, analog_id: 5 }, // Sepolia
    81: { address: 'NOT_FOUND_BSC_TO_SHIBUYA', enabled: false, analog_id: 7 }, // Shibuya
  },
  81: { // Shibuya
    11155111: { address: '0xAe5740dC9A0e122b368704dE02cBEE60a207799A', enabled: true, analog_id: 5 }, // Sepolia
    97: { address: 'NOT_FOUND_SHIBUYA_TO_BSC', enabled: false, analog_id: 9 }, // BSC Testnet
  },
};

export default bridgeContracts;