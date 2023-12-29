class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    const newNode = new Node(val);

    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let current = this.root;

    while (true) {
      if (val < current.val) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else if (val > current.val) {
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      } else {
        // Handle the case where the value is equal to the current node's value
        return this;
      }
    }

  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, current = this.root) {
    if (!current) {
      this.root = new Node(val);
      return this;
    }

    if (val < current.val) {
      if (!current.left) {
        current.left = new Node(val);
        return this;
      }
      return this.insertRecursively(val, current.left);
    } else if (val > current.val) {
      if (!current.right) {
        current.right = new Node(val);
        return this;
      }
      return this.insertRecursively(val, current.right);
    } else {
      // Handle case where the value is equal to the current node's value
      return this;
    }

  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    let current = this.root;

    while (current) {
      if (val === current.val) {
        return current;
      } else if (val < current.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return undefined;

  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, current = this.root) {
    if (!current) {
      return undefined;
    }

    if (val === current.val) {
      return current;
    } else if (val < current.val) {
      return this.findRecursively(val, current.left);
    } else {
      return this.findRecursively(val, current.right);
    }
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder(node = this.root, result = []) {
    if (node) {
      result.push(node.val); // Visit current node
      this.dfsPreOrder(node.left, result); // Traverse left subtree
      this.dfsPreOrder(node.right, result); // Traverse right subtree
    }
    return result;

  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder(node = this.root, result = []) {
    if (node) {
      this.dfsInOrder(node.left, result); // Traverse left subtree
      result.push(node.val); // Visit the current node
      this.dfsInOrder(node.right, result); // Traverse right subtree
    }
    return result;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder(node = this.root, result = []) {
    if (node) {
      this.dfsPostOrder(node.left, result); // Traverse left subtree
      this.dfsPostOrder(node.right, result); // Traverse right subtree
      result.push(node.val); // Visit current node
    }
    return result;

  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    const result = [];
    const queue = [this.root];

    while (queue.length > 0) {
      const currentNode = queue.shift();
      if (currentNode) {
        result.push(currentNode.val);
        if (currentNode.left) queue.push(currentNode.left);
        if (currentNode.right) queue.push(currentNode.right);
      }
    }

    return result;

  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {
    let currentNode = this.root;
    let parentNode = null;

    // Find node to remove and its parent
    while (currentNode) {
      if (val === currentNode.val) {
        break;
      } else if (val < currentNode.val) {
        parentNode = currentNode;
        currentNode = currentNode.left;
      } else {
        parentNode = currentNode;
        currentNode = currentNode.right;
      }
    }

    if (!currentNode) {
      // Node with given value not found
      return null;
    }

    // Case 1: Node has no children
    if (!currentNode.left && !currentNode.right) {
      if (!parentNode) {
        // Removing root node
        this.root = null;
      } else if (parentNode.left === currentNode) {
        parentNode.left = null;
      } else {
        parentNode.right = null;
      }
    }
    // Case 2: Node has one child
    else if (!currentNode.left || !currentNode.right) {
      const childNode = currentNode.left || currentNode.right;

      if (!parentNode) {
        // Removing root node
        this.root = childNode;
      } else if (parentNode.left === currentNode) {
        parentNode.left = childNode;
      } else {
        parentNode.right = childNode;
      }
    }
    // Case 3: Node has two children
    else {
      // Find successor (minimum value in the right subtree)
      let successor = currentNode.right;
      let successorParent = currentNode;

      while (successor.left) {
        successorParent = successor;
        successor = successor.left;
      }

      // Replace value of the node to be removed with the successor's value
      currentNode.val = successor.val;

      // Remove successor (it has at most one right child)
      if (successorParent.left === successor) {
        successorParent.left = successor.right;
      } else {
        successorParent.right = successor.right;
      }
    }

    return currentNode;
  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {
    const checkBalance = (node) => {
      if (!node) {
        return { balanced: true, height: 0 };
      }

      const leftSubtree = checkBalance(node.left);
      const rightSubtree = checkBalance(node.right);

      const isBalanced = (
        leftSubtree.balanced && 
        rightSubtree.balanced &&
        Math.abs(leftSubtree.height - rightSubtree.height) <= 1
      );

      const height = 1 + Math.max(leftSubtree.height, rightSubtree.height);

      return { balanced: isBalanced, height };
    };

    return checkBalance(this.root).balanced;

  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    if (!this.root || (!this.root.left && !this.root.right)) {
      // BST is empty or only has one node
      return undefined;
    }

    let secondHighest = { value: undefined };

    const findSecondHighestHelper = (node) => {
      if (node) {
        findSecondHighestHelper(node.right);

        // Check if current node has the second highest value
        if (secondHighest.value === undefined) {
          secondHighest.value = node.val;
        } else if (secondHighest.value !== node.val) {
          // If current node's value is different from the highest value
          // update the second highest value and stop further traversal
          secondHighest.value = node.val;
          return;
        }

        findSecondHighestHelper(node.left);
      }
    };
    
    findSecondHighestHelper(this.root);

    return secondHighest.value;
    
  }
}

module.exports = BinarySearchTree;
