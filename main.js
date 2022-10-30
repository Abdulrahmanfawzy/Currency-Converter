let num = document.querySelector("#num");
let select_from = document.querySelector("#select_from");
let select_to = document.querySelector("#select_to");
let result = document.querySelector(".result");
let button = document.querySelector(".convert_btn button");
let spinner = document.querySelector(".spinner");

function converter(){
   fetch("https://api.exchangerate.host/latest")
   .then(res => res.json())
   .then(data =>{
      let {rates} = data;
      for(const item in rates){
         let box = `
            <option value="${item}">${item}</option>
         `
         select_from.innerHTML += box;
         select_to.innerHTML += box;
      }

      // ---------------------------------

      changeFrom(select_from , select_to , num);


   })
}

converter();

function changeFrom(s_from , s_To , amount){
   button.addEventListener("click" , (e)=>{
      e.preventDefault();
      
      let froms =  s_from.value;
      let Tos =  s_To.value;
      let count = +amount.value;
      if(count != ""){
         if(froms != Tos){

            spinner.style.display = "flex";
            fetch(`https://api.exchangerate.host/convert?from=${froms}&to=${Tos}&amount=${count}`)
            .then(res => res.json())
            .then(data =>{
               let val = (data.result).toFixed(3);
               result.innerHTML = val + " " + Tos;
               spinner.style.display = "none";
            })
         }else{
            alert("you have to change from or to ..!");
         }
      }else{
         alert("Write the Amount");
      }
   })

}