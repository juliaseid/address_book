// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, email) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.email = email,
  this.addresses = []
}

function Address(street, city, workHome) {
  this.street = street,
  this.city = city,
  this.workHome = workHome
}

Address.prototype.StreetAddress = function() {
return this.workHome + ": " + this.street + ", " + this.city;
}

Contact.prototype.addAddress = function(address) {
  this.addresses.push(address);
}

// function ExampleMultiple (multi1, multi2, multi3) {
//   this.multi1 = multi1;
// }



// Contact.prototype.fullName = function() {
//   return this.firstName + " " + this.lastName;
// }


// User Interface Logic ---------
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

//

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email").html(contact.email);
  $(".street-address").html(contact.street);
  $(".city-zip").html(contact.city);
  $(".work-home").html(contact.workHome);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedEmail = $("input#new-email").val();
    var inputtedStreetAddress = $("input#new-street").val();
    var inputtedCityZip = $("input#new-city").val();
    var AddressWorkHome = $("#work-home").val();
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email").val("");
    $("input#new-street").val("");
    $("input#new-city").val("");
    console.log("Inputs: ", inputtedStreetAddress, inputtedCityZip);
    var myAddress = new Address(inputtedStreetAddress, inputtedCityZip, AddressWorkHome);
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmail);
    newContact.addAddress(myAddress);
    console.log("Address object: ", myAddress);
    console.log("Contact: ", newContact);

    // var multiNew = new ExampleMultiple (multi1, multi2)

    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
  });
  //var newAddress = $("input#street1").val() + ", " $
  //contact.addAddress(newAddress);