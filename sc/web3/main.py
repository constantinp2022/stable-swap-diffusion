import rlp
from hexbytes import HexBytes
from web3 import Web3

deployer = '0x8e0b5395B813E75dA6a44c813cD41497A962D2bE'


# Connect to an Ethereum node (Infura or local node)
# w3 = Web3(Web3.HTTPProvider('https://evm.shibuya.astar.network'))
w3 = Web3(Web3.HTTPProvider('https://sepolia.infura.io/v3/082d745fdc254b54a69324ce8b12e2de'))

def compute_create_address(_sender, _nonce):
    _sender = bytes.fromhex(_sender[2:])
    _address = w3.keccak(HexBytes(rlp.encode([_sender, _nonce]))).hex()[-40:]
    return w3.to_checksum_address(_address)


# # Get the nonce for the deployer address
# nonce = w3.eth.get_transaction_count(deployer)
# print(f"The nounce is: {nonce} address is: {deployer}")

# Now, you can use the nonce in the compute_create_address function
# contract_address = compute_create_address(deployer, nonce)
# print(f"The next contract address is: {contract_address}")

noune = 0

while True:
    contract_address = compute_create_address(deployer, noune)
    print(f"address = {deployer} nounce = {noune} future contract address is: {contract_address}")
    noune += 1
