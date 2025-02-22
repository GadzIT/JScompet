document.getElementById("simulate").addEventListener("click", async () => {
    const code = editor.innerText;
    const script = new Function(code);
    await executeFunction(script);

    const enterEvent = new KeyboardEvent("keydown", {
        key: "Enter",
        keyCode: 13,
        bubbles: true
    });

    try {
        input = document.querySelector("#frame > input");
        ["abc", "def", "ghi", "jkl", "mno", "pqr", "stu", "vwx", "yz"].forEach((letter) => {
            input.value = letter;
            input.dispatchEvent(new Event("input", { bubbles: true }));
            input.dispatchEvent(enterEvent);
        });

        const result = document.querySelectorAll("#frame > ul > li").map((item) => item.innerText.strip());
        console.log(result);
        if (result == ["abc", "def", "ghi", "jkl", "mno", "pqr", "stu", "vwx", "yz"]) {
            alert("Correct");
            window.location.href = "/increment/" + Math.floor(new Date().getTime() / 1000);
            return;
        }
    }catch(e){
        alert("Incorrect");
        return
    }
})
