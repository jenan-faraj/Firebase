import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAjOyXO6_puYTmHMD4C6YsZjeCrgS74kew",
    authDomain: "firestorepro-1f682.firebaseapp.com",
    projectId: "firestorepro-1f682",
    storageBucket: "firestorepro-1f682.firebasestorage.app",
    messagingSenderId: "190061423018",
    appId: "1:190061423018:web:852a476904bc0b1816a3d3"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Handle Form Submission
const productForm = document.getElementById('productForm');
productForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get Form Values
    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const category = document.getElementById('productCategory').value;

    try {
        // Add Product to Firestore
        const docRef = await addDoc(collection(db, 'products'), {
            name: name,
            price: price,
            category: category,
            createdAt: serverTimestamp()
        });
        alert(`Product added successfully! ID: ${docRef.id}`);
        productForm.reset();
        loadProducts();  // Reload products
    } catch (error) {
        console.error('Error adding product:', error);
        alert('Error adding product: ' + error.message);
    }
});

// Load Products from Firestore
async function loadProducts() {
    const productsContainer = document.getElementById('productsContainer');
    productsContainer.innerHTML = '';  // Clear the container before displaying new data

    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((docSnapshot) => {
        const product = docSnapshot.data();
        const productCard = createProductCard(product.name, product.price, product.category, docSnapshot.id);
        productsContainer.appendChild(productCard);
    });
}

// Create Product Card
function createProductCard(name, price, category, docId) {
    const card = document.createElement('div');
    card.classList.add('product-card');
    
    const productName = document.createElement('h3');
    productName.textContent = name;
    card.appendChild(productName);

    const productPrice = document.createElement('p');
    productPrice.textContent = `Price: $${price}`;
    card.appendChild(productPrice);

    const productCategory = document.createElement('p');
    productCategory.textContent = `Category: ${category}`;
    card.appendChild(productCategory);

    // Add Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    card.appendChild(deleteButton);

    // Add Update Button
    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update';
    card.appendChild(updateButton);

    // Delete Button Logic
    deleteButton.addEventListener('click', () => {
        deleteProduct(docId); 
    });

    // Update Button Logic
    updateButton.addEventListener('click', () => {
        updateProduct(docId); 
    });

    return card;
}

// Delete Product from Firestore
async function deleteProduct(docId) {
    try {
        const productDoc = doc(db, "products", docId);
        await deleteDoc(productDoc);  
        alert('Product deleted successfully!');
        loadProducts();  
    } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product: ' + error.message);
    }
}

// Update Product in Firestore
async function updateProduct(docId) {
    const newName = prompt("Enter new product name:");
    const newPrice = prompt("Enter new product price:");
    const newCategory = prompt("Enter new product category:");

    if (newName && newPrice && newCategory) {
        try {
            const productDoc = doc(db, "products", docId);
            await updateDoc(productDoc, {
                name: newName,
                price: parseFloat(newPrice),
                category: newCategory,
            });
            alert('Product updated successfully!');
            loadProducts();  
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Error updating product: ' + error.message);
        }
    }
}


loadProducts();

