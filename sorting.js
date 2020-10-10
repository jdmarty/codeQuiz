var hiScores = [
    { name: "Josh", score: 49 },
    { name: "Kyle", score: 100 },
    { name: "Ray", score: 60 },
    { name: "Caleb", score: 76},
    { name: "Keith", score: 0},
    { name: "Leah", score: 12},
    { name: "Leah2", score: 12},
    { name: "Josh2", score: 0}
]

//function to sort an array of objects by the highest score
function sortScores(hiScores) {
    let sortedArray = Object.entries(hiScores).sort((a,b) => {
        if (b[1].score > a[1].score) return 1;
        return -1;
    }).map(el => el[1])
    return sortedArray
}



