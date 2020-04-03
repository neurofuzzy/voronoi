import {range,button_input,button,circle,html,br,get_seeds} from "./index.js"

const b = document.body
const default_nb_seeds = 50;
let svg_seeds = []

function remove_seeds(){
    svg_seeds.forEach((el)=>{
        if(el.parentElement != null){//not understood why needed
            el.parentElement.removeChild(el)
        }
    })
}

function add_seeds(svg_div,r_seeds){
    const w = svg_div.width.baseVal.value
    //issue not full height
    const h = svg_div.height.baseVal.value
    console.log(`seeding in w:${w} ; h:${h}`)
    const seeds = get_seeds(r_seeds.value,w,h)
    seeds.forEach((s)=>{
        let c = circle(svg_div,s.x,s.y,`c_${s.id}`)
        svg_seeds.push(c)
        //console.log(`${c.id} / ${c.parentElement.id}`)
    })
}

function main(){
    let svg_div = html(b,"svg",
    /*html*/`<svg id="main_svg" xmlns="http://www.w3.org/2000/svg" width="100%" height=80%></svg>`
    );
    let rect = html(svg_div,"rect",
    /*html*/`<rect width="100%" height="100%" style="fill:rgb(255,250,245)"></rect>`
    );
    //let c2 = circle(svg_div,50,60)
    br(b)
    let seeds_btn = button(b,"btn_seed",`${default_nb_seeds} seeds`);
    let r_seeds = range(b,default_nb_seeds * 2)
 
    seeds_btn.addEventListener("click",(e)=>{
        remove_seeds()
        add_seeds(svg_div,r_seeds)
    })
    r_seeds.addEventListener("input",(e)=>{
        seeds_btn.innerHTML = `${r_seeds.value} seeds`
        remove_seeds()
        add_seeds(svg_div,r_seeds)
    })
}

main();
