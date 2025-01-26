import styles from 'styles/Home.module.scss'
import { ThemeToggleButton, ThemeToggleList } from 'components/Theme'
import { useState } from 'react'
import { useNetwork, useSwitchNetwork, useAccount, useBalance, useWaitForTransaction, usePrepareContractWrite, useContractWrite } from 'wagmi'
import ConnectWallet from 'components/Connect/ConnectWallet'
import { useSignMessage, useSigner } from 'wagmi'
import { ethers } from 'ethers'
import { Toaster, toast } from 'react-hot-toast';

// Import logo file
import logo from '../../public/logo.png'


// Import bridge contracts
import bridgeContracts from '../utils/bridgeContracts'

// Import bridge contract ABI
import bridgeContractAbi from '../utils/bridgeContractAbi.json'

export default function Home() {
  return (
    <div className={styles.container}>
      <Toaster position="top-right" />
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

function Header() {
  return (
    <header className={styles.header}>
      <div>
        <img src={logo.src} alt="logo" className="h-16" />
      </div>
      <div className="flex items-center">
        <h1><strong>Stable Swap Diffusion</strong></h1>
      </div>

      <div className="flex items-center">
        <ThemeToggleButton />
      </div>
    </header>
  )
}

function Main() {
  const { address, isConnected, connector } = useAccount()
  const { chain, chains } = useNetwork()
  const { isLoading: isNetworkLoading, pendingChainId, switchNetwork } = useSwitchNetwork()
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    address: address,
  })
  const [targetNetwork, setTargetNetwork] = useState<number | null>(null)

  const handleTargetNetworkChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTargetNetwork(Number(event.target.value))
  }

  const bridgeContract = chain && targetNetwork ? bridgeContracts[chain.id]?.[targetNetwork] : null
  const bridgeContractAddress = bridgeContract?.enabled ? bridgeContract.address : 'n/a'

  return (
    <main className={styles.main + ' space-y-6'}>
      <div>
        <div className="flex w-full flex-col items-center">
          <ConnectWallet />
        </div>
      </div>

      <div className="w-full max-w-xl rounded-xl bg-sky-500/10 p-6 text-center">
        <dl className={styles.dl}>
          <dt>Bridge to Network</dt>
          <dd>
            <select onChange={handleTargetNetworkChange} value={targetNetwork || ''}>
              <option value="" disabled>Select target network</option>
              {chains
                .filter(x => x.id !== chain?.id)
                .map(x => (
                  <option key={x.id} value={x.id}>
                    {x.name}
                  </option>
                ))}
            </select>
          </dd>
          <dt>Bridge Contract Address</dt>
          <dd className="break-all">{bridgeContractAddress}</dd>
          {bridgeContract && address &&
            <dt>Swap | Bridge</dt> &&
            <dd className="break-all">{address ? <SwapStable bridgeContract={bridgeContract} address={address} /> : 'n/a'} </dd>
          }
        </dl>
      </div>
    </main>
  )
}

// Update your SwapStable component
function SwapStable({ bridgeContract, address }: { bridgeContract: any, address: string }) {
  const [receiver, setReceiver] = useState('');
  const [amount, setAmount] = useState(0);
  // const [isLoading, setIsLoading] = useState(false);


  // Prepare the contract write
  const { config, error: prepareError } = usePrepareContractWrite({
    address: bridgeContract.address,
    abi: bridgeContractAbi,
    functionName: 'swap',
    args: [receiver, amount ? amount : undefined, { value: 10000000 }],
    enabled: Boolean(receiver && amount && bridgeContract.address),
  });

  // Handle the contract write
  const { data, write, error: writeError } = useContractWrite(config);

  // Wait for transaction
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const handleSwap = async () => {

    console.log('Swap initiated with:', { receiver, amount, bridgeContract });	

    if (!bridgeContract) {
      toast.error('Bridge contract not found');
      return;
    }
    else if (!receiver) {
      toast.error('Please enter a receiver address');
      return;
    }
    else if (!amount) {
      toast.error('Please enter an amount');
      return;
    }
    else if (amount <= 0) {
      toast.error('Please enter a positive amount');
      return;
    }
    else {
      toast.success('Swap initiated');
    }


    try {
      write();
    } catch (error) {
      console.error('Swap error:', error);
      toast.error('Error performing swap: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium">Receiver Address</label>
        <input
          value={receiver}
          onChange={e => setReceiver(e.target.value)}
          className="rounded-lg p-2 border border-gray-300 focus:ring-2 focus:ring-blue-500"
          placeholder="0x..."
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(Number(e.target.value))}
          className="rounded-lg p-2 border border-gray-300 focus:ring-2 focus:ring-blue-500"
          placeholder="0.0"
        />
      </div>
      <button
        disabled={isLoading}
        onClick={handleSwap}
        className="w-full rounded-lg bg-blue-500 py-2 px-4 text-white transition-all duration-150 hover:bg-blue-600 disabled:opacity-50"
      >
        {isLoading ? 'Processing...' : 'Swap'}
      </button>
    </div>
  );
}


function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="flex flex-col items-center space-y-2">
      </div>
      <div className="flex flex-col items-center space-y-2">
        Developed by CPR as part of
        <a
          href="https://analog-part2.hackerearth.com/"
          target="_blank"
          className="text-blue-500 hover:underline"
        >
          Analog Kairos Hackathon - 2
        </a>
      </div>
      <div className="flex flex-col items-center space-y-2">
      </div>
    </footer>
  )
}
