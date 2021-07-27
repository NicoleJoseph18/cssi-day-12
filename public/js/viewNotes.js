window.onload = (event) => {
    firebase.auth().onAuthStateChanged(function (user) {

        if (user) {
            console.log('Logged in as: ' + user.displayName);
            googleUserId = user.uid;
            getNotes(googleUserId)
        } else {
            window.location = 'index.html'; // If not logged in, navigate back to login page.
        }
    });
}


const getNotes = (userId) => {
    const notesRef = firebase.database().ref(`users/${userId}`)

    notesRef.on('value', (snapshot) => {

        const data = snapshot.val()
        renderDataAsHtml(data);

    })
}

const renderDataAsHtml = (data) => {

    let cards = ``;
    for (const noteItem in data) {
        const note = data[noteItem]
        cards += createCard(note);
        console.log(note)
    }
    document.querySelector("#app").innerHTML = cards;
}

let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);


const createCard = (note) => {
    let colors = ['#5ef286',
        '#7cf7e7',
        '#7cabf7',
        '#ba8bf7',
        '#f56e64',
        '#eb9534'];
    return `
                      
        
        <div class = "column is-one-quarter" >
            <div class= "card" style="background-color:${colors[Math.floor(Math.random() * colors.length)]};">
                <header class = "card-header">
                    <p class ="card-header-title">${note.title}</p>
                </header>
                <div class= "card-content">                     
                    <div class = "content"> ${note.text}</div>
                </div>
            </div>
        </div>
    `

}
//add labels as tiles maybe
/* <div class="tile is-ancestor">
                     <div class="tile is-parent is-4">
                       <div class="tile is-child notification is-info">
                           <p class="title">${note.label}</p>
                       </div>
                     </div>
                   </div>  */