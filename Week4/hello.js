let trees = ['Fir', 'Sequoia', 'Maple']

trees.forEach(function(tree){
    console.log(tree)
})

trees.forEach(function(tree, index){
    console.log(tree, index)
})

console.log(trees[10])
console.log(trees[2])

console.log(trees.length)
 
trees.push('Palm')
console.log(trees)
trees[8] = 'Sequoia'
trees.push('Ash')
console.log(trees)

trees.sort()
trees.pop()


let allTrees = trees.join(' ***** ')
