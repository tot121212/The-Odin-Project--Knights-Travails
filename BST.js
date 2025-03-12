class Node{
    constructor(data){
        this.data = data ?? null;
        this.left = null;
        this.right = null;
    }
}

// balanced binary tree
class Tree{
    constructor(array){
        this.init(array);
    }

    init(array){
        const sorted = this.process(array);
        //console.log("Sorted Array:",sorted);
        this.root = this.buildTree(sorted, 0, sorted.length-1);
        //console.log("Root built:", this.root);
    }

    prettyPrint = (node, prefix = "", isLeft = true) => {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    };

    buildTree(array, start, end){
        if (start>end) return null;
        let mid = Math.floor((start+end)/2);
        let root = new Node(array[mid]);
        root.left = this.buildTree(array, start, mid-1);
        root.right = this.buildTree(array, mid+1, end);
        return root;
    }

    process(array){
        let sorted = [...(new Set(array))]; // remove dups and spread back to array
        sorted.sort((a,b) => a - b); // sort array
        return sorted;
    }

    //[1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
    //[1,3,4,5,7,8,9,23,67,324,6345]
    insert(value){
        if (!this.root){
            this.root = new Node(value);
            return true;
        }
        const recurse = (value, node, parent, side)=>{
            if (!(node instanceof Node)){
                node = new Node(value);
                if (parent instanceof Node){
                    if (side === "l"){
                        parent.left = node;
                        console.log("Inserting",value);
                        return true;
                    } else if (side === "r"){
                        parent.right = node;
                        console.log("Inserting",value);
                        return true;
                    }
                }
                return new Error("Trying to insert new value onto null parent");
            }
            if (value === node.data) return new Error("Value already exists in tree");
            if (value < node.data) {
                return recurse(value, node.left, node, "l");
            } else {
                parent = node;
                return recurse(value, node.right, node, "r");
            }
        }
        return recurse(value, this.root, null, null);
    }

    deleteItem(value){
        const recurse = (value, node, parent)=>{
            if (!(node instanceof Node)) return false; // node does not exist
            if (value === node.data){
                if (!node.left && !node.right) { // no children
                    if (parent){
                        parent.left === node ? parent.left = null : parent.right = null; // null out parent left or right
                    } else {
                        this.root = null;
                    }
                } else if (node.left && node.right){ // both children
                    let nextLargest = node.right; // start with right node
                    let nextLargestParent = node; // store parent of that node
                    while (nextLargest.left){ // search through left nodes until left is null
                        nextLargestParent = nextLargest; // set current next largest to the parent
                        nextLargest = nextLargest.left; // set nextLargest to actual nextLargest
                    }
                    if (nextLargest.right) nextLargestParent.left = nextLargest.right; // if that node has a right, make its right into the left child of the closestLargest instead of node itself
                    node.data = nextLargest.data; // now we have a decoupled nextLargest node, use that to set data of node
                } else { // only one child
                    const child = node.left || node.right;
                    if (!parent) this.root = child;
                    else (parent.left === node) ? parent.left = child : parent.right = child;
                }
                return true;
            } 
            else if (value < node.data){
                return recurse(value, node.left, node);
            } 
            else { // value > node.data
                return recurse(value, node.right, node);
            }
        }
        return recurse(value, this.root, null);
    }

    find(value){
        const recurse = (value, node)=>{
            if (!node) return null;
            if (value === node.data) return node;
            else if (value < node.data) return recurse(value, node.left);
            else return recurse(value, node.right);
        }
        return recurse(value, this.root);
    }
    
    // call a callback on each node in the tree, in level order traversal
    // lets try iteration for this one
    levelOrder(callback) {
        if (!callback) throw new Error("No callback provided");
        const queue = [[this.root, 0]];
        while (queue.length) {
            let [node, level] = queue.shift();
            if (callback(node, level)) return;
            if (node.left) queue.push([node.left, level + 1]);
            if (node.right) queue.push([node.right, level + 1]);
        }
    }

    // left root right order
    inOrder(callback){
        if (!callback) throw new Error("No callback provided");
        const recurse = (node)=>{
            if (node.left) recurse(node.left);
            if (callback(node)) return;
            if (node.right) recurse(node.right);
        };
        recurse(this.root);
    }

    preOrder(callback){
        if (!callback) throw new Error("No callback provided");
        const recurse = (node)=>{
            if (callback(node)) return;
            if (node.left) recurse(node.left);
            if (node.right) recurse(node.right);
        };
        recurse(this.root);
    }

    postOrder(callback){
        if (!callback) throw new Error("No callback provided");
        const recurse = (node)=>{
            if (node.left) recurse(node.left);
            if (node.right) recurse(node.right);
            if (callback(node)) return;
        };
        recurse(this.root);
    }

    height(node){
        if (!node) return -1;
        let leftHeight = this.height(node.left);
        let rightHeight = this.height(node.right);
        let height = Math.max(leftHeight, rightHeight)+1;
        return height;
    }

    // the number of edges in the path from given node to tree root
    depth(targetNode){
        if (!targetNode) return null;
        let depth = 0;
        const recurse = (node)=>{
            if (!(node instanceof Node)) return null;
            if (targetNode.data === node.data) return depth;
            depth+=1;
            if (targetNode.data < node.data) return recurse(node.left);
            else if (targetNode.data > node.data) return recurse(node.right);
        }
        return recurse(this.root);
    }

    //      1  (Height 2, Depth 0)  <- Root
    //     / \
    //    2   3  (Height 1, Depth 1)
    //   / \   \
    //  4   5   6  (Height 0, Depth 2)
    //            7
    //              8

    // is the difference between heights of the left and right subtree of every node <= 1
    isBalanced(){
        const recurse = (node)=>{
            if (node === null) return 0; // base case
            let leftHeight = recurse(node.left); // left height is 2
            if (leftHeight === -1) return -1;
            let rightHeight = recurse(node.right); // right height is 4
            if (rightHeight === -1) return -1;
            if (Math.abs(leftHeight - rightHeight) > 1) return -1;
            else {
                let height = Math.max(leftHeight, rightHeight) + 1;
                //console.log(`${node.data} relative height is: ${height - 1}`);
                return height;
            }
        }
        return (recurse(this.root) !== -1);
    }

    rebalance(){
        console.log("Rebalancing tree...");
        const array = [];
        this.levelOrder((node, level)=>{array.push(node.data)});
        this.init(array);
    }
}