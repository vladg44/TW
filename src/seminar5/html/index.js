const apiUrl = 'http://localhost:8000/api/'

async function get(url) {
    return (await axios.get(url)).data
}

async function post(url, body) {
    return (await axios.post(url, JSON.stringify(body), { headers: { 'Content-Type': 'application/json' } })).data
}

async function loadItem(id){
    let itemDiv = document.getElementById('dataById');
    let data = await get(apiUrl + "getItem/" + id);
    //i want it to show on the screen in the databyID div
    if (!data || !itemDiv) {
        return;
    }
    

    // 1. Creezi un array gol pentru noul HTML
    let myHtmlCode = [];

    // 2. Construiești HTML-ul care va merge ÎN INTERIORUL div-ului
    myHtmlCode.push('<h3> Item Details </h3>');
    myHtmlCode.push(`<p> Id: ${data.id} </p>`);
    myHtmlCode.push(`<p> Name: ${data.name} </p>`);
    myHtmlCode.push(`<p> Age: ${data.age} </p>`);

    // 3. Setezi conținutul div-ului. 
    // Acest lucru șterge automat orice era vechi și pune noul conținut.
    itemDiv.innerHTML = myHtmlCode.join("");
}

async function getDataById(){
    let id = document.getElementById('inputId').value;
    if (!id) {
        alert('You must enter an id');
        return;
        
    }
    await loadItem(id);
}



async function loadTable() {
    let data = await get(apiUrl + "getList")
    let tableDiv = document.getElementById('tableData')

    if (!data || !tableDiv) {
        return
    }
    let myTable = document.getElementById('myTable')
    if (myTable)
        myTable.remove
    let myHtmlCode = []
    myHtmlCode.push("<table id='myTable' >")
    myHtmlCode.push('<thead>')
    myHtmlCode.push('<tr> <th hidden> Id </th> <th> Name </th> <th> Age </th> </tr>')
    myHtmlCode.push('</thead>')
    myHtmlCode.push('<tbody>')

    for (let item of data)
        myHtmlCode.push(`<tr> <td hidden> 
    ${item.id} </td> <td> ${item.name} </td> <td> ${item.age} </td> </tr>`)

    myHtmlCode.push('</tbody>')
    myHtmlCode.push('</table>')

    tableDiv.innerHTML = myHtmlCode.join("")
}

async function sendData() {
    let name = document.getElementById('inputName').value
    let age = document.getElementById('inputAge').value

    if (!name || !age) {
        alert('You must enter a name and a age')
        return
    }

    await post(apiUrl + "postList", { name: name, age: age })
    await loadTable()

}

loadTable()