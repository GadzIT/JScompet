document.getElementById("simulate").addEventListener("click", async () => {
    const code = editor.innerText;
    one_verified = false;
    const script = new Function(code);
    await executeFunction(script);

    try {
        if (document.querySelector("#frame").textContent == "GadzIT") {
            await sleep(500);
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
