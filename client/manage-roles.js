"use strict" 

////////////////////////////////////////////////////////////
// editRolesForm
//

Template.editRolesForm.rendered = function () {
  var userId = Session.get('selectedUserId'),
      user,
      $options

  if (!userId) return

  user = Meteor.users.findOne({_id: userId})
  if (!user) return

  //console.log('form rendered:', user.profile.lastname)

  $options = $('option', '#roles')

  $options.each(function (index, option) {
    var $option = $(option),
        val = $option.val(),
        hasRole

    hasRole = _.contains(user.roles, val)

    if (hasRole) {
      $option.attr('selected', true)
    } else {
      $option.removeAttr('selected')
    }
  })

  renderMultiSelect()
}

function renderMultiSelect () {
  var $roles,
      data,
      dataExists

  if (!jQuery.fn.multiSelect) return

  // loudev multiselect does not support calling
  // $().multiSelect() multiple times.  List 
  // elements and headers will be duplicated.
  //
  // to avoid this, we make sure to remove the 
  // 'multiselect' data object if it exists
  // so a new, clean multiselect will be 
  // created each time.
  
  $roles = $('#roles')
  data = $roles.data('multiselect')
  dataExists = data ? true : false

  if (dataExists) {
    // remove existing multiselect data
    $roles.data('multiselect', null)
  }

  //console.log('multiSelect re-rendered')
  $roles.multiSelect({
    selectableHeader: "Available Roles:",
    selectionHeader: "Authorized to:"
  })
}

Template.editRolesForm.events({
  'click #saveChanges': function (evt) {
    var $form = $('#manage-roles-form'),
        data,
        roles

    evt.preventDefault()

    data = $form.serializeObject()

    roles = data.roles || []
    if (!_.isArray(roles)) {
      // ensure roles is an array
      roles = [roles]
    }

    Meteor.call('updateRoles', 
      data._id,
      roles,
      function (error, result) {
        if (error) {
          alert(error)
        } else {
          bootbox.alert('Roles updated', function () {
            $('#user-roles').modal('hide')
          })
        }
      })
  }
})

Template.editRolesForm.helpers({
  user: function () {
    var userId = Session.get('selectedUserId'),
        user = Meteor.users.findOne({_id: userId})
  
    //if (user && user.profile) {
    //  console.log('current user:', user.profile.lastname)
    //}

    return user
  },

  allRoles: function () {
    var roles = "read,modify,delete,create".split(',')

    return roles
  }
})
