let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let catogry=document.getElementById('catogry');
let submit=document.getElementById('submit');
let mood='Creat'
let tmp;
// get total/////
// console.log(title,price,taxes,ads,discount,total,count,catogry,submit)
function getTotal(){
    if(price.vaule !=''){
        let result =(+price.value + +taxes.value + +ads.value)
        - +discount.value;
        total.innerHTML=result;
        total.style.background='#040';
        
    }
    else{
        total.innerHTML='';
        total.style.background='#a00d02';
    }
}

// creat pro///
let datapro;
if(localStorage.product!=null)
{
    datapro=JSON.parse(localStorage.product)
}else{
 datapro=[];
}


submit.onclick=function(){
let newpro={
    title:title.value,
    price:price.value,
    taxes:taxes.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    catogry:catogry.value,


}
if(title.value!='' && price.value!='' &&catogry.value!=''&& newpro.count<100){
if(mood==='Creat'){ 
    if(newpro.count > 1){
        for(let i=0; i<newpro.count;i++){
            datapro.push(newpro);
    
        }
    }
    else{
    datapro.push(newpro);
    }
}

else{
    datapro[  tmp  ]=newpro;
    mood='Creat';
    submit.innerHTML='Creat'
    count.style.display='block'
}
clearData()
}
// savelocalstorge////
localStorage.setItem('product' ,  JSON.stringify(datapro) )

clearData()
 showdata()

}
// clear inputs///
function clearData(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    catogry.value='';

}

// read////
function showdata(){
    let table ='';
    for (let i=0; i<datapro.length; i++){
        table += `
        <tr>
            <td>${i}</td>
       <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].catogry}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button  onclick="deletdata(${i})" id="delete">delete</button></td>
            
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML=table;
    let btndelete=document.getElementById('deleteall');
    if(datapro.length>0){
        btndelete.innerHTML=`
                <button onclick="deleteall()">deleteAll(${datapro.length})</button>

        `
    }else{
        btndelete.innerHTML='';
    }
}
showdata()



// delet///
function deletdata(i){
datapro.splice(i,1);
localStorage.product=JSON.stringify(datapro)
showdata()
}
function deleteall(){
    localStorage.clear()
    datapro.splice(0)
    showdata()
}


// update
function updateData(i){
    title.value=datapro[i].title;
    price.value=datapro[i].price;
    taxes.value=datapro[i].taxes;
    ads.value=datapro[i].ads;
    discount.value=datapro[i].discount;
    catogry.value=datapro[i].catogry;
       getTotal()
    
    count.style.display='none';
submit.innerHTML='update'
mood='update';
tmp=i;
}

// search
let searchmood='title';
 function getsearchmood (id)
 {
    let Search =document.getElementById('Search');
    if(id=='searchtitle'){
         searchmood='title';
         Search.placeholder='Search By Title';
     }else{
        searchmood='catogry';
        Search.placeholder='Search By Category';
   }
   Search.focus()
}

function searchdata(value){
    let table='';
 
    if (searchmood=='title')
    {
        for (let i = 0; i < datapro.length; i++) {
if (datapro[i].title.includes(value)) {

    table += `
        <tr>
            <td>${i}</td>
       <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].catogry}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button  onclick="deletdata(${i})" id="delete">delete</button></td>
            
        </tr>
        `;


}            
        }
    }else{
        for (let i = 0; i < datapro.length; i++) {
            if (datapro[i].catogry.includes(value)) {
                table += `
                    <tr>
                        <td>${i}</td>
                   <td>${datapro[i].title}</td>
                    <td>${datapro[i].price}</td>
                    <td>${datapro[i].taxes}</td>
                    <td>${datapro[i].ads}</td>
                    <td>${datapro[i].discount}</td>
                    <td>${datapro[i].total}</td>
                    <td>${datapro[i].catogry}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button  onclick="deletdata(${i})" id="delete">delete</button></td>
                        
                    </tr>
                    `;
            
            
            }            
                    }
    }
    document.getElementById('tbody').innerHTML=table;

}
 
   






