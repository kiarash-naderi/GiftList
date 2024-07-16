const { MerkleTree } = require('./MerkleTree');
const { keccak256 } = require('ethereum-cryptography/keccak');

const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];
const leaves = names.map(name => keccak256(Buffer.from(name)));

const tree = new MerkleTree(leaves, keccak256);
const root = tree.getRoot();
console.log('Merkle Root:', root.toString('hex'));

const nameToProve = 'Alice';
const leaf = keccak256(Buffer.from(nameToProve));
const proof = tree.getProof(leaf);
console.log('Proof for Alice:', proof);
