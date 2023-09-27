class UserAccountModel {
    constructor(id, username, password, role_id, permission_id, create_date, infoAccount_id ,school_id,status) {
      this.id = id;
      this.username = username;
      this.password = password;
      this.role_id = role_id;
      this.permission_id = permission_id;
      this.create_date = create_date;
      this.infoAccount_id = infoAccount_id;
      this.school_id = school_id;
      this.status = status;
    }
  }
  
  module.exports = UserAccountModel;
  