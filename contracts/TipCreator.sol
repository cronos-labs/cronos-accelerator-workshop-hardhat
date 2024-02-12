// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

/**
 * @title TipCreator
 * @dev Implements a tipping mechanism for content creators, along with a system for leaving comments.
 * This contract allows users to send Ether as a tip and store a message (comment) in the blockchain.
 * The owner of the contract (typically the content creator) can withdraw the accumulated tips.
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
   * @dev Constructor sets the contract's owner to the address that deploys the contract.
   */
  constructor() {
    owner = payable(msg.sender); // Sets the contract owner
  }

  /**
   * @dev Returns all the comments made with tips.
   * @return A memory array of `Comment` structs representing all the comments.
   */
  function getComments() public view returns (Comment[] memory) {
    return comments;
  }

  /**
   * @dev Allows users to tip the content creator and leave a comment.
   * A new comment is added to the `comments` array and a `NewComment` event is emitted.
   * @param _name The name of the commenter.
   * @param _message The content of the comment.
   * Requirements:
   * - The tip amount (`msg.value`) must be greater than 0.
   */
  function tipCreator(
    string memory _name,
    string memory _message
  ) public payable {
    require(msg.value > 0, 'Tip amount must be greater than 0');
    comments.push(Comment(msg.sender, block.timestamp, _name, _message));
    emit NewComment(msg.sender, block.timestamp, _name, _message);
  }

  /**
   * @dev Allows the owner of the contract to withdraw all tips (Ether) sent to the contract.
   * Requirements:
   * - The withdrawal transaction must succeed.
   */
  function withdrawTips() public {
    require(owner.send(address(this).balance), 'Withdrawal failed');
  }
}
