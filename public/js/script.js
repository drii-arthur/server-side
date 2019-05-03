// base url

let base_url;

let url_set = 1; // 1 untuk local

if (url_set == 1) {
    base_url = "http://localhost:3000/contacts/"
} else {
    base_url = "https://5k6vj03zpl.sse.codesandbox.io/contacts"
}
selectedRow = null;
function onFormSubmit() {
    if (validation()) {
        let post = myInput();
        if (selectedRow == null) {
            newPost(post);
        }
        else {
            let contact = myInput();
            updateRecord(contact)
            resetForm()
        }

    } else {
        event.preventDefault();
    }

}

function view() {

    fetch('http://localhost:3000/contacts')
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
            action.innerHTML = `<a href="#" id="edit" onclick="onEdit(this)">Edit</a>
                                   <a href="#" id="hapus"  onclick="remove(`+ item.id + `)">Delete</a`
        }))


}


// function input data baru
const myInput = () => {
    let fullName = document.getElementById("fullName");
    let phoneNumber = document.getElementById("phone");
    let email = document.getElementById("email");
    let gender = document.getElementById("gender");
    let result = {
        "fullName": fullName.value,
        "phoneNumber": phoneNumber.value,
        "email": email.value,
        "gender": gender.value
    }
    return result;
}



// function tambah data
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
        // .then((data))
        .catch((error) => console.error(`error: ${error}`))

}
// function validasi form tambah data
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

// function ketika tombol edit di klik
function onEdit(td) {
    // menentukan isi value yang akan di kirim ke form submit
    selectedRow = td.parentElement.parentElement;
    document.getElementById("id").value = selectedRow.cells[0].innerHTML;
    document.getElementById("fullName").value = selectedRow.cells[1].innerHTML;
    document.getElementById("phone").value = selectedRow.cells[2].innerHTML;
    document.getElementById("email").value = selectedRow.cells[3].innerHTML;
    document.getElementById("gender").value = selectedRow.cells[4].innerHTML;
}

// const update = (update, id) => {

//     const options = {
//         method: 'PUT',
//         body: JSON.stringify(update),
//         headers: new Headers({
//             'Content-type': 'application/json'
//         })
//     }
//     fetch(`http://localhost:3000/contacts/${id}`, options)
//         .then((respons) => respons.json())
//         .then((data) => {
//             document.getElementById("id").value = data.id;
//             document.getElementById("fullName").value = data.fullName;
//             document.getElementById("phone").value = data.phoneNumber;
//             document.getElementById("email").value = data.email;
//             document.getElementById("gender").value = data.gender;
//             console.log(data)
//             selectedRow = data;

//         })
//         .catch((error) => console.error(`error: ${error}`))
// }
// function untuk edit value
function updateRecord(contact) {
    const option = {
        method: "PUT",
        body: JSON.stringify(contact),
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch(`http://localhost:3000/contacts/${selectedRow.cells[0].innerHTML}`, option)
        .then((respons) => respons.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(`error: ${error}`))

}

// function hapus data
// masih belum sempurna karena harus di refresh untuk melihat hasilnya
const remove = (id) => {
    const options = {
        method: "DELETE",
    }
    fetch(`http://localhost:3000/contacts/${id}`, options)
        .catch((error) => console.error(`error: ${error}`))
}
// function untuk mengosongkan form input
function resetForm() {
    document.getElementById("fullName").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("gender").value = ""
}


view()


