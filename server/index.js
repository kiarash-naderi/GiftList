const express = require('express');
const { MerkleTree } = require('./utils/MerkleTree');  
const { keccak256 } = require('ethereum-cryptography/keccak');
const { verifyProof } = require('./utils/verifyProof');

const app = express();
const port = 3000;

const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];
const leaves = names.map(name => keccak256(Buffer.from(name)));
const tree = new MerkleTree(leaves, keccak256);
const root = tree.getRoot();

app.use(express.json());

app.post('/verify', (req, res) => {
  const { name, proof } = req.body;
  const leaf = keccak256(Buffer.from(name));

  const isValid = verifyProof(proof, leaf, root, keccak256);

  if (isValid) {
    res.send('You are on the list!');
  } else {
    res.send('You are not on the list.');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
