const connection = require("../configs/MySQLConnect");
const bcrypt = require("bcrypt");

class AdminRepository {
    static async inserAccount(
        username, password, role_id, permission_id, createDate, infoAccount_id
    ) {
        const query = `
                            INSERT INTO accounts (username, password, role_id, permission_id, create_date, infoAccount_id, status) 
                            VALUES (?, ?, ?, ?, ?, ?, ?)`;

        const hashedPassword = await bcrypt.hash(password, 10);

        const params = [
            username, hashedPassword, role_id, permission_id, createDate, infoAccount_id, true
        ];

        const result = await connection.query(query, params);
        return result.insertId;
    }

    static async insertInfo(fullName) {
        const query = `INSERT INTO info_accounts (fullName) VALUES (?)`;
        const params = [fullName];
        const result = await connection.query(query, params);
        return result.insertId;
    }
}

module.exports = AdminRepository;