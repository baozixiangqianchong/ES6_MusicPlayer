window.addEventListener("load", () => {
    const script = document.createElement("SCRIPT");
    const script1 = document.createElement("SCRIPT");

    script.src = "./js/home/home.js";
    script1.src = "./js/home/carousel.js";

    script.setAttribute("type", "module");
    document.querySelector("body").appendChild(script)
    script1.setAttribute("type", "module");
    document.querySelector("body").appendChild(script1)
})