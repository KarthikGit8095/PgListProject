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
    const storedmembers = [
      {
        name: "karthik",
        email: "karthik@gmail.com",
        joining: "12-7-24",
        advance: 5000,
        rent: 5000,
      },
    ];

    const members = storedmembers;
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

  static clearField() {
    document.querySelector("#name").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#joining").value = "";
    document.querySelector("#advance").value = "";
    document.querySelector("#rent").value = "";
  }
}

document.addEventListener("DOMContentLoaded", ui.displaymember);

document.querySelector("#info-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const joining = document.querySelector("#joining").value;
  const advance = document.querySelector("#advance").value;
  const rent = document.querySelector("#rent").value;

  const members = new member(name, email, joining, advance, rent);

  ui.addMemberToList(members);

  ui.clearField();
});

document.querySelector("#Member-List").addEventListener("click", (e) => {
  ui.deleteMember(e.tagert);
});
