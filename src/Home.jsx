import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
function Home({prevChoice,updateComponent}) {
    const [show, setShow] = useState(false);
    const [allTask,setAllTask] = useState([]);
    const [indx,setIndx] = useState(0);
    const [score,setScore] = useState({
        correct : 0, wrong : 0 , unans : 0
    });
    const [selectedButton, setSelectedButton] = useState(-1);


    useEffect(() => {
        handleDisp();
      }, [allTask   ]);
    

    const handleDisp = ()=>{
        try {
            const storedTask = JSON.parse(localStorage.getItem('allData'));
            if (storedTask) {
                setAllTask(storedTask);
            } else {
                setAllTask([]);
            }
        } catch (error) {
            console.error('Error parsing data from local storage:', error);
            setAllTask([]);
        }
    }

    const handleComplete = ()=> {
        if(selectedButton === allTask[indx].data.answer){
            setScore((prevScore)=> ({...prevScore, correct : prevScore.correct + 1}))
        }
        else if(selectedButton === -1){
            setScore((prevScore) => ({...prevScore, unans : prevScore.unans + 1}))
        }
        else {
            setScore((prevScore) => ({...prevScore, wrong : prevScore.wrong + 1}))
        }
        setShow(true)
        console.log(score);
        // localStorage.setItem('allData', JSON.stringify([]));
    }
    const handleScore = ()=>{
        if(selectedButton === allTask[indx].data.answer){
            setScore((prevScore)=> ({...prevScore, correct : prevScore.correct + 1}))
        }
        else if(selectedButton === -1){
            setScore((prevScore) => ({...prevScore, unans : prevScore.unans + 1}))
        }
        else {
            setScore((prevScore) => ({...prevScore, wrong : prevScore.wrong + 1}))
        }
        console.log(score);
        handleNext()
    }
    const handleNext = ()=>{
        if(indx === allTask.length-1){
            setIndx(0);
            setAllTask([]);
            // localStorage.setItem('allData', JSON.stringify([]));
            updateComponent();
        }
        else{
            setIndx(indx + 1);
            setSelectedButton(-1)
        }
    }
    const handleClose = ()=>{
        setShow(false);
        setScore({
            correct : 0 , wrong : 0 , unans : 0
        })
        updateComponent();
    }

    const handleButtonClick = (option) => {
        setSelectedButton(option);
    }
    
    const handleQuest = ()=>{
            if (allTask.length === 0) {
                return null;
            }
            else if(indx === allTask.length){
                handleComplete()         
            }
            else{ 
                return (
                    <>
                        <div key={allTask[indx].id} className='d-flex align-items-center justify-content-between ps-5 pt-1 pb-3 pe-5 mb-3 text-dark'>
                            <h3 className='fw-bolder'>{allTask[indx].data.question}</h3>
                        </div>
                        {
                            allTask[indx].data.options.map((item,index)=>(
                                <div key={item.id} className='d-flex flex-column ps-5 pe-5'>
                                    <button onClick={() => handleButtonClick(index)} className={`fw-bolder mb-3 p-3 btn ${selectedButton === index ? 'btn-info' : 'btn-outline-dark'}`} type='button' >{item}</button> 
                                </div>
                            )) 
                        }     
                        <div className="d-flex justify-content-end ps-5 pe-5">
                                {
                                    indx <= allTask.length-2? (
                                        <button onClick={handleScore} className="btn btn-dark ps-5 pt-3 pb-3 pe-5 me-5">Next</button>
                                    ) : (
                                        <button onClick={handleComplete} className="btn btn-primary ps-5 pt-3 pb-3 pe-5 me-5">Finish</button>
                                    )
                                }
                        </div>        
                    </>  
                )
            }
    }
    return (
        <>
            <div className='d-flex justify-content-center align-items-center'>
                <h1 className='mt-4 fw-bold text-center text-dark'>{prevChoice} QUIZ</h1>
            </div>
            <div className='d-flex flex-column ps-5 pe-5'>
                <div className='d-flex align-items-center justify-content-end pe-5 '>
                    <h2 className='border bg-dark border-info p-2 rounded text-light'>{indx+1}/10</h2>
                </div>
                {   
                    handleQuest()
                }  

            </div>
            
            <Modal className='text-dark' show={show}>
                <Modal.Header>
                    <h1 className='fw-bold'>RESULT</h1>
                </Modal.Header>

                <Modal.Body>
                    {
                        (score.correct > 5) ? <h3 className='fw-bolder'><span className='text-success'> PASSED</span></h3> : <h3 className='fw-bolder'><span className='text-danger'>FAILED</span></h3>
                    }
                    <h4>Correct Answer : {score.correct}</h4>
                    <h4>Wrong Answer : {score.wrong}</h4>
                    <h4>Unanswered : {score.unans}</h4>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button className='btn btn-primary' onClick={handleLevel('css')}>Next Level</Button> */}
                    <Button className='btn btn-primary' onClick={handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default Home