// SPDX-License-Identifier: MIT
pragma solidity ^0.7.6;

contract MultiSigWallet {
    /// @notice Notifies when a deposit is made to the multi-sig wallet
    event Deposit(address indexed sender, uint256 amount, uint256 balance);
    /// @notice Notifies when a transaction is submitted
    event SubmitTransaction(
        address indexed owner,
        uint256 indexed txIndex,
        address indexed to,
        uint256 value,
        bytes data
    );
    /// @notice Notifies when a transaction is confirmed
    event ConfirmTransaction(address indexed owner, uint256 indexed txIndex);
    /// @notice Notifies when a transaction is revoked
    event RevokeConfirmation(address indexed owner, uint256 indexed txIndex);
    /// @notice Notifies when a transaction is executed
    event ExecuteTransaction(address indexed owner, uint256 indexed txIndex);

    /// @return Owners of the multi-sig wallet
    address[] public owners;

    /// @return Indicates whether an address is an owner
    mapping(address => bool) public isOwner;

    /// @return The amount of confirmations needed to execute a transaction
    uint256 public numConfirmationsRequired;

    /// @return Indicates whether a transaction comes from an owner
    mapping(uint256 => mapping(address => bool)) public isConfirmed;

    struct Transaction {
        address to;
        uint256 value;
        bytes data;
        bool executed;
        uint256 numConfirmations;
    }

    /// @return All the executed and pending transactions in the multi-sig wallet
    Transaction[] public transactions;

    modifier onlyOwner() {
        require(isOwner[msg.sender], "not owner");
        _;
    }

    modifier txExists(uint256 _txIndex) {
        require(_txIndex < transactions.length, "tx does not exist");
        _;
    }

    modifier notExecuted(uint256 _txIndex) {
        require(!transactions[_txIndex].executed, "tx already executed");
        _;
    }

    modifier notConfirmed(uint256 _txIndex) {
        require(!isConfirmed[_txIndex][msg.sender], "tx already confirmed");
        _;
    }

    /**
    @param _owners The initial owners of the multi-sig wallet
    @param _numConfirmationsRequired The amount of confirmations needed to execute a transaction
     */
    constructor(address[] memory _owners, uint256 _numConfirmationsRequired) {
        require(_owners.length > 0, "owners required");
        require(
            _numConfirmationsRequired > 0 &&
                _numConfirmationsRequired <= _owners.length,
            "invalid number of required confirmations"
        );

        for (uint256 i = 0; i < _owners.length; i++) {
            address owner = _owners[i];

            require(owner != address(0), "invalid owner");
            require(!isOwner[owner], "owner not unique");

            isOwner[owner] = true;
            owners.push(owner);
        }

        numConfirmationsRequired = _numConfirmationsRequired;
    }

    /**
    @notice Fallback function to send ether to the contract
     */
    receive() external payable {
        emit Deposit(msg.sender, msg.value, address(this).balance);
    }

    // Helper function to deposit to the contract
    function deposit() external payable {
        emit Deposit(msg.sender, msg.value, address(this).balance);
    }

    /**
    @notice Propose a transaction to be approved by other owners
    @param _to Transactions's addressee
    @param _value Amount of ether to be transacted
    @param _data Data transmitted if calling another contract
     */
    function submitTransaction(
        address _to,
        uint256 _value,
        bytes memory _data
    ) public onlyOwner {
        uint256 txIndex = transactions.length;

        transactions.push(
            Transaction({
                to: _to,
                value: _value,
                data: _data,
                executed: false,
                numConfirmations: 0
            })
        );

        emit SubmitTransaction(msg.sender, txIndex, _to, _value, _data);
    }

    /**
    @notice Confirm a proposed transaction
    @param _txIndex Index of the transaction to be reviewed
     */
    function confirmTransaction(uint256 _txIndex)
        public
        onlyOwner
        txExists(_txIndex)
        notExecuted(_txIndex)
        notConfirmed(_txIndex)
    {
        Transaction storage transaction = transactions[_txIndex];
        transaction.numConfirmations += 1;
        isConfirmed[_txIndex][msg.sender] = true;

        emit ConfirmTransaction(msg.sender, _txIndex);
    }

    /**
    @notice If enough owners aprove the transaction, execute the transaction
    @param _txIndex Index of the transaction to be reviewed
     */
    function executeTransaction(uint256 _txIndex)
        public
        onlyOwner
        txExists(_txIndex)
        notExecuted(_txIndex)
    {
        Transaction storage transaction = transactions[_txIndex];

        require(
            transaction.numConfirmations >= numConfirmationsRequired,
            "cannot execute tx"
        );

        transaction.executed = true;

        (bool success, ) =
            transaction.to.call{value: transaction.value}(transaction.data);
        require(success, "tx failed");

        emit ExecuteTransaction(msg.sender, _txIndex);
    }

    /**
    @notice Reject a proposed transaction
    @param _txIndex Index of the transaction to be reviewed
     */
    function revokeConfirmation(uint256 _txIndex)
        public
        onlyOwner
        txExists(_txIndex)
        notExecuted(_txIndex)
    {
        Transaction storage transaction = transactions[_txIndex];

        require(isConfirmed[_txIndex][msg.sender], "tx not confirmed");

        transaction.numConfirmations -= 1;
        isConfirmed[_txIndex][msg.sender] = false;

        emit RevokeConfirmation(msg.sender, _txIndex);
    }

    /**
    @notice Get the owners of the multi-sig wallet
    @return Array of addresses corresponding to the owners
     */
    function getOwners() public view returns (address[] memory) {
        return owners;
    }

    /**
    @return The total amount of transactions performed as an unsinged integer
     */
    function getTransactionCount() public view returns (uint256) {
        return transactions.length;
    }
}

contract TestContract {
    uint public i;

    function callMe(uint j) public {
        i += j;
    }

    /// @notice Helper function to get data in hex format to call 'callMe' function
    function getData() public pure returns (bytes memory) {
        return abi.encodeWithSignature("callMe(uint256)", 123);
    }
}
