"use strict"

Meteor.startup(function () {
  Meteor.subscribe('users')
})


Template.userList.events({
  'click .name a': manageRolesClicked
})

Template.userList.helpers({
  users: function () {
    return Meteor.users.find()
  },
  mobile: function () {
    var profile = this.profile,
        mobile = ''

    if (profile) 
      mobile = profile.mobile

    if ("null" === mobile || !mobile) 
      mobile = ''

    return mobile
  },
  emailAddress: function () {
    var emails = this.emails

    if (emails && emails.length > 0) {
      return emails[0].address
    }

    return ""
  }
})

function manageRolesClicked (evt) {
  var $person,
      userId

  evt.preventDefault()

  $person = $(evt.target).closest('.person')
  userId = $person.attr('data-id')
  Session.set('selectedUserId', userId)
  $('#user-roles').modal()
}
