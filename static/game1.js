document.getElementById("simulate").addEventListener("click", async () => {
    const code = editor.innerText;
    const script = new Function(code);
    if (await executeFunction(script) == "hello world"){
        alert("Correct");
        window.location.href = "/increment/" + Math.floor(new Date().getTime() / 1000);
    }
})