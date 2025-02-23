document.getElementById("simulate").addEventListener("click", async () => {
    const code = editor.innerText;
    const script = new Function(code);
    await executeFunction(script);

    console.log(document.querySelector("#frame > button#counterBtn").textContent)

    try {
        if (document.querySelector("#frame > button#counterBtn").textContent == "0") {
            await sleep(1000);
            for (i = 1; i <= 10; i++) {
                await sleep(100);
                document.querySelector("#counterBtn").click()
            }

            if (document.querySelector("#frame > button#counterBtn").textContent != 10) {
                alert("counter not working");
                return
            }
            alert("Correct");
            window.location.href = "/increment/" + Math.floor(new Date().getTime() / 1000);
        }else{
            alert("button not reset");
            return
        }
    }catch(e){
        alert(e);
        return
    }
})
