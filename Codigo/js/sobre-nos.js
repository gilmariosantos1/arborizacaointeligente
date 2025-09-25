function showNav() {
    const btn = document.getElementById("menu_btn");
    const nav = document.getElementById('nav_drop');
    const all = document.getElementById('all');

    nav.style.display = "block";
    all.style.display = "block";
    
    // btn.addEventListener("click", () => {
    //     if(nav.style.display == "block") {
    //         nav.style.display = "none";
    //         all.style.display = "none";
    //     }
    // });
    all.addEventListener("click", () => {
        if(nav.style.display == "block") {
            nav.style.display = "none";
            all.style.display = "none";
        }
    });
}