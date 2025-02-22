document.getElementById("simulate").addEventListener("click", () => {
    const code = editor.innerText;
    const script = new Function(code);
    if (executeFunction(script) == "hello world"){
        alert("Correct");
        window.location.href = "/increment/" + Math.floor(new Date().getTime() / 1000);
    }
})