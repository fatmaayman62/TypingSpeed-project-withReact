import { useState, useEffect } from "react";

function Results() { 
    const [dataResults, setDataResults] = useState([]);

    function deleteBox(x){
        let temp=dataResults.filter((item,index)=> index !== x)
        console.log(temp);
        setDataResults(temp);
        localStorage.setItem("resultTyping",JSON.stringify(dataResults)); 
    }

    useEffect(() => {
        // Load results from localStorage when component mounts
        const storedResults = localStorage.getItem("resultTyping");
        if (storedResults) {
            setDataResults(JSON.parse(storedResults));
        }
    }, []);

    return (
        <>
        <div className="allResults">

            {dataResults.map((item, index) => (
                <div className="ShowResults" key={index}>
                    <article>{item.article_typing}</article>
                    <div className="results">
                        <div className="box">
                            <h2>WPM</h2>
                            <span>{item.wpm_typing}</span>
                        </div>
                        <div className="box">
                            <h2>Time</h2>
                            <span>{item.time_typing}s</span>
                        </div>
                        <div className="box">
                            <h2>Accuracy</h2>
                            <span>{item.accuracy_typing}%</span>
                        </div>
                    </div>
                        <button className="delete" onClick={()=>{deleteBox(index)}}>Delete</button>
                </div>
            ))}
        </div>
        </>
    );
}

export default Results;