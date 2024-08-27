class member {
  constructor(name, email, joining, advance, rent) {
    this.name = name;
    this.email = email;
    this.joining = joining;
    this.advance = advance;
    this.rent = rent;
  }
}

class ui {
  static displaymember() {
    const members = store.getMember();
    members.forEach((member) => ui.addMemberToList(member));
  }

  static addMemberToList(member) {
    const list = document.querySelector("#Member-List");
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${member.name}</td>
        <td>${member.email}</td>
        <td>${member.joining}</td>
        <td>${member.advance}</td>
        <td>${member.rent}</td>
        <td><a href="#" class ="btn btn-danger btn-sm delete">X</a></td>
        `;
    list.appendChild(row);
  }

  static deleteMember(ele) {
    if (ele.classList.contains("delete")) {
      ele.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#info-form");
    container.insertBefore(div, form);
    setTimeout(() => document.querySelector(".alert").remove(), 5000);
  }

  static clearField() {
    document.querySelector("#name").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#joining").value = "";
    document.querySelector("#advance").value = "";
    document.querySelector("#rent").value = "";
  }
}

class store {
  static getMember() {
    let members;
    if (localStorage.getItem("members") === null) {
      members = [];
    } else {
      members = JSON.parse(localStorage.getItem("members"));
    }

    return members;
  }

  static addMember(member) {
    const members = store.getMember();
    members.push(member);
    localStorage.setItem("members", JSON.stringify(members));
  }

  static removeMember(rent) {
    const members = store.getMember();

    members.forEach((member, index) => {
      if (member.rent === rent) {
        members.splice(index, 1);
      }
    });

    localStorage.setItem("members", JSON.stringify(members));
  }
}

document.addEventListener("DOMContentLoaded", ui.displaymember);

document.querySelector("#info-form").addEventListener("submit", (e) => {
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const joining = document.querySelector("#joining").value;
  const advance = document.querySelector("#advance").value;
  const rent = document.querySelector("#rent").value;

  //validate
  if (
    name === "" ||
    email === "" ||
    joining === "" ||
    advance === "" ||
    rent === ""
  ) {
    ui.showAlert("please enter all the fields", "danger");
  } else {
    const members = new member(name, email, joining, advance, rent);

    ui.addMemberToList(members);

    store.addMember(members);

    ui.showAlert("Member Added", "success");

    ui.clearField();
  }
});

document.querySelector("#Member-List").addEventListener("click", (e) => {
  ui.deleteMember(e.target);

  store.removeMember(e.target.parentElement.previousElementSibling.textContent);
  ui.showAlert("Member Removed", "success");
});

//e.preventDefault();
