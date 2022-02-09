"use strict";

const allCustomersBtn = document.querySelector("#all-customers-btn");
const customerContainer = document.querySelector("#customer-container");

////////////////////////////////////////
// FORMAT GENDER
const formatGender = function (custGender) {
    switch(custGender) {
        case 0:
            return "Female";
        case 1:
            return "Male";
        case 2:
            return "Undefined";
        default:
            return "Undefined";
    }
}

// FORMAT CITY OF BIRTH
const formatCityOfBirth = function (custCityOfBirth) {
    switch(custCityOfBirth) {
        case 0:
            return "Taipei";
        case 1:
            return "Taoyuan";
        case 2:
            return "Hsintsu";
        case 3:
            return "Taichung";
        case 4:
            return "Changhwa";
        case 5:
            return "Tainan";
        case 6:
            return "Kaohsiung";
        case 7:
            return "Pingtung";
        case 8:
            return "Taitung";
        default:
            return "Other";
    }
}

// FORMAT CITY OF BIRTH MANDARIN
const formatCityOfBirthMandarin = function (custCityOfBirth) {
    switch(custCityOfBirth) {
        case 0:
            return "臺北市";
        case 1:
            return "桃園市";
        case 2:
            return "新竹市";
        case 3:
            return "臺中市";
        case 4:
            return "彰化縣";
        case 5:
            return "臺南市";
        case 6:
            return "高雄市";
        case 7:
            return "屏東縣";
        case 8:
            return "臺東縣";
        default:
            return "Other";
    }
}

////////////////////////////////////////
// RENDER ALL CUSTOMERS
const renderCustomers = function(customer, cityTemp) {
    // format gender
    let gender = formatGender(customer.gender);
    // format city of birth
    let cityOfBirth = formatCityOfBirth(customer.cityOfBirth);
    
    let html = `
        <tr id="customer" cust-id="${customer.id}">
            <td class="customer-id">${customer.id}</td>
            <td class="customer-name">${customer.name}</td>
            <td class="customer-gender">${gender}</td>
            <td class="customer-email">${customer.email}</td>
            <td class="customer-city-of-birth">${cityOfBirth}</td>
            <td class="temperature">${cityTemp} °C</td>
            <td><button class="delete-button">Delete</button></td>
        </tr>
    `;
    customerContainer.insertAdjacentHTML("beforeend",html);
}

// RENDER TEMPERATURE IN CITY OF BIRTH
const renderCityTemperature = function(cityOfBirth) {
    const apikey = "CWB-BE4C91F0-43E2-428F-B6A9-02C5AA943D76";
    const format = "JSON";
    let locationName = cityOfBirth;
    
    return fetch(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=${apikey}&${format}=JSON&locationName=${locationName}&elementName=MaxT`)
        .then((body) => body.json())
        .then((response) => {
            let cityTemp = response.records.location[0].weatherElement[0].time[0].parameter.parameterName;
            return cityTemp;
        });
}

allCustomersBtn && allCustomersBtn.addEventListener("click", function(){
    customerContainer.innerHTML = "";
    fetch("/fabryque/customer/getAllCustomers")
    .then((body) => body.json())
    .then(async (customers) => {
      for (let customer of customers) {
        let cityOfBirth = formatCityOfBirthMandarin(customer.cityOfBirth);
        let temp = await renderCityTemperature(cityOfBirth);
        renderCustomers(customer, temp);
      }
    });
})

// DELETE CUSTOMER
const deleteCustomer = function (customerId) {
    fetch(`/fabryque/customer/delete`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: customerId,
        }),
    });
};

document.addEventListener("click", function(e) {
    if (e.target.classList.contains("delete-button")) {
        let parent = e.target.closest("#customer");
        let customerId = parent.getAttribute("cust-id");
        deleteCustomer(customerId);
        parent.remove();
    }
})