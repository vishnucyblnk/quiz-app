import { db } from './Firebase/Config';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

export const fetchAll = async (choice) =>{
    console.log(choice);
    // to GET a database collection completely
      try {
        const collectionRef = collection(db, choice);
        const querySnapshot = await getDocs(collectionRef);
        const allDoc = [];
        querySnapshot.forEach((doc) => {
            allDoc.push({ id: doc.id, data: doc.data() });
        });
        localStorage.setItem('allData',JSON.stringify(allDoc))
        console.log("fetched data successfully");
      } catch (error) {
          console.error("Error fetching data:", error);
      }
    }

