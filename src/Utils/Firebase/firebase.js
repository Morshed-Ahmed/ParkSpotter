// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth"

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  deleteDoc,
  setDoc,
} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyC9DfdvGl9bxYKGs3ddDzQJeCXummRyXzI",
  authDomain: "parkspotter-backend.firebaseapp.com",
  projectId: "parkspotter-backend",
  storageBucket: "parkspotter-backend.appspot.com",
  messagingSenderId: "805993286721",
  appId: "1:805993286721:web:1ad156d8b7e5370b778ac0",
  measurementId: "G-BX4551K73Y",
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export const registerUser = async (userData) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // 1. Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    )
    const user = userCredential.user

    // 2. Send email verification
    await sendEmailVerification(user)

    // 3. Prepare user data with the required "userType" field
    const updatedUserData = {
      ...userData, // Spread existing user data
      userType: userData.userType || "default", // Default to "default" if not provided
    }

    // 4. Determine the collection based on userType and add user data to Firestore
    let collectionName
    if (updatedUserData.userType === "parkOwner") {
      collectionName = "park_owners"
    } else if (updatedUserData.userType === "employee") {
      collectionName = "employees"
    } else {
      collectionName = "default_collection" // You can specify a default collection name
    }

    const userRef = await addDoc(collection(db, collectionName), {
      ...updatedUserData,
      uid: user.uid, // Ensure user UID is also stored
    })

    return userRef.id // Return the document ID
  } catch (error) {
    throw error // Throw any errors encountered
  }
}

export const loginUserWithEmailAndPassword = async (auth, email, password) => {
  try {
    // 1. Attempt sign-in with email and password
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )

    // 2. Check if email verification is complete
    if (!userCredential.user.emailVerified) {
      throw new Error("Email verification required. Please check your inbox.")
    }

    // 3. Return the verified user if email is verified
    return userCredential.user
  } catch (error) {
    console.error("Error logging in:", error.message)
    throw new Error("Login failed: " + error.message) // Re-throw error for handling
  }
}

export const getCurrentUser = (auth) => {
  return getAuth(auth).currentUser
}

export const getUserType = async () => {
  try {
    // 1. Get the currently logged-in user
    const user = auth.currentUser

    // 2. Check if a user is logged in
    if (!user) {
      throw new Error("No user logged in")
    }

    const userId = user.uid

    // 3. Query park_owners collection for matching user ID
    const parkOwnersQuery = query(
      collection(db, "park_owners"),
      where("uid", "==", userId)
    )
    const parkOwnersSnapshot = await getDocs(parkOwnersQuery)

    if (!parkOwnersSnapshot.empty) {
      const parkOwnerData = parkOwnersSnapshot.docs[0].data()
      return parkOwnerData.userType // Assuming "userType" exists in park owner data
    }

    // 4. Query employees collection for matching user ID
    const employeesQuery = query(
      collection(db, "employees"),
      where("uid", "==", userId)
    )
    const employeesSnapshot = await getDocs(employeesQuery)

    if (!employeesSnapshot.empty) {
      const employeeData = employeesSnapshot.docs[0].data()
      return employeeData.userType // Assuming "userType" exists in employee data
    }

    throw new Error("User not found in park owners or employees collections")
  } catch (error) {
    console.error("Error fetching user type:", error.message)
    return null // Or throw an error if you prefer
  }
}

export const storeParkingTicket = async (ticketData) => {
  try {
    // Add a new document with auto-generated ID to the "parking_tickets" collection
    const docRef = await addDoc(collection(db, "parking_tickets"), ticketData)
    console.log("Ticket created with ID: ", docRef.id)
    return docRef.id // Return the ID of the created document
  } catch (error) {
    console.error("Error creating ticket:", error.message)
    throw error // Throw any errors encountered
  }
}

export const fetchAllParkingTickets = async () => {
  try {
    const ticketsCollection = collection(db, "parking_tickets")
    const querySnapshot = await getDocs(ticketsCollection)
    const tickets = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    return tickets
  } catch (error) {
    console.error("Error fetching parking tickets:", error.message)
    throw error
  }
}

// export const deleteParkingTicket = async (ticketId) => {
//   try {
//     // Get a reference to the ticket document
//     const ticketRef = doc(db, "parking_tickets", ticketId)

//     // Delete the document
//     await deleteDoc(ticketRef)

//     console.log("Ticket deleted successfully")
//   } catch (error) {
//     console.error("Error deleting ticket:", error.message)
//     throw error
//   }
// }

export const deleteAndStoreParkingTicket = async (ticketId) => {
  try {
    // Get a reference to the ticket document
    const ticketDocRef = doc(db, "parking_tickets", ticketId)

    // Attempt to retrieve the ticket data with a timeout
    const ticketSnap = await getDoc(ticketDocRef, { timeout: 10000 }) // Timeout in milliseconds

    // Check if the document exists and timed out
    if (!ticketSnap.exists || ticketSnap.timedOut) {
      console.warn("Ticket not found or timed out:", ticketId)
      return // Exit if ticket not found or timed out
    }

    const ticketData = ticketSnap.data()

    // Check if ticketData is valid
    if (!ticketData) {
      console.warn("Invalid ticket data:", ticketId)
      return // Exit if ticketData is invalid
    }

    // Store ticket data in "paid_parking_tickets" collection (use addDoc for auto-generated ID)
    const paidTicketRef = await addDoc(
      collection(db, "paid_parking_tickets"),
      ticketData
    )

    // Delete the ticket from "parking_tickets" collection
    await deleteDoc(ticketDocRef)

    console.log("Ticket stored and deleted successfully.")
  } catch (error) {
    console.error("Error deleting and storing ticket:", error.message)
    throw error // Re-throw for error handling
  }
}

export { auth, db }
