
from web3 import Web3
import os
from dotenv import load_dotenv

load_dotenv()  # take environment variables from .env.

# Import deployer address from .env file
deployer = os.environ.get('DEPLOYER_ADDRESS')
url = os.environ.get('SHIBUYA_URL')

if deployer is None or url is None:
    raise ValueError("DEPLOYER_ADDRESS|SHIBUYA_URL not set in .env file")

# Connect to an Ethereum node (Infura or local node)
w3 = Web3(Web3.HTTPProvider(url))

# Get the nonce for the deployer address
nonce = w3.eth.get_transaction_count(deployer)

print(f"The nounce is: {nonce} address is: {deployer}")

