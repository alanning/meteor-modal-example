"use strict"

Meteor.startup(function () {
  var user = Meteor.users.findOne()
  if (!user) createUsers()

  Meteor.publish('users', function () {
    // profile is automatically published for 
    // logged-in user only so need to publish 
    // that too
    return Meteor.users.find({},{
      fields:{
        emails:1,
        profile:1,
        roles:1
      },
      sort:{
        "profile.lastname":1
      }
    })
  })

  Meteor.methods({
    updateRoles: function (targetUserId, roles) {
      check(targetUserId, String)
      check(roles, [String])

      // var loggedInUser = Meteor.user()
      // if (!Auth.authorized('updateRoles', loggedInUser))
      //   throw new Meteor.Error(400, "Not authorized")
      
      Meteor.users.update({_id:targetUserId}, {
        $set: {
          roles: roles
        }
      })
    }
  })


})  // end Meteor.startup


function createUsers () {
  var i = 0,
      id,
      ids = []

  for (; i < 10; i++) {
    id = Accounts.createUser({
      email: "user" + i + "@example.com",
      password: "password",
      profile: {
        firstname: "User",
        lastname: i
      }
    })

    ids.push(id)
  }  


  // add roles
  Roles.addUsersToRoles(ids, 'read')
}


