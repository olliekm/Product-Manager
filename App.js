import './App.css';
import { collection, onSnapshot, addDoc, setDoc, doc, deleteDoc, updateDoc } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import db from './firebase';
import { async } from '@firebase/util';
import { getAuth, signInWithPopup, signInWithEmailAndPassword, signOut } from "firebase/auth";
import firebase from './firebase';

function App() {

  const auth = getAuth();
  function login() {
    const email = document.getElementById("emailinput").value
    const password = document.getElementById("passwordinput").value
    signInWithEmailAndPassword(auth, email, password)

      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        document.querySelector(".loginCont").style.display = "none";
        // ...
      })
      .catch((error) => {
        alert("Wrong email or password")
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
  function userout() {
    console.log("signing out!")

    signOut(auth).then(() => {
      document.querySelector(".loginCont").style.display = "flex";

    }).catch((error) => {
      console.log("signing out not working")
    });
  }



  const [products, setProducts] = useState([{ name: "Loading...", id: "initial" }]);

  useEffect(
    () =>
      onSnapshot(collection(db, "products"), (snapshop) =>
        setProducts(snapshop.docs.map(doc => ({ ...doc.data(), id: doc.id })))
      ),

    []
  );

  const handleNew = async () => {
    console.log("clicked")
    const name = document.getElementById("nameinput").value
    const price = document.getElementById("priceinput").value
    const quantity = 1;
    if (name !== "" && price !== "") {
      const collectionRef = collection(db, "products");
      const payload = { name, price, quantity };
      await addDoc(collectionRef, payload);
      document.getElementById("nameinput").value = ""
      document.getElementById("priceinput").value = ""
    } else {
      alert("fill the inpust firsrt");
    }


  }
  var isClicked = false;
  const handleEdit = async (id, e) => {

    const listItem = e.target.parentNode;

    console.log(e.target.parentNode)
    if (isClicked) {
      listItem.style.backgroundColor = "rgb(214, 214, 214)";
      console.log("active")
      isClicked = false;
    } else {
      listItem.style.backgroundColor = "rgb(89, 161, 255)"

      console.log("inactive")
      isClicked = true;
    }

    const name = document.getElementById("editInputName").value
    const price = document.getElementById("editInputPrice").value
    const image = document.getElementById("editInputImage").value
    const quantity = 1;

    if (price !== "" && name !== "") {
      const docRef = doc(db, "products", id);
      const payload = { name, price, quantity, image }
      await setDoc(docRef, payload);
    } else {
      alert("fill in the inputs")
    }


  };
  const handleQuantity = async (id, e) => {
    console.log(e.target)
    const quantity = e.target.value
    e.target.value = quantity
    console.log(id, quantity)
    const docRef = doc(db, "products", id);
    const payload = { quantity }
    await updateDoc(docRef, payload)
  }

  const handleDelete = async (id) => {
    const docRef = doc(db, "products", id);
    await deleteDoc(docRef)
  }
  function clearInputs() {
    document.getElementById("editInputName").value = "";
    document.getElementById("editInputPrice").value = "";
    document.getElementById("editInputImage").value = "";
  }
  function handlePreview(image, name, e) {
    console.log(image)
    console.log(name)
    const previewName = document.getElementById('productName')
    const previewImg = document.querySelector('.productImg')
    previewImg.style.backgroundImage = "url(" + image + ")"
    previewName.innerText = name;
  }

  return (

    <div className="App">
      <div className="loginCont">
        <div className="loginInputs">
          <h1>LOGIN</h1>
          <input autocomplete="on" placeholder="Email" id="emailinput" />
          <input autocomplete="on" placeholder="Password" id="passwordinput" />
          <button onClick={login}>Login</button>
        </div>
      </div>
      <div className="top">
        <button className="addBtn" onClick={handleNew}>Add Product</button>
        <div className="inputs">

          <label htmlFor="">NAME:</label>
          <input type="text" name="" id="nameinput" placeholder="Product name" autocomplete="nope" />
          <label htmlFor="">PRICE:</label>
          <input type="text" name="" id="priceinput" placeholder="Product price in $" autocomplete="nope" />

        </div>
        <button onClick={userout} className="logoutBtn">LOGOUT</button>
      </div>
      <div className="editCont">
        <h1>Edit</h1>
        <div className="editinputs">
          <label htmlFor="">Name:</label>
          <input type="text" name="" id="editInputName" autocomplete="nope" /> <br />
          <br /><br />
          <label htmlFor="">Price:</label>
          <input type="text" name="" id="editInputPrice" autocomplete="nope" /><br />
          <br /><br />
          <label htmlFor="">Image Url:</label>
          <input type="text" name="" id="editInputImage" autocomplete="nope" />
          <button className="clearBtn" onClick={clearInputs}>Clear inputs</button>
        </div>
      </div>
      <div className="productImgCont">
        <h1 id="productName">yo</h1>
        <div className="productImg">

        </div>
      </div>
      <div className="content">
        <ul className="productList">
          {products.map((products) => (
            <li key={products.id} onClick={(e) => handlePreview(products.image, products.name, e)}>
              <a className="deleteBtn" href="#" onClick={() => handleDelete(products.id)}>Delete</a><a className="editBtn" href="#" onClick={(e) => handleEdit(products.id, e)}>Edit</a> {products.name}  ${products.price} <span className="productID">{products.id}</span><input onChange={(e) => handleQuantity(products.id, e)} defaultValue={products.quantity} className="productquantity" id="quantityinput" type="number" min="0" autocomplete="nope"></input>
            </li>
          ))}
        </ul>
      </div>
    </div >
  );
}

export default App;
