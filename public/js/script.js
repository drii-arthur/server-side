// base url

let base_url;

let url_set = 1; // 1 untuk local

if (url_set == 1) {
    base_url = "http://localhost:3000/contacts/"
} else {
    base_url = "https://ll1v4y9jw7.sse.codesandbox.io/contacts"
}

function onFormSubmit() {
    if (validation()) {
        let post = myInput()
        newPost(post);
    } else {
        event.preventDefault();
    }
}

function view() {

    let result = fetch('http://localhost:3000/contacts')
        .then((response) => response.json()).then((data) => data.map(item => {
            let tbody = document.getElementById("kolom-data");
            let row = tbody.insertRow();
            let id = row.insertCell(0);
            let fullName = row.insertCell(1);
            let phoneNumber = row.insertCell(2);
            let email = row.insertCell(3);
            let gender = row.insertCell(4);
            let action = row.insertCell(5);

            id.innerHTML = item.id;
            fullName.innerHTML = item.fullName;
            phoneNumber.innerHTML = item.phoneNumber;
            email.innerHTML = item.email;
            gender.innerHTML = item.gender;
            action.innerHTML = `<a href="#" id="edit">edit</a>
                                   <a href="#" id="hapus" onclick="handleRemove(remove.id)">delete</a`
        }))
    return result

}
const myInput = () => {
    let fullName = document.getElementById("fullName");
    let phoneNumber = document.getElementById("phone");
    let email = document.getElementById("email");
    let gender = document.getElementById("gender");
    l
    let result = {
        "fullName": fullName.value,
        "phoneNumber": phoneNumber.value,
        "email": email.value,
        "gender": gender.value
    }
    return result;
}

// return post;
// console.log(result)

const newPost = post => {
    const option = {
        method: 'POST',
        body: JSON.stringify(post),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }
    return fetch('http://localhost:3000/contacts', option)
        .then((respons) => respons.json())
        .then((data) => data.map(item => {
            let tbody = document.getElementById("kolom-data");
            let row = tbody.insertRow();
            let id = row.insertCell(0);
            let fullName = row.insertCell(1);
            let phoneNumber = row.insertCell(2);
            let email = row.insertCell(3);
            let gender = row.insertCell(4);
            let action = row.insertCell(5);

            id.innerHTML = item.id;
            fullName.innerHTML = item.fullName;
            phoneNumber.innerHTML = item.phoneNumber;
            email.innerHTML = item.email;
            gender.innerHTML = item.gender;
            action.innerHTML = `<a href="#" id="edit">edit</a>
                                   <a href="#" id="hapus" onclick="handleRemove(remove.id)">delete</a`
        }))
        .catch((error) => console.error(`error: ${error}`))

}

function validation() {
    let fullName = document.getElementById("fullName").value;
    let phoneNumber = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    isValid = true;
    // jika input nama kosong
    if (fullName == "") {
        isValid = false;
        // berikan pesan kesalahan
        let error = document.getElementById("errName");
        error.innerHTML = `<div class="alert alert-warning" role="alert">
        Nama Tidak Boleh Kosong !
      </div>`
    } else {
        // hilangkan pesan kesalahan
        isValid = true;
        let error = document.getElementById("errName");
        error.innerHTML = "";
    }
    if (phoneNumber == "") {
        isValid = false;
        // berikan pesan kesalahan
        let error = document.getElementById("errPhone");
        error.innerHTML = `<div class="alert alert-warning" role="alert">
        Nomor Telpon Tidak Boleh Kosong !
      </div>`
    } else {
        isValid = true;
        let error = document.getElementById("errPhone");
        error.innerHTML = "";
    }
    if (email == "") {
        isValid = false;
        // berikan pesan kesalahan
        let error = document.getElementById("errEmail");
        error.innerHTML = `<div class="alert alert-warning" role="alert">
        Email Tidak Boleh Kosong !
      </div>`
    } else {
        isValid = true;
        let error = document.getElementById("errEmail");
        error.innerHTML = "";
    }
    return isValid;
}

// const remove = {
//     // id: item.id
//     id: 4
// }
// const handleRemove = remove => {
//     const option = {
//         method: "DELETE",
//         body: JSON.stringify(remove),
//         headers: new Headers({
//             'Content-Type': 'application/json'
//         })
//     }
//     return fetch('http://localhost:3000/contacts', option)
//         .then((respons) => respons.json())
//         .then((...data) => console.log(data))
//         .catch((error) => console.error(`error: ${error}`))
// }


view()
