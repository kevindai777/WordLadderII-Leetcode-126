//Objective is the same as 'Word Ladder', except this time we want to print
//the shortest paths

let beginWord = "hit"
let endWord = "cog"
let wordList = ["hot","dot","dog","lot","log","cog"]


//O(n * m) where n is the length of the dictionary and m is the length of every word
//We use a BFS solution here to visit each word at most once, and use a hashset
//to keep track if we visited the word already

let results = []
let result = []
let queue = [[beginWord]]
let visited = {}
let dict = new Set(wordList)
let steps = Infinity

while (queue.length > 0) {
    let currPath = queue.shift()
    let currWord = currPath[currPath.length - 1]
    
    //Make sure we only include the shortest paths
    if (currPath.length >= steps) {
        break
    }
    
    for (let i = 0; i < currWord.length; i++) {
        for (let j = 0; j < 26; j++) {
            let newWord = currWord.slice(0, i) + String.fromCharCode(97 + j) + currWord.slice(i + 1)
            
            //Make sure we're not using the same word && the dictionary has the word
            if (currWord !== newWord && dict.has(newWord)) {

                //Make sure we're not visiting a word that we already visited
                //We don't want to delete them from the dictionary since we need to reuse it in another path
                if (!visited[newWord]) {
                    queue.push([...currPath, newWord])
                }
                
                if (newWord == endWord) {
                    //Update the length of the shortest path
                    if (currPath.length < steps) {
                        steps = currPath.length + 1
                    }
                    
                    result.push([...currPath, newWord])
                }
            }
        }
    }
    
    //Mark the word as visited
    visited[currWord] = true
}

return result