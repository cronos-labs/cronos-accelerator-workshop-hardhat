// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

/**
 * @title TipCreator
 * @dev A contract for tipping content creators and storing comments.
 */
contract TipCreator {
    event NewComment(
        address indexed from,
        uint256 timestamp,
        string name,
        string message
    );

    struct Comment {
        address from;
        uint256 timestamp;
        string name;
        string message;
    }

    address payable owner;

    Comment[] comments;

    /**
     * @dev Initializes the contract.
     */
    constructor() {
        owner = payable(msg.sender);
    }

    /**
     * @dev Fetches all stored comments.
     * @return Array of Comment structs representing the comments.
     */
    function getComments() public view returns (Comment[] memory) {
        return comments;
    }

    /**
     * @dev Allows a user to tip a content creator and leave a comment.
     * @param _name The name of the commenter.
     * @param _message The message of the commenter.
     */
    function tipCreator(string memory _name, string memory _message) public payable {
        require(msg.value > 0, "Tip amount must be greater than 0");
        comments.push(Comment(msg.sender, block.timestamp, _name, _message));
        emit NewComment(msg.sender, block.timestamp, _name, _message);
    }

    /**
     * @dev Allows the contract owner to withdraw the tips.
     */
    function withdrawTips() public {
        require(owner.send(address(this).balance));
    }
}
