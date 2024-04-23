// function createTable(data) {
//     var table = document.createElement('table');
//     var thead = table.createTHead();
//     var tbody = table.createTBody();

//     // Create table header
//     var headerRow = thead.insertRow();
//     Object.keys(data[0]).forEach(function(key) {
//         var th = document.createElement('th');
//         th.textContent = key;
//         headerRow.appendChild(th);
//     });

//     // Create table rows
//     data.forEach(function(item) {
//         var row = tbody.insertRow();
//         Object.values(item).forEach(function(value) {
//             var cell = row.insertCell();
//             cell.textContent = value;
//         });
//     });

//     return table;
// }

// // Fetch data from Python file
// fetch('data.py')
//     .then(response => response.text())
//     .then(data => {
//         // Evaluate the Python code to get the data
//         eval(data);

//         // Create and append the table to the HTML body
//         document.body.appendChild(createTable(data));
//     })
//     .catch(error => console.error('Error fetching data:', error));


function submit_button() {
    const productName = document.getElementById("textinput").value.trim();
    if (productName == "") {
        document.getElementById("textinput").placeholder = "Please enter some text";
    } else {
        fetch(`http://localhost:5000/products?product_name=${productName}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("head").remove()
            document.getElementById("textinput").remove()
            document.getElementById("submitbutton").remove() 
                data.forEach((item, index) => {
                        const parentDiv = document.createElement("div");
                        parentDiv.style.display = "flex";
                        parentDiv.style.alignItems = "center";
                        parentDiv.style.justifyContent = "center";
                        parentDiv.style.marginTop = "20px";


                        const image = document.createElement("img");
                        image.src = item.image_url;
                        image.alt = item.title;
                        image.style.width = "200px";
                        image.style.height = "200px";

                        const detailsDiv = document.createElement("div");
                        detailsDiv.style.marginLeft = "10px";

                        const title = document.createElement("p");
                        title.textContent = item.title;
                        title.style.fontWeight = "bold";
                        title.style.color = "white";
                        title.style.maxWidth = "400px"

                        const price = document.createElement("p");
                        price.textContent = `Price: ₹${item.price}`;
                        price.style.color = "#00abf0"

                        detailsDiv.appendChild(title);
                        detailsDiv.appendChild(price);

                        parentDiv.appendChild(image);
                        parentDiv.appendChild(detailsDiv);

                        document.body.appendChild(parentDiv);
                    });
            
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }
}

const button = document.getElementById("submitbutton")
button.addEventListener("click", submit_button)


