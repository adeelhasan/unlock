const deployLocks = require('../../helpers/deployLocks')
const Unlock = artifacts.require('../../Unlock.sol')

let unlock, locks

contract('Lock / erc721 / Non_Public_getApproved', (accounts) => {
  before(() => {
    return Unlock.deployed()
      .then(_unlock => {
        unlock = _unlock
        return deployLocks(unlock, accounts[0])
      })
      .then(_locks => {
        locks = _locks
      })
  })

  let lockOwner

  before(() => {
    return locks['FIRST'].owner.call().then((_owner) => {
      lockOwner = _owner
    })
  })
  // from approve.js, ln# 27:
  it.skip('should return the address of the approved owner for a key', () => {
    return locks['FIRST'].approve(accounts[3], accounts[3], {
      from: lockOwner
    }).then(() => {
      return locks['FIRST'].getApproved.call(accounts[3])
    }).then((approved) => {
      assert.equal(accounts[3], approved)
    })
  })
})
