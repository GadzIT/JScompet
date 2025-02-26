document.getElementById("simulate").addEventListener("click", async () => {
    const code = editor.innerText;
    const script = new Function(code);
    await executeFunction(script);

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
