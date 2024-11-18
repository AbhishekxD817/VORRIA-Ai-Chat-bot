
import fetch from "node-fetch"; // Only needed for Node.js, not needed in the browser
import AppError from "../ErrorHandlers/AppError.js";


export const launchExecution = async (prompt) => {

    const payload = { "prompt": `${prompt}` }
    const response = await fetch(process.env.EDEN_EXE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.EDEN_AI_API_KEY}`
        },
        body: JSON.stringify(payload)
    });
    const result = await response.json()
    return result.id;
    // result.id is used to get output from get execution
}


export const getExecution = async (id) => {
    const response = await fetch(`${process.env.EDEN_EXE_URL}${id}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.EDEN_AI_API_KEY}`
        },
    });
    const result = await response.json();
    return result;
    // result.contents.results[0].generated_text;
}



export const getResponse = async (prompt) => {

    let exeId = await launchExecution(prompt);
    await new Promise(resolve => setTimeout(resolve, 1500));


    let statusOfExecution = "running";
    let output;
    while (statusOfExecution === "running") {
        await new Promise(resolve => setTimeout(resolve, 1000));
        output = await getExecution(exeId);
        statusOfExecution = output.content.status;
    }

    if (statusOfExecution !== "success") {
        return next(new AppError(500, "Error Occured While Generating Output data"))
    }
    return output.content.results.output.results[0].output;
    
}
