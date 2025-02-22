document.getElementById("simulate").addEventListener("click", async () => {
    const code = editor.innerText;
    const script = new Function(code);
    await executeFunction(script);

    try{
        delay = Math.floor(Math.random() * 100);
        for (let i = 0; i < 100; i++) {
            document.querySelector("#frame > textarea").value += "#";
            await sleep(delay);
        }

        if (delay - document.querySelector("#frame > p > span").textContent < 50) {
            alert("Correct");
            window.location.href = "/increment/" + Math.floor(new Date().getTime() / 1000);
        } else {
            alert("Incorrect");
            return
        }
    }catch(e){
        alert("Incorrect");
        return
    }
})