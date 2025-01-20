import Button from '@mui/material/Button';
import { db } from './firebase';
import { collection, getDocs } from "firebase/firestore"; 

export default async function  Home() {
  const querySnapshot = await getDocs(collection(db, "test"));
  querySnapshot.forEach((doc) => {
    console.log(doc.data())                                    
  });

  return (
    <div>
      homePage
      <Button variant="contained">Hello world</Button>
    </div>
  );
}
