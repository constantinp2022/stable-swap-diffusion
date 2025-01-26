// SPDX-License-Identifier: MIT

// Was used with REMIX IDE

pragma solidity ^0.8.0;

import "./WrapperSwap.sol";

contract Factory {
    event Deployed(address addr, uint256 salt);

    function deploy(
        string memory name,
        string memory symbol,
        address gatewayAddress,
        address recipient,
        uint16 recipientNetwork,
        address holder,
        uint256 initialSupply,
        uint256 salt
    ) public payable returns (address) {
        bytes memory bytecode = abi.encodePacked(
            type(WrapperSwap).creationCode,
            abi.encode(name, symbol, gatewayAddress, recipient, recipientNetwork, holder, initialSupply)
        );

        address addr;
        assembly {
            addr := create2(0, add(bytecode, 0x20), mload(bytecode), salt)
            if iszero(extcodesize(addr)) {
                revert(0, 0)
            }
        }
        emit Deployed(addr, salt);
        return addr;
    }

    function getAddress(
        string memory name,
        string memory symbol,
        address gatewayAddress,
        address recipient,
        uint16 recipientNetwork,
        address holder,
        uint256 initialSupply,
        uint256 salt
    ) public view returns (address) {
        bytes memory bytecode = abi.encodePacked(
            type(WrapperSwap).creationCode,
            abi.encode(name, symbol, gatewayAddress, recipient, recipientNetwork, holder, initialSupply)
        );

        bytes32 hash = keccak256(
            abi.encodePacked(
                bytes1(0xff),
                address(this),
                salt,
                keccak256(bytecode)
            )
        );
        return address(uint160(uint256(hash)));
    }
}