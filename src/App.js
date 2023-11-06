import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import './App.css';
import { db } from './Firebase/Config';
import { useState } from 'react';
import Home from './Home';
import { Button, Card, Col, Row } from 'react-bootstrap';

function App() {
  const [isHome,setIsHome] = useState(false);
  const [isMain,setIsMain] = useState(true);
  const [prevChoice,setPrevChoice] = useState('');

  const fetchAlldata = async (choice) =>{
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
            setIsHome(true)
          } catch (error) {
              console.error("Error fetching data:", error);
          }
        }

  const choices = [{topic : 'HTML',image : 'https://www.freeiconspng.com/thumbs/html5-icon/html5-icon-1.png'},
  {topic : 'CSS',image : 'https://cdn-icons-png.flaticon.com/512/5968/5968242.png'},
  {topic : 'JS',image : 'https://cdn.iconscout.com/icon/free/png-256/free-javascript-2038874-1720087.png'}]

  const handleOption = (choice)=>{
    console.log(prevChoice);
    if(prevChoice === ''){
      console.log('1');
      setPrevChoice(JSON.parse(localStorage.getItem('prevChoice')));
      if(prevChoice != choice){
        console.log('4');
        localStorage.setItem('prev', JSON.stringify(choice));
        setPrevChoice(choice);
        localStorage.setItem('allData', JSON.stringify([]));
        fetchAlldata(choice.toLowerCase())
      }
    }
    else if(prevChoice === choice){
      console.log('2');
    }
    else{
      console.log('3');
      localStorage.setItem('prev', JSON.stringify(choice));
      setPrevChoice(choice);
      console.log(typeof choice);
      localStorage.setItem('allData', JSON.stringify([]));
      fetchAlldata(choice.toLowerCase())
    }
    setIsMain(false)
    setIsHome(true)
  } 

  const updateComponent =()=>{
    setIsMain(true)
    setIsHome(false)
  }

  return (
      <div  className='head' style={{height:'100vh'}}>
        {isMain?<h1 className='m-5 animate-charcter text-center fw-bold'>QUIZ APP</h1>:''}
        <Row className='justify-content-center'>
            {isMain?
              choices.map((choice,index)=>(
                <Col className='shadow-lg m-1 p-3 d-flex justify-content-center bg-dark' key={index} sm={12} md={3} lg={3}>
                  <Card className='shadow-lg p-2 head border border-dark' style={{ width: '15rem'}}>
                    <Card.Img variant="top" src={choice.image} />
                    <Card.Body className='d-flex justify-content-center align-items-center'>
                      <Button className='btn btn-dark' onClick={()=>{handleOption(choice.topic)}}>START QUIZ</Button>
                    </Card.Body>
                </Card>
              </Col>
              
              ))
              :
              null
            }
            {isHome?<Home fetchAlldata={fetchAlldata} prevChoice={prevChoice} updateComponent={updateComponent}/>:null}
        </Row>
      </div>
  );
}

export default App;

// to GET each document from a collection
          // const docRef = doc(db, 'html','1'); // Replace 'your-document-id' with the actual document ID
          // const docSnap = await getDoc(docRef);        
          // if (docSnap.exists()) {
          //   console.log("Document data:", docSnap.data());
          // } else {
          //   console.log("No such document!");
          // }
