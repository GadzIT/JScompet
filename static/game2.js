document.getElementById("simulate").addEventListener("click", async () => {
    const code = editor.innerText;
    one_verified = false;
    const script = new Function(code);
    await executeFunction(script);

    console.log("hello worldddddddddddddd");

    try {
        if (document.querySelector("#frame > button#clickme").textContent == "click me") {
            await sleep(500);
            if (autoClickAndGetLogs(document.querySelector("#frame > button#clickme")) == "hello world") {
                alert("Correct");
                window.location.href = "/increment/" + Math.floor(new Date().getTime() / 1000);
            }
        }else{
            alert("Incorrect");
            return
        }
    }catch(e){
        alert("Incorrect");
        return
    }
})
