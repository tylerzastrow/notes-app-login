// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyDeKnBIweBo5--p5jebX8uUzUN2FzWLi2A",
    authDomain: "notes-app-6ba50.firebaseapp.com",
    projectId: "notes-app-6ba50",
    storageBucket: "notes-app-6ba50.appspot.com",
    messagingSenderId: "551174910141",
    appId: "1:551174910141:web:a49ce7fd96a8d9b22447d4",
    measurementId: "G-MJ0QVPJBZ1"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Handle Login
  document.getElementById("loginBtn").addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => alert("Login Successful"))
      .catch((error) => alert(error.message));
  });
  
  // Handle Signup
  document.getElementById("signupBtn").addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => alert("Signup Successful"))
      .catch((error) => alert(error.message));
  });
  
  // Handle Logout
  document.getElementById("logoutBtn").addEventListener("click", () => {
    firebase.auth().signOut()
      .then(() => {
        alert("Logout Successful");
        document.getElementById("notes").innerHTML = "Please log in to see your notes.";
      })
      .catch((error) => alert(error.message));
  });
  
  // Monitor Auth State
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      showNotes();
    } else {
      document.getElementById("notes").innerHTML = "Please log in to see your notes.";
    }
  });
  
  // Add a Note
  document.getElementById("addBtn").addEventListener("click", () => {
    const addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    let notesObj = notes ? JSON.parse(notes) : [];
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    showNotes();
  });
  
  // Show Notes
  function showNotes() {
    let notes = localStorage.getItem("notes");
    let notesObj = notes ? JSON.parse(notes) : [];
  
    let html = "";
    notesObj.forEach((note, index) => {
      html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">Note ${index + 1}</h5>
            <p class="card-text">${note}</p>
            <button id="${index}" onclick="deleteNote(${index})" class="btn btn-primary">Delete Note</button>
          </div>
        </div>`;
    });
  
    const notesElm = document.getElementById("notes");
    notesElm.innerHTML = notesObj.length ? html : 'Nothing to show! Use "Add a Note" section above to add notes.';
  }
  
  // Delete a Note
  function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    let notesObj = notes ? JSON.parse(notes) : [];
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
  }
  
  // Search Notes
  document.getElementById("searchTxt").addEventListener("input", (e) => {
    const inputVal = e.target.value.toLowerCase();
    const noteCards = document.getElementsByClassName("noteCard");
  
    Array.from(noteCards).forEach((card) => {
      const cardTxt = card.querySelector("p").innerText.toLowerCase();
      card.style.display = cardTxt.includes(inputVal) ? "block" : "none";
    });
  });
  
