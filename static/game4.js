document.getElementById("simulate").addEventListener("click", async () => {
    const code = editor.innerText;
    const script = new Function(code);
    await executeFunction(script);

    try {
        if (document.querySelector("#frame > button#counterBtn").textContent == "0") {
            await sleep(500);
            for (i = 1; i < 10; i++) {
                document.querySelector("#frame > button#counterBtn").click()
                if (document.querySelector("#frame > button#counterBtn").textContent != i) {
                    alert("Incorrect");
                    return
                }
            }
            alert("Correct");
            window.location.href = "/increment/" + Math.floor(new Date().getTime() / 1000);
        }else{
            alert("Incorrect");
            return
        }
    }catch(e){
        alert("Incorrect");
        return
    }
})
