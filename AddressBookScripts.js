var contacts=[{
    id:"1",
    email : "chandermani.a@technovert.com",
    name : "Chandermani Arora",
    mobile : "9292929292",
    landLine : "+123 450612",
    website : "www.technovert.com",
    address : "Seattle"
},
{
    id:"2",
    email : "sashi.p@technovert.com",
    name : "Sashi Pagadala",
    mobile : "9292929292",
    landLine : "+123 450612",
    website : "www.technovert.com",
    address : "Hyderabad"
}
]
$(document).ready(
        function(){
            methods.displayContacts();
            $("li").removeClass('highlight');
            $("#contactInformation").hide();

            $("#home").click(function () {
                $("li").removeClass('highlight');
                $("#addContactForm").hide();
                $("#contactInformation").hide();
            });

            $(".contactList").on('click','li',function (){
                var selectedContactName = $(this).children("#contactName").text();
                methods.displaySelectedContact(selectedContactName);
                $("li").removeClass('highlight');
                $(this).addClass('highlight');
            });

            $("#addContact").click(function(){
                $('.detailsForm #mobileValidationMessage').hide();
                $('.detailsForm #nameValidationMessage').hide();
                $('.detailsForm #emailValidationMessage').hide();
                $('#addContactDetails').trigger("reset");
                $("li").removeClass('highlight'); 
                $("#submitDetails").val("ADD");
                $("#addContactForm").show();
                $("#addContactForm #id").hide();
                $("#contactInformation").hide();
            });

            $("#editContact").click(function(){
                $('#addContactDetails').trigger("reset"); 
                $("#submitDetails").val("UPDATE");
                $('.detailsForm #mobileValidationMessage').hide();
                $('.detailsForm #nameValidationMessage').hide();
                $('.detailsForm #emailValidationMessage').hide();
                var id=$(".displaySelectedContact #id").text();
                var index = contacts.findIndex(obj=>obj.id==id);
                var selectedContact = contacts[index];
                $("#addContactForm #id").hide();
                $(".detailsForm #id").val(selectedContact.id);
                $(".detailsForm #website").val(selectedContact.website);
                $(".detailsForm #name").val(selectedContact.name);
                $(".detailsForm #email").val(selectedContact.email);
                $(".detailsForm #mobile").val(selectedContact.mobile);
                $(".detailsForm #landline").val(selectedContact.landline);
                $(".detailsForm #address").val(selectedContact.address);
                $("#addContactForm").show();
                $("#contactInformation").hide();
            });

            $("#deleteContact").click(function(){
                var email=$(".displayEmail #email").text();
                var index = contacts.findIndex(obj=>obj.email==email);
                contacts.splice(index,1);
                $("#contactInformation").hide();
                methods.displayContacts();
            });

            $("#submitDetails").click(function(){
                if(methods.validateName()  && methods.validateEmail() && methods.validateMobileNumber())
                {
                    var data = $('form').serializeArray();
                     var newContact={};
                     $.each(data, function (i, input) {
                         newContact[input.name] = input.value;
                     });
                 
                     var index = contacts.findIndex(obj=>obj.id==newContact.id);
                     console.log(contacts);
                     if(index==-1)
                     {
                         var length = contacts.length;
                         newContact.id=length+1;
                         $('detailsForm #id').val(length+1);
                         var address = newContact.address;
                         newContact.address = address.replace(/(?:(?:\n)\s*){2}/gm, "\n");
                         contacts.push(newContact);
                         $('#addContactDetails').trigger("reset"); 
                         methods.displaySelectedContact(newContact.name);
                     }
                     else
                     {
                        var address = newContact.address;
                        newContact.address = address.replace(/(?:(?:\n)\s*){2}/gm, "\n");
                        contacts[index]=newContact;
                        methods.displaySelectedContact(newContact.name);
                     }
                     methods.displayContacts();
                }
                else
                {
                    methods.validateName();
                    methods.validateEmail();
                    methods.validateMobileNumber();
                }
            })

        }
);

var methods = {
 displayContacts() {
    console.log(contacts);
    $('#contactsList').children().remove();
    var listItems = [];
    $.each(contacts, function(i, contact) {
        listItems.push("<li id='contacts'><p id='contactName' class='name'>"+contact.name+"</p>"+"<p>"+contact.email+"</p>"+"<p>"+contact.mobile+"</p></li>");
    });
    $('#contactsList').append(listItems.join(''));
  },

displaySelectedContact(selectedContactName){
    var index = contacts.findIndex(obj=>obj.name==selectedContactName);
    var selectedContact = contacts[index];
    $(".displaySelectedContact #id").text(selectedContact.id);
    $(".displayEmail #email").text(selectedContact.email.toLowerCase());
    $(".displaySelectedContact #name").text(selectedContact.name);
    $(".contactDetails #mobile").text(selectedContact.mobile);
    $(".contactDetails #landline").text(selectedContact.landLine);
    $(".website #website").text(selectedContact.website);
    $(".address #address").text(selectedContact.address);
    $("#contactInformation").show();
    $("#addContactForm").hide();
},

validateName(){
    var regex = /^[a-zA-Z ]*$/;
    var name = $('.detailsForm #name').val();
    if ($('.detailsForm #name').val().length == 0)
    {
        $('.detailsForm #name').focus();
        $('.detailsForm #nameValidationMessage').text("Name field cannot be empty");
        $('.detailsForm #nameValidationMessage').show();
        return false;
    } 
    if(!regex.test(name))
    {
        $('.detailsForm #name').focus();
        $('.detailsForm #nameValidationMessage').text("Please enter a valid name");
        $('.detailsForm #nameValidationMessage').show();
        return false;
    }
    $('.detailsForm #nameValidationMessage').hide();
    return true;
},

validateEmail(){
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z]{2,4})+$/;
    var email = $('.detailsForm #email').val();
    if(email.length == 0)
    {
        $('.detailsForm #email').focus();
        $('.detailsForm #emailValidationMessage').text("Email cannot be empty");
        $('.detailsForm #emailValidationMessage').show();
        return false;
    }
    if(regex.test(email))
    {
        $('.detailsForm #emailValidationMessage').hide();
        return true;
    }
    else
    {
       $('.detailsForm #email').focus();
       $('.detailsForm #emailValidationMessage').text("Please enter a valid email");
       $('.detailsForm #emailValidationMessage').show();
       return false;
    }
},

validateMobileNumber(){
    var mobileNumberLength = $('.detailsForm #mobile').val().length;
    var mobileNumber=$('.detailsForm #mobile').val();
    var regex = /^(?:(?:\+)91(\s*[\ -]\s*)?)?(\d[ -]?){9}\d$/;
    mobileNumber = $.trim(mobileNumber);
    if(!regex.test(mobileNumber))
    {
        $('.detailsForm #mobile').focus();
        $('.detailsForm #mobileValidationMessage').text("Please enter a valid mobile number");
        $('.detailsForm #mobileValidationMessage').show();
        return false;
    }
    if(mobileNumberLength == 0)
    {
        $('.detailsForm #mobile').focus();
        $('.detailsForm #mobileValidationMessage').text("Mobile Number cannot be empty");
        $('.detailsForm #mobileValidationMessage').show();
        return false;
    } 
    if(mobileNumberLength < 10)
    {
        $('.detailsForm #mobile').focus();
        $('.detailsForm #mobileValidationMessage').text("Mobile number cannot be less than 10 digits");
        $('.detailsForm #mobileValidationMessage').show();
        return false;
    }
    // if(mobileNumberLength > 12)
    // {
    //     $('.detailsForm #mobile').focus();
    //     $('.detailsForm #mobileValidationMessage').text("Mobile number cannot be greater than 12 digits");
    //     $('.detailsForm #mobileValidationMessage').show();
    //     return false;
    // }
    $('.detailsForm #mobileValidationMessage').hide();
    return true;
}
}
