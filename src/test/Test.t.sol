// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.13;

import {DSTest} from "ds-test/src/test.sol";
import {ERC20} from "solmate/tokens/ERC20.sol";
import {Hevm} from "solmate/test/utils/Hevm.sol";


contract AludelFactoryTest is DSTest {
    Hevm cheats;
    address owner;
    address recipient;
    uint248 public constant PRIVATE_KEY = type(uint248).max >> 7;

    function setUp() public {

        cheats = Hevm(HEVM_ADDRESS);
        owner = cheats.addr(PRIVATE_KEY);

        recipient = cheats.addr(PRIVATE_KEY + 1);
    }

}