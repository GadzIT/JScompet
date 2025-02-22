document.getElementById("simulate").addEventListener("click", async () => {
    const code = editor.innerText;
    const script = new Function(code);
    await executeFunction(script);

    try{
        delay = Math.floor(Math.random() * 100);
        if (document.querySelector("#frame").textContent == "Yipeee") {
            alert("Correct")
            window.location.href = "/increment/" + Math.floor(new Date().getTime() / 1000);
        } else {
            alert("Incorrect")
            return
        }
    }catch(e){
        alert("Incorrect");
        return
    }
})