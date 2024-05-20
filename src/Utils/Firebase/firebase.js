import { initializeApp } from "firebase/app"
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
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
  const auth = getAuth()

  const currentUser = auth.currentUser
  try {
    if (!currentUser) {
      throw new Error("No user is currently logged in.")
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    )
    const user = userCredential.user

    await sendEmailVerification(user)

    const updatedUserData = {
      ...userData,
      userType: userData.userType || "default",
      uid: user.uid, 
    }

    let collectionName
    let userRef

    if (updatedUserData.userType === "parkOwner") {
      collectionName = "park_owners"
      userRef = doc(db, collectionName, user.uid)
      await setDoc(userRef, updatedUserData)
    } else if (updatedUserData.userType === "employee") {
      collectionName = "employees"
      updatedUserData.parkOwnerId = currentUser.uid
      userRef = await addDoc(collection(db, collectionName), updatedUserData)
    } else {
      collectionName = "default_collection"
      userRef = await addDoc(collection(db, collectionName), updatedUserData)
    }

    return userRef.id
  } catch (error) {
    console.error("Error creating user:", error.message)
    throw error
  }
}

export const loginUserWithEmailAndPassword = async (auth, email, password) => {
  try {
    if (auth.currentUser) {
      await signOut(auth)
      console.info("Previous user logged out. Proceeding with new login.")
    }

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )

    if (!userCredential.user.emailVerified) {
      throw new Error("Email verification required. Please check your inbox.")
    }

    return userCredential.user
  } catch (error) {
    console.error("Error logging in:", error.message)
    throw new Error("Login failed: " + error.message)
  }
}

export const getCurrentUser = (auth) => {
  return getAuth(auth).currentUser
}

export const getUserType = async () => {
  try {
    const user = auth.currentUser

    if (!user) {
      throw new Error("No user logged in")
    }

    const userId = user.uid

    const parkOwnersQuery = query(
      collection(db, "park_owners"),
      where("uid", "==", userId)
    )
    const parkOwnersSnapshot = await getDocs(parkOwnersQuery)

    if (!parkOwnersSnapshot.empty) {
      const parkOwnerData = parkOwnersSnapshot.docs[0].data()
      return parkOwnerData.userType
    }

    const employeesQuery = query(
      collection(db, "employees"),
      where("uid", "==", userId)
    )
    const employeesSnapshot = await getDocs(employeesQuery)

    if (!employeesSnapshot.empty) {
      const employeeData = employeesSnapshot.docs[0].data()
      return employeeData.userType
    }

    throw new Error("User not found in park owners or employees collections")
  } catch (error) {
    console.error("Error fetching user type:", error.message)
    return null
  }
}

export const storeParkingTicket = async (ticketData) => {
  try {
    const docRef = await addDoc(collection(db, "parking_tickets"), ticketData)
    console.log("Ticket created with ID: ", docRef.id)
    return docRef.id
  } catch (error) {
    console.error("Error creating ticket:", error.message)
    throw error
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
    const ticketDocRef = doc(db, "parking_tickets", ticketId)

    const ticketSnap = await getDoc(ticketDocRef, { timeout: 10000 })

    if (!ticketSnap.exists || ticketSnap.timedOut) {
      console.warn("Ticket not found or timed out:", ticketId)
      return
    }

    const ticketData = ticketSnap.data()

    if (!ticketData) {
      console.warn("Invalid ticket data:", ticketId)
      return
    }

    const paidTicketRef = await addDoc(
      collection(db, "paid_parking_tickets"),
      ticketData
    )

    await deleteDoc(ticketDocRef)

    console.log("Ticket stored and deleted successfully.")
  } catch (error) {
    console.error("Error deleting and storing ticket:", error.message)
    throw error
  }
}

export const logoutUser = async () => {
  try {
    await signOut(auth)
    console.log("User logged out successfully.")
  } catch (error) {
    console.error("Error logging out:", error.message)
    throw error
  }
}

export const fetchParkingSlots = async () => {
  try {
    const auth = getAuth()
    const currentUser = auth.currentUser

    if (!currentUser) {
      console.log("No user is currently logged in.")
      return null
    }

    const userDocRef = doc(db, "employees", currentUser.uid)

    const userSnapshot = await getDoc(userDocRef)

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data()

      console.log("Fetched user data:", userData)

      if (!userData || !userData.parkOwnerId) {
        console.log(
          "User data does not contain parkOwnerId or userData is undefined."
        )
        return null
      }

      const parkOwnerId = userData.parkOwnerId

      const parkOwnerDocRef = doc(db, "park_owners", parkOwnerId)

      const parkOwnerSnapshot = await getDoc(parkOwnerDocRef)

      if (parkOwnerSnapshot.exists()) {
        const parkOwnerData = parkOwnerSnapshot.data()

        console.log("Fetched park owner data:", parkOwnerData)

        const zoneData = parkOwnerData.zones || {} 

        const convertZonesToParkingSlots = (zones) => {
          const parkingSlots = []

          for (const [zone, slots] of Object.entries(zones)) {
            slots.forEach((slot) => {
              parkingSlots.push({
                zone: zone.replace("Zone ", ""), 
                slot: slot.id,
                available: slot.available,
              })
            })
          }

          return parkingSlots
        }

        const parkingSlots = convertZonesToParkingSlots(zoneData)

        return parkingSlots
      } else {
        console.log("No park owner document found for:", parkOwnerId)
      }
    } else {
      console.log("No user document found for:", currentUser.uid)
      return null 
    }
  } catch (error) {
    console.error("Error fetching user data:", error.message)
    throw new Error("Failed to fetch user data: " + error.message)
  }
}

// export const fetchParkingSlots = async () => {
//   try {
//     const querySnapshot = await getDocs(collection(db, "parkingSlots"))
//     const parkingSlots = []
//     querySnapshot.forEach((doc) => {
//       parkingSlots.push({ id: doc.id, ...doc.data() })
//     })
//     return parkingSlots
//   } catch (error) {
//     console.error("Error fetching parking slots:", error.message)
//     throw new Error("Failed to fetch parking slots: " + error.message)
//   }
// }

export { auth, db }
