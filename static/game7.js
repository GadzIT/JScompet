document.getElementById("simulate").addEventListener("click", async () => {
    const code = editor.innerText;
    const script = new Function(code);
    if (await executeFunction(script) - 0 == 103) {
        alert("Correct");
        window.location.href = "/increment/" + Math.floor(new Date().getTime() / 1000);
    }
    else {
        alert("Incorrect")
        return
    }
    
})
